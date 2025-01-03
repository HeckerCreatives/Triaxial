"use client"
import React, { useState } from 'react'
import Breadcrumbdb from '@/components/common/Breadcrumb'
import Bottomcards from './Bottomcards'
import FinanceLayout from '@/components/layout/FinanceLayout'
import { Tabs } from '@/types/data'


export default function page() {
  const [tab, setTab] = useState('Show All')

  return (
    <FinanceLayout>
      <div className=' p-6 top-0 left-0 w-full flex flex-col justify-between h-[170px] bg-zinc-800'
      style={{backgroundImage: `url('/dbbg.png')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat:"no-repeat"}}
      >
        <Breadcrumbdb page={'Dashboard'}/>

       
      </div>
        <Bottomcards/>
    </FinanceLayout>
  )
}
