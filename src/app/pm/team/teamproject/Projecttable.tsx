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
import { Plus, Delete, Trash, Eye, FileDown, Printer, ReceiptText, FilePlus2, FileCheck, RefreshCw, Filter, Search, Copy, Layers, TriangleAlert, Pen } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from '@/components/ui/textarea'
import ButtonSecondary from '@/components/common/ButtonSecondary'
import Button from '@/components/common/Button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { downloadInvoiceAsPdf, printInvoice } from '@/utils/invoice'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Createprojectform from '@/components/forms/Createprojectform'
import Editprojectform from '@/components/forms/Editprojectform'
import Copyprojectform from '@/components/forms/Copyprojectform'
import Variationprojectform from '@/components/forms/Variationprojectform'
import Viewproject from '@/components/forms/Viewproject'


export default function Projecttable() {
  const [dialog, setDialog] = useState(false)
  const [dialog2, setDialog2] = useState(false)
  const [dialog3, setDialog3] = useState(false)
  const [dialog4, setDialog4] = useState(false)
  const [dialog5, setDialog5] = useState(false)
  const [dialog6, setDialog6] = useState(false)

  return (
   <div className=' w-full h-full flex justify-center bg-secondary p-6 text-zinc-100'>

    <div className=' w-full flex flex-col max-w-[1520px]'>

      <div className=' w-full flex items-center justify-between'>
       <div>

       </div>
      <div className=' flex items-center gap-2'>
        <Input type='text' placeholder='Search' className=' text-sm bg-primary text-zinc-100'/>
        <button className=' text-sm px-4 h-[40px] rounded-sm bg-red-700 flex items-center gap-1'><Search size={15}/>Search</button>
        </div>
      </div>

        <Table className=' mt-4'>
        <TableHeader>
            <TableRow>
            <TableHead className="">Select</TableHead>
            <TableHead className="">Job No</TableHead>
            <TableHead>Project Name</TableHead>
            <TableHead>Client</TableHead>
            <TableHead className="">Job Component</TableHead>
            <TableHead className="">% Invoiced</TableHead>
            <TableHead className="">Est. $</TableHead>
            <TableHead className="">Type</TableHead>
            <TableHead className="">Status</TableHead>
            <TableHead className="">Start</TableHead>
            <TableHead className="">Deadline</TableHead>
            <TableHead className="">Admin Notes</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow>
            <TableCell className="font-medium"><Checkbox/></TableCell>
            <TableCell className="font-medium"><a href="/pm/project" className=' text-blue-400 underline'>tx0934857</a></TableCell>
            <TableCell>Test</TableCell>
            <TableCell className="">Test</TableCell>
            <TableCell className="">
              <Dialog>
              <DialogTrigger><button className=' bg-red-700 rounded-sm p-1 text-white flex items-center gap-2'>Job Component<Eye size={15}/></button></DialogTrigger>
              <DialogContent className=' p-6 bg-secondary border-none text-white'>
                <DialogHeader>
                  <DialogTitle>Job Component</DialogTitle>
                  <DialogDescription>
                    This will be the job components to the select project
                  </DialogDescription>
                   <Table className=' mt-4'>
                    <TableHeader>
                        <TableRow>
                        <TableHead className="">Job Manager</TableHead>
                        <TableHead>Est Budget $</TableHead>
                        <TableHead>Components</TableHead>
                        {/* <TableHead >Action</TableHead> */}

                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                        <TableCell className="font-medium">Name</TableCell>
                        <TableCell className="font-medium">1</TableCell>
                        <TableCell className="font-medium">Name</TableCell>
                        

                        </TableRow>
                    </TableBody>
                    </Table>

                </DialogHeader>
              </DialogContent>
            </Dialog>

              </TableCell>
            <TableCell className="">30</TableCell>
            <TableCell className="">5000</TableCell>
            <TableCell className="">test</TableCell>
            <TableCell className="">Ongoing</TableCell>
            <TableCell className="">00/00/00</TableCell>
            <TableCell className="">00/00/00</TableCell>
            <TableCell className="">notes</TableCell>
            
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
