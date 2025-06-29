'use client'

import { DashboardFragmentSchema } from '@/lib/schema'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  ShoppingCart, 
  Package, 
  DollarSign,
  Calendar,
  RefreshCw
} from 'lucide-react'
import { useState, useEffect } from 'react'

export function FragmentDashboard({ fragment }: { fragment: DashboardFragmentSchema }) {
  const [mockData, setMockData] = useState(generateMockData())
  const [lastUpdated, setLastUpdated] = useState(new Date())

  function generateMockData() {
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
        { name: 'Premium Coffee Beans', sales: Math.floor(Math.random() * 200) + 50 },
        { name: 'Organic Milk', sales: Math.floor(Math.random() * 180) + 40 },
        { name: 'Fresh Bread', sales: Math.floor(Math.random() * 150) + 30 },
        { name: 'Energy Drinks', sales: Math.floor(Math.random() * 120) + 25 },
        { name: 'Snack Mix', sales: Math.floor(Math.random() * 100) + 20 }
      ]
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

  return (
    <div className="flex flex-col h-full p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <BarChart3 className="h-5 w-5 text-blue-600" />
          <h2 className="text-xl font-semibold">{fragment.store_name} - Dashboard</h2>
          <Badge variant="outline">{fragment.time_period}</Badge>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </span>
          <button
            onClick={refreshData}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
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

      {/* Detailed Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
        {/* Inventory Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Package className="h-4 w-4" />
              <span>Inventory Status</span>
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
          </CardContent>
        </Card>

        {/* Top Selling Products */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span>Top Selling Products</span>
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
                    <span className="text-sm">{product.name}</span>
                  </div>
                  <Badge variant="secondary">{product.sales} sold</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Metrics Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>Performance Summary - {fragment.time_period}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="space-y-1">
              <span className="font-medium">Revenue Metrics:</span>
              <ul className="text-muted-foreground space-y-0.5">
                {fragment.dashboard_metrics
                  .filter(metric => metric.toLowerCase().includes('revenue') || metric.toLowerCase().includes('sales'))
                  .map((metric, index) => (
                    <li key={index}>• {metric}</li>
                  ))}
              </ul>
            </div>
            <div className="space-y-1">
              <span className="font-medium">Customer Metrics:</span>
              <ul className="text-muted-foreground space-y-0.5">
                {fragment.dashboard_metrics
                  .filter(metric => metric.toLowerCase().includes('customer') || metric.toLowerCase().includes('traffic'))
                  .map((metric, index) => (
                    <li key={index}>• {metric}</li>
                  ))}
              </ul>
            </div>
            <div className="space-y-1">
              <span className="font-medium">Operational Metrics:</span>
              <ul className="text-muted-foreground space-y-0.5">
                {fragment.dashboard_metrics
                  .filter(metric => 
                    metric.toLowerCase().includes('inventory') || 
                    metric.toLowerCase().includes('staff') ||
                    metric.toLowerCase().includes('product')
                  )
                  .map((metric, index) => (
                    <li key={index}>• {metric}</li>
                  ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}