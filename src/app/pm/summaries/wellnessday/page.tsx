'use client'
import Breadcrumbdb from '@/components/common/Breadcrumb'
import SuperadminLayout from '@/components/layout/SuperadminLayout'
import React from 'react'
import Wellnesstable from './Wellnesstable'
import Authcheck from '@/utils/Authcheck'
import PmLayout from '@/components/layout/PmLayout'

export default function page() {

  Authcheck()
  return (
    <PmLayout>
      <div className='p-6 top-0 left-0 w-full h-[100px] bg-zinc-800'
      style={{backgroundImage: `url('/dbbg.png')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat:"no-repeat"}}
      >
        <Breadcrumbdb page={'Approvals / Wellness Day'}/>
      </div>
      <Wellnesstable/>
    </PmLayout>
  )
}
