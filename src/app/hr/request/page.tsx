
import React from 'react'
import Breadcrumbdb from '@/components/common/Breadcrumb'
import { Requestcards } from './Requestcards'
import Requestable from './Requesttable'
import PmLayout from '@/components/layout/PmLayout'
import HrLayout from '@/components/layout/HrLayout'


export default function page() {
  return (
    <HrLayout>
      <div className='p-6 top-0 left-0 w-full h-[150px] bg-zinc-800'
      style={{backgroundImage: `url('/dbbg.png')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat:"no-repeat"}}
      >
        <Breadcrumbdb page={'My Requests'}/>

      </div>
      <Requestable/>
    </HrLayout>
  )
}
