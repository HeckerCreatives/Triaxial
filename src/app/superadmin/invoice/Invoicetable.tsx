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
import axios, { AxiosError } from 'axios'
import { financeInvoice } from '@/types/types'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import Spinner from '@/components/common/Spinner'
import PaginitionComponent from '@/components/common/Pagination'
import { useRouter, useSearchParams } from 'next/navigation'
import toast from 'react-hot-toast'
import { RotateCw } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { statusColor } from '@/utils/functions'
  

export default function Invoicetable() {
  const [dialog, setDialog] = useState(false)
  const [dialog2, setDialog2] = useState(false)
  const [list, setList] = useState<financeInvoice[]>([])
  const [status, setStatus] = useState('Pending')
  const [proccessstatus, setProccessStatus] = useState('Approved')
  const [loading, setLoading] = useState(false)
  const [totalpage, setTotalpage] = useState(0)
  const [currentpage, setCurrentpage] = useState(0)
  const router = useRouter()
  const params = useSearchParams()
  const refresh = params.get('state')
  const [jobno, setJobno] = useState('')

  useEffect(() => {
    setLoading(true)
    const getInvoice = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/invoice/getinvoicelistsa?jobnofilter=${jobno}&status=${status}&page=${currentpage}&limit=10`,{
                withCredentials: true
            })

            setList(response.data.data.data)
            setLoading(false)
            setTotalpage(response.data.data.totalpage)

        } catch (error) {
            
        }
    }
    getInvoice()
  },[status, refresh, currentpage, jobno])

   //paginition
   const handlePageChange = (page: number) => {
    setCurrentpage(page)
  }

  return (
   <div className=' w-full h-full flex justify-center bg-secondary p-6 text-zinc-100'>

    <div className=' w-full flex flex-col max-w-[1520px]'>
      <div className=' flex md:flex-row flex-col items-center justify-between gap-4'>

        <div className=' flex items-center gap-2'>
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
        </div>

        <div className=' flex flex-col gap-1'>
                <label htmlFor="" className=' text-xs'>Search</label>
                <Input value={jobno} placeholder='Search job no (clear the input to reset)' onChange={(e) => setJobno(e.target.value)} type='text' className=' w-[300px] bg-primary text-zinc-100 text-xs h-[35px]'/>
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
            {/* <TableHead className="">Select</TableHead> */}
            <TableHead className="">Invoice Id</TableHead>
            <TableHead>Job no</TableHead>
            <TableHead>Job Component Name</TableHead>
            <TableHead>Manager Name</TableHead>
            <TableHead className="">Budget</TableHead>
            <TableHead className="">Budget Type</TableHead>
            <TableHead className="">Curr. In.</TableHead>
            <TableHead className="">New In.</TableHead>
            <TableHead className="">In. Amount</TableHead>
            <TableHead className="">Status</TableHead>
           
            </TableRow>
        </TableHeader>
        <TableBody>
            {list.map((item, index) => (
                <TableRow key={index}>
                {/* <TableCell className="font-medium"><Checkbox/></TableCell> */}
                <TableCell className="font-medium">{item.invoiceid}</TableCell>
                <TableCell className="font-medium">{item.jobcomponent.jobno}</TableCell>
                <TableCell className="font-medium">{item.jobcomponent.name}</TableCell>
                <TableCell className="font-medium">{item.jobcomponent.jobmanager}</TableCell>
                <TableCell className="font-medium">{item.jobcomponent.budget}</TableCell>
                <TableCell className="font-medium">{item.jobcomponent.budgettype}</TableCell>
                <TableCell className="font-medium">{item.currentinvoice}</TableCell>
                <TableCell className="font-medium">{item.newinvoice}</TableCell>
                <TableCell className="font-medium">{item.invoiceamount}</TableCell>
                <TableCell className={` ${statusColor(item.status)} text-xs`}>{item.status}</TableCell>
           
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
