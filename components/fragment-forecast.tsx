'use client'

import { ForecastFragmentSchema } from '@/lib/schema'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  RefreshCw,
  Target,
  Users,
  Package,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock,
  Activity,
  BarChart3,
  LineChart,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Heart,
  Snowflake,
  Sun,
  Music,
  Sparkles,
  Coffee,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Star,
  Brain
} from 'lucide-react'
import { useState } from 'react'

interface ForecastData {
  date: string
  dayOfWeek: string
  salesForecast: number
  customerTraffic: number
  demandLevel: 'low' | 'medium' | 'high' | 'very_high'
  events: Event[]
  staffRecommendation: number
  inventoryAlert?: string
}

interface Event {
  type: 'holiday' | 'festival' | 'weather' | 'local_event' | 'promotion'
  name: string
  impact: 'low' | 'medium' | 'high'
  description: string
  icon: any
}

interface MonthlyForecast {
  month: string
  totalSales: number
  avgDailyTraffic: number
  peakDays: number
  lowDays: number
  trend: 'up' | 'down' | 'stable'
}

export function FragmentForecast({ fragment }: { fragment: ForecastFragmentSchema }) {
  const [forecastData, setForecastData] = useState(generateMockForecastData())
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [selectedTimeframe, setSelectedTimeframe] = useState<'30_days' | '90_days' | '6_months'>('30_days')
  const [selectedStore, setSelectedStore] = useState('main')
  const [selectedDay, setSelectedDay] = useState<ForecastData | null>(null)
  const [calendarWeek, setCalendarWeek] = useState(0)

  function generateMockForecastData() {
    const stores = [
      { id: 'main', name: fragment.store_name || 'Main Store' },
      { id: 'downtown', name: 'Downtown Branch' },
      { id: 'mall', name: 'Mall Location' },
      { id: 'suburban', name: 'Suburban Store' }
    ]

    const eventTypes = [
      { type: 'holiday', name: "Valentine's Day", impact: 'high', description: 'Increased gift and flower sales', icon: Heart },
      { type: 'holiday', name: 'Presidents Day', impact: 'medium', description: 'Holiday shopping and sales events', icon: Star },
      { type: 'festival', name: 'Winter Festival', impact: 'high', description: 'Local winter celebration brings crowds', icon: Snowflake },
      { type: 'weather', name: 'Snow Storm', impact: 'low', description: 'Reduced foot traffic due to weather', icon: Snowflake },
      { type: 'weather', name: 'Sunny Weekend', impact: 'medium', description: 'Good weather increases shopping', icon: Sun },
      { type: 'local_event', name: 'Concert at Arena', impact: 'high', description: 'Major concert brings visitors to area', icon: Music },
      { type: 'promotion', name: 'Flash Sale', impact: 'high', description: 'Store-wide 30% off promotion', icon: Sparkles },
      { type: 'local_event', name: 'Farmers Market', impact: 'medium', description: 'Weekly farmers market nearby', icon: Coffee }
    ]

    const dailyForecasts: ForecastData[] = Array.from({ length: 30 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() + i)

      const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' })
      const isWeekend = dayOfWeek === 'Sat' || dayOfWeek === 'Sun'

      const dayEvents: Event[] = []
      if (Math.random() > 0.7) {
        const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)]
        dayEvents.push(eventType as Event)
      }

      let demandLevel: 'low' | 'medium' | 'high' | 'very_high' = 'medium'
      if (dayEvents.some(e => e.impact === 'high')) {
        demandLevel = 'very_high'
      } else if (isWeekend || dayEvents.some(e => e.impact === 'medium')) {
        demandLevel = 'high'
      } else if (dayEvents.some(e => e.impact === 'low')) {
        demandLevel = 'low'
      }

      const baseSales = 15000
      const salesMultiplier = {
        'low': 0.6,
        'medium': 1.0,
        'high': 1.4,
        'very_high': 1.8
      }[demandLevel]

      const baseTraffic = 200
      const trafficMultiplier = salesMultiplier

      return {
        date: date.toISOString().split('T')[0],
        dayOfWeek,
        salesForecast: Math.floor(baseSales * salesMultiplier * (0.9 + Math.random() * 0.2)),
        customerTraffic: Math.floor(baseTraffic * trafficMultiplier * (0.9 + Math.random() * 0.2)),
        demandLevel,
        events: dayEvents,
        staffRecommendation: Math.ceil(8 * salesMultiplier),
        inventoryAlert: demandLevel === 'very_high' ? 'Stock up on popular items' : undefined
      }
    })

    const monthlyForecasts: MonthlyForecast[] = Array.from({ length: 6 }, (_, i) => {
      const date = new Date()
      date.setMonth(date.getMonth() + i)
      return {
        month: date.toLocaleDateString('en-US', { month: 'short' }),
        totalSales: Math.floor(Math.random() * 100000) + 400000,
        avgDailyTraffic: Math.floor(Math.random() * 50) + 180,
        peakDays: Math.floor(Math.random() * 8) + 5,
        lowDays: Math.floor(Math.random() * 5) + 3,
        trend: ['up', 'down', 'stable'][Math.floor(Math.random() * 3)] as 'up' | 'down' | 'stable'
      }
    })

    return {
      stores,
      dailyForecasts,
      monthlyForecasts,
      summary: {
        totalForecastedSales: dailyForecasts.reduce((sum, day) => sum + day.salesForecast, 0),
        avgDailyTraffic: Math.floor(dailyForecasts.reduce((sum, day) => sum + day.customerTraffic, 0) / dailyForecasts.length),
        peakDays: dailyForecasts.filter(day => day.demandLevel === 'very_high' || day.demandLevel === 'high').length,
        lowDays: dailyForecasts.filter(day => day.demandLevel === 'low').length,
        upcomingEvents: dailyForecasts.flatMap(day => day.events).length,
        confidence: 87
      }
    }
  }

  function refreshData() {
    setForecastData(generateMockForecastData())
    setLastUpdated(new Date())
  }

  function formatCurrency(amount: number) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const currentStore = forecastData.stores.find(store => store.id === selectedStore) || forecastData.stores[0]

  const MetricCard = ({
    title,
    value,
    subtitle,
    icon: Icon,
    gradient,
    trend,
    trendValue
  }: {
    title: string
    value: string | number
    subtitle?: string
    icon: any
    gradient: string
    trend?: 'up' | 'down' | 'stable'
    trendValue?: string
  }) => (
    <div className="relative group">
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl -z-10"
        style={{ background: gradient }}
      />
      <div className="p-5 rounded-2xl bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50 backdrop-blur-sm hover:border-zinc-300 dark:hover:border-zinc-600 transition-all duration-300 hover:shadow-lg">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">{title}</p>
            <p className="text-2xl font-bold text-zinc-900 dark:text-white">{value}</p>
            {subtitle && (
              <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">{subtitle}</p>
            )}
            {trend && trendValue && (
              <div className={`flex items-center gap-1 mt-2 text-xs ${
                trend === 'up' ? 'text-emerald-500' : trend === 'down' ? 'text-red-500' : 'text-blue-500'
              }`}>
                {trend === 'up' ? <ArrowUpRight className="h-3 w-3" /> : trend === 'down' ? <ArrowDownRight className="h-3 w-3" /> : <Activity className="h-3 w-3" />}
                {trendValue}
              </div>
            )}
          </div>
          <div className="p-3 rounded-xl" style={{ background: gradient }}>
            <Icon className="h-5 w-5 text-white" />
          </div>
        </div>
      </div>
    </div>
  )

  const getDemandStyle = (level: string) => {
    switch (level) {
      case 'low': return { bg: 'bg-blue-500', ring: 'ring-blue-500/20', text: 'text-blue-600' }
      case 'medium': return { bg: 'bg-emerald-500', ring: 'ring-emerald-500/20', text: 'text-emerald-600' }
      case 'high': return { bg: 'bg-amber-500', ring: 'ring-amber-500/20', text: 'text-amber-600' }
      case 'very_high': return { bg: 'bg-red-500', ring: 'ring-red-500/20', text: 'text-red-600' }
      default: return { bg: 'bg-zinc-500', ring: 'ring-zinc-500/20', text: 'text-zinc-600' }
    }
  }

  const getEventGradient = (type: string) => {
    switch (type) {
      case 'holiday': return 'from-red-500 to-pink-500'
      case 'festival': return 'from-purple-500 to-indigo-500'
      case 'weather': return 'from-blue-500 to-cyan-500'
      case 'local_event': return 'from-emerald-500 to-teal-500'
      case 'promotion': return 'from-orange-500 to-amber-500'
      default: return 'from-zinc-500 to-zinc-600'
    }
  }

  const weekDays = forecastData.dailyForecasts.slice(calendarWeek * 7, (calendarWeek + 1) * 7)
  const maxSales = Math.max(...forecastData.dailyForecasts.map(d => d.salesForecast))

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-zinc-50 via-indigo-50/30 to-purple-50/20 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-800">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/25">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-zinc-900 dark:text-white">Sales Forecast</h1>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">{currentStore.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Select value={selectedStore} onValueChange={setSelectedStore}>
                <SelectTrigger className="w-40 h-9 bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 rounded-lg text-sm">
                  <MapPin className="h-4 w-4 mr-2 text-zinc-400" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {forecastData.stores.map((store) => (
                    <SelectItem key={store.id} value={store.id}>
                      {store.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                onClick={refreshData}
                variant="outline"
                size="sm"
                className="h-9 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Live Status Bar */}
        <div className="px-4 pb-3">
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-zinc-600 dark:text-zinc-400">
                AI Confidence: <span className="font-semibold text-emerald-600 dark:text-emerald-400">{forecastData.summary.confidence}%</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="h-3.5 w-3.5 text-indigo-500" />
              <span className="text-zinc-600 dark:text-zinc-400">
                <span className="font-semibold text-indigo-600 dark:text-indigo-400">{forecastData.summary.peakDays}</span> peak days ahead
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-3.5 w-3.5 text-amber-500" />
              <span className="text-zinc-600 dark:text-zinc-400">
                <span className="font-semibold text-amber-600 dark:text-amber-400">{forecastData.summary.upcomingEvents}</span> events
              </span>
            </div>
            <div className="ml-auto flex items-center gap-1.5 text-xs text-zinc-400">
              <Clock className="h-3 w-3" />
              {lastUpdated.toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-6">
          {/* Metrics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Forecasted Sales"
              value={formatCurrency(forecastData.summary.totalForecastedSales)}
              subtitle="Next 30 days"
              icon={DollarSign}
              gradient="linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)"
              trend="up"
              trendValue="+12% vs last period"
            />
            <MetricCard
              title="Avg Daily Traffic"
              value={forecastData.summary.avgDailyTraffic}
              subtitle="Expected visitors"
              icon={Users}
              gradient="linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)"
              trend="up"
              trendValue="+8% expected"
            />
            <MetricCard
              title="High Demand Days"
              value={forecastData.summary.peakDays}
              subtitle="Needs extra staff"
              icon={TrendingUp}
              gradient="linear-gradient(135deg, #10b981 0%, #34d399 100%)"
            />
            <MetricCard
              title="Upcoming Events"
              value={forecastData.summary.upcomingEvents}
              subtitle="Affecting sales"
              icon={Calendar}
              gradient="linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)"
            />
          </div>

          {/* Weekly Calendar View */}
          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-indigo-500" />
                <h2 className="font-semibold text-zinc-900 dark:text-white">Weekly Forecast</h2>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex gap-3 mr-4">
                  {[
                    { level: 'very_high', label: 'Very High' },
                    { level: 'high', label: 'High' },
                    { level: 'medium', label: 'Medium' },
                    { level: 'low', label: 'Low' }
                  ].map(({ level, label }) => (
                    <div key={level} className="flex items-center gap-1.5 text-xs text-zinc-500">
                      <div className={`h-2 w-2 rounded-full ${getDemandStyle(level).bg}`} />
                      {label}
                    </div>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => setCalendarWeek(Math.max(0, calendarWeek - 1))}
                  disabled={calendarWeek === 0}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => setCalendarWeek(Math.min(3, calendarWeek + 1))}
                  disabled={calendarWeek === 3}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {weekDays.map((day) => {
                const date = new Date(day.date)
                const style = getDemandStyle(day.demandLevel)
                const isSelected = selectedDay?.date === day.date

                return (
                  <button
                    key={day.date}
                    onClick={() => setSelectedDay(day)}
                    className={`p-3 rounded-xl border transition-all ${
                      isSelected
                        ? `border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10 ring-2 ${style.ring}`
                        : 'border-zinc-200 dark:border-zinc-700 hover:border-indigo-300 dark:hover:border-indigo-700 bg-zinc-50 dark:bg-zinc-900/50'
                    }`}
                  >
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">{day.dayOfWeek}</div>
                    <div className="text-lg font-bold text-zinc-900 dark:text-white">{date.getDate()}</div>
                    <div className={`h-1.5 w-full rounded-full mt-2 ${style.bg}`} />
                    <div className="mt-2 text-sm font-semibold text-zinc-900 dark:text-white">
                      {formatCurrency(day.salesForecast)}
                    </div>
                    <div className="text-xs text-zinc-500">{day.customerTraffic} visitors</div>
                    {day.events.length > 0 && (
                      <div className="mt-2 flex justify-center">
                        {day.events.slice(0, 1).map((event, idx) => {
                          const EventIcon = event.icon
                          return (
                            <div
                              key={idx}
                              className={`p-1 rounded bg-gradient-to-r ${getEventGradient(event.type)}`}
                            >
                              <EventIcon className="h-3 w-3 text-white" />
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </button>
                )
              })}
            </div>

            {/* Selected Day Details */}
            {selectedDay && (
              <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-500/10 dark:to-purple-500/10 border border-indigo-200 dark:border-indigo-500/20">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-sm text-indigo-600 dark:text-indigo-400">
                      {new Date(selectedDay.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                    </div>
                    <div className="text-2xl font-bold text-zinc-900 dark:text-white mt-1">
                      {formatCurrency(selectedDay.salesForecast)}
                    </div>
                    <div className="text-sm text-zinc-500 dark:text-zinc-400">
                      {selectedDay.customerTraffic} expected visitors
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-zinc-500">Recommended Staff</div>
                    <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                      {selectedDay.staffRecommendation}
                    </div>
                    <Badge className={`mt-1 ${getDemandStyle(selectedDay.demandLevel).bg} text-white border-0`}>
                      {selectedDay.demandLevel.replace('_', ' ')} demand
                    </Badge>
                  </div>
                </div>
                {selectedDay.events.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-indigo-200 dark:border-indigo-500/30">
                    <div className="text-xs text-zinc-500 mb-2">Events</div>
                    {selectedDay.events.map((event, idx) => {
                      const EventIcon = event.icon
                      return (
                        <div key={idx} className="flex items-center gap-2">
                          <div className={`p-1.5 rounded bg-gradient-to-r ${getEventGradient(event.type)}`}>
                            <EventIcon className="h-3.5 w-3.5 text-white" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-zinc-900 dark:text-white">{event.name}</div>
                            <div className="text-xs text-zinc-500">{event.description}</div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sales Trend Chart */}
          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50">
            <div className="flex items-center gap-2 mb-4">
              <LineChart className="h-5 w-5 text-indigo-500" />
              <h2 className="font-semibold text-zinc-900 dark:text-white">30-Day Sales Trend</h2>
            </div>
            <div className="h-40 flex items-end gap-0.5">
              {forecastData.dailyForecasts.map((day, index) => {
                const height = (day.salesForecast / maxSales) * 100
                const style = getDemandStyle(day.demandLevel)
                return (
                  <div key={index} className="flex-1 flex flex-col items-center group relative">
                    <div
                      className={`w-full rounded-t transition-all duration-300 ${style.bg} opacity-80 hover:opacity-100`}
                      style={{ height: `${height}%` }}
                    />
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs px-2 py-1 rounded whitespace-nowrap z-10">
                      {formatCurrency(day.salesForecast)}
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="flex justify-between mt-3 text-xs text-zinc-400">
              <span>Today</span>
              <span>+30 days</span>
            </div>
          </div>

          {/* Events and Insights Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Upcoming Events */}
            <div className="p-5 rounded-2xl bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-500/20">
                  <Zap className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                </div>
                <h2 className="font-semibold text-zinc-900 dark:text-white">Upcoming Events</h2>
              </div>
              <div className="space-y-3">
                {forecastData.dailyForecasts
                  .filter(day => day.events.length > 0)
                  .slice(0, 4)
                  .map((day) => {
                    const date = new Date(day.date)
                    return day.events.map((event, eventIdx) => {
                      const EventIcon = event.icon
                      return (
                        <div
                          key={`${day.date}-${eventIdx}`}
                          className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-700/50"
                        >
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg bg-gradient-to-r ${getEventGradient(event.type)}`}>
                              <EventIcon className="h-4 w-4 text-white" />
                            </div>
                            <div>
                              <div className="font-medium text-sm text-zinc-900 dark:text-white">{event.name}</div>
                              <div className="text-xs text-zinc-500">
                                {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge className={`${
                              event.impact === 'high' ? 'bg-red-500' :
                              event.impact === 'medium' ? 'bg-amber-500' : 'bg-blue-500'
                            } text-white border-0 text-xs`}>
                              {event.impact} impact
                            </Badge>
                          </div>
                        </div>
                      )
                    })
                  })}
              </div>
            </div>

            {/* AI Insights */}
            <div className="p-5 rounded-2xl bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-500/20">
                  <Brain className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h2 className="font-semibold text-zinc-900 dark:text-white">AI Insights</h2>
              </div>
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                    <span className="text-sm font-medium text-emerald-800 dark:text-emerald-300">Growth Expected</span>
                  </div>
                  <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-1 ml-6">
                    12% sales increase predicted over next 30 days
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-600" />
                    <span className="text-sm font-medium text-amber-800 dark:text-amber-300">Staffing Alert</span>
                  </div>
                  <p className="text-xs text-amber-700 dark:text-amber-400 mt-1 ml-6">
                    {forecastData.summary.peakDays} high-demand days require +2 staff
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800 dark:text-blue-300">Inventory Tip</span>
                  </div>
                  <p className="text-xs text-blue-700 dark:text-blue-400 mt-1 ml-6">
                    Stock 20% more inventory for upcoming events
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/20">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-purple-600" />
                    <span className="text-sm font-medium text-purple-800 dark:text-purple-300">Confidence Score</span>
                  </div>
                  <p className="text-xs text-purple-700 dark:text-purple-400 mt-1 ml-6">
                    87% accuracy based on historical patterns
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Monthly Forecast Cards */}
          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="h-5 w-5 text-indigo-500" />
              <h2 className="font-semibold text-zinc-900 dark:text-white">6-Month Outlook</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {forecastData.monthlyForecasts.map((month, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-700/50 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all"
                >
                  <div className="text-xs text-zinc-500 mb-1">{month.month}</div>
                  <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                    {formatCurrency(month.totalSales)}
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    {month.trend === 'up' ? (
                      <TrendingUp className="h-3 w-3 text-emerald-500" />
                    ) : month.trend === 'down' ? (
                      <TrendingDown className="h-3 w-3 text-red-500" />
                    ) : (
                      <Activity className="h-3 w-3 text-blue-500" />
                    )}
                    <span className={`text-xs ${
                      month.trend === 'up' ? 'text-emerald-500' :
                      month.trend === 'down' ? 'text-red-500' : 'text-blue-500'
                    }`}>
                      {month.trend}
                    </span>
                  </div>
                  <div className="mt-2 text-xs text-zinc-500">
                    {month.peakDays} peak days
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Optimization CTA */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"30\" height=\"30\" viewBox=\"0 0 30 30\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z\" fill=\"rgba(255,255,255,0.1)\"%3E%3C/path%3E%3C/svg%3E')] opacity-50" />
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">AI-Powered Demand Planning</h3>
                  <p className="text-white/80 text-sm mt-1">
                    Automatically optimize inventory and staffing based on forecast predictions
                  </p>
                </div>
              </div>
              <Button className="bg-white text-indigo-600 hover:bg-white/90 font-semibold">
                <Zap className="h-4 w-4 mr-2" />
                Enable Auto-Planning
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
