
import React from 'react'
import Breadcrumbdb from '@/components/common/Breadcrumb'
import { Requestcards } from './Requestcards'
import Requestable from './Requesttable'
import EmployeeLayout from '@/components/layout/EmployeeLayout'


export default function page() {
  return (
    <EmployeeLayout>
      <div className='p-6 top-0 left-0 w-full h-[150px] bg-zinc-800'
      style={{backgroundImage: `url('/dbbg.png')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat:"no-repeat"}}
      >
        <Breadcrumbdb page={'My Requests'}/>

      </div>
      <Requestable/>
    </EmployeeLayout>
  )
}
