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
import { Plus, Delete, Trash, Eye, ReceiptText, Printer, FileDown } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import Button from '@/components/common/Button'
import ButtonSecondary from '@/components/common/ButtonSecondary'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { downloadInvoiceAsPdf, printInvoice } from '@/utils/invoice'




export default function TableJobComponent() {
  const [dialog, setDialog] = useState(false)
  const [dialog2, setDialog2] = useState(false)
  
  return (
    <div className=' w-full h-full flex justify-center bg-secondary p-6 mt-[150px] text-zinc-100'>

      <div className=' w-full max-w-[1520px] flex flex-col'>
        <div className=' flex md:flex-row flex-col items-center justify-between gap-4'>
            <div className=' flex items-center gap-4'>
                
              <Dialog open={dialog} onOpenChange={setDialog}>
                <DialogTrigger>
                  <button className=' bg-primary px-6 py-2 rounded-sm flex items-center gap-1'><Plus size={25}/>Create</button>
                </DialogTrigger>
                <DialogContent className=' bg-secondary border-none text-zinc-100 grid grid-cols-1 lg:grid-cols-[250px,1fr]'>
                  <div className=' bg-blue-400 lg:block hidden'
                  style={{backgroundImage: `url('/bg2.png')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat:"no-repeat"}}
                  
                  >
                    <p className=' p-2 uppercase text-lg font-semibold mt-8 bg-gradient-to-tr from-zinc-950 to-zinc-950/10 bg-zinc-950'>Job Component</p>
                  </div>

                  <div className=' flex flex-col gap-2 p-8'>
                    <DialogHeader>
                    <DialogTitle>Description</DialogTitle>
                    <DialogDescription>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt, reprehenderit sequi. Quisquam, libero quam placeat molestias cum est. Non sequi maxime quia eaque aspernatur corrupti magnam molestiae excepturi natus commodi?
                    </DialogDescription>
                  </DialogHeader>
                  <label htmlFor="" className=' mt-4'>Job Component</label>
                    <Textarea className=' bg-primary border-none h-[180px]' placeholder='Description' />

                    <div className=' w-full flex items-end justify-end gap-2 mt-4'>
                      <ButtonSecondary onClick={() => setDialog(false)}  name={'Cancel'}/>
                      <Button onClick={() => setDialog(false)} name={'Save'}/>
                    </div>

                  </div>
                  
                </DialogContent>
              </Dialog>

              <AlertDialog>
              <AlertDialogTrigger>
                <button className=' bg-red-600 px-6 py-2 rounded-sm flex items-center gap-1'><Trash size={25}/>Delete</button>
              </AlertDialogTrigger>
              <AlertDialogContent className=' bg-secondary text-zinc-100'>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className=' hover:bg-primary hover:text-zinc-100'>Cancel</AlertDialogCancel>
                  <AlertDialogAction className=' bg-purple-600 hover:bg-purple-700'>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
              </AlertDialog>


                
            </div>

            <div className=' flex items-center gap-4'>
                <Input type='text' className=' text-zinc-900'/>
                <button className=' bg-primary px-8 py-2 rounded-sm'>Search</button>
            </div>
            
        </div>

        <Table className=' mt-4'>
        <TableHeader>
            <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="">Amount</TableHead>
            <TableHead className="">Status</TableHead>
            <TableHead className="">Action</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="">$250.00</TableCell>
            <TableCell className="">Pending</TableCell>
            <TableCell className=" flex items-center gap-2">
              
              <TooltipProvider>
              <Tooltip>
                <TooltipTrigger><button className=' p-2 bg-secondary rounded-md'><Eye size={15}/></button></TooltipTrigger>
                <TooltipContent>
                  <p className=' text-xs'>View, Edit, Copy & Complete</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>


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
