'use client'

import { StaffManagementFragmentSchema } from '@/lib/schema'
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
  Settings,
  BarChart3,
  Activity,
  Zap,
  Timer,
  Award,
  Bell,
  MessageSquare,
  Phone,
  Mail,
  Edit,
  Plus,
  Minus,
  RotateCcw,
  PlayCircle,
  PauseCircle,
  StopCircle,
  ArrowRight,
  ArrowLeft,
  ChevronUp,
  ChevronDown,
  Filter,
  Search,
  Download,
  Upload,
  Eye,
  EyeOff
} from 'lucide-react'
import { useState, useEffect } from 'react'

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
  skills: string[]
  certifications: string[]
  hourlyRate: number
  overtimeHours: number
  avatar: string
}

interface Task {
  id: string
  title: string
  description: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  status: 'pending' | 'in_progress' | 'completed' | 'overdue'
  assignedTo?: string
  assignedBy: string
  location: string
  estimatedTime: number
  actualTime?: number
  deadline: string
  category: string
  requiredSkills: string[]
  customerImpact: 'low' | 'medium' | 'high'
}

interface BreakSchedule {
  employeeId: string
  breakType: 'short' | 'lunch' | 'extended'
  startTime: string
  endTime: string
  duration: number
  status: 'scheduled' | 'active' | 'completed' | 'missed'
  location: string
}

interface CrowdData {
  location: string
  currentCount: number
  averageCount: number
  peakTime: string
  trend: 'increasing' | 'decreasing' | 'stable'
  staffNeeded: number
  staffAssigned: number
  priority: 'low' | 'medium' | 'high'
}

export function FragmentStaffManagement({ fragment }: { fragment: StaffManagementFragmentSchema }) {
  const [employees, setEmployees] = useState<Employee[]>(generateMockEmployees())
  const [tasks, setTasks] = useState<Task[]>(generateMockTasks())
  const [breakSchedules, setBreakSchedules] = useState<BreakSchedule[]>(generateMockBreakSchedules())
  const [crowdData, setCrowdData] = useState<CrowdData[]>(generateMockCrowdData())
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all')
  const [selectedShift, setSelectedShift] = useState<string>('current')
  const [autoAssignEnabled, setAutoAssignEnabled] = useState(true)
  const [optimizationMode, setOptimizationMode] = useState<'efficiency' | 'coverage' | 'balanced'>('balanced')

  function generateMockEmployees(): Employee[] {
    const roles = ['Cashier', 'Sales Associate', 'Stock Clerk', 'Security', 'Manager', 'Customer Service', 'Cleaner', 'Supervisor']
    const departments = ['Sales', 'Operations', 'Security', 'Management', 'Customer Service', 'Maintenance']
    const locations = ['Checkout 1', 'Checkout 2', 'Electronics', 'Clothing', 'Grocery', 'Storage', 'Entrance', 'Customer Service']
    const skills = ['Customer Service', 'Cash Handling', 'Inventory Management', 'Security', 'Leadership', 'Problem Solving', 'Communication', 'Technical Support']
    
    const names = [
      'Sarah Johnson', 'Mike Chen', 'Emily Davis', 'James Wilson', 'Lisa Brown', 'David Lee',
      'Anna Garcia', 'Tom Anderson', 'Maria Rodriguez', 'Chris Taylor', 'Jessica White', 'Ryan Clark',
      'Amanda Lewis', 'Kevin Martinez', 'Nicole Thompson', 'Daniel Harris', 'Rachel Green', 'Mark Turner',
      'Stephanie Moore', 'Jason Miller', 'Ashley Jones', 'Brandon Scott', 'Melissa Adams', 'Tyler Young'
    ]

    // Professional avatar URLs from Unsplash
    const avatars = [
      'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1463453091185-61582044d556?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1521119989659-a83eee488004?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1488161628813-04466f872be2?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face'
    ]
    
    return Array.from({ length: 24 }, (_, i) => ({
      id: `emp-${i + 1}`,
      name: names[i],
      role: roles[Math.floor(Math.random() * roles.length)],
      department: departments[Math.floor(Math.random() * departments.length)],
      status: ['active', 'break', 'lunch', 'offline', 'busy'][Math.floor(Math.random() * 5)] as Employee['status'],
      currentTask: Math.random() > 0.3 ? `Task ${Math.floor(Math.random() * 50) + 1}` : undefined,
      location: locations[Math.floor(Math.random() * locations.length)],
      shiftStart: ['06:00', '08:00', '10:00', '14:00', '18:00'][Math.floor(Math.random() * 5)],
      shiftEnd: ['14:00', '16:00', '18:00', '22:00', '02:00'][Math.floor(Math.random() * 5)],
      breaksTaken: Math.floor(Math.random() * 3),
      maxBreaks: 3,
      performance: Math.floor(Math.random() * 30) + 70,
      efficiency: Math.floor(Math.random() * 25) + 75,
      tasksCompleted: Math.floor(Math.random() * 15) + 5,
      tasksAssigned: Math.floor(Math.random() * 20) + 8,
      lastActivity: `${Math.floor(Math.random() * 60)} min ago`,
      skills: skills.slice(0, Math.floor(Math.random() * 4) + 2),
      certifications: ['Food Safety', 'First Aid', 'Security', 'Customer Service'][Math.floor(Math.random() * 4)] ? ['Food Safety'] : [],
      hourlyRate: Math.floor(Math.random() * 10) + 15,
      overtimeHours: Math.floor(Math.random() * 8),
      avatar: avatars[i % avatars.length],
    }))
  }

  function generateMockTasks(): Task[] {
    const taskTitles = [
      'Restock Electronics Section', 'Customer Assistance - Aisle 3', 'Price Check - Clothing',
      'Clean Checkout Area', 'Inventory Count - Storage', 'Handle Customer Complaint',
      'Security Check - Entrance', 'Process Returns', 'Update Display - Promotions',
      'Assist with Heavy Lifting', 'Train New Employee', 'Equipment Maintenance'
    ]
    
    const categories = ['Customer Service', 'Inventory', 'Cleaning', 'Security', 'Training', 'Maintenance']
    const locations = ['Checkout', 'Electronics', 'Clothing', 'Grocery', 'Storage', 'Entrance', 'Customer Service']
    
    return Array.from({ length: 18 }, (_, i) => ({
      id: `task-${i + 1}`,
      title: taskTitles[Math.floor(Math.random() * taskTitles.length)],
      description: `Detailed description for task ${i + 1}`,
      priority: ['low', 'medium', 'high', 'urgent'][Math.floor(Math.random() * 4)] as Task['priority'],
      status: ['pending', 'in_progress', 'completed', 'overdue'][Math.floor(Math.random() * 4)] as Task['status'],
      assignedTo: Math.random() > 0.3 ? `emp-${Math.floor(Math.random() * 24) + 1}` : undefined,
      assignedBy: 'manager-1',
      location: locations[Math.floor(Math.random() * locations.length)],
      estimatedTime: Math.floor(Math.random() * 120) + 30,
      actualTime: Math.random() > 0.5 ? Math.floor(Math.random() * 150) + 20 : undefined,
      deadline: new Date(Date.now() + Math.random() * 24 * 60 * 60 * 1000).toISOString(),
      category: categories[Math.floor(Math.random() * categories.length)],
      requiredSkills: ['Customer Service', 'Technical Support'][Math.floor(Math.random() * 2)] ? ['Customer Service'] : [],
      customerImpact: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as Task['customerImpact'],
    }))
  }

  function generateMockBreakSchedules(): BreakSchedule[] {
    const employees = generateMockEmployees()
    return employees.slice(0, 12).map((emp, i) => ({
      employeeId: emp.id,
      breakType: ['short', 'lunch', 'extended'][Math.floor(Math.random() * 3)] as BreakSchedule['breakType'],
      startTime: `${Math.floor(Math.random() * 12) + 8}:${Math.random() > 0.5 ? '00' : '30'}`,
      endTime: `${Math.floor(Math.random() * 12) + 9}:${Math.random() > 0.5 ? '00' : '30'}`,
      duration: [15, 30, 60][Math.floor(Math.random() * 3)],
      status: ['scheduled', 'active', 'completed', 'missed'][Math.floor(Math.random() * 4)] as BreakSchedule['status'],
      location: 'Break Room',
    }))
  }

  function generateMockCrowdData(): CrowdData[] {
    const locations = ['Entrance', 'Checkout Area', 'Electronics', 'Clothing', 'Grocery', 'Customer Service', 'Food Court']
    
    return locations.map(location => ({
      location,
      currentCount: Math.floor(Math.random() * 50) + 10,
      averageCount: Math.floor(Math.random() * 40) + 15,
      peakTime: `${Math.floor(Math.random() * 12) + 8}:00`,
      trend: ['increasing', 'decreasing', 'stable'][Math.floor(Math.random() * 3)] as CrowdData['trend'],
      staffNeeded: Math.floor(Math.random() * 5) + 2,
      staffAssigned: Math.floor(Math.random() * 4) + 1,
      priority: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as CrowdData['priority'],
    }))
  }

  function refreshData() {
    setEmployees(generateMockEmployees())
    setTasks(generateMockTasks())
    setBreakSchedules(generateMockBreakSchedules())
    setCrowdData(generateMockCrowdData())
    setLastUpdated(new Date())
  }

  function getStatusColor(status: string) {
    switch (status) {
      case 'active': return 'bg-green-500'
      case 'break': return 'bg-yellow-500'
      case 'lunch': return 'bg-orange-500'
      case 'offline': return 'bg-gray-500'
      case 'busy': return 'bg-blue-500'
      default: return 'bg-gray-500'
    }
  }

  function getPriorityColor(priority: string) {
    switch (priority) {
      case 'low': return 'text-green-600 border-green-600'
      case 'medium': return 'text-yellow-600 border-yellow-600'
      case 'high': return 'text-orange-600 border-orange-600'
      case 'urgent': return 'text-red-600 border-red-600'
      default: return 'text-gray-600 border-gray-600'
    }
  }

  function getTrendIcon(trend: string) {
    switch (trend) {
      case 'increasing': return <TrendingUp className="h-4 w-4 text-red-500" />
      case 'decreasing': return <ChevronDown className="h-4 w-4 text-green-500" />
      case 'stable': return <Minus className="h-4 w-4 text-blue-500" />
      default: return <Minus className="h-4 w-4 text-gray-500" />
    }
  }

  const activeEmployees = employees.filter(emp => emp.status === 'active' || emp.status === 'busy')
  const onBreakEmployees = employees.filter(emp => emp.status === 'break' || emp.status === 'lunch')
  const pendingTasks = tasks.filter(task => task.status === 'pending')
  const overdueTasks = tasks.filter(task => task.status === 'overdue')

  return (
    <div className="flex flex-col h-full p-4 space-y-6 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Users className="h-5 w-5 text-orange-600" />
          <h2 className="text-xl font-semibold">Staff Management - {fragment.store_name}</h2>
          <Badge variant="outline" className="border-orange-200 text-orange-700">{fragment.shift_period}</Badge>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Auto-assign:</span>
            <Button
              onClick={() => setAutoAssignEnabled(!autoAssignEnabled)}
              variant={autoAssignEnabled ? 'default' : 'outline'}
              size="sm"
              className={autoAssignEnabled ? 'bg-orange-500 hover:bg-orange-600' : 'border-orange-200 text-orange-700 hover:bg-orange-50'}
            >
              {autoAssignEnabled ? <Zap className="h-4 w-4" /> : <ZapOff className="h-4 w-4" />}
            </Button>
          </div>
          <Select value={optimizationMode} onValueChange={(value: any) => setOptimizationMode(value)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="efficiency">Efficiency</SelectItem>
              <SelectItem value="coverage">Coverage</SelectItem>
              <SelectItem value="balanced">Balanced</SelectItem>
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

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-orange-100 dark:border-orange-900/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Staff</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeEmployees.length}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((activeEmployees.length / employees.length) * 100)}% of total staff
            </p>
          </CardContent>
        </Card>

        <Card className="border-orange-100 dark:border-orange-900/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On Break</CardTitle>
            <Coffee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{onBreakEmployees.length}</div>
            <p className="text-xs text-muted-foreground">
              {breakSchedules.filter(b => b.status === 'active').length} scheduled breaks
            </p>
          </CardContent>
        </Card>

        <Card className="border-orange-100 dark:border-orange-900/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingTasks.length}</div>
            <p className="text-xs text-red-600">
              {overdueTasks.length} overdue tasks
            </p>
          </CardContent>
        </Card>

        <Card className="border-orange-100 dark:border-orange-900/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Performance</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(employees.reduce((acc, emp) => acc + emp.performance, 0) / employees.length)}%
            </div>
            <p className="text-xs text-green-600">
              +5% from last week
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Staff Status - Scrollable with Fixed Height */}
        <Card className="lg:col-span-2 border-orange-100 dark:border-orange-900/30">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-orange-600" />
                <span>Current Staff Status</span>
              </CardTitle>
              <div className="flex space-x-2">
                <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Depts</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="operations">Operations</SelectItem>
                    <SelectItem value="security">Security</SelectItem>
                    <SelectItem value="management">Management</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent className="h-full">
            {/* Fixed height container with scrolling - This div will expand to fill its parent */}
            <div className="h-full overflow-y-auto space-y-3 pr-2">
              {employees.map((employee) => (
                <div key={employee.id} className="flex items-center justify-between p-3 border rounded-lg border-orange-100 dark:border-orange-900/30 hover:bg-orange-50 dark:hover:bg-orange-950/30 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img
                        src={employee.avatar}
                        alt={employee.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-orange-200"
                      />
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(employee.status)}`} />
                    </div>
                    <div>
                      <div className="font-medium">{employee.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {employee.role} • {employee.location}
                      </div>
                      {employee.currentTask && (
                        <div className="text-xs text-orange-600">
                          Current: {employee.currentTask}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <Badge variant="outline" className="text-xs border-orange-200 text-orange-700">
                      {employee.status}
                    </Badge>
                    <div className="text-xs text-muted-foreground">
                      {employee.shiftStart} - {employee.shiftEnd}
                    </div>
                    <div className="flex items-center space-x-1 text-xs">
                      <Star className="h-3 w-3 text-yellow-500" />
                      <span>{employee.performance}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Crowd Monitoring & Auto-Assignment */}
        <Card className="border-orange-100 dark:border-orange-900/30">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4 text-orange-600" />
              <span>Crowd Monitoring</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {crowdData.slice(0, 6).map((area, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{area.location}</span>
                      {getTrendIcon(area.trend)}
                    </div>
                    <Badge 
                      variant="outline" 
                      className={area.priority === 'high' ? 'border-red-500 text-red-600' : 
                                 area.priority === 'medium' ? 'border-yellow-500 text-yellow-600' : 
                                 'border-green-500 text-green-600'}
                    >
                      {area.priority}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Current: {area.currentCount} | Avg: {area.averageCount} | Peak: {area.peakTime}
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Staff: {area.staffAssigned}/{area.staffNeeded}</span>
                    {area.staffAssigned < area.staffNeeded && autoAssignEnabled && (
                      <Button size="sm" variant="outline" className="h-6 text-xs border-orange-200 text-orange-700 hover:bg-orange-50">
                        <UserPlus className="h-3 w-3 mr-1" />
                        Auto-assign
                      </Button>
                    )}
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        area.staffAssigned >= area.staffNeeded ? 'bg-green-500' : 
                        area.staffAssigned >= area.staffNeeded * 0.7 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${Math.min((area.staffAssigned / area.staffNeeded) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Task Management */}
      <Card className="border-orange-100 dark:border-orange-900/30">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4 text-orange-600" />
            <span>Task Assignment & Tracking</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pending Tasks */}
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Pending Tasks ({pendingTasks.length})</h4>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {pendingTasks.slice(0, 8).map((task) => (
                  <div key={task.id} className="p-3 border rounded-lg border-orange-100 dark:border-orange-900/30">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="font-medium text-sm">{task.title}</div>
                        <div className="text-xs text-muted-foreground">{task.location}</div>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline" className={`text-xs ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {task.estimatedTime}min
                          </span>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="h-6 text-xs border-orange-200 text-orange-700 hover:bg-orange-50">
                        <UserPlus className="h-3 w-3 mr-1" />
                        Assign
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Tasks */}
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Active Tasks ({tasks.filter(t => t.status === 'in_progress').length})</h4>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {tasks.filter(t => t.status === 'in_progress').slice(0, 8).map((task) => {
                  const assignedEmployee = employees.find(emp => emp.id === task.assignedTo)
                  return (
                    <div key={task.id} className="p-3 border rounded-lg border-orange-100 dark:border-orange-900/30">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="font-medium text-sm">{task.title}</div>
                          <div className="text-xs text-muted-foreground">{task.location}</div>
                          {assignedEmployee && (
                            <div className="text-xs text-orange-600 mt-1">
                              Assigned to: {assignedEmployee.name}
                            </div>
                          )}
                        </div>
                        <div className="flex space-x-1">
                          <Button size="sm" variant="outline" className="h-6 text-xs">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline" className="h-6 text-xs">
                            <MessageSquare className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Break Schedule Optimization */}
      <Card className="border-orange-100 dark:border-orange-900/30">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-orange-600" />
            <span>Break Schedule Optimization</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Current Break Schedule */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="font-medium text-sm">Today's Break Schedule</h4>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {breakSchedules.map((breakSched, index) => {
                  const employee = employees.find(emp => emp.id === breakSched.employeeId)
                  return (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg border-orange-100 dark:border-orange-900/30">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          breakSched.status === 'active' ? 'bg-yellow-500' :
                          breakSched.status === 'completed' ? 'bg-green-500' :
                          breakSched.status === 'missed' ? 'bg-red-500' : 'bg-blue-500'
                        }`} />
                        <div>
                          <div className="font-medium text-sm">{employee?.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {breakSched.breakType} • {breakSched.duration}min
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">
                          {breakSched.startTime} - {breakSched.endTime}
                        </div>
                        <Badge variant="outline" className="text-xs border-orange-200 text-orange-700">
                          {breakSched.status}
                        </Badge>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Optimization Controls */}
            <div className="space-y-4">
              <h4 className="font-medium text-sm">Optimization Settings</h4>
              
              <div className="space-y-3">
                <div className="p-3 bg-orange-50 dark:bg-orange-950 rounded-lg border border-orange-200 dark:border-orange-800">
                  <div className="flex items-center space-x-2 mb-2">
                    <Zap className="h-4 w-4 text-orange-600" />
                    <span className="text-sm font-medium">Auto-Optimization</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    Automatically optimize break schedules based on crowd patterns
                  </p>
                  <Button size="sm" className="w-full bg-orange-500 hover:bg-orange-600">
                    Enable Auto-Optimize
                  </Button>
                </div>

                <div className="p-3 border rounded-lg border-orange-100 dark:border-orange-900/30">
                  <div className="text-sm font-medium mb-2">Coverage Analysis</div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span>Peak Hours Covered:</span>
                      <span className="text-green-600">85%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Min Staff Maintained:</span>
                      <span className="text-green-600">✓</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Break Conflicts:</span>
                      <span className="text-red-600">2</span>
                    </div>
                  </div>
                </div>

                <Button size="sm" variant="outline" className="w-full border-orange-200 text-orange-700 hover:bg-orange-50">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Regenerate Schedule
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-orange-100 dark:border-orange-900/30">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-4 w-4 text-orange-600" />
              <span>Performance Metrics</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {Math.round(tasks.filter(t => t.status === 'completed').length / tasks.length * 100)}%
                  </div>
                  <div className="text-xs text-muted-foreground">Task Completion</div>
                </div>
                <div className="text-center p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {Math.round(employees.reduce((acc, emp) => acc + emp.efficiency, 0) / employees.length)}%
                  </div>
                  <div className="text-xs text-muted-foreground">Avg Efficiency</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h5 className="text-sm font-medium">Top Performers</h5>
                {employees
                  .sort((a, b) => b.performance - a.performance)
                  .slice(0, 5)
                  .map((emp, index) => (
                    <div key={emp.id} className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <span className="text-muted-foreground">#{index + 1}</span>
                        <span>{emp.name}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 text-yellow-500" />
                        <span>{emp.performance}%</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-100 dark:border-orange-900/30">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-4 w-4 text-orange-600" />
              <span>Alerts & Notifications</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <span className="text-sm font-medium text-red-600">High Priority</span>
                </div>
                <p className="text-xs text-red-600 mt-1">
                  Checkout area understaffed - 3 additional staff needed
                </p>
              </div>

              <div className="p-3 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm font-medium text-yellow-600">Break Reminder</span>
                </div>
                <p className="text-xs text-yellow-600 mt-1">
                  Sarah Johnson's break starts in 15 minutes
                </p>
              </div>

              <div className="p-3 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Target className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-600">Task Update</span>
                </div>
                <p className="text-xs text-blue-600 mt-1">
                  Inventory count completed ahead of schedule
                </p>
              </div>

              <div className="p-3 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Award className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-600">Achievement</span>
                </div>
                <p className="text-xs text-green-600 mt-1">
                  Team exceeded daily productivity target by 12%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Helper component for ZapOff icon (since it's not in lucide-react)
function ZapOff({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      height="24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10.513 4.856 13.12 2.17a.5.5 0 0 1 .86.46l-1.377 4.317" />
      <path d="M15.656 10H20a1 1 0 0 1 .78 1.63L18.5 14.5" />
      <path d="M7.5 10.5 2.22 15.78a.5.5 0 0 0 .78.78L9.5 10" />
      <path d="m2 2 20 20" />
    </svg>
  )
}