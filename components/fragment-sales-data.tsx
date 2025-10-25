'use client'

import { SalesDataFragmentSchema } from '@/lib/schema'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { DollarSign, ShoppingCart, Users } from 'lucide-react'
import { useState } from 'react'

export function FragmentSalesData({
  fragment,
}: {
  fragment: SalesDataFragmentSchema
}) {
  const [period, setPeriod] = useState(fragment.time_period)

  const metrics = [
    { label: 'Total Revenue', value: '₹1.84M', icon: DollarSign },
    { label: 'Transactions', value: '705', icon: ShoppingCart },
    { label: 'Customers', value: '658', icon: Users },
  ]

  return (
    <Card className='h-full flex flex-col'>
      <CardHeader className='flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-lg'>{fragment.store_name} Sales</CardTitle>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className='w-40'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {['daily', 'weekly', 'monthly', 'quarterly'].map((p) => (
              <SelectItem key={p} value={p}>
                {p}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
        {metrics.map((m) => (
          <div key={m.label} className='flex flex-col rounded border p-4'>
            <div className='flex items-center justify-between text-sm text-muted-foreground'>
              <span>{m.label}</span>
              <m.icon className='h-4 w-4' />
            </div>
            <div className='mt-2 text-2xl font-semibold'>{m.value}</div>
          </div>
        ))}
        <div className='col-span-full mt-2'>
          <h3 className='mb-2 text-sm font-medium'>Top Products</h3>
          <ul className='space-y-1 text-sm'>
            {[
              { name: 'Begum Wing Chair', revenue: '₹35k' },
              { name: 'Steel Bottle', revenue: '₹18k' },
              { name: 'Tote Bag', revenue: '₹17k' },
            ].map((p) => (
              <li key={p.name} className='flex justify-between'>
                <span>{p.name}</span>
                <Badge variant='outline'>{p.revenue}</Badge>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

