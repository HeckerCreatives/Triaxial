"use client"

import Cardmedium from "@/components/common/Cardmedium"
import Card from "./Card"
import { ListTodo, File, Users, User, ArrowLeftRight} from "lucide-react"

export function Dashboardcards() {
  return (
    <div className=" relative z-10 mt-20 w-full flex max-w-[1520px] flex-col items-center justify-center px-4">
       
      <div className=" w-auto flex items-center flex-wrap gap-4">
       <Cardmedium name={'Project'} value={'$999,999'} icon={<ListTodo size={50} className=" text-red-700"/>} />
       <Cardmedium name={'Invoice'} value={'$999,999'} icon={<File size={50} className=" text-red-700"/>} />
       <Cardmedium name={'Team'} value={'$999,999'} icon={<Users size={50} className=" text-red-700"/>} />
      
       
      </div>
     
    </div>
  )
}
