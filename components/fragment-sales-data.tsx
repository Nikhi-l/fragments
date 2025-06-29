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

export function FragmentSalesData({ fragment }: { fragment: SalesDataFragmentSchema }) {
  const [mockData, setMockData] = useState(generateMockSalesData())
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [selectedTimeframe, setSelectedTimeframe] = useState<'daily' | 'weekly' | 'monthly' | 'quarterly'>('daily')
  const [selectedStore, setSelectedStore] = useState('main')

  function generateMockSalesData() {
    const stores = [
      { id: 'main', name: fragment.store_name || 'Main Store' },
      { id: 'downtown', name: 'Downtown Branch' },
      { id: 'mall', name: 'Mall Location' },
      { id: 'suburban', name: 'Suburban Store' }
    ]

    // Generate sales data for different time periods
    const dailySales = Array.from({ length: 30 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - (29 - i))
      return {
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        revenue: Math.floor(Math.random() * 8000) + 2000,
        transactions: Math.floor(Math.random() * 150) + 50,
        customers: Math.floor(Math.random() * 200) + 80,
        avgOrderValue: Math.floor(Math.random() * 80) + 30
      }
    })

    const weeklySales = Array.from({ length: 12 }, (_, i) => ({
      week: `Week ${i + 1}`,
      revenue: Math.floor(Math.random() * 45000) + 15000,
      transactions: Math.floor(Math.random() * 800) + 300,
      customers: Math.floor(Math.random() * 1200) + 500,
      avgOrderValue: Math.floor(Math.random() * 90) + 40
    }))

    const monthlySales = Array.from({ length: 12 }, (_, i) => {
      const date = new Date()
      date.setMonth(date.getMonth() - (11 - i))
      return {
        month: date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
        revenue: Math.floor(Math.random() * 180000) + 60000,
        transactions: Math.floor(Math.random() * 3500) + 1200,
        customers: Math.floor(Math.random() * 5000) + 2000,
        avgOrderValue: Math.floor(Math.random() * 100) + 45
      }
    })

    const quarterlySales = Array.from({ length: 8 }, (_, i) => ({
      quarter: `Q${(i % 4) + 1} '${24 - Math.floor(i / 4)}`,
      revenue: Math.floor(Math.random() * 500000) + 200000,
      transactions: Math.floor(Math.random() * 10000) + 4000,
      customers: Math.floor(Math.random() * 15000) + 6000,
      avgOrderValue: Math.floor(Math.random() * 120) + 50
    }))

    return {
      stores,
      currentMetrics: {
        totalRevenue: Math.floor(Math.random() * 85000) + 25000,
        previousRevenue: Math.floor(Math.random() * 80000) + 20000,
        totalTransactions: Math.floor(Math.random() * 1500) + 500,
        previousTransactions: Math.floor(Math.random() * 1400) + 450,
        avgOrderValue: Math.floor(Math.random() * 90) + 45,
        previousAvgOrderValue: Math.floor(Math.random() * 85) + 40,
        totalCustomers: Math.floor(Math.random() * 2000) + 800,
        previousCustomers: Math.floor(Math.random() * 1900) + 750,
        conversionRate: (Math.random() * 15 + 10).toFixed(1),
        previousConversionRate: (Math.random() * 14 + 9).toFixed(1),
        returnCustomers: (Math.random() * 40 + 30).toFixed(1),
        previousReturnCustomers: (Math.random() * 38 + 28).toFixed(1)
      },
      topProducts: [
        { name: 'Premium Coffee Beans', revenue: Math.floor(Math.random() * 8000) + 2000, units: Math.floor(Math.random() * 300) + 100, growth: (Math.random() * 30 + 5).toFixed(1) },
        { name: 'Organic Milk', revenue: Math.floor(Math.random() * 6000) + 1500, units: Math.floor(Math.random() * 250) + 80, growth: (Math.random() * 25 + 3).toFixed(1) },
        { name: 'Fresh Bread', revenue: Math.floor(Math.random() * 4000) + 1000, units: Math.floor(Math.random() * 200) + 60, growth: (Math.random() * 20 + 2).toFixed(1) },
        { name: 'Energy Drinks', revenue: Math.floor(Math.random() * 7000) + 1800, units: Math.floor(Math.random() * 180) + 50, growth: (Math.random() * 35 + 8).toFixed(1) },
        { name: 'Snack Mix', revenue: Math.floor(Math.random() * 3000) + 800, units: Math.floor(Math.random() * 150) + 40, growth: (Math.random() * 15 + 1).toFixed(1) }
      ],
      salesByCategory: [
        { category: 'Food & Beverages', revenue: Math.floor(Math.random() * 25000) + 10000, percentage: 35 },
        { category: 'Electronics', revenue: Math.floor(Math.random() * 20000) + 8000, percentage: 28 },
        { category: 'Clothing', revenue: Math.floor(Math.random() * 15000) + 6000, percentage: 20 },
        { category: 'Home & Garden', revenue: Math.floor(Math.random() * 8000) + 3000, percentage: 12 },
        { category: 'Health & Beauty', revenue: Math.floor(Math.random() * 5000) + 2000, percentage: 5 }
      ],
      paymentMethods: [
        { method: 'Credit Card', percentage: 45, transactions: Math.floor(Math.random() * 600) + 200 },
        { method: 'Debit Card', percentage: 30, transactions: Math.floor(Math.random() * 400) + 150 },
        { method: 'Cash', percentage: 15, transactions: Math.floor(Math.random() * 200) + 75 },
        { method: 'Mobile Pay', percentage: 8, transactions: Math.floor(Math.random() * 100) + 40 },
        { method: 'Gift Card', percentage: 2, transactions: Math.floor(Math.random() * 30) + 10 }
      ],
      hourlyTrends: Array.from({ length: 24 }, (_, hour) => ({
        hour: `${hour.toString().padStart(2, '0')}:00`,
        revenue: Math.floor(Math.random() * 2000) + (hour >= 9 && hour <= 21 ? 500 : 100),
        transactions: Math.floor(Math.random() * 50) + (hour >= 9 && hour <= 21 ? 20 : 5)
      })),
      dailySales,
      weeklySales,
      monthlySales,
      quarterlySales
    }
  }

  function refreshData() {
    setMockData(generateMockSalesData())
    setLastUpdated(new Date())
  }

  function formatCurrency(amount: number) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  function calculatePercentageChange(current: number, previous: number) {
    return ((current - previous) / previous * 100).toFixed(1)
  }

  const getCurrentSalesData = () => {
    switch (selectedTimeframe) {
      case 'weekly': return mockData.weeklySales
      case 'monthly': return mockData.monthlySales
      case 'quarterly': return mockData.quarterlySales
      default: return mockData.dailySales
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
    trend
  }: {
    title: string
    value: number | string
    previousValue?: number | string
    icon: any
    formatter?: (val: number) => string
    suffix?: string
    trend?: 'up' | 'down'
  }) => {
    const numValue = typeof value === 'string' ? parseFloat(value) : value
    const numPrevValue = typeof previousValue === 'string' ? parseFloat(previousValue as string) : previousValue
    const percentChange = numPrevValue ? calculatePercentageChange(numValue, numPrevValue) : null
    const isPositive = percentChange ? parseFloat(percentChange) > 0 : trend === 'up'
    
    return (
      <Card>
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
              <span>{Math.abs(Number(percentChange))}% from last period</span>
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
      <Card className="col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Sales Revenue Trends</span>
            </CardTitle>
            <div className="flex space-x-1">
              {(['daily', 'weekly', 'monthly', 'quarterly'] as const).map((timeframe) => (
                <Button
                  key={timeframe}
                  variant={selectedTimeframe === timeframe ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedTimeframe(timeframe)}
                  className="text-xs"
                >
                  {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-64 flex items-end space-x-1">
              {data.slice(-15).map((item, index) => {
                const height = (item.revenue / maxRevenue) * 100
                const label = selectedTimeframe === 'daily' ? item.date : 
                             selectedTimeframe === 'weekly' ? item.week : 
                             selectedTimeframe === 'monthly' ? item.month :
                             item.quarter
                return (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-sm hover:from-blue-700 hover:to-blue-500 transition-colors cursor-pointer"
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
          <DollarSign className="h-5 w-5 text-green-600" />
          <h2 className="text-xl font-semibold">Sales Data - {currentStore.name}</h2>
          <Badge variant="outline">{fragment.time_period}</Badge>
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
            Updated: {lastUpdated.toLocaleTimeString()}
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
          title="Total Customers"
          value={mockData.currentMetrics.totalCustomers}
          previousValue={mockData.currentMetrics.previousCustomers}
          icon={Users}
        />
        <MetricCard
          title="Conversion Rate"
          value={mockData.currentMetrics.conversionRate}
          previousValue={mockData.currentMetrics.previousConversionRate}
          icon={Percent}
          suffix="%"
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
        
        {/* Hourly Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>Hourly Trends</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {mockData.hourlyTrends.filter((_, index) => index % 2 === 0).map((hour, index) => (
                <div key={index} className="flex justify-between items-center text-sm">
                  <span className="font-medium">{hour.hour}</span>
                  <div className="text-right">
                    <div className="font-medium">{formatCurrency(hour.revenue)}</div>
                    <div className="text-xs text-muted-foreground">{hour.transactions} transactions</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Products and Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Star className="h-4 w-4" />
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
                    <div className="text-xs text-green-600 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +{product.growth}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sales by Category */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChart className="h-4 w-4" />
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
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${category.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CreditCard className="h-4 w-4" />
            <span>Payment Methods Distribution</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {mockData.paymentMethods.map((method, index) => (
              <div key={index} className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold">{method.percentage}%</div>
                <div className="text-sm font-medium">{method.method}</div>
                <div className="text-xs text-muted-foreground">{method.transactions} transactions</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Summary Insights */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-4 w-4" />
            <span>Key Insights</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span>Revenue up {calculatePercentageChange(mockData.currentMetrics.totalRevenue, mockData.currentMetrics.previousRevenue)}% vs last period</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-blue-600" />
              <span>Customer retention at {mockData.currentMetrics.returnCustomers}%</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4 text-yellow-600" />
              <span>Top product: {mockData.topProducts[0].name}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}