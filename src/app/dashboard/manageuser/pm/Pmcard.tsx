import Cardmedium from '@/components/common/Cardmedium'
import { ListTodo, Users, User, CircleAlert } from 'lucide-react'
import React from 'react'

export default function Pmcard() {
  return (
     <div className="  relative z-10 mt-20 w-full flex max-w-[1520px] flex-col items-center justify-center px-4">
       
      <div className=" w-auto flex items-center flex-wrap gap-4">
        <Cardmedium name={'Total Manager'} value={'0'} icon={<Users size={50} className=" text-red-700"/>}/>
        <Cardmedium name={'Active Manager'} value={'0'} icon={<User size={50} className=" text-red-700"/>}/>
        <Cardmedium name={'Banned Manager'} value={'0'} icon={<CircleAlert size={50} className=" text-red-700"/>}/>

      </div>
     
    </div>
  )
}
