import Card from '@/components/common/Card'
import { ListTodo } from 'lucide-react'
import React from 'react'

export default function Projectcards() {
  return (
     <div className="  relative z-10 mt-20 w-full flex max-w-[1520px] flex-col items-center justify-center px-4">
       
      <div className=" w-auto flex items-center flex-wrap gap-4">
        <Card name={'Total Project'} value={''} value2={'AUD 99,999'} icon={<ListTodo size={50} className=" text-red-700"/>}/>
        <Card name={'On Progress'} value={'999'} value2={'AUD 999,999'} icon={<ListTodo size={50} className=" text-red-700"/>}/>
        <Card name={'On Hold'} value={'999'} value2={'AUD 999,999'} icon={<ListTodo size={50} className=" text-red-700"/>}/>

      </div>
     
    </div>
  )
}
