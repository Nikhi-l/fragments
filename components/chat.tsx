import { LandingPage } from './landing-page'
import { Message } from '@/lib/messages'
import { FragmentSchema } from '@/lib/schema'
import { ExecutionResult } from '@/lib/types'
import { DeepPartial } from 'ai'
import {
  Loader2,
  Terminal,
  Camera,
  BarChart3,
  Users,
  Package,
  Calculator,
  Calendar,
  HelpCircle,
  Sparkles,
  Bot,
  User,
  Shield
} from 'lucide-react'
import Image from 'next/image'
import { useEffect } from 'react'

const getFragmentIcon = (type?: string) => {
  switch (type) {
    case 'camera_feed':
      return { icon: Camera, gradient: 'from-blue-500 to-cyan-500' }
    case 'dashboard':
      return { icon: BarChart3, gradient: 'from-violet-500 to-purple-500' }
    case 'sales_data':
      return { icon: BarChart3, gradient: 'from-emerald-500 to-teal-500' }
    case 'staff_management':
      return { icon: Users, gradient: 'from-pink-500 to-rose-500' }
    case 'inventory_management':
      return { icon: Package, gradient: 'from-orange-500 to-amber-500' }
    case 'cost_analytics':
      return { icon: Calculator, gradient: 'from-rose-500 to-red-500' }
    case 'forecast':
      return { icon: Calendar, gradient: 'from-indigo-500 to-blue-500' }
    case 'help':
      return { icon: HelpCircle, gradient: 'from-cyan-500 to-teal-500' }
    case 'loss_prevention':
      return { icon: Shield, gradient: 'from-red-500 to-orange-500' }
    default:
      return { icon: Terminal, gradient: 'from-orange-500 to-amber-500' }
  }
}

export function Chat({
  messages,
  isLoading,
  setCurrentPreview,
}: {
  messages: Message[]
  isLoading: boolean
  setCurrentPreview: (preview: {
    fragment: DeepPartial<FragmentSchema> | undefined
    result: ExecutionResult | undefined
  }) => void
}) {
  useEffect(() => {
    const chatContainer = document.getElementById('chat-container')
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight
    }
  }, [messages])

  // Show landing page when there are no messages
  if (messages.length === 0 && !isLoading) {
    return (
      <div
        id="chat-container"
        className="flex flex-col pb-12 gap-2 overflow-y-auto max-h-full"
      >
        <LandingPage />
      </div>
    )
  }

  return (
    <div
      id="chat-container"
      className="flex flex-col pb-12 gap-4 overflow-y-auto max-h-full px-2"
    >
      {messages.map((message: Message, index: number) => {
        const isUser = message.role === 'user'
        const fragmentInfo = message.object ? getFragmentIcon(message.object.type) : null
        const FragmentIcon = fragmentInfo?.icon

        return (
          <div
            key={index}
            className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
          >
            {/* Avatar for assistant */}
            {!isUser && (
              <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
                <Bot className="h-4 w-4 text-white" />
              </div>
            )}

            <div
              className={`flex flex-col max-w-[85%] ${
                isUser
                  ? 'items-end'
                  : 'items-start'
              }`}
            >
              {/* Message bubble */}
              <div
                className={`px-4 py-3 rounded-2xl whitespace-pre-wrap ${
                  isUser
                    ? 'bg-gradient-to-br from-zinc-800 to-zinc-900 dark:from-zinc-700 dark:to-zinc-800 text-white rounded-br-md'
                    : 'bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50 text-zinc-800 dark:text-zinc-200 rounded-bl-md shadow-sm'
                }`}
              >
                {message.content.map((content, id) => {
                  if (content.type === 'text') {
                    return (
                      <span key={id} className="text-sm leading-relaxed">
                        {content.text}
                      </span>
                    )
                  }
                  if (content.type === 'image') {
                    return (
                      <Image
                        key={id}
                        src={content.image}
                        alt="uploaded"
                        width={200}
                        height={200}
                        className="rounded-lg mt-2 max-w-full h-auto"
                      />
                    )
                  }
                  return null
                })}
              </div>

              {/* Fragment Card */}
              {message.object && FragmentIcon && (
                <button
                  onClick={() => {
                    setCurrentPreview({
                      fragment: message.object,
                      result: message.result,
                    })
                    window.dispatchEvent(new CustomEvent('showArtifact', {
                      detail: {
                        fragment: message.object,
                        result: message.result
                      }
                    }))
                  }}
                  className="mt-2 group flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50 hover:border-orange-300 dark:hover:border-orange-500/30 hover:shadow-lg transition-all duration-300 text-left"
                >
                  <div className={`p-2.5 rounded-xl bg-gradient-to-br ${fragmentInfo.gradient} group-hover:scale-110 transition-transform shadow-lg`}>
                    <FragmentIcon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-zinc-900 dark:text-white">
                        {message.object.title}
                      </span>
                      <Sparkles className="h-3.5 w-3.5 text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                      Click to view {message.object.type?.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="text-xs text-orange-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    View →
                  </div>
                </button>
              )}
            </div>

            {/* Avatar for user */}
            {isUser && (
              <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-gradient-to-br from-zinc-600 to-zinc-700 flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
            )}
          </div>
        )
      })}

      {/* Loading State */}
      {isLoading && (
        <div className="flex gap-3 justify-start">
          <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
            <Bot className="h-4 w-4 text-white" />
          </div>
          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl rounded-bl-md bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50 shadow-sm">
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin text-orange-500" />
              <span className="text-sm text-zinc-500 dark:text-zinc-400">
                Analyzing your request...
              </span>
            </div>
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
