'use client'

import { LossPreventionFragmentSchema } from '@/lib/schema'
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
  Shield,
  AlertTriangle,
  Camera,
  RefreshCw,
  Clock,
  MapPin,
  Eye,
  ShieldAlert,
  ShieldCheck,
  AlertCircle,
  XCircle,
  CheckCircle,
  TrendingDown,
  DollarSign,
  Package,
  Users,
  Bell,
  Video,
  Lock,
  Unlock,
  Sparkles,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Activity
} from 'lucide-react'
import { useState } from 'react'

interface SecurityAlert {
  id: string
  type: 'theft' | 'suspicious' | 'door_alarm' | 'inventory' | 'access' | 'system'
  severity: 'critical' | 'high' | 'medium' | 'low'
  title: string
  description: string
  location: string
  timestamp: Date
  status: 'active' | 'investigating' | 'resolved' | 'dismissed'
  cameraId?: string
  employeeInvolved?: string
}

interface SecurityZone {
  id: string
  name: string
  status: 'secure' | 'alert' | 'warning'
  cameras: number
  activeCameras: number
  lastIncident?: string
  riskLevel: number
}

export function FragmentLossPrevention({ fragment }: { fragment: LossPreventionFragmentSchema }) {
  const [securityData, setSecurityData] = useState(generateMockSecurityData())
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [selectedStore, setSelectedStore] = useState('main')
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>('today')
  const [activeAlertFilter, setActiveAlertFilter] = useState<string>('all')

  function generateMockSecurityData() {
    const stores = [
      { id: 'main', name: fragment.store_name || 'Main Store' },
      { id: 'downtown', name: 'Downtown Branch' },
      { id: 'mall', name: 'Mall Location' },
      { id: 'suburban', name: 'Suburban Store' }
    ]

    const alerts: SecurityAlert[] = [
      {
        id: 'alert-001',
        type: 'suspicious',
        severity: 'high',
        title: 'Suspicious Activity Detected',
        description: 'Unusual movement pattern detected near electronics section. Individual lingering without making purchases.',
        location: 'Electronics Section - Aisle 3',
        timestamp: new Date(Date.now() - 1000 * 60 * 5),
        status: 'investigating',
        cameraId: 'CAM-003'
      },
      {
        id: 'alert-002',
        type: 'inventory',
        severity: 'medium',
        title: 'Inventory Discrepancy',
        description: 'Missing 3 units of high-value item SKU-8834. Last scan shows movement but no sale recorded.',
        location: 'Storage Room B',
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        status: 'active',
        cameraId: 'CAM-008'
      },
      {
        id: 'alert-003',
        type: 'door_alarm',
        severity: 'low',
        title: 'Door Sensor Triggered',
        description: 'Emergency exit door opened. Staff verification in progress.',
        location: 'Emergency Exit - Back',
        timestamp: new Date(Date.now() - 1000 * 60 * 45),
        status: 'resolved',
        employeeInvolved: 'Staff ID: EMP-042'
      },
      {
        id: 'alert-004',
        type: 'theft',
        severity: 'critical',
        title: 'Confirmed Theft Incident',
        description: 'Customer bypassed checkout with concealed merchandise. Security footage captured.',
        location: 'Main Entrance',
        timestamp: new Date(Date.now() - 1000 * 60 * 120),
        status: 'resolved',
        cameraId: 'CAM-001'
      },
      {
        id: 'alert-005',
        type: 'access',
        severity: 'medium',
        title: 'Unauthorized Access Attempt',
        description: 'Failed keycard attempt at manager office after hours.',
        location: 'Manager Office',
        timestamp: new Date(Date.now() - 1000 * 60 * 180),
        status: 'dismissed'
      }
    ]

    const zones: SecurityZone[] = [
      { id: 'zone-1', name: 'Main Entrance', status: 'secure', cameras: 4, activeCameras: 4, riskLevel: 15 },
      { id: 'zone-2', name: 'Electronics Section', status: 'alert', cameras: 6, activeCameras: 6, lastIncident: '5 min ago', riskLevel: 78 },
      { id: 'zone-3', name: 'Checkout Area', status: 'secure', cameras: 8, activeCameras: 8, riskLevel: 22 },
      { id: 'zone-4', name: 'Storage & Back', status: 'warning', cameras: 4, activeCameras: 3, lastIncident: '30 min ago', riskLevel: 45 },
      { id: 'zone-5', name: 'Parking Lot', status: 'secure', cameras: 6, activeCameras: 6, riskLevel: 12 },
      { id: 'zone-6', name: 'Staff Areas', status: 'secure', cameras: 3, activeCameras: 3, riskLevel: 8 }
    ]

    return {
      stores,
      alerts,
      zones,
      summary: {
        activeAlerts: alerts.filter(a => a.status === 'active' || a.status === 'investigating').length,
        resolvedToday: alerts.filter(a => a.status === 'resolved').length,
        totalIncidents: alerts.length,
        shrinkageValue: 2340,
        shrinkageTrend: -12,
        securityScore: 87,
        activeCameras: zones.reduce((sum, z) => sum + z.activeCameras, 0),
        totalCameras: zones.reduce((sum, z) => sum + z.cameras, 0)
      }
    }
  }

  function refreshData() {
    setSecurityData(generateMockSecurityData())
    setLastUpdated(new Date())
  }

  function formatCurrency(amount: number) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount)
  }

  function getTimeSince(date: Date) {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)
    if (seconds < 60) return 'Just now'
    if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hrs ago`
    return `${Math.floor(seconds / 86400)} days ago`
  }

  const currentStore = securityData.stores.find(store => store.id === selectedStore) || securityData.stores[0]

  const filteredAlerts = securityData.alerts.filter(alert => {
    if (activeAlertFilter === 'all') return true
    if (activeAlertFilter === 'active') return alert.status === 'active' || alert.status === 'investigating'
    return alert.severity === activeAlertFilter
  })

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

  const getSeverityStyle = (severity: string) => {
    switch (severity) {
      case 'critical':
        return { bg: 'bg-red-500/10', text: 'text-red-600 dark:text-red-400', dot: 'bg-red-500', border: 'border-red-200 dark:border-red-500/20' }
      case 'high':
        return { bg: 'bg-orange-500/10', text: 'text-orange-600 dark:text-orange-400', dot: 'bg-orange-500', border: 'border-orange-200 dark:border-orange-500/20' }
      case 'medium':
        return { bg: 'bg-amber-500/10', text: 'text-amber-600 dark:text-amber-400', dot: 'bg-amber-500', border: 'border-amber-200 dark:border-amber-500/20' }
      case 'low':
        return { bg: 'bg-blue-500/10', text: 'text-blue-600 dark:text-blue-400', dot: 'bg-blue-500', border: 'border-blue-200 dark:border-blue-500/20' }
      default:
        return { bg: 'bg-zinc-500/10', text: 'text-zinc-600 dark:text-zinc-400', dot: 'bg-zinc-500', border: 'border-zinc-200 dark:border-zinc-700' }
    }
  }

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'active':
        return { bg: 'bg-red-500', text: 'text-white' }
      case 'investigating':
        return { bg: 'bg-amber-500', text: 'text-white' }
      case 'resolved':
        return { bg: 'bg-emerald-500', text: 'text-white' }
      case 'dismissed':
        return { bg: 'bg-zinc-500', text: 'text-white' }
      default:
        return { bg: 'bg-zinc-500', text: 'text-white' }
    }
  }

  const getZoneStatusStyle = (status: string) => {
    switch (status) {
      case 'secure':
        return { bg: 'bg-emerald-500/10', border: 'border-emerald-200 dark:border-emerald-500/20', icon: ShieldCheck, iconColor: 'text-emerald-500' }
      case 'alert':
        return { bg: 'bg-red-500/10', border: 'border-red-200 dark:border-red-500/20', icon: ShieldAlert, iconColor: 'text-red-500' }
      case 'warning':
        return { bg: 'bg-amber-500/10', border: 'border-amber-200 dark:border-amber-500/20', icon: AlertTriangle, iconColor: 'text-amber-500' }
      default:
        return { bg: 'bg-zinc-500/10', border: 'border-zinc-200 dark:border-zinc-700', icon: Shield, iconColor: 'text-zinc-500' }
    }
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'theft': return ShieldAlert
      case 'suspicious': return Eye
      case 'door_alarm': return Unlock
      case 'inventory': return Package
      case 'access': return Lock
      case 'system': return AlertCircle
      default: return AlertTriangle
    }
  }

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-zinc-50 via-red-50/30 to-orange-50/20 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-800">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 shadow-lg shadow-red-500/25">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-zinc-900 dark:text-white">Loss Prevention</h1>
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
                  {securityData.stores.map((store) => (
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
              <div className={`h-2 w-2 rounded-full ${securityData.summary.activeAlerts > 0 ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'}`} />
              <span className="text-zinc-600 dark:text-zinc-400">
                <span className={`font-semibold ${securityData.summary.activeAlerts > 0 ? 'text-red-600 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                  {securityData.summary.activeAlerts}
                </span> Active Alerts
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Camera className="h-3.5 w-3.5 text-blue-500" />
              <span className="text-zinc-600 dark:text-zinc-400">
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  {securityData.summary.activeCameras}/{securityData.summary.totalCameras}
                </span> Cameras Online
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Activity className="h-3.5 w-3.5 text-emerald-500" />
              <span className="text-zinc-600 dark:text-zinc-400">
                Security Score: <span className="font-semibold text-emerald-600 dark:text-emerald-400">{securityData.summary.securityScore}%</span>
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
              title="Active Alerts"
              value={securityData.summary.activeAlerts}
              subtitle="Require attention"
              icon={AlertTriangle}
              gradient="linear-gradient(135deg, #ef4444 0%, #f87171 100%)"
            />
            <MetricCard
              title="Resolved Today"
              value={securityData.summary.resolvedToday}
              subtitle="Incidents handled"
              icon={CheckCircle}
              gradient="linear-gradient(135deg, #10b981 0%, #34d399 100%)"
            />
            <MetricCard
              title="Shrinkage Value"
              value={formatCurrency(securityData.summary.shrinkageValue)}
              subtitle="This month"
              icon={DollarSign}
              gradient="linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)"
              trend="down"
              trendValue={`${securityData.summary.shrinkageTrend}% vs last month`}
              trendInverted={true}
            />
            <MetricCard
              title="Security Score"
              value={`${securityData.summary.securityScore}%`}
              subtitle="Overall rating"
              icon={ShieldCheck}
              gradient="linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)"
              trend="up"
              trendValue="+5% improvement"
            />
          </div>

          {/* Security Zones */}
          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-5 w-5 text-red-500" />
              <h2 className="font-semibold text-zinc-900 dark:text-white">Security Zones</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {securityData.zones.map((zone) => {
                const style = getZoneStatusStyle(zone.status)
                const Icon = style.icon
                return (
                  <div
                    key={zone.id}
                    className={`p-4 rounded-xl ${style.bg} border ${style.border} transition-all hover:scale-105`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className={`h-4 w-4 ${style.iconColor}`} />
                      <span className="text-xs font-medium uppercase text-zinc-500">{zone.status}</span>
                    </div>
                    <div className="font-semibold text-sm text-zinc-900 dark:text-white mb-1">{zone.name}</div>
                    <div className="text-xs text-zinc-500">
                      {zone.activeCameras}/{zone.cameras} cameras
                    </div>
                    {zone.lastIncident && (
                      <div className="text-xs text-red-500 mt-1">
                        Last incident: {zone.lastIncident}
                      </div>
                    )}
                    {/* Risk Level Bar */}
                    <div className="mt-2">
                      <div className="h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            zone.riskLevel > 60 ? 'bg-red-500' : zone.riskLevel > 30 ? 'bg-amber-500' : 'bg-emerald-500'
                          }`}
                          style={{ width: `${zone.riskLevel}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Alerts List */}
          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-red-500" />
                <h2 className="font-semibold text-zinc-900 dark:text-white">Security Alerts</h2>
              </div>
              <div className="flex gap-1">
                {['all', 'active', 'critical', 'high'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveAlertFilter(filter)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                      activeAlertFilter === filter
                        ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                    }`}
                  >
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              {filteredAlerts.map((alert) => {
                const severity = getSeverityStyle(alert.severity)
                const status = getStatusStyle(alert.status)
                const AlertIcon = getAlertIcon(alert.type)
                return (
                  <div
                    key={alert.id}
                    className={`p-4 rounded-xl ${severity.bg} border ${severity.border} transition-all hover:shadow-md`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${severity.bg}`}>
                          <AlertIcon className={`h-5 w-5 ${severity.text}`} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-sm text-zinc-900 dark:text-white">{alert.title}</h3>
                            <Badge className={`${status.bg} ${status.text} border-0 text-xs`}>
                              {alert.status}
                            </Badge>
                            <Badge className={`${severity.bg} ${severity.text} border-0 text-xs`}>
                              {alert.severity}
                            </Badge>
                          </div>
                          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">{alert.description}</p>
                          <div className="flex items-center gap-4 text-xs text-zinc-500">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {alert.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {getTimeSince(alert.timestamp)}
                            </span>
                            {alert.cameraId && (
                              <span className="flex items-center gap-1">
                                <Camera className="h-3 w-3" />
                                {alert.cameraId}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {alert.cameraId && (
                          <Button variant="outline" size="sm" className="h-8 border-zinc-200 dark:border-zinc-700">
                            <Video className="h-3.5 w-3.5 mr-1" />
                            View
                          </Button>
                        )}
                        {(alert.status === 'active' || alert.status === 'investigating') && (
                          <Button size="sm" className="h-8 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white border-0">
                            Resolve
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* AI Insights CTA */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-red-500 via-orange-500 to-amber-500 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"30\" height=\"30\" viewBox=\"0 0 30 30\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z\" fill=\"rgba(255,255,255,0.1)\"%3E%3C/path%3E%3C/svg%3E')] opacity-50" />
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">AI Theft Detection</h3>
                  <p className="text-white/80 text-sm mt-1">
                    Advanced ML-powered behavior analysis to detect suspicious patterns in real-time
                  </p>
                </div>
              </div>
              <Button className="bg-white text-red-600 hover:bg-white/90 font-semibold">
                <Zap className="h-4 w-4 mr-2" />
                Enable AI Detection
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
