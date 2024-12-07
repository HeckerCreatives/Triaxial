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

type Welnnessday = {
  firstdayofwellnessdaycycle: string
  manager: string
  requestdate: string
  requestid: string
  user: string
}


export default function Requesttable() {
  const [dialog, setDialog] = useState(false)
  const [list, setList] = useState<Welnnessday[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [totalpage, setTotalpage] = useState(0)
  const [currentpage, setCurrentpage] = useState(0)

  //wellness day list
  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      const getList = async () => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/wellnessday/managerwellnessdaylistrequestbyemployee?page=${currentpage}&limit=10&fullnamefilter=${search}`,{
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
    
  },[search, currentpage])

  //paginition
  const handlePageChange = (page: number) => {
    setCurrentpage(page)
  }

  return (
    <div className=' w-full h-full flex justify-center bg-secondary p-6 text-zinc-100'>

      <div className=' w-full flex flex-col max-w-[1520px]'>
        <div className=' flex md:flex-row flex-col items-center justify-end gap-4'>

            <div className=' flex flex-col gap-1'>
                <label htmlFor="" className=' text-xs'>Search</label>
                <Input value={search} placeholder='Search name (clear the input to reset)' onChange={(e) => setSearch(e.target.value)} type='text' className=' w-[300px] bg-primary text-zinc-100 text-xs h-[35px]'/>
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
            <TableHead >Manager</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>First Day of Wellness Day Cycle</TableHead>
            <TableHead>Wellness Day</TableHead>
            <TableHead>Total Number of Working Days</TableHead>
            <TableHead>Total Working Hours During Wellness Day Cycle</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
          {list.map((item, index) => (
            <TableRow key={item.requestid}>
            <TableCell>{item.manager}</TableCell>
            <TableCell>{item.user}</TableCell>
            <TableCell>{item.firstdayofwellnessdaycycle}</TableCell>
            <TableCell>{item.requestdate}</TableCell>
            <TableCell>1</TableCell>
            <TableCell>1</TableCell>
            

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
