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
import Spinner from '@/components/common/Spinner'


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





export default function Leaves() {
  const router = useRouter()
  const params = useSearchParams()
  const refresh = params.get('state')
  const [totalpage, setTotalpage] = useState(0)
  const [currentpage, setCurrentpage] = useState(0)

   //paginition
   const handlePageChange = (page: number) => {
    setCurrentpage(page)
  }




  //leave
  const [loading, setLoading] = useState(false)
  const [leave, setLeave] = useState<LeaveWithCalculation[]>([])
  const getCalculate = async (start: string, end: string): Promise<Caculate> => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/leave/calculateleavedays`, {
        params: { startdate: start, enddate: end },
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data.data as Caculate;
    } catch (error) {
      
      // Provide default values for Caculate if the API call fails
      return {
        totalworkingdays: 0,
        inwellnessday: false,
        totalHoliday: 0,
        totalworkinghoursonleave: 0,
        workinghoursduringleave: 0,
      };
    }
  };

  useEffect(() => {
    const fetchLeaveData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/leave/employeeleaverequestlist?status=Pending&page=${currentpage}&limit=10`,
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        setTotalpage(response.data.data.totalpage)
  
        const leaveList: Leave[] = response.data.data.requestlist;
  
        // Fetch calculated data for each leave item in parallel
        const leaveWithCalculations = await Promise.all(
          leaveList.map(async (leave) => {
            const calculateData = await getCalculate(leave.startdate, leave.enddate);
            return {
              ...leave, // merge original leave data
              ...calculateData, // merge calculated data
            };
          })
        );
  
        setLeave(leaveWithCalculations);
        setLoading(false);
      } catch (error) {
        setLoading(false);
  
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<{ message: string; data: string }>;
          if (axiosError.response) {
            const status = axiosError.response.status;
            const message = axiosError.response.data.data;
            if (status === 401) {
              toast.error(message);
              router.push('/');
            } else {
              toast.error(message);
            }
          }
        }
      }
    };
  
    fetchLeaveData();
  }, [refresh, currentpage]);

  const findType = (id: number) => {
    const find = leaveType.find((item) => item.id === id)

    return find?.type
  }


  console.log(leave)
  
  





     


  
  return (
    <div className=' w-full h-full flex justify-center bg-secondary p-6 text-zinc-100'>

      <div className=' w-full max-w-[1520px] flex flex-col'>
    
    
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
              <TableCell>{item.totalHoliday}</TableCell>
              <TableCell>{item.inwellnessday === true ? 'Yes' : 'No'}</TableCell>
              <TableCell>{item.totalworkinghoursonleave}</TableCell>
              <TableCell>{item.workinghoursduringleave.toFixed(2)}</TableCell>
              <TableCell>{item.status}</TableCell>
     
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
