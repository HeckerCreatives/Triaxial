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
import Editleaverequest from '@/components/forms/Editleaverequest'
import { Pen, Trash2 } from 'lucide-react'
import { Leave } from '@/types/types'
import { formatDate, statusColor } from '@/utils/functions'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import toast from 'react-hot-toast'




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
          `${process.env.NEXT_PUBLIC_API_URL}/leave/leaverequestlist?status=${status}&page=${currentpage}&limit=10`,
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

  //delete
  const deleteRequest = async (id: string) => {
    setLoading(true)
    router.push('?state=true')
    try {
      const request = axios.post(`${process.env. NEXT_PUBLIC_API_URL}/leave/deleterequestleave`,{
        requestid: id
     
      },
          {
              withCredentials: true,
              headers: {
              'Content-Type': 'application/json'
              }
          }
      )

    const response = await toast.promise(request, {
        loading: 'Deleting leave request....',
        success: `Successfully deleted`,
        error: 'Error while deleting request leave',
    });

   if(response.data.message === 'success'){
     router.push('?state=false')
     setLoading(false)

   }


 
     
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
  };




  
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
              <TableHead className=' text-xs'>Leave Type</TableHead>
              <TableHead className=' text-xs'>First day of Leave</TableHead>
              <TableHead className=' text-xs'>Last day of Leave</TableHead>
              <TableHead className=' text-xs'>Total Number of Working Days</TableHead>
              <TableHead className=' text-xs'>Total Public Holidays</TableHead>
              <TableHead className=' text-xs'>In a Wellness Day Cycle?</TableHead>
              <TableHead className=' text-xs'>Total Working Hours on Leave</TableHead>
              <TableHead className=' text-xs'>Total Worked Hours during Leave</TableHead>
              <TableHead className=' text-xs'>Details</TableHead>
              {/* <TableHead className=' text-xs'>Total Hours for Payroll</TableHead> */}
              {status !== 'Pending' && (
              <TableHead className=' text-xs'>Comments</TableHead>
              )}
              <TableHead className=' text-xs'>Status</TableHead>
              {status === 'Pending' && (
                <TableHead className=' text-xs'>Action</TableHead>

              )}

              </TableRow>
          </TableHeader>
          <TableBody>
            {leave.map(( item, index) => (
              <TableRow key={index}>
              <TableCell className="font-medium">{findType(item.type)}</TableCell>
              <TableCell>{formatDate(item.startdate)}</TableCell>
              <TableCell>{formatDate(item.enddate)}</TableCell>
              <TableCell>{item.totalworkingdays}</TableCell>
              <TableCell>{item.totalpublicholidays}</TableCell>
              <TableCell>{item.wellnessdaycycle === true ? 'Yes' : 'No'}</TableCell>
              <TableCell>{item?.workinghoursonleave ? item.workinghoursonleave.toFixed(2) : '0'}</TableCell>
              <TableCell>{item.workinghoursduringleave}</TableCell>              
              <TableCell>{item.details}</TableCell>              
              {status !== 'Pending' && (
              <TableCell>{item.comments}</TableCell>
              )}
              <TableCell className={` ${statusColor(item.status)} text-xs`}>{item.status}</TableCell>

              {status === 'Pending' && (
                <>
                <TableCell className=' flex items-center gap-2'>
                <Editleaverequest requestid={item.requestid} type={item.type} startdate={formatDate(item.startdate)} enddate={formatDate(item.enddate)} totalpublicholidays={item.totalpublicholidays} wellnessdaycycle={item.wellnessdaycycle} workinghoursduringleave={item.workinghoursduringleave} workinghoursonleave={item.workinghoursonleave} totalworkingdays={item.totalworkingdays} details={item.details}>
                  <button className=' p-2 bg-red-600 rounded-md text-white'><Pen size={15}/></button>
                </Editleaverequest>

                <AlertDialog>
                <AlertDialogTrigger><button className=' p-2 bg-red-600 text-white rounded-md'><Trash2 size={15}/></button></AlertDialogTrigger>
                <AlertDialogContent className=' text-white'>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your leave request.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => deleteRequest(item.requestid)} className=' bg-red-600'>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>


                
              </TableCell>

             
                </>
               
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
