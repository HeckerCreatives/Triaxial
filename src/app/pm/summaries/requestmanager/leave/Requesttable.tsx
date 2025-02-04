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
import axios, { AxiosError } from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import PaginitionComponent from '@/components/common/Pagination'
import Spinner from '@/components/common/Spinner'
import Wfhforpm from '@/components/forms/Wfhfrompm'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { leaveType } from '@/types/data'
import Leaveformadmin from '@/components/forms/Leaveformadmin'
import { formatDate, formatDateTime } from '@/utils/functions'



type Leave = {
  requestid: string
  manager:string
  status: string
  name:string
  type: number,
  leavestart: string
  leaveend: string
  totalworkingdays: number
  totalpublicholidays: number
  wellnessdaycycle: boolean
  workinghoursonleave: number
  workinghoursduringleave: number
  details: string
  
}






export default function Requesttable() {
  const [dialog, setDialog] = useState(false)
  const [tab, setTab] = useState('Leave')
  const [list, setLiest] = useState<Leave[]>([])
  const [active, setActive] = useState('Leaves')
  const router = useRouter()
  const params = useSearchParams()
  const refresh = params.get('state')
  const [totalpage, setTotalpage] = useState(0)
  const [currentpage, setCurrentpage] = useState(0)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('Pending')
  const [searchName, setSearchName] = useState('')



  //wfh day
  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      const getList = async () => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/leave/managerleaverequestlistemployee?status=${status}&employeenamefilter=${searchName}&page=${currentpage}&limit=10`,{
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
            }
        })
  
        setLiest(response.data.data.requestlist)
        setTotalpage(response.data.data.totalpages)
        setLoading(false)
      
      }
      getList()
    }, 500)
    return () => clearTimeout(timer)
  },[refresh, currentpage, status, searchName])


  //paginition
  const handlePageChange = (page: number) => {
    setCurrentpage(page)
  }

  const statusColor = (data: string) => {
    if(data === 'Pending'){
      return 'text-blue-500'
    } else if (data === 'Approved') {
      return 'text-green-500'
    } else {
      return 'text-red-500'
      
    }

  }

  const findType = (id: number) => {
    const find = leaveType.find((item) => item.id === id)

    return find?.type
  }


  
  return (
    <div className=' w-full h-full flex justify-center bg-secondary p-6 text-zinc-100'>

      <div className=' w-full max-w-[1520px] flex flex-col'>

      <div className=' flex md:flex-row flex-col items-center justify-between gap-4'>

        <div className=' flex flex-col gap-2'>
          <label htmlFor="" className=' text-xs text-zinc-400 mt-4'>Filter by status</label>
          <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-[180px] bg-primary mt-2">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Approved">Approved</SelectItem>
            <SelectItem value="Denied">Denied</SelectItem>
          </SelectContent>
        </Select>

        </div>

          <div className=' flex flex-col gap-1'>
                <label htmlFor="" className=' text-xs'>Search</label>
                <Input value={searchName} placeholder='Search name (clear the input to reset)' onChange={(e) => setSearchName(e.target.value)} type='text' className=' w-[300px] bg-primary text-zinc-100 text-xs h-[35px]'/>
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
            {/* <TableHead className=' text-xs' >Approved Timestamp</TableHead> */}
            <TableHead className=' text-xs'>Name</TableHead>
            <TableHead className=' text-xs'>Leave Type</TableHead>
            <TableHead className=' text-xs'>First day of Leave</TableHead>
            <TableHead className=' text-xs'>Last day of Leave</TableHead>
            <TableHead className=' text-xs'>Total Number of Working Days</TableHead>
            <TableHead className=' text-xs'>Total Public Holidays</TableHead>
            <TableHead className=' text-xs'>In a Wellness Day Cycle?</TableHead>
            <TableHead className=' text-xs'>Total Working Hours on Leave</TableHead>
            <TableHead className=' text-xs'>Total Worked Hours during Leave</TableHead>
            <TableHead className=' text-xs'>Status</TableHead>

            {/* <TableHead className=' text-xs'>Total Hours for Payroll</TableHead> */}
            {status === 'Pending' && (
              <TableHead className=' text-xs'>Action</TableHead>
            )}
            </TableRow>
        </TableHeader>
        <TableBody>
          {list.map((item, index) => (
             <TableRow key={index}>
             <TableCell>{item.name}</TableCell>
             <TableCell>{findType(item.type)}</TableCell>
             <TableCell>{formatDateTime(item.leavestart)}</TableCell>
             <TableCell>{formatDateTime(item.leaveend)}</TableCell>
             <TableCell>{item.totalworkingdays}</TableCell>
             <TableCell>{item.totalpublicholidays}</TableCell>
             <TableCell>{item.wellnessdaycycle === true ? 'Yes' : 'No'}</TableCell>
             <TableCell>{item?.workinghoursonleave ? item.workinghoursonleave.toFixed(2) : '0'}</TableCell>
             <TableCell>{item.workinghoursduringleave}</TableCell>
             <TableCell className={` ${statusColor(item.status)} text-xs`}>{item.status}</TableCell>

             {status === 'Pending' && (
              <TableCell className="">
              <Leaveformadmin onClick={() => undefined} requestid={`${item.requestid}`} manager={`${item.manager}`} status={`${item.status}`} name={`${item.name}`} type={item.type} leavestart={`${item.leavestart}`} leaveend={`${item.leaveend}`} totalworkingdays={item.totalworkingdays} totalpublicholidays={item.totalpublicholidays} wellnessdaycycle={item.wellnessdaycycle} workinghoursonleave={item.workinghoursonleave} workinghoursduringleave={item.workinghoursduringleave} details={item.details}>
                
                  <button className=' whitespace-nowrap bg-red-700 text-white text-xs p-2 rounded-sm'>Approved / Denied</button>
               </Leaveformadmin>
             
            </TableCell>
            )}
            
             
 
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
