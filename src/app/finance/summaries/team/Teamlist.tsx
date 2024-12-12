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
import { Plus, Delete, Trash, Eye, FileDown, Printer, ReceiptText } from 'lucide-react'
import Button from '@/components/common/Button'
import { useRouter } from 'next/navigation'
import PaginitionComponent from '@/components/common/Pagination'
import axios from 'axios'
import Spinner from '@/components/common/Spinner'


type Team  ={
teamName: string
clientName: string
teamLeader: {
    id: string
    name: string
},
manager: {
    id: string
    name: string
},
projectCount: number,
forecastinvoicing: number,
totalinvoicerequested: number,
teamId: string
wip: number

}

export default function Teamlist() {
  const router = useRouter()
  const [totalpage, setTotalpage] = useState(0)
  const [currentpage, setCurrentpage] = useState(0)
  const [list, setList] = useState<Team[]>([])
  const [loading, setLoading] = useState(false)

  //paginition
  const handlePageChange = (page: number) => {
    setCurrentpage(page)
  }

  useEffect(() => {
    setLoading(true)
    const getList = async () => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/invoice/listteamtotalinvoice`,{
            withCredentials: true
        })

        setList(response.data.data)
        setTotalpage(response.data.data.totalpages)
        setLoading(false)
    }
    getList()
  },[])

  return (
   <div className=' w-full h-full flex justify-center bg-secondary text-zinc-100'>

    <div className=' w-full flex flex-col max-w-[1520px]'>
     
        <Table className=' mt-4'>
        {list?.length === 0 &&  
          <TableCaption className=' text-xs text-zinc-500'>No data</TableCaption>
          }
          
        {loading === true && (
            <TableCaption className=' '>
              <Spinner/>
            </TableCaption>
          )}
        <TableHeader>
            <TableRow>
            <TableHead className="">Team Name</TableHead>
            <TableHead>Team Leader</TableHead>
            <TableHead>Project Manager</TableHead>
            <TableHead>WIP</TableHead>
            <TableHead> 12 Months Forecast Invoicing</TableHead>
            <TableHead>Total Invoice Requested</TableHead>
            <TableHead>Action</TableHead>
            
            </TableRow>
        </TableHeader>
        <TableBody>
            {list.map((item, index) => (
                <TableRow key={index}>
                <TableCell className="font-medium">{item.teamName}</TableCell>
                <TableCell>{item.teamLeader.name}</TableCell>
                <TableCell>{item.manager.name}</TableCell>
                <TableCell>$ {item.wip.toLocaleString()}</TableCell>
                <TableCell>$ {item.forecastinvoicing.toLocaleString()}</TableCell>
                <TableCell>$ {item.totalinvoicerequested.toLocaleString()}</TableCell>
                <TableCell className=" flex items-center gap-2">
                    <button onClick={() => router.push(`/finance/totalinvoice/team/teamtotalinvoice?teamid=${item.teamId}`)} className=' bg-red-600 px-2 py-1 text-xs rounded-sm text-white flex items-center gap-1'><Eye size={12}/>View</button>
                </TableCell>
                </TableRow>
            ))}
            
        </TableBody>
        </Table>

      
          <PaginitionComponent currentPage={currentpage} total={totalpage} onPageChange={handlePageChange}/>
      
    </div>
        
    </div>
  )
}
