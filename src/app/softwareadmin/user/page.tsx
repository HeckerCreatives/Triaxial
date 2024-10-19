import Breadcrumbdb from '@/components/common/Breadcrumb'
import SuperadminLayout from '@/components/layout/SuperadminLayout'
import React from 'react'
import Employeetable from './Employeetable'
import Employeecard from './Employeecard'
import SoftwareadminLayout from '@/components/layout/SoftwareadminLayout'

export default function page() {
  return (
    <SoftwareadminLayout>
      <div className=' absolute p-6 top-0 left-0 w-full h-[150px] bg-zinc-800'
      style={{backgroundImage: `url('/dbbg.png')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat:"no-repeat"}}
      
      >
        <Breadcrumbdb page={'Manage User'}/>
      </div>
      <Employeecard/>
      <Employeetable/>
    </SoftwareadminLayout>
  )
}
