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
import { Plus, Delete, Trash, Eye } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Leaveformadmin from '@/components/forms/Leaveformadmin'
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { leaveType } from '@/types/data'
import PaginitionComponent from '@/components/common/Pagination'
import Spinner from '@/components/common/Spinner'


type Leave = {
  requestid: string
  manager:  string
  status:  string
  name:  string
  type: number,
  leavestart:  string
  leaveend:  string
  
}

type Caculate = {
  totalworkingdays:  number
  inwellnessday: boolean
  totalHoliday:  number
  totalworkinghoursonleave:  number
  workinghoursduringleave: number
}

type LeaveWithCalculation = Leave & Caculate;


export default function Sickleavetable() {
  const [dialog, setDialog] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const [totalpage, setTotalpage] = useState(0)
  const [currentpage, setCurrentpage] = useState(0)

  //list
  const [searchName, setSearchName] = useState('')
  const [list, setList]= useState([])
  useEffect(() => {
    setLoading(true)
    try {
      const timer = setTimeout(() => {
        const getList = async () => {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/leave/superadminleaverequestlist?page=0&limit=10&status=Pending`,{
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json'
              }
          })
      
          console.log('Leave list',response.data)
          setList(response.data.data.requestlist)
          // setTotalpage(response.data.data.totalpages)
          setLoading(false)

      
        
        }
        getList()
      }, 500)
      return () => clearTimeout(timer)
  } catch (error) {
      setLoading(false)

      if (axios.isAxiosError(error)) {
              const axiosError = error as AxiosError<{ message: string, data: string }>;
              if (axiosError.response && axiosError.response.status === 401) {
                  toast.error(`${axiosError.response.data.data}`)
                  router.push('/')   
              }

              if (axiosError.response && axiosError.response.status === 400) {
                  toast.error(`${axiosError.response.data.data}`)     
                    
              }

              if (axiosError.response && axiosError.response.status === 402) {
                  toast.error(`${axiosError.response.data.data}`)          
                        
              }

              if (axiosError.response && axiosError.response.status === 403) {
                  toast.error(`${axiosError.response.data.data}`)              
                
              }

              if (axiosError.response && axiosError.response.status === 404) {
                  toast.error(`${axiosError.response.data.data}`)             
              }
      } 
    
  }
    
    
  },[searchName])


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

  //leave list
  useEffect(() => {
    const timer = setTimeout(() => {
      const fetchLeaveData = async () => {
        setLoading(true);
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/leave/superadminleaverequestlist?page=${currentpage}&limit=10&status=Pending&employeenamefilter=${searchName}`,
            {
              withCredentials: true,
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
  
          setTotalpage(response.data.data.totalpages)
    
          const leaveList: Leave[] = response.data.data.requestlist;
    
          // Fetch calculated data for each leave item in parallel
          const leaveWithCalculations = await Promise.all(
            leaveList.map(async (leave) => {
              const calculateData = await getCalculate(leave.leavestart, leave.leaveend);
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
    }, 500)

    return () => clearTimeout(timer)
    
  }, [currentpage, searchName]);

  const findType = (id: number) => {
    const find = leaveType.find((item) => item.id === id)

    return find?.type
  }


  console.log(leave)

  //paginition
  const handlePageChange = (page: number) => {
    setCurrentpage(page)
  }

  return (
    <div className=' w-full h-full flex justify-center bg-secondary p-6 text-zinc-100'>

      <div className=' w-full flex flex-col max-w-[1520px]'>
        <div className=' flex md:flex-row flex-col items-center justify-between gap-4'>

          <div className=' flex items-center gap-2'>
            <p className=' text-xs text-zinc-400'>Status Legend:</p>
            <p className=' bg-purple-700 text-zinc-100 text-xs px-4 py-1 rounded-sm'>Leave Today</p>
            <p className=' bg-cyan-700 text-zinc-100 text-xs px-4 py-1 rounded-sm'>Pending Leave</p>

          </div>

            <div className=' flex items-center gap-2'>
                <Input value={searchName} onChange={(e) => setSearchName(e.target.value)} placeholder='Search' type='text' className=' bg-primary h-[35px] text-zinc-100'/>
                <button className=' bg-red-700 px-8 py-2 rounded-sm text-xs'>Search</button>
            </div>
            
        </div>

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
            {/* <TableHead className=' text-xs' >Approved Timestamp</TableHead> */}
            <TableHead className=' text-xs'>Manager</TableHead>
            <TableHead className=' text-xs'>Status</TableHead>
            <TableHead className=' text-xs'>Name</TableHead>
            <TableHead className=' text-xs'>Leave Type</TableHead>
            <TableHead className=' text-xs'>First day of Leave</TableHead>
            <TableHead className=' text-xs'>Last day of Leave</TableHead>
            <TableHead className=' text-xs'>Total Number of Working Days</TableHead>
            <TableHead className=' text-xs'>Total Public Holidays</TableHead>
            <TableHead className=' text-xs'>In a Wellness Day Cycle?</TableHead>
            <TableHead className=' text-xs'>Total Working Hours on Leave</TableHead>
            <TableHead className=' text-xs'>Total Worked Hours during Leave</TableHead>
            {/* <TableHead className=' text-xs'>Total Hours for Payroll</TableHead> */}
            <TableHead className=' text-xs'>Action</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
          {leave.map((item, index) => (
             <TableRow key={index}>
             <TableCell className="">{item.manager}</TableCell>
             <TableCell>{item.status}</TableCell>
             <TableCell>{item.name}</TableCell>
             <TableCell>{findType(item.type)}</TableCell>
             <TableCell>{item.leavestart}</TableCell>
             <TableCell>{item.leaveend}</TableCell>
             <TableCell>{item.totalworkingdays}</TableCell>
             <TableCell>{item.totalHoliday}</TableCell>
             <TableCell>{item.inwellnessday === true ? 'Yes' : 'No'}</TableCell>
             <TableCell>{item.totalworkinghoursonleave.toFixed(2)}</TableCell>
             <TableCell>{item.workinghoursduringleave.toFixed(2)}</TableCell>
             {/* <TableCell>Test</TableCell> */}
             {/* <TableCell>16/08/24</TableCell> */}
             <TableCell className="">
               <Leaveformadmin onClick={() => undefined}>
                 
                   <button className=' whitespace-nowrap bg-red-700 text-white text-xs p-2 rounded-sm'>Approved / Denied</button>
                </Leaveformadmin>
              
             </TableCell>
 
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


