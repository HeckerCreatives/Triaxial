'use client'
import Breadcrumbdb from '@/components/common/Breadcrumb'
import SuperadminLayout from '@/components/layout/SuperadminLayout'
import React from 'react'
import Projecttable from './Projecttable'
import { useSearchParams } from 'next/navigation'
import PmLayout from '@/components/layout/PmLayout'
import EmployeeLayout from '@/components/layout/EmployeeLayout'

export default function page() {
  const params = useSearchParams()
  const getTeam = params.get('team')
  
  return (
     <EmployeeLayout>
      <div className=' p-6 top-0 left-0 w-full h-auto bg-zinc-800'
      style={{backgroundImage: `url('/dbbg.png')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat:"no-repeat"}}
      
      >
        <Breadcrumbdb page={'Job Component / List'}/>

        {/* <div className=' flex items-start gap-4  bg-secondary w-fit text-white text-[.6rem] p-2 rounded-sm mt-6'>

          <div className=' flex flex-col gap-1'>
            <p className=' text-zinc-400'>Director: <span className=' text-white'>Name</span></p>
            <p className=' text-zinc-400'>Associate: <span className=' text-white'>Name</span></p>
            <p className=' text-zinc-400'>Manager: <span className=' text-white'>Name</span></p>
          </div>

          <div className=' flex flex-col gap-1'>
            <p className=' text-zinc-400'>Members:</p>
            <p>Name</p>
            <p>Name</p>
            <p>Name</p>
            <p>Name</p>
          </div>
          

        </div> */}
      </div>
      <Projecttable/>
     
    </EmployeeLayout>
  )
}
