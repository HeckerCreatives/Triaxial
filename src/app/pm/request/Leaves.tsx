"use client"
import React, { useEffect, useState } from 'react'
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
import toast from 'react-hot-toast'
import { leaveType } from '@/types/data'
import PaginitionComponent from '@/components/common/Pagination'
import Spinner from '@/components/common/Spinner'
import { cache } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"



type Leave = {
  employeeid: string
  requestid: string
  type: number
  startdate: string
  enddate: string
  status: string
  totalworkingdays: number
  totalpublicholidays: number
  wellnessdaycycle: boolean
  workinghoursduringleave: number
  comments: string
  workinghoursonleave: number
  
}

type Caculate = {
  totalworkingdays:  number
  inwellnessday: boolean
  totalHoliday:  number
  totalworkinghoursonleave:  number
  workinghoursduringleave: number
}







export default function Leaves() {
  const router = useRouter()
  const params = useSearchParams()
  const refresh = params.get('state')
  const [totalpage, setTotalpage] = useState(0)
  const [currentpage, setCurrentpage] = useState(0)
  const [status, setStatus] = useState('Pending')

   //paginition
   const handlePageChange = (page: number) => {
    setCurrentpage(page)
  }




  //leave
  const [loading, setLoading] = useState(false)
  const [leave, setLeave] = useState<Leave[]>([])

  useEffect(() => {
    const fetchLeaveData = cache(async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/leave/employeeleaverequestlist?status=${status}&page=${currentpage}&limit=10`,
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        setTotalpage(response.data.data.totalpage)
        setLeave(response.data.data.requestlist)
        setLoading(false);
  
      
      } catch (error) {
        setLoading(false);
  
       
      }
    });
  
    fetchLeaveData();
  }, [refresh, currentpage, status]);

  const findType = (id: number) => {
    const find = leaveType.find((item) => item.id === id)

    return find?.type
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




  
  return (
    <div className=' w-full h-full flex justify-center bg-secondary p-6 text-zinc-100'>

      <div className=' w-full max-w-[1520px] flex flex-col'>
        <label htmlFor="" className=' text-xs text-zinc-400'>Filter by status</label>
      <Select value={status} onValueChange={setStatus}>
      <SelectTrigger className="w-[180px] bg-primary mt-2">
        <SelectValue placeholder="Filter by status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Pending">Pending</SelectItem>
        <SelectItem value="Approved">Approved</SelectItem>
        <SelectItem value="Rejected">Rejected</SelectItem>
      </SelectContent>
    </Select>

          <Table className=' mt-4'>
          {leave.length === 0 &&  
          <TableCaption className=' text-xs text-zinc-500'>No data</TableCaption>
          }
          
        {loading === true && (
            <TableCaption className=' '>
              <Spinner/>
            </TableCaption>
          )}
          <TableHeader>
              <TableRow>
              <TableHead className=' text-xs'>Leave Type</TableHead>
              <TableHead className=' text-xs'>First day of Leave</TableHead>
              <TableHead className=' text-xs'>Last day of Leave</TableHead>
              <TableHead className=' text-xs'>Total Number of Working Days</TableHead>
              <TableHead className=' text-xs'>Total Public Holidays</TableHead>
              <TableHead className=' text-xs'>In a Wellness Day Cycle?</TableHead>
              <TableHead className=' text-xs'>Total Working Hours on Leave</TableHead>
              <TableHead className=' text-xs'>Total Worked Hours during Leave</TableHead>
              {/* <TableHead className=' text-xs'>Total Hours for Payroll</TableHead> */}
              <TableHead className=' text-xs'>Status</TableHead>

              </TableRow>
          </TableHeader>
          <TableBody>
            {leave.map(( item, index) => (
              <TableRow key={index}>
              <TableCell className="font-medium">{findType(item.type)}</TableCell>
              <TableCell>{item.startdate}</TableCell>
              <TableCell>{item.enddate}</TableCell>
              <TableCell>{item.totalworkingdays}</TableCell>
              <TableCell>{item.totalpublicholidays}</TableCell>
              <TableCell>{item.wellnessdaycycle === true ? 'Yes' : 'No'}</TableCell>
              <TableCell>{item?.workinghoursonleave ? item.workinghoursonleave.toFixed(2) : '0'}</TableCell>
              <TableCell>{item.workinghoursduringleave}</TableCell>
              <TableCell className={` ${statusColor(item.status)} text-xs`}>{item.status}</TableCell>
     
              </TableRow>
            ))}
              
          </TableBody>
          </Table>

          {leave.length !== 0 && (
          <PaginitionComponent currentPage={currentpage} total={totalpage} onPageChange={handlePageChange}/>
          )}
      
        

      </div>
        
    </div>
  )
}
