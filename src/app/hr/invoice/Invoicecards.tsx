import Card from '@/components/common/Card'
import Cardmedium from '@/components/common/Cardmedium'
import { ListTodo, SquareCheck, CircleAlert } from 'lucide-react'
import React from 'react'

export default function Invoicecards() {
  return (
     <div className="  relative z-10 mt-20 w-full flex max-w-[1520px] flex-col items-center justify-center px-4">
       
      <div className=" w-auto flex items-center flex-wrap gap-4">
        <Cardmedium name={'Pending'} value={'0'} icon={<ListTodo size={50} className=" text-red-700"/>}/>
        <Cardmedium name={'Approved'} value={'0'} icon={<SquareCheck size={50} className=" text-red-700"/>}/>
        <Cardmedium name={'Denied'} value={'0'} icon={<CircleAlert size={50} className=" text-red-700"/>}/>

      </div>
     
    </div>
  )
}
