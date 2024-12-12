import Breadcrumbdb from '@/components/common/Breadcrumb'
import React from 'react'
import PmLayout from '@/components/layout/PmLayout'
import Yourworkload from './Yourworkload'
import SuperadminLayout from '@/components/layout/SuperadminLayout'

export default function page() {
  return (
   
      <SuperadminLayout>
      <div className=' p-6 top-0 left-0 w-full h-[100px] bg-zinc-800'
      style={{backgroundImage: `url('/dbbg.png')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat:"no-repeat"}}
      
      >
        <Breadcrumbdb page={'Invoice Projection / Graph'}/>
      </div>
      <Yourworkload/>
    </SuperadminLayout>

    
  )
}
