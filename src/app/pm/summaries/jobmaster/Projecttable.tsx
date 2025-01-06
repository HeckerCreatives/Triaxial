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

type Components = {
  name: string,
  estimatedBudget: number,
  members: string[]
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


  const clientColor = (data: string) => {
    if(data.includes('1')){
      return 'bg-red-500'
    } else if(data.includes('2')){
      return 'bg-blue-500'
    } else if(data.includes('3')){
      return 'bg-green-500'
    } 
  }

  return (
   <div className=' w-full h-full flex justify-center bg-secondary p-6 text-zinc-100'>

    <div className=' w-full flex flex-col max-w-[1520px]'>

      <div className=' w-full flex items-center justify-between'>
        <div className=' flex items-center gap-2'>

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
            <TableHead>Component Budget</TableHead>
            <TableHead>% Invoice</TableHead>
            <TableHead>Job Component</TableHead>
            <TableHead>Job Members</TableHead>
            <TableHead>Team</TableHead>
   
            </TableRow>
        </TableHeader>
        <TableBody>
        {list.map((project) =>
          project.jobComponents.map((job, index) => (
            <TableRow key={index} className=' text-white'>
              <TableCell className={` ${clientColor(project.priority)} text-white underline cursor-pointer`}>
                <a href={`/pm/graph/jobcomponent?teamid=${project.teamid}`} className=' '>{project.jobno}</a>

              </TableCell>
              <TableCell className={` ${clientColor(project.priority)} text-white`}>{project.client}</TableCell>
              <TableCell className={` ${clientColor(project.priority)} text-white`}>{project.projectname}</TableCell>
              <TableCell className={` ${clientColor(project.priority)} text-white`}>{project.managerName}</TableCell>
              <TableCell className={` ${clientColor(project.priority)} text-white`}>{job.estimatedBudget}</TableCell>
              <TableCell className={` ${clientColor(project.priority)} text-white`}>{project.invoiced}</TableCell>
              <TableCell className={` ${clientColor(project.priority)} text-white`}>{job.name}</TableCell>
              <TableCell className={` flex items-center gap-2 h-[50px] ${clientColor(project.priority)} text-white`}>{job.members.map((item, index) => (
                <p key={index} className=' h-full'>{item}</p>
              ))}</TableCell>
              <TableCell className={` ${clientColor(project.priority)} text-white`}>{project.teamname}</TableCell>
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
