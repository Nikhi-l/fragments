'use client'

import { StaffManagementFragmentSchema } from '@/lib/schema'
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
  Users,
  Clock,
  CheckCircle,
  AlertTriangle,
  UserCheck,
  Calendar,
  RefreshCw,
  Target,
  MapPin,
  Star,
  TrendingUp,
  Coffee,
  UserPlus,
  BarChart3,
  Activity,
  Zap,
  Award,
  Bell,
  MessageSquare,
  Eye,
  ChevronRight,
  Sparkles,
  Timer,
  RotateCcw
} from 'lucide-react'
import { useState, useMemo } from 'react'
import Image from 'next/image'

interface Employee {
  id: string
  name: string
  role: string
  department: string
  status: 'active' | 'break' | 'lunch' | 'offline' | 'busy'
  currentTask?: string
  location: string
  shiftStart: string
  shiftEnd: string
  breaksTaken: number
  maxBreaks: number
  performance: number
  efficiency: number
  tasksCompleted: number
  tasksAssigned: number
  lastActivity: string
  avatar: string
  initials: string
}

interface Task {
  id: string
  title: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  status: 'pending' | 'in_progress' | 'completed' | 'overdue'
  assignedTo?: string
  location: string
  estimatedTime: number
}

interface CrowdData {
  location: string
  currentCount: number
  staffNeeded: number
  staffAssigned: number
  priority: 'low' | 'medium' | 'high'
  trend: 'increasing' | 'decreasing' | 'stable'
}

export function FragmentStaffManagement({ fragment }: { fragment: StaffManagementFragmentSchema }) {
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all')
  const [autoAssignEnabled, setAutoAssignEnabled] = useState(true)

  const employees: Employee[] = useMemo(() => [
    { id: 'emp-1', name: 'Sarah Johnson', role: 'Store Manager', department: 'Management', status: 'active', currentTask: 'Floor supervision', location: 'Main Floor', shiftStart: '09:00', shiftEnd: '18:00', breaksTaken: 1, maxBreaks: 3, performance: 95, efficiency: 92, tasksCompleted: 12, tasksAssigned: 14, lastActivity: '2 min ago', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face', initials: 'SJ' },
    { id: 'emp-2', name: 'Mike Chen', role: 'Cashier', department: 'Sales', status: 'active', currentTask: 'Checkout duty', location: 'Checkout 1', shiftStart: '10:00', shiftEnd: '19:00', breaksTaken: 0, maxBreaks: 3, performance: 88, efficiency: 85, tasksCompleted: 8, tasksAssigned: 10, lastActivity: '5 min ago', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', initials: 'MC' },
    { id: 'emp-3', name: 'Emily Davis', role: 'Sales Associate', department: 'Sales', status: 'break', location: 'Break Room', shiftStart: '08:00', shiftEnd: '17:00', breaksTaken: 2, maxBreaks: 3, performance: 92, efficiency: 90, tasksCompleted: 15, tasksAssigned: 16, lastActivity: '15 min ago', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face', initials: 'ED' },
    { id: 'emp-4', name: 'James Wilson', role: 'Stock Clerk', department: 'Operations', status: 'active', currentTask: 'Restocking Electronics', location: 'Electronics', shiftStart: '07:00', shiftEnd: '16:00', breaksTaken: 2, maxBreaks: 3, performance: 85, efficiency: 88, tasksCompleted: 20, tasksAssigned: 22, lastActivity: '1 min ago', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face', initials: 'JW' },
    { id: 'emp-5', name: 'Lisa Brown', role: 'Cashier', department: 'Sales', status: 'offline', location: 'N/A', shiftStart: '14:00', shiftEnd: '23:00', breaksTaken: 0, maxBreaks: 3, performance: 78, efficiency: 75, tasksCompleted: 0, tasksAssigned: 0, lastActivity: 'Not started', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face', initials: 'LB' },
    { id: 'emp-6', name: 'David Lee', role: 'Security', department: 'Security', status: 'active', currentTask: 'Entrance patrol', location: 'Entrance', shiftStart: '06:00', shiftEnd: '15:00', breaksTaken: 1, maxBreaks: 3, performance: 90, efficiency: 94, tasksCompleted: 5, tasksAssigned: 5, lastActivity: '3 min ago', avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face', initials: 'DL' },
    { id: 'emp-7', name: 'Anna Garcia', role: 'Customer Service', department: 'Customer Service', status: 'busy', currentTask: 'Handling complaint', location: 'Service Desk', shiftStart: '09:00', shiftEnd: '18:00', breaksTaken: 1, maxBreaks: 3, performance: 94, efficiency: 91, tasksCompleted: 18, tasksAssigned: 20, lastActivity: 'Now', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face', initials: 'AG' },
    { id: 'emp-8', name: 'Tom Anderson', role: 'Sales Associate', department: 'Sales', status: 'lunch', location: 'Break Room', shiftStart: '10:00', shiftEnd: '19:00', breaksTaken: 1, maxBreaks: 3, performance: 87, efficiency: 84, tasksCompleted: 9, tasksAssigned: 12, lastActivity: '30 min ago', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face', initials: 'TA' }
  ], [])

  const tasks: Task[] = useMemo(() => [
    { id: 'task-1', title: 'Restock Electronics Section', priority: 'high', status: 'in_progress', assignedTo: 'emp-4', location: 'Electronics', estimatedTime: 45 },
    { id: 'task-2', title: 'Customer Assistance - Aisle 3', priority: 'urgent', status: 'pending', location: 'Aisle 3', estimatedTime: 15 },
    { id: 'task-3', title: 'Price Check - Clothing', priority: 'medium', status: 'pending', location: 'Clothing', estimatedTime: 10 },
    { id: 'task-4', title: 'Clean Checkout Area', priority: 'low', status: 'completed', assignedTo: 'emp-2', location: 'Checkout', estimatedTime: 20 },
    { id: 'task-5', title: 'Inventory Count - Storage', priority: 'high', status: 'pending', location: 'Storage', estimatedTime: 60 },
    { id: 'task-6', title: 'Handle Customer Return', priority: 'medium', status: 'in_progress', assignedTo: 'emp-7', location: 'Service Desk', estimatedTime: 15 }
  ], [])

  const crowdData: CrowdData[] = useMemo(() => [
    { location: 'Main Entrance', currentCount: 45, staffNeeded: 3, staffAssigned: 2, priority: 'high', trend: 'increasing' },
    { location: 'Checkout Area', currentCount: 32, staffNeeded: 4, staffAssigned: 3, priority: 'high', trend: 'stable' },
    { location: 'Electronics', currentCount: 28, staffNeeded: 2, staffAssigned: 2, priority: 'medium', trend: 'decreasing' },
    { location: 'Clothing', currentCount: 18, staffNeeded: 2, staffAssigned: 1, priority: 'medium', trend: 'increasing' },
    { location: 'Grocery', currentCount: 52, staffNeeded: 3, staffAssigned: 3, priority: 'low', trend: 'stable' }
  ], [])

  function refreshData() {
    setLastUpdated(new Date())
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-500'
      case 'break': return 'bg-amber-500'
      case 'lunch': return 'bg-orange-500'
      case 'offline': return 'bg-zinc-400'
      case 'busy': return 'bg-blue-500'
      default: return 'bg-zinc-400'
    }
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30'
      case 'break': return 'bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/30'
      case 'lunch': return 'bg-orange-100 dark:bg-orange-500/20 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-500/30'
      case 'offline': return 'bg-zinc-100 dark:bg-zinc-500/20 text-zinc-700 dark:text-zinc-400 border-zinc-200 dark:border-zinc-500/30'
      case 'busy': return 'bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-500/30'
      default: return 'bg-zinc-100 dark:bg-zinc-500/20 text-zinc-700 dark:text-zinc-400'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400'
      case 'medium': return 'bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400'
      case 'high': return 'bg-orange-100 dark:bg-orange-500/20 text-orange-700 dark:text-orange-400'
      case 'urgent': return 'bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400'
      default: return 'bg-zinc-100 dark:bg-zinc-500/20 text-zinc-700 dark:text-zinc-400'
    }
  }

  const activeEmployees = employees.filter(emp => emp.status === 'active' || emp.status === 'busy')
  const onBreakEmployees = employees.filter(emp => emp.status === 'break' || emp.status === 'lunch')
  const pendingTasks = tasks.filter(task => task.status === 'pending')
  const avgPerformance = Math.round(employees.reduce((acc, emp) => acc + emp.performance, 0) / employees.length)

  // Metric Card Component
  const MetricCard = ({ title, value, subtitle, icon: Icon, gradient }: { title: string, value: string | number, subtitle: string, icon: any, gradient: string }) => (
    <div className="relative group">
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl -z-10" style={{ background: gradient }} />
      <div className="p-5 rounded-2xl bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:border-zinc-300 dark:hover:border-zinc-600">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{title}</p>
            <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{value}</div>
            <p className="text-xs text-zinc-500">{subtitle}</p>
          </div>
          <div className="p-3 rounded-xl" style={{ background: gradient }}>
            <Icon className="h-5 w-5 text-white" />
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-20 backdrop-blur-xl bg-white/80 dark:bg-zinc-900/80 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 shadow-lg shadow-pink-500/25">
              <Users className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Staff Management</h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">{fragment.store_name}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800">
              <span className="text-sm text-zinc-600 dark:text-zinc-400">Auto-assign:</span>
              <Button
                onClick={() => setAutoAssignEnabled(!autoAssignEnabled)}
                variant="ghost"
                size="sm"
                className={`rounded-lg ${autoAssignEnabled ? 'bg-pink-100 dark:bg-pink-500/20 text-pink-700 dark:text-pink-400' : ''}`}
              >
                <Zap className={`h-4 w-4 ${autoAssignEnabled ? 'text-pink-500' : 'text-zinc-400'}`} />
              </Button>
            </div>
            <Badge variant="secondary" className="rounded-xl px-3 py-1">
              <Clock className="h-3 w-3 mr-1" />
              {fragment.shift_period}
            </Badge>
            <Button onClick={refreshData} variant="outline" size="sm" className="rounded-xl">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Real-time Status Bar */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-pink-500/10 via-rose-500/10 to-red-500/10 border border-pink-200 dark:border-pink-500/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Live Tracking</span>
              </div>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-800/50">
                  <UserCheck className="h-4 w-4 text-emerald-500" />
                  <span className="font-medium">{activeEmployees.length}</span>
                  <span className="text-zinc-500">Active</span>
                </div>
                <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-800/50">
                  <Coffee className="h-4 w-4 text-amber-500" />
                  <span className="font-medium">{onBreakEmployees.length}</span>
                  <span className="text-zinc-500">On Break</span>
                </div>
                <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-800/50">
                  <Target className="h-4 w-4 text-blue-500" />
                  <span className="font-medium">{pendingTasks.length}</span>
                  <span className="text-zinc-500">Pending Tasks</span>
                </div>
              </div>
            </div>
            <span className="text-xs text-zinc-500">Updated: {lastUpdated.toLocaleTimeString()}</span>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Active Staff"
            value={activeEmployees.length}
            subtitle={`${Math.round((activeEmployees.length / employees.length) * 100)}% on duty`}
            icon={UserCheck}
            gradient="linear-gradient(135deg, #10b981 0%, #059669 100%)"
          />
          <MetricCard
            title="On Break"
            value={onBreakEmployees.length}
            subtitle="Scheduled breaks"
            icon={Coffee}
            gradient="linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
          />
          <MetricCard
            title="Pending Tasks"
            value={pendingTasks.length}
            subtitle={`${tasks.filter(t => t.priority === 'urgent').length} urgent`}
            icon={Target}
            gradient="linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)"
          />
          <MetricCard
            title="Avg Performance"
            value={`${avgPerformance}%`}
            subtitle="+5% from last week"
            icon={Star}
            gradient="linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Current Staff Status */}
          <div className="lg:col-span-2 p-6 rounded-2xl bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600">
                  <Users className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Team Status</h3>
                  <p className="text-sm text-zinc-500">{employees.length} total members</p>
                </div>
              </div>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="w-36 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="all">All Depts</SelectItem>
                  <SelectItem value="Sales">Sales</SelectItem>
                  <SelectItem value="Operations">Operations</SelectItem>
                  <SelectItem value="Security">Security</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
              {employees
                .filter(emp => selectedDepartment === 'all' || emp.department === selectedDepartment)
                .map((employee) => (
                <div
                  key={employee.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700/50 hover:border-zinc-300 dark:hover:border-zinc-600 transition-all"
                >
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-white font-bold">
                        {employee.initials}
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-zinc-800 ${getStatusColor(employee.status)}`} />
                    </div>
                    <div>
                      <div className="font-medium text-zinc-900 dark:text-zinc-100">{employee.name}</div>
                      <div className="text-sm text-zinc-500">{employee.role} - {employee.location}</div>
                      {employee.currentTask && (
                        <div className="text-xs text-pink-600 dark:text-pink-400 mt-1">
                          <span className="inline-flex items-center">
                            <Activity className="h-3 w-3 mr-1" />
                            {employee.currentTask}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    <Badge className={`text-xs ${getStatusBadgeColor(employee.status)}`}>
                      {employee.status}
                    </Badge>
                    <div className="text-xs text-zinc-500">{employee.shiftStart} - {employee.shiftEnd}</div>
                    <div className="flex items-center justify-end space-x-1 text-xs">
                      <Star className="h-3 w-3 text-amber-500" />
                      <span className="font-medium">{employee.performance}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Crowd Monitoring */}
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600">
                <BarChart3 className="h-4 w-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Crowd Monitoring</h3>
                <p className="text-sm text-zinc-500">Real-time location data</p>
              </div>
            </div>

            <div className="space-y-4">
              {crowdData.map((area, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-zinc-400" />
                      <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{area.location}</span>
                      {area.trend === 'increasing' && <TrendingUp className="h-3 w-3 text-red-500" />}
                      {area.trend === 'decreasing' && <TrendingUp className="h-3 w-3 text-emerald-500 rotate-180" />}
                    </div>
                    <Badge className={getPriorityColor(area.priority)} variant="secondary">
                      {area.priority}
                    </Badge>
                  </div>
                  <div className="text-xs text-zinc-500">
                    {area.currentCount} visitors - Staff: {area.staffAssigned}/{area.staffNeeded}
                  </div>
                  <div className="h-2 bg-zinc-100 dark:bg-zinc-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        area.staffAssigned >= area.staffNeeded ? 'bg-emerald-500' :
                        area.staffAssigned >= area.staffNeeded * 0.7 ? 'bg-amber-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${Math.min((area.staffAssigned / area.staffNeeded) * 100, 100)}%` }}
                    />
                  </div>
                  {area.staffAssigned < area.staffNeeded && autoAssignEnabled && (
                    <Button size="sm" variant="outline" className="h-7 text-xs rounded-lg w-full">
                      <UserPlus className="h-3 w-3 mr-1" />
                      Auto-assign Staff
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Task Management */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pending Tasks */}
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600">
                  <Target className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Pending Tasks</h3>
                  <p className="text-sm text-zinc-500">{pendingTasks.length} tasks waiting</p>
                </div>
              </div>
            </div>

            <div className="space-y-3 max-h-[280px] overflow-y-auto">
              {pendingTasks.map((task) => (
                <div key={task.id} className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700/50">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="font-medium text-zinc-900 dark:text-zinc-100 text-sm">{task.title}</div>
                      <div className="text-xs text-zinc-500 mt-1">{task.location} - {task.estimatedTime}min</div>
                      <Badge className={`text-xs mt-2 ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </Badge>
                    </div>
                    <Button size="sm" variant="outline" className="rounded-lg h-8">
                      <UserPlus className="h-3 w-3 mr-1" />
                      Assign
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alerts & Notifications */}
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 rounded-xl bg-gradient-to-br from-red-500 to-rose-600">
                <Bell className="h-4 w-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Alerts</h3>
                <p className="text-sm text-zinc-500">Requires attention</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
                  <span className="text-sm font-medium text-red-700 dark:text-red-300">High Priority</span>
                </div>
                <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                  Checkout area needs 1 more staff member
                </p>
              </div>

              <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20">
                <div className="flex items-center space-x-2">
                  <Timer className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  <span className="text-sm font-medium text-amber-700 dark:text-amber-300">Break Reminder</span>
                </div>
                <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
                  Mike Chen's break is overdue by 15 minutes
                </p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20">
                <div className="flex items-center space-x-2">
                  <Award className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Achievement</span>
                </div>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
                  Team exceeded daily productivity target by 12%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Summary */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-pink-500/10 via-rose-500/10 to-red-500/10 border border-pink-200 dark:border-pink-500/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-xl bg-pink-100 dark:bg-pink-500/20">
                <Sparkles className="h-5 w-5 text-pink-600 dark:text-pink-400" />
              </div>
              <div>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">AI Optimization Available</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Optimize schedules based on predicted crowd patterns
                </p>
              </div>
            </div>
            <Button className="rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700">
              <RotateCcw className="h-4 w-4 mr-2" />
              Optimize Schedule
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
