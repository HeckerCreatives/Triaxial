import Breadcrumbdb from '@/components/common/Breadcrumb'
import React from 'react'
import FinanceLayout from '@/components/layout/FinanceLayout'
import Totalinvoice from './Totalinvoice'
import PmLayout from '@/components/layout/PmLayout'

export default function page() {
  return (
     <PmLayout>
      <div className=' p-6 top-0 left-0 w-full h-[150px] bg-zinc-800'
      style={{backgroundImage: `url('/dbbg.png')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat:"no-repeat"}}
      >
        <Breadcrumbdb page={'Total Invoice / Team Total Invoice'}/>
      </div>
      <Totalinvoice/>
    </PmLayout>
  )
}
