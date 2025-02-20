'use client'
import Breadcrumbdb from '@/components/common/Breadcrumb'
import React from 'react'
import PmLayout from '@/components/layout/PmLayout'
import Indiviualworkloads from './Yourworkload'
import { useSearchParams } from 'next/navigation'

export default function page() {
  const params = useSearchParams()
  const team = params.get('teamname')
  const name = params.get('name')
  return (
    <PmLayout>
      <div className=' p-6 top-0 left-0 w-full h-[100px] bg-zinc-800'
      style={{backgroundImage: `url('/dbbg.png')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat:"no-repeat"}}
      
      >
        <Breadcrumbdb page={`Scheduling / ${team} / Individual Workload / ${name}`}/>
      </div>
      <Indiviualworkloads/>
    </PmLayout>
  )
}
