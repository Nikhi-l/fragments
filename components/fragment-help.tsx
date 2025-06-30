'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
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

export function FragmentHelp() {
  // Use hardcoded API key and replica ID
  const apiKey = 'f17244051d5540389a480bf2608cec3a'
  const hardcodedReplicaId = 'r179c5e0-8d0f-4e93-9b2c-8f2d1e5a7b3c' // Hardcoded replica ID
  
  const [conversation, setConversation] = useState<TavusConversation | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [error, setError] = useState('')
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected' | 'ended'>('disconnected')
  const [isFullscreen, setIsFullscreen] = useState(false)
  
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // Auto-start the conversation when component mounts
  useEffect(() => {
    createConversation()
  }, [])

  const createConversation = async () => {
    setIsCreating(true)
    setError('')
    setConnectionStatus('connecting')

    try {
      const requestBody = {
        replica_id: hardcodedReplicaId,
        audio_only: false,
        conversation_name: 'RetailX Help Session',
        conversational_context: 'You are a helpful AI assistant for RetailX, a retail management platform. Help users with questions about store operations, analytics, camera monitoring, inventory management, sales data, and general platform usage. Be friendly, knowledgeable, and provide clear guidance.',
        custom_greeting: 'Hello! I\'m your RetailX AI assistant. How can I help you today?',
        properties: {
          participant_left_timeout: 60,
          participant_absent_timeout: 300,
          enable_recording: false
        }
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
    // Auto-restart the conversation
    setTimeout(() => {
      createConversation()
    }, 500)
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

  // Main Help Interface - Full Screen Video
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

      {/* Main Video Interface - Full Height */}
      <div className="flex-1 flex flex-col">
        {!conversation ? (
          // Loading/Error State
          <div className="flex-1 flex items-center justify-center">
            {isCreating ? (
              <div className="text-center space-y-4">
                <Loader2 className="h-12 w-12 animate-spin mx-auto text-blue-600" />
                <div>
                  <h3 className="text-lg font-medium">Connecting to AI Assistant</h3>
                  <p className="text-sm text-muted-foreground">
                    Please wait while we establish the video connection...
                  </p>
                </div>
              </div>
            ) : error ? (
              <div className="text-center space-y-4">
                <XCircle className="h-12 w-12 mx-auto text-red-500" />
                <div>
                  <h3 className="text-lg font-medium text-red-600">Connection Failed</h3>
                  <p className="text-sm text-muted-foreground mb-4">{error}</p>
                  <Button onClick={resetSession} variant="outline">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Try Again
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <Video className="h-12 w-12 mx-auto text-blue-600" />
                <div>
                  <h3 className="text-lg font-medium">Starting AI Assistant</h3>
                  <p className="text-sm text-muted-foreground">
                    Initializing your video help session...
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          // Active Conversation - Full Screen Video
          <>
            {/* Session Info Bar */}
            <div className="p-3 border-b bg-gray-50 dark:bg-gray-900">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-1.5 bg-green-100 dark:bg-green-900 rounded-lg">
                    <Video className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">{conversation.conversation_name}</h3>
                    <p className="text-xs text-muted-foreground">
                      Session ID: {conversation.conversation_id.slice(0, 8)}... • Status: {conversation.status}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    onClick={openInNewTab}
                    variant="outline"
                    size="sm"
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    New Tab
                  </Button>
                  
                  <Button
                    onClick={toggleFullscreen}
                    variant="outline"
                    size="sm"
                  >
                    <Maximize2 className="h-4 w-4 mr-1" />
                    Fullscreen
                  </Button>
                  
                  <Button
                    onClick={endConversation}
                    variant="destructive"
                    size="sm"
                  >
                    <PhoneOff className="h-4 w-4 mr-1" />
                    End
                  </Button>
                </div>
              </div>
            </div>

            {/* Full Height Video Interface */}
            <div className="flex-1 relative bg-black">
              {connectionStatus === 'connecting' ? (
                <div className="w-full h-full flex items-center justify-center bg-gray-50 dark:bg-gray-900">
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
                  className="w-full h-full border-none"
                  allow="camera; microphone; fullscreen; display-capture; autoplay"
                  title="Tavus Video Conversation"
                />
              )}
            </div>

            {/* Status Footer */}
            <div className="p-3 border-t bg-gray-50 dark:bg-gray-900">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>Started: {new Date(conversation.created_at).toLocaleTimeString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    <span>HD Quality</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Bot className="h-3 w-3" />
                    <span>AI Assistant Active</span>
                  </div>
                </div>

                <div className="text-xs text-muted-foreground">
                  Replica ID: {hardcodedReplicaId.slice(0, 8)}...
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}