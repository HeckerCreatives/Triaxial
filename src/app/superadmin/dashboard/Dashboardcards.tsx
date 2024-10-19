"use client"

import Card from "./Card"
import { ListTodo, File, Users, User, ArrowLeftRight} from "lucide-react"

export function Dashboardcards() {
  return (
    <div className=" relative z-10 mt-20 w-full flex max-w-[1920px] flex-col items-center justify-center px-4">
       
      <div className=" w-auto flex items-center flex-wrap gap-4">
       <Card name={'Project'} value={'$999,999'} icon={<ListTodo size={50} className=" text-red-700"/>} />
       <Card name={'Invoice'} value={'$999,999'} icon={<File size={50} className=" text-red-700"/>} />
       <Card name={'Team'} value={'$999,999'} icon={<Users size={50} className=" text-red-700"/>} />
       <Card name={'Employee'} value={'$999,999'} icon={<User size={50} className=" text-red-700"/>} />
       <Card name={'Request'} value={'$999,999'} icon={<ArrowLeftRight size={50} className=" text-red-700"/>} />
       
      </div>
     
    </div>
  )
}
