import Breadcrumbdb from '@/components/common/Breadcrumb'
import SuperadminLayout from '@/components/layout/SuperadminLayout'
import React from 'react'
import Employeetable from './Pmtable'
import Employeecard from './Pmcard'
import Pmtable from './Pmtable'
import Pmcard from './Pmcard'
import SoftwareadminLayout from '@/components/layout/SoftwareadminLayout'

export default function page() {
  return (
    <SoftwareadminLayout>
      <div className=' p-6 top-0 left-0 w-full h-[100px] bg-zinc-800'
      style={{backgroundImage: `url('/dbbg.png')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat:"no-repeat"}}
      
      >
        <Breadcrumbdb page={'Project Managers List'}/>
      </div>
      <Pmtable/>
    </SoftwareadminLayout>
  )
}
