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
import axios from 'axios'
import Spinner from '@/components/common/Spinner'
import PaginitionComponent from '@/components/common/Pagination'
import Approvewdrequest from '@/components/forms/Wdsuperadmin'
import { DDMMYY, DDMMYYHMS } from '@/utils/functions'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Welnnessday = {
  firstdayofwellnessdaycycle: string
  manager: string
  requestdate: string
  requestid: string
  user: string
  wdrequesttimestamp: string
  status: string
}


export default function Wellnesstable() {
  const [dialog, setDialog] = useState(false)
  const [list, setList] = useState<Welnnessday[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [totalpage, setTotalpage] = useState(0)
  const [currentpage, setCurrentpage] = useState(0)
  const [status, setStatus] = useState('Pending')
  

  //wellness day list
  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      const getList = async () => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/wellnessday/wellnessdaylistrequest?page=${currentpage}&limit=10&fullnamefilter=${search}&status=${status}`,{
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
            }
        })
  
        setList(response.data.data.requestlist)
        setTotalpage(response.data.data.totalpages)
        setLoading(false)

        if(search !== ''){
          setCurrentpage(0)
        }
       
      }
      getList()
    }, 500)
    return () => clearTimeout(timer)
    
  },[search, currentpage, status])

  //paginition
  const handlePageChange = (page: number) => {
    setCurrentpage(page)
  }

  return (
    <div className=' w-full h-full flex justify-center bg-secondary p-6 text-zinc-100'>

      <div className=' w-full flex flex-col max-w-[1520px]'>
        <div className=' flex md:flex-row flex-col items-center justify-end gap-4'>

            {/* <div className=' flex items-center gap-2'>
                <Input value={search} onChange={(e) => setSearch(e.target.value)} type='text' className=' bg-primary h-[35px] text-zinc-100'/>
                <button className=' bg-red-700 px-8 py-2 rounded-sm text-xs'>Search</button>
            </div> */}

            <div className=' flex flex-col gap-1'>
                <label htmlFor="" className=' text-xs'>Search</label>
                <Input value={search} placeholder='Search name (clear the input to reset)' onChange={(e) => setSearch(e.target.value)} type='text' className=' w-[300px] bg-primary text-zinc-100 text-xs h-[35px]'/>
                {/* <button className='px-8 py-2 rounded-sm text-xs bg-red-700'>Search</button> */}
            </div>
            
        </div>

          {/* <label htmlFor="" className=' text-xs text-zinc-400 mt-4'>Filter by status</label>
      <Select value={status} onValueChange={setStatus}>
      <SelectTrigger className="w-[180px] bg-primary mt-2">
        <SelectValue placeholder="Filter by status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Pending">Pending</SelectItem>
        <SelectItem value="Approved">Approved</SelectItem>
        <SelectItem value="Denied">Denied</SelectItem>
      </SelectContent>
    </Select> */}

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
                    <TableHead className=' text-[.6rem]'>Manager</TableHead>
                    <TableHead className=' text-[.6rem]'>Wd Request Timestamp</TableHead>
                    <TableHead className=' text-[.6rem]'>Name</TableHead>
                    {/* <TableHead className=' text-[.6rem]'>First Day of Wellness Day Cycle</TableHead> */}
                    <TableHead className=' text-[.6rem]'>Wellness Day</TableHead>
                    {/* <TableHead className=' text-[.6rem]'>Total Number of Working Days</TableHead>
                    <TableHead className=' text-[.6rem]'>Total Working Hours During Wellness Day Cycle</TableHead> */}
                    <TableHead className=' text-[.6rem]'>Status</TableHead>
                    {/* <TableHead className=' text-[.6rem]'>Action</TableHead> */}
                    </TableRow>
                </TableHeader>
                <TableBody>
                  {list.map((item, index) => (
                    <TableRow key={item.requestid}>
                    <TableCell className=' text-[.6rem]'>{item.manager}</TableCell>
                    <TableCell className=' text-[.6rem]'>{DDMMYYHMS(item.wdrequesttimestamp)}</TableCell>
                    <TableCell className=' text-[.6rem]'>{item.user}</TableCell>
                    {/* <TableCell className=' text-[.6rem]'>{DDMMYY(item.requestdate)}</TableCell> */}
                    <TableCell className=' text-[.6rem]'>{DDMMYY(item.requestdate)}</TableCell>
                    {/* <TableCell className=' text-[.6rem]'>1</TableCell>
                    <TableCell className=' text-[.6rem]'>8.44</TableCell> */}
                    <TableCell className=' text-[.6rem] text-green-300'>Approved</TableCell>
                    {/* <TableCell>
                    <Approvewdrequest start={item.requestdate} id={item.requestid} >
                        
                          <button className=' whitespace-nowrap bg-red-700 text-white text-xs p-2 rounded-sm'>Approved / Denied</button>
                       </Approvewdrequest>
                     
                    </TableCell>
         */}
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
