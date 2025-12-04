'use client'

import { DashboardFragmentSchema } from '@/lib/schema'
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
  BarChart3,
  TrendingUp,
  Users,
  ShoppingCart,
  Package,
  DollarSign,
  Calendar,
  RefreshCw,
  UserCheck,
  AlertTriangle,
  Target,
  Clock,
  MapPin,
  Star,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Zap,
  Eye,
  ChevronRight,
  Sparkles,
  Award,
  Coffee,
  Percent
} from 'lucide-react'
import { useState, useEffect, useMemo } from 'react'

// Define specific types for each timeframe
type DailySalesData = {
  date: string
  sales: number
  customers: number
  transactions: number
}

type WeeklySalesData = {
  week: string
  sales: number
  customers: number
  transactions: number
}

type MonthlySalesData = {
  month: string
  sales: number
  customers: number
  transactions: number
}

type SalesData = DailySalesData | WeeklySalesData | MonthlySalesData

interface MockDashboardData {
  salesRevenue: {
    current: number
    previous: number
    trend: 'up' | 'down'
  }
  customerTraffic: {
    current: number
    previous: number
    trend: 'up' | 'down'
  }
  inventoryLevels: {
    inStock: number
    lowStock: number
    outOfStock: number
  }
  avgTransactionValue: {
    current: number
    previous: number
    trend: 'up' | 'down'
  }
  conversionRate: {
    current: number
    previous: number
    trend: 'up' | 'down'
  }
  topProducts: Array<{
    name: string
    sales: number
    revenue: number
    trend: 'up' | 'down'
  }>
  employees: Array<{
    name: string
    role: string
    status: 'present' | 'break' | 'absent'
    shift: string
    performance: number
    avatar: string
  }>
  storeComparison: Array<{
    name: string
    revenue: number
    growth: number
    status: 'excellent' | 'good' | 'needs_attention'
    customers: number
  }>
  dailySales: DailySalesData[]
  weeklySales: WeeklySalesData[]
  monthlySales: MonthlySalesData[]
  peakHours: Array<{
    hour: string
    customers: number
    sales: number
    percentage: number
  }>
  customerSatisfaction: {
    rating: number
    reviews: number
    complaints: number
    compliments: number
    nps: number
  }
  realtimeMetrics: {
    activeShoppers: number
    checkoutQueue: number
    avgWaitTime: string
  }
}

export function FragmentDashboard({ fragment }: { fragment: DashboardFragmentSchema }) {
  const [mockData, setMockData] = useState<MockDashboardData>(generateMockData())
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [selectedTimeframe, setSelectedTimeframe] = useState<'daily' | 'weekly' | 'monthly'>('daily')
  const [selectedStore, setSelectedStore] = useState('all')

  function generateMockData(): MockDashboardData {
    const dailySales: DailySalesData[] = Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      sales: Math.floor(Math.random() * 5000) + 1000,
      customers: Math.floor(Math.random() * 200) + 50,
      transactions: Math.floor(Math.random() * 150) + 30
    }))

    const weeklySales: WeeklySalesData[] = Array.from({ length: 12 }, (_, i) => ({
      week: `Week ${i + 1}`,
      sales: Math.floor(Math.random() * 30000) + 10000,
      customers: Math.floor(Math.random() * 1200) + 400,
      transactions: Math.floor(Math.random() * 800) + 200
    }))

    const monthlySales: MonthlySalesData[] = Array.from({ length: 12 }, (_, i) => {
      const date = new Date()
      date.setMonth(date.getMonth() - (11 - i))
      return {
        month: date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
        sales: Math.floor(Math.random() * 120000) + 40000,
        customers: Math.floor(Math.random() * 5000) + 1500,
        transactions: Math.floor(Math.random() * 3000) + 800
      }
    })

    return {
      salesRevenue: {
        current: Math.floor(Math.random() * 50000) + 10000,
        previous: Math.floor(Math.random() * 45000) + 8000,
        trend: Math.random() > 0.3 ? 'up' : 'down'
      },
      customerTraffic: {
        current: Math.floor(Math.random() * 500) + 100,
        previous: Math.floor(Math.random() * 450) + 80,
        trend: Math.random() > 0.3 ? 'up' : 'down'
      },
      inventoryLevels: {
        inStock: Math.floor(Math.random() * 1000) + 500,
        lowStock: Math.floor(Math.random() * 50) + 10,
        outOfStock: Math.floor(Math.random() * 20) + 5
      },
      avgTransactionValue: {
        current: Math.floor(Math.random() * 100) + 25,
        previous: Math.floor(Math.random() * 95) + 20,
        trend: Math.random() > 0.3 ? 'up' : 'down'
      },
      conversionRate: {
        current: Math.floor(Math.random() * 30) + 15,
        previous: Math.floor(Math.random() * 28) + 12,
        trend: Math.random() > 0.3 ? 'up' : 'down'
      },
      topProducts: [
        { name: 'Premium Coffee Beans', sales: Math.floor(Math.random() * 200) + 50, revenue: Math.floor(Math.random() * 5000) + 1000, trend: 'up' },
        { name: 'Organic Milk', sales: Math.floor(Math.random() * 180) + 40, revenue: Math.floor(Math.random() * 3000) + 800, trend: 'up' },
        { name: 'Fresh Bread', sales: Math.floor(Math.random() * 150) + 30, revenue: Math.floor(Math.random() * 2000) + 600, trend: 'down' },
        { name: 'Energy Drinks', sales: Math.floor(Math.random() * 120) + 25, revenue: Math.floor(Math.random() * 4000) + 900, trend: 'up' },
        { name: 'Snack Mix', sales: Math.floor(Math.random() * 100) + 20, revenue: Math.floor(Math.random() * 1500) + 400, trend: 'down' }
      ],
      employees: [
        { name: 'Sarah Johnson', role: 'Store Manager', status: 'present', shift: '9AM - 6PM', performance: 95, avatar: 'SJ' },
        { name: 'Mike Chen', role: 'Cashier', status: 'present', shift: '10AM - 7PM', performance: 88, avatar: 'MC' },
        { name: 'Emily Davis', role: 'Sales Associate', status: 'present', shift: '8AM - 5PM', performance: 92, avatar: 'ED' },
        { name: 'James Wilson', role: 'Stock Clerk', status: 'break', shift: '7AM - 4PM', performance: 85, avatar: 'JW' },
        { name: 'Lisa Brown', role: 'Cashier', status: 'absent', shift: '2PM - 11PM', performance: 78, avatar: 'LB' },
        { name: 'David Lee', role: 'Security', status: 'present', shift: '6AM - 3PM', performance: 90, avatar: 'DL' }
      ],
      storeComparison: [
        { name: 'Main Store', revenue: 45000, growth: 12.5, status: 'excellent', customers: 1250 },
        { name: 'Downtown Branch', revenue: 38000, growth: 8.2, status: 'good', customers: 980 },
        { name: 'Mall Location', revenue: 52000, growth: 15.8, status: 'excellent', customers: 1450 },
        { name: 'Suburban Store', revenue: 28000, growth: -3.2, status: 'needs_attention', customers: 720 },
        { name: 'Airport Shop', revenue: 35000, growth: 5.1, status: 'good', customers: 890 }
      ],
      dailySales,
      weeklySales,
      monthlySales,
      peakHours: [
        { hour: '8:00 AM', customers: 45, sales: 1200, percentage: 35 },
        { hour: '12:00 PM', customers: 120, sales: 3200, percentage: 100 },
        { hour: '5:00 PM', customers: 95, sales: 2800, percentage: 80 },
        { hour: '7:00 PM', customers: 75, sales: 2100, percentage: 60 }
      ],
      customerSatisfaction: {
        rating: 4.3,
        reviews: 156,
        complaints: 8,
        compliments: 42,
        nps: 72
      },
      realtimeMetrics: {
        activeShoppers: Math.floor(Math.random() * 50) + 20,
        checkoutQueue: Math.floor(Math.random() * 8) + 2,
        avgWaitTime: `${Math.floor(Math.random() * 5) + 1}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`
      }
    }
  }

  function refreshData() {
    setMockData(generateMockData())
    setLastUpdated(new Date())
  }

  function formatCurrency(amount: number) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount)
  }

  function calculatePercentageChange(current: number, previous: number) {
    return ((current - previous) / previous * 100).toFixed(1)
  }

  const getCurrentSalesData = (): SalesData[] => {
    switch (selectedTimeframe) {
      case 'weekly': return mockData.weeklySales
      case 'monthly': return mockData.monthlySales
      default: return mockData.dailySales
    }
  }

  const getLabel = (item: SalesData, timeframe: 'daily' | 'weekly' | 'monthly'): string => {
    switch (timeframe) {
      case 'daily': return 'date' in item ? item.date : ''
      case 'weekly': return 'week' in item ? item.week : ''
      case 'monthly': return 'month' in item ? item.month : ''
      default: return ''
    }
  }

  // Metric Card Component
  const MetricCard = ({
    title,
    value,
    previousValue,
    trend,
    icon: Icon,
    formatter = (val: number) => val.toLocaleString(),
    gradient,
    suffix = ''
  }: {
    title: string
    value: number
    previousValue?: number
    trend?: 'up' | 'down'
    icon: any
    formatter?: (val: number) => string
    gradient: string
    suffix?: string
  }) => {
    const percentChange = previousValue ? calculatePercentageChange(value, previousValue) : null

    return (
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl -z-10" style={{ background: gradient }} />
        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:border-zinc-300 dark:hover:border-zinc-600">
          <div className="flex items-start justify-between">
            <div className="space-y-3">
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{title}</p>
              <div className="flex items-baseline space-x-1">
                <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{formatter(value)}</span>
                {suffix && <span className="text-sm text-zinc-500">{suffix}</span>}
              </div>
              {percentChange && (
                <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                  trend === 'up'
                    ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400'
                    : 'bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400'
                }`}>
                  {trend === 'up' ? (
                    <ArrowUpRight className="h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3" />
                  )}
                  <span>{Math.abs(Number(percentChange))}%</span>
                </div>
              )}
            </div>
            <div className={`p-3 rounded-xl`} style={{ background: gradient }}>
              <Icon className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Sales Chart Component
  const SalesChart = () => {
    const data = getCurrentSalesData()
    const maxSales = Math.max(...data.map(d => d.sales))

    return (
      <div className="p-6 rounded-2xl bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600">
              <BarChart3 className="h-4 w-4 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Sales Performance</h3>
              <p className="text-sm text-zinc-500">Revenue over time</p>
            </div>
          </div>
          <div className="flex items-center space-x-1 bg-zinc-100 dark:bg-zinc-800 rounded-xl p-1">
            {(['daily', 'weekly', 'monthly'] as const).map((timeframe) => (
              <button
                key={timeframe}
                onClick={() => setSelectedTimeframe(timeframe)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  selectedTimeframe === timeframe
                    ? 'bg-white dark:bg-zinc-700 shadow-sm text-zinc-900 dark:text-zinc-50'
                    : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-50'
                }`}
              >
                {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="h-64 flex items-end space-x-1">
          {data.slice(-15).map((item, index) => {
            const height = (item.sales / maxSales) * 100
            const label = getLabel(item, selectedTimeframe)
            return (
              <div key={index} className="flex-1 flex flex-col items-center group">
                <div className="relative w-full">
                  <div
                    className="w-full rounded-t-lg bg-gradient-to-t from-violet-500 to-purple-400 opacity-80 group-hover:opacity-100 transition-all duration-200 cursor-pointer group-hover:shadow-lg group-hover:shadow-violet-500/25"
                    style={{ height: `${Math.max(height, 4)}%`, minHeight: '8px' }}
                  />
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-zinc-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    {formatCurrency(item.sales)}
                  </div>
                </div>
                <span className="text-[10px] text-zinc-400 mt-2 transform -rotate-45 origin-left truncate max-w-[40px]">
                  {label}
                </span>
              </div>
            )
          })}
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-zinc-100 dark:border-zinc-700/50">
          <div className="text-center">
            <div className="text-lg font-bold text-zinc-900 dark:text-zinc-50">{formatCurrency(data[data.length - 1]?.sales || 0)}</div>
            <div className="text-xs text-zinc-500">Latest Revenue</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-zinc-900 dark:text-zinc-50">{data[data.length - 1]?.customers || 0}</div>
            <div className="text-xs text-zinc-500">Customers</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-zinc-900 dark:text-zinc-50">{data[data.length - 1]?.transactions || 0}</div>
            <div className="text-xs text-zinc-500">Transactions</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-20 backdrop-blur-xl bg-white/80 dark:bg-zinc-900/80 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-violet-500/25">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">{fragment.store_name} Analytics</h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Real-time performance insights</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Select value={selectedStore} onValueChange={setSelectedStore}>
              <SelectTrigger className="w-40 bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 rounded-xl">
                <SelectValue placeholder="All Stores" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="all">All Stores</SelectItem>
                {mockData.storeComparison.map(store => (
                  <SelectItem key={store.name} value={store.name}>{store.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Badge variant="secondary" className="rounded-xl px-3 py-1">
              <Clock className="h-3 w-3 mr-1" />
              {fragment.time_period}
            </Badge>
            <Button onClick={refreshData} variant="outline" size="sm" className="rounded-xl">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Real-time Status Bar */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-violet-500/10 via-purple-500/10 to-fuchsia-500/10 border border-violet-200 dark:border-violet-500/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Live Dashboard</span>
              </div>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-800/50">
                  <Users className="h-4 w-4 text-violet-500" />
                  <span className="font-medium">{mockData.realtimeMetrics.activeShoppers}</span>
                  <span className="text-zinc-500">Active Shoppers</span>
                </div>
                <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-800/50">
                  <ShoppingCart className="h-4 w-4 text-violet-500" />
                  <span className="font-medium">{mockData.realtimeMetrics.checkoutQueue}</span>
                  <span className="text-zinc-500">In Queue</span>
                </div>
                <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-800/50">
                  <Clock className="h-4 w-4 text-violet-500" />
                  <span className="font-medium">{mockData.realtimeMetrics.avgWaitTime}</span>
                  <span className="text-zinc-500">Avg Wait</span>
                </div>
              </div>
            </div>
            <span className="text-xs text-zinc-500">Updated: {lastUpdated.toLocaleTimeString()}</span>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <MetricCard
            title="Total Revenue"
            value={mockData.salesRevenue.current}
            previousValue={mockData.salesRevenue.previous}
            trend={mockData.salesRevenue.trend}
            icon={DollarSign}
            formatter={formatCurrency}
            gradient="linear-gradient(135deg, #10b981 0%, #059669 100%)"
          />
          <MetricCard
            title="Customer Traffic"
            value={mockData.customerTraffic.current}
            previousValue={mockData.customerTraffic.previous}
            trend={mockData.customerTraffic.trend}
            icon={Users}
            gradient="linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)"
          />
          <MetricCard
            title="Avg Transaction"
            value={mockData.avgTransactionValue.current}
            previousValue={mockData.avgTransactionValue.previous}
            trend={mockData.avgTransactionValue.trend}
            icon={ShoppingCart}
            formatter={formatCurrency}
            gradient="linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)"
          />
          <MetricCard
            title="Conversion Rate"
            value={mockData.conversionRate.current}
            previousValue={mockData.conversionRate.previous}
            trend={mockData.conversionRate.trend}
            icon={Percent}
            suffix="%"
            gradient="linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
          />
          <MetricCard
            title="Items in Stock"
            value={mockData.inventoryLevels.inStock}
            icon={Package}
            gradient="linear-gradient(135deg, #ec4899 0%, #db2777 100%)"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sales Chart - Takes 2 columns */}
          <div className="lg:col-span-2">
            <SalesChart />
          </div>

          {/* Peak Hours */}
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600">
                <Zap className="h-4 w-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Peak Hours</h3>
                <p className="text-sm text-zinc-500">Busiest times today</p>
              </div>
            </div>
            <div className="space-y-4">
              {mockData.peakHours.map((hour, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{hour.hour}</span>
                      <Badge variant="secondary" className="text-xs rounded-md">
                        {hour.customers} visitors
                      </Badge>
                    </div>
                    <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{formatCurrency(hour.sales)}</span>
                  </div>
                  <div className="h-2 bg-zinc-100 dark:bg-zinc-700 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-500"
                      style={{ width: `${hour.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Store Comparison & Top Products */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Store Comparison */}
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600">
                  <MapPin className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Store Performance</h3>
                  <p className="text-sm text-zinc-500">Compare locations</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              {mockData.storeComparison.map((store, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700/50 hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      store.status === 'excellent' ? 'bg-emerald-100 dark:bg-emerald-500/20' :
                      store.status === 'good' ? 'bg-amber-100 dark:bg-amber-500/20' : 'bg-red-100 dark:bg-red-500/20'
                    }`}>
                      <MapPin className={`h-5 w-5 ${
                        store.status === 'excellent' ? 'text-emerald-600 dark:text-emerald-400' :
                        store.status === 'good' ? 'text-amber-600 dark:text-amber-400' : 'text-red-600 dark:text-red-400'
                      }`} />
                    </div>
                    <div>
                      <div className="font-medium text-zinc-900 dark:text-zinc-100">{store.name}</div>
                      <div className="text-xs text-zinc-500">{store.customers.toLocaleString()} customers</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-zinc-900 dark:text-zinc-100">{formatCurrency(store.revenue)}</div>
                    <div className={`text-xs flex items-center justify-end space-x-1 ${
                      store.growth >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
                    }`}>
                      {store.growth >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                      <span>{Math.abs(store.growth)}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Products */}
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600">
                  <TrendingUp className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Top Products</h3>
                  <p className="text-sm text-zinc-500">Best performers</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              {mockData.topProducts.map((product, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700/50"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium text-zinc-900 dark:text-zinc-100">{product.name}</div>
                      <div className="text-xs text-zinc-500">{product.sales} units sold</div>
                    </div>
                  </div>
                  <div className="text-right flex items-center space-x-2">
                    <div className="font-semibold text-zinc-900 dark:text-zinc-100">{formatCurrency(product.revenue)}</div>
                    {product.trend === 'up' ? (
                      <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Staff & Customer Satisfaction */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Employee Status */}
          <div className="lg:col-span-2 p-6 rounded-2xl bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600">
                  <UserCheck className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Team Status</h3>
                  <p className="text-sm text-zinc-500">{mockData.employees.filter(e => e.status === 'present').length} of {mockData.employees.length} on duty</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {mockData.employees.map((employee, index) => (
                <div key={index} className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700/50">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold ${
                        employee.status === 'present' ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400' :
                        employee.status === 'break' ? 'bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400' :
                        'bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400'
                      }`}>
                        {employee.avatar}
                      </div>
                      <div>
                        <div className="font-medium text-zinc-900 dark:text-zinc-100">{employee.name}</div>
                        <div className="text-xs text-zinc-500">{employee.role}</div>
                      </div>
                    </div>
                    <Badge
                      className={`text-xs ${
                        employee.status === 'present' ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30' :
                        employee.status === 'break' ? 'bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/30' :
                        'bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-500/30'
                      }`}
                    >
                      {employee.status}
                    </Badge>
                  </div>
                  <div className="text-xs text-zinc-500 mb-2">Shift: {employee.shift}</div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-zinc-500">Performance</span>
                      <span className="font-medium text-zinc-700 dark:text-zinc-300">{employee.performance}%</span>
                    </div>
                    <div className="h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          employee.performance >= 90 ? 'bg-emerald-500' :
                          employee.performance >= 80 ? 'bg-amber-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${employee.performance}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Satisfaction */}
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-600">
                <Star className="h-4 w-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Customer Feedback</h3>
                <p className="text-sm text-zinc-500">Satisfaction metrics</p>
              </div>
            </div>

            <div className="text-center mb-6">
              <div className="text-5xl font-bold text-zinc-900 dark:text-zinc-50">{mockData.customerSatisfaction.rating}</div>
              <div className="flex justify-center mt-2 space-x-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(mockData.customerSatisfaction.rating)
                        ? 'text-yellow-500 fill-yellow-500'
                        : 'text-zinc-300 dark:text-zinc-600'
                    }`}
                  />
                ))}
              </div>
              <div className="text-sm text-zinc-500 mt-2">{mockData.customerSatisfaction.reviews} reviews</div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-violet-50 dark:bg-violet-500/10 border border-violet-200 dark:border-violet-500/20">
                <div className="flex items-center space-x-2">
                  <Award className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                  <span className="text-sm font-medium text-violet-700 dark:text-violet-300">NPS Score</span>
                </div>
                <span className="text-lg font-bold text-violet-600 dark:text-violet-400">{mockData.customerSatisfaction.nps}</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-center">
                  <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{mockData.customerSatisfaction.compliments}</div>
                  <div className="text-xs text-emerald-600 dark:text-emerald-400">Compliments</div>
                </div>
                <div className="p-3 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-center">
                  <div className="text-lg font-bold text-red-600 dark:text-red-400">{mockData.customerSatisfaction.complaints}</div>
                  <div className="text-xs text-red-600 dark:text-red-400">Complaints</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Inventory Alert Card */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-red-500/10 border border-amber-200 dark:border-amber-500/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-xl bg-amber-100 dark:bg-amber-500/20">
                <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Inventory Alerts</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  {mockData.inventoryLevels.lowStock + mockData.inventoryLevels.outOfStock} items need attention
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-emerald-100 dark:bg-emerald-500/20">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">{mockData.inventoryLevels.inStock} In Stock</span>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-amber-100 dark:bg-amber-500/20">
                <div className="w-2 h-2 rounded-full bg-amber-500" />
                <span className="text-sm font-medium text-amber-700 dark:text-amber-400">{mockData.inventoryLevels.lowStock} Low Stock</span>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-red-100 dark:bg-red-500/20">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <span className="text-sm font-medium text-red-700 dark:text-red-400">{mockData.inventoryLevels.outOfStock} Out of Stock</span>
              </div>
              <Button variant="outline" size="sm" className="rounded-xl">
                View Details
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
