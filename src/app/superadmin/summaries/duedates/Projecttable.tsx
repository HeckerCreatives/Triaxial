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


type Project = {
  createdAt: string
deadlinedate: string
invoiced: number
managerName: string
projectname: string
startdate: string
status: string
teamname: string
updatedAt: string
client: string
_id: string
jobno: string
}

type Team ={
  _id: string
  teamname: string
  projectCount: number,
  managerFullname: string,
  teamLeaderFullname: string
}

export default function Projecttable() {
  const [dialog, setDialog] = useState(false)
  const [dialog2, setDialog2] = useState(false)
  const [dialog6, setDialog6] = useState(false)
  const [loading, setLoading] = useState(false)

  const [list, setList] = useState<Team[]>([])
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
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/teams/listprojectduedatesa?searchproject=${search}&page=${currentpage}&limit=10`,{
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
            }
        })
        setList(response.data.data.teamProjects)
        setTotalpage(response.data.data.totalpages)
        setLoading(false)
     
      }
      getList()
    },500)
    return () => clearTimeout(timer)
    
  },[currentpage, search, refresh])

  const getList = async () => {
    setLoading(true)
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/projects/listprojectsa?searchproject=${search}&page=0&limit=10`,{
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
        }
    })
    setList(response.data.data.projectlist)
    setTotalpage(response.data.data.totalpages)
    setLoading(false)
 
  }

   //paginition
   const handlePageChange = (page: number) => {
    setCurrentpage(page)
  }

  const statusColor = (data: string) => {
    if(data === 'On-going'){
      return 'text-blue-500'
    } else if(data === 'Complete'){
      return 'text-green-500'
    } else{
      return 'text-red-500'
    }
  }

  return (
   <div className=' w-full h-full flex justify-center bg-secondary p-6 text-zinc-100'>

    <div className=' w-full flex flex-col max-w-[1520px]'>

      <div className=' w-full flex items-center justify-between'>
        <div className=' flex items-center gap-2'>

          {/* <Createprojectform onClick={() => undefined}>
            <button className=' bg-red-700 p-2 rounded-sm text-zinc-100'><FilePlus2 size={15}/></button>
          </Createprojectform> */}

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
            <TableHead>Team Name</TableHead>
            <TableHead>Project Manager</TableHead>
            <TableHead>Team Leader</TableHead>
            <TableHead>Total Projects</TableHead>
            <TableHead className="">Due Dates</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
          {list.map((item, index) => (
            <TableRow key={index}>
            <TableCell>{item.teamname}</TableCell>
            <TableCell>{item.managerFullname}</TableCell>
            <TableCell>{item.teamLeaderFullname}</TableCell>
            <TableCell>{item.projectCount}</TableCell>
            <TableCell>
              <a href={`/pm/summaries/duedates/viewduedates?projectid=${item._id}`} className=' w-fit bg-red-700 rounded-sm p-1 text-white flex items-center gap-2'><Eye size={15}/> View</a>
            </TableCell>
            

            </TableRow>
          ))}
            
        </TableBody>
        </Table>

        {list.length !== 0 && (
       <PaginitionComponent currentPage={currentpage} total={totalpage} onPageChange={handlePageChange}/>
       )}
    </div>
        
    </div>
  )
}
