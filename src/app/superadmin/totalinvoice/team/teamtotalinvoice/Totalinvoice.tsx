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
import { Plus, Delete, Trash, Eye, FileDown, Printer, ReceiptText } from 'lucide-react'
import Button from '@/components/common/Button'
import { useSearchParams } from 'next/navigation'
import axios from 'axios'
import Spinner from '@/components/common/Spinner'

type Total = {
  budgettype: string
componentid: string
estimatedbudget: string
jobcomponent: string
jobnumber: string
projectname: string
jobmanager: {
  employeeid: string
fullname: string
} 

monthlyInvoices: [
  {
    month: number
    totalAmount: number
    year: number
  }
]
}

export default function Totalinvoice() {
  const [dialog, setDialog] = useState(false)
  const [dialog2, setDialog2] = useState(false)
  const [dialog3, setDialog3] = useState(false)
  const params = useSearchParams()
  const id = params.get('teamid')
  const [list, setList] = useState<Total[]>([])
  const [loading, setLoading] = useState(false)

  function getLastSixMonthsIncludingCurrent(): string[] {
    const months = [];
    const now = new Date();
  
    // Loop to get the current month and the previous 6 months
    for (let i = 0; i <= 6; i++) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const month = date.toLocaleString('default', { month: 'long' }); // Get the month name (e.g., 'January')
      months.push(month);
    }
  
    return months;
  }


  useEffect(() => {
    setLoading(true)
    const getList = async () => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/projectinvoice/listcomponenttotalinvoice?teamid=${id}`,{
            withCredentials: true
        })

        setList(response.data.data)
        setLoading(false)
     
    }
    getList()
  },[])

  const  getMonthName = (monthNumber: number) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
  
  return monthNames[monthNumber - 1] || "Invalid month";
}
  
    
  

  return (
   <div className=' w-full h-full flex justify-center bg-secondary text-zinc-100'>

    <div className=' w-full gap-4 max-w-[1520px]'>

      <div className=' w-full flex flex-col gap-4'>
        <Table className=' mt-4 text-xs'>
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
            <TableHead className="">Job no.</TableHead>
            <TableHead>Job Component</TableHead>
            <TableHead>Project</TableHead>
            <TableHead>Project Manager</TableHead>
    
            {list[0]?.monthlyInvoices.map((item, index) => (
            <TableHead key={index}>{getMonthName(item.month)}</TableHead>
            ))}
            
            </TableRow>
        </TableHeader>
        <TableBody>
          {list.map((item, index) => (
            <TableRow>
              <TableCell className=" text-red-600">{item.jobnumber}</TableCell>
              <TableCell>{item.jobcomponent}</TableCell>
              <TableCell>{item.projectname}</TableCell>
              <TableCell>{item.jobmanager.fullname}</TableCell>
              {item.monthlyInvoices.map((total, index) => (
              <TableCell key={ index}>$ {total.totalAmount}</TableCell>
              ))}
            
            </TableRow>
          ))}
            
        </TableBody>
        </Table>

       
      </div>

      {/* <div className=' w-full flex flex-col gap-4'>
        <Table className=' mt-4 text-xs'>
        <TableHeader>
            <TableRow>
            <TableHead className="">Current Month</TableHead>
            <TableHead>Dec.</TableHead>
            <TableHead>Jan.</TableHead>
            
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow>
            <TableCell>999</TableCell>
            <TableCell>999</TableCell>
            <TableCell>999</TableCell>
            
            </TableRow>
        </TableBody>
        </Table>

        
      </div> */}
     
       
    </div>
        
    </div>
  )
}
