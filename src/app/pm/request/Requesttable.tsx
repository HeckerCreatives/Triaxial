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
import { Wellnessday } from '@/types/types'
import { formatDate } from '@/utils/functions'
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
import { Pen, Trash2 } from 'lucide-react'
import Editwdrequest from '@/components/forms/Editwdrequest'


const Tab = [
  "Leave",
  "Wellness Day",
  "WFH",
]


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

  //delete
  const deleteRequest = async (id: string) => {
    router.push('?state=true')
    try {
      const request = axios.post(`${process.env. NEXT_PUBLIC_API_URL}/wellnessday/deletewellnessdayrequest`,{
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
        loading: 'Updating wellness day request....',
        success: `Successfully updated`,
        error: 'Error while updating wellness day request',
    });

   if(response.data.message === 'success'){
     router.push('?state=false')

   }

  } catch (error) {

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
                <TableHead>Wellness Day</TableHead>
                <TableHead className="">First Day of Wellness Day Cycle</TableHead>
                <TableHead className="">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
              {list.map((item, index) => (
                <TableRow key={index}>
                <TableCell className="">{new Date(item.createdAt).toLocaleString()}</TableCell>
                <TableCell>Wellness Day</TableCell>
                <TableCell>{formatDate(item.requestdate)}</TableCell>
                <TableCell className="">{formatDate(item.firstdayofwellnessdaycycle)}</TableCell>
                <TableCell className=" flex items-center gap-2">
                  <Editwdrequest start={formatDate(item.requestdate)} id={item.requestid}>
                    <button className=' p-2 bg-red-600 rounded-md text-white'><Pen size={15}/></button>
                  </Editwdrequest>
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
                
                </TableRow>
              ))}
                
            </TableBody>
          </Table>

          {list.length !== 0 && (
          <PaginitionComponent currentPage={currentpage} total={totalpage} onPageChange={handlePageChange}/>
          )}
          </>
        )} 

        
        {active === 'Leave' && (
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
