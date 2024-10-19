import Card from '@/components/common/Card'
import Cardmedium from '@/components/common/Cardmedium'
import axios from 'axios'
import { ListTodo, Users, User, CircleAlert } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

type Stats = {
  totalUsers: number
  activeUsers: number
  bannedUsers:number
}

export default function Employeecard() {

  const [stats, setStats] = useState<Stats>()
  const search = useSearchParams()
  const active = search.get('active')
  const state = search.get('state')

  useEffect(() => {
    const getStats = async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/employeeliststats?positionfilter=employee`,{
        withCredentials: true
      })
  
      console.log(response.data)
      setStats(response.data.data.stats)
    }
    getStats()
    
  },[state])

  
  return (
     <div className="  relative z-10 mt-20 w-full flex max-w-[1520px] flex-col items-center justify-center px-4">
       
      <div className=" w-auto flex items-center flex-wrap gap-4">
        <Cardmedium name={'Total Employee'} value={`${stats?.totalUsers}`} icon={<Users size={30} className=" text-red-700"/>}/>
        <Cardmedium name={'Active Employee'} value={`${stats?.activeUsers}`} icon={<User size={30} className=" text-red-700"/>}/>
        <Cardmedium name={'Banned Employee'} value={`${stats?.bannedUsers}`} icon={<CircleAlert size={30} className=" text-red-700"/>}/>

      </div>
     
    </div>
  )
}
