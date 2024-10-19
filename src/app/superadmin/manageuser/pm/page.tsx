'use client'
import Breadcrumbdb from '@/components/common/Breadcrumb'
import SuperadminLayout from '@/components/layout/SuperadminLayout'
import React from 'react'
import Pmtable from './Pmtable'
import Pmcard from './Pmcard'
import Authcheck from '@/utils/Authcheck'

export default function page() {

  //auth check
  Authcheck()

  
  return (
    <SuperadminLayout>
      <div className=' p-6 top-0 left-0 w-full h-[100px] bg-zinc-800'
      style={{backgroundImage: `url('/dbbg.png')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat:"no-repeat"}}
      
      >
        <Breadcrumbdb page={'Project Managers List'}/>
      </div>
      <Pmtable/>
    </SuperadminLayout>
  )
}
