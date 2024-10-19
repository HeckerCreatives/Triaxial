import Breadcrumbdb from '@/components/common/Breadcrumb'
import React from 'react'
import Employeetable from './Employeetable'
import Employeecard from './Employeecard'
import HrLayout from '@/components/layout/HrLayout'

export default function page() {
  return (
    <HrLayout>
      <div className=' absolute p-6 top-0 left-0 w-full h-[150px] bg-zinc-800'
      style={{backgroundImage: `url('/dbbg.png')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat:"no-repeat"}}
      
      >
        <Breadcrumbdb page={'Employee'}/>
      </div>
      <Employeetable/>
    </HrLayout>
  )
}
