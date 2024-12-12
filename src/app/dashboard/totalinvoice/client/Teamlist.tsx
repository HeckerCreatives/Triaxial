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


type Client  ={
    teamid: string
    clientname: string
    priority: string
    createdAt: string

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
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/clients/clientlist`,{
            withCredentials: true
        })

        setList(response.data.data.teamlist)
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
            <TableHead>priority</TableHead>
            <TableHead>Action</TableHead>
            
            </TableRow>
        </TableHeader>
        <TableBody>
            {list.map((item, index) => (
                <TableRow key={index}>
                <TableCell className="font-medium">{item.clientname}</TableCell>
                <TableCell>{item.priority}</TableCell>
                <TableCell className=" flex items-center gap-2">
                    <button onClick={() => router.push(`/superadmin/totalinvoice/client/clienttotalinvoice?clientid=${item.teamid}`)} className=' bg-red-600 px-2 py-1 text-xs rounded-sm text-white flex items-center gap-1'><Eye size={12}/>Total Invoice</button>
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
