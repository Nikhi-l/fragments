'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { BarChart3, Camera, MessageCircle, Users, Package, Calculator, Calendar } from 'lucide-react'

interface SamplePrompt {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  prompt: string
}

const samplePrompts: SamplePrompt[] = [
  {
    icon: BarChart3,
    title: "Analyze Sales Data",
    description: "View quick sales insights and trends",
    prompt: "Help me analyze my sales data for this month",
  },
  {
    icon: Camera,
    title: "View Camera Feeds",
    description: "Check in on live store cameras",
    prompt: "Show me the camera feeds for my store",
  },
  {
    icon: MessageCircle,
    title: "Store Performance",
    description: "See today's store dashboard",
    prompt: "How is my store performing today?",
  },
  {
    icon: Users,
    title: "Staff Management",
    description: "Review staff schedules and tasks",
    prompt: "Show me current staff status and task assignments",
  },
  {
    icon: Package,
    title: "Inventory Management",
    description: "Monitor stock levels and alerts",
    prompt: "Show me my inventory levels and low stock alerts",
  },
  {
    icon: Calculator,
    title: "Cost Analytics",
    description: "Check this month's cost breakdown",
    prompt: "Show me the cost breakdown for this month",
  },
  {
    icon: Calendar,
    title: "Sales Forecast",
    description: "Plan with upcoming demand forecasts",
    prompt: "Show me the sales forecast for next month",
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
                  className="cursor-pointer border border-border/60 hover:border-orange-500/50 transition-all duration-200"
                  onClick={() => handlePromptClick(sample.prompt)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0 p-2 bg-orange-500/10 rounded-md">
                        <IconComponent className="h-5 w-5 text-orange-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-foreground">
                          {sample.title}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          {sample.description}
                        </p>
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