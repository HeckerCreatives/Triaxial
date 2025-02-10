'use client'
import Breadcrumbdb from '@/components/common/Breadcrumb'
import React, { useEffect, useState } from 'react'
import PmLayout from '@/components/layout/PmLayout'
import Yourworkload from './Yourworkload'
import { useSearchParams } from 'next/navigation'
import axios from 'axios'
import SuperadminLayout from '@/components/layout/SuperadminLayout'

type Team = {
  _id: string,
  teamname: string,
}


export default function page() {
  const params = useSearchParams()
  const id = params.get('projectid')

  const [teamlist, setTeamlist] = useState<Team[]>([])
  useEffect(() => {
    const timer = setTimeout(() => {
      const getList = async () => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/teams/listteamau`,{
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
            }
        })
  
        setTeamlist(response.data.data.teams)
        console.log('daskfjh',teamlist)
       
      }
      getList()
    },500)
    return () => clearTimeout(timer)
    
  },[])

  const findTeam = teamlist.find((item) => item._id === id)


  return (
   
      <SuperadminLayout>
      <div className=' p-6 top-0 left-0 w-full h-[100px] bg-zinc-800'
      style={{backgroundImage: `url('/dbbg.png')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat:"no-repeat"}}
      
      >
        <Breadcrumbdb page={`Summaries / Projects / Due Dates / ${findTeam?.teamname}`}/>
      </div>
      <Yourworkload/>
    </SuperadminLayout>

    
  )
}
