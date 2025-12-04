# RetailX - AI-Powered Retail Management Platform

## Overview

RetailX is an AI-powered retail store management platform built with Next.js 14 (App Router). It provides a conversational interface for interacting with retail analytics and operational features including camera monitoring, sales analytics, inventory management, staff management, cost analysis, and predictive forecasting.

The application uses a hybrid fragment system that:
- Generates code fragments for custom applications using the Vercel AI SDK
- Provides hardcoded retail-specific fragments for common store operations
- Executes code in sandboxed environments using E2B Code Interpreter

## Tech Stack

### Core
- **Next.js 14.2.30** - Full-stack React framework with App Router
- **React 18** - UI library
- **TypeScript 5.5.4** - Type-safe development

### AI & LLM
- **Vercel AI SDK 3.3.8** - Multi-provider LLM abstraction
- **@e2b/code-interpreter 1.0.2** - Sandbox code execution

Supported LLM providers:
- OpenAI (GPT models)
- Anthropic (Claude models)
- Google (Gemini models)
- Mistral
- Groq
- Fireworks
- Together AI
- XAI
- DeepSeek
- Ollama (local models)
- Google Vertex AI

### UI & Styling
- **Tailwind CSS 3.4.1** - Utility-first CSS
- **shadcn/ui** - Component library (Radix UI primitives)
- **Lucide React** - Icons
- **next-themes** - Theme management

### Backend & Auth
- **Supabase** - Authentication and database
- **Vercel KV** - Redis-compatible key-value store
- **@upstash/ratelimit** - Rate limiting

### Analytics
- **PostHog** - Product analytics and event tracking
- **Vercel Analytics** - Page analytics

## Project Structure

```
fragments/
├── app/                          # Next.js App Router
│   ├── api/
│   │   ├── chat/route.ts         # LLM streaming endpoint
│   │   └── sandbox/route.ts      # Code execution endpoint
│   ├── actions/                  # Server actions
│   ├── chat/page.tsx             # Main chat application
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Landing page
│   ├── providers.tsx             # Theme & PostHog providers
│   └── globals.css               # Global styles
│
├── components/
│   ├── ui/                       # shadcn/ui components
│   ├── chat.tsx                  # Message display
│   ├── chat-input.tsx            # Input with file upload
│   ├── chat-picker.tsx           # Model/template selector
│   ├── chat-settings.tsx         # LLM configuration
│   ├── preview.tsx               # Side panel preview
│   ├── navbar.tsx                # Navigation bar
│   ├── fragment-*.tsx            # Fragment components (9 types)
│   └── auth.tsx                  # Authentication form
│
├── lib/
│   ├── schema.ts                 # Zod schemas for fragments
│   ├── models.ts                 # LLM client factory
│   ├── models.json               # Available models config
│   ├── templates.ts              # Code template utilities
│   ├── templates.json            # Template definitions
│   ├── prompt.ts                 # System prompt generation
│   ├── auth.ts                   # Supabase auth hooks
│   └── utils.ts                  # Utilities
│
└── sandbox-templates/            # E2B sandbox templates
```

## Fragment System

The application uses a "fragment" architecture where user queries produce structured outputs of different types.

### Fragment Types (9 Total)

| Type | Description | Trigger Keywords |
|------|-------------|------------------|
| `code` | Executable code snippets | Default for code requests |
| `camera_feed` | Live security camera monitoring | "camera", "footage", "surveillance" |
| `dashboard` | Store analytics overview | "analytics", "dashboard", "overview" |
| `sales_data` | Sales metrics and analysis | "sales", "revenue", "transactions" |
| `staff_management` | Employee scheduling | "staff", "employee", "schedule" |
| `inventory_management` | Stock tracking | "inventory", "stock", "products" |
| `cost_analytics` | Expense analysis | "cost", "expense", "budget" |
| `forecast` | Sales predictions | "forecast", "predict", "demand" |
| `help` | AI video assistant | "help", "assist" |

### Fragment Routing Logic

Located in `app/chat/page.tsx`:

1. **Keyword Detection**: User input is checked for retail-specific keywords
2. **Hardcoded Response**: If keywords match, return pre-built retail fragment immediately (2s simulated delay)
3. **LLM Generation**: Otherwise, send to `/api/chat` for AI-generated code fragment

```typescript
// Example keyword detection
if (userMessage.includes('camera')) {
  return cameraFeedFragment;
}
```

## API Endpoints

### POST `/api/chat`

Streams LLM responses with structured fragment output.

**Request:**
```typescript
{
  messages: CoreMessage[]      // Chat history
  userID: string               // Current user
  template: Templates          // Code template
  model: LLMModel             // Selected model
  config: LLMModelConfig      // Model settings
}
```

**Response:** Streaming JSON with fragment schema

**Features:**
- Multi-provider LLM support
- Rate limiting (10 req/day default)
- Custom API key support
- Error handling for rate limits and overload

### POST `/api/sandbox`

Executes code fragments in E2B sandboxes.

**Request:**
```typescript
{
  fragment: FragmentSchema     // Code to execute
  userID: string
  accessToken: string          // Supabase token
}
```

**Response:**
- Python execution: stdout, stderr, cell results
- Web apps: Sandbox URL

## Key Components

### `app/chat/page.tsx`
Main application page with dual-panel layout:
- Left: Chat messages and input
- Right: Fragment preview (code view or retail UI)

Manages:
- Message history (local storage)
- Loading states (8 different states)
- File uploads
- Model/template selection
- PostHog event tracking

### `components/preview.tsx`
Side panel that renders fragments:
- Code tab: Syntax-highlighted source
- Preview tab: Fragment-specific UI or web preview

### `components/fragment-preview.tsx`
Router component that selects the correct fragment renderer based on `fragment.template`:

```typescript
switch (fragment.template) {
  case 'camera_feed': return <CameraFeed />;
  case 'dashboard': return <Dashboard />;
  // ... etc
}
```

### `lib/schema.ts`
Zod schemas defining all fragment types:

```typescript
const fragmentSchema = z.discriminatedUnion('template', [
  codeFragmentSchema,
  cameraFeedSchema,
  dashboardSchema,
  // ... etc
]);
```

### `lib/models.ts`
Factory function for creating LLM clients:

```typescript
export function getModelClient(model: LLMModel, config?: LLMModelConfig) {
  switch (model.provider) {
    case 'openai': return openai(model.id);
    case 'anthropic': return anthropic(model.id);
    // ... etc
  }
}
```

## Configuration

### Environment Variables

See `.env.template` for all available variables:

```bash
# Required for code execution
E2B_API_KEY=

# AI Providers (at least one required)
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
GOOGLE_GENERATIVE_AI_API_KEY=
MISTRAL_API_KEY=
GROQ_API_KEY=

# Optional
SUPABASE_URL=
SUPABASE_ANON_KEY=
KV_REST_API_URL=          # For rate limiting
KV_REST_API_TOKEN=
NEXT_PUBLIC_POSTHOG_KEY=  # Analytics
```

### Models Configuration

`lib/models.json` defines available LLM models:

```json
[
  {
    "id": "gpt-4o",
    "name": "GPT-4o",
    "provider": "openai",
    "providerId": "OpenAI"
  }
]
```

### Templates Configuration

`lib/templates.json` defines code generation templates:

```json
[
  {
    "id": "code-interpreter-v1",
    "name": "Python data analyst",
    "file": "/home/user/main.py"
  },
  {
    "id": "nextjs-developer",
    "name": "Next.js developer",
    "file": "/home/user/app/page.tsx"
  }
]
```

## Authentication

Uses Supabase Auth with:
- Email/password sign-in
- Team-based organization
- Custom user metadata (`is_fragments_user` flag)
- Real-time auth state listeners

Auth hook in `lib/auth.ts`:
```typescript
export function useAuth() {
  // Returns { session, user, loading }
}
```

## State Management

- **React useState** - Component-level state
- **useLocalStorage** (usehooks-ts) - Persistent state
  - Chat input draft
  - Selected model
  - LLM configuration
- **Supabase listeners** - Real-time auth state

## Styling

- **Tailwind CSS** with custom theme in `tailwind.config.ts`
- **CSS Variables** for colors (HSL format)
- **Dark mode** via `next-themes` (class-based)
- **shadcn/ui** components with Radix UI primitives

Global styles in `app/globals.css`:
```css
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  /* ... */
}
```

## Development

### Scripts

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Adding a New Fragment Type

1. Add schema in `lib/schema.ts`:
```typescript
const newFragmentSchema = z.object({
  template: z.literal('new_fragment'),
  // ... fields
});
```

2. Add to discriminated union in `lib/schema.ts`

3. Create component `components/fragment-new.tsx`

4. Add case in `components/fragment-preview.tsx`

5. Add keyword detection in `app/chat/page.tsx`

### Adding a New LLM Provider

1. Add provider config in `lib/models.json`

2. Add client initialization in `lib/models.ts`:
```typescript
case 'newprovider':
  return newprovider(model.id, { apiKey });
```

3. Add environment variable to `.env.template`

## Middleware

`middleware.ts` handles short URL redirects:
- Pattern: `/s/:id`
- Looks up fragment ID in Vercel KV
- Redirects to stored URL or home page

## Analytics Events

PostHog events tracked:
- `fragment_generated` - When any fragment is created
- `sandbox_created` - When code executes
- `chat_submitted` - When user sends message
- `social_click` - Social link clicks
- Various fragment-specific events

## Error Handling

### API Errors
- **429** - Rate limit exceeded (returns reset time)
- **503** - LLM provider overloaded
- **403** - Access denied

### Sandbox Errors
- Runtime errors captured and displayed
- Syntax errors shown in results
- Timeout after 10 minutes

## Security Considerations

- Rate limiting on public endpoints
- Sandboxed code execution (E2B)
- API keys stored server-side
- User can provide custom API keys (stored client-side only)
- Supabase RLS for data access
