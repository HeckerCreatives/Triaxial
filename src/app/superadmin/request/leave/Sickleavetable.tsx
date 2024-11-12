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
import { useRouter, useSearchParams } from 'next/navigation'
import { leaveType } from '@/types/data'
import PaginitionComponent from '@/components/common/Pagination'
import Spinner from '@/components/common/Spinner'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


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



export default function Sickleavetable() {
  const [dialog, setDialog] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const [totalpage, setTotalpage] = useState(0)
  const [currentpage, setCurrentpage] = useState(0)
  const currentDate = new Date()
  const [status, setStatus] = useState('Pending')
  const params = useSearchParams()
  const refresh = params.get('state')


  console.log(currentDate)

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
    
    
  },[searchName, refresh])


  const [leave, setLeave] = useState<Leave[]>([])


  //leave list
  useEffect(() => {
    const timer = setTimeout(() => {
      const fetchLeaveData = async () => {
        setLoading(true);
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/leave/superadminleaverequestlist?page=${currentpage}&limit=10&status=${status}&employeenamefilter=${searchName}`,
            {
              withCredentials: true,
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
  
          setTotalpage(response.data.data.totalpages)
          setLeave(response.data.data.requestlist)
    
         
          setLoading(false);
        } catch (error) {
          setLoading(false);
    
         
        }
      };
    
      fetchLeaveData();
    }, 500)

    return () => clearTimeout(timer)
    
  }, [currentpage, searchName, status, refresh]);

  const findType = (id: number) => {
    const find = leaveType.find((item) => item.id === id)

    return find?.type
  }


  console.log(leave)

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

  return (
    <div className=' w-full h-full flex justify-center bg-secondary p-6 text-zinc-100'>

      <div className=' w-full flex flex-col max-w-[1520px]'>
        <div className=' flex md:flex-row flex-col items-center justify-between gap-4'>

          <div className=' flex items-center gap-2'>
            <p className=' text-[.7rem] text-zinc-400'>Status Legend:</p>
            <p className=' bg-pink-500 text-zinc-100 text-[.6rem] px-4 py-1 rounded-sm'>Leave Today</p>
            <p className=' bg-blue-500 text-zinc-100 text-[.6rem] px-4 py-1 rounded-sm'>Pending Leave</p>

          </div>

            <div className=' flex flex-col gap-1'>
                <label htmlFor="" className=' text-xs'>Search</label>
                <Input value={searchName} placeholder='Search client name (clear the input to reset)' onChange={(e) => setSearchName(e.target.value)} type='text' className=' w-[300px] bg-primary text-zinc-100 text-xs h-[35px]'/>
               
            </div>
            
        </div>

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
            {status === 'Pending' && (
              <TableHead className=' text-xs'>Action</TableHead>
            )}
            </TableRow>
        </TableHeader>
        <TableBody>
          {leave.map((item, index) => (
             <TableRow key={index}>
             <TableCell className="">{item.manager}</TableCell>
             <TableCell className={` ${statusColor(item.status)} text-xs`}>{item.status}</TableCell>
             <TableCell>{item.name}</TableCell>
             <TableCell>{findType(item.type)}</TableCell>
             <TableCell>{new Date(item.leavestart).toLocaleString()}</TableCell>
             <TableCell>{new Date(item.leaveend).toLocaleString()}</TableCell>
             <TableCell>{item.totalworkingdays}</TableCell>
             <TableCell>{item.totalpublicholidays}</TableCell>
             <TableCell>{item.wellnessdaycycle === true ? 'Yes' : 'No'}</TableCell>
             <TableCell>{item?.workinghoursonleave ? item.workinghoursonleave.toFixed(2) : '0'}</TableCell>
             <TableCell>{item.workinghoursduringleave}</TableCell>

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

        {leave.length !== 0 && (
        <PaginitionComponent currentPage={currentpage} total={totalpage} onPageChange={handlePageChange}/>
        )}
      </div>
        
    </div>
  )
}


