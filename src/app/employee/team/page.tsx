import Breadcrumbdb from '@/components/common/Breadcrumb'
import React from 'react'
import FinanceLayout from '@/components/layout/FinanceLayout'
import EmployeeLayout from '@/components/layout/EmployeeLayout'
import Teamtable from './Teamtable'

export default function page() {
  return (
     <EmployeeLayout>
      <div className=' absolute p-6 top-0 left-0 w-full h-[150px] bg-zinc-800'
      style={{backgroundImage: `url('/dbbg.png')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat:"no-repeat"}}
      
      >
        <Breadcrumbdb page={'Team Job Components'}/>
      </div>
      <Teamtable/>
    </EmployeeLayout>
  )
}

