"use client"
import React, { cache, useEffect, useState } from 'react'
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
import { Plus, Delete, Trash, Eye } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import ButtonSecondary from '@/components/common/ButtonSecondary'
import Button from '@/components/common/Button'
import { Textarea } from '@/components/ui/textarea'
import axios, { AxiosError } from 'axios'
import PaginitionComponent from '@/components/common/Pagination'
import Spinner from '@/components/common/Spinner'
import refreshStore from '@/zustand/refresh'
import { usePathname, useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { DDMMYYHMS } from '@/utils/functions'

type Message = {
  _id: string
  title: string
  content: string
  senderfullname: string
  receiverfullname: string
  createdAt: string
  isRead: boolean
  foreignid: string
  status: string
}


export default function Emailtable() {
  const [dialog, setDialog] = useState(false)
  const [message, setMessage] = useState(false)
  const [loading, setLoading] = useState(false)
  const [totalpage, setTotalpage] = useState(0)
  const [currentpage, setCurrentpage] = useState(0)
  const [list, setList] = useState<Message[]>([])
  const [open, setOpen] = useState<Message>()
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [name, setName] = useState('')
  const [content, setContent] = useState('')
  const { refresh, setRefresh, clearRefresh} = refreshStore()

  const [loading1, setLoading1] = useState(false)
  const [comments, setComments] = useState('')
  const router = useRouter()
  const path = usePathname()
  const apiUrl = path.includes('/superadmin') && '/leave/superadminprocessleaverequest' || path.includes('/pm') && '/leave/managerprocessleaverequest'
  const [foreignId, setForeignId] = useState('')
  const [status, setStatus] = useState('')


  //messages
  useEffect(() => {
    const fetchLeaveData = cache(async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/email/listemail?page=${currentpage}&limit=10`,
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        setTotalpage(response.data.data.totalpage)
        setList(response.data.data.emaillist)
        setLoading(false);
  
      
      } catch (error) {
        setLoading(false);
  
       
      }
    });
  
    fetchLeaveData();
  }, [ currentpage, refresh]);

  //paginition
  const handlePageChange = (page: number) => {
    setCurrentpage(page)
  }

  const openMessage = (title: string, content: string, date: string, name: string) => {
    setMessage(!message)
    setTitle(title)
    setContent(content)
    setName(name)
    setDate(date)
  }

  const readmessages = async (id: string) => {
    setRefresh('true')
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/email/reademail?emailId=${id}`,{
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if(response.data.message === 'success'){
        clearRefresh()
      }
    } catch (error) {
      
    }
  }


  const approved = async (id: string) => {
    setLoading(true)
    router.push('?state=true')

    try {
      const request = axios.post(`${process.env. NEXT_PUBLIC_API_URL}${apiUrl}`,{
      status: "Approved",
      comment : comments,
      requestid: foreignId,

      },
          {
              withCredentials: true,
              headers: {
              'Content-Type': 'application/json'
              }
          }
      )

    const response = await toast.promise(request, {
        loading: 'Approving leave request....',
        success: `Successfully approved`,
        error: 'Error while approving leave request',
    });

   if(response.data.message === 'success'){
    
     setDialog(false)
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
  }

  const reject = async (id: string) => {
    setLoading1(true)
    router.push('?state=true')

    try {
      const request = axios.post(`${process.env. NEXT_PUBLIC_API_URL}${apiUrl}`,{
      requestid: foreignId,
      status: "Denied",
      comment : comments
       
      },
          {
              withCredentials: true,
              headers: {
              'Content-Type': 'application/json'
              }
          }
      )

    const response = await toast.promise(request, {
        loading: 'Approving leave request....',
        success: `Successfully approved`,
        error: 'Error while approving leave request',
    });

   if(response.data.message === 'success'){
    
     setDialog(false)
     router.push('?state=false')
     setLoading1(false)

   }

  } catch (error) {
      setLoading1(false)

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
  }



  return (
    <div className=' w-full h-full flex justify-center bg-secondary p-6 text-zinc-100 overflow-y-auto'>

      <div className=' w-full flex flex-col max-w-[1520px]'>
        <div className=' flex md:flex-row flex-col items-center justify-between gap-4'>
           
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
       
            <TableHead>Sender</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Date | Time</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
          {list.map((item, index) => (
            <TableRow onClick={() => {openMessage(item.title,item.content, item.createdAt, item.senderfullname); readmessages(item._id); setForeignId(item.foreignid); setStatus(item.status)}} key={index} className=' w-full cursor-pointer'>
            {/* <TableCell className="font-medium"><Checkbox/></TableCell> */}
              <TableCell className=' relative'>{item.senderfullname}
                {item.isRead === false && (
                  <p className=' absolute px-2 rounded-full text-[.55rem] bg-red-600 text-white top-0 left-0'>New</p>
                )}
              </TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell className=' w-[700px] flex'>
                <p className=' line-clamp-3'>{item.content?.slice(0,150)}...
                </p>
              </TableCell>
              <TableCell>{DDMMYYHMS(item.createdAt)}</TableCell>


            <Dialog open={message} >
            <DialogTrigger className=' w-full'>
             
            </DialogTrigger>
              <DialogContent className=' max-w-[800px] p-6 bg-secondary border-none text-white'>
                <DialogHeader>
                  <DialogTitle></DialogTitle>
                  <DialogDescription>
                  </DialogDescription>
                </DialogHeader>

                <div className=' flex flex-col gap-4 w-full font-centurygothic'>
                  <p className=' text-lg font-semibold'>{title}</p>
                  <div className=' flex items-center gap-2'>
                    <div className=' flex items-center justify-center w-8 h-8 rounded-full bg-primary'>
                      <p className=' uppercase text-lg text-red-600'>{name.slice(0,1)}</p>
                    </div>

                    <div className=' flex flex-col'>
                      <p className=' text-sm font-medium flex gap-2'>{name} <span className=' text-[.7em] text-zinc-400'>{new Date(date).toLocaleString()}</span></p>
                      <p className=' text-xs text-zinc-400'>to me</p>
                    </div>

                  </div>
                  <pre className=' text-xs'>{content}</pre>
                  {/* <p className=' mt-4 whitespace-pre-wrap text-xs'>{content}</p> */}

                  {(title.includes('Leave Request') && status === 'Pending') && (
                  <div className=' w-full flex items-center justify-end gap-2'>
                  <button onClick={() => reject(item?.foreignid)} className=' text-xs bg-zinc-950 text-white px-3 py-1 rounded-md'>Denied</button>
                  <button onClick={() => approved(item?.foreignid)} className=' text-xs bg-red-600 text-white px-3 py-1 rounded-md'>Approved</button>

                  </div>
                  )}

               

                  {status === 'Approved' && (
                    <p className={` text-xs w-full text-end ${status === 'Approved' ? 'text-green-500' : 'text-red-500'}`}>{status}</p>
                  )}
                  
                </div>
              </DialogContent>
            </Dialog>

        
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
