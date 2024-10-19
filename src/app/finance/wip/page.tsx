import Breadcrumbdb from '@/components/common/Breadcrumb'
import React from 'react'
import Projectcards from './Projectcards'
import Projecttable from './Projecttable'
import FinanceLayout from '@/components/layout/FinanceLayout'

export default function page() {
  return (
     <FinanceLayout>
      <div className=' absolute p-6 top-0 left-0 w-full h-[150px] bg-zinc-800'
      style={{backgroundImage: `url('/dbbg.png')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat:"no-repeat"}}
      
      >
        <Breadcrumbdb page={'Wip'}/>
      </div>
      <Projectcards/>
      <Projecttable/>
     
    </FinanceLayout>
  )
}
