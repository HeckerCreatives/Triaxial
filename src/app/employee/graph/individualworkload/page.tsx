import Breadcrumbdb from '@/components/common/Breadcrumb'
import React from 'react'
import PmLayout from '@/components/layout/PmLayout'
import Yourworkload from './Yourworkload'
import Indiviualworkloads from './Yourworkload'
import SuperadminLayout from '@/components/layout/SuperadminLayout'
import HrLayout from '@/components/layout/HrLayout'
import FinaceLayout from '@/components/layout/FinanceLayout'
import EmployeeLayout from '@/components/layout/EmployeeLayout'

export default function page() {
  return (
    <EmployeeLayout>
      <div className=' p-6 top-0 left-0 w-full h-[100px] bg-zinc-800'
      style={{backgroundImage: `url('/dbbg.png')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat:"no-repeat"}}
      
      >
        <Breadcrumbdb page={'Team / Individual Workload'}/>
      </div>
      <Indiviualworkloads/>
    </EmployeeLayout>
  )
}
