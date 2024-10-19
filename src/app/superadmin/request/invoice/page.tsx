import Breadcrumbdb from '@/components/common/Breadcrumb'
import SuperadminLayout from '@/components/layout/SuperadminLayout'
import React from 'react'
import Invoicecards from './Invoicecards'
import Invoicetable from './Invoicetable'
import Invoice from './Invoice'

export default function page() {
  return (
     <SuperadminLayout>
      <div className=' absolute p-6 top-0 left-0 w-full h-[150px] bg-zinc-800'
      style={{backgroundImage: `url('/dbbg.png')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat:"no-repeat"}}
      
      >
        <Breadcrumbdb page={'Invoice'}/>
      </div>
      <Invoicecards/>
      <Invoicetable/>
     
    </SuperadminLayout>
  )
}
