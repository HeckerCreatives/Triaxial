import SuperadminLayout from '@/components/layout/SuperadminLayout'
import React from 'react'
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
import EmployeeLayout from '@/components/layout/EmployeeLayout'
import { Requestcards } from './Requestcards'
import Requestable from './Requesttable'
import FinaceLayout from '@/components/layout/FinanceLayout'


export default function page() {
  return (
    <FinaceLayout>
      <div className=' absolute p-6 top-0 left-0 w-full h-[150px] bg-zinc-800'
      style={{backgroundImage: `url('/dbbg.png')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat:"no-repeat"}}
      >
        <Breadcrumbdb page={'Request'}/>

      </div>
      <Requestcards/>
      <Requestable/>
    </FinaceLayout>
  )
}
