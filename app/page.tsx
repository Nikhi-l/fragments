'use client'

import { ViewType } from '@/components/auth'
import { AuthDialog } from '@/components/auth-dialog'
import { Chat } from '@/components/chat'
import { ChatInput } from '@/components/chat-input'
import { ChatPicker } from '@/components/chat-picker'
import { ChatSettings } from '@/components/chat-settings'
import { NavBar } from '@/components/navbar'
import { Preview } from '@/components/preview'
import { useAuth } from '@/lib/auth'
import { Message, toAISDKMessages, toMessageImage } from '@/lib/messages'
import { LLMModelConfig } from '@/lib/models'
import modelsList from '@/lib/models.json'
import { FragmentSchema, fragmentSchema as schema } from '@/lib/schema'
import { supabase } from '@/lib/supabase'
import templates, { TemplateId } from '@/lib/templates'
import { ExecutionResult } from '@/lib/types'
import { DeepPartial } from 'ai'
import { experimental_useObject as useObject } from 'ai/react'
import { usePostHog } from 'posthog-js/react'
import { SetStateAction, useEffect, useState } from 'react'
import { useLocalStorage } from 'usehooks-ts'

export default function Home() {
  const [chatInput, setChatInput] = useLocalStorage('chat', '')
  const [files, setFiles] = useState<File[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState<'auto' | TemplateId>(
    'auto',
  )
  const [languageModel, setLanguageModel] = useLocalStorage<LLMModelConfig>(
    'languageModel',
    {
      model: 'claude-3-5-sonnet-latest',
    },
  )

  const posthog = usePostHog()

  const [result, setResult] = useState<ExecutionResult>()
  const [messages, setMessages] = useState<Message[]>([])
  const [fragment, setFragment] = useState<DeepPartial<FragmentSchema>>()
  const [currentTab, setCurrentTab] = useState<'code' | 'fragment'>('fragment')
  const [isPreviewLoading, setIsPreviewLoading] = useState(false)
  const [isAuthDialogOpen, setAuthDialog] = useState(false)
  const [authView, setAuthView] = useState<ViewType>('sign_in')
  const [isRateLimited, setIsRateLimited] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isCameraLoading, setIsCameraLoading] = useState(false)
  const [isAnalyticsLoading, setIsAnalyticsLoading] = useState(false)
  const { session, userTeam } = useAuth(setAuthDialog, setAuthView)

  const filteredModels = modelsList.models.filter((model) => {
    if (process.env.NEXT_PUBLIC_HIDE_LOCAL_MODELS) {
      return model.providerId !== 'ollama'
    }
    return true
  })

  const currentModel = filteredModels.find(
    (model) => model.id === languageModel.model,
  )
  const currentTemplate =
    selectedTemplate === 'auto'
      ? templates
      : { [selectedTemplate]: templates[selectedTemplate] }
  const lastMessage = messages[messages.length - 1]

  const { object, submit, isLoading, stop, error } = useObject({
    api: '/api/chat',
    schema,
    onError: (error) => {
      console.error('Error submitting request:', error)
      if (error.message.includes('limit')) {
        setIsRateLimited(true)
      }

      setErrorMessage(error.message)
    },
    onFinish: async ({ object: fragment, error }) => {
      if (!error && fragment) {
        console.log('fragment', fragment)
        
        // Handle non-code fragments (camera feeds and dashboards)
        if (fragment.type === 'camera_feed' || fragment.type === 'dashboard') {
          setCurrentPreview({ fragment, result: undefined })
          setMessage({ result: undefined })
          setCurrentTab('fragment')
          posthog.capture('fragment_generated', {
            type: fragment.type,
          })
          return
        }

        // Handle code fragments (original functionality)
        if (fragment.type === 'code') {
          setIsPreviewLoading(true)
          posthog.capture('fragment_generated', {
            template: fragment.template,
          })

          const response = await fetch('/api/sandbox', {
            method: 'POST',
            body: JSON.stringify({
              fragment,
              userID: session?.user?.id,
              teamID: userTeam?.id,
              accessToken: session?.access_token,
            }),
          })

          const result = await response.json()
          console.log('result', result)
          posthog.capture('sandbox_created', { url: result.url })

          setResult(result)
          setCurrentPreview({ fragment, result })
          setMessage({ result })
          setCurrentTab('fragment')
          setIsPreviewLoading(false)
        }
      }
    },
  })

  useEffect(() => {
    if (object) {
      setFragment(object)
      const content: Message['content'] = [
        { type: 'text', text: object.commentary || '' },
      ]

      // Only add code content for code fragments
      if (object.type === 'code' && object.code) {
        content.push({ type: 'code', text: object.code })
      }

      if (!lastMessage || lastMessage.role !== 'assistant') {
        addMessage({
          role: 'assistant',
          content,
          object,
        })
      }

      if (lastMessage && lastMessage.role === 'assistant') {
        setMessage({
          content,
          object,
        })
      }
    }
  }, [object])

  useEffect(() => {
    if (error) stop()
  }, [error])

  function setMessage(message: Partial<Message>, index?: number) {
    setMessages((previousMessages) => {
      const updatedMessages = [...previousMessages]
      updatedMessages[index ?? previousMessages.length - 1] = {
        ...previousMessages[index ?? previousMessages.length - 1],
        ...message,
      }

      return updatedMessages
    })
  }

  // Function to create hardcoded camera feed fragment
  function createCameraFeedFragment(userInput: string): DeepPartial<FragmentSchema> {
    // Extract store name from user input or use default
    const storeNameMatch = userInput.match(/(?:store|shop|location)\s+([A-Za-z\s]+)/i)
    const storeName = storeNameMatch ? storeNameMatch[1].trim() : 'Main Store'

    return {
      type: 'camera_feed',
      commentary: `Displaying live camera feeds for ${storeName}. This shows multiple camera angles throughout the store including entrance, checkout areas, aisles, and storage areas. You can switch between different camera views to monitor different areas of the store in real-time.`,
      title: 'Camera Feeds',
      description: `Live security camera feeds for ${storeName}`,
      store_name: storeName,
      camera_feed_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      camera_locations: ['Entrance', 'Checkout Counter', 'Aisle 1', 'Aisle 2', 'Storage Room', 'Parking Lot']
    }
  }

  // Function to create hardcoded analytics dashboard fragment
  function createAnalyticsDashboardFragment(userInput: string): DeepPartial<FragmentSchema> {
    // Extract store name from user input or use default
    const storeNameMatch = userInput.match(/(?:store|shop|location)\s+([A-Za-z\s]+)/i)
    const storeName = storeNameMatch ? storeNameMatch[1].trim() : 'Main Store'

    // Determine time period from user input
    let timePeriod = 'This Month'
    if (userInput.toLowerCase().includes('today')) timePeriod = 'Today'
    else if (userInput.toLowerCase().includes('week')) timePeriod = 'This Week'
    else if (userInput.toLowerCase().includes('quarter')) timePeriod = 'This Quarter'
    else if (userInput.toLowerCase().includes('year')) timePeriod = 'This Year'

    return {
      type: 'dashboard',
      commentary: `Displaying comprehensive analytics dashboard for ${storeName}. This dashboard shows key performance metrics including sales revenue, customer traffic, inventory levels, average transaction values, top-selling products, and staff performance. The data is presented for ${timePeriod.toLowerCase()} with comparisons to previous periods to help you understand trends and make informed business decisions.`,
      title: 'Store Analytics',
      description: `Performance dashboard and analytics for ${storeName}`,
      store_name: storeName,
      dashboard_url: 'https://public.tableau.com/views/RetailDashboard_16234567890/Dashboard1?:embed=yes&:display_count=no&:showVizHome=no',
      dashboard_metrics: [
        'Sales Revenue',
        'Customer Traffic',
        'Inventory Levels',
        'Average Transaction Value',
        'Top Selling Products',
        'Staff Performance',
        'Customer Satisfaction',
        'Conversion Rate',
        'Return Rate',
        'Profit Margins'
      ],
      time_period: timePeriod
    }
  }

  async function handleSubmitAuth(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!session) {
      return setAuthDialog(true)
    }

    if (isLoading || isCameraLoading || isAnalyticsLoading) {
      stop()
      setIsCameraLoading(false)
      setIsAnalyticsLoading(false)
    }

    const content: Message['content'] = [{ type: 'text', text: chatInput }]
    const images = await toMessageImage(files)

    if (images.length > 0) {
      images.forEach((image) => {
        content.push({ type: 'image', image })
      })
    }

    const updatedMessages = addMessage({
      role: 'user',
      content,
    })

    const inputLower = chatInput.toLowerCase()

    // Check if user input contains "camera" keyword
    if (inputLower.includes('camera')) {
      // Set loading state to simulate LLM processing
      setIsCameraLoading(true)
      
      // Add a 2-second delay to simulate LLM call
      setTimeout(() => {
        // Create hardcoded camera feed fragment
        const cameraFragment = createCameraFeedFragment(chatInput)
        
        // Set the fragment directly without LLM call
        setFragment(cameraFragment)
        setCurrentPreview({ fragment: cameraFragment, result: undefined })
        setCurrentTab('fragment')
        
        // Add assistant response
        addMessage({
          role: 'assistant',
          content: [{ type: 'text', text: cameraFragment.commentary || '' }],
          object: cameraFragment,
        })

        // Stop loading state
        setIsCameraLoading(false)

        posthog.capture('camera_feed_triggered', {
          store_name: cameraFragment.store_name,
          trigger: 'hardcoded'
        })
      }, 2000) // 2-second delay
    } 
    // Check if user input contains analytics/dashboard keywords
    else if (
      inputLower.includes('analytics') || 
      inputLower.includes('dashboard') || 
      inputLower.includes('performance') || 
      inputLower.includes('metrics') || 
      inputLower.includes('sales data') ||
      inputLower.includes('how is my store') ||
      inputLower.includes('store doing')
    ) {
      // Set loading state to simulate LLM processing
      setIsAnalyticsLoading(true)
      
      // Add a 2-second delay to simulate LLM call
      setTimeout(() => {
        // Create hardcoded analytics dashboard fragment
        const analyticsFragment = createAnalyticsDashboardFragment(chatInput)
        
        // Set the fragment directly without LLM call
        setFragment(analyticsFragment)
        setCurrentPreview({ fragment: analyticsFragment, result: undefined })
        setCurrentTab('fragment')
        
        // Add assistant response
        addMessage({
          role: 'assistant',
          content: [{ type: 'text', text: analyticsFragment.commentary || '' }],
          object: analyticsFragment,
        })

        // Stop loading state
        setIsAnalyticsLoading(false)

        posthog.capture('analytics_dashboard_triggered', {
          store_name: analyticsFragment.store_name,
          time_period: analyticsFragment.time_period,
          trigger: 'hardcoded'
        })
      }, 2000) // 2-second delay
    } 
    else {
      // Normal LLM processing for other requests
      submit({
        userID: session?.user?.id,
        teamID: userTeam?.id,
        messages: toAISDKMessages(updatedMessages),
        template: currentTemplate,
        model: currentModel,
        config: languageModel,
      })

      posthog.capture('chat_submit', {
        template: selectedTemplate,
        model: languageModel.model,
      })
    }

    setChatInput('')
    setFiles([])
    setCurrentTab('fragment')
  }

  function retry() {
    submit({
      userID: session?.user?.id,
      teamID: userTeam?.id,
      messages: toAISDKMessages(messages),
      template: currentTemplate,
      model: currentModel,
      config: languageModel,
    })
  }

  function addMessage(message: Message) {
    setMessages((previousMessages) => [...previousMessages, message])
    return [...messages, message]
  }

  function handleSaveInputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setChatInput(e.target.value)
  }

  function handleFileChange(change: SetStateAction<File[]>) {
    setFiles(change)
  }

  function logout() {
    supabase
      ? supabase.auth.signOut()
      : console.warn('Supabase is not initialized')
  }

  function handleLanguageModelChange(e: LLMModelConfig) {
    setLanguageModel({ ...languageModel, ...e })
  }

  function handleSocialClick(target: 'github' | 'x' | 'discord') {
    if (target === 'github') {
      window.open('https://github.com/e2b-dev/fragments', '_blank')
    } else if (target === 'x') {
      window.open('https://x.com/e2b_dev', '_blank')
    } else if (target === 'discord') {
      window.open('https://discord.gg/U7KEcGErtQ', '_blank')
    }

    posthog.capture(`${target}_click`)
  }

  function handleClearChat() {
    stop()
    setIsCameraLoading(false)
    setIsAnalyticsLoading(false)
    setChatInput('')
    setFiles([])
    setMessages([])
    setFragment(undefined)
    setResult(undefined)
    setCurrentTab('fragment')
    setIsPreviewLoading(false)
  }

  function setCurrentPreview(preview: {
    fragment: DeepPartial<FragmentSchema> | undefined
    result: ExecutionResult | undefined
  }) {
    setFragment(preview.fragment)
    setResult(preview.result)
  }

  function handleUndo() {
    setMessages((previousMessages) => [...previousMessages.slice(0, -2)])
    setCurrentPreview({ fragment: undefined, result: undefined })
  }

  // Combine loading states for UI
  const isAnyLoading = isLoading || isCameraLoading || isAnalyticsLoading

  return (
    <main className="flex min-h-screen max-h-screen">
      {supabase && (
        <AuthDialog
          open={isAuthDialogOpen}
          setOpen={setAuthDialog}
          view={authView}
          supabase={supabase}
        />
      )}
      <div className="grid w-full md:grid-cols-2">
        <div
          className={`flex flex-col w-full max-h-full max-w-[800px] mx-auto px-4 overflow-auto ${fragment ? 'col-span-1' : 'col-span-2'}`}
        >
          <NavBar
            session={session}
            showLogin={() => setAuthDialog(true)}
            signOut={logout}
            onSocialClick={handleSocialClick}
            onClear={handleClearChat}
            canClear={messages.length > 0}
            canUndo={messages.length > 1 && !isAnyLoading}
            onUndo={handleUndo}
          />
          <Chat
            messages={messages}
            isLoading={isAnyLoading}
            setCurrentPreview={setCurrentPreview}
          />
          <ChatInput
            retry={retry}
            isErrored={error !== undefined}
            errorMessage={errorMessage}
            isLoading={isAnyLoading}
            isRateLimited={isRateLimited}
            stop={() => {
              stop()
              setIsCameraLoading(false)
              setIsAnalyticsLoading(false)
            }}
            input={chatInput}
            handleInputChange={handleSaveInputChange}
            handleSubmit={handleSubmitAuth}
            isMultiModal={currentModel?.multiModal || false}
            files={files}
            handleFileChange={handleFileChange}
          >
            <ChatPicker
              templates={templates}
              selectedTemplate={selectedTemplate}
              onSelectedTemplateChange={setSelectedTemplate}
              models={filteredModels}
              languageModel={languageModel}
              onLanguageModelChange={handleLanguageModelChange}
            />
            <ChatSettings
              languageModel={languageModel}
              onLanguageModelChange={handleLanguageModelChange}
              apiKeyConfigurable={!process.env.NEXT_PUBLIC_NO_API_KEY_INPUT}
              baseURLConfigurable={!process.env.NEXT_PUBLIC_NO_BASE_URL_INPUT}
            />
          </ChatInput>
        </div>
        <Preview
          teamID={userTeam?.id}
          accessToken={session?.access_token}
          selectedTab={currentTab}
          onSelectedTabChange={setCurrentTab}
          isChatLoading={isAnyLoading}
          isPreviewLoading={isPreviewLoading}
          fragment={fragment}
          result={result as ExecutionResult}
          onClose={() => setFragment(undefined)}
        />
      </div>
    </main>
  )
}