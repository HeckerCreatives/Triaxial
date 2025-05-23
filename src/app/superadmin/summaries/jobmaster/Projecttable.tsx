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
import {  Eye, FileDown, ReceiptText, FilePlus2, FileCheck, Search, Copy, Layers, TriangleAlert, Pen } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from '@/components/ui/textarea'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Checkbox } from '@/components/ui/checkbox'
import Createprojectform from '@/components/forms/Createprojectform'
import Editprojectform from '@/components/forms/Editprojectform'
import Variationprojectform from '@/components/forms/Variationprojectform'
import axios from 'axios'
import { formatDate, formatDateTime } from '@/utils/functions'
import PaginitionComponent from '@/components/common/Pagination'
import Spinner from '@/components/common/Spinner'
import { useSearchParams } from 'next/navigation'
import Projectstatusform from '@/components/forms/Projectstatusform'
import Copyprojectform from '@/components/forms/Copyprojectform'
import { clientColor } from '@/utils/helpers'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Components = {
  name: string,
  isVariation: boolean
  estimatedBudget: number,
  members: [
    {

      initial: string
    id: string
    }
   
  ]
  id: string
}

type Project = {
  createdAt: string
deadlinedate: string
invoiced: number
managerName: string
projectname: string
startdate: string
status: string
teamname: string
teamid: string
updatedAt: string
client: string
priority: string
_id: string
jobno: string
jobComponents: Components[]
}

type Team = {
  teamid: string
teamname: string
}



export default function Projecttable() {
  const [loading, setLoading] = useState(false)

  const [list, setList] = useState<Project[]>([])
  const [totalpage, setTotalpage] = useState(0)
  const [currentpage, setCurrentpage] = useState(0)
  const [search, setSearch] = useState('')
  const params = useSearchParams()
  const refresh = params.get('state')
  const id = params.get('projectid')
   const [team, setTeam] = useState<Team[]>([])
    const [teamid, setTeamId] = useState('')

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      const getList = async () => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/projects/listprojectsa?searchproject=${search}&page=${currentpage}&limit=10&filter=${teamid !== 'all' ? teamid : ''}`,{
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
            }
        })
        setList(response.data.data.projectlist)
        setTotalpage(response.data.data.totalpages)
        setLoading(false)
     
      }
      getList()
    },500)
    return () => clearTimeout(timer)
    
  },[currentpage, search, refresh, teamid])



   //paginition
   const handlePageChange = (page: number) => {
    setCurrentpage(page)
  }

    useEffect(() => {
      const getList = async () => {
     
          try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/teams/listteamselect`,{
              withCredentials: true
            })
  
          setTeam(response.data.data)
          setTeamId(response.data.data[0].teamid)
          } catch (error) {
  
          }
        }
      getList()
    },[])


  return (
   <div className=' w-full h-full flex justify-center bg-secondary p-6 text-zinc-100'>

    <div className=' w-full flex flex-col max-w-[1520px]'>

      <div className=' w-full flex items-center justify-between'>
        <div className=' flex items-center gap-2'>
          <div className=' text-xs'>
                    <label htmlFor="">Filter by team:</label>
                    <Select value={teamid} onValueChange={setTeamId}>
                      <SelectTrigger className="w-[180px] bg-primary mt-1" >
                        <SelectValue placeholder="Select Team" />
                      </SelectTrigger>
                      <SelectContent>
                        {team.map((item, index) => (
                          <SelectItem value={item.teamid}>{item.teamname}</SelectItem>
                        ))}
                          <SelectItem value='all'>All</SelectItem>

                       
                      </SelectContent>
                    </Select>
          
                  </div>
        </div>

          <div className=' flex flex-col gap-1'>
            <label htmlFor="" className=' text-xs'>Search</label>
            <Input value={search} placeholder='Search client name (clear the input to reset)' onChange={(e) => setSearch(e.target.value)} type='text' className=' w-[300px] bg-primary text-zinc-100 text-xs h-[35px]'/>
          </div>

        </div>

        <Table className=' mt-4'>
        {list.length === 0 &&  
          <TableCaption className=' text-xs text-zinc-500'>No data</TableCaption>
          }
          
        {loading === true && (
            <TableCaption className=' '>
              <Spinner/>
            </TableCaption>
          )}
        <TableHeader>
            <TableRow>
            <TableHead>Job no</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Project Name</TableHead>
            <TableHead>Job Manager</TableHead>
            <TableHead>Job Component Budget</TableHead>
            <TableHead>% Invoice</TableHead>
            <TableHead>Job Component</TableHead>
            <TableHead>Job Members</TableHead>
            <TableHead>Team</TableHead>
   
            </TableRow>
        </TableHeader>
        <TableBody>
        {list.map((project) =>
          project.jobComponents.map((job, index) => (
            <TableRow key={index} className={``}>
              <TableCell className={` ${clientColor(project.priority)} underline cursor-pointer`}>
                <a target='_blank' href={`/superadmin/graph/jobcomponent?teamid=${project.teamid}&jobno=${job.id}&teamname=${project.teamname}`} className={`${job.isVariation ? 'text-red-500' : 'text-black'}`}>{project.jobno}</a>

              </TableCell>
              <TableCell className={` ${clientColor(project.priority)} ${job.isVariation ? 'text-red-500' : 'text-black'}`}>{project.client}</TableCell>
              <TableCell className={` ${clientColor(project.priority)} ${job.isVariation ? 'text-red-500' : 'text-black'}`}>{project.projectname}</TableCell>
              <TableCell className={` ${clientColor(project.priority)} ${job.isVariation ? 'text-red-500' : 'text-black'}`}>{project.managerName}</TableCell>
              <TableCell className={` ${clientColor(project.priority)} ${job.isVariation ? 'text-red-500' : 'text-black'}`}>${job.estimatedBudget?.toLocaleString()}</TableCell>
              <TableCell className={` ${clientColor(project.priority)} ${job.isVariation ? 'text-red-500' : 'text-black'}`}>{project.invoiced}%</TableCell>
              <TableCell className={` ${clientColor(project.priority)} ${job.isVariation ? 'text-red-500' : 'text-black'}`}>{job.name}</TableCell>
              <TableCell className={` flex items-center gap-2 h-[50px] ${clientColor(project.priority)} ${job.isVariation ? 'text-red-500' : 'text-black'}`}>{job.members?.map((item, index) => (
                <a href={`/superadmin/individualworkload?employeeid=${item.id}&name=${item.initial}&teamname=${job.name}`} className=' underline cursor-pointer'>{item.initial || ''}</a>
                // <p key={index} className=' h-full'></p>
              ))}</TableCell>
              <TableCell className={` ${clientColor(project.priority)} ${job.isVariation ? 'text-red-500' : 'text-black'}`}>{project.teamname}</TableCell>
            </TableRow>
          ))
        )}
          {/* {list.map((item, index) => (
            <TableRow key={index}>
            <TableCell>{item.jobno}</TableCell>
            <TableCell>{item.client}</TableCell>
            <TableCell>{item.projectname}</TableCell>
            <TableCell>{item.managerName}</TableCell>
            <TableCell></TableCell>
            <TableCell>{item.invoiced}</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell>{item.teamname}</TableCell>
          
          
            </TableRow>
          ))} */}
            
        </TableBody>
        </Table>

        {/* {list.length !== 0 && (
       <PaginitionComponent currentPage={currentpage} total={totalpage} onPageChange={handlePageChange}/>
       )} */}
    </div>
        
    </div>
  )
}
