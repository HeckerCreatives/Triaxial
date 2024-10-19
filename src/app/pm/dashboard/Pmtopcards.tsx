"use client"
import Cardmedium from "@/components/common/Cardmedium"
import { ListTodo, File, Users, User, ArrowLeftRight} from "lucide-react"

export function Pmtopcards() {
  return (
    <div className=" relative z-10 mt-20 w-full flex max-w-[1520px] flex-col items-center justify-center px-4">
       
      <div className=" w-auto flex items-center flex-wrap gap-4">
       <Cardmedium name={'Total Projects'} value={'0'} icon={<ListTodo size={50} className=" text-red-700"/>} />
       <Cardmedium name={'Ongoing Projects'} value={'0'} icon={<File size={50} className=" text-red-700"/>} />
       <Cardmedium name={'Pending Projects'} value={'0'} icon={<Users size={50} className=" text-red-700"/>} />
      
      </div>
     
    </div>
  )
}
