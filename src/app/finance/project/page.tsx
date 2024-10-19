import Breadcrumbdb from '@/components/common/Breadcrumb'
import SuperadminLayout from '@/components/layout/SuperadminLayout'
import React from 'react'
import Projectcards from './Projectcards'
import Projecttable from './Projecttable'
import PmLayout from '@/components/layout/PmLayout'

export default function page() {
  return (
     <PmLayout>
      <div className=' absolute p-6 top-0 left-0 w-full h-[150px] bg-zinc-800'
      style={{backgroundImage: `url('/dbbg.png')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat:"no-repeat"}}
      
      >
        <Breadcrumbdb page={'Project Master List'}/>
      </div>
      <Projectcards/>
      <Projecttable/>
     
    </PmLayout>
  )
}
