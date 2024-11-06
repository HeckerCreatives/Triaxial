"use client"
import Breadcrumbdb from '@/components/common/Breadcrumb'
import React from 'react'
import Teamstable from './Teamstable'
import { useSearchParams } from 'next/navigation'
import Authcheck from '@/utils/Authcheck'
import PmLayout from '@/components/layout/PmLayout'

export default function page() {
  const search = useSearchParams()
  const active = search.get('active')
  
  return (
     <PmLayout>
      <div className='p-6 top-0 left-0 w-full h-[100px] bg-zinc-800 flex items-start gap-1'
      style={{backgroundImage: `url('/dbbg.png')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat:"no-repeat"}}
      
      >
        <Breadcrumbdb page={'Teams'}/>
        {active !== null && (
        <p className=' text-xs text-zinc-100 uppercase'>/ {active}</p>

        )}
      </div>
      <Teamstable/>
    </PmLayout>
  )
}

