'use client'

import { Button } from '@/components/ui/button'
import {
  BarChart3,
  Camera,
  Users,
  Package,
  Calculator,
  Calendar,
  TrendingUp,
  DollarSign,
  HelpCircle,
  Sparkles,
  ArrowRight,
  Zap,
  Shield,
  ShieldAlert,
  Store
} from 'lucide-react'

interface QuickAction {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  prompt: string
  gradient: string
  tag: string
}

const quickActions: QuickAction[] = [
  {
    icon: BarChart3,
    title: "Sales Analytics",
    description: "Revenue, trends & performance metrics",
    prompt: "Show me the sales data for this month",
    gradient: "from-emerald-500 to-teal-500",
    tag: "Analytics"
  },
  {
    icon: Camera,
    title: "Camera Feeds",
    description: "Live security monitoring",
    prompt: "Show me the camera feeds for my store",
    gradient: "from-blue-500 to-cyan-500",
    tag: "Security"
  },
  {
    icon: TrendingUp,
    title: "Dashboard",
    description: "Store performance overview",
    prompt: "How is my store performing today?",
    gradient: "from-violet-500 to-purple-500",
    tag: "Overview"
  },
  {
    icon: Users,
    title: "Staff Management",
    description: "Tasks, schedules & performance",
    prompt: "Show me current staff status and assignments",
    gradient: "from-pink-500 to-rose-500",
    tag: "Team"
  },
  {
    icon: Package,
    title: "Inventory",
    description: "Stock levels & alerts",
    prompt: "Show me inventory levels and low stock alerts",
    gradient: "from-orange-500 to-amber-500",
    tag: "Stock"
  },
  {
    icon: Calculator,
    title: "Cost Analytics",
    description: "Expenses & budgets",
    prompt: "Show me the cost breakdown for this month",
    gradient: "from-rose-500 to-red-500",
    tag: "Finance"
  },
  {
    icon: Calendar,
    title: "Forecast",
    description: "Sales predictions & demand",
    prompt: "Show me the sales forecast for next month",
    gradient: "from-indigo-500 to-blue-500",
    tag: "Planning"
  },
  {
    icon: ShieldAlert,
    title: "Loss Prevention",
    description: "Security & theft alerts",
    prompt: "Show me security alerts and loss prevention data",
    gradient: "from-red-500 to-orange-500",
    tag: "Security"
  }
]

const popularQueries = [
  "What are my top selling products this week?",
  "Which areas need more staff coverage?",
  "Show me items that need reordering",
  "Compare store performance across locations"
]

export function LandingPage() {
  const handlePromptClick = (prompt: string) => {
    window.dispatchEvent(
      new CustomEvent('prefillChatInput', { detail: { text: prompt } }),
    )
  }

  return (
    <div className="flex flex-col min-h-[80vh] px-4 py-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 shadow-lg shadow-orange-500/25">
            <Store className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
              Welcome to RetailX
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400">
              Your AI-powered retail management assistant
            </p>
          </div>
        </div>

        {/* AI Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/20">
          <Sparkles className="h-4 w-4 text-orange-500" />
          <span className="text-sm font-medium text-orange-700 dark:text-orange-300">
            Powered by AI - Ask me anything about your store
          </span>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="mb-8">
        <h2 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickActions.map((action, index) => {
            const IconComponent = action.icon
            return (
              <button
                key={index}
                onClick={() => handlePromptClick(action.prompt)}
                className="group relative p-4 rounded-2xl bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50 hover:border-transparent transition-all duration-300 text-left overflow-hidden"
              >
                {/* Hover gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                {/* Content */}
                <div className="relative z-10">
                  <div className={`p-2 rounded-xl bg-gradient-to-br ${action.gradient} w-fit mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-zinc-900 dark:text-white group-hover:text-white transition-colors">
                      {action.title}
                    </h3>
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 group-hover:text-white/80 transition-colors">
                    {action.description}
                  </p>
                  <span className="inline-block mt-2 px-2 py-0.5 text-[10px] font-medium rounded-full bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 group-hover:bg-white/20 group-hover:text-white transition-colors">
                    {action.tag}
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Popular Queries */}
      <div className="mb-8">
        <h2 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-4">
          Popular Queries
        </h2>
        <div className="flex flex-wrap gap-2">
          {popularQueries.map((query, index) => (
            <button
              key={index}
              onClick={() => handlePromptClick(query)}
              className="group flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50 hover:bg-orange-50 dark:hover:bg-orange-500/10 hover:border-orange-300 dark:hover:border-orange-500/30 transition-all"
            >
              <span className="text-sm text-zinc-700 dark:text-zinc-300 group-hover:text-orange-700 dark:group-hover:text-orange-300">
                {query}
              </span>
              <ArrowRight className="h-3.5 w-3.5 text-zinc-400 group-hover:text-orange-500 group-hover:translate-x-0.5 transition-all" />
            </button>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-zinc-100 to-zinc-50 dark:from-zinc-800/50 dark:to-zinc-900/50 border border-zinc-200 dark:border-zinc-700/50">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="h-5 w-5 text-orange-500" />
          <h2 className="font-semibold text-zinc-900 dark:text-white">What I can help you with</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { icon: Shield, text: "Real-time security monitoring" },
            { icon: BarChart3, text: "Advanced sales analytics" },
            { icon: Users, text: "Smart staff optimization" },
            { icon: Package, text: "Automated inventory tracking" },
            { icon: DollarSign, text: "Cost analysis & savings" },
            { icon: TrendingUp, text: "Demand forecasting" }
          ].map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white dark:bg-zinc-800 shadow-sm">
                  <Icon className="h-4 w-4 text-orange-500" />
                </div>
                <span className="text-sm text-zinc-600 dark:text-zinc-300">{feature.text}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Tip */}
      <div className="mt-6 text-center">
        <p className="text-sm text-zinc-400 dark:text-zinc-500">
          <span className="font-medium">Pro tip:</span> Just type naturally - I understand context and can help with complex queries
        </p>
      </div>
    </div>
  )
}
