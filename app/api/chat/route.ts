import { Duration } from '@/lib/duration'
import { getModelClient } from '@/lib/models'
import { LLMModel, LLMModelConfig } from '@/lib/models'
import { toPrompt } from '@/lib/prompt'
import ratelimit from '@/lib/ratelimit'
import { fragmentSchema as schema } from '@/lib/schema'
import { Templates } from '@/lib/templates'
import { streamObject, LanguageModel, CoreMessage } from 'ai'

export const maxDuration = 60

const rateLimitMaxRequests = process.env.RATE_LIMIT_MAX_REQUESTS
  ? parseInt(process.env.RATE_LIMIT_MAX_REQUESTS)
  : 10
const ratelimitWindow = process.env.RATE_LIMIT_WINDOW
  ? (process.env.RATE_LIMIT_WINDOW as Duration)
  : '1d'

export async function POST(req: Request) {
  const {
    messages,
    userID,
    teamID,
    template,
    model,
    config,
  }: {
    messages: CoreMessage[]
    userID: string | undefined
    teamID: string | undefined
    template: Templates
    model: LLMModel
    config: LLMModelConfig
  } = await req.json()

  const limit = !config.apiKey
    ? await ratelimit(
        req.headers.get('x-forwarded-for'),
        rateLimitMaxRequests,
        ratelimitWindow,
      )
    : false

  if (limit) {
    return new Response('You have reached your request limit for the day.', {
      status: 429,
      headers: {
        'X-RateLimit-Limit': limit.amount.toString(),
        'X-RateLimit-Remaining': limit.remaining.toString(),
        'X-RateLimit-Reset': limit.reset.toString(),
      },
    })
  }

  console.log('userID', userID)
  console.log('teamID', teamID)
  // console.log('template', template)
  console.log('model', model)
  // console.log('config', config)

  const { model: modelNameString, apiKey: modelApiKey, ...modelParams } = config

  // Guard: ensure required provider credentials are available
  const providerRequiresKey: Record<string, { envVar?: string; optional?: boolean }> = {
    anthropic: { envVar: 'ANTHROPIC_API_KEY' },
    openai: { envVar: 'OPENAI_API_KEY' },
    google: { envVar: 'GOOGLE_GENERATIVE_AI_API_KEY' },
    mistral: { envVar: 'MISTRAL_API_KEY' },
    groq: { envVar: 'GROQ_API_KEY' },
    togetherai: { envVar: 'TOGETHER_API_KEY' },
    fireworks: { envVar: 'FIREWORKS_API_KEY' },
    xai: { envVar: 'XAI_API_KEY' },
    deepseek: { envVar: 'DEEPSEEK_API_KEY' },
    // ollama and vertex are handled differently (no API key required here)
    ollama: { optional: true },
    vertex: { optional: true },
  }

  const providerInfo = providerRequiresKey[model.providerId]
  const providerEnvOk = providerInfo?.optional
    || Boolean(modelApiKey)
    || (providerInfo?.envVar
      ? Boolean(process.env[providerInfo.envVar as keyof NodeJS.ProcessEnv])
      : true)

  if (!providerEnvOk) {
    return new Response(
      `Access denied. Missing API key for provider "${model.provider}". Add it in settings or via env ${providerInfo?.envVar}.`,
      { status: 403 },
    )
  }

  const modelClient = getModelClient(model, config)

  try {
    const stream = await streamObject({
      model: modelClient as LanguageModel,
      schema,
      system: toPrompt(template),
      messages,
      maxRetries: 0, // do not retry on errors
      ...modelParams,
    })

    return stream.toTextStreamResponse()
  } catch (error: any) {
    const isRateLimitError =
      error && (error.statusCode === 429 || error.message.includes('limit'))
    const isOverloadedError =
      error && (error.statusCode === 529 || error.statusCode === 503)
    const isAccessDeniedError =
      error && (error.statusCode === 403 || error.statusCode === 401)

    if (isRateLimitError) {
      return new Response(
        'The provider is currently unavailable due to request limit. Try using your own API key.',
        {
          status: 429,
        },
      )
    }

    if (isOverloadedError) {
      return new Response(
        'The provider is currently unavailable. Please try again later.',
        {
          status: 529,
        },
      )
    }

    if (isAccessDeniedError) {
      return new Response(
        'Access denied. Please make sure your API key is valid.',
        {
          status: 403,
        },
      )
    }

    console.error('Error:', error)

    return new Response(
      'An unexpected error has occurred. Please try again later.',
      {
        status: 500,
      },
    )
  }
}
