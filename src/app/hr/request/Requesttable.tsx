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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import Actionbtn from '@/components/common/Actionbutton'
import Leaveform from '@/components/forms/Leaveform'
import WDform from '@/components/forms/Wellnessday'
import Wfhform from '@/components/forms/Wfhform'
import axios, { AxiosError } from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import toast from 'react-hot-toast'
import { leaveType } from '@/types/data'
import PaginitionComponent from '@/components/common/Pagination'
import Leaves from './Leaves'
import Wfh from './Wfh'


type Wellnessday = {
  createdAt: string
  requestdate:string 
  firstdayofwellnessdaycycle: string
}

type Leave = {
  employeeid: string
  requestid: string
  type: number
  startdate: string
  enddate: string
  status: string
  
}

type Caculate = {
  totalworkingdays:  number
  inwellnessday: boolean
  totalHoliday:  number
  totalworkinghoursonleave:  number
  workinghoursduringleave: number
}

const Tab = [
  "Leaves",
  "Wellness Day",
  "WFH",
]

type LeaveWithCalculation = Leave & Caculate;





export default function Requesttable() {
  const [dialog, setDialog] = useState(false)
  const [tab, setTab] = useState('Leave')
  const [list, setLiest] = useState<Wellnessday[]>([])
  const [active, setActive] = useState('Leaves')
  const router = useRouter()
  const params = useSearchParams()
  const refresh = params.get('state')
  const [totalpage, setTotalpage] = useState(0)
  const [currentpage, setCurrentpage] = useState(0)

  //wellness day
  useEffect(() => {
    const timer = setTimeout(() => {
      const getList = async () => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/wellnessday/wellnessdaylist?page=${currentpage}&limit=10`,{
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
            }
        })
  
        setLiest(response.data.data.history)
        setTotalpage(response.data.data.totalPages)
       
      }
      getList()
    }, 500)
    return () => clearTimeout(timer)
  },[refresh, currentpage])


  //paginition
  const handlePageChange = (page: number) => {
    setCurrentpage(page)
  }


  
  return (
    <div className=' w-full h-full flex justify-center bg-secondary p-6 text-zinc-100'>

      <div className=' w-full max-w-[1520px] flex flex-col'>
        <div className=' flex md:flex-row flex-col items-center justify-between gap-4'>
            <div className=' flex flex-col gap-8'>

              <div className=' flex gap-4'>
                {Tab.map((item) => (
                <p onClick={() => setActive(item)} key={item} className={` text-sm px-4 cursor-pointer ${active === item ? 'border-b-2 border-red-700' : ''}`}>{item}</p>

                ))}

              </div>

            </div>

            

        </div>

        {active === 'Wellness Day' && (
          <>
          <Table className=' mt-4'>
        <TableHeader>
            <TableRow>
            <TableHead className="">Requested at</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead className="">First Day of Wellness Day Cycle</TableHead>
            {/* <TableHead className="">Status</TableHead> */}
            </TableRow>
        </TableHeader>
        <TableBody>
          {list.map((item, index) => (
            <TableRow key={index}>
            <TableCell className="">{new Date(item.createdAt).toLocaleString()}</TableCell>
            <TableCell>Wellness Day</TableCell>
            <TableCell>{item.requestdate}</TableCell>
            <TableCell className="">{item.firstdayofwellnessdaycycle}</TableCell>
            {/* <TableCell className=" text-purple-500">Pending</TableCell> */}
            </TableRow>
          ))}
            
        </TableBody>
          </Table>

          {list.length !== 0 && (
          <PaginitionComponent currentPage={currentpage} total={totalpage} onPageChange={handlePageChange}/>
          )}
          </>
        )} 

        
        {active === 'Leaves' && (
          <>
          <Leaves/>
          </>
          
        )}

        {active === 'WFH' && (
          <>
          <Wfh/>
          </>
          
        )}

        

      </div>
        
    </div>
  )
}
