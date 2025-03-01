import Breadcrumbdb from '@/components/common/Breadcrumb'
import React from 'react'
import HrLayout from '@/components/layout/HrLayout'
import Yourworkload from './Yourworkload'

export default function page() {
  return (
    <HrLayout>
      <div className=' p-6 top-0 left-0 w-full h-[100px] bg-zinc-800'
      style={{backgroundImage: `url('/dbbg.png')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat:"no-repeat"}}
      
      >
        <Breadcrumbdb page={'My Workload'}/>
      </div>
      <Yourworkload/>
    </HrLayout>
  )
}
