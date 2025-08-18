'use client'

import { DashboardFragmentSchema } from '@/lib/schema'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { DollarSign, Package, Users } from 'lucide-react'
import { useState } from 'react'

export function FragmentDashboard({
  fragment,
}: {
  fragment: DashboardFragmentSchema
}) {
  const [period, setPeriod] = useState(fragment.time_period || 'Today')

  const metrics = [
    {
      label: 'Sales Revenue',
      value: '$45k',
      change: '+12%'
    },
    {
      label: 'Customers',
      value: '1.2k',
      change: '+5%'
    },
    {
      label: 'Inventory Items',
      value: '820'
    }
  ]

  const icons = {
    'Sales Revenue': DollarSign,
    Customers: Users,
    'Inventory Items': Package,
  } as const

  return (
    <Card className='h-full flex flex-col'>
      <CardHeader className='flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-lg'>{fragment.store_name} Dashboard</CardTitle>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className='w-32'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {['Today', 'This Week', 'This Month'].map((p) => (
              <SelectItem key={p} value={p}>
                {p}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
        {metrics.map((m) => {
          const Icon = icons[m.label as keyof typeof icons]
          return (
            <div key={m.label} className='flex flex-col rounded border p-4'>
              <div className='flex items-center justify-between text-sm text-muted-foreground'>
                <span>{m.label}</span>
                <Icon className='h-4 w-4' />
              </div>
              <div className='mt-2 text-2xl font-semibold'>{m.value}</div>
              {m.change && <Badge className='mt-2 w-fit'>{m.change}</Badge>}
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}

