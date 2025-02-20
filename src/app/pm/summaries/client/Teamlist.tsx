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
import { clientColor } from '@/utils/helpers'


type Client  ={
  clientName: string
  priority: string
  forecastInvoicing: number 
  totalInvoiceRequested: number
  wip: number
  clientid: string
}

export default function Teamlist() {
  const router = useRouter()
  const [totalpage, setTotalpage] = useState(0)
  const [currentpage, setCurrentpage] = useState(0)
  const [list, setList] = useState<Client[]>([])
  const [loading, setLoading] = useState(false)

  //paginition
  const handlePageChange = (page: number) => {
    setCurrentpage(page)
  }

  useEffect(() => {
    setLoading(true)
    const getList = async () => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/invoice/listclienttotalinvoice`,{
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
     
        <Table className=' mt-4 table-auto'>
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
            <TableHead className="">Client</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>WIP</TableHead>
            <TableHead>Action</TableHead>
            
            </TableRow>
        </TableHeader>
        <TableBody>
            {list.map((item, index) => (
                <TableRow key={index}>
                <TableCell className={` ${clientColor(item.priority)} text-black`}>{item.clientName}</TableCell>
                <TableCell className={` ${clientColor(item.priority)} text-black`}>{item.priority}</TableCell>
                <TableCell className={` ${clientColor(item.priority)} text-black`}>$ {item.wip.toLocaleString()}</TableCell>
                <TableCell className={` flex items-center gap-2 ${clientColor(item.priority)} text-black `}>
                    <button onClick={() => router.push(`/pm/summaries/client/clienttotalinvoice?clientid=${item.clientid}`)} className=' bg-red-600 px-2 py-1 text-xs rounded-sm text-white flex items-center gap-1'><Eye size={12}/>Total Invoice</button>
                </TableCell>
                </TableRow>
            ))}
            
        </TableBody>
        </Table>

      
          {/* <PaginitionComponent currentPage={currentpage} total={totalpage} onPageChange={handlePageChange}/> */}
      
    </div>
        
    </div>
  )
}
