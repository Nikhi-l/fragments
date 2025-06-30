'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { 
  HelpCircle, 
  Video, 
  MessageCircle, 
  Settings, 
  Loader2,
  ExternalLink,
  Phone,
  PhoneOff,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  Volume2,
  VolumeX,
  RefreshCw,
  User,
  Bot,
  Clock,
  CheckCircle,
  XCircle,
  Maximize2,
  Minimize2
} from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

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
  // Use hardcoded API key from environment
  const apiKey = process.env.TAVUS_API_KEY || 'f17244051d5540389a480bf2608cec3a'
  
  const [conversation, setConversation] = useState<TavusConversation | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [error, setError] = useState('')
  const [config, setConfig] = useState<ConversationConfig>({
    replica_id: 'rf4703150052', // Hardcoded replica ID
    audio_only: false,
    conversation_name: 'RetailX Help Session',
    conversational_context: 'You are a helpful AI assistant for RetailX, a retail management platform. Help users with questions about store operations, analytics, camera monitoring, inventory management, sales data, and general platform usage. Be friendly, knowledgeable, and provide clear guidance.',
    custom_greeting: 'Hello! I\'m your RetailX AI assistant. How can I help you today?'
  })
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected' | 'ended'>('disconnected')
  const [isFullscreen, setIsFullscreen] = useState(false)
  
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // Auto-start conversation when component mounts
  useEffect(() => {
    createConversation()
  }, [])

  const createConversation = async () => {
    setIsCreating(true)
    setError('')
    setConnectionStatus('connecting')

    try {
      // Build request body, only including optional fields if they have values
      const requestBody: any = {
        replica_id: config.replica_id, // Always include the hardcoded replica ID
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

      // Only include persona_id if it has a non-empty value
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
  }

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

  // Fullscreen Video View
  if (isFullscreen && conversation) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex flex-col">
        {/* Fullscreen Header */}
        <div className="bg-black/90 text-white p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Video className="h-5 w-5" />
              <span className="font-medium">{conversation.conversation_name}</span>
            </div>
            <Badge variant="outline" className="text-white border-white">
              {connectionStatus}
            </Badge>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              onClick={openInNewTab}
              variant="outline"
              size="sm"
              className="text-white border-white hover:bg-white/20"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Open in New Tab
            </Button>
            <Button
              onClick={toggleFullscreen}
              variant="outline"
              size="sm"
              className="text-white border-white hover:bg-white/20"
            >
              <Minimize2 className="h-4 w-4" />
            </Button>
            <Button
              onClick={endConversation}
              variant="destructive"
              size="sm"
            >
              <PhoneOff className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Fullscreen Video */}
        <div className="flex-1 bg-black">
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
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <HelpCircle className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">AI Video Assistant</h2>
              <p className="text-sm text-muted-foreground">Get personalized help with RetailX</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Badge 
              variant={connectionStatus === 'connected' ? 'default' : 'secondary'}
              className={
                connectionStatus === 'connected' ? 'bg-green-100 text-green-800 border-green-200' :
                connectionStatus === 'connecting' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                connectionStatus === 'ended' ? 'bg-red-100 text-red-800 border-red-200' :
                'bg-gray-100 text-gray-800 border-gray-200'
              }
            >
              {connectionStatus === 'connected' && <CheckCircle className="h-3 w-3 mr-1" />}
              {connectionStatus === 'connecting' && <Loader2 className="h-3 w-3 mr-1 animate-spin" />}
              {connectionStatus === 'ended' && <XCircle className="h-3 w-3 mr-1" />}
              {connectionStatus === 'disconnected' && <User className="h-3 w-3 mr-1" />}
              {connectionStatus.charAt(0).toUpperCase() + connectionStatus.slice(1)}
            </Badge>
            
            <Button
              onClick={resetSession}
              variant="outline"
              size="sm"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 space-y-4">
        {!conversation ? (
          // Loading or Error State
          <div className="space-y-4">
            {/* API Status */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Tavus API Connected</h3>
                      <p className="text-sm text-muted-foreground">Starting video conversation automatically...</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Auto-Starting
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {isCreating && (
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                    <div>
                      <h3 className="font-medium">Creating Video Session</h3>
                      <p className="text-sm text-muted-foreground">Please wait while we connect you to your AI assistant...</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {error && (
              <Card>
                <CardContent className="p-4">
                  <div className="p-3 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-md">
                    <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                    <Button 
                      onClick={createConversation} 
                      className="mt-2"
                      size="sm"
                    >
                      Try Again
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Help Topics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What I can help you with:</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    'Camera Feed Setup',
                    'Sales Analytics',
                    'Inventory Management',
                    'Dashboard Configuration',
                    'Staff Performance',
                    'Customer Analytics',
                    'Store Comparison',
                    'Report Generation'
                  ].map((topic, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 p-2 border rounded-lg"
                    >
                      <MessageCircle className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">{topic}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Features Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Features:</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <MessageCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Ask Questions</h4>
                      <p className="text-sm text-muted-foreground">Get help with RetailX features and functionality</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Video className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">HD Video Calls</h4>
                      <p className="text-sm text-muted-foreground">High-quality video conversations</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Bot className="h-5 w-5 text-purple-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">AI-Powered</h4>
                      <p className="text-sm text-muted-foreground">Intelligent responses tailored to retail management</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-orange-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Real-time</h4>
                      <p className="text-sm text-muted-foreground">Instant responses and interactive conversation</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          // Active Conversation
          <div className="space-y-4">
            {/* Conversation Info */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                      <Video className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">{conversation.conversation_name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Session ID: {conversation.conversation_id} • Status: {conversation.status}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      onClick={openInNewTab}
                      variant="outline"
                      size="sm"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      New Tab
                    </Button>
                    
                    <Button
                      onClick={toggleFullscreen}
                      variant="outline"
                      size="sm"
                    >
                      <Maximize2 className="h-4 w-4 mr-2" />
                      Fullscreen
                    </Button>
                    
                    <Button
                      onClick={endConversation}
                      variant="destructive"
                      size="sm"
                    >
                      <PhoneOff className="h-4 w-4 mr-2" />
                      End Session
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Video Interface */}
            <Card className="flex-1">
              <CardContent className="p-0">
                <div className="relative w-full" style={{ height: '600px' }}>
                  {connectionStatus === 'connecting' ? (
                    <div className="w-full h-full flex items-center justify-center bg-gray-50 dark:bg-gray-900 rounded-lg">
                      <div className="text-center space-y-4">
                        <Loader2 className="h-12 w-12 animate-spin mx-auto text-blue-600" />
                        <div>
                          <h3 className="text-lg font-medium">Connecting to AI Assistant</h3>
                          <p className="text-sm text-muted-foreground">
                            Please wait while we establish the video connection...
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <iframe
                      ref={iframeRef}
                      src={conversation.conversation_url}
                      className="w-full h-full rounded-lg border-none"
                      allow="camera; microphone; fullscreen; display-capture; autoplay"
                      title="Tavus Video Conversation"
                    />
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Session Info */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>Started: {new Date(conversation.created_at).toLocaleTimeString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>HD Quality</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Bot className="h-4 w-4" />
                      <span>AI Assistant Active</span>
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground">
                    Replica ID: {conversation.replica_id}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}