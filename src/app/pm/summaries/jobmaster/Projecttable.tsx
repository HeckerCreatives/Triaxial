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
import { formatDate, formatDateTime, getInitials } from '@/utils/functions'
import PaginitionComponent from '@/components/common/Pagination'
import Spinner from '@/components/common/Spinner'
import { useSearchParams } from 'next/navigation'
import Projectstatusform from '@/components/forms/Projectstatusform'
import Copyprojectform from '@/components/forms/Copyprojectform'
import { clientColor } from '@/utils/helpers'

type Components = {
  name: string,
  estimatedBudget: number,
  members: string[]
  id: string
  isVariation: string
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

export default function Projecttable() {
  const [loading, setLoading] = useState(false)

  const [list, setList] = useState<Project[]>([])
  const [totalpage, setTotalpage] = useState(0)
  const [currentpage, setCurrentpage] = useState(0)
  const [search, setSearch] = useState('')
  const params = useSearchParams()
  const refresh = params.get('state')
  const id = params.get('projectid')

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      const getList = async () => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/projects/listprojects?searchproject=${search}&page=${currentpage}&limit=10`,{
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
    
  },[currentpage, search, refresh])



   //paginition
   const handlePageChange = (page: number) => {
    setCurrentpage(page)
  }


  return (
   <div className=' w-full h-full flex justify-center bg-secondary p-6 text-zinc-100'>

    <div className=' w-full flex flex-col max-w-[1520px]'>

      <div className=' w-full flex items-center justify-between'>
        <div className=' flex items-center gap-2'>

        </div>

          <div className=' flex flex-col gap-1'>
            {/* <label htmlFor="" className=' text-xs'>Search</label> */}
            <Input value={search} placeholder='Search project' onChange={(e) => setSearch(e.target.value)} type='text' className=' w-[200px] bg-white text-black text-xs h-[35px]'/>
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
            <TableRow className=' text-xs'>
            <TableHead className=' text-xs'>Job no</TableHead>
            <TableHead className=' text-xs'>Client</TableHead>
            <TableHead className=' text-xs'>Project Name</TableHead>
            <TableHead className=' text-xs'>Job Manager</TableHead>
            <TableHead className=' text-xs'>JobComponent Budget</TableHead>
            <TableHead className=' text-xs'>% Invoiced</TableHead>
            <TableHead className=' text-xs'>Job Component</TableHead>
            <TableHead className=' text-xs'>Job Members</TableHead>
            <TableHead className=' text-xs'>Team</TableHead>
   
            </TableRow>
        </TableHeader>
        <TableBody>
        {list.flatMap((project) => 
          project.jobComponents.map((job, index) => (
            <TableRow key={index} className={`${job.isVariation ? 'text-red-500 text-xs' : 'text-white text-xs'}`}>
              <TableCell className={`${clientColor(project.priority)} text-blue-600 underline cursor-pointer`}>
                <a href={`/pm/graph/jobcomponent?teamid=${project.teamid}&jobno=${job.id}`} className="">
                  {project.jobno}
                </a>
              </TableCell>
              <TableCell className={`${clientColor(project.priority)} ${job.isVariation ? 'text-red-600 text-xs' : 'text-black text-xs'}`}>{project.client}</TableCell>
              <TableCell className={`${clientColor(project.priority)} ${job.isVariation ? 'text-red-600 text-xs' : 'text-black text-xs'}`}>{project.projectname}</TableCell>
              <TableCell className={`${clientColor(project.priority)} ${job.isVariation ? 'text-red-600 text-xs' : 'text-black text-xs'}`}>{getInitials(project.managerName)}</TableCell>
              <TableCell className={`${clientColor(project.priority)} ${job.isVariation ? 'text-red-600 text-xs' : 'text-black text-xs'}`}>$ {job.estimatedBudget?.toLocaleString()}</TableCell>
              <TableCell className={`${clientColor(project.priority)} ${job.isVariation ? 'text-red-600 text-xs' : 'text-black text-xs'}`}>% {project.invoiced}</TableCell>
              <TableCell className={`${clientColor(project.priority)} ${job.isVariation ? 'text-red-600 text-xs' : 'text-black text-xs'}`}>{job.name}</TableCell>
              <TableCell className={`flex items-center gap-2 h-[50px] ${clientColor(project.priority)}  ${job.isVariation ? 'text-red-600 text-xs' : 'text-black text-xs'}`}>
                {job.members.map((item, index) => (
                  <p key={index} className="h-full">{item}</p>
                ))}
              </TableCell>
              <TableCell className={`${clientColor(project.priority)}  ${job.isVariation ? 'text-red-600 text-xs' : 'text-black text-xs'}`}>{project.teamname}</TableCell>
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

        {list.length !== 0 && (
       <PaginitionComponent currentPage={currentpage} total={totalpage} onPageChange={handlePageChange}/>
       )}
    </div>
        
    </div>
  )
}
