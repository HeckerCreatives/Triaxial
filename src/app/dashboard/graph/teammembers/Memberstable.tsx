"use client"
import React, { useEffect, useMemo, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Spinner from '@/components/common/Spinner'
import { useRouter, useSearchParams } from 'next/navigation'
import axios from 'axios'
import { TeamMembers } from '@/types/types'
import { Eye } from 'lucide-react'
import PaginitionComponent from '@/components/common/Pagination'



export default function Memberstable() {
  const [list, setList] = useState<TeamMembers[]>([])
  const [loading, setLoading] = useState(false)
  const params = useSearchParams()
  const refresh = params.get('state')
  const id = params.get('teamid')
  const [totalpage, setTotalpage] = useState(0)
  const [currentpage, setCurrentpage] = useState(0)
  const router = useRouter()

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      const getList = async () => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/teams/listteammembers?teamid=${id}&page=${currentpage}&limit=10`,{
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
            }
        })
        setList(response.data.data.teammembers)
        setTotalpage(response.data.data.totalpages)
        setLoading(false)

      }
      getList()
    },500)
    return () => clearTimeout(timer)
    
  },[currentpage, id])

  //paginition
const handlePageChange = (page: number) => {
  setCurrentpage(page)
}



  return (
   <div className=' w-full h-full flex flex-col bg-secondary p-4 text-zinc-100'>

    <div className=' flex flex-col gap-2 text-xs bg-primary p-4 w-fit'>
      <div className=' w-full flex items-center gap-4'>
        <p className=' w-[85px]'>Manager Name:</p>
        <span className=' text-red-500'>{list.length !== 0 ? list[0].manager.fullname : ''}</span>
        <button onClick={() => router.push(`/superadmin/graph/individualworkload?employeeid=${list[0].manager.employeeid}`)} className=' ml-4 text-[0.5rem] bg-red-600 p-1 rounded-sm text-white'>View Workload</button>
      </div>

      <div className=' flex items-center gap-4'>
       <p className=' w-[85px]'>Team Leader: </p>
       <span className=' text-red-500'>{list.length !== 0 ? list[0].teamleader.fullname : ''} </span>
       <button onClick={() => router.push(`/superadmin/graph/individualworkload?employeeid=${list[0].teamleader.employeeid}`)} className=' ml-4 text-[0.5rem] bg-red-600 p-1 rounded-sm text-white'>View Workload</button>
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
            <TableHead>Employee Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Resource</TableHead>
            <TableHead>Action</TableHead>
    
            </TableRow>
        </TableHeader>
        <TableBody>
          {list[0]?.members.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="">{item.employeeid}</TableCell>
              <TableCell>{item.fullname}</TableCell>
              <TableCell>{item.role}</TableCell>
              <TableCell className="">{item.resources}</TableCell>
              <TableCell className="">
                <button onClick={() => router.push(`/superadmin/graph/individualworkload?employeeid=${item.employeeid}`)} className=' text- xs bg-red-600 p-2 rounded-sm text-white'>View Workload</button>
              </TableCell>
            
            </TableRow>
          ))}
            
        </TableBody>
      </Table>
      {/* 
        {list.length !== 0 && (
       <PaginitionComponent currentPage={currentpage} total={totalpage} onPageChange={handlePageChange}/>
       )} */}
        
    </div>
  )
}
