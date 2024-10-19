import SuperadminLayout from '@/components/layout/SuperadminLayout'
import React from 'react'
import EmployeeTable from './EmployeeTable'
import Breadcrumbdb from '@/components/common/Breadcrumb'

export default function page() {
  return (
    <SuperadminLayout>
        <Breadcrumbdb page={'Employee'}/>
        <EmployeeTable/>
    </SuperadminLayout>
  )
}
