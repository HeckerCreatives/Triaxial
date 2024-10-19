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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
        <div className=' flex items-center gap-2'>

          <Createprojectform onClick={() => undefined}>
            <button className=' bg-red-700 p-2 rounded-sm text-zinc-100'><FilePlus2 size={15}/></button>
          </Createprojectform>

          

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <button className=' bg-red-700 p-2 rounded-sm text-zinc-100'><RefreshCw size={15}/></button>
              </TooltipTrigger>
              <TooltipContent className=' bg-secondary text-zinc-100 border-zinc-700'>
                <p>Refresh</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <DropdownMenu>
          <DropdownMenuTrigger>
            <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <button className=' bg-red-700 p-2 rounded-sm text-zinc-100'><Filter size={15}/></button>
              </TooltipTrigger>
              <TooltipContent className=' bg-secondary text-zinc-100 border-zinc-700'>
                <p>Filter</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          </DropdownMenuTrigger>
          <DropdownMenuContent className=' bg-secondary border-zinc-600 text-zinc-100'>
            <DropdownMenuLabel>Filter</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Mangager 1</DropdownMenuItem>
            <DropdownMenuItem>Mangager 2</DropdownMenuItem>
            <DropdownMenuItem>Mangager 3</DropdownMenuItem>
          </DropdownMenuContent>
          </DropdownMenu>

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
            <TableHead className="">Action</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow>
            <TableCell className="font-medium"><Checkbox/></TableCell>
            <TableCell className="font-medium"><a href="/superadmin/project/projectdetails" className=' text-blue-400 underline'>tx0934857</a></TableCell>
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
            <TableCell className=" flex items-center gap-2">

              <Viewproject onClick={() => undefined}>
                <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger><button className=' p-2 bg-secondary rounded-md'><Eye size={15}/></button></TooltipTrigger>
                      <TooltipContent>
                        <p className=' text-xs'>View</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
              </Viewproject>

              <Editprojectform onClick={() => undefined}>
                <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger><button className=' p-2 bg-secondary rounded-md'><Pen size={15}/></button></TooltipTrigger>
                      <TooltipContent>
                        <p className=' text-xs'>Edit Project</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
              </Editprojectform>

              <Copyprojectform onClick={() => undefined}>
                <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger><button className=' p-2 bg-secondary rounded-md'><Copy size={15}/></button></TooltipTrigger>
                      <TooltipContent>
                        <p className=' text-xs'>Copy Project</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
              </Copyprojectform>

              <Variationprojectform onClick={() => undefined}>
                <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger><button className=' p-2 bg-secondary rounded-md'><Layers size={15}/></button></TooltipTrigger>
                      <TooltipContent>
                        <p className=' text-xs'>Create Project Variation</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
              </Variationprojectform>

            
             

              <Dialog open={dialog2} onOpenChange={setDialog2}>
                    <DialogTrigger>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger><button className=' p-2 bg-secondary rounded-md'><ReceiptText size={15}/></button></TooltipTrigger>
                          <TooltipContent>
                            <p className=' text-xs'>Invoice</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </DialogTrigger>
                    <DialogContent className=' bg-white border-none w-[95%] md:w-full max-w-[600px] overflow-hidden'>
                    <div id='invoice-container' className=" bg-white px-6 py-8 h-full w-full  mx-auto">
                          <div className=' flex items-center justify-center gap-2 text-white w-full'>
                              <img src="/logo.webp" alt="" width={50} />
                              <div className=' flex flex-col text-zinc-950'>
                                  <h2 className=' text-lg font-bold uppercase tracking-widest'>Triaxial</h2>
                                  <h2 className=' text-sm font-bold uppercase'>Consulting</h2>
                              </div>
                          </div>
                      <hr className=" my-2"/>
                      <div className="flex justify-between mb-4">
                          <h1 className="text-lg font-bold">Invoice</h1>
                          <div className="text-gray-700">
                              <div>Date: 01/05/2023</div>
                              <div>Invoice #: INV12345</div>
                          </div>
                      </div>
                      <div className="mb-4">
                          <h2 className="text-lg font-bold mb-4">To:</h2>
                          <div className="text-gray-700 mb-2">John Doe</div>
                          <div className="text-gray-700 mb-2">123 Main St.</div>
                          <div className="text-gray-700 mb-2">Project Name - TX293847</div>
                          <div className="text-gray-700 mb-2">Admin Notes : Lorem ipsum</div>
                      </div>
                      <table className="w-full mb-4">
                          <thead>
                              <tr>
                                  <th className="text-left font-bold text-gray-700">Job Component Budget</th>
                                  <th className="text-left font-bold text-gray-700">Curr. Invoice</th>
                                  <th className="text-right font-bold text-gray-700">New Invoice</th>
                              </tr>
                          </thead>
                          <tbody>
                              <tr>
                                  <td className="text-left text-gray-700">
                                  <Input placeholder='Amount' className=' bg-zinc-200'/>
                                  </td>

                                  <td className="text-left text-gray-700">
                                  <Input placeholder='Amount' className=' bg-zinc-200'/>
                                  </td>

                                  <td className=" relative text-left text-gray-700">
                                  <Input placeholder='Amount' className=' bg-zinc-200'/>
                                  <p className=' absolute top-2 right-4'>%</p>
                                  </td>
                              </tr>
                            
                          </tbody>
                         
                      </table>

                      <button className=' p-2 text-xs text-zinc-100 bg-purple-600 rounded-sm'>Calculate</button>

                    
                      <hr className="my-2"/>

                      <label htmlFor="">This invoice amount</label>
                    < Input placeholder=' Amount' className=' bg-zinc-200'/>

                      <label htmlFor="" className=' mt-8'>Please insert an instruction or comments for the invoice</label>
                      <Textarea placeholder=' Please input here' className=' bg-zinc-200'/>
                      
                    </div>

                    

                      <div className=' flex items-center justify-end gap-2 px-4 pb-4'>
                          <button className=' text-xs flex items-center gap-2 bg-purple-600 p-2 text-zinc-100 rounded-sm'><FileDown size={20}/>Record</button>
                      </div>
                      
                    </DialogContent>
              </Dialog>

              <Dialog open={dialog6} onOpenChange={setDialog6}>
                    <DialogTrigger>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger><button className=' p-2 bg-secondary rounded-md'><FileCheck size={15}/></button></TooltipTrigger>
                          <TooltipContent>
                            <p className=' text-xs'>Complete Project</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </DialogTrigger>
                    <DialogContent className=' bg-white border-none w-[95%] md:w-full max-w-[600px]'>
                    <div id='invoice-container' className=" bg-white px-6 py-8 w-full  mx-auto">
                      <p className=' text-lg font-semibold'>Complete Project</p>
                      <p className=' text-sm text-zinc-500'>You're about to delete the Component of a Project in this Workload.This will be removed permanently on this Tab and will be transfered to Invoice Spreadsheet.</p>
                      <p className=' text-sm text-zinc-500 flex items-center gap-1'><TriangleAlert size={20} color='red'/>This execution is<span className=' bg-red-100'>IRREVERSIBLE</span>.</p>
                      <p className=' text-sm text-zinc-500 flex items-center gap-1'><TriangleAlert size={20} color='red'/>Please check information below and proceed with caution.</p>
                      <hr className=" my-2"/>

                      <div className=' w-[70%]'>
                      <div className=' w-full grid grid-cols-2'>
                        <div className=' w-full flex flex-col gap-1'>
                          <p className=' text-sm font-semibold'>Team Name</p>
                          <p className=' text-sm font-semibold'>Job Manager</p>
                          <p className=' text-sm font-semibold'>Job Number</p>
                          <p className=' text-sm font-semibold'>Client Name</p>
                          <p className=' text-sm font-semibold'>Project Name</p>
                          <p className=' text-sm font-semibold'>Job Component</p>
                          <p className=' text-sm font-semibold'>Component Budget</p>
                          <p className=' text-sm font-semibold'>Current %Invoice</p>
                          <p className=' text-sm font-semibold'>Complete %Invoice</p>
                          <p className=' text-sm font-semibold'>This claim %Invoice</p>
                          <p className=' text-sm font-semibold'>This claim amount</p>
                          <p className=' text-sm font-semibold'>Admin Notes</p>

                        </div>

                        <div className=' w-full flex flex-col gap-1'>
                          <p className=' text-sm '>:  Team Name</p>
                          <p className=' text-sm '>:  Job Manager</p>
                          <p className=' text-sm '>:  Job Number</p>
                          <p className=' text-sm '>:  Client Name</p>
                          <p className=' text-sm '>:  Project Name</p>
                          <p className=' text-sm '>:  Job Component</p>
                          <p className=' text-sm '>:  Component Budget</p>
                          <p className=' text-sm '>:  Current %Invoice</p>
                          <p className=' text-sm '>:  Complete %Invoice</p>
                          <p className=' text-sm '>:  This claim %Invoice</p>
                          <p className=' text-sm '>:  This claim amount</p>
                          <p className=' text-sm '>:  Admin Notes</p>

                        </div>

                      </div>

                      </div>

                      <hr className=' my-2' />
                      <p className=' text-xs text-zinc-500'>Please insert instructions or comments for the Invoicer.*Please input here.</p>
                      <Textarea placeholder='Please input here' className=' bg-zinc-200'/>

                      <p className=' font-semibold text-sm mt-4'>Note: An email notification will be sent to the Job Manager and Invoicing.Would you like to continue?</p>
                      
                    </div>

                    

                      <div className=' flex items-center justify-end gap-2 px-4 pb-4'>
                          <button onClick={() => setDialog6(false)} className=' text-xs flex items-center gap-2 bg-primary px-4 py-2 text-zinc-100 rounded-sm'>No</button>
                          <button className=' text-xs flex items-center gap-2 bg-purple-600 px-4 py-2 text-zinc-100 rounded-sm'>Yes</button>
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
