'use client'
import Breadcrumbdb from '@/components/common/Breadcrumb'
import SuperadminLayout from '@/components/layout/SuperadminLayout'
import React from 'react'
import Employeetable from './Employeetable'
import Employeecard from './Employeecard'
import { useSearchParams } from 'next/navigation'
import SoftwareadminLayout from '@/components/layout/SoftwareadminLayout'

export default function page() {
  const search = useSearchParams()
  const active = search.get('active')
  
  return (
    <SoftwareadminLayout>
      <div className=' absolute flex items-start gap-1 p-6 top-0 left-0 w-full h-[150px] bg-zinc-800'
      style={{backgroundImage: `url('/dbbg.png')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat:"no-repeat"}}
      
      >
        <Breadcrumbdb page={'Employee List'}/>
        {active !== null && (
        <p className=' text-xs text-zinc-100 uppercase'>/ {active}</p>

        )}
      </div>
      <Employeecard/>
      <Employeetable/>
    </SoftwareadminLayout>
  )
}
