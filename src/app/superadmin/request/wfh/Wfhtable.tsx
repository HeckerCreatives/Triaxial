"use client"
import React, { useState } from 'react'
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
import { Plus, Delete, Trash, Eye, ViewIcon } from 'lucide-react'
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
import ButtonDanger from '@/components/common/ButtonDanger'
import { Textarea } from '@/components/ui/textarea'
import Actionbtn from '@/components/common/Actionbutton'
import Viewbtn from '@/components/common/Viewbtn'
import Wfhformadmin from '@/components/forms/Wfhformadmin'




export default function Wfhtable() {
  const [dialog, setDialog] = useState(false)

  return (
    <div className=' w-full h-full flex justify-center bg-secondary p-6 mt-[150px] text-zinc-100'>

      <div className=' w-full flex flex-col max-w-[1520px]'>
        <div className=' flex md:flex-row flex-col items-center justify-end gap-4'>

            <div className=' flex items-center gap-2'>
                <Input type='text' className=' bg-primary h-[35px] text-zinc-100'/>
                <button className=' bg-red-700 px-8 py-2 rounded-sm text-xs'>Search</button>
            </div>
            
        </div>

        <Table className=' mt-4'>
        <TableHeader>
            <TableRow>
            <TableHead >Manager</TableHead>
            <TableHead>Timestamp</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead>Day of WFH</TableHead>
            <TableHead>In a Wellness Day Cycle?</TableHead>
            <TableHead>Total Hours WFH</TableHead>
            <TableHead>Hours of Leave</TableHead>
            <TableHead>Total Hours</TableHead>
            <TableHead>Action</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow>
            <TableCell className="font-medium">00001</TableCell>
            <TableCell>Test</TableCell>
            <TableCell>16/08/24</TableCell>
            <TableCell>Reason</TableCell>
            <TableCell>16/08/24</TableCell>
            <TableCell>No</TableCell>
            <TableCell>24</TableCell>
            <TableCell>24</TableCell>
            <TableCell>24</TableCell>
            <TableCell className="">

              <Wfhformadmin onClick={() => undefined}>
                <button className=' bg-red-700 rounded-sm text-xs text-white p-2'>Approved / Denied</button>
              </Wfhformadmin>
               
            </TableCell>

            </TableRow>
        </TableBody>
        </Table>

        <Pagination className=' mt-4'>
        <PaginationContent>
            <PaginationItem>
            <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
            <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
            <PaginationNext href="#" />
            </PaginationItem>
        </PaginationContent>
        </Pagination>
      </div>
        
    </div>
  )
}
