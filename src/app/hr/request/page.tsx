import SuperadminLayout from '@/components/layout/SuperadminLayout'
import React from 'react'
import Breadcrumbdb from '@/components/common/Breadcrumb'
import EmployeeLayout from '@/components/layout/EmployeeLayout'
import { Requestcards } from './Requestcards'
import Requestable from './Requesttable'
import HrLayout from '@/components/layout/HrLayout'


export default function page() {
  return (
    <HrLayout>
      <div className=' p-6 top-0 left-0 w-full h-[150px] bg-zinc-800'
      style={{backgroundImage: `url('/dbbg.png')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat:"no-repeat"}}
      >
        <Breadcrumbdb page={'Request'}/>

      </div>
      {/* <Requestcards/> */}
      <Requestable/>
    </HrLayout>
  )
}
