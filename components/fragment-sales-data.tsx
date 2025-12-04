'use client'

import { SalesDataFragmentSchema } from '@/lib/schema'
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
  DollarSign,
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  Users,
  Package,
  RefreshCw,
  Target,
  Clock,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  PieChart,
  Activity,
  CreditCard,
  Award,
  Sparkles,
  Receipt,
  Wallet,
  Smartphone,
  Gift,
  ChevronRight
} from 'lucide-react'
import { useState } from 'react'

type DailySalesData = {
  date: string
  revenue: number
  transactions: number
  customers: number
  avgOrderValue: number
}

type WeeklySalesData = {
  week: string
  revenue: number
  transactions: number
  customers: number
  avgOrderValue: number
}

type MonthlySalesData = {
  month: string
  revenue: number
  transactions: number
  customers: number
  avgOrderValue: number
}

type QuarterlySalesData = {
  quarter: string
  revenue: number
  transactions: number
  customers: number
  avgOrderValue: number
}

type SalesData = DailySalesData | WeeklySalesData | MonthlySalesData | QuarterlySalesData

export function FragmentSalesData({ fragment }: { fragment: SalesDataFragmentSchema }) {
  const [lastUpdated, setLastUpdated] = useState(new Date('2025-02-02'))
  const [selectedTimeframe, setSelectedTimeframe] = useState<'daily' | 'weekly' | 'monthly' | 'quarterly'>('daily')
  const [selectedStore, setSelectedStore] = useState('mall')

  const mockData = {
    stores: [
      { id: 'mall', name: 'Mall of India Store' },
      { id: 'downtown', name: 'Downtown Branch' },
      { id: 'main', name: 'Main Store' },
      { id: 'suburban', name: 'Suburban Store' }
    ],
    currentMetrics: {
      totalRevenue: 1838638,
      previousRevenue: 1495000,
      totalTransactions: 705,
      previousTransactions: 593,
      avgOrderValue: 2608,
      previousAvgOrderValue: 2752,
      totalCustomers: 658,
      previousCustomers: 650,
      conversionRate: "6.6",
      previousConversionRate: "5.4",
      returnCustomers: "6.6",
      previousReturnCustomers: "5.4"
    },
    topProducts: [
      { name: 'Begum Wing Chair - Monkies', revenue: 35238.35, units: 2, growth: "18.5", category: 'Furniture' },
      { name: 'Marigold Steel Digital Print Bottle', revenue: 18814.5, units: 13, growth: "12.3", category: 'Drinkware' },
      { name: 'Quirky India Steel Sipper Bottle', revenue: 18309, units: 13, growth: "8.7", category: 'Drinkware' },
      { name: 'Travel Patches Tote Bag', revenue: 17578, units: 7, growth: "15.2", category: 'Bags' },
      { name: 'Olive Palm Quilted Crossbody Bag', revenue: 16987.25, units: 7, growth: "-3.4", category: 'Bags' }
    ],
    salesByCategory: [
      { category: 'Sippers & Bottles', revenue: 176500, percentage: 9.6, color: 'from-emerald-500 to-teal-500' },
      { category: 'Tote Bags', revenue: 143414, percentage: 7.8, color: 'from-blue-500 to-cyan-500' },
      { category: 'Fridge Magnets', revenue: 119511, percentage: 6.5, color: 'from-violet-500 to-purple-500' },
      { category: 'Mugs & Cups', revenue: 117633, percentage: 6.4, color: 'from-amber-500 to-orange-500' },
      { category: 'Crossbody Bags', revenue: 108480, percentage: 5.9, color: 'from-pink-500 to-rose-500' }
    ],
    paymentMethods: [
      { method: 'Credit Card', percentage: 45, transactions: 317, icon: CreditCard, color: 'text-blue-500' },
      { method: 'Debit Card', percentage: 30, transactions: 212, icon: Wallet, color: 'text-emerald-500' },
      { method: 'Cash', percentage: 15, transactions: 106, icon: Receipt, color: 'text-amber-500' },
      { method: 'Mobile Pay', percentage: 8, transactions: 56, icon: Smartphone, color: 'text-violet-500' },
      { method: 'Gift Card', percentage: 2, transactions: 14, icon: Gift, color: 'text-pink-500' }
    ],
    hourlyTrends: Array.from({ length: 24 }, (_, hour) => ({
      hour: `${hour.toString().padStart(2, '0')}:00`,
      revenue: Math.floor(Math.random() * 2000) + (hour >= 9 && hour <= 21 ? 500 : 100),
      transactions: Math.floor(Math.random() * 50) + (hour >= 9 && hour <= 21 ? 20 : 5)
    })),
    dailySales: Array.from({ length: 30 }, (_, i) => {
      const date = new Date('2025-02-02')
      date.setDate(date.getDate() - (29 - i))
      return {
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        revenue: Math.floor(Math.random() * 80000) + 40000,
        transactions: Math.floor(Math.random() * 30) + 15,
        customers: Math.floor(Math.random() * 40) + 20,
        avgOrderValue: Math.floor(Math.random() * 1000) + 2000
      }
    }) as DailySalesData[],
    weeklySales: Array.from({ length: 12 }, (_, i) => ({
      week: `Week ${i + 1}`,
      revenue: Math.floor(Math.random() * 500000) + 300000,
      transactions: Math.floor(Math.random() * 200) + 100,
      customers: Math.floor(Math.random() * 300) + 150,
      avgOrderValue: Math.floor(Math.random() * 1000) + 2000
    })) as WeeklySalesData[],
    monthlySales: Array.from({ length: 12 }, (_, i) => {
      const date = new Date('2025-02-02')
      date.setMonth(date.getMonth() - (11 - i))
      return {
        month: date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
        revenue: Math.floor(Math.random() * 2000000) + 1000000,
        transactions: Math.floor(Math.random() * 800) + 400,
        customers: Math.floor(Math.random() * 1200) + 600,
        avgOrderValue: Math.floor(Math.random() * 1000) + 2000
      }
    }) as MonthlySalesData[],
    quarterlySales: Array.from({ length: 8 }, (_, i) => ({
      quarter: `Q${(i % 4) + 1} '${24 - Math.floor(i / 4)}`,
      revenue: Math.floor(Math.random() * 6000000) + 3000000,
      transactions: Math.floor(Math.random() * 2500) + 1500,
      customers: Math.floor(Math.random() * 4000) + 2000,
      avgOrderValue: Math.floor(Math.random() * 1000) + 2000
    })) as QuarterlySalesData[]
  }

  function refreshData() {
    setLastUpdated(new Date())
  }

  function formatCurrency(amount: number) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
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
      case 'quarterly': return mockData.quarterlySales
      default: return mockData.dailySales
    }
  }

  const getLabel = (item: SalesData, timeframe: 'daily' | 'weekly' | 'monthly' | 'quarterly'): string => {
    switch (timeframe) {
      case 'daily': return 'date' in item ? item.date : ''
      case 'weekly': return 'week' in item ? item.week : ''
      case 'monthly': return 'month' in item ? item.month : ''
      case 'quarterly': return 'quarter' in item ? item.quarter : ''
      default: return ''
    }
  }

  const currentStore = mockData.stores.find(store => store.id === selectedStore) || mockData.stores[0]
  const revenueChange = calculatePercentageChange(mockData.currentMetrics.totalRevenue, mockData.currentMetrics.previousRevenue)
  const transactionsChange = calculatePercentageChange(mockData.currentMetrics.totalTransactions, mockData.currentMetrics.previousTransactions)
  const aovChange = calculatePercentageChange(mockData.currentMetrics.avgOrderValue, mockData.currentMetrics.previousAvgOrderValue)

  // Metric Card Component
  const MetricCard = ({
    title,
    value,
    change,
    icon: Icon,
    gradient,
    suffix = ''
  }: {
    title: string
    value: string
    change: string
    icon: any
    gradient: string
    suffix?: string
  }) => {
    const isPositive = !change.startsWith('-')
    return (
      <div className="relative group">
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl -z-10" style={{ background: gradient }} />
        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:border-zinc-300 dark:hover:border-zinc-600">
          <div className="flex items-start justify-between">
            <div className="space-y-3">
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{title}</p>
              <div className="flex items-baseline space-x-1">
                <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{value}</span>
                {suffix && <span className="text-sm text-zinc-500">{suffix}</span>}
              </div>
              <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                isPositive
                  ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400'
                  : 'bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400'
              }`}>
                {isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                <span>{isPositive ? '+' : ''}{change}%</span>
              </div>
            </div>
            <div className="p-3 rounded-xl" style={{ background: gradient }}>
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
    const maxRevenue = Math.max(...data.map(d => d.revenue))

    return (
      <div className="p-6 rounded-2xl bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600">
              <BarChart3 className="h-4 w-4 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Revenue Trends</h3>
              <p className="text-sm text-zinc-500">Sales performance over time</p>
            </div>
          </div>
          <div className="flex items-center space-x-1 bg-zinc-100 dark:bg-zinc-800 rounded-xl p-1">
            {(['daily', 'weekly', 'monthly', 'quarterly'] as const).map((timeframe) => (
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

        <div className="h-56 flex items-end space-x-1">
          {data.slice(-15).map((item, index) => {
            const height = (item.revenue / maxRevenue) * 100
            const label = getLabel(item, selectedTimeframe)
            return (
              <div key={index} className="flex-1 flex flex-col items-center group">
                <div className="relative w-full">
                  <div
                    className="w-full rounded-t-lg bg-gradient-to-t from-emerald-500 to-teal-400 opacity-80 group-hover:opacity-100 transition-all duration-200 cursor-pointer group-hover:shadow-lg group-hover:shadow-emerald-500/25"
                    style={{ height: `${Math.max(height, 4)}%`, minHeight: '8px' }}
                  />
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-zinc-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    {formatCurrency(item.revenue)}
                  </div>
                </div>
                <span className="text-[10px] text-zinc-400 mt-2 transform -rotate-45 origin-left truncate max-w-[40px]">
                  {label}
                </span>
              </div>
            )
          })}
        </div>

        <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-zinc-100 dark:border-zinc-700/50">
          <div className="text-center">
            <div className="text-lg font-bold text-zinc-900 dark:text-zinc-50">{formatCurrency(data[data.length - 1]?.revenue || 0)}</div>
            <div className="text-xs text-zinc-500">Latest Revenue</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-zinc-900 dark:text-zinc-50">{data[data.length - 1]?.transactions || 0}</div>
            <div className="text-xs text-zinc-500">Transactions</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-zinc-900 dark:text-zinc-50">{data[data.length - 1]?.customers || 0}</div>
            <div className="text-xs text-zinc-500">Customers</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-zinc-900 dark:text-zinc-50">{formatCurrency(data[data.length - 1]?.avgOrderValue || 0)}</div>
            <div className="text-xs text-zinc-500">Avg Order</div>
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
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/25">
              <DollarSign className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Sales Analytics</h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">{currentStore.name}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Select value={selectedStore} onValueChange={setSelectedStore}>
              <SelectTrigger className="w-48 bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 rounded-xl">
                <SelectValue placeholder="Select store" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                {mockData.stores.map((store) => (
                  <SelectItem key={store.id} value={store.id}>{store.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Badge variant="secondary" className="rounded-xl px-3 py-1">
              <Clock className="h-3 w-3 mr-1" />
              This Month
            </Badge>
            <Button onClick={refreshData} variant="outline" size="sm" className="rounded-xl">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Live Stats Banner */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 border border-emerald-200 dark:border-emerald-500/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Live Sales Data</span>
              </div>
              <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-800/50">
                <Sparkles className="h-4 w-4 text-emerald-500" />
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">+23.1% vs last period</span>
              </div>
            </div>
            <span className="text-xs text-zinc-500">Updated: Feb 02, 2025</span>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Total Revenue"
            value={formatCurrency(mockData.currentMetrics.totalRevenue)}
            change={revenueChange}
            icon={DollarSign}
            gradient="linear-gradient(135deg, #10b981 0%, #059669 100%)"
          />
          <MetricCard
            title="Transactions"
            value={mockData.currentMetrics.totalTransactions.toLocaleString()}
            change={transactionsChange}
            icon={ShoppingCart}
            gradient="linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)"
          />
          <MetricCard
            title="Avg Order Value"
            value={formatCurrency(mockData.currentMetrics.avgOrderValue)}
            change={aovChange}
            icon={Target}
            gradient="linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)"
          />
          <MetricCard
            title="Return Customers"
            value={mockData.currentMetrics.returnCustomers}
            change="1.2"
            icon={Award}
            suffix="%"
            gradient="linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sales Chart - 2 columns */}
          <div className="lg:col-span-2">
            <SalesChart />
          </div>

          {/* Top Products */}
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600">
                <Star className="h-4 w-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Top Products</h3>
                <p className="text-sm text-zinc-500">Best performers</p>
              </div>
            </div>
            <div className="space-y-3">
              {mockData.topProducts.map((product, index) => (
                <div
                  key={index}
                  className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700/50"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-zinc-900 dark:text-zinc-100 text-sm truncate">{product.name}</div>
                        <div className="text-xs text-zinc-500">{product.units} units</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">{formatCurrency(product.revenue)}</div>
                      <div className={`text-xs flex items-center justify-end ${
                        product.growth.startsWith('-') ? 'text-red-500' : 'text-emerald-500'
                      }`}>
                        {product.growth.startsWith('-') ? (
                          <ArrowDownRight className="h-3 w-3" />
                        ) : (
                          <ArrowUpRight className="h-3 w-3" />
                        )}
                        {product.growth}%
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sales by Category and Payment Methods */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sales by Category */}
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600">
                <PieChart className="h-4 w-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Sales by Category</h3>
                <p className="text-sm text-zinc-500">Revenue distribution</p>
              </div>
            </div>
            <div className="space-y-4">
              {mockData.salesByCategory.map((category, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${category.color}`} />
                      <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{category.category}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{formatCurrency(category.revenue)}</span>
                      <span className="text-xs text-zinc-500 ml-2">{category.percentage}%</span>
                    </div>
                  </div>
                  <div className="h-2 bg-zinc-100 dark:bg-zinc-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${category.color} transition-all duration-500`}
                      style={{ width: `${category.percentage * 10}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Methods */}
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600">
                <CreditCard className="h-4 w-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Payment Methods</h3>
                <p className="text-sm text-zinc-500">Transaction distribution</p>
              </div>
            </div>
            <div className="space-y-3">
              {mockData.paymentMethods.map((method, index) => {
                const Icon = method.icon
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700/50"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg bg-zinc-100 dark:bg-zinc-700 ${method.color}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-medium text-zinc-900 dark:text-zinc-100 text-sm">{method.method}</div>
                        <div className="text-xs text-zinc-500">{method.transactions} transactions</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-20 h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
                          style={{ width: `${method.percentage * 2}%` }}
                        />
                      </div>
                      <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100 w-10 text-right">{method.percentage}%</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Key Insights */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 border border-emerald-200 dark:border-emerald-500/20">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600">
                <Activity className="h-4 w-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">AI-Powered Insights</h3>
                <p className="text-sm text-zinc-500">Key observations from your data</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="rounded-xl">
              View All
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="h-4 w-4 text-emerald-500" />
                <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Growth</span>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Revenue up 23.1% vs last period</p>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50">
              <div className="flex items-center space-x-2 mb-2">
                <Users className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Customers</span>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">34 returning customers driving repeat sales</p>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50">
              <div className="flex items-center space-x-2 mb-2">
                <Package className="h-4 w-4 text-violet-500" />
                <span className="text-sm font-medium text-violet-600 dark:text-violet-400">Top Category</span>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Sippers & Bottles leading at 9.6%</p>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50">
              <div className="flex items-center space-x-2 mb-2">
                <Star className="h-4 w-4 text-amber-500" />
                <span className="text-sm font-medium text-amber-600 dark:text-amber-400">Best Seller</span>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Begum Wing Chair - High-value item</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
