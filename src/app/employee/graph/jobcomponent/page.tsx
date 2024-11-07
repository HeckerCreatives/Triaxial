import Breadcrumbdb from '@/components/common/Breadcrumb'
import React from 'react'
import PmLayout from '@/components/layout/PmLayout'
import Yourworkload from './Yourworkload'
import EmployeeLayout from '@/components/layout/EmployeeLayout'

export default function page() {
  return (
   
      <EmployeeLayout>
      <div className=' p-6 top-0 left-0 w-full h-[100px] bg-zinc-800'
      style={{backgroundImage: `url('/dbbg.png')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat:"no-repeat"}}
      
      >
        <Breadcrumbdb page={'Graph / Job Components'}/>
      </div>
      <Yourworkload/>
    </EmployeeLayout>

    
  )
}
