'use client'
import Breadcrumbdb from '@/components/common/Breadcrumb'
import SuperadminLayout from '@/components/layout/SuperadminLayout'
import React from 'react'
import Emailtable from './Eventtable'
import Eventtable from './Eventtable'
import Authcheck from '@/utils/Authcheck'

export default function page() {

  Authcheck()
  return (
     <SuperadminLayout>
      <div className=' absolute p-6 top-0 left-0 w-full h-[150px] bg-zinc-800'
      style={{backgroundImage: `url('/dbbg.png')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat:"no-repeat"}}
      
      >
        <Breadcrumbdb page={'Events'}/>
      </div>
      <Eventtable/>
    </SuperadminLayout>
  )
}

