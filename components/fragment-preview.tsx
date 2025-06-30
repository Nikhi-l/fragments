'use client'

import { FragmentInterpreter } from './fragment-interpreter'
import { FragmentWeb } from './fragment-web'
import { FragmentCameraFeed } from './fragment-camera-feed'
import { FragmentDashboard } from './fragment-dashboard'
import { FragmentSalesData } from './fragment-sales-data'
import { FragmentStaffManagement } from './fragment-staff-management'
import { FragmentHelp } from './fragment-help'
import { ExecutionResult } from '@/lib/types'
import { FragmentSchema } from '@/lib/schema'
import { DeepPartial } from 'ai'

export function FragmentPreview({ 
  result, 
  fragment 
}: { 
  result?: ExecutionResult
  fragment?: DeepPartial<FragmentSchema>
}) {
  // Handle help fragments
  if (fragment?.type === 'help') {
    return <FragmentHelp />
  }

  // Handle camera feed fragments
  if (fragment?.type === 'camera_feed') {
    return <FragmentCameraFeed fragment={fragment as any} />
  }

  // Handle dashboard fragments
  if (fragment?.type === 'dashboard') {
    return <FragmentDashboard fragment={fragment as any} />
  }

  // Handle sales data fragments
  if (fragment?.type === 'sales_data') {
    return <FragmentSalesData fragment={fragment as any} />
  }

  // Handle staff management fragments
  if (fragment?.type === 'staff_management') {
    return <FragmentStaffManagement fragment={fragment as any} />
  }

  // Handle code fragments (original functionality)
  if (result) {
    if (result.template === 'code-interpreter-v1') {
      return <FragmentInterpreter result={result} />
    }
    return <FragmentWeb result={result} />
  }

  return <span>No preview available</span>
}