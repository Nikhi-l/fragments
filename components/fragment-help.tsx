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

// Daily.co call frame interface
interface DailyCallFrame {
  join: (options: { url: string }) => Promise<void>
  leave: () => Promise<void>
  destroy: () => void
  on: (event: string, callback: (event?: any) => void) => void
  participants: () => any
  setLocalAudio: (enabled: boolean) => void
  setLocalVideo: (enabled: boolean) => void
  startScreenShare: () => void
  stopScreenShare: () => void
}

declare global {
  interface Window {
    Daily: {
      createFrame: (element?: HTMLElement, options?: any) => DailyCallFrame
    }
  }
}

export function FragmentHelp() {
  const [apiKey, setApiKey] = useState('')
  const [isApiKeySet, setIsApiKeySet] = useState(false)
  const [conversation, setConversation] = useState<TavusConversation | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [error, setError] = useState('')
  const [config, setConfig] = useState<ConversationConfig>({
    audio_only: false,
    conversation_name: 'RetailX Help Session',
    conversational_context: 'You are a helpful AI assistant for RetailX, a retail management platform. Help users with questions about store operations, analytics, camera monitoring, inventory management, sales data, and general platform usage. Be friendly, knowledgeable, and provide clear guidance.',
    custom_greeting: 'Hello! I\'m your RetailX AI assistant. How can I help you today?'
  })
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected' | 'ended'>('disconnected')
  const [callFrame, setCallFrame] = useState<DailyCallFrame | null>(null)
  const [isAudioEnabled, setIsAudioEnabled] = useState(true)
  const [isVideoEnabled, setIsVideoEnabled] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [participantCount, setParticipantCount] = useState(0)
  const [isDailyLoaded, setIsDailyLoaded] = useState(false)
  
  const videoContainerRef = useRef<HTMLDivElement>(null)

  // Load Daily.co script
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://unpkg.com/@daily-co/daily-js'
    script.crossOrigin = 'anonymous'
    script.onload = () => {
      setIsDailyLoaded(true)
    }
    document.head.appendChild(script)

    return () => {
      if (callFrame) {
        callFrame.destroy()
      }
    }
  }, [])

  const handleApiKeySubmit = () => {
    if (apiKey.trim()) {
      setIsApiKeySet(true)
      setError('')
    } else {
      setError('Please enter a valid API key')
    }
  }

  const createConversation = async () => {
    if (!apiKey) {
      setError('API key is required')
      return
    }

    if (!isDailyLoaded) {
      setError('Video calling system is still loading. Please try again in a moment.')
      return
    }

    setIsCreating(true)
    setError('')

    try {
      // Build request body, only including optional fields if they have values
      const requestBody: any = {
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

      // Only include replica_id if it has a non-empty value
      if (config.replica_id && config.replica_id.trim()) {
        requestBody.replica_id = config.replica_id.trim()
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
      setConnectionStatus('connecting')
      
      // Initialize Daily.co call frame
      await initializeVideoCall(conversationData.conversation_url)

    } catch (err: any) {
      setError(`Failed to create conversation: ${err.message}`)
      console.error('Error creating conversation:', err)
    } finally {
      setIsCreating(false)
    }
  }

  const initializeVideoCall = async (roomUrl: string) => {
    try {
      if (!videoContainerRef.current || !window.Daily) {
        throw new Error('Video container or Daily.co not available')
      }

      // Create Daily call frame
      const frame = window.Daily.createFrame(videoContainerRef.current, {
        iframeStyle: {
          width: '100%',
          height: '100%',
          border: 'none',
          borderRadius: '8px'
        },
        showLeaveButton: false,
        showFullscreenButton: false,
        showLocalVideo: true,
        showParticipantsBar: true
      })

      // Set up event listeners
      frame.on('joined-meeting', () => {
        setIsConnected(true)
        setConnectionStatus('connected')
        setParticipantCount(Object.keys(frame.participants()).length)
      })

      frame.on('participant-joined', () => {
        setParticipantCount(Object.keys(frame.participants()).length)
      })

      frame.on('participant-left', () => {
        setParticipantCount(Object.keys(frame.participants()).length)
      })

      frame.on('left-meeting', () => {
        setIsConnected(false)
        setConnectionStatus('ended')
        setParticipantCount(0)
      })

      frame.on('error', (error: any) => {
        console.error('Daily.co error:', error)
        setError(`Video call error: ${error.message || 'Unknown error'}`)
        setConnectionStatus('disconnected')
      })

      // Join the meeting
      await frame.join({ url: roomUrl })
      setCallFrame(frame)

    } catch (err: any) {
      setError(`Failed to initialize video call: ${err.message}`)
      setConnectionStatus('disconnected')
    }
  }

  const endConversation = async () => {
    if (callFrame) {
      try {
        await callFrame.leave()
        callFrame.destroy()
        setCallFrame(null)
      } catch (err) {
        console.error('Error ending call:', err)
      }
    }
    
    setConversation(null)
    setIsConnected(false)
    setConnectionStatus('ended')
    setParticipantCount(0)
    
    setTimeout(() => {
      setConnectionStatus('disconnected')
    }, 2000)
  }

  const resetSession = () => {
    if (callFrame) {
      callFrame.destroy()
      setCallFrame(null)
    }
    
    setConversation(null)
    setIsConnected(false)
    setConnectionStatus('disconnected')
    setError('')
    setParticipantCount(0)
  }

  const toggleAudio = () => {
    if (callFrame) {
      const newState = !isAudioEnabled
      callFrame.setLocalAudio(newState)
      setIsAudioEnabled(newState)
    }
  }

  const toggleVideo = () => {
    if (callFrame) {
      const newState = !isVideoEnabled
      callFrame.setLocalVideo(newState)
      setIsVideoEnabled(newState)
    }
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  // API Key Setup Screen
  if (!isApiKeySet) {
    return (
      <div className="flex flex-col h-full p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <HelpCircle className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">RetailX AI Assistant</h2>
            <p className="text-sm text-muted-foreground">Get help with conversational AI video support</p>
          </div>
        </div>

        {/* API Key Setup */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="h-5 w-5" />
              <span>Setup Tavus API</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="apiKey">Tavus API Key</Label>
              <Input
                id="apiKey"
                type="password"
                placeholder="Enter your Tavus API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleApiKeySubmit()}
              />
              <p className="text-xs text-muted-foreground">
                Get your API key from the <a href="https://platform.tavus.io" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Tavus Platform</a>
              </p>
            </div>

            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-md">
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            <Button onClick={handleApiKeySubmit} className="w-full" disabled={!isDailyLoaded}>
              <Video className="h-4 w-4 mr-2" />
              {isDailyLoaded ? 'Connect to Tavus' : 'Loading Video System...'}
            </Button>

            {!isDailyLoaded && (
              <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Loading Daily.co video infrastructure...</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Features Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">What you can do:</CardTitle>
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
                  <p className="text-sm text-muted-foreground">High-quality video powered by Daily.co</p>
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
    )
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
              {participantCount} participant{participantCount !== 1 ? 's' : ''}
            </Badge>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              onClick={toggleAudio}
              variant="outline"
              size="sm"
              className={`text-white border-white hover:bg-white/20 ${!isAudioEnabled ? 'bg-red-600' : ''}`}
            >
              {isAudioEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
            </Button>
            <Button
              onClick={toggleVideo}
              variant="outline"
              size="sm"
              className={`text-white border-white hover:bg-white/20 ${!isVideoEnabled ? 'bg-red-600' : ''}`}
            >
              {isVideoEnabled ? <Camera className="h-4 w-4" /> : <CameraOff className="h-4 w-4" />}
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
          <div ref={videoContainerRef} className="w-full h-full" />
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
          // Start Conversation
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Video className="h-5 w-5" />
                  <span>Start Video Conversation</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="conversationName">Session Name</Label>
                    <Input
                      id="conversationName"
                      value={config.conversation_name}
                      onChange={(e) => setConfig(prev => ({ ...prev, conversation_name: e.target.value }))}
                      placeholder="Help Session Name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="replicaId">Replica ID (Optional)</Label>
                    <Input
                      id="replicaId"
                      value={config.replica_id || ''}
                      onChange={(e) => setConfig(prev => ({ ...prev, replica_id: e.target.value }))}
                      placeholder="Enter replica ID"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="context">Conversation Context</Label>
                  <textarea
                    id="context"
                    className="w-full p-3 border rounded-md resize-none"
                    rows={3}
                    value={config.conversational_context}
                    onChange={(e) => setConfig(prev => ({ ...prev, conversational_context: e.target.value }))}
                    placeholder="Describe what you need help with..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="greeting">Custom Greeting</Label>
                  <Input
                    id="greeting"
                    value={config.custom_greeting}
                    onChange={(e) => setConfig(prev => ({ ...prev, custom_greeting: e.target.value }))}
                    placeholder="How the AI should greet you"
                  />
                </div>

                {error && (
                  <div className="p-3 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-md">
                    <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                  </div>
                )}

                <Button 
                  onClick={createConversation} 
                  disabled={isCreating || !isDailyLoaded}
                  className="w-full"
                  size="lg"
                >
                  {isCreating ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Creating Conversation...
                    </>
                  ) : !isDailyLoaded ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Loading Video System...
                    </>
                  ) : (
                    <>
                      <Video className="h-4 w-4 mr-2" />
                      Start Video Help Session
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Quick Help Topics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Common Help Topics</CardTitle>
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
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="justify-start"
                      onClick={() => setConfig(prev => ({ 
                        ...prev, 
                        conversational_context: `I need help with ${topic.toLowerCase()} in RetailX. Please guide me through the process and answer any questions I have.`
                      }))}
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      {topic}
                    </Button>
                  ))}
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
                        {participantCount} participant{participantCount !== 1 ? 's' : ''} • Session ID: {conversation.conversation_id}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
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
                <div className="relative w-full" style={{ height: '500px' }}>
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
                    <div ref={videoContainerRef} className="w-full h-full rounded-lg overflow-hidden" />
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Video Controls */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button
                      onClick={toggleAudio}
                      variant={isAudioEnabled ? "outline" : "destructive"}
                      size="sm"
                    >
                      {isAudioEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                    </Button>
                    
                    <Button
                      onClick={toggleVideo}
                      variant={isVideoEnabled ? "outline" : "destructive"}
                      size="sm"
                    >
                      {isVideoEnabled ? <Camera className="h-4 w-4" /> : <CameraOff className="h-4 w-4" />}
                    </Button>
                  </div>

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
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}