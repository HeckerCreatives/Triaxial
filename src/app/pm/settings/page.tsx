'use client'
import React, { useState } from 'react'
import Breadcrumbdb from '@/components/common/Breadcrumb'
import { useRouter } from 'next/navigation'
import PmLayout from '@/components/layout/PmLayout'
import Changepassworduser from '@/components/forms/Changepassword'


export default function page() {
  const router = useRouter()
  
  return (
    <PmLayout>
      <div className=' p-6 top-0 left-0 w-full h-[100px] bg-zinc-800'
      style={{backgroundImage: `url('/dbbg.png')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat:"no-repeat"}}
      >
        <Breadcrumbdb page={'Settings'}/>
      </div>

      <div className='w-full h-full bg-secondary p-12'>
        <Changepassworduser/>
      </div>

    </PmLayout>
  )
}
