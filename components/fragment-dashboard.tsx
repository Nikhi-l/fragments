'use client'

import { DashboardFragmentSchema } from '@/lib/schema'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
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
  TrendingDown
} from 'lucide-react'
import { useState, useEffect } from 'react'

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

// Union type for chart data
type SalesData = DailySalesData | WeeklySalesData | MonthlySalesData

// Define the mock data interface with proper typing
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
  topProducts: Array<{
    name: string
    sales: number
    revenue: number
  }>
  employees: Array<{
    name: string
    role: string
    status: 'present' | 'break' | 'absent'
    shift: string
    performance: number
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
  }>
  customerSatisfaction: {
    rating: number
    reviews: number
    complaints: number
    compliments: number
  }
}

export function FragmentDashboard({ fragment }: { fragment: DashboardFragmentSchema }) {
  const [mockData, setMockData] = useState<MockDashboardData>(generateMockData())
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [selectedTimeframe, setSelectedTimeframe] = useState<'daily' | 'weekly' | 'monthly'>('daily')

  function generateMockData(): MockDashboardData {
    // Generate daily sales data for the last 30 days
    const dailySales: DailySalesData[] = Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      sales: Math.floor(Math.random() * 5000) + 1000,
      customers: Math.floor(Math.random() * 200) + 50,
      transactions: Math.floor(Math.random() * 150) + 30
    }))

    // Generate weekly sales data for the last 12 weeks
    const weeklySales: WeeklySalesData[] = Array.from({ length: 12 }, (_, i) => ({
      week: `Week ${i + 1}`,
      sales: Math.floor(Math.random() * 30000) + 10000,
      customers: Math.floor(Math.random() * 1200) + 400,
      transactions: Math.floor(Math.random() * 800) + 200
    }))

    // Generate monthly sales data for the last 12 months
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
        trend: Math.random() > 0.5 ? 'up' : 'down'
      },
      customerTraffic: {
        current: Math.floor(Math.random() * 500) + 100,
        previous: Math.floor(Math.random() * 450) + 80,
        trend: Math.random() > 0.5 ? 'up' : 'down'
      },
      inventoryLevels: {
        inStock: Math.floor(Math.random() * 1000) + 500,
        lowStock: Math.floor(Math.random() * 50) + 10,
        outOfStock: Math.floor(Math.random() * 20) + 5
      },
      avgTransactionValue: {
        current: Math.floor(Math.random() * 100) + 25,
        previous: Math.floor(Math.random() * 95) + 20,
        trend: Math.random() > 0.5 ? 'up' : 'down'
      },
      topProducts: [
        { name: 'Premium Coffee Beans', sales: Math.floor(Math.random() * 200) + 50, revenue: Math.floor(Math.random() * 5000) + 1000 },
        { name: 'Organic Milk', sales: Math.floor(Math.random() * 180) + 40, revenue: Math.floor(Math.random() * 3000) + 800 },
        { name: 'Fresh Bread', sales: Math.floor(Math.random() * 150) + 30, revenue: Math.floor(Math.random() * 2000) + 600 },
        { name: 'Energy Drinks', sales: Math.floor(Math.random() * 120) + 25, revenue: Math.floor(Math.random() * 4000) + 900 },
        { name: 'Snack Mix', sales: Math.floor(Math.random() * 100) + 20, revenue: Math.floor(Math.random() * 1500) + 400 }
      ],
      employees: [
        { name: 'Sarah Johnson', role: 'Store Manager', status: 'present', shift: '9:00 AM - 6:00 PM', performance: 95 },
        { name: 'Mike Chen', role: 'Cashier', status: 'present', shift: '10:00 AM - 7:00 PM', performance: 88 },
        { name: 'Emily Davis', role: 'Sales Associate', status: 'present', shift: '8:00 AM - 5:00 PM', performance: 92 },
        { name: 'James Wilson', role: 'Stock Clerk', status: 'break', shift: '7:00 AM - 4:00 PM', performance: 85 },
        { name: 'Lisa Brown', role: 'Cashier', status: 'absent', shift: '2:00 PM - 11:00 PM', performance: 78 },
        { name: 'David Lee', role: 'Security', status: 'present', shift: '6:00 AM - 3:00 PM', performance: 90 }
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
        { hour: '8:00 AM', customers: 45, sales: 1200 },
        { hour: '12:00 PM', customers: 120, sales: 3200 },
        { hour: '5:00 PM', customers: 95, sales: 2800 },
        { hour: '7:00 PM', customers: 75, sales: 2100 }
      ],
      customerSatisfaction: {
        rating: 4.3,
        reviews: 156,
        complaints: 8,
        compliments: 42
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
      currency: 'USD'
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

  // Helper function to get label from sales data item with type safety
  const getLabel = (item: SalesData, timeframe: 'daily' | 'weekly' | 'monthly'): string => {
    switch (timeframe) {
      case 'daily':
        return 'date' in item ? item.date : ''
      case 'weekly':
        return 'week' in item ? item.week : ''
      case 'monthly':
        return 'month' in item ? item.month : ''
      default:
        return ''
    }
  }

  const MetricCard = ({ 
    title, 
    value, 
    previousValue, 
    trend, 
    icon: Icon, 
    formatter = (val: number) => val.toLocaleString() 
  }: {
    title: string
    value: number
    previousValue?: number
    trend?: 'up' | 'down'
    icon: any
    formatter?: (val: number) => string
  }) => {
    const percentChange = previousValue ? calculatePercentageChange(value, previousValue) : null
    
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatter(value)}</div>
          {percentChange && (
            <div className={`text-xs flex items-center space-x-1 ${
              trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              <TrendingUp className={`h-3 w-3 ${trend === 'down' ? 'rotate-180' : ''}`} />
              <span>{Math.abs(Number(percentChange))}% from last period</span>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  const SalesChart = () => {
    const data = getCurrentSalesData()
    const maxSales = Math.max(...data.map(d => d.sales))
    
    return (
      <Card className="col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Sales Trends</span>
            </CardTitle>
            <div className="flex space-x-1">
              {(['daily', 'weekly', 'monthly'] as const).map((timeframe) => (
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
                const height = (item.sales / maxSales) * 100
                const label = getLabel(item, selectedTimeframe)
                return (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-blue-500 rounded-t-sm hover:bg-blue-600 transition-colors cursor-pointer"
                      style={{ height: `${height}%` }}
                      title={`${label}: ${formatCurrency(item.sales)}`}
                    />
                    <span className="text-xs text-muted-foreground mt-1 transform -rotate-45 origin-left">
                      {label}
                    </span>
                  </div>
                )
              })}
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="font-semibold">{formatCurrency(data[data.length - 1]?.sales || 0)}</div>
                <div className="text-muted-foreground">Latest Sales</div>
              </div>
              <div className="text-center">
                <div className="font-semibold">{data[data.length - 1]?.customers || 0}</div>
                <div className="text-muted-foreground">Customers</div>
              </div>
              <div className="text-center">
                <div className="font-semibold">{data[data.length - 1]?.transactions || 0}</div>
                <div className="text-muted-foreground">Transactions</div>
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
          <BarChart3 className="h-5 w-5 text-blue-600" />
          <h2 className="text-xl font-semibold">{fragment.store_name} - Analytics Dashboard</h2>
          <Badge variant="outline">{fragment.time_period}</Badge>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            Last updated: {lastUpdated.toLocaleTimeString()}
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
          title="Sales Revenue"
          value={mockData.salesRevenue.current}
          previousValue={mockData.salesRevenue.previous}
          trend={mockData.salesRevenue.trend}
          icon={DollarSign}
          formatter={formatCurrency}
        />
        <MetricCard
          title="Customer Traffic"
          value={mockData.customerTraffic.current}
          previousValue={mockData.customerTraffic.previous}
          trend={mockData.customerTraffic.trend}
          icon={Users}
        />
        <MetricCard
          title="Avg Transaction"
          value={mockData.avgTransactionValue.current}
          previousValue={mockData.avgTransactionValue.previous}
          trend={mockData.avgTransactionValue.trend}
          icon={ShoppingCart}
          formatter={formatCurrency}
        />
        <MetricCard
          title="Items in Stock"
          value={mockData.inventoryLevels.inStock}
          icon={Package}
        />
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SalesChart />
        
        {/* Peak Hours */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>Peak Hours</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockData.peakHours.map((hour, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-sm">{hour.hour}</div>
                    <div className="text-xs text-muted-foreground">{hour.customers} customers</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-sm">{formatCurrency(hour.sales)}</div>
                    <div className="text-xs text-muted-foreground">sales</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Employee Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <UserCheck className="h-4 w-4" />
            <span>Staff Status & Performance</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockData.employees.map((employee, index) => (
              <div key={index} className="border rounded-lg p-3 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium">{employee.name}</div>
                    <div className="text-sm text-muted-foreground">{employee.role}</div>
                  </div>
                  <Badge 
                    variant={
                      employee.status === 'present' ? 'default' : 
                      employee.status === 'break' ? 'secondary' : 'destructive'
                    }
                    className="text-xs"
                  >
                    {employee.status}
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground">
                  Shift: {employee.shift}
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs">Performance:</span>
                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        employee.performance >= 90 ? 'bg-green-500' :
                        employee.performance >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${employee.performance}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium">{employee.performance}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Store Performance Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-4 w-4" />
            <span>Store Performance Comparison</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockData.storeComparison.map((store, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    store.status === 'excellent' ? 'bg-green-500' :
                    store.status === 'good' ? 'bg-yellow-500' : 'bg-red-500'
                  }`} />
                  <div>
                    <div className="font-medium">{store.name}</div>
                    <div className="text-sm text-muted-foreground">{store.customers} customers</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{formatCurrency(store.revenue)}</div>
                  <div className={`text-sm flex items-center space-x-1 ${
                    store.growth >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {store.growth >= 0 ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    <span>{Math.abs(store.growth)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Additional Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span>Top Products</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockData.topProducts.map((product, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-muted-foreground">
                      #{index + 1}
                    </span>
                    <div>
                      <div className="text-sm font-medium">{product.name}</div>
                      <div className="text-xs text-muted-foreground">{product.sales} units</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{formatCurrency(product.revenue)}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Customer Satisfaction */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Star className="h-4 w-4" />
              <span>Customer Satisfaction</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold">{mockData.customerSatisfaction.rating}</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
              <div className="flex justify-center mt-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${
                      i < Math.floor(mockData.customerSatisfaction.rating) 
                        ? 'text-yellow-500 fill-current' 
                        : 'text-gray-300'
                    }`} 
                  />
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Total Reviews</span>
                <span className="text-sm font-medium">{mockData.customerSatisfaction.reviews}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Compliments</span>
                <span className="text-sm font-medium text-green-600">{mockData.customerSatisfaction.compliments}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Complaints</span>
                <span className="text-sm font-medium text-red-600">{mockData.customerSatisfaction.complaints}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Inventory Alert */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4" />
              <span>Inventory Alerts</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">In Stock</span>
              <Badge variant="outline" className="text-green-600 border-green-600">
                {mockData.inventoryLevels.inStock} items
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Low Stock</span>
              <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                {mockData.inventoryLevels.lowStock} items
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Out of Stock</span>
              <Badge variant="outline" className="text-red-600 border-red-600">
                {mockData.inventoryLevels.outOfStock} items
              </Badge>
            </div>
            <div className="pt-2 border-t">
              <div className="text-xs text-muted-foreground">
                Reorder alerts for {mockData.inventoryLevels.lowStock + mockData.inventoryLevels.outOfStock} items
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}