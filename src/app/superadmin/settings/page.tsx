'use client'
import React, { useState } from 'react'
import Breadcrumbdb from '@/components/common/Breadcrumb'
import { useRouter } from 'next/navigation'
import SuperadminLayout from '@/components/layout/SuperadminLayout'
import Changepassworduser from '@/components/forms/Changepassword'


export default function page() {
  const router = useRouter()
  
  return (
    <SuperadminLayout>
      <div className=' p-6 top-0 left-0 w-full h-[100px] bg-zinc-800'
      style={{backgroundImage: `url('/dbbg.png')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat:"no-repeat"}}
      >
        <Breadcrumbdb page={'Settings'}/>
      </div>

      <div className=' w-full p-12'>
       <Changepassworduser/>
      </div>
    </SuperadminLayout>
  )
}
