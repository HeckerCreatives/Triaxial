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
import Editwfhrequest from '@/components/forms/Editwfhrequest'
import { Pen } from 'lucide-react'
import { Wfhemployee } from '@/types/types'
import { statusColor } from '@/utils/functions'


export default function Wfh() {
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


  //wfh
  const [loading, setLoading] = useState(false)
  const [leave, setLeave] = useState<Wfhemployee[]>([])

  useEffect(() => {
    const fetchLeaveData = cache(async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/wfh/listwfhrequestemployee?statusfilter=${status}&page=${currentpage}&limit=10`,
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
              <TableHead className=' text-xs'>Requested at</TableHead>
              <TableHead className=' text-xs'>First day of Wfh</TableHead>
              <TableHead className=' text-xs'>Last day of Wfh</TableHead>
              <TableHead className=' text-xs'>Total hours Wfh</TableHead>
              <TableHead className=' text-xs'>In a Wellness Day Cycle?</TableHead>
              <TableHead className=' text-xs'>Status</TableHead>
              {status === 'Pending' && (
              <TableHead className=' text-xs'>Action</TableHead>

              )}

              </TableRow>
          </TableHeader>
          <TableBody>
            {leave.map(( item, index) => (
              <TableRow key={index}>
              <TableCell>{new Date(item.createdAt).toLocaleString()}</TableCell>
              <TableCell>{item.requestdate}</TableCell>
              <TableCell>{item.requestend}</TableCell>
              <TableCell>{item.totalhourswfh.toFixed(2)}</TableCell>
              <TableCell>{item.wellnessdaycycle === true ? 'Yes' : 'No'}</TableCell>
              <TableCell className={` ${statusColor(item.status)} text-xs`}>{item.status}</TableCell>
              {status === 'Pending' && (
               <TableCell className=''>
                <Editwfhrequest requestid={item.requestid} requestdate={item.requestdate} requestend={item.requestend} wellnessdaycycle={item.wellnessdaycycle} totalhourswfh={item.totalhourswfh}>
                  <button className=' p-2 bg-red-600 rounded-md text-white'><Pen size={15}/></button>
                </Editwfhrequest>
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
