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
        <Breadcrumbdb page={''}/>

        <div className=' w-full flex items-center justify-center'>
          <div className=' w-fit p-2 flex flex-wrap items-center justify-center gap-2 bg-secondary rounded-sm'>
            {/* <button onClick={() => setTab('Show All')} className={`text-[.6rem]  p-2 text-zinc-100 rounded-md ${tab === 'Show All' && 'bg-red-700'} `}>Show All</button> */}
            {Tabs.map((item, index) => (
              <button onClick={() => setTab(item.name)} className={`text-[.6rem]  p-2 text-zinc-100 rounded-md ${tab === item.name && 'bg-red-700'} `}>{item.name}</button>

            ))}

          </div>
        </div>
        
      </div>
        <Bottomcards/>
    </FinanceLayout>
  )
}
