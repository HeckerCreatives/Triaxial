"use client"
import React, { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useRouter, useSearchParams } from 'next/navigation'
import Viewbtn from '@/components/common/Viewbtn'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createTeam, CreateTeam } from '@/schema/schema'
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import Spinner from '@/components/common/Spinner'
import PaginitionComponent from '@/components/common/Pagination'
import { Eye } from 'lucide-react'


type Members = Record<"name" | "employeeid", string>;

type Team = {
  manager: string
teamid: string
teamleader: string
teamname: string
}


type TeamData = {
  teamid: string
  teamname: string
  directorpartner: string
  associate: string
  manager: {
      fullname: string
      managerid: string
  },
  teamleader: {
      fullname:string 
      teamleaderid: string
  },
  members: [
      {
          fullname: string
          memberid: string
      }
    ]
}

export default function Teamstable() {
  const router = useRouter()
  const search = useSearchParams()
  const tab = search.get('active')

  const [loading, setLoading] = useState(false)
  const [employee, setEmployee] = useState<Members[]>([])
  const state = search.get('state')
  const [totalpage, setTotalpage] = useState(0)
  const [currentpage, setCurrentpage] = useState(0)
  const [teamdata, setTeamdata] = useState<TeamData>()
  const [teamid, setTeamid] = useState('')


  //team list
  const [searchteam, setSearchteam] = useState('')
  const [teamlist, setTeamlist] = useState<Team[]>([])
  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      const getList = async () => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/teams/listallteams?limit=9999&teamnamefilter=${searchteam}`,{
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
            }
        })
  
        setTeamlist(response.data.data.teams)
        setTotalpage(response.data.data.totalpages)
        setLoading(false)
       
      }
      getList()
    },500)
    return () => clearTimeout(timer)
    
    
  },[state, searchteam, currentpage])


  //paginition
  const handlePageChange = (page: number) => {
    setCurrentpage(page)
  }

  return (
    <>
    {tab === null && (
      <div className=' w-full h-full flex justify-center bg-secondary p-6 text-zinc-100'>

      <div className=' w-full flex flex-col max-w-[1520px]'>
        <div className=' flex md:flex-row flex-col items-center justify-between gap-4'>
          <div>
            
          </div>
           

            <div className=' flex flex-col gap-1'>
                <label htmlFor="" className=' text-xs'>Search</label>
                <Input value={searchteam} placeholder='Search team name (clear the input to reset)' onChange={(e) => setSearchteam(e.target.value)} type='text' className=' w-[300px] bg-primary text-zinc-100 text-xs h-[35px]'/>
                {/* <button className='px-8 py-2 rounded-sm text-xs bg-red-700'>Search</button> */}
            </div>
            
        </div>

        <Table className=' mt-4'>
        {teamlist.length === 0 &&  
          <TableCaption className=' text-xs text-zinc-500'>No data</TableCaption>
          }
          
        {loading === true && (
            <TableCaption className=' '>
              <Spinner/>
            </TableCaption>
          )}
        <TableHeader>
            <TableRow>
            <TableHead className="">Team name</TableHead>
            <TableHead className="">Manager</TableHead>
            <TableHead className="">Team Leader</TableHead>
            <TableHead>Projects</TableHead>
            {/* <TableHead>Individual Workload</TableHead> */}
            </TableRow>
        </TableHeader>
        <TableBody>
          {teamlist.map((item, index) => (
            <TableRow key={item.teamid}>
            <TableCell className="font-medium">{item.teamname}</TableCell>
            <TableCell className="font-medium">{item.manager}</TableCell>
            <TableCell>{item.teamleader}</TableCell>
            <TableCell className="">
              <a href={`/superadmin/graph/jobcomponent?teamid=${item.teamid}&teamname=${item.teamname}`} className=' w-fit bg-red-700 rounded-sm p-2 text-white flex items-center gap-2'><Eye size={15}/> View</a>
            </TableCell>

             {/* <TableCell>
                <Viewbtn disabled={false} name='View' onClick={() => router.push(`/superadmin/graph/teammembers?teamid=${item.teamid}`)}/>
              </TableCell> */}
            
       

            </TableRow>
          ))}
            
        </TableBody>
        </Table>

        
    
      </div>
        
    </div>
    )}


    </>
    
  )
}
