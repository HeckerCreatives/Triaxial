"use client"
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
import { usePathname } from 'next/navigation'

export default function Breadcrumbdb(prop: any) {
    const path = usePathname()

  return (
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              {/* <BreadcrumbLink asChild className=' hover:text-red-600'>
                <p className=' text-zinc-100 text-xs'>Dashboard</p>
              </BreadcrumbLink> */}
            </BreadcrumbItem>
          {/* <BreadcrumbSeparator /> */}
            <BreadcrumbItem>
              <BreadcrumbLink className=' text-xs text-zinc-100 hover:text-red-600'>{prop.page}</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
  )
}
