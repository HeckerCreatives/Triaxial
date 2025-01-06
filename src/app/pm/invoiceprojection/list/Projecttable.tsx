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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Checkbox } from '@/components/ui/checkbox'
import Createprojectform from '@/components/forms/Createprojectform'
import Editprojectform from '@/components/forms/Editprojectform'
import axios from 'axios'
import { formatDateTime } from '@/utils/functions'
import PaginitionComponent from '@/components/common/Pagination'
import Spinner from '@/components/common/Spinner'
import { useRouter, useSearchParams } from 'next/navigation'
import Projectstatusform from '@/components/forms/Projectstatusform'

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

type Teams = {
  _id: string
  teamname: string
  manager: string
  teamleader: string
  projectCount: number
}

export default function Projecttable() {
  const [loading, setLoading] = useState(false)

  const [list, setList] = useState<Teams[]>([])
  const [totalpage, setTotalpage] = useState(0)
  const [currentpage, setCurrentpage] = useState(0)
  const [search, setSearch] = useState('')
  const params = useSearchParams()
  const refresh = params.get('state')
  const id = params.get('projectid')
  const router = useRouter()

  // useEffect(() => {
  //   setLoading(true)
  //   const timer = setTimeout(() => {
  //     const getList = async () => {
  //       const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/projects/listprojects?searchproject=${search}&page=${currentpage}&limit=10`,{
  //         withCredentials: true,
  //         headers: {
  //           'Content-Type': 'application/json'
  //           }
  //       })
  //       setList(response.data.data.projectlist)
  //       setTotalpage(response.data.data.totalpages)
  //       setLoading(false)
     
  //     }
  //     getList()
  //   },500)
  //   return () => clearTimeout(timer)
    
  // },[currentpage, search, refresh])



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

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/teams/listteamau`,{
          withCredentials: true
        })

        console.log(response.data)
        setList(response.data.data.teams)

      } catch (error) {
        
      }
    }
    getData()
  },[])

  
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
          <div>
            
          </div>

          {/* <div className=' flex flex-col gap-1'>
            <label htmlFor="" className=' text-xs'>Search</label>
            <Input value={search} placeholder='Search client name (clear the input to reset)' onChange={(e) => setSearch(e.target.value)} type='text' className=' w-[300px] bg-primary text-zinc-100 text-xs h-[35px]'/>
          </div> */}

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
            <TableHead>Manager</TableHead>
            <TableHead>Team Leader</TableHead>
            <TableHead>Total # of Projects</TableHead>
          
            <TableHead className="">Action</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
          {list.map((item, index) => (
            <TableRow key={index} className=' '>
            <TableCell>
              <a href={`/pm/graph/jobcomponent?teamid=${item._id}`} className=' text-red-500 underline'>{item.teamname}</a>
              </TableCell>
            <TableCell>{item.manager}</TableCell>
            <TableCell>{item.teamleader}</TableCell>
            <TableCell>{item.projectCount}</TableCell>
          
           
            <TableCell className=" flex items-center gap-2">
              <button onClick={() => router.push(`/pm/invoiceprojection?jobcomponentid=${item._id}`)} className=' bg-red-600 p-2 text-white rounded-sm flex items-center gap-2'><Eye size={15}/>View Invoice Projection</button>
              
            </TableCell>
            </TableRow>
          ))}
            
        </TableBody>
        </Table>

        {/* {list.length !== 0 && (
       <PaginitionComponent currentPage={currentpage} total={totalpage} onPageChange={handlePageChange}/>
       )} */}
    </div>
        
    </div>
  )
}
