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
import { Plus, Delete, Trash, Eye, Pen } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import axios, { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { useRouter, useSearchParams } from 'next/navigation'
import { wdrequestperiod, Wdrequestperiod } from '@/schema/schema'
import Spinner from '@/components/common/Spinner'
import PaginitionComponent from '@/components/common/Pagination'

type Team = Record<"teamname" | "teamid", string>;

type Events = {
  enddate: string
startdate: string
teams:Subdata[]
title: string
eventid: string

}

type Subdata = {
  teamname: string
_id: string

}


export default function Wdtable() {
  const [dialog, setDialog] = useState(false)

  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<Team[]>([]);
  const [inputValue, setInputValue] = React.useState("");


  const [list, setList] = useState<Events[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [totalpage, setTotalpage] = useState(0)
  const [currentpage, setCurrentpage] = useState(0)
  const router = useRouter()
  const params = useSearchParams()
  const state = params.get('state')




  //wd list
  // useEffect(() => {
  //   setLoading(true)
  //   const timer = setTimeout(() => {
  //     const getList = async () => {
  //       const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/events/listevents?page=${currentpage}&limit=10&eventtitlefilter=${search}`,{
  //         withCredentials: true,
  //         headers: {
  //           'Content-Type': 'application/json'
  //           }
  //       })
  
  //       console.log('Event list',response.data)
  //       setList(response.data.data.eventlist)
  //       setTotalpage(response.data.data.totalpages)
  //       setLoading(false)

  //       if(search !== ''){
  //         setCurrentpage(0)
  //       }
       
  //     }
  //     getList()
  //   }, 500)
  //   return () => clearTimeout(timer)
    
  // },[search, currentpage, state])

   //create date range
   const {
    register,
    handleSubmit,
    reset,
    unregister,
    setValue,
    formState: { errors },
  } = useForm<Wdrequestperiod>({
    resolver: zodResolver(wdrequestperiod),
  });

  const onSubmit = async (data: Wdrequestperiod) => {
    setLoading(true)
    const selectedIds = selected.map((row) => row.teamid);
    router.push('?state=true')
    try {
      const request = axios.post(`${process.env. NEXT_PUBLIC_API_URL}/events/createevents`,{
         
          startdate: data.start, 
          enddate: data.end, 
         
       
      },
          {
              withCredentials: true,
              headers: {
              'Content-Type': 'application/json'
              }
          }
      )

   const response = await toast.promise(request, {
       loading: 'Creating event ....',
       success: `Successfully created`,
       error: 'Error while creating event',
   });

   if(response.data.message === 'success'){
     reset()
     setDialog(false)
     router.push('?state=false')
     setLoading(false)
     setSelected([])

   }

   console.log(response)

 
     
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


  //paginition
  const handlePageChange = (page: number) => {
    setCurrentpage(page)
  }

 



  return (
    <div className=' w-full h-full flex justify-center bg-secondary p-6 mt-[150px] text-zinc-100'>

      <div className=' w-full flex flex-col max-w-[1520px]'>
        <div className=' flex md:flex-row flex-col items-center justify-between gap-4'>
            <div className=' flex  items-center gap-4'>
                <Dialog open={dialog} onOpenChange={setDialog}>
                <DialogTrigger>
                  <button className=' bg-red-700 px-6 py-2 rounded-sm flex items-center gap-1 text-xs'><Plus size={15}/>Create</button>
                </DialogTrigger>
                <DialogContent className=' bg-secondary border-none text-zinc-100 grid grid-cols-1 lg:grid-cols-[250px,1fr]'>
                  <div className=' bg-blue-400 lg:block hidden'
                  style={{backgroundImage: `url('/bg2.png')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat:"no-repeat"}}
                  
                  >
                    <p className=' p-2 uppercase text-sm font-semibold mt-8 bg-gradient-to-r from-zinc-950 to-zinc-950/10'>Wellness Day</p>
                  </div>

                  <div className=' flex flex-col gap-2 p-4'>
                    <DialogHeader>
                    <DialogDescription>
                    </DialogDescription>
                    </DialogHeader>
                  <form onSubmit={handleSubmit(onSubmit)} className=' flex flex-col '>
                    <h2 className=' uppercase font-semibold text-sm'>Wellness Day Request Period</h2>
                    <div className=' grid grid-cols-1 gap-4'>
                      <div className=' flex flex-col gap-1'>
                       


                        <label htmlFor="" className=' mt-2 text-xs'>Start date</label>
                        <Input placeholder='Start date' type='date' className=' bg-primary h-[35px] text-xs' {...register('start')}/>
                        {errors.start && <p className=' text-[.6em] text-red-500'>{errors.start.message}</p>}


                        <label htmlFor="" className=' mt-2 text-xs'>End Date</label>
                        <Input placeholder='End Date' type='date' className=' bg-primary h-[35px] text-xs' {...register('end')}/>
                        {errors.end && <p className=' text-[.6em] text-red-500'>{errors.end.message}</p>}

                      </div>

                      <div className=' w-full flex items-end justify-end gap-2 mt-8'>
                            <button disabled={loading} className=' btn-red flex items-center justify-center gap-2'>
                            {loading === true && (
                              <div className=' spinner2'></div>
                            )}
                              Create</button>
                      
                      </div>

                      
                    </div>
                      

                  </form>
                  
                    

                  </div>
                  
                </DialogContent>
                </Dialog>
            </div>

            {/* <div className=' flex items-center gap-2'>
                <Input type='text' className=' bg-primary h-[35px] text-zinc-100'/>
                <button className=' bg-red-700 px-8 py-2 rounded-sm text-xs'>Search</button>
            </div> */}

          <div className=' flex flex-col gap-1'>
                <label htmlFor="" className=' text-xs'>Search</label>
                <Input value={search} placeholder='Search event title (clear the input to reset)' onChange={(e) => setSearch(e.target.value)} type='text' className=' w-[300px] bg-primary text-zinc-100 text-xs h-[35px]'/>
                {/* <button className='px-8 py-2 rounded-sm text-xs bg-red-700'>Search</button> */}
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
            <TableHead>Id</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
          {list.map((item, index) => (
             <TableRow key={index}>
             <TableCell className="font-medium">{item.title}</TableCell>
             <TableCell className="font-medium">{item.startdate}</TableCell>
             <TableCell className="font-medium">{item.enddate}</TableCell>
            
           
 
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
