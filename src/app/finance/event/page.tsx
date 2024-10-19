import Breadcrumbdb from '@/components/common/Breadcrumb'
import React from 'react'
import FinanceLayout from '@/components/layout/FinanceLayout'
import Eventtable from './Eventtable'

export default function page() {
  return (
     <FinanceLayout>
      <div className='p-6 top-0 left-0 w-full h-[100px] bg-zinc-800'
      style={{backgroundImage: `url('/dbbg.png')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat:"no-repeat"}}
      
      >
        <Breadcrumbdb page={'Events'}/>
      </div>
      <Eventtable/>
    </FinanceLayout>
  )
}

