"use client"
import React, { useEffect, useState } from 'react'
import Breadcrumbdb from '@/components/common/Breadcrumb'
import PmLayout from '@/components/layout/PmLayout'
import Pmcards from './Pmcard'
import { Pmtopcards } from './Pmtopcards'
import { Tabs, Teams } from '@/types/data'
import axios from 'axios'
import { Team } from '@/types/types'
import { useRouter } from 'next/navigation'

type Teams = {
  teamid: string
teamname: string
}


export default function page() {
  const [teams, setTeams] = useState<Teams[]>([])
  const active = teams[0]
  const [tab, setTab] = useState('')
  const router = useRouter()

  useEffect(() => {
    const getTeams = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/teams/managersearchteam`,{
          withCredentials: true
        })

        setTeams(response.data.data)
        setTab(response.data.data[0].teamid)
        router.push(`?team=${response.data.data[0].teamid}`)
      } catch (error) {
        
      }
    }
    getTeams()
   
  },[])

  return (
    <PmLayout>
      <div className=' p-6 top-0 left-0 w-full flex flex-col justify-between h-[100px] bg-zinc-800'
      style={{backgroundImage: `url('/dbbg.png')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat:"no-repeat"}}
      >
        <Breadcrumbdb page={'Dashboard'}/>

        {/* <div className=' w-full flex items-center justify-center'>
          <div className=' w-fit p-2 flex flex-wrap items-center justify-center gap-2 bg-secondary rounded-sm'>
       
            {teams.map((item, index) => (
              <button onClick={() => {setTab(item.teamid), router.push(`?team=${item.teamid}`)}} className={`text-[.6rem]  p-2 text-zinc-100 rounded-md ${tab === item.teamid && 'bg-red-700'} `}>{item.teamname}</button>

            ))}

          </div>
        </div> */}
        
      </div>
      <Pmcards/>
    </PmLayout>
  )
}
