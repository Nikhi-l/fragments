'use client'

import { CostAnalyticsFragmentSchema } from '@/lib/schema'
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
  Building,
  Sparkles,
  Clock,
  MapPin,
  Activity,
  Percent,
  Wallet,
  Scale,
  LineChart
} from 'lucide-react'
import { useState } from 'react'

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
  gradient: string
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
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

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
        gradient: 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)',
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
        gradient: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
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
        gradient: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
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
        gradient: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)',
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
        gradient: 'linear-gradient(135deg, #f97316 0%, #fb923c 100%)',
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
        gradient: 'linear-gradient(135deg, #6366f1 0%, #818cf8 100%)',
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
        costPerSqFt: totalCosts / 2500,
        costPerEmployee: totalCosts / 12,
        monthlyTrend: 5.2,
        yearlyTrend: -2.8
      },
      monthlyData: Array.from({ length: 12 }, (_, i) => {
        const month = new Date()
        month.setMonth(month.getMonth() - (11 - i))
        return {
          month: month.toLocaleDateString('en-US', { month: 'short' }),
          totalCosts: Math.floor(Math.random() * 20000) + 115000
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
      currency: 'USD',
      minimumFractionDigits: 0
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
    subtitle,
    icon: Icon,
    gradient,
    trend,
    trendValue,
    trendInverted = false
  }: {
    title: string
    value: string | number
    subtitle?: string
    icon: any
    gradient: string
    trend?: 'up' | 'down'
    trendValue?: string
    trendInverted?: boolean
  }) => {
    const isPositive = trendInverted ? trend === 'down' : trend === 'up'
    return (
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
                <div className={`flex items-center gap-1 mt-2 text-xs ${isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
                  {trend === 'up' ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
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
  }

  const maxCost = Math.max(...costData.monthlyData.map(d => d.totalCosts))

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-zinc-50 via-rose-50/30 to-orange-50/20 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-800">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-rose-500 to-orange-500 shadow-lg shadow-rose-500/25">
                <Calculator className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-zinc-900 dark:text-white">Cost Analytics</h1>
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
                  {costData.stores.map((store) => (
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
                Budget: <span className="font-semibold text-emerald-600 dark:text-emerald-400">{formatCurrency(costData.summary.totalBudget)}</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`h-2 w-2 rounded-full ${costData.summary.budgetVariance > 0 ? 'bg-red-500' : 'bg-emerald-500'}`} />
              <span className="text-zinc-600 dark:text-zinc-400">
                Variance: <span className={`font-semibold ${costData.summary.budgetVariance > 0 ? 'text-red-600 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                  {costData.summary.budgetVariance > 0 ? '+' : ''}{costData.summary.budgetVariance.toFixed(1)}%
                </span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Activity className="h-3.5 w-3.5 text-zinc-400" />
              <span className="text-zinc-600 dark:text-zinc-400">
                Efficiency: <span className="font-semibold text-blue-600 dark:text-blue-400">{currentStore.efficiency}%</span>
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
              title="Total Costs"
              value={formatCurrency(costData.summary.totalCosts)}
              subtitle="This month"
              icon={Wallet}
              gradient="linear-gradient(135deg, #f43f5e 0%, #fb7185 100%)"
              trend="up"
              trendValue="+5.2% vs last month"
              trendInverted={true}
            />
            <MetricCard
              title="Cost per Employee"
              value={formatCurrency(costData.summary.costPerEmployee)}
              subtitle="12 employees"
              icon={Users}
              gradient="linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)"
            />
            <MetricCard
              title="Cost per Sq Ft"
              value={formatCurrency(costData.summary.costPerSqFt)}
              subtitle="2,500 sq ft"
              icon={Scale}
              gradient="linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)"
            />
            <MetricCard
              title="Profit Margin"
              value={`${currentStore.profitMargin}%`}
              subtitle="After expenses"
              icon={TrendingUp}
              gradient="linear-gradient(135deg, #10b981 0%, #34d399 100%)"
              trend="up"
              trendValue="+1.2% improvement"
            />
          </div>

          {/* Cost Trend Chart */}
          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <LineChart className="h-5 w-5 text-rose-500" />
                <h2 className="font-semibold text-zinc-900 dark:text-white">Cost Trends</h2>
              </div>
              <div className="flex gap-1">
                {(['monthly', 'quarterly', 'yearly'] as const).map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setSelectedTimeframe(tf)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                      selectedTimeframe === tf
                        ? 'bg-gradient-to-r from-rose-500 to-orange-500 text-white'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                    }`}
                  >
                    {tf.charAt(0).toUpperCase() + tf.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-48 flex items-end gap-1">
              {costData.monthlyData.map((item, index) => {
                const height = (item.totalCosts / maxCost) * 100
                const isLast = index === costData.monthlyData.length - 1
                return (
                  <div key={index} className="flex-1 flex flex-col items-center group">
                    <div className="relative w-full">
                      <div
                        className={`w-full rounded-t-md transition-all duration-300 ${
                          isLast
                            ? 'bg-gradient-to-t from-rose-600 to-rose-400'
                            : 'bg-gradient-to-t from-zinc-300 to-zinc-200 dark:from-zinc-600 dark:to-zinc-500 group-hover:from-rose-400 group-hover:to-rose-300'
                        }`}
                        style={{ height: `${height * 1.8}px` }}
                      />
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs px-2 py-1 rounded whitespace-nowrap z-10">
                        {formatCurrency(item.totalCosts)}
                      </div>
                    </div>
                    <span className="text-[10px] text-zinc-400 mt-2 -rotate-45 origin-left">{item.month}</span>
                  </div>
                )
              })}
            </div>
            <div className="flex justify-between mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-700/50">
              <div className="text-center">
                <div className="text-lg font-bold text-zinc-900 dark:text-white">{formatCurrency(costData.monthlyData[11]?.totalCosts || 0)}</div>
                <div className="text-xs text-zinc-500">Current Month</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-zinc-900 dark:text-white">{formatCurrency(costData.monthlyData.reduce((a, b) => a + b.totalCosts, 0) / 12)}</div>
                <div className="text-xs text-zinc-500">Monthly Avg</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">-2.8%</div>
                <div className="text-xs text-zinc-500">Year over Year</div>
              </div>
            </div>
          </div>

          {/* Cost Categories */}
          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50">
            <div className="flex items-center gap-2 mb-4">
              <PieChart className="h-5 w-5 text-rose-500" />
              <h2 className="font-semibold text-zinc-900 dark:text-white">Cost Breakdown</h2>
            </div>
            <div className="space-y-3">
              {costData.costCategories.map((category) => {
                const Icon = category.icon
                const percentChange = calculatePercentageChange(category.currentCost, category.previousCost)
                const isExpanded = expandedCategory === category.id
                const budgetUsage = (category.currentCost / category.budgetAllocated) * 100

                return (
                  <div key={category.id}>
                    <button
                      onClick={() => setExpandedCategory(isExpanded ? null : category.id)}
                      className="w-full p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-700/50 hover:border-zinc-300 dark:hover:border-zinc-600 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg" style={{ background: category.gradient }}>
                            <Icon className="h-4 w-4 text-white" />
                          </div>
                          <div className="text-left">
                            <div className="font-medium text-zinc-900 dark:text-white">{category.name}</div>
                            <div className="text-xs text-zinc-500">{category.percentage}% of total</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-zinc-900 dark:text-white">{formatCurrency(category.currentCost)}</div>
                          <div className={`text-xs flex items-center justify-end gap-1 ${
                            category.trend === 'down' ? 'text-emerald-500' : category.trend === 'up' ? 'text-red-500' : 'text-zinc-500'
                          }`}>
                            {category.trend === 'up' && <ArrowUpRight className="h-3 w-3" />}
                            {category.trend === 'down' && <ArrowDownRight className="h-3 w-3" />}
                            {percentChange}%
                          </div>
                        </div>
                      </div>
                      {/* Budget Progress */}
                      <div className="mt-3">
                        <div className="flex justify-between text-xs text-zinc-500 mb-1">
                          <span>Budget: {formatCurrency(category.budgetAllocated)}</span>
                          <span className={budgetUsage > 100 ? 'text-red-500' : ''}>{budgetUsage.toFixed(0)}% used</span>
                        </div>
                        <div className="h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${
                              budgetUsage > 100 ? 'bg-red-500' : budgetUsage > 80 ? 'bg-amber-500' : 'bg-emerald-500'
                            }`}
                            style={{ width: `${Math.min(budgetUsage, 100)}%` }}
                          />
                        </div>
                      </div>
                    </button>
                    {/* Expanded Subcategories */}
                    {isExpanded && (
                      <div className="mt-2 ml-4 p-4 rounded-xl bg-zinc-100/50 dark:bg-zinc-900/30 space-y-2">
                        {category.subcategories.map((sub) => (
                          <div key={sub.name} className="flex items-center justify-between text-sm">
                            <span className="text-zinc-600 dark:text-zinc-400">{sub.name}</span>
                            <div className="flex items-center gap-3">
                              <div className="w-24 h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                                <div
                                  className="h-full rounded-full"
                                  style={{ width: `${sub.percentage}%`, background: category.gradient }}
                                />
                              </div>
                              <span className="font-medium text-zinc-900 dark:text-white w-20 text-right">
                                {formatCurrency(sub.cost)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Store Comparison */}
          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Building className="h-5 w-5 text-rose-500" />
                <h2 className="font-semibold text-zinc-900 dark:text-white">Store Comparison</h2>
              </div>
              <Select value={comparisonStore} onValueChange={setComparisonStore}>
                <SelectTrigger className="w-40 h-8 bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-700 rounded-lg text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {costData.stores.filter(s => s.id !== selectedStore).map((store) => (
                    <SelectItem key={store.id} value={store.id}>{store.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {/* Current Store */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-rose-50 to-orange-50 dark:from-rose-500/10 dark:to-orange-500/10 border border-rose-200 dark:border-rose-500/20">
                <div className="text-sm font-medium text-rose-600 dark:text-rose-400 mb-3">{currentStore.name}</div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-zinc-500">Total Costs</span>
                    <span className="font-bold text-zinc-900 dark:text-white">{formatCurrency(currentStore.totalCosts)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-zinc-500">Profit Margin</span>
                    <span className="font-bold text-emerald-600">{currentStore.profitMargin}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-zinc-500">Cost/Sq Ft</span>
                    <span className="font-bold text-zinc-900 dark:text-white">{formatCurrency(currentStore.costPerSqFt)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-zinc-500">Efficiency</span>
                    <span className="font-bold text-blue-600">{currentStore.efficiency}%</span>
                  </div>
                </div>
              </div>
              {/* Comparison Store */}
              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-700/50">
                <div className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-3">{comparisonStoreData.name}</div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-zinc-500">Total Costs</span>
                    <div className="text-right">
                      <span className="font-bold text-zinc-900 dark:text-white">{formatCurrency(comparisonStoreData.totalCosts)}</span>
                      <span className={`text-xs ml-2 ${comparisonStoreData.totalCosts < currentStore.totalCosts ? 'text-emerald-500' : 'text-red-500'}`}>
                        {comparisonStoreData.totalCosts < currentStore.totalCosts ? '-' : '+'}
                        {formatCurrency(Math.abs(comparisonStoreData.totalCosts - currentStore.totalCosts))}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-zinc-500">Profit Margin</span>
                    <div className="text-right">
                      <span className="font-bold text-emerald-600">{comparisonStoreData.profitMargin}%</span>
                      <span className={`text-xs ml-2 ${comparisonStoreData.profitMargin > currentStore.profitMargin ? 'text-emerald-500' : 'text-red-500'}`}>
                        {comparisonStoreData.profitMargin > currentStore.profitMargin ? '+' : ''}
                        {(comparisonStoreData.profitMargin - currentStore.profitMargin).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-zinc-500">Cost/Sq Ft</span>
                    <div className="text-right">
                      <span className="font-bold text-zinc-900 dark:text-white">{formatCurrency(comparisonStoreData.costPerSqFt)}</span>
                      <span className={`text-xs ml-2 ${comparisonStoreData.costPerSqFt < currentStore.costPerSqFt ? 'text-emerald-500' : 'text-red-500'}`}>
                        {comparisonStoreData.costPerSqFt < currentStore.costPerSqFt ? '-' : '+'}
                        {formatCurrency(Math.abs(comparisonStoreData.costPerSqFt - currentStore.costPerSqFt))}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-zinc-500">Efficiency</span>
                    <div className="text-right">
                      <span className="font-bold text-blue-600">{comparisonStoreData.efficiency}%</span>
                      <span className={`text-xs ml-2 ${comparisonStoreData.efficiency > currentStore.efficiency ? 'text-emerald-500' : 'text-red-500'}`}>
                        {comparisonStoreData.efficiency > currentStore.efficiency ? '+' : ''}
                        {comparisonStoreData.efficiency - currentStore.efficiency}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* All Stores Quick View */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {costData.stores.map((store) => (
              <button
                key={store.id}
                onClick={() => setSelectedStore(store.id)}
                className={`p-4 rounded-xl border transition-all ${
                  store.id === selectedStore
                    ? 'border-rose-500 bg-rose-50 dark:bg-rose-500/10'
                    : 'border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800/50 hover:border-rose-300'
                }`}
              >
                <div className="font-medium text-sm text-zinc-900 dark:text-white mb-2">{store.name}</div>
                <div className="text-xl font-bold text-rose-600 dark:text-rose-400">{formatCurrency(store.totalCosts)}</div>
                <div className="flex justify-between mt-2 text-xs">
                  <span className="text-emerald-600">{store.profitMargin}% profit</span>
                  <span className="text-blue-600">{store.efficiency}% eff.</span>
                </div>
              </button>
            ))}
          </div>

          {/* AI Insights CTA */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"30\" height=\"30\" viewBox=\"0 0 30 30\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z\" fill=\"rgba(255,255,255,0.1)\"%3E%3C/path%3E%3C/svg%3E')] opacity-50" />
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">AI Cost Optimization</h3>
                  <p className="text-white/80 text-sm mt-1">
                    Identified {formatCurrency(8500)}/month in potential savings across all stores
                  </p>
                </div>
              </div>
              <Button className="bg-white text-rose-600 hover:bg-white/90 font-semibold">
                <Target className="h-4 w-4 mr-2" />
                View Recommendations
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
