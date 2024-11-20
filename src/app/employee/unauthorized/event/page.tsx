'use client'
import Breadcrumbdb from '@/components/common/Breadcrumb'
import React from 'react'
import { useSearchParams } from 'next/navigation'
import NoAccessPage from '@/components/common/NoAccessPage'
import EmployeeLayout from '@/components/layout/EmployeeLayout'

export default function page() {
  const params = useSearchParams()
  const getTeam = params.get('team')
  
  return (
     <EmployeeLayout>
      <div className=' p-6 top-0 left-0 w-full h-auto bg-zinc-800'
      style={{backgroundImage: `url('/dbbg.png')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat:"no-repeat"}}
      
      >
        <Breadcrumbdb page={'Event /'}/>

    
      </div>
        <NoAccessPage/>
     
    </EmployeeLayout>
  )
}
