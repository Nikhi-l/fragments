'use client'

import { MessageCircle, Sparkles } from 'lucide-react'

export function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-8 space-y-6">
      {/* Simple Welcome Header */}
      <div className="text-center space-y-4 max-w-2xl">
        <div className="flex items-center justify-center space-x-2 mb-6">
          <div className="flex items-center justify-center rounded-md shadow-md bg-gradient-to-r from-blue-600 to-purple-600 p-3">
            <MessageCircle className="text-white w-8 h-8" />
          </div>
          <Sparkles className="text-[#ff8800] w-6 h-6" />
        </div>
        
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
          Hello there!
        </h1>
        
        <p className="text-xl text-muted-foreground">
          How can I help you today?
        </p>
      </div>
    </div>
  )
}