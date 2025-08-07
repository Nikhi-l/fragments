'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { BarChart3, Camera, MessageCircle, Users, Package, Calculator, Calendar } from 'lucide-react'

interface SamplePrompt {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  prompt: string
  category: string
}

const samplePrompts: SamplePrompt[] = [
  {
    icon: BarChart3,
    title: "Analyze Sales Data",
    description: "Get detailed sales analytics and performance metrics",
    prompt: "Help me analyze my sales data for this month",
    category: "Analytics"
  },
  {
    icon: Camera,
    title: "View Camera Feeds",
    description: "Monitor live security camera feeds from your store",
    prompt: "Show me the camera feeds for my store",
    category: "Security"
  },
  {
    icon: MessageCircle,
    title: "Store Performance",
    description: "Get comprehensive dashboard insights",
    prompt: "How is my store performing today?",
    category: "Dashboard"
  },
  {
    icon: Users,
    title: "Staff Management",
    description: "Manage staff, tasks, and schedules efficiently",
    prompt: "Show me current staff status and task assignments",
    category: "Staff"
  },
  {
    icon: Package,
    title: "Inventory Management",
    description: "Track stock levels, alerts, and reorder points",
    prompt: "Show me my inventory levels and low stock alerts",
    category: "Inventory"
  },
  {
    icon: Calculator,
    title: "Cost Analytics",
    description: "Analyze operational costs and budget performance",
    prompt: "Show me the cost breakdown for this month",
    category: "Costs"
  },
  {
    icon: Calendar,
    title: "Sales Forecast",
    description: "View predicted sales and high-demand days",
    prompt: "Show me the sales forecast for next month",
    category: "Forecast"
  }
]

export function LandingPage() {
  const handlePromptClick = (prompt: string) => {
    // Publish a custom event so the parent page can update React state directly
    window.dispatchEvent(
      new CustomEvent('prefillChatInput', { detail: { text: prompt } }),
    )
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-[70vh] px-4 py-8">
      {/* Centered Welcome Content with Left-Aligned Text */}
      <div className="space-y-6 max-w-4xl w-full flex flex-col items-center">
        <div className="space-y-4 w-full">
          <h1 className="text-4xl font-bold text-foreground text-left">
            Hello there!
          </h1>
          
          <p className="text-xl text-muted-foreground text-left">
            How can I help you today?
          </p>
        </div>

        {/* Sample Prompts */}
        <div className="space-y-4 w-full max-w-2xl">
          <p className="text-sm text-muted-foreground text-left">
            Try asking me about:
          </p>
          
          {/* Grid layout for prompts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {samplePrompts.map((sample, index) => {
              const IconComponent = sample.icon
              return (
                <Card 
                  key={index} 
                  className="cursor-pointer hover:shadow-md transition-all duration-200 hover:border-orange-500/50 border-2 border-transparent"
                  onClick={() => handlePromptClick(sample.prompt)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 p-2 bg-orange-500/10 rounded-lg">
                        <IconComponent className="h-5 w-5 text-orange-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="text-sm font-semibold text-foreground">
                            {sample.title}
                          </h3>
                          <span className="text-xs px-2 py-0.5 bg-orange-500 text-white rounded-full">
                            {sample.category}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">
                          {sample.description}
                        </p>
                        <div className="text-xs text-orange-600 font-medium">
                          &quot;{sample.prompt}&quot;
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Additional Help Text */}
        <div className="text-sm text-muted-foreground w-full max-w-2xl">
          <p className="text-left">
            I can help you with store analytics, camera monitoring, inventory management, 
            staff performance, task assignments, break scheduling, cost analysis, sales forecasting, and much more. Just ask me in plain English!
          </p>
        </div>
      </div>
    </div>
  )
}