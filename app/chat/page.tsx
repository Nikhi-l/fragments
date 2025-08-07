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
import { FragmentSchema, fragmentSchema as schema, CameraFeedFragmentSchema, DashboardFragmentSchema, SalesDataFragmentSchema, StaffManagementFragmentSchema, InventoryManagementFragmentSchema, CostAnalyticsFragmentSchema, ForecastFragmentSchema, HelpFragmentSchema } from '@/lib/schema'
import { supabase } from '@/lib/supabase'
import templates, { TemplateId } from '@/lib/templates'
import { ExecutionResult } from '@/lib/types'
import { DeepPartial } from 'ai'
import { experimental_useObject as useObject } from 'ai/react'
import { usePostHog } from 'posthog-js/react'
import { SetStateAction, useCallback, useEffect, useState } from 'react'
import { useLocalStorage } from 'usehooks-ts'

export default function ChatPage() {
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
  const [isSalesDataLoading, setIsSalesDataLoading] = useState(false)
  const [isStaffManagementLoading, setIsStaffManagementLoading] = useState(false)
  const [isInventoryLoading, setIsInventoryLoading] = useState(false)
  const [isCostAnalyticsLoading, setIsCostAnalyticsLoading] = useState(false)
  const [isForecastLoading, setIsForecastLoading] = useState(false)
  const [isHelpLoading, setIsHelpLoading] = useState(false)
  const [showArtifact, setShowArtifact] = useState(false)
  const { session, userTeam } = useAuth(setAuthDialog, setAuthView)

  const filteredModels = modelsList.models.filter((model) => {
    if (process.env.NEXT_PUBLIC_HIDE_LOCAL_MODELS) {
      return model.providerId !== 'ollama'
    }
    return true
  })

  const currentModel =
    filteredModels.find((model) => model.id === languageModel.model) ||
    filteredModels[0]
  const currentTemplate =
    selectedTemplate === 'auto' || !templates[selectedTemplate]
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
        
        // Show artifact window when fragment is generated
        setShowArtifact(true)
        
        // Handle non-code fragments (camera feeds, dashboards, sales data, staff management, inventory, cost analytics, forecast, and help)
        if (fragment.type === 'camera_feed' || fragment.type === 'dashboard' || fragment.type === 'sales_data' || fragment.type === 'staff_management' || fragment.type === 'inventory_management' || fragment.type === 'cost_analytics' || fragment.type === 'forecast' || fragment.type === 'help') {
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

  const addMessage = useCallback((message: Message) => {
    const next = [...messages, message]
    setMessages(next)
    return next
  }, [messages])

  const handleFileChange = useCallback((change: SetStateAction<File[]>) => {
    setFiles(change)
  }, [])

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
  }, [object, addMessage, lastMessage])

  useEffect(() => {
    if (error) stop()
  }, [error, stop])

  // Listen for custom showArtifact events from Chat component
  useEffect(() => {
    const handleShowArtifact = (event: CustomEvent) => {
      setShowArtifact(true)
      setCurrentTab('fragment')
    }

    window.addEventListener('showArtifact', handleShowArtifact as EventListener)
    
    return () => {
      window.removeEventListener('showArtifact', handleShowArtifact as EventListener)
    }
  }, [])

  // Listen for prefill events from LandingPage to update input state directly
  useEffect(() => {
    const handler = (e: Event) => {
      const { text } = (e as CustomEvent).detail || {}
      if (typeof text === 'string') {
        setChatInput(text)
      }
    }
    window.addEventListener('prefillChatInput', handler)
    return () => window.removeEventListener('prefillChatInput', handler)
  }, [setChatInput])

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
  function createCameraFeedFragment(userInput: string): CameraFeedFragmentSchema {
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
  function createAnalyticsDashboardFragment(userInput: string): DashboardFragmentSchema {
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

  // Function to create hardcoded sales data fragment
  function createSalesDataFragment(userInput: string): SalesDataFragmentSchema {
    // Extract store name from user input or use default
    const storeNameMatch = userInput.match(/(?:store|shop|location)\s+([A-Za-z\s]+)/i)
    const storeName = storeNameMatch ? storeNameMatch[1].trim() : 'Main Store'

    // Determine time period from user input
    let timePeriod = 'This Month'
    if (userInput.toLowerCase().includes('today')) timePeriod = 'Today'
    else if (userInput.toLowerCase().includes('week')) timePeriod = 'This Week'
    else if (userInput.toLowerCase().includes('quarter')) timePeriod = 'This Quarter'
    else if (userInput.toLowerCase().includes('year')) timePeriod = 'This Year'

    // Determine comparison period
    let comparisonPeriod = 'Last Month'
    if (timePeriod === 'Today') comparisonPeriod = 'Yesterday'
    else if (timePeriod === 'This Week') comparisonPeriod = 'Last Week'
    else if (timePeriod === 'This Quarter') comparisonPeriod = 'Last Quarter'
    else if (timePeriod === 'This Year') comparisonPeriod = 'Last Year'

    return {
      type: 'sales_data',
      commentary: `Displaying detailed sales data analysis for ${storeName}. This comprehensive view includes revenue trends, transaction volumes, customer metrics, top-performing products, sales by category, payment method distribution, and hourly sales patterns. The data covers ${timePeriod.toLowerCase()} with comparisons to ${comparisonPeriod.toLowerCase()} to help you identify trends, opportunities, and areas for improvement in your sales performance.`,
      title: 'Sales Data',
      description: `Detailed sales analytics and performance metrics for ${storeName}`,
      store_name: storeName,
      time_period: timePeriod,
      sales_metrics: [
        'Total Revenue',
        'Transaction Count',
        'Average Order Value',
        'Customer Count',
        'Conversion Rate',
        'Return Customer Rate',
        'Top Products',
        'Sales by Category',
        'Payment Methods',
        'Hourly Trends'
      ],
      comparison_period: comparisonPeriod
    }
  }

  // Function to create hardcoded staff management fragment
  function createStaffManagementFragment(userInput: string): StaffManagementFragmentSchema {
    // Extract store name from user input or use default
    const storeNameMatch = userInput.match(/(?:store|shop|location)\s+([A-Za-z\s]+)/i)
    const storeName = storeNameMatch ? storeNameMatch[1].trim() : 'Main Store'

    // Determine shift period from user input
    let shiftPeriod = 'Current Shift'
    if (userInput.toLowerCase().includes('morning')) shiftPeriod = 'Morning Shift'
    else if (userInput.toLowerCase().includes('afternoon')) shiftPeriod = 'Afternoon Shift'
    else if (userInput.toLowerCase().includes('evening')) shiftPeriod = 'Evening Shift'
    else if (userInput.toLowerCase().includes('night')) shiftPeriod = 'Night Shift'

    return {
      type: 'staff_management',
      commentary: `Displaying comprehensive staff management system for ${storeName}. This interface shows current staff status, task assignments, break schedule optimization, and automated staff allocation for high-traffic areas. The system includes real-time monitoring of employee performance, task tracking, break scheduling optimization, and intelligent staff assignment based on crowd patterns and store needs. You can view who's currently working, assign tasks, manage breaks, and optimize staff deployment for maximum efficiency.`,
      title: 'Staff Management',
      description: `Complete staff management and task assignment system for ${storeName}`,
      store_name: storeName,
      management_features: [
        'Current Staff Status',
        'Task Assignment',
        'Break Scheduling',
        'Performance Tracking',
        'Crowd-based Assignment',
        'Schedule Optimization',
        'Real-time Monitoring',
        'Automated Alerts'
      ],
      shift_period: shiftPeriod
    }
  }

  // Function to create hardcoded inventory management fragment
  function createInventoryManagementFragment(userInput: string): InventoryManagementFragmentSchema {
    // Extract store name from user input or use default
    const storeNameMatch = userInput.match(/(?:store|shop|location)\s+([A-Za-z\s]+)/i)
    const storeName = storeNameMatch ? storeNameMatch[1].trim() : 'Main Store'

    return {
      type: 'inventory_management',
      commentary: `Displaying comprehensive inventory management system for ${storeName}. This interface provides real-time stock levels, low stock alerts, reorder points, product categories, supplier information, and inventory movement tracking. You can monitor current stock levels, identify items that need reordering, track inventory trends, manage product categories, and optimize stock levels to prevent stockouts while minimizing carrying costs.`,
      title: 'Inventory Management',
      description: `Complete inventory tracking and management system for ${storeName}`,
      store_name: storeName,
      inventory_features: [
        'Stock Levels',
        'Low Stock Alerts',
        'Reorder Points',
        'Product Categories',
        'Supplier Management',
        'Movement Tracking',
        'Cost Analysis',
        'Automated Reordering'
      ],
      time_period: 'Current'
    }
  }

  // Function to create hardcoded cost analytics fragment
  function createCostAnalyticsFragment(userInput: string): CostAnalyticsFragmentSchema {
    // Extract store name from user input or use default
    const storeNameMatch = userInput.match(/(?:store|shop|location)\s+([A-Za-z\s]+)/i)
    const storeName = storeNameMatch ? storeNameMatch[1].trim() : 'Main Store'

    // Determine time period from user input
    let timePeriod = 'This Month'
    if (userInput.toLowerCase().includes('quarter')) timePeriod = 'This Quarter'
    else if (userInput.toLowerCase().includes('year')) timePeriod = 'This Year'

    return {
      type: 'cost_analytics',
      commentary: `Displaying comprehensive cost analytics for ${storeName}. This dashboard provides detailed breakdown of operational costs including staff costs, utilities, rent, inventory costs, marketing expenses, and logistics. You can analyze cost trends, compare against budget allocations, identify cost optimization opportunities, and track key cost metrics like cost per employee and cost per square foot. The analysis helps you understand where your money is going and identify areas for potential savings.`,
      title: 'Cost Analytics',
      description: `Detailed cost analysis and budget tracking for ${storeName}`,
      store_name: storeName,
      cost_categories: [
        'Staff Costs',
        'Utilities',
        'Rent & Facilities',
        'Inventory Costs',
        'Marketing',
        'Logistics',
        'Equipment',
        'Insurance'
      ],
      time_period: timePeriod
    }
  }

  // Function to create hardcoded forecast fragment
  function createForecastFragment(userInput: string): ForecastFragmentSchema {
    // Extract store name from user input or use default
    const storeNameMatch = userInput.match(/(?:store|shop|location)\s+([A-Za-z\s]+)/i)
    const storeName = storeNameMatch ? storeNameMatch[1].trim() : 'Main Store'

    // Determine forecast period from user input
    let forecastPeriod = 'Next 30 Days'
    if (userInput.toLowerCase().includes('quarter')) forecastPeriod = 'Next Quarter'
    else if (userInput.toLowerCase().includes('year')) forecastPeriod = 'Next Year'
    else if (userInput.toLowerCase().includes('6 month') || userInput.toLowerCase().includes('six month')) forecastPeriod = 'Next 6 Months'

    return {
      type: 'forecast',
      commentary: `Displaying comprehensive sales and demand forecast for ${storeName}. This forecast provides day-by-day predictions for the ${forecastPeriod.toLowerCase()}, highlighting high-demand days, special events, and seasonal patterns that will impact your business. The calendar view shows expected sales, customer traffic, and staffing requirements for each day, with detailed insights about upcoming events like holidays, festivals, and local activities that will affect store performance. Use this forecast to optimize inventory levels, staff scheduling, and marketing efforts.`,
      title: 'Sales Forecast',
      description: `Detailed sales and demand forecast for ${storeName}`,
      store_name: storeName,
      forecast_period: forecastPeriod,
      forecast_metrics: [
        'Sales Revenue',
        'Customer Traffic',
        'Demand Patterns',
        'Staff Requirements',
        'Inventory Needs',
        'Special Events',
        'Seasonal Trends',
        'Peak Days'
      ]
    }
  }

  // Function to create hardcoded help fragment
  function createHelpFragment(): HelpFragmentSchema {
    return {
      type: 'help',
      commentary: `Opening the RetailX AI Video Assistant powered by Tavus. This conversational AI interface allows you to have a face-to-face video conversation with an intelligent assistant that can help you with all aspects of RetailX, including store operations, analytics, camera monitoring, inventory management, sales data analysis, and general platform usage. The AI assistant provides personalized guidance and can answer questions in real-time through natural conversation.`,
      title: 'AI Assistant',
      description: 'Conversational video help with AI assistant',
    }
  }

  async function handleSubmitAuth(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (isLoading || isCameraLoading || isAnalyticsLoading || isSalesDataLoading || isStaffManagementLoading || isInventoryLoading || isCostAnalyticsLoading || isForecastLoading || isHelpLoading) {
      stop()
      setIsCameraLoading(false)
      setIsAnalyticsLoading(false)
      setIsSalesDataLoading(false)
      setIsStaffManagementLoading(false)
      setIsInventoryLoading(false)
      setIsCostAnalyticsLoading(false)
      setIsForecastLoading(false)
      setIsHelpLoading(false)
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

    // If user is not authenticated, show the auth dialog but keep the user's
    // message in the chat so it doesn't disappear.
    if (!session) {
      setAuthDialog(true)
      setChatInput('')
      setFiles([])
      setCurrentTab('fragment')
      return
    }

    const inputLower = chatInput.toLowerCase()

    // Check if user input contains "help" keyword
    if (inputLower.includes('help')) {
      // Set loading state to simulate LLM processing
      setIsHelpLoading(true)
      
      // Add a 2-second delay to simulate LLM call
      setTimeout(() => {
        // Create hardcoded help fragment
        const helpFragment = createHelpFragment()
        
        // Set the fragment directly without LLM call
        setFragment(helpFragment)
        setCurrentPreview({ fragment: helpFragment, result: undefined })
        setCurrentTab('fragment')
        setShowArtifact(true)
        
        // Add assistant response
        addMessage({
          role: 'assistant',
          content: [{ type: 'text', text: helpFragment.commentary || '' }],
          object: helpFragment,
        })

        // Stop loading state
        setIsHelpLoading(false)

        posthog.capture('help_triggered', {
          trigger: 'hardcoded'
        })
      }, 2000) // 2-second delay
    }
    // Check if user input contains "camera" keyword
    else if (inputLower.includes('camera')) {
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
        setShowArtifact(true)
        
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
        setShowArtifact(true)
        
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
    // Check if user input contains sales data keywords
    else if (
      inputLower.includes('sales data') || 
      inputLower.includes('sales report') || 
      inputLower.includes('revenue') || 
      inputLower.includes('transactions') || 
      inputLower.includes('sales trends') ||
      inputLower.includes('sales analytics') ||
      inputLower.includes('sales performance') ||
      inputLower.includes('order value') ||
      inputLower.includes('conversion rate') ||
      inputLower.includes('top products') ||
      inputLower.includes('sales by category')
    ) {
      // Set loading state to simulate LLM processing
      setIsSalesDataLoading(true)
      
      // Add a 2-second delay to simulate LLM call
      setTimeout(() => {
        // Create hardcoded sales data fragment
        const salesDataFragment = createSalesDataFragment(chatInput)
        
        // Set the fragment directly without LLM call
        setFragment(salesDataFragment)
        setCurrentPreview({ fragment: salesDataFragment, result: undefined })
        setCurrentTab('fragment')
        setShowArtifact(true)
        
        // Add assistant response
        addMessage({
          role: 'assistant',
          content: [{ type: 'text', text: salesDataFragment.commentary || '' }],
          object: salesDataFragment,
        })

        // Stop loading state
        setIsSalesDataLoading(false)

        posthog.capture('sales_data_triggered', {
          store_name: salesDataFragment.store_name,
          time_period: salesDataFragment.time_period,
          trigger: 'hardcoded'
        })
      }, 2000) // 2-second delay
    }
    // Check if user input contains staff management keywords
    else if (
      inputLower.includes('staff') || 
      inputLower.includes('employee') || 
      inputLower.includes('team') || 
      inputLower.includes('worker') ||
      inputLower.includes('task') ||
      inputLower.includes('assignment') ||
      inputLower.includes('break') ||
      inputLower.includes('schedule') ||
      inputLower.includes('shift') ||
      inputLower.includes('management') ||
      inputLower.includes('who is working') ||
      inputLower.includes('staff status') ||
      inputLower.includes('task assignment') ||
      inputLower.includes('break schedule') ||
      inputLower.includes('crowd') ||
      inputLower.includes('optimization')
    ) {
      // Set loading state to simulate LLM processing
      setIsStaffManagementLoading(true)
      
      // Add a 2-second delay to simulate LLM call
      setTimeout(() => {
        // Create hardcoded staff management fragment
        const staffManagementFragment = createStaffManagementFragment(chatInput)
        
        // Set the fragment directly without LLM call
        setFragment(staffManagementFragment)
        setCurrentPreview({ fragment: staffManagementFragment, result: undefined })
        setCurrentTab('fragment')
        setShowArtifact(true)
        
        // Add assistant response
        addMessage({
          role: 'assistant',
          content: [{ type: 'text', text: staffManagementFragment.commentary || '' }],
          object: staffManagementFragment,
        })

        // Stop loading state
        setIsStaffManagementLoading(false)

        posthog.capture('staff_management_triggered', {
          store_name: staffManagementFragment.store_name,
          shift_period: staffManagementFragment.shift_period,
          trigger: 'hardcoded'
        })
      }, 2000) // 2-second delay
    }
    // Check if user input contains inventory keywords
    else if (
      inputLower.includes('inventory') || 
      inputLower.includes('stock') || 
      inputLower.includes('product') || 
      inputLower.includes('item') ||
      inputLower.includes('reorder') ||
      inputLower.includes('supplier') ||
      inputLower.includes('warehouse') ||
      inputLower.includes('sku') ||
      inputLower.includes('out of stock') ||
      inputLower.includes('low stock') ||
      inputLower.includes('stock level') ||
      inputLower.includes('inventory management')
    ) {
      // Set loading state to simulate LLM processing
      setIsInventoryLoading(true)
      
      // Add a 2-second delay to simulate LLM call
      setTimeout(() => {
        // Create hardcoded inventory management fragment
        const inventoryFragment = createInventoryManagementFragment(chatInput)
        
        // Set the fragment directly without LLM call
        setFragment(inventoryFragment)
        setCurrentPreview({ fragment: inventoryFragment, result: undefined })
        setCurrentTab('fragment')
        setShowArtifact(true)
        
        // Add assistant response
        addMessage({
          role: 'assistant',
          content: [{ type: 'text', text: inventoryFragment.commentary || '' }],
          object: inventoryFragment,
        })

        // Stop loading state
        setIsInventoryLoading(false)

        posthog.capture('inventory_management_triggered', {
          store_name: inventoryFragment.store_name,
          trigger: 'hardcoded'
        })
      }, 2000) // 2-second delay
    }
    // Check if user input contains cost analytics keywords
    else if (
      inputLower.includes('cost') || 
      inputLower.includes('expense') || 
      inputLower.includes('budget') || 
      inputLower.includes('spending') ||
      inputLower.includes('operational cost') ||
      inputLower.includes('running cost') ||
      inputLower.includes('cost analysis') ||
      inputLower.includes('cost breakdown') ||
      inputLower.includes('utilities') ||
      inputLower.includes('rent') ||
      inputLower.includes('overhead')
    ) {
      // Set loading state to simulate LLM processing
      setIsCostAnalyticsLoading(true)
      
      // Add a 2-second delay to simulate LLM call
      setTimeout(() => {
        // Create hardcoded cost analytics fragment
        const costAnalyticsFragment = createCostAnalyticsFragment(chatInput)
        
        // Set the fragment directly without LLM call
        setFragment(costAnalyticsFragment)
        setCurrentPreview({ fragment: costAnalyticsFragment, result: undefined })
        setCurrentTab('fragment')
        setShowArtifact(true)
        
        // Add assistant response
        addMessage({
          role: 'assistant',
          content: [{ type: 'text', text: costAnalyticsFragment.commentary || '' }],
          object: costAnalyticsFragment,
        })

        // Stop loading state
        setIsCostAnalyticsLoading(false)

        posthog.capture('cost_analytics_triggered', {
          store_name: costAnalyticsFragment.store_name,
          time_period: costAnalyticsFragment.time_period,
          trigger: 'hardcoded'
        })
      }, 2000) // 2-second delay
    }
    // Check if user input contains forecast keywords
    else if (
      inputLower.includes('forecast') || 
      inputLower.includes('predict') || 
      inputLower.includes('future sales') || 
      inputLower.includes('projection') ||
      inputLower.includes('upcoming') ||
      inputLower.includes('next month') ||
      inputLower.includes('next quarter') ||
      inputLower.includes('next year') ||
      inputLower.includes('demand') ||
      inputLower.includes('trend') ||
      inputLower.includes('calendar') ||
      inputLower.includes('high demand days') ||
      inputLower.includes('low demand days') ||
      inputLower.includes('busy days') ||
      inputLower.includes('slow days')
    ) {
      // Set loading state to simulate LLM processing
      setIsForecastLoading(true)
      
      // Add a 2-second delay to simulate LLM call
      setTimeout(() => {
        // Create hardcoded forecast fragment
        const forecastFragment = createForecastFragment(chatInput)
        
        // Set the fragment directly without LLM call
        setFragment(forecastFragment)
        setCurrentPreview({ fragment: forecastFragment, result: undefined })
        setCurrentTab('fragment')
        setShowArtifact(true)
        
        // Add assistant response
        addMessage({
          role: 'assistant',
          content: [{ type: 'text', text: forecastFragment.commentary || '' }],
          object: forecastFragment,
        })

        // Stop loading state
        setIsForecastLoading(false)

        posthog.capture('forecast_triggered', {
          store_name: forecastFragment.store_name,
          forecast_period: forecastFragment.forecast_period,
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

  function handleSaveInputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setChatInput(e.target.value)
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
    setIsSalesDataLoading(false)
    setIsStaffManagementLoading(false)
    setIsInventoryLoading(false)
    setIsCostAnalyticsLoading(false)
    setIsForecastLoading(false)
    setIsHelpLoading(false)
    setChatInput('')
    setFiles([])
    setMessages([])
    setFragment(undefined)
    setResult(undefined)
    setCurrentTab('fragment')
    setIsPreviewLoading(false)
    setShowArtifact(false)
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
    setShowArtifact(false)
  }

  function handleCloseArtifact() {
    setFragment(undefined)
    setShowArtifact(false)
  }

  // Combine loading states for UI
  const isAnyLoading = isLoading || isCameraLoading || isAnalyticsLoading || isSalesDataLoading || isStaffManagementLoading || isInventoryLoading || isCostAnalyticsLoading || isForecastLoading || isHelpLoading

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
      <div className="flex w-full">
        {/* Chat Window - Dynamic width based on artifact visibility */}
        <div 
          className={`flex flex-col overflow-auto ${
            showArtifact ? 'w-[25%] px-2' : 'w-full max-w-[800px] mx-auto px-4'
          }`}
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
              setIsSalesDataLoading(false)
              setIsStaffManagementLoading(false)
              setIsInventoryLoading(false)
              setIsCostAnalyticsLoading(false)
              setIsForecastLoading(false)
              setIsHelpLoading(false)
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

        {/* Preview/Artifact Window - Fixed 75% width when shown */}
        <div 
          className={`${
            showArtifact 
              ? 'w-[75%] opacity-100' 
              : 'w-0 opacity-0 overflow-hidden'
          }`}
        >
          {showArtifact && (
            <Preview
              teamID={userTeam?.id}
              accessToken={session?.access_token}
              selectedTab={currentTab}
              onSelectedTabChange={setCurrentTab}
              isChatLoading={isAnyLoading}
              isPreviewLoading={isPreviewLoading}
              fragment={fragment}
              result={result as ExecutionResult}
              onClose={handleCloseArtifact}
            />
          )}
        </div>
      </div>
    </main>
  )
}