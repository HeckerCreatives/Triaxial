import Breadcrumbdb from '@/components/common/Breadcrumb'
import React from 'react'
import PmLayout from '@/components/layout/PmLayout'
import Yourworkload from './Yourworkload'
import SuperadminLayout from '@/components/layout/SuperadminLayout'
import FinanceLayout from '@/components/layout/FinanceLayout'
import HrLayout from '@/components/layout/HrLayout'

export default function page() {
  return (
   
      <HrLayout>
      <div className=' p-6 top-0 left-0 w-full h-[100px] bg-zinc-800'
      style={{backgroundImage: `url('/dbbg.png')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat:"no-repeat"}}
      
      >
        <Breadcrumbdb page={'Graph / Job Components'}/>
      </div>
      <Yourworkload/>
    </HrLayout>

    
  )
}
