"use client"
import Card from "@/components/common/Card"
import Cardmedium from "@/components/common/Cardmedium"
import { ListTodo, File, Users, User, ArrowLeftRight} from "lucide-react"

export function Requestcards() {
  return (
    <div className=" relative z-10 mt-20 w-full flex max-w-[1520px] flex-col items-center justify-center px-4">
       
      <div className=" w-auto flex items-center flex-wrap gap-4">
       <Cardmedium name={'Wellness Day'} value={'0'} icon={<ListTodo size={50} className=" text-red-700"/>} />
       <Cardmedium name={'Sick Leave'} value={'0'} icon={<File size={50} className=" text-red-700"/>} />
       <Cardmedium name={'Work From Home'} value={'0'} icon={<Users size={50} className=" text-red-700"/>} />
       
      </div>
     
    </div>
  )
}
