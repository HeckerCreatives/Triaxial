import SuperadminLayout from '@/components/layout/SuperadminLayout'
import React from 'react'
import { Dashboardcards } from './Dashboardcards'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from 'next/link'
import Breadcrumbdb from '@/components/common/Breadcrumb'
import Bottomcards from './Bottomcards'
import HrLayout from '@/components/layout/HrLayout'


export default function page() {
  return (
    <HrLayout>
      <div className=' p-6 top-0 left-0 w-full h-[100px] bg-zinc-800'
      style={{backgroundImage: `url('/dbbg.png')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat:"no-repeat"}}
      >
        <Breadcrumbdb page={''}/>

      </div>
        {/* <Dashboardcards/> */}
        <Bottomcards/>
    </HrLayout>
  )
}
