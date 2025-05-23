'use client'
import Breadcrumbdb from '@/components/common/Breadcrumb'
import React from 'react'
import Eventtable from './Wdtable'
import HrLayout from '@/components/layout/HrLayout'
import Wdtable from './Wdtable'
import SuperadminLayout from '@/components/layout/SuperadminLayout'

export default function page() {

  return (
     <SuperadminLayout>
      <div className=' absolute p-6 top-0 left-0 w-full h-[150px] bg-zinc-800'
      style={{backgroundImage: `url('/dbbg.png')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat:"no-repeat"}}
      
      >
        <Breadcrumbdb page={'Wellness Day'}/>
      </div>
      <Wdtable/>
    </SuperadminLayout>
  )
}

