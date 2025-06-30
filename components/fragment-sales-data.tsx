'use client'

import { SalesDataFragmentSchema } from '@/lib/schema'
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
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  ShoppingCart, 
  Users, 
  Package,
  Calendar,
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
  Percent,
  Award
} from 'lucide-react'
import { useState, useEffect } from 'react'

// Define specific types for each timeframe
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

// Union type for chart data
type SalesData = DailySalesData | WeeklySalesData | MonthlySalesData | QuarterlySalesData

export function FragmentSalesData({ fragment }: { fragment: SalesDataFragmentSchema }) {
  const [lastUpdated, setLastUpdated] = useState(new Date('2025-02-02'))
  const [selectedTimeframe, setSelectedTimeframe] = useState<'daily' | 'weekly' | 'monthly' | 'quarterly'>('daily')
  const [selectedStore, setSelectedStore] = useState('mall')

  // Use the specific data provided by the user
  const mockData = {
    stores: [
      { id: 'mall', name: 'Mall of India Store' },
      { id: 'downtown', name: 'Downtown Branch' },
      { id: 'main', name: 'Main Store' },
      { id: 'suburban', name: 'Suburban Store' }
    ],
    currentMetrics: {
      totalRevenue: 1838638,
      previousRevenue: 1495000, // Calculated to give +23.1%
      totalTransactions: 705,
      previousTransactions: 593, // Calculated to give +18.9%
      avgOrderValue: 2608,
      previousAvgOrderValue: 2752, // Calculated to give -5.2%
      totalCustomers: 658,
      previousCustomers: 650,
      conversionRate: "6.6",
      previousConversionRate: "5.4", // Calculated to give +1.2%
      returnCustomers: "6.6",
      previousReturnCustomers: "5.4"
    },
    topProducts: [
      { name: 'Begum Wing Chair - Monkies', revenue: 35238.35, units: 2, growth: "18.5" },
      { name: 'Marigold Steel Digital Print Bottle', revenue: 18814.5, units: 13, growth: "12.3" },
      { name: 'Quirky India Steel Sipper Bottle', revenue: 18309, units: 13, growth: "8.7" },
      { name: 'Travel Patches Tote Bag', revenue: 17578, units: 7, growth: "15.2" },
      { name: 'Olive Palm Quilted Crossbody Bag', revenue: 16987.25, units: 7, growth: "-3.4" }
    ],
    salesByCategory: [
      { category: 'Sippers & Bottles', revenue: 176500, percentage: 9.6 },
      { category: 'Tote Bags', revenue: 143414, percentage: 7.8 },
      { category: 'Fridge Magnets', revenue: 119511, percentage: 6.5 },
      { category: 'Mugs & Cups', revenue: 117633, percentage: 6.4 },
      { category: 'Crossbody Bags', revenue: 108480, percentage: 5.9 }
    ],
    paymentMethods: [
      { method: 'Credit Card', percentage: 45, transactions: 317 },
      { method: 'Debit Card', percentage: 30, transactions: 212 },
      { method: 'Cash', percentage: 15, transactions: 106 },
      { method: 'Mobile Pay', percentage: 8, transactions: 56 },
      { method: 'Gift Card', percentage: 2, transactions: 14 }
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
      currency: 'INR'
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

  // Helper function to get label from sales data item with type safety
  const getLabel = (item: SalesData, timeframe: 'daily' | 'weekly' | 'monthly' | 'quarterly'): string => {
    switch (timeframe) {
      case 'daily':
        return 'date' in item ? item.date : ''
      case 'weekly':
        return 'week' in item ? item.week : ''
      case 'monthly':
        return 'month' in item ? item.month : ''
      case 'quarterly':
        return 'quarter' in item ? item.quarter : ''
      default:
        return ''
    }
  }

  const currentStore = mockData.stores.find(store => store.id === selectedStore) || mockData.stores[0]

  const MetricCard = ({ 
    title, 
    value, 
    previousValue, 
    icon: Icon, 
    formatter = (val: number) => val.toLocaleString(),
    suffix = '',
    trend,
    isPercentage = false
  }: {
    title: string
    value: number | string
    previousValue?: number | string
    icon: any
    formatter?: (val: number) => string
    suffix?: string
    trend?: 'up' | 'down'
    isPercentage?: boolean
  }) => {
    const numValue = typeof value === 'string' ? parseFloat(value) : value
    const numPrevValue = typeof previousValue === 'string' ? parseFloat(previousValue as string) : previousValue
    const percentChange = numPrevValue ? calculatePercentageChange(numValue, numPrevValue) : null
    const isPositive = percentChange ? parseFloat(percentChange) > 0 : trend === 'up'
    
    return (
      <Card className="border-orange-100 dark:border-orange-900/30">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {typeof value === 'string' ? value + suffix : formatter(value)}{suffix}
          </div>
          {percentChange && (
            <div className={`text-xs flex items-center space-x-1 ${
              isPositive ? 'text-green-600' : 'text-red-600'
            }`}>
              {isPositive ? (
                <ArrowUpRight className="h-3 w-3" />
              ) : (
                <ArrowDownRight className="h-3 w-3" />
              )}
              <span>{isPositive ? '+' : ''}{percentChange}% from last period</span>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  const SalesChart = () => {
    const data = getCurrentSalesData()
    const maxRevenue = Math.max(...data.map(d => d.revenue))
    
    return (
      <Card className="col-span-2 border-orange-100 dark:border-orange-900/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4 text-orange-600" />
              <span>Sales Revenue Trends</span>
            </CardTitle>
            <div className="flex space-x-1">
              {(['daily', 'weekly', 'monthly', 'quarterly'] as const).map((timeframe) => (
                <Button
                  key={timeframe}
                  variant={selectedTimeframe === timeframe ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedTimeframe(timeframe)}
                  className={`text-xs ${
                    selectedTimeframe === timeframe 
                      ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                      : 'border-orange-200 text-orange-700 hover:bg-orange-50'
                  }`}
                >
                  {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-64 flex items-end space-x-1 bg-gradient-to-t from-orange-50/30 to-transparent rounded-lg p-4">
              {data.slice(-15).map((item, index) => {
                const height = (item.revenue / maxRevenue) * 100
                const label = getLabel(item, selectedTimeframe)
                return (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-gradient-to-t from-orange-600 to-orange-400 rounded-t-sm hover:from-orange-700 hover:to-orange-500 transition-colors cursor-pointer shadow-sm"
                      style={{ height: `${height}%` }}
                      title={`${label}: ${formatCurrency(item.revenue)}`}
                    />
                    <span className="text-xs text-muted-foreground mt-1 transform -rotate-45 origin-left">
                      {label}
                    </span>
                  </div>
                )
              })}
            </div>
            <div className="grid grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <div className="font-semibold">{formatCurrency(data[data.length - 1]?.revenue || 0)}</div>
                <div className="text-muted-foreground">Latest Revenue</div>
              </div>
              <div className="text-center">
                <div className="font-semibold">{data[data.length - 1]?.transactions || 0}</div>
                <div className="text-muted-foreground">Transactions</div>
              </div>
              <div className="text-center">
                <div className="font-semibold">{data[data.length - 1]?.customers || 0}</div>
                <div className="text-muted-foreground">Customers</div>
              </div>
              <div className="text-center">
                <div className="font-semibold">{formatCurrency(data[data.length - 1]?.avgOrderValue || 0)}</div>
                <div className="text-muted-foreground">Avg Order</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="flex flex-col h-full p-4 space-y-6 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <DollarSign className="h-5 w-5 text-orange-600" />
          <h2 className="text-xl font-semibold">Sales Data - {currentStore.name}</h2>
          <Badge variant="outline" className="border-orange-200 text-orange-700">This Month</Badge>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={selectedStore} onValueChange={setSelectedStore}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select store" />
            </SelectTrigger>
            <SelectContent>
              {mockData.stores.map((store) => (
                <SelectItem key={store.id} value={store.id}>
                  {store.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="text-sm text-muted-foreground">
            Updated: Feb 02, 2025
          </span>
          <Button
            onClick={refreshData}
            variant="outline"
            size="sm"
            className="h-8"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Revenue"
          value={mockData.currentMetrics.totalRevenue}
          previousValue={mockData.currentMetrics.previousRevenue}
          icon={DollarSign}
          formatter={formatCurrency}
        />
        <MetricCard
          title="Total Transactions"
          value={mockData.currentMetrics.totalTransactions}
          previousValue={mockData.currentMetrics.previousTransactions}
          icon={ShoppingCart}
        />
        <MetricCard
          title="Average Order Value"
          value={mockData.currentMetrics.avgOrderValue}
          previousValue={mockData.currentMetrics.previousAvgOrderValue}
          icon={Target}
          formatter={formatCurrency}
        />
        <MetricCard
          title="Return Customers"
          value={mockData.currentMetrics.returnCustomers}
          previousValue={mockData.currentMetrics.previousReturnCustomers}
          icon={Award}
          suffix="%"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SalesChart />
        
        {/* Top Products */}
        <Card className="border-orange-100 dark:border-orange-900/30">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Star className="h-4 w-4 text-orange-600" />
              <span>Top Selling Products</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockData.topProducts.map((product, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-muted-foreground">
                      #{index + 1}
                    </span>
                    <div>
                      <div className="text-sm font-medium">{product.name}</div>
                      <div className="text-xs text-muted-foreground">{product.units} units sold</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{formatCurrency(product.revenue)}</div>
                    <div className={`text-xs flex items-center ${
                      product.growth.startsWith('-') ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {product.growth.startsWith('-') ? (
                        <TrendingDown className="h-3 w-3 mr-1" />
                      ) : (
                        <TrendingUp className="h-3 w-3 mr-1" />
                      )}
                      {product.growth}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales by Category and Payment Methods */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales by Category */}
        <Card className="border-orange-100 dark:border-orange-900/30">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChart className="h-4 w-4 text-orange-600" />
              <span>Sales by Category</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockData.salesByCategory.map((category, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{category.category}</span>
                    <div className="text-right">
                      <div className="text-sm font-medium">{formatCurrency(category.revenue)}</div>
                      <div className="text-xs text-muted-foreground">{category.percentage}%</div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-orange-500 to-orange-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${category.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card className="border-orange-100 dark:border-orange-900/30">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CreditCard className="h-4 w-4 text-orange-600" />
              <span>Payment Methods Distribution</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockData.paymentMethods.map((method, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="text-lg font-bold text-orange-600">{method.percentage}%</div>
                    <div>
                      <div className="text-sm font-medium">{method.method}</div>
                      <div className="text-xs text-muted-foreground">{method.transactions} transactions</div>
                    </div>
                  </div>
                  <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full"
                      style={{ width: `${method.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Insights */}
      <Card className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950 dark:to-amber-950 border-orange-200 dark:border-orange-800">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-4 w-4 text-orange-600" />
            <span>Key Insights</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span>Revenue up 23.1% vs last period</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-blue-600" />
              <span>Strong performance across all categories</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="h-4 w-4 text-purple-600" />
              <span>Customer retention at 6.6%</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4 text-yellow-600" />
              <span>Top product: Begum Wing Chair</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-orange-200 dark:border-orange-800">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <div className="font-medium mb-2">34 returning customers driving repeat sales</div>
                <div className="text-muted-foreground">High-value furniture items driving revenue</div>
              </div>
              <div>
                <div className="font-medium mb-2">Sippers & Bottles leading category</div>
                <div className="text-muted-foreground">9.6% of total revenue from this category</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}