'use client'

import { InventoryManagementFragmentSchema } from '@/lib/schema'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useMemo, useState } from 'react'

interface Item {
  id: string
  name: string
  stock: number
  min: number
  category: string
}

export function FragmentInventoryManagement({
  fragment,
}: {
  fragment: InventoryManagementFragmentSchema
}) {
  const items = useMemo<Item[]>(
    () => [
      { id: '1', name: 'Sample Item A', stock: 12, min: 5, category: 'General' },
      { id: '2', name: 'Sample Item B', stock: 2, min: 5, category: 'General' },
      { id: '3', name: 'Sample Item C', stock: 30, min: 10, category: 'Seasonal' },
    ],
    []
  )

  const categories = ['all', ...Array.from(new Set(items.map((i) => i.category)))]
  const [category, setCategory] = useState('all')

  const filtered = items.filter(
    (i) => category === 'all' || i.category === category
  )

  return (
    <Card className='h-full flex flex-col'>
      <CardHeader className='flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-lg'>{fragment.store_name} Inventory</CardTitle>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className='w-40'>
            <SelectValue placeholder='Category' />
          </SelectTrigger>
          <SelectContent>
            {categories.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className='flex-1 overflow-auto'>
        <table className='w-full text-sm'>
          <thead>
            <tr className='text-left'>
              <th className='pb-2'>Item</th>
              <th className='pb-2'>Stock</th>
              <th className='pb-2'>Status</th>
            </tr>
          </thead>
          <tbody className='divide-y'>
            {filtered.map((item) => (
              <tr key={item.id}>
                <td className='py-2'>{item.name}</td>
                <td className='py-2'>{item.stock}</td>
                <td className='py-2'>
                  {item.stock <= 0 ? (
                    <Badge variant='destructive'>Out</Badge>
                  ) : item.stock < item.min ? (
                    <Badge variant='secondary'>Low</Badge>
                  ) : (
                    <Badge variant='outline'>OK</Badge>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  )
}

