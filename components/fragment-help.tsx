'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  HelpCircle,
  Video,
  MessageCircle,
  Loader2,
  ExternalLink,
  PhoneOff,
  RefreshCw,
  Bot,
  Clock,
  CheckCircle,
  XCircle,
  Maximize2,
  Minimize2,
  Sparkles,
  Camera,
  Settings,
  Package,
  BarChart3,
  Users,
  ShoppingCart,
  FileText,
  Headphones,
  Zap,
  Shield
} from 'lucide-react'
import { useState, useEffect, useRef, useCallback } from 'react'

interface TavusConversation {
  conversation_id: string
  conversation_name: string
  status: 'active' | 'ended'
  conversation_url: string
  replica_id: string
  persona_id: string
  created_at: string
}

interface ConversationConfig {
  replica_id?: string
  persona_id?: string
  audio_only: boolean
  conversation_name: string
  conversational_context: string
  custom_greeting: string
}

export function FragmentHelp() {
  const apiKey = process.env.TAVUS_API_KEY || 'f17244051d5540389a480bf2608cec3a'

  const [conversation, setConversation] = useState<TavusConversation | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [error, setError] = useState('')
  const [config] = useState<ConversationConfig>({
    replica_id: 'rf4703150052',
    audio_only: false,
    conversation_name: 'RetailX Help Session',
    conversational_context: 'You are a helpful AI assistant for RetailX, a retail management platform. Help users with questions about store operations, analytics, camera monitoring, inventory management, sales data, and general platform usage. Be friendly, knowledgeable, and provide clear guidance.',
    custom_greeting: "Hello! I'm your RetailX AI assistant. How can I help you today?"
  })
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected' | 'ended'>('disconnected')
  const [isFullscreen, setIsFullscreen] = useState(false)

  const iframeRef = useRef<HTMLIFrameElement>(null)

  const createConversation = useCallback(async () => {
    setIsCreating(true)
    setError('')
    setConnectionStatus('connecting')

    try {
      const requestBody: any = {
        replica_id: config.replica_id,
        audio_only: config.audio_only,
        conversation_name: config.conversation_name,
        conversational_context: config.conversational_context,
        custom_greeting: config.custom_greeting,
        properties: {
          participant_left_timeout: 60,
          participant_absent_timeout: 300,
          enable_recording: false
        }
      }

      if (config.persona_id && config.persona_id.trim()) {
        requestBody.persona_id = config.persona_id.trim()
      }

      const response = await fetch('https://tavusapi.com/v2/conversations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey
        },
        body: JSON.stringify(requestBody)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      const conversationData: TavusConversation = await response.json()
      setConversation(conversationData)
      setConnectionStatus('connected')
    } catch (err: any) {
      setError(`Failed to create conversation: ${err.message}`)
      setConnectionStatus('disconnected')
      console.error('Error creating conversation:', err)
    } finally {
      setIsCreating(false)
    }
  }, [apiKey, config])

  useEffect(() => {
    createConversation()
  }, [createConversation])

  const endConversation = () => {
    setConversation(null)
    setConnectionStatus('ended')
    setTimeout(() => {
      setConnectionStatus('disconnected')
    }, 2000)
  }

  const resetSession = () => {
    setConversation(null)
    setConnectionStatus('disconnected')
    setError('')
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const openInNewTab = () => {
    if (conversation?.conversation_url) {
      window.open(conversation.conversation_url, '_blank')
    }
  }

  const helpTopics = [
    { icon: Camera, label: 'Camera Monitoring', gradient: 'from-blue-500 to-cyan-500' },
    { icon: BarChart3, label: 'Sales Analytics', gradient: 'from-emerald-500 to-teal-500' },
    { icon: Package, label: 'Inventory', gradient: 'from-orange-500 to-amber-500' },
    { icon: Users, label: 'Staff Management', gradient: 'from-violet-500 to-purple-500' },
    { icon: ShoppingCart, label: 'Cost Analysis', gradient: 'from-rose-500 to-pink-500' },
    { icon: Settings, label: 'Settings & Config', gradient: 'from-zinc-500 to-zinc-600' },
    { icon: FileText, label: 'Reports', gradient: 'from-indigo-500 to-blue-500' },
    { icon: Shield, label: 'Security', gradient: 'from-red-500 to-orange-500' }
  ]

  const getStatusStyle = () => {
    switch (connectionStatus) {
      case 'connected':
        return { bg: 'bg-emerald-500/10', text: 'text-emerald-600 dark:text-emerald-400', dot: 'bg-emerald-500' }
      case 'connecting':
        return { bg: 'bg-amber-500/10', text: 'text-amber-600 dark:text-amber-400', dot: 'bg-amber-500' }
      case 'ended':
        return { bg: 'bg-red-500/10', text: 'text-red-600 dark:text-red-400', dot: 'bg-red-500' }
      default:
        return { bg: 'bg-zinc-500/10', text: 'text-zinc-600 dark:text-zinc-400', dot: 'bg-zinc-500' }
    }
  }

  const status = getStatusStyle()

  // Fullscreen Video View
  if (isFullscreen && conversation) {
    return (
      <div className="fixed inset-0 bg-zinc-900 z-50 flex flex-col">
        <div className="bg-zinc-900/95 backdrop-blur-xl text-white p-4 flex items-center justify-between border-b border-zinc-800">
          <div className="flex items-center gap-4">
            <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500">
              <Video className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="font-semibold">{conversation.conversation_name}</span>
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Live Session
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={openInNewTab}
              variant="outline"
              size="sm"
              className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              New Tab
            </Button>
            <Button
              onClick={toggleFullscreen}
              variant="outline"
              size="sm"
              className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
            >
              <Minimize2 className="h-4 w-4" />
            </Button>
            <Button
              onClick={endConversation}
              size="sm"
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              <PhoneOff className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex-1 bg-zinc-950">
          <iframe
            ref={iframeRef}
            src={conversation.conversation_url}
            className="w-full h-full border-none"
            allow="camera; microphone; fullscreen; display-capture; autoplay"
            title="Tavus Video Conversation"
          />
        </div>
      </div>
    )
  }

  // Main Help Interface
  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-zinc-50 via-cyan-50/30 to-blue-50/20 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-800">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/25">
                <Headphones className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-zinc-900 dark:text-white">AI Video Assistant</h1>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">Get personalized help with RetailX</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${status.bg} ${status.text}`}>
                {connectionStatus === 'connecting' ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                  <span className={`h-2 w-2 rounded-full ${status.dot} ${connectionStatus === 'connected' ? 'animate-pulse' : ''}`} />
                )}
                {connectionStatus.charAt(0).toUpperCase() + connectionStatus.slice(1)}
              </span>
              <Button
                onClick={resetSession}
                variant="outline"
                size="sm"
                className="h-9 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-6">
          {!conversation ? (
            // Loading or Error State
            <>
              {/* Status Card */}
              <div className="p-5 rounded-2xl bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${isCreating || connectionStatus === 'connecting' ? 'bg-amber-100 dark:bg-amber-500/20' : 'bg-emerald-100 dark:bg-emerald-500/20'}`}>
                      {isCreating || connectionStatus === 'connecting' ? (
                        <Loader2 className="h-5 w-5 text-amber-600 dark:text-amber-400 animate-spin" />
                      ) : (
                        <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-zinc-900 dark:text-white">
                        {isCreating ? 'Creating Video Session' : 'Tavus API Connected'}
                      </h3>
                      <p className="text-sm text-zinc-500">
                        {isCreating ? 'Please wait while we connect you...' : 'Starting video conversation automatically...'}
                      </p>
                    </div>
                  </div>
                  <Badge className={`${isCreating ? 'bg-amber-500' : 'bg-emerald-500'} text-white border-0`}>
                    {isCreating ? 'Connecting' : 'Ready'}
                  </Badge>
                </div>
              </div>

              {error && (
                <div className="p-5 rounded-2xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-red-100 dark:bg-red-500/20">
                      <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-red-800 dark:text-red-300">Connection Failed</h3>
                      <p className="text-sm text-red-600 dark:text-red-400 mt-1">{error}</p>
                      <Button
                        onClick={createConversation}
                        size="sm"
                        className="mt-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
                      >
                        Try Again
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Help Topics Grid */}
              <div className="p-5 rounded-2xl bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50">
                <div className="flex items-center gap-2 mb-4">
                  <HelpCircle className="h-5 w-5 text-cyan-500" />
                  <h2 className="font-semibold text-zinc-900 dark:text-white">What I can help you with</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {helpTopics.map((topic, index) => {
                    const Icon = topic.icon
                    return (
                      <div
                        key={index}
                        className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-700/50 hover:border-cyan-300 dark:hover:border-cyan-700 transition-all cursor-pointer group"
                      >
                        <div className={`p-2 rounded-lg bg-gradient-to-r ${topic.gradient} mb-3 w-fit group-hover:scale-110 transition-transform`}>
                          <Icon className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-sm font-medium text-zinc-900 dark:text-white">{topic.label}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { icon: MessageCircle, title: 'Ask Questions', desc: 'Get help with any feature', gradient: 'from-cyan-500 to-blue-500' },
                  { icon: Video, title: 'HD Video', desc: 'Crystal clear calls', gradient: 'from-violet-500 to-purple-500' },
                  { icon: Bot, title: 'AI-Powered', desc: 'Smart assistance', gradient: 'from-emerald-500 to-teal-500' },
                  { icon: Zap, title: 'Real-time', desc: 'Instant responses', gradient: 'from-orange-500 to-amber-500' }
                ].map((feature, index) => {
                  const Icon = feature.icon
                  return (
                    <div key={index} className="p-5 rounded-2xl bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50">
                      <div className={`p-2.5 rounded-xl bg-gradient-to-r ${feature.gradient} w-fit mb-3`}>
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="font-semibold text-zinc-900 dark:text-white">{feature.title}</h3>
                      <p className="text-sm text-zinc-500 mt-1">{feature.desc}</p>
                    </div>
                  )
                })}
              </div>
            </>
          ) : (
            // Active Conversation
            <>
              {/* Session Info */}
              <div className="p-5 rounded-2xl bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500">
                      <Video className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-zinc-900 dark:text-white">{conversation.conversation_name}</h3>
                      <p className="text-sm text-zinc-500">
                        Session: {conversation.conversation_id?.substring(0, 8)}...
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      onClick={openInNewTab}
                      variant="outline"
                      size="sm"
                      className="border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    >
                      <ExternalLink className="h-4 w-4 mr-1.5" />
                      New Tab
                    </Button>
                    <Button
                      onClick={toggleFullscreen}
                      variant="outline"
                      size="sm"
                      className="border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    >
                      <Maximize2 className="h-4 w-4 mr-1.5" />
                      Fullscreen
                    </Button>
                    <Button
                      onClick={endConversation}
                      size="sm"
                      className="bg-red-500 hover:bg-red-600 text-white"
                    >
                      <PhoneOff className="h-4 w-4 mr-1.5" />
                      End
                    </Button>
                  </div>
                </div>
              </div>

              {/* Video Interface */}
              <div className="rounded-2xl bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50 overflow-hidden">
                <div className="relative w-full" style={{ height: '600px' }}>
                  {connectionStatus === 'connecting' ? (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-500/10 dark:to-blue-500/10">
                      <div className="text-center space-y-4">
                        <div className="p-4 rounded-2xl bg-white dark:bg-zinc-800 shadow-xl mx-auto w-fit">
                          <Loader2 className="h-12 w-12 animate-spin text-cyan-500" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">Connecting to AI Assistant</h3>
                          <p className="text-sm text-zinc-500 mt-1">
                            Please wait while we establish the video connection...
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <iframe
                      ref={iframeRef}
                      src={conversation.conversation_url}
                      className="w-full h-full border-none"
                      allow="camera; microphone; fullscreen; display-capture; autoplay"
                      title="Tavus Video Conversation"
                    />
                  )}
                </div>
              </div>

              {/* Session Footer */}
              <div className="p-4 rounded-2xl bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-6 text-zinc-500">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>Started: {new Date(conversation.created_at).toLocaleTimeString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                      <span>HD Quality</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bot className="h-4 w-4 text-cyan-500" />
                      <span>AI Active</span>
                    </div>
                  </div>
                  <span className="text-xs text-zinc-400">
                    Replica: {conversation.replica_id?.substring(0, 8)}...
                  </span>
                </div>
              </div>
            </>
          )}

          {/* AI CTA - Always visible */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"30\" height=\"30\" viewBox=\"0 0 30 30\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z\" fill=\"rgba(255,255,255,0.1)\"%3E%3C/path%3E%3C/svg%3E')] opacity-50" />
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">Powered by Tavus AI</h3>
                  <p className="text-white/80 text-sm mt-1">
                    Conversational AI with photorealistic video responses
                  </p>
                </div>
              </div>
              <Button className="bg-white text-cyan-600 hover:bg-white/90 font-semibold">
                <Zap className="h-4 w-4 mr-2" />
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
