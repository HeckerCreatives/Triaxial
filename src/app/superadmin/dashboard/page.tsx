"use client"
import SuperadminLayout from '@/components/layout/SuperadminLayout'
import React, { useEffect, useState } from 'react'
import Breadcrumbdb from '@/components/common/Breadcrumb'
import Bottomcards from './Bottomcards'
import axios from 'axios'
import { Team } from '@/types/types'
import { useRouter } from 'next/navigation'


export default function page() {
  const [teams, setTeams] = useState<Team[]>([])
  const active = teams[0]
  const [tab, setTab] = useState('')
  const router = useRouter()

  //team list
  useEffect(() => {
    const getList = async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/teams/teamsearchlist?teamname`,{
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
          }
      })

      setTeams(response.data.data.teamlist)
      setTab(response.data.data.teamlist[0].teamid)
      router.push(`?team=${response.data.data.teamlist[0].teamid}`)
      // setTab(response.data.data.teamlist[0].teamid)
    }
    getList()
  },[])

  return (
    <SuperadminLayout>
      <div className='p-6 top-0 left-0 w-full flex flex-col justify-between h-[100px] bg-zinc-800'
      style={{backgroundImage: `url('/dbbg.png')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat:"no-repeat"}}
      >
        <Breadcrumbdb page={''}/>

        {/* <div className=' w-full flex items-center justify-center'>
          <div className=' w-fit p-2 flex flex-wrap items-center justify-center gap-2 bg-secondary rounded-sm'>
            {teams.map((item, index) => (
              <button key={index} onClick={() => {setTab(item.teamid), router.push(`?team=${item.teamid}`)}} className={`text-[.6rem]  p-2 text-zinc-100 rounded-md ${tab === item.teamid && 'bg-red-700'} `}>{item.teamname}</button>
            ))}
          </div>
        </div> */}
        
      </div>
        <Bottomcards/>
    </SuperadminLayout>
  )
}
