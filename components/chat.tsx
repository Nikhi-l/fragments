import { LandingPage } from './landing-page'
import { Message } from '@/lib/messages'
import { FragmentSchema } from '@/lib/schema'
import { ExecutionResult } from '@/lib/types'
import { DeepPartial } from 'ai'
import { LoaderIcon, Terminal } from 'lucide-react'
import { useEffect } from 'react'

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
  }, [JSON.stringify(messages)])

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
      className="flex flex-col pb-12 gap-4 overflow-y-auto max-h-full px-4"
    >
      {messages.map((message: Message, index: number) => (
        <div
          className={`flex flex-col gap-2 ${message.role !== 'user' ? 'items-start' : 'items-end'}`}
          key={index}
        >
          <div
            className={`max-w-[80%] rounded-2xl px-4 py-3 ${
              message.role !== 'user' 
                ? 'bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100' 
                : 'bg-black dark:bg-white text-white dark:text-black'
            }`}
          >
            {message.content.map((content, id) => {
              if (content.type === 'text') {
                return (
                  <div key={id} className="text-sm leading-relaxed whitespace-pre-wrap">
                    {content.text}
                  </div>
                )
              }
              if (content.type === 'image') {
                return (
                  <img
                    key={id}
                    src={content.image}
                    alt="fragment"
                    className="rounded-lg w-32 h-32 object-cover mt-2"
                  />
                )
              }
            })}
          </div>
          
          {message.object && (
            <div
              onClick={() =>
                setCurrentPreview({
                  fragment: message.object,
                  result: message.result,
                })
              }
              className="max-w-[80%] p-3 border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-gray-950 hover:bg-gray-50 dark:hover:bg-gray-900 cursor-pointer transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="rounded-lg w-10 h-10 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <Terminal className="text-[#FF8800] w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm text-gray-900 dark:text-gray-100">
                    {message.object.title}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Click to view details
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
      
      {isLoading && (
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 px-4">
          <LoaderIcon className="animate-spin w-4 h-4" />
          <span>Generating...</span>
        </div>
      )}
    </div>
  )
}