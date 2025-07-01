'use client'

import { CostAnalyticsFragmentSchema } from '@/lib/schema'
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
  BarChart3, 
  PieChart,
  RefreshCw,
  Users,
  Zap,
  Home,
  Package,
  Megaphone,
  Truck,
  Calculator,
  Target,
  AlertTriangle,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Building,
  CreditCard,
  Receipt,
  Activity,
  Percent
} from 'lucide-react'
import { useState, useEffect } from 'react'

interface CostCategory {
  id: string
  name: string
  currentCost: number
  previousCost: number
  budgetAllocated: number
  percentage: number
  trend: 'up' | 'down' | 'stable'
  subcategories: SubCategory[]
  icon: any
  color: string
}

interface SubCategory {
  name: string
  cost: number
  percentage: number
}

interface Store {
  id: string
  name: string
  totalCosts: number
  profitMargin: number
  efficiency: number
  costPerSqFt: number
  costPerEmployee: number
}

export function FragmentCostAnalytics({ fragment }: { fragment: CostAnalyticsFragmentSchema }) {
  const [costData, setCostData] = useState(generateMockCostData())
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [selectedTimeframe, setSelectedTimeframe] = useState<'monthly' | 'quarterly' | 'yearly'>('monthly')
  const [selectedStore, setSelectedStore] = useState('main')
  const [comparisonStore, setComparisonStore] = useState('downtown')

  function generateMockCostData() {
    const stores: Store[] = [
      { 
        id: 'main', 
        name: fragment.store_name || 'Main Store', 
        totalCosts: 125000, 
        profitMargin: 18.5, 
        efficiency: 87,
        costPerSqFt: 50,
        costPerEmployee: 10416
      },
      { 
        id: 'downtown', 
        name: 'Downtown Branch', 
        totalCosts: 98000, 
        profitMargin: 22.1, 
        efficiency: 92,
        costPerSqFt: 45,
        costPerEmployee: 8166
      },
      { 
        id: 'mall', 
        name: 'Mall Location', 
        totalCosts: 145000, 
        profitMargin: 15.8, 
        efficiency: 83,
        costPerSqFt: 58,
        costPerEmployee: 12083
      },
      { 
        id: 'suburban', 
        name: 'Suburban Store', 
        totalCosts: 89000, 
        profitMargin: 25.3, 
        efficiency: 95,
        costPerSqFt: 35,
        costPerEmployee: 7416
      }
    ]

    const costCategories: CostCategory[] = [
      {
        id: 'staff',
        name: 'Staff Costs',
        currentCost: 45000,
        previousCost: 42000,
        budgetAllocated: 48000,
        percentage: 36,
        trend: 'up',
        icon: Users,
        color: 'text-blue-600',
        subcategories: [
          { name: 'Salaries', cost: 35000, percentage: 77.8 },
          { name: 'Benefits', cost: 6000, percentage: 13.3 },
          { name: 'Training', cost: 2500, percentage: 5.6 },
          { name: 'Overtime', cost: 1500, percentage: 3.3 }
        ]
      },
      {
        id: 'utilities',
        name: 'Utilities',
        currentCost: 18000,
        previousCost: 19500,
        budgetAllocated: 20000,
        percentage: 14.4,
        trend: 'down',
        icon: Zap,
        color: 'text-yellow-600',
        subcategories: [
          { name: 'Electricity', cost: 12000, percentage: 66.7 },
          { name: 'Water', cost: 3000, percentage: 16.7 },
          { name: 'Gas', cost: 2000, percentage: 11.1 },
          { name: 'Internet/Phone', cost: 1000, percentage: 5.6 }
        ]
      },
      {
        id: 'rent',
        name: 'Rent & Facilities',
        currentCost: 25000,
        previousCost: 25000,
        budgetAllocated: 25000,
        percentage: 20,
        trend: 'stable',
        icon: Home,
        color: 'text-green-600',
        subcategories: [
          { name: 'Base Rent', cost: 20000, percentage: 80 },
          { name: 'Maintenance', cost: 3000, percentage: 12 },
          { name: 'Insurance', cost: 1500, percentage: 6 },
          { name: 'Security', cost: 500, percentage: 2 }
        ]
      },
      {
        id: 'inventory',
        name: 'Inventory Costs',
        currentCost: 22000,
        previousCost: 20000,
        budgetAllocated: 24000,
        percentage: 17.6,
        trend: 'up',
        icon: Package,
        color: 'text-purple-600',
        subcategories: [
          { name: 'Cost of Goods', cost: 18000, percentage: 81.8 },
          { name: 'Storage', cost: 2000, percentage: 9.1 },
          { name: 'Shrinkage', cost: 1500, percentage: 6.8 },
          { name: 'Handling', cost: 500, percentage: 2.3 }
        ]
      },
      {
        id: 'marketing',
        name: 'Marketing',
        currentCost: 8000,
        previousCost: 7500,
        budgetAllocated: 10000,
        percentage: 6.4,
        trend: 'up',
        icon: Megaphone,
        color: 'text-orange-600',
        subcategories: [
          { name: 'Digital Ads', cost: 4500, percentage: 56.3 },
          { name: 'Print Materials', cost: 1500, percentage: 18.8 },
          { name: 'Events', cost: 1200, percentage: 15 },
          { name: 'Promotions', cost: 800, percentage: 10 }
        ]
      },
      {
        id: 'logistics',
        name: 'Logistics',
        currentCost: 7000,
        previousCost: 6800,
        budgetAllocated: 8000,
        percentage: 5.6,
        trend: 'up',
        icon: Truck,
        color: 'text-indigo-600',
        subcategories: [
          { name: 'Delivery', cost: 4000, percentage: 57.1 },
          { name: 'Fuel', cost: 2000, percentage: 28.6 },
          { name: 'Vehicle Maintenance', cost: 800, percentage: 11.4 },
          { name: 'Packaging', cost: 200, percentage: 2.9 }
        ]
      }
    ]

    const totalCosts = costCategories.reduce((sum, cat) => sum + cat.currentCost, 0)
    const totalBudget = costCategories.reduce((sum, cat) => sum + cat.budgetAllocated, 0)

    return {
      stores,
      costCategories,
      summary: {
        totalCosts,
        totalBudget,
        budgetVariance: ((totalCosts - totalBudget) / totalBudget * 100),
        costPerSqFt: totalCosts / 2500, // Assuming 2500 sq ft store
        costPerEmployee: totalCosts / 12, // Assuming 12 employees
        monthlyTrend: 5.2, // 5.2% increase from last month
        yearlyTrend: -2.8 // 2.8% decrease from last year
      },
      monthlyData: Array.from({ length: 12 }, (_, i) => {
        const month = new Date()
        month.setMonth(month.getMonth() - (11 - i))
        return {
          month: month.toLocaleDateString('en-US', { month: 'short' }),
          totalCosts: Math.floor(Math.random() * 20000) + 115000,
          staffCosts: Math.floor(Math.random() * 8000) + 40000,
          utilities: Math.floor(Math.random() * 5000) + 15000,
          rent: 25000,
          inventory: Math.floor(Math.random() * 5000) + 18000,
          marketing: Math.floor(Math.random() * 3000) + 6000,
          logistics: Math.floor(Math.random() * 2000) + 6000
        }
      })
    }
  }

  function refreshData() {
    setCostData(generateMockCostData())
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

  const currentStore = costData.stores.find(store => store.id === selectedStore) || costData.stores[0]
  const comparisonStoreData = costData.stores.find(store => store.id === comparisonStore) || costData.stores[1]

  const MetricCard = ({ 
    title, 
    value, 
    previousValue, 
    icon: Icon, 
    formatter = (val: number) => val.toLocaleString(),
    suffix = '',
    color = 'text-orange-600'
  }: {
    title: string
    value: number | string
    previousValue?: number
    icon: any
    formatter?: (val: number) => string
    suffix?: string
    color?: string
  }) => {
    const numValue = typeof value === 'string' ? parseFloat(value) : value
    const percentChange = previousValue ? calculatePercentageChange(numValue, previousValue) : null
    const isPositive = percentChange ? parseFloat(percentChange) > 0 : false
    
    return (
      <Card className="border-orange-100 dark:border-orange-900/30">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <Icon className={`h-4 w-4 ${color}`} />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {typeof value === 'string' ? value + suffix : formatter(value)}{suffix}
          </div>
          {percentChange && (
            <div className={`text-xs flex items-center space-x-1 ${
              isPositive ? 'text-red-600' : 'text-green-600'
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

  const CostChart = () => {
    const data = costData.monthlyData
    const maxCost = Math.max(...data.map(d => d.totalCosts))
    
    return (
      <Card className="col-span-2 border-orange-100 dark:border-orange-900/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4 text-orange-600" />
              <span>Monthly Cost Trends</span>
            </CardTitle>
            <div className="flex space-x-1">
              {(['monthly', 'quarterly', 'yearly'] as const).map((timeframe) => (
                <Button
                  key={timeframe}
                  variant={selectedTimeframe === timeframe ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedTimeframe(timeframe)}
                  className={`text-xs ${
                    selectedTimeframe === timeframe 
                      ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                      : 'border-orange-200 text-orange-700 hover:bg-orange-50 dark:border-orange-800 dark:text-orange-300 dark:hover:bg-orange-950/30'
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
            <div className="h-64 flex items-end space-x-1 bg-gradient-to-t from-orange-50/30 to-transparent dark:from-orange-950/30 rounded-lg p-4">
              {data.slice(-12).map((item, index) => {
                const height = (item.totalCosts / maxCost) * 100
                return (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-gradient-to-t from-orange-600 to-orange-400 rounded-t-sm hover:from-orange-700 hover:to-orange-500 transition-colors cursor-pointer shadow-sm"
                      style={{ height: `${height}%` }}
                      title={`${item.month}: ${formatCurrency(item.totalCosts)}`}
                    />
                    <span className="text-xs text-muted-foreground mt-1 transform -rotate-45 origin-left">
                      {item.month}
                    </span>
                  </div>
                )
              })}
            </div>
            <div className="grid grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <div className="font-semibold">{formatCurrency(data[data.length - 1]?.totalCosts || 0)}</div>
                <div className="text-muted-foreground">Latest Total</div>
              </div>
              <div className="text-center">
                <div className="font-semibold">{formatCurrency(costData.summary.costPerEmployee)}</div>
                <div className="text-muted-foreground">Per Employee</div>
              </div>
              <div className="text-center">
                <div className="font-semibold">{formatCurrency(costData.summary.costPerSqFt)}</div>
                <div className="text-muted-foreground">Per Sq Ft</div>
              </div>
              <div className="text-center">
                <div className="font-semibold">{costData.summary.budgetVariance > 0 ? '+' : ''}{costData.summary.budgetVariance.toFixed(1)}%</div>
                <div className="text-muted-foreground">Budget Variance</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="flex flex-col h-full p-4 space-y-6 overflow-y-auto bg-background">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Calculator className="h-5 w-5 text-orange-600" />
          <h2 className="text-xl font-semibold">Cost Analytics - {currentStore.name}</h2>
          <Badge variant="outline" className="border-orange-200 text-orange-700 dark:border-orange-800 dark:text-orange-300">{fragment.time_period}</Badge>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={selectedStore} onValueChange={setSelectedStore}>
            <SelectTrigger className="w-48 border-orange-200 dark:border-orange-800">
              <SelectValue placeholder="Select store" />
            </SelectTrigger>
            <SelectContent>
              {costData.stores.map((store) => (
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
          title="Total Monthly Costs"
          value={costData.summary.totalCosts}
          icon={DollarSign}
          formatter={formatCurrency}
        />
        <MetricCard
          title="Budget Allocated"
          value={costData.summary.totalBudget}
          icon={Target}
          formatter={formatCurrency}
          color="text-blue-600"
        />
        <MetricCard
          title="Cost Per Employee"
          value={costData.summary.costPerEmployee}
          icon={Users}
          formatter={formatCurrency}
          color="text-green-600"
        />
        <MetricCard
          title="Efficiency Score"
          value={currentStore.efficiency}
          icon={TrendingUp}
          suffix="%"
          color="text-purple-600"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <CostChart />
        
        {/* Cost Breakdown Pie Chart */}
        <Card className="border-orange-100 dark:border-orange-900/30">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChart className="h-4 w-4 text-orange-600" />
              <span>Cost Breakdown</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {costData.costCategories.map((category, index) => (
                <div key={category.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <category.icon className={`h-4 w-4 ${category.color}`} />
                      <span className="text-sm font-medium">{category.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{formatCurrency(category.currentCost)}</div>
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
      </div>

      {/* Store Comparison */}
      <Card className="border-orange-100 dark:border-orange-900/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Building className="h-4 w-4 text-orange-600" />
              <span>Store Comparison</span>
            </CardTitle>
            <Select value={comparisonStore} onValueChange={setComparisonStore}>
              <SelectTrigger className="w-48 border-orange-200 dark:border-orange-800">
                <SelectValue placeholder="Compare with" />
              </SelectTrigger>
              <SelectContent>
                {costData.stores.filter(store => store.id !== selectedStore).map((store) => (
                  <SelectItem key={store.id} value={store.id}>
                    {store.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Current Store */}
            <div className="p-4 border rounded-lg border-orange-500 bg-orange-50 dark:bg-orange-950/30 dark:border-orange-800">
              <div className="text-center">
                <div className="font-medium text-lg mb-4">{currentStore.name}</div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-2xl font-bold text-orange-600">{formatCurrency(currentStore.totalCosts)}</div>
                    <div className="text-muted-foreground">Total Costs</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">{currentStore.profitMargin}%</div>
                    <div className="text-muted-foreground">Profit Margin</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-blue-600">{formatCurrency(currentStore.costPerSqFt)}</div>
                    <div className="text-muted-foreground">Cost per Sq Ft</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-purple-600">{currentStore.efficiency}%</div>
                    <div className="text-muted-foreground">Efficiency</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Comparison Store */}
            <div className="p-4 border rounded-lg border-gray-300 dark:border-gray-700">
              <div className="text-center">
                <div className="font-medium text-lg mb-4">{comparisonStoreData.name}</div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-2xl font-bold text-orange-600">{formatCurrency(comparisonStoreData.totalCosts)}</div>
                    <div className="text-muted-foreground">Total Costs</div>
                    <div className={`text-xs ${
                      comparisonStoreData.totalCosts < currentStore.totalCosts ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {comparisonStoreData.totalCosts < currentStore.totalCosts ? 'Lower' : 'Higher'} by {formatCurrency(Math.abs(comparisonStoreData.totalCosts - currentStore.totalCosts))}
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">{comparisonStoreData.profitMargin}%</div>
                    <div className="text-muted-foreground">Profit Margin</div>
                    <div className={`text-xs ${
                      comparisonStoreData.profitMargin > currentStore.profitMargin ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {comparisonStoreData.profitMargin > currentStore.profitMargin ? 'Higher' : 'Lower'} by {Math.abs(comparisonStoreData.profitMargin - currentStore.profitMargin).toFixed(1)}%
                    </div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-blue-600">{formatCurrency(comparisonStoreData.costPerSqFt)}</div>
                    <div className="text-muted-foreground">Cost per Sq Ft</div>
                    <div className={`text-xs ${
                      comparisonStoreData.costPerSqFt < currentStore.costPerSqFt ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {comparisonStoreData.costPerSqFt < currentStore.costPerSqFt ? 'Lower' : 'Higher'} by {formatCurrency(Math.abs(comparisonStoreData.costPerSqFt - currentStore.costPerSqFt))}
                    </div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-purple-600">{comparisonStoreData.efficiency}%</div>
                    <div className="text-muted-foreground">Efficiency</div>
                    <div className={`text-xs ${
                      comparisonStoreData.efficiency > currentStore.efficiency ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {comparisonStoreData.efficiency > currentStore.efficiency ? 'Higher' : 'Lower'} by {Math.abs(comparisonStoreData.efficiency - currentStore.efficiency)}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* All Stores Overview */}
      <Card className="border-orange-100 dark:border-orange-900/30">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-4 w-4 text-orange-600" />
            <span>All Stores Overview</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {costData.stores.map((store) => (
              <div key={store.id} className={`p-4 border rounded-lg transition-colors cursor-pointer ${
                store.id === selectedStore 
                  ? 'border-orange-500 bg-orange-50 dark:bg-orange-950/30 dark:border-orange-800' 
                  : 'border-orange-100 dark:border-orange-900/30 hover:bg-orange-50 dark:hover:bg-orange-950/30'
              }`} onClick={() => setSelectedStore(store.id)}>
                <div className="text-center">
                  <div className="font-medium text-sm mb-2">{store.name}</div>
                  <div className="text-lg font-bold text-orange-600">{formatCurrency(store.totalCosts)}</div>
                  <div className="text-xs text-muted-foreground mb-2">Monthly Costs</div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <div className="font-medium text-green-600">{store.profitMargin}%</div>
                      <div className="text-muted-foreground">Profit</div>
                    </div>
                    <div>
                      <div className="font-medium text-blue-600">{store.efficiency}%</div>
                      <div className="text-muted-foreground">Efficiency</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Insights */}
      <Card className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950 dark:to-amber-950 border-orange-200 dark:border-orange-800">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-4 w-4 text-orange-600" />
            <span>Cost Optimization Insights</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>Utilities costs down 7.7% this month</span>
            </div>
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <span>Staff costs 6.3% over budget</span>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              <span>Marketing ROI improving steadily</span>
            </div>
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-purple-600" />
              <span>Potential savings: {formatCurrency(8500)}/month</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-orange-200 dark:border-orange-800">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <div className="font-medium mb-2">Best Performing Store:</div>
                <div className="text-muted-foreground">
                  {costData.stores.reduce((best, store) => 
                    store.efficiency > best.efficiency ? store : best
                  ).name} with {costData.stores.reduce((best, store) => 
                    store.efficiency > best.efficiency ? store : best
                  ).efficiency}% efficiency
                </div>
              </div>
              <div>
                <div className="font-medium mb-2">Cost Leader:</div>
                <div className="text-muted-foreground">
                  {costData.stores.reduce((lowest, store) => 
                    store.costPerSqFt < lowest.costPerSqFt ? store : lowest
                  ).name} at {formatCurrency(costData.stores.reduce((lowest, store) => 
                    store.costPerSqFt < lowest.costPerSqFt ? store : lowest
                  ).costPerSqFt)}/sq ft
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}