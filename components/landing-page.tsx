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
      examples: ["Show camera feeds for Main Store", "Monitor entrance cameras", "Display security footage"]
    },
    {
      icon: BarChart3,
      title: "Store Analytics",
      description: "How is my store performing?",
      examples: ["Show today's sales analytics", "Performance dashboard", "This month's metrics"]
    },
    {
      icon: Package,
      title: "Inventory Management",
      description: "Check inventory levels",
      examples: ["What items are low in stock?", "Show inventory alerts", "Stock levels report"]
    },
    {
      icon: Users,
      title: "Staff Performance",
      description: "Monitor team efficiency",
      examples: ["Staff performance today", "Employee schedules", "Team productivity metrics"]
    }
  ]

  const features = [
    { icon: Camera, label: "Live Camera Feeds" },
    { icon: BarChart3, label: "Real-time Analytics" },
    { icon: Shield, label: "Security Monitoring" },
    { icon: TrendingUp, label: "Sales Intelligence" },
    { icon: Users, label: "Customer Insights" },
    { icon: Package, label: "Inventory Tracking" },
    { icon: ShoppingCart, label: "Transaction Analysis" },
    { icon: Clock, label: "24/7 Monitoring" }
  ]

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-8 space-y-8">
      {/* Welcome Header */}
      <div className="text-center space-y-4 max-w-2xl">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="flex items-center justify-center rounded-md shadow-md bg-gradient-to-r from-blue-600 to-purple-600 p-3">
            <MessageCircle className="text-white w-8 h-8" />
          </div>
          <Sparkles className="text-[#ff8800] w-6 h-6" />
        </div>
        
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
          How can I help you today?
        </h1>
        
        <p className="text-lg text-muted-foreground leading-relaxed">
          I'm your AI assistant for retail intelligence. Ask me about store performance, 
          camera monitoring, inventory levels, staff metrics, or any retail operations question.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
        {suggestions.map((suggestion, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-200 cursor-pointer group hover:border-blue-200 dark:hover:border-blue-800">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="flex items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950 p-3 group-hover:bg-blue-100 dark:group-hover:bg-blue-900 transition-colors">
                  <suggestion.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1 space-y-2">
                  <h3 className="font-semibold text-lg">{suggestion.title}</h3>
                  <p className="text-muted-foreground text-sm">{suggestion.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {suggestion.examples.slice(0, 2).map((example, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        "{example}"
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Features Overview */}
      <div className="w-full max-w-4xl">
        <h2 className="text-xl font-semibold text-center mb-6 text-muted-foreground">
          Powered by AI for Complete Retail Intelligence
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2 p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50">
              <feature.icon className="w-4 h-4 text-[#ff8800]" />
              <span className="text-sm font-medium">{feature.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Example Queries */}
      <div className="text-center space-y-3 max-w-2xl">
        <p className="text-sm text-muted-foreground">
          Try asking me something like:
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          <Badge variant="outline" className="text-xs">
            "Show me today's sales performance"
          </Badge>
          <Badge variant="outline" className="text-xs">
            "Monitor store cameras"
          </Badge>
          <Badge variant="outline" className="text-xs">
            "What's my inventory status?"
          </Badge>
          <Badge variant="outline" className="text-xs">
            "How is staff performing?"
          </Badge>
        </div>
      </div>
    </div>
  )
}