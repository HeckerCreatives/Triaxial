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
import { Eye,  Search} from 'lucide-react'
import axios from 'axios'
import { formatDateTime } from '@/utils/functions'
import PaginitionComponent from '@/components/common/Pagination'
import Spinner from '@/components/common/Spinner'
import { useSearchParams } from 'next/navigation'


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
}

export default function Projecttable() {
  const [loading, setLoading] = useState(false)

  const [list, setList] = useState<Project[]>([])
  const [totalpage, setTotalpage] = useState(0)
  const [currentpage, setCurrentpage] = useState(0)
  const [search, setSearch] = useState('')
  const params = useSearchParams()
  const refresh = params.get('state')
  const id = params.get('teamid')

   useEffect(() => {
     setLoading(true)
     const timer = setTimeout(() => {
       const getList = async () => {
         const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/projects/teamprojectlistmanager?teamid=${id}&page=${currentpage}&limit=10`,{
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
          <div className=' flex items-start gap-8 bg-primary w-fit text-white text-[.6rem] p-4 rounded-sm mt-6'>
            <div className=' flex flex-col gap-1'>
              <p className=' text-zinc-400 text-sm'>Team Name: <span className=' text-red-600'>{list.length !== 0 ? list[0].teamname : ''}</span></p>
              <p className=' text-zinc-400 text-sm'>Manager Name: <span className=' text-red-600'>{list.length !== 0 ? list[0].managerName : ''}</span></p>
            </div>

    
          </div>

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
            <TableHead>Project Name</TableHead>
            <TableHead>Client</TableHead>
            <TableHead className="">Job Component</TableHead>
            <TableHead className="">% Invoiced</TableHead>
            <TableHead className="">Est. $</TableHead>
            <TableHead className="">Status</TableHead>
            <TableHead className="">Start</TableHead>
            <TableHead className="">Deadline</TableHead>
    
            </TableRow>
        </TableHeader>
        <TableBody>
          {list.map((item, index) => (
            <TableRow key={index}>
            <TableCell>{item.projectname}</TableCell>
            <TableCell>{item.client}</TableCell>
            <TableCell className="">
              <a href={`/pm/graph/jobcomponent?projectid=${item._id}`} className=' w-fit bg-red-700 rounded-sm p-1 text-white flex items-center gap-2'>Job Component<Eye size={15}/></a>
              </TableCell>
            <TableCell className="">{item.invoiced}</TableCell>
            <TableCell className=""></TableCell>
            <TableCell className="">{item.status}</TableCell>
            <TableCell className="">{formatDateTime(item.startdate)}</TableCell>
            <TableCell className="">{formatDateTime(item.deadlinedate)}</TableCell>
          
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
