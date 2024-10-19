import Card from '@/components/common/Card'
import { ListTodo } from 'lucide-react'
import React from 'react'

export default function Projectcards() {
  return (
     <div className="  relative z-10 mt-20 w-full flex max-w-[1520px] flex-col items-center justify-center px-4">
       
      <div className=" w-auto flex items-center flex-wrap gap-4">
        <Card name={'Total Project'} value={'0'} icon={<ListTodo size={50} className=" text-red-700"/>}/>
        <Card name={'On Progress'} value={'0'} icon={<ListTodo size={50} className=" text-red-700"/>}/>
        <Card name={'Overdue'} value={'0'} icon={<ListTodo size={50} className=" text-red-700"/>}/>
        <Card name={'Canceled'} value={'0'} icon={<ListTodo size={50} className=" text-red-700"/>}/>

      </div>
     
    </div>
  )
}
