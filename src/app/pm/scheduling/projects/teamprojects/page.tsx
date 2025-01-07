'use client'
import Breadcrumbdb from '@/components/common/Breadcrumb'
import SuperadminLayout from '@/components/layout/SuperadminLayout'
import React from 'react'
import { useSearchParams } from 'next/navigation'
import PmLayout from '@/components/layout/PmLayout'
import Projecttable from './Projecttable'

export default function page() {
  const params = useSearchParams()
  const getTeam = params.get('team')
  
  return (
     <PmLayout>
      <div className=' p-6 top-0 left-0 w-full h-auto bg-zinc-800'
      style={{backgroundImage: `url('/dbbg.png')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat:"no-repeat"}}
      >
        <Breadcrumbdb page={'Scheduling / Team Projects'}/>
      </div>

      <Projecttable/>
     
    </PmLayout>
  )
}
