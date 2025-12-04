'use client'

import { InventoryManagementFragmentSchema } from '@/lib/schema'
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
  Package,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  BarChart3,
  RefreshCw,
  Search,
  Download,
  Plus,
  Minus,
  ShoppingCart,
  Truck,
  DollarSign,
  Target,
  Archive,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  MoreHorizontal,
  Boxes,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  MapPin,
  Zap
} from 'lucide-react'
import { useState } from 'react'

interface InventoryItem {
  id: string
  name: string
  sku: string
  category: string
  currentStock: number
  minStock: number
  maxStock: number
  reorderPoint: number
  unitCost: number
  unitPrice: number
  supplier: string
  location: string
  lastRestocked: string
  status: 'in_stock' | 'low_stock' | 'out_of_stock' | 'overstocked'
  trend: 'up' | 'down' | 'stable'
  weeklyMovement: number
  monthlyMovement: number
  image?: string
}

interface Category {
  id: string
  name: string
  icon: string
  totalItems: number
  lowStockItems: number
  outOfStockItems: number
  totalValue: number
}

export function FragmentInventoryManagement({ fragment }: { fragment: InventoryManagementFragmentSchema }) {
  const [inventoryData, setInventoryData] = useState(generateMockInventoryData())
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedStore, setSelectedStore] = useState('main')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  function generateMockInventoryData() {
    const stores = [
      { id: 'main', name: fragment.store_name || 'Main Store' },
      { id: 'downtown', name: 'Downtown Branch' },
      { id: 'mall', name: 'Mall Location' },
      { id: 'suburban', name: 'Suburban Store' }
    ]

    const categories: Category[] = [
      { id: 'electronics', name: 'Electronics', icon: '📱', totalItems: 45, lowStockItems: 3, outOfStockItems: 1, totalValue: 125000 },
      { id: 'clothing', name: 'Clothing', icon: '👕', totalItems: 120, lowStockItems: 8, outOfStockItems: 2, totalValue: 85000 },
      { id: 'food', name: 'Food & Beverages', icon: '🍎', totalItems: 200, lowStockItems: 15, outOfStockItems: 5, totalValue: 45000 },
      { id: 'home', name: 'Home & Garden', icon: '🏠', totalItems: 80, lowStockItems: 4, outOfStockItems: 1, totalValue: 65000 },
      { id: 'health', name: 'Health & Beauty', icon: '💄', totalItems: 60, lowStockItems: 2, outOfStockItems: 0, totalValue: 35000 }
    ]

    const inventoryItems: InventoryItem[] = [
      {
        id: 'inv-001',
        name: 'Samsung 55" 4K Smart TV',
        sku: 'SAM-TV-55-001',
        category: 'Electronics',
        currentStock: 8,
        minStock: 5,
        maxStock: 25,
        reorderPoint: 10,
        unitCost: 450,
        unitPrice: 699,
        supplier: 'Samsung Electronics',
        location: 'Warehouse A-1',
        lastRestocked: '2025-01-28',
        status: 'in_stock',
        trend: 'down',
        weeklyMovement: -3,
        monthlyMovement: -12
      },
      {
        id: 'inv-002',
        name: 'Apple iPhone 15 Pro',
        sku: 'APL-IP15P-001',
        category: 'Electronics',
        currentStock: 2,
        minStock: 5,
        maxStock: 20,
        reorderPoint: 8,
        unitCost: 850,
        unitPrice: 1199,
        supplier: 'Apple Inc.',
        location: 'Secure Storage',
        lastRestocked: '2025-01-25',
        status: 'low_stock',
        trend: 'up',
        weeklyMovement: 8,
        monthlyMovement: 25
      },
      {
        id: 'inv-003',
        name: 'Nike Air Max Sneakers',
        sku: 'NIKE-AM-001',
        category: 'Clothing',
        currentStock: 0,
        minStock: 10,
        maxStock: 50,
        reorderPoint: 15,
        unitCost: 65,
        unitPrice: 129,
        supplier: 'Nike Distribution',
        location: 'Floor Display',
        lastRestocked: '2025-01-20',
        status: 'out_of_stock',
        trend: 'up',
        weeklyMovement: 0,
        monthlyMovement: -45
      },
      {
        id: 'inv-004',
        name: 'Organic Coffee Beans 1kg',
        sku: 'ORG-COF-1KG',
        category: 'Food & Beverages',
        currentStock: 45,
        minStock: 20,
        maxStock: 100,
        reorderPoint: 30,
        unitCost: 12,
        unitPrice: 24,
        supplier: 'Fair Trade Coffee Co.',
        location: 'Aisle 3-B',
        lastRestocked: '2025-02-01',
        status: 'in_stock',
        trend: 'stable',
        weeklyMovement: 15,
        monthlyMovement: 55
      },
      {
        id: 'inv-005',
        name: 'Wireless Bluetooth Headphones',
        sku: 'WL-BT-HP-001',
        category: 'Electronics',
        currentStock: 3,
        minStock: 8,
        maxStock: 30,
        reorderPoint: 12,
        unitCost: 35,
        unitPrice: 79,
        supplier: 'Audio Tech Ltd.',
        location: 'Electronics Section',
        lastRestocked: '2025-01-30',
        status: 'low_stock',
        trend: 'up',
        weeklyMovement: 5,
        monthlyMovement: 18
      },
      {
        id: 'inv-006',
        name: 'Premium Skincare Set',
        sku: 'PREM-SKIN-SET',
        category: 'Health & Beauty',
        currentStock: 25,
        minStock: 10,
        maxStock: 40,
        reorderPoint: 15,
        unitCost: 28,
        unitPrice: 65,
        supplier: 'Beauty Essentials',
        location: 'Beauty Counter',
        lastRestocked: '2025-01-29',
        status: 'in_stock',
        trend: 'up',
        weeklyMovement: 8,
        monthlyMovement: 22
      }
    ]

    return {
      stores,
      categories,
      inventoryItems,
      summary: {
        totalItems: inventoryItems.length,
        totalValue: inventoryItems.reduce((sum, item) => sum + (item.currentStock * item.unitCost), 0),
        lowStockItems: inventoryItems.filter(item => item.status === 'low_stock').length,
        outOfStockItems: inventoryItems.filter(item => item.status === 'out_of_stock').length,
        reorderAlerts: inventoryItems.filter(item => item.currentStock <= item.reorderPoint).length,
        topMovingItems: inventoryItems.sort((a, b) => b.monthlyMovement - a.monthlyMovement).slice(0, 5)
      }
    }
  }

  function refreshData() {
    setInventoryData(generateMockInventoryData())
    setLastUpdated(new Date())
  }

  function formatCurrency(amount: number) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const currentStore = inventoryData.stores.find(store => store.id === selectedStore) || inventoryData.stores[0]

  const filteredItems = inventoryData.inventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || item.category.toLowerCase() === selectedCategory.toLowerCase()
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter

    return matchesSearch && matchesCategory && matchesStatus
  })

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
    trend?: 'up' | 'down'
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
              <div className={`flex items-center gap-1 mt-2 text-xs ${trend === 'up' ? 'text-emerald-500' : 'text-red-500'}`}>
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

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'in_stock':
        return { bg: 'bg-emerald-500/10', text: 'text-emerald-600 dark:text-emerald-400', dot: 'bg-emerald-500' }
      case 'low_stock':
        return { bg: 'bg-amber-500/10', text: 'text-amber-600 dark:text-amber-400', dot: 'bg-amber-500' }
      case 'out_of_stock':
        return { bg: 'bg-red-500/10', text: 'text-red-600 dark:text-red-400', dot: 'bg-red-500' }
      case 'overstocked':
        return { bg: 'bg-blue-500/10', text: 'text-blue-600 dark:text-blue-400', dot: 'bg-blue-500' }
      default:
        return { bg: 'bg-zinc-500/10', text: 'text-zinc-600 dark:text-zinc-400', dot: 'bg-zinc-500' }
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-emerald-500" />
      case 'down': return <TrendingDown className="h-4 w-4 text-red-500" />
      case 'stable': return <Minus className="h-4 w-4 text-blue-500" />
      default: return <Minus className="h-4 w-4 text-zinc-500" />
    }
  }

  const stockPercentage = (item: InventoryItem) => Math.round((item.currentStock / item.maxStock) * 100)

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-zinc-50 via-orange-50/30 to-amber-50/20 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-800">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 shadow-lg shadow-orange-500/25">
                <Package className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-zinc-900 dark:text-white">Inventory Control</h1>
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
                  {inventoryData.stores.map((store) => (
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
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  {inventoryData.inventoryItems.filter(i => i.status === 'in_stock').length}
                </span> In Stock
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-amber-500" />
              <span className="text-zinc-600 dark:text-zinc-400">
                <span className="font-semibold text-amber-600 dark:text-amber-400">
                  {inventoryData.summary.lowStockItems}
                </span> Low Stock
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-red-500" />
              <span className="text-zinc-600 dark:text-zinc-400">
                <span className="font-semibold text-red-600 dark:text-red-400">
                  {inventoryData.summary.outOfStockItems}
                </span> Out of Stock
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
              title="Total SKUs"
              value={inventoryData.summary.totalItems}
              subtitle="Across all categories"
              icon={Boxes}
              gradient="linear-gradient(135deg, #f97316 0%, #fb923c 100%)"
              trend="up"
              trendValue="+12 this month"
            />
            <MetricCard
              title="Inventory Value"
              value={formatCurrency(inventoryData.summary.totalValue)}
              subtitle="At cost price"
              icon={DollarSign}
              gradient="linear-gradient(135deg, #10b981 0%, #34d399 100%)"
              trend="up"
              trendValue="+8.2%"
            />
            <MetricCard
              title="Low Stock Items"
              value={inventoryData.summary.lowStockItems}
              subtitle="Needs attention"
              icon={AlertTriangle}
              gradient="linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)"
            />
            <MetricCard
              title="Reorder Alerts"
              value={inventoryData.summary.reorderAlerts}
              subtitle="Below threshold"
              icon={ShoppingCart}
              gradient="linear-gradient(135deg, #ef4444 0%, #f87171 100%)"
            />
          </div>

          {/* Search and Filters */}
          <div className="p-4 rounded-2xl bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Search products or SKU..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 text-sm transition-all"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-44 bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-700 rounded-xl">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {inventoryData.categories.map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.icon} {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-36 bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-700 rounded-xl">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="in_stock">In Stock</SelectItem>
                  <SelectItem value="low_stock">Low Stock</SelectItem>
                  <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                  <SelectItem value="overstocked">Overstocked</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Categories Overview */}
          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-orange-500" />
                <h2 className="font-semibold text-zinc-900 dark:text-white">Categories Overview</h2>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {inventoryData.categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`p-4 rounded-xl border transition-all duration-200 text-left ${
                    selectedCategory === category.name
                      ? 'border-orange-500 bg-orange-50 dark:bg-orange-500/10'
                      : 'border-zinc-200 dark:border-zinc-700 hover:border-orange-300 dark:hover:border-orange-800 bg-zinc-50 dark:bg-zinc-900/50'
                  }`}
                >
                  <div className="text-2xl mb-2">{category.icon}</div>
                  <div className="text-sm font-medium text-zinc-900 dark:text-white">{category.name}</div>
                  <div className="text-lg font-bold text-orange-600 dark:text-orange-400">{category.totalItems}</div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{formatCurrency(category.totalValue)}</div>
                  {(category.lowStockItems > 0 || category.outOfStockItems > 0) && (
                    <div className="flex gap-1 mt-2">
                      {category.lowStockItems > 0 && (
                        <span className="px-1.5 py-0.5 text-xs rounded bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400">
                          {category.lowStockItems} low
                        </span>
                      )}
                      {category.outOfStockItems > 0 && (
                        <span className="px-1.5 py-0.5 text-xs rounded bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400">
                          {category.outOfStockItems} out
                        </span>
                      )}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Inventory Table */}
          <div className="rounded-2xl bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50 overflow-hidden">
            <div className="p-5 border-b border-zinc-200 dark:border-zinc-700/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Archive className="h-5 w-5 text-orange-500" />
                  <h2 className="font-semibold text-zinc-900 dark:text-white">
                    Inventory Items
                    <span className="ml-2 text-sm font-normal text-zinc-500">({filteredItems.length})</span>
                  </h2>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="h-8 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                    <Download className="h-4 w-4 mr-1.5" />
                    Export
                  </Button>
                  <Button size="sm" className="h-8 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white border-0">
                    <Plus className="h-4 w-4 mr-1.5" />
                    Add Item
                  </Button>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-zinc-50 dark:bg-zinc-900/50">
                    <th className="text-left p-4 text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Product</th>
                    <th className="text-left p-4 text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">SKU</th>
                    <th className="text-left p-4 text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Stock Level</th>
                    <th className="text-left p-4 text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Status</th>
                    <th className="text-left p-4 text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Value</th>
                    <th className="text-left p-4 text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Movement</th>
                    <th className="text-right p-4 text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                  {filteredItems.map((item) => {
                    const status = getStatusStyle(item.status)
                    const stockPct = stockPercentage(item)
                    return (
                      <tr key={item.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-700 dark:to-zinc-800 flex items-center justify-center">
                              <Package className="h-5 w-5 text-zinc-400" />
                            </div>
                            <div>
                              <div className="font-medium text-zinc-900 dark:text-white text-sm">{item.name}</div>
                              <div className="text-xs text-zinc-500 dark:text-zinc-400">{item.supplier}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <code className="text-xs bg-zinc-100 dark:bg-zinc-900 px-2 py-1 rounded font-mono text-zinc-600 dark:text-zinc-400">
                            {item.sku}
                          </code>
                        </td>
                        <td className="p-4">
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between text-sm">
                              <span className="font-semibold text-zinc-900 dark:text-white">{item.currentStock}</span>
                              <span className="text-xs text-zinc-400">/ {item.maxStock}</span>
                            </div>
                            <div className="w-24 h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all ${
                                  stockPct > 50 ? 'bg-emerald-500' : stockPct > 20 ? 'bg-amber-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${stockPct}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${status.bg} ${status.text}`}>
                            <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
                            {item.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="p-4">
                          <div>
                            <div className="font-semibold text-zinc-900 dark:text-white text-sm">
                              {formatCurrency(item.currentStock * item.unitCost)}
                            </div>
                            <div className="text-xs text-zinc-500 dark:text-zinc-400">
                              {formatCurrency(item.unitCost)} each
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-1.5">
                            {getTrendIcon(item.trend)}
                            <span className={`text-sm font-medium ${
                              item.monthlyMovement > 0 ? 'text-emerald-600 dark:text-emerald-400' :
                              item.monthlyMovement < 0 ? 'text-red-600 dark:text-red-400' : 'text-zinc-500'
                            }`}>
                              {item.monthlyMovement > 0 ? '+' : ''}{item.monthlyMovement}/mo
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                              <Eye className="h-4 w-4 text-zinc-500" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                              <Edit className="h-4 w-4 text-zinc-500" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                              <MoreHorizontal className="h-4 w-4 text-zinc-500" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Alerts and Top Movers */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Reorder Alerts */}
            <div className="p-5 rounded-2xl bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-lg bg-red-100 dark:bg-red-500/20">
                  <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
                </div>
                <h2 className="font-semibold text-zinc-900 dark:text-white">Reorder Alerts</h2>
              </div>
              <div className="space-y-3">
                {inventoryData.inventoryItems
                  .filter(item => item.currentStock <= item.reorderPoint)
                  .slice(0, 4)
                  .map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white dark:bg-zinc-800 flex items-center justify-center">
                          <Package className="h-4 w-4 text-zinc-400" />
                        </div>
                        <div>
                          <div className="font-medium text-sm text-zinc-900 dark:text-white">{item.name}</div>
                          <div className="text-xs text-zinc-500 dark:text-zinc-400">
                            {item.currentStock} left • Reorder at {item.reorderPoint}
                          </div>
                        </div>
                      </div>
                      <Button size="sm" className="h-8 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white border-0">
                        <Truck className="h-3.5 w-3.5 mr-1" />
                        Order
                      </Button>
                    </div>
                  ))}
              </div>
            </div>

            {/* Top Moving Items */}
            <div className="p-5 rounded-2xl bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-500/20">
                  <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h2 className="font-semibold text-zinc-900 dark:text-white">Top Movers</h2>
              </div>
              <div className="space-y-3">
                {inventoryData.summary.topMovingItems.map((item, index) => (
                  <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-700/50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium text-sm text-zinc-900 dark:text-white">{item.name}</div>
                        <div className="text-xs text-zinc-500 dark:text-zinc-400">
                          Stock: {item.currentStock}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                        +{item.monthlyMovement}
                      </div>
                      <div className="text-xs text-zinc-400">units/mo</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Insights CTA */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"30\" height=\"30\" viewBox=\"0 0 30 30\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z\" fill=\"rgba(255,255,255,0.1)\"%3E%3C/path%3E%3C/svg%3E')] opacity-50" />
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">AI Inventory Optimization</h3>
                  <p className="text-white/80 text-sm mt-1">
                    Let AI analyze your stock patterns and automate reordering decisions
                  </p>
                </div>
              </div>
              <Button className="bg-white text-orange-600 hover:bg-white/90 font-semibold">
                <Zap className="h-4 w-4 mr-2" />
                Enable Smart Reorder
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
