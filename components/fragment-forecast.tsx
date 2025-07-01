'use client'

import { ForecastFragmentSchema } from '@/lib/schema'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
  ShoppingCart,
  Package,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock,
  Star,
  Activity,
  BarChart3,
  LineChart,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Gift,
  Heart,
  Snowflake,
  Sun,
  Umbrella,
  Coffee,
  Music,
  Sparkles
} from 'lucide-react'
import { useState, useEffect } from 'react'

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
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())

  function generateMockForecastData() {
    const stores = [
      { id: 'main', name: fragment.store_name || 'Main Store' },
      { id: 'downtown', name: 'Downtown Branch' },
      { id: 'mall', name: 'Mall Location' },
      { id: 'suburban', name: 'Suburban Store' }
    ]

    // Generate events for the next 30 days
    const eventTypes = [
      { type: 'holiday', name: 'Valentine\'s Day', impact: 'high', description: 'Increased gift and flower sales', icon: Heart },
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
      
      // Generate events for some days
      const dayEvents: Event[] = []
      if (Math.random() > 0.7) {
        const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)]
        dayEvents.push(eventType as Event)
      }
      
      // Calculate demand level based on day of week and events
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
        month: date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
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
        confidence: 87 // Forecast confidence percentage
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
      currency: 'USD'
    }).format(amount)
  }

  function getDemandColor(level: string) {
    switch (level) {
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'medium': return 'bg-green-100 text-green-800 border-green-200'
      case 'high': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'very_high': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  function getEventColor(type: string) {
    switch (type) {
      case 'holiday': return 'text-red-600'
      case 'festival': return 'text-purple-600'
      case 'weather': return 'text-blue-600'
      case 'local_event': return 'text-green-600'
      case 'promotion': return 'text-orange-600'
      default: return 'text-gray-600'
    }
  }

  const currentStore = forecastData.stores.find(store => store.id === selectedStore) || forecastData.stores[0]

  const MetricCard = ({ 
    title, 
    value, 
    icon: Icon, 
    formatter = (val: number) => val.toLocaleString(),
    color = 'text-orange-600',
    trend,
    trendValue
  }: {
    title: string
    value: number
    icon: any
    formatter?: (val: number) => string
    color?: string
    trend?: 'up' | 'down' | 'stable'
    trendValue?: string
  }) => (
    <Card className="border-orange-100 dark:border-orange-900/30">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={`h-4 w-4 ${color}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formatter(value)}</div>
        {trend && trendValue && (
          <div className={`text-xs flex items-center space-x-1 ${
            trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-blue-600'
          }`}>
            {trend === 'up' ? (
              <ArrowUpRight className="h-3 w-3" />
            ) : trend === 'down' ? (
              <ArrowDownRight className="h-3 w-3" />
            ) : (
              <Activity className="h-3 w-3" />
            )}
            <span>{trendValue}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )

  return (
    <div className="flex flex-col h-full p-4 space-y-6 overflow-y-auto bg-background">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <TrendingUp className="h-5 w-5 text-orange-600" />
          <h2 className="text-xl font-semibold">Sales Forecast - {currentStore.name}</h2>
          <Badge variant="outline" className="border-orange-200 text-orange-700 dark:border-orange-800 dark:text-orange-300">
            {fragment.forecast_period}
          </Badge>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={selectedStore} onValueChange={setSelectedStore}>
            <SelectTrigger className="w-48 border-orange-200 dark:border-orange-800">
              <SelectValue placeholder="Select store" />
            </SelectTrigger>
            <SelectContent>
              {forecastData.stores.map((store) => (
                <SelectItem key={store.id} value={store.id}>
                  {store.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="text-sm text-muted-foreground">
            Updated: {lastUpdated.toLocaleTimeString()}
          </span>
          <Button
            onClick={refreshData}
            variant="outline"
            size="sm"
            className="h-8 border-orange-200 text-orange-700 hover:bg-orange-50 dark:border-orange-800 dark:text-orange-300 dark:hover:bg-orange-950/30"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Forecasted Sales"
          value={forecastData.summary.totalForecastedSales}
          icon={DollarSign}
          formatter={formatCurrency}
          trend="up"
          trendValue="+12% vs last period"
        />
        <MetricCard
          title="Avg Daily Traffic"
          value={forecastData.summary.avgDailyTraffic}
          icon={Users}
          color="text-blue-600"
          trend="up"
          trendValue="+8% expected"
        />
        <MetricCard
          title="Peak Days"
          value={forecastData.summary.peakDays}
          icon={TrendingUp}
          color="text-green-600"
          trend="stable"
          trendValue="Normal range"
        />
        <MetricCard
          title="Forecast Confidence"
          value={forecastData.summary.confidence}
          icon={Target}
          formatter={(val) => `${val}%`}
          color="text-purple-600"
          trend="up"
          trendValue="High accuracy"
        />
      </div>

      {/* Calendar View */}
      <Card className="border-orange-100 dark:border-orange-900/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-orange-600" />
              <span>30-Day Forecast Calendar</span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-xs border-red-200 text-red-700 dark:border-red-800 dark:text-red-300">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-1" />
                Very High Demand
              </Badge>
              <Badge variant="outline" className="text-xs border-yellow-200 text-yellow-700 dark:border-yellow-800 dark:text-yellow-300">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-1" />
                High Demand
              </Badge>
              <Badge variant="outline" className="text-xs border-green-200 text-green-700 dark:border-green-800 dark:text-green-300">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-1" />
                Medium Demand
              </Badge>
              <Badge variant="outline" className="text-xs border-blue-200 text-blue-700 dark:border-blue-800 dark:text-blue-300">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-1" />
                Low Demand
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {/* Calendar Headers */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center text-sm font-medium text-muted-foreground p-2">
                {day}
              </div>
            ))}
            
            {/* Calendar Days */}
            {forecastData.dailyForecasts.slice(0, 28).map((day, index) => {
              const date = new Date(day.date)
              const dayNumber = date.getDate()
              
              return (
                <Card 
                  key={day.date} 
                  className={`p-2 cursor-pointer transition-all hover:shadow-md border ${getDemandColor(day.demandLevel)} hover:scale-105`}
                >
                  <div className="text-center">
                    <div className="text-sm font-bold">{dayNumber}</div>
                    <div className="text-xs text-muted-foreground">{day.dayOfWeek}</div>
                    <div className="text-xs font-medium mt-1">{formatCurrency(day.salesForecast)}</div>
                    <div className="text-xs">{day.customerTraffic} visitors</div>
                    
                    {/* Events */}
                    {day.events.length > 0 && (
                      <div className="mt-1 space-y-1">
                        {day.events.slice(0, 2).map((event, eventIndex) => (
                          <div key={eventIndex} className="flex items-center justify-center">
                            <event.icon className={`h-3 w-3 ${getEventColor(event.type)}`} />
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {/* Staff Recommendation */}
                    <div className="text-xs mt-1 text-muted-foreground">
                      {day.staffRecommendation} staff
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Events and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming High-Impact Events */}
        <Card className="border-orange-100 dark:border-orange-900/30">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="h-4 w-4 text-orange-600" />
              <span>Upcoming High-Impact Events</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {forecastData.dailyForecasts
                .filter(day => day.events.some(e => e.impact === 'high'))
                .slice(0, 5)
                .map((day) => {
                  const date = new Date(day.date)
                  const highImpactEvents = day.events.filter(e => e.impact === 'high')
                  
                  return (
                    <div key={day.date} className="p-3 border rounded-lg border-orange-100 dark:border-orange-900/30 bg-orange-50 dark:bg-orange-950/30">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="font-medium text-sm">
                            {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', weekday: 'short' })}
                          </div>
                          {highImpactEvents.map((event, index) => (
                            <div key={index} className="mt-1">
                              <div className="flex items-center space-x-2">
                                <event.icon className={`h-4 w-4 ${getEventColor(event.type)}`} />
                                <span className="text-sm font-medium">{event.name}</span>
                              </div>
                              <div className="text-xs text-muted-foreground ml-6">{event.description}</div>
                            </div>
                          ))}
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold text-orange-600">{formatCurrency(day.salesForecast)}</div>
                          <div className="text-xs text-muted-foreground">{day.customerTraffic} visitors</div>
                        </div>
                      </div>
                    </div>
                  )
                })}
            </div>
          </CardContent>
        </Card>

        {/* Forecast Insights */}
        <Card className="border-orange-100 dark:border-orange-900/30">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4 text-orange-600" />
              <span>Forecast Insights</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-800 dark:text-green-300">Strong Growth Expected</span>
                </div>
                <p className="text-xs text-green-700 dark:text-green-400 mt-1">
                  Sales forecast shows 12% increase over next 30 days compared to last period
                </p>
              </div>

              <div className="p-3 bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm font-medium text-yellow-800 dark:text-yellow-300">Staff Planning Alert</span>
                </div>
                <p className="text-xs text-yellow-700 dark:text-yellow-400 mt-1">
                  {forecastData.summary.peakDays} high-demand days require additional staffing
                </p>
              </div>

              <div className="p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Package className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800 dark:text-blue-300">Inventory Recommendation</span>
                </div>
                <p className="text-xs text-blue-700 dark:text-blue-400 mt-1">
                  Stock up 20% more inventory for Valentine's Day and Winter Festival periods
                </p>
              </div>

              <div className="p-3 bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Target className="h-4 w-4 text-purple-600" />
                  <span className="text-sm font-medium text-purple-800 dark:text-purple-300">Accuracy Note</span>
                </div>
                <p className="text-xs text-purple-700 dark:text-purple-400 mt-1">
                  Forecast confidence at 87% based on historical data and market trends
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Trends */}
      <Card className="border-orange-100 dark:border-orange-900/30">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <LineChart className="h-4 w-4 text-orange-600" />
            <span>6-Month Forecast Trends</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {forecastData.monthlyForecasts.map((month, index) => (
              <div key={index} className="p-4 border rounded-lg border-orange-100 dark:border-orange-900/30 hover:bg-orange-50 dark:hover:bg-orange-950/30 transition-colors">
                <div className="text-center">
                  <div className="font-medium text-sm mb-2">{month.month}</div>
                  <div className="text-lg font-bold text-orange-600">{formatCurrency(month.totalSales)}</div>
                  <div className="text-xs text-muted-foreground mb-2">Forecasted Sales</div>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <div className="font-medium">{month.avgDailyTraffic}</div>
                      <div className="text-muted-foreground">Avg Daily Traffic</div>
                    </div>
                    <div>
                      <div className="font-medium">{month.peakDays}</div>
                      <div className="text-muted-foreground">Peak Days</div>
                    </div>
                  </div>
                  
                  <div className="mt-2">
                    <Badge variant="outline" className={`text-xs ${
                      month.trend === 'up' ? 'text-green-600 border-green-600' :
                      month.trend === 'down' ? 'text-red-600 border-red-600' :
                      'text-blue-600 border-blue-600'
                    }`}>
                      {month.trend === 'up' ? <TrendingUp className="h-3 w-3 mr-1" /> :
                       month.trend === 'down' ? <TrendingDown className="h-3 w-3 mr-1" /> :
                       <Activity className="h-3 w-3 mr-1" />}
                      {month.trend}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Summary Insights */}
      <Card className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950 dark:to-amber-950 border-orange-200 dark:border-orange-800">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-4 w-4 text-orange-600" />
            <span>Key Forecast Insights</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span>12% sales growth expected next month</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-blue-600" />
              <span>{forecastData.summary.peakDays} high-traffic days ahead</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-purple-600" />
              <span>{forecastData.summary.upcomingEvents} events impacting sales</span>
            </div>
            <div className="flex items-center space-x-2">
              <Target className="h-4 w-4 text-orange-600" />
              <span>87% forecast accuracy confidence</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}