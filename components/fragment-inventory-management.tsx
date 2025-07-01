'use client'

import { InventoryManagementFragmentSchema } from '@/lib/schema'
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
  Package, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown,
  BarChart3, 
  RefreshCw,
  Search,
  Filter,
  Download,
  Plus,
  Minus,
  ShoppingCart,
  Truck,
  Clock,
  DollarSign,
  Target,
  Archive,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  MoreHorizontal
} from 'lucide-react'
import { useState, useEffect } from 'react'

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
      { id: 'electronics', name: 'Electronics', totalItems: 45, lowStockItems: 3, outOfStockItems: 1, totalValue: 125000 },
      { id: 'clothing', name: 'Clothing', totalItems: 120, lowStockItems: 8, outOfStockItems: 2, totalValue: 85000 },
      { id: 'food', name: 'Food & Beverages', totalItems: 200, lowStockItems: 15, outOfStockItems: 5, totalValue: 45000 },
      { id: 'home', name: 'Home & Garden', totalItems: 80, lowStockItems: 4, outOfStockItems: 1, totalValue: 65000 },
      { id: 'health', name: 'Health & Beauty', totalItems: 60, lowStockItems: 2, outOfStockItems: 0, totalValue: 35000 }
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
      currency: 'USD'
    }).format(amount)
  }

  function getStatusColor(status: string) {
    switch (status) {
      case 'in_stock': return 'text-green-600 border-green-600 bg-green-50'
      case 'low_stock': return 'text-yellow-600 border-yellow-600 bg-yellow-50'
      case 'out_of_stock': return 'text-red-600 border-red-600 bg-red-50'
      case 'overstocked': return 'text-blue-600 border-blue-600 bg-blue-50'
      default: return 'text-gray-600 border-gray-600 bg-gray-50'
    }
  }

  function getTrendIcon(trend: string) {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-600" />
      case 'down': return <TrendingDown className="h-4 w-4 text-red-600" />
      case 'stable': return <Minus className="h-4 w-4 text-blue-600" />
      default: return <Minus className="h-4 w-4 text-gray-600" />
    }
  }

  const currentStore = inventoryData.stores.find(store => store.id === selectedStore) || inventoryData.stores[0]

  // Filter inventory items based on search and filters
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
    icon: Icon, 
    formatter = (val: number) => val.toLocaleString(),
    color = 'text-orange-600',
    bgColor = 'bg-orange-50'
  }: {
    title: string
    value: number
    icon: any
    formatter?: (val: number) => string
    color?: string
    bgColor?: string
  }) => (
    <Card className="border-orange-100 dark:border-orange-900/30">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={`p-2 rounded-lg ${bgColor}`}>
          <Icon className={`h-4 w-4 ${color}`} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formatter(value)}</div>
      </CardContent>
    </Card>
  )

  return (
    <div className="flex flex-col h-full p-4 space-y-6 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Package className="h-5 w-5 text-orange-600" />
          <h2 className="text-xl font-semibold">Inventory Management - {currentStore.name}</h2>
          <Badge variant="outline" className="border-orange-200 text-orange-700">{fragment.time_period}</Badge>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={selectedStore} onValueChange={setSelectedStore}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select store" />
            </SelectTrigger>
            <SelectContent>
              {inventoryData.stores.map((store) => (
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
            className="h-8 border-orange-200 text-orange-700 hover:bg-orange-50"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Items"
          value={inventoryData.summary.totalItems}
          icon={Package}
        />
        <MetricCard
          title="Total Value"
          value={inventoryData.summary.totalValue}
          icon={DollarSign}
          formatter={formatCurrency}
          color="text-green-600"
          bgColor="bg-green-50"
        />
        <MetricCard
          title="Low Stock Alerts"
          value={inventoryData.summary.lowStockItems}
          icon={AlertTriangle}
          color="text-yellow-600"
          bgColor="bg-yellow-50"
        />
        <MetricCard
          title="Out of Stock"
          value={inventoryData.summary.outOfStockItems}
          icon={XCircle}
          color="text-red-600"
          bgColor="bg-red-50"
        />
      </div>

      {/* Filters and Search */}
      <Card className="border-orange-100 dark:border-orange-900/30">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by name or SKU..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-orange-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {inventoryData.categories.map((category) => (
                  <SelectItem key={category.id} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
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
        </CardContent>
      </Card>

      {/* Categories Overview */}
      <Card className="border-orange-100 dark:border-orange-900/30">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-4 w-4 text-orange-600" />
            <span>Categories Overview</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {inventoryData.categories.map((category, index) => (
              <div key={category.id} className="p-4 border rounded-lg border-orange-100 dark:border-orange-900/30 hover:bg-orange-50 dark:hover:bg-orange-950/30 transition-colors">
                <div className="text-center">
                  <div className="text-lg font-bold text-orange-600">{category.totalItems}</div>
                  <div className="text-sm font-medium">{category.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {formatCurrency(category.totalValue)}
                  </div>
                  <div className="flex justify-center space-x-2 mt-2">
                    {category.lowStockItems > 0 && (
                      <Badge variant="outline" className="text-xs text-yellow-600 border-yellow-600">
                        {category.lowStockItems} Low
                      </Badge>
                    )}
                    {category.outOfStockItems > 0 && (
                      <Badge variant="outline" className="text-xs text-red-600 border-red-600">
                        {category.outOfStockItems} Out
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Inventory Items Table */}
      <Card className="border-orange-100 dark:border-orange-900/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Archive className="h-4 w-4 text-orange-600" />
              <span>Inventory Items ({filteredItems.length})</span>
            </CardTitle>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="border-orange-200 text-orange-700 hover:bg-orange-50">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-orange-100">
                  <th className="text-left p-3 font-medium">Product</th>
                  <th className="text-left p-3 font-medium">SKU</th>
                  <th className="text-left p-3 font-medium">Category</th>
                  <th className="text-left p-3 font-medium">Stock</th>
                  <th className="text-left p-3 font-medium">Status</th>
                  <th className="text-left p-3 font-medium">Value</th>
                  <th className="text-left p-3 font-medium">Trend</th>
                  <th className="text-left p-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => (
                  <tr key={item.id} className="border-b border-orange-50 hover:bg-orange-50/50 transition-colors">
                    <td className="p-3">
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-muted-foreground">{item.supplier}</div>
                      </div>
                    </td>
                    <td className="p-3">
                      <code className="text-sm bg-gray-100 px-2 py-1 rounded">{item.sku}</code>
                    </td>
                    <td className="p-3">
                      <Badge variant="outline" className="text-xs">
                        {item.category}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div>
                        <div className="font-medium">{item.currentStock}</div>
                        <div className="text-xs text-muted-foreground">
                          Min: {item.minStock} | Max: {item.maxStock}
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge variant="outline" className={`text-xs ${getStatusColor(item.status)}`}>
                        {item.status.replace('_', ' ')}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div>
                        <div className="font-medium">{formatCurrency(item.currentStock * item.unitCost)}</div>
                        <div className="text-xs text-muted-foreground">
                          {formatCurrency(item.unitCost)} each
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center space-x-1">
                        {getTrendIcon(item.trend)}
                        <span className="text-sm">{item.monthlyMovement > 0 ? '+' : ''}{item.monthlyMovement}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex space-x-1">
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Reorder Alerts */}
        <Card className="border-orange-100 dark:border-orange-900/30">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-orange-600" />
              <span>Reorder Alerts</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {inventoryData.inventoryItems
                .filter(item => item.currentStock <= item.reorderPoint)
                .slice(0, 5)
                .map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div>
                      <div className="font-medium text-sm">{item.name}</div>
                      <div className="text-xs text-muted-foreground">
                        Current: {item.currentStock} | Reorder at: {item.reorderPoint}
                      </div>
                    </div>
                    <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      Reorder
                    </Button>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Moving Items */}
        <Card className="border-orange-100 dark:border-orange-900/30">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-orange-600" />
              <span>Top Moving Items</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {inventoryData.summary.topMovingItems.map((item, index) => (
                <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg border-orange-100 dark:border-orange-900/30">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-muted-foreground">#{index + 1}</span>
                    <div>
                      <div className="font-medium text-sm">{item.name}</div>
                      <div className="text-xs text-muted-foreground">
                        Stock: {item.currentStock}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-green-600">
                      +{item.monthlyMovement} units
                    </div>
                    <div className="text-xs text-muted-foreground">this month</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Summary Insights */}
      <Card className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950 dark:to-amber-950 border-orange-200 dark:border-orange-800">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-4 w-4 text-orange-600" />
            <span>Inventory Insights</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>85% items properly stocked</span>
            </div>
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <span>{inventoryData.summary.reorderAlerts} items need reordering</span>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              <span>Electronics category trending up</span>
            </div>
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-green-600" />
              <span>Total inventory value: {formatCurrency(inventoryData.summary.totalValue)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}