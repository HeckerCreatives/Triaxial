import Breadcrumbdb from '@/components/common/Breadcrumb'
import React from 'react'
import FinanceLayout from '@/components/layout/FinanceLayout'
import PmLayout from '@/components/layout/PmLayout'
import Employeetable from './Employeetable'

export default function page() {
  return (
     <PmLayout>
      <div className=' absolute p-6 top-0 left-0 w-full h-[150px] bg-zinc-800'
      style={{backgroundImage: `url('/dbbg.png')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat:"no-repeat"}}
      
      >
        <Breadcrumbdb page={'Employee'}/>
      </div>
      <Employeetable/>
    </PmLayout>
  )
}

