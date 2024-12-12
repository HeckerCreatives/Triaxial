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
import { ArrowDownAZ, Eye, ListFilter, Pen, Trash2 } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from '@/components/ui/checkbox'
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


export default function Invoicetable() {
  const [dialog, setDialog] = useState(false)
  const [tab, setTab] = useState('Pending')

  return (
   <div className=' w-full h-full flex justify-center bg-secondary p-6 text-zinc-100'>

    <div className=' w-full flex flex-col max-w-[1520px]'>
      <div className=' flex md:flex-row flex-col items-center justify-between gap-4'>
          

            {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className=' bg-red-700 p-2 rounded-sm flex items-center gap-1'><ListFilter size={15}/></button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className=' bg-secondary border-zinc-700 text-white text-xs'>
                <DropdownMenuLabel className=' text-xs'>Filter</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className=' text-xs'>Pending</DropdownMenuItem>
                <DropdownMenuItem className=' text-xs'>Approved</DropdownMenuItem>
                <DropdownMenuItem className=' text-xs'>Denied</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> */}

            <div className=' flex gap-2'>
              <div className=' flex items-center bg-primary rounded-sm'>
                <Actionbtn onClick={() => setTab('Pending')} name='Pending' color={ `${tab === 'Pending' && 'bg-red-700'}`}/>
                <Actionbtn onClick={() => setTab('Approved')} name='Approved' color={ `${tab === 'Approved' && 'bg-red-700'}`}/>
                <Actionbtn onClick={() => setTab('Denied')} name='Denied' color={ `${tab === 'Denied' && 'bg-red-700'}`}/>
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <button className=' bg-red-700 p-2 rounded-sm'><ArrowDownAZ size={15}/></button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className=' text-xs'>Sort by Pm</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Project Managers</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>manager 1</DropdownMenuItem>
                  <DropdownMenuItem>Manager 2</DropdownMenuItem>
                  <DropdownMenuItem>Manager3</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <button className=' bg-red-700 text-zinc-100 p-2 rounded-sm'><Trash2 size={15}/></button>
            </div>

            


            <div className=' flex items-center gap-2'>
                <Input placeholder='Search' type='text' className=' bg-primary h-[35px] text-zinc-100'/>
                <button className=' bg-red-700 px-8 py-2 rounded-sm text-xs'>Search</button>
            </div>
            
        </div>

        <Table className=' mt-4'>
        <TableHeader>
            <TableRow>
            <TableHead className="">Select</TableHead>
            <TableHead className="">Date Created</TableHead>
            <TableHead className="">Team</TableHead>
            <TableHead>Job Number</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Project Name</TableHead>
            <TableHead>Jm</TableHead>
            <TableHead className="">Invoice Amount</TableHead>
            <TableHead className="">Job Componert</TableHead>
            <TableHead className="">Admin Notes</TableHead>
            <TableHead className="">Jm Comment's</TableHead>
            <TableHead className="">Invoicer's Comment's</TableHead>
            <TableHead className="">Action</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow>
            <TableCell className="font-medium"><Checkbox/></TableCell>
            <TableCell className="">16/08/24</TableCell>
            <TableCell>test</TableCell>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>test</TableCell>
            <TableCell>test</TableCell>
            <TableCell>test</TableCell>
            <TableCell>test</TableCell>
            <TableCell>test</TableCell>
            <TableCell>test</TableCell>
            <TableCell className="">$250.00</TableCell>
            <TableCell>
              <Dialog>
                <DialogTrigger>
                  <button className=' bg-red-700 text-white p-2 flex items-center gap-2 rounded-sm'><Pen size={15}/>comments</button>
                </DialogTrigger>
                <DialogContent className=' bg-secondary p-6 border-none text-white'>
                  <DialogHeader>
                    <DialogTitle>Edit Comments</DialogTitle>
                    <DialogDescription>
                      
                    </DialogDescription>
                    
                  </DialogHeader>
                  <Textarea placeholder='Comment' className=' bg-primary'/>
                  <button className=' bg-purple-700 px-4 py-2 mt-2 rounded-sm w-fit text-sm'>Save changes</button>
                </DialogContent>
              </Dialog>

            </TableCell>
            <TableCell className=" flex items-center gap-2">
              <Dialog open={dialog} onOpenChange={setDialog}>
                  <DialogTrigger>
                    <Viewbtn disabled={false} onClick={() => undefined} name='View'/>
                  </DialogTrigger>
                  <DialogContent className=' bg-white border-none w-[95%] md:w-full max-w-[600px]'>
                      <div className="bg-white px-6 py-8 w-full  mx-auto">
                        <div className=' flex items-center justify-center gap-2 text-white w-full'>
                            <img src="/logo.webp" alt="" width={50} />
                            <div className=' flex flex-col text-zinc-950'>
                                <h2 className=' text-lg font-bold uppercase tracking-widest'>Triaxial</h2>
                                <h2 className=' text-sm font-bold uppercase'>Consulting</h2>
                            </div>
                        </div>
                    <hr className=" my-2"/>
                    <div className="flex justify-between mb-6">
                        <h1 className="text-lg font-bold">Invoice</h1>
                        <div className="text-gray-700">
                            <div>Date: 01/05/2023</div>
                            <div>Invoice #: INV12345</div>
                        </div>
                    </div>
                    <div className="mb-8">
                        <h2 className="text-lg font-bold mb-4">Bill To:</h2>
                        <div className="text-gray-700 mb-2">John Doe</div>
                        <div className="text-gray-700 mb-2">123 Main St.</div>
                        <div className="text-gray-700 mb-2">Anytown, USA 12345</div>
                        <div className="text-gray-700">johndoe@example.com</div>
                    </div>
                    <table className="w-full mb-8">
                        <thead>
                            <tr>
                                <th className="text-left font-bold text-gray-700">Description</th>
                                <th className="text-right font-bold text-gray-700">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="text-left text-gray-700">Product 1</td>
                                <td className="text-right text-gray-700">$100.00</td>
                            </tr>
                            <tr>
                                <td className="text-left text-gray-700">Product 2</td>
                                <td className="text-right text-gray-700">$50.00</td>
                            </tr>
                            <tr>
                                <td className="text-left text-gray-700">Product 3</td>
                                <td className="text-right text-gray-700">$75.00</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td className="text-left font-bold text-gray-700">Total</td>
                                <td className="text-right font-bold text-gray-700">$225.00</td>
                            </tr>
                        </tfoot>
                    </table>
                    <div className="text-gray-700 mb-2">Thank you for your business!</div>
                    <div className="text-gray-700 text-sm">Please remit payment within 30 days.</div>
                    <hr className="my-2"/>
                    
                    <div className=' flex items-center justify-end gap-2 mt-4'>
                        <button className=' bg-primary text-zinc-100 text-xs px-4 py-2 rounded-sm'>Deny</button>
                        <button className=' bg-red-700 text-zinc-100 text-xs px-4 py-2 rounded-sm'>Approved</button>
                    </div>
                      </div>
                  </DialogContent>
                </Dialog>

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
