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




export default function Sickleavetable() {
  const [dialog, setDialog] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  //list
  const [searchemployee, setSearchEmployee] = useState('')
  const [list, setList]= useState([])
  useEffect(() => {
    setLoading(true)
    try {
      const timer = setTimeout(() => {
        const getList = async () => {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/leave/superadminleaverequestlist?page=0&limit=10`,{
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
    
    
  },[searchemployee])

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
                <Input placeholder='Search' type='text' className=' bg-primary h-[35px] text-zinc-100'/>
                <button className=' bg-red-700 px-8 py-2 rounded-sm text-xs'>Search</button>
            </div>
            
        </div>

        <Table className=' mt-4'>
        <TableHeader>
            <TableRow>
            <TableHead className=' text-xs' >Approved Timestamp</TableHead>
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
            <TableHead className=' text-xs'>Total Hours for Payroll</TableHead>
            <TableHead className=' text-xs'>Action</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
          {list.map(() => (
             <TableRow>
             <TableCell className="font-medium">00001</TableCell>
             <TableCell>Pending</TableCell>
             <TableCell>Test</TableCell>
             <TableCell>Test</TableCell>
             <TableCell>Test</TableCell>
             <TableCell>Test</TableCell>
             <TableCell>Test</TableCell>
             <TableCell>Test</TableCell>
             <TableCell>Test</TableCell>
             <TableCell>Test</TableCell>
             <TableCell>Test</TableCell>
             <TableCell>Test</TableCell>
             <TableCell>16/08/24</TableCell>
             <TableCell className="">
               <Leaveformadmin onClick={() => undefined}>
                 {/* <Viewbtn disabled={false} onClick={() => undefined} name='Approved / Deny'/> */}
                   <button className=' whitespace-nowrap bg-red-700 text-white text-xs p-2 rounded-sm'>Approved / Denied</button>
               </Leaveformadmin>
               {/* <Dialog open={dialog} onOpenChange={setDialog}>
                   <DialogTrigger>
                     <Viewbtn onClick={() => undefined} name='View'/>
                   </DialogTrigger>
                   <DialogContent className=' bg-secondary border-none text-zinc-100 grid grid-cols-1 lg:grid-cols-[250px,1fr]'>
                     <div className=' bg-blue-400 lg:block hidden'
                     style={{backgroundImage: `url('/bg2.png')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat:"no-repeat"}}
                     
                     >
                       <p className=' p-2 uppercase text-sm font-semibold mt-8 bg-gradient-to-r from-zinc-950 to-zinc-950/10'>Leave Request</p>
                     </div>
 
                     <div className=' flex flex-col gap-2 p-4'>
                      
                     <div className=' flex flex-col '>
                       <h2 className=' uppercase font-semibold text-sm'>Details</h2>
                       <div className=' w-full flex items-start gap-8'>
                         <div className=' flex flex-col gap-2 mt-4 text-xs'>
                           <p className=' text-zinc-400'>Request by: <span className=' text-zinc-100'>Test Test</span></p>
                           <p className=' text-zinc-400'>Start date: <span className=' text-zinc-100'>00/00/00</span></p>
                           <p className=' text-zinc-400'>End date: <span className=' text-zinc-100'>00/00/00</span></p>
                         </div>
 
                         <div className=' flex flex-col gap-2 mt-4 text-xs'>
                           <p className=' text-zinc-400'>Data: <span className=' text-zinc-100'>Test Test</span></p>
                           <p className=' text-zinc-400'>Data: <span className=' text-zinc-100'>Details</span></p>
                           <p className=' text-zinc-400'>Data: <span className=' text-zinc-100'>Details</span></p>
                         </div>
                       </div>
                       
 
                       <label htmlFor="" className=' mt-4 text-xs'>Reason:</label>
                       <Textarea placeholder='Reason' className=' bg-primary border-none h-[200px] text-xs'/>
 
                     </div>
                     
                       <div className=' w-full flex items-end justify-end gap-2 mt-8'>
                         <Actionbtn onClick={() => setDialog(false)} name='Close' color=' border-[1px] border-zinc-600'/>
                         <Actionbtn onClick={() => undefined} name='Deny' color=' border-[1px] border-red-700'/>
                         <Actionbtn onClick={() => undefined} name='Approve' color=' bg-red-700'/>
                       </div>
 
                     </div>
                     
                   </DialogContent>
                 </Dialog> */}
             </TableCell>
 
             </TableRow>
          ))}
           
        </TableBody>
        </Table>

        <Pagination className=' mt-4'>
        <PaginationContent>
            <PaginationItem>
            <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
            <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
            <PaginationNext href="#" />
            </PaginationItem>
        </PaginationContent>
        </Pagination>
      </div>
        
    </div>
  )
}


