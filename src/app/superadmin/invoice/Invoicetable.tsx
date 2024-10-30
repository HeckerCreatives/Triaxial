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
import { Eye, FileDown, FilePenLine, ListFilter, Plus, Printer } from 'lucide-react'
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
import { downloadInvoiceAsPdf, printInvoice } from '@/utils/invoice'

export default function Invoicetable() {
  const [dialog, setDialog] = useState(false)
  const [dialog2, setDialog2] = useState(false)

  return (
   <div className=' w-full h-full flex justify-center bg-secondary p-6 text-zinc-100'>

    <div className=' w-full flex flex-col max-w-[1520px]'>
      <div className=' flex md:flex-row flex-col items-center justify-between gap-4'>

        <div className=' flex items-center gap-2'>
          {/* <Dialog open={dialog2} onOpenChange={setDialog2}>
                  <DialogTrigger>
                    <button className=' bg-primary px-6 py-2 rounded-sm flex items-center gap-1'><Plus size={25}/>Request</button>
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
                            <div>Date: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                            <div>Invoice #: INV12345</div>
                        </div>
                    </div>
                    <div className="mb-8">
                        <h2 className="text-lg font-bold mb-4">Bill To:</h2>
                        <div className=' flex flex-col gap-2'>
                          <Input placeholder='Name' type=' text'/>
                          <Input placeholder='Address' type=' text'/>
                          <Input placeholder='Email' type='email'/>
                        </div>
                        
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
                                <td className="text-left text-gray-700">
                                  <Input type='text' placeholder='Description'/>
                                </td>
                                <td className="text-right text-gray-700">
                                  <Input type='number' placeholder='Amount'/>
                                </td>
                            </tr>
                            
                        </tbody>
                        <tfoot>
                            <tr>
                                <td className="text-left font-bold text-gray-700">Total</td>
                                <td className="text-right font-bold text-gray-700">$ 00.00</td>
                            </tr>
                        </tfoot>
                    </table>
                    <div className="text-gray-700 mb-2">Thank you for your business!</div>
                    <div className="text-gray-700 text-sm">Please remit payment within 30 days.</div>
                    <hr className="my-2"/>
                    
                    <div className=' flex items-center justify-end gap-2 mt-4'>
                        <ButtonSecondary onClick={() => setDialog2(false)}  name={'Close'}/>
                        <Button onClick={() => setDialog2(false)} name={'Submit'}/>
                    </div>
                    </div>
                    
                  </DialogContent>
          </Dialog> */}

          <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className=' bg-primary p-2 rounded-sm flex items-center gap-1'><ListFilter size={25}/></button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className=' bg-primary border-zinc-700 text-white'>
                <DropdownMenuLabel>Filter</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Pending</DropdownMenuItem>
                <DropdownMenuItem>Approved</DropdownMenuItem>
                <DropdownMenuItem>Denied</DropdownMenuItem>
              </DropdownMenuContent>
          </DropdownMenu>
        </div>
            
        </div>

        <Table className=' mt-4'>
        <TableHeader>
            <TableRow>
            <TableHead className="">Select</TableHead>
            <TableHead className="">Invoice Id</TableHead>
            <TableHead>Requested By</TableHead>
            <TableHead>Project</TableHead>
            <TableHead className="">Amount</TableHead>
            <TableHead className="">Date</TableHead>
            <TableHead className="">Action</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow>
            <TableCell className="font-medium"><Checkbox/></TableCell>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>test</TableCell>
            <TableCell>test</TableCell>
            <TableCell className="">$250.00</TableCell>
            <TableCell className="">16/08/24</TableCell>
            <TableCell className=" flex items-center gap-2">
              <Dialog open={dialog} onOpenChange={setDialog}>
                  <DialogTrigger>
                    <button className=' p-2 rounded-sm bg-secondary'><Eye size={20}/></button>
                  </DialogTrigger>
                  <DialogContent className=' bg-white border-none w-[95%] md:w-full max-w-[600px]'>
                   <div id='invoice-container' className=" bg-white px-6 py-8 w-full  mx-auto">
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
                    
                    </div>

                    <div className=' flex items-center justify-end gap-2 px-4 pb-4'>
                        <button onClick={printInvoice} className=' text-xs flex items-center gap-2 bg-primary p-2 text-zinc-100 rounded-sm'><Printer size={20}/>Print Invoice</button>
                        <button onClick={downloadInvoiceAsPdf} className=' text-xs flex items-center gap-2 bg-purple-600 p-2 text-zinc-100 rounded-sm'><FileDown size={20}/>Download Pdf</button>
                    </div>
                    
                  </DialogContent>
              </Dialog>

             <Dialog open={dialog2} onOpenChange={setDialog2}>
                  <DialogTrigger>
                    <button className=' bg-secondary p-2 rounded-sm flex items-center gap-1'><FilePenLine size={20}/></button>
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
                            <div>Date: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                            <div>Invoice #: INV12345</div>
                        </div>
                    </div>
                    <div className="mb-8">
                        <h2 className="text-lg font-bold mb-4">Bill To:</h2>
                        <div className=' flex flex-col gap-2'>
                          <Input placeholder='Name' type=' text'/>
                          <Input placeholder='Address' type=' text'/>
                          <Input placeholder='Email' type='email'/>
                        </div>
                        
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
                                <td className="text-left text-gray-700">
                                  <Input type='text' placeholder='Description'/>
                                </td>
                                <td className="text-right text-gray-700">
                                  <Input type='number' placeholder='Amount'/>
                                </td>
                            </tr>
                            
                        </tbody>
                        <tfoot>
                            <tr>
                                <td className="text-left font-bold text-gray-700">Total</td>
                                <td className="text-right font-bold text-gray-700">$ 00.00</td>
                            </tr>
                        </tfoot>
                    </table>
                    <div className="text-gray-700 mb-2">Thank you for your business!</div>
                    <div className="text-gray-700 text-sm">Please remit payment within 30 days.</div>
                    <hr className="my-2"/>
                    
                    <div className=' flex items-center justify-end gap-2 mt-4'>
                        <ButtonSecondary onClick={() => setDialog2(false)}  name={'Close'}/>
                        <Button onClick={() => setDialog2(false)} name={'Save Changes'}/>
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
