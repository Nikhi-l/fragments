'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Camera, 
  BarChart3, 
  Users, 
  Package, 
  ShoppingCart,
  TrendingUp,
  Shield,
  Clock,
  Sparkles,
  MessageCircle
} from 'lucide-react'

export function LandingPage() {
  const suggestions = [
    {
      icon: Camera,
      title: "Camera Monitoring",
      description: "Show me camera feeds",
      examples: ["Show camera feeds for Main Store", "Monitor entrance cameras"]
    },
    {
      icon: BarChart3,
      title: "Store Analytics", 
      description: "How is my store performing?",
      examples: ["Show today's sales analytics", "Performance dashboard"]
    },
    {
      icon: TrendingUp,
      title: "Sales Data",
      description: "Show me sales performance",
      examples: ["Sales data for this month", "Revenue trends"]
    },
    {
      icon: Package,
      title: "Inventory Management",
      description: "Check inventory levels", 
      examples: ["What items are low in stock?", "Inventory alerts"]
    }
  ]

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 py-12 space-y-12">
      {/* Welcome Header - More minimal */}
      <div className="text-center space-y-6 max-w-2xl">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <div className="flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-4">
            <MessageCircle className="text-white w-6 h-6" />
          </div>
        </div>
        
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
          How can I help you today?
        </h1>
        
        <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
          I'm your AI assistant for retail intelligence. Ask me about store performance, 
          camera monitoring, inventory levels, or any retail operations question.
        </p>
      </div>

      {/* Quick Actions - Simplified cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl">
        {suggestions.map((suggestion, index) => (
          <Card key={index} className="hover:shadow-sm transition-all duration-200 cursor-pointer group border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <div className="flex items-center justify-center rounded-lg bg-gray-50 dark:bg-gray-900 p-2 group-hover:bg-gray-100 dark:group-hover:bg-gray-800 transition-colors">
                  <suggestion.icon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </div>
                <div className="flex-1 space-y-1">
                  <h3 className="font-medium text-sm text-gray-900 dark:text-gray-100">{suggestion.title}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-500">{suggestion.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Example Queries - More minimal */}
      <div className="text-center space-y-4 max-w-2xl">
        <p className="text-sm text-gray-500 dark:text-gray-500">
          Try asking me something like:
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          <Badge variant="secondary" className="text-xs font-normal bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-0">
            "Show me today's sales performance"
          </Badge>
          <Badge variant="secondary" className="text-xs font-normal bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-0">
            "Monitor store cameras"
          </Badge>
          <Badge variant="secondary" className="text-xs font-normal bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-0">
            "What's my inventory status?"
          </Badge>
        </div>
      </div>
    </div>
  )
}