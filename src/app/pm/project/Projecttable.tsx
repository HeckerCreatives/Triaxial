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
import { Plus, Delete, Trash, Eye, FileDown, Printer, ReceiptText } from 'lucide-react'
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


export default function Projecttable() {
  const [dialog, setDialog] = useState(false)
  const [dialog2, setDialog2] = useState(false)
  const [dialog3, setDialog3] = useState(false)

  return (
   <div className=' w-full h-full flex justify-center bg-secondary p-6 text-zinc-100'>

    <div className=' w-full flex flex-col max-w-[1520px]'>
      {/* <div className=' flex md:flex-row flex-col items-center justify-between gap-4'>
            <div className=' flex items-center gap-4'>
              <Dialog open={dialog} onOpenChange={setDialog}>
                <DialogTrigger>
                  <button className=' bg-red-700 px-6 py-2 rounded-sm flex items-center gap-1 text-xs'><Plus size={15}/>Create</button>
                </DialogTrigger>
                <DialogContent className=' bg-secondary border-none text-zinc-100 grid grid-cols-1 lg:grid-cols-[250px,1fr]'>
                  <div className=' bg-blue-400 lg:block hidden'
                  style={{backgroundImage: `url('/bg2.png')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat:"no-repeat"}}
                  
                  >
                    <p className=' p-2 uppercase text-lg font-semibold mt-8 bg-gradient-to-r from-zinc-950 to-zinc-950/10'>Create project</p>
                  </div>

                  <div className=' flex flex-col gap-2 p-4'>
                    <DialogHeader>
                    <DialogDescription>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt, reprehenderit sequi. Quisquam, libero quam placeat molestias cum est.
                    </DialogDescription>
                    </DialogHeader>
                  <form action="" className=' flex flex-col '>

                    <div className=' w-full grid grid-cols-2 gap-4'>
                      <div className=' flex flex-col'>
                        <label htmlFor="" className=' mt-4'>Job no.</label>
                        <Input placeholder='Job no.' type='number' className=' bg-primary'/>

                        <label htmlFor="" className=' mt-4'>Project name</label>
                        <Input placeholder='Project name' type='text' className=' bg-primary'/>

                        <label htmlFor="" className=' mt-4'>Clients</label>
                        <Input placeholder='Clients' type='text' className=' bg-primary'/>
                      </div>

                      <div className=' flex flex-col'>
                        <label htmlFor="" className=' mt-4'>Job Manager</label>
                        <Input placeholder='Job Manager' type='number' className=' bg-primary'/>

                        <label htmlFor="" className=' mt-4'>Budget</label>
                        <Input placeholder='Budget' type='text' className=' bg-primary'/>

                        <label htmlFor="" className=' mt-4'>Job Component</label>
                        <Input placeholder='Job Component' type='text' className=' bg-primary'/>

                        
                      </div>
                    </div>

                    <div className=' mt-4'>
                      <label htmlFor="" className=''>Note</label>
                      <Textarea placeholder='Note' className=' bg-primary'/>
                    </div>
                  </form>
                  
                    <div className=' w-full flex items-end justify-end gap-2 mt-8'>
                      <ButtonSecondary onClick={() => setDialog(false)}  name={'Cancel'}/>
                      <Button onClick={() => setDialog(false)} name={'Save'}/>
                    </div>

                  </div>
                  
                </DialogContent>
              </Dialog>
            </div>

            <div className=' w-full flex items-end justify-end gap-2 mt-8'>
                      <ButtonSecondary onClick={() => setDialog2(false)}  name={'Cancel'}/>
                      <Button onClick={() => setDialog2(false)} name={'Save Changes'}/>
                    </div>
            
      </div> */}

        <Table className=' mt-4'>
        <TableHeader>
            <TableRow>
            <TableHead className="">Job No</TableHead>
            <TableHead>Project Name</TableHead>
            <TableHead>Client Name</TableHead>
            <TableHead className="">Job Manger</TableHead>
            <TableHead className="">Est.$</TableHead>
            <TableHead className="">%Inv</TableHead>
            <TableHead className="">Job Component</TableHead>
            <TableHead className="">Job Members</TableHead>
            <TableHead className="">Team Name</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow>
            <TableCell className="font-medium"><a href="" className=' text-blue-400 underline'>tx0934857</a></TableCell>
            <TableCell>Test</TableCell>
            <TableCell>Test</TableCell>
            <TableCell className="">Test</TableCell>
            <TableCell className="">99,999</TableCell>
            <TableCell className="">100%</TableCell>
            <TableCell className="">Job Component</TableCell>
            <TableCell className="">Members</TableCell>
            <TableCell className="">Team Name</TableCell>
            {/* <TableCell className=" flex items-center gap-2">
              

              <Dialog open={dialog3} onOpenChange={setDialog3}>
                <DialogTrigger>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger><button className=' p-2 bg-secondary rounded-md'><Eye size={15}/></button></TooltipTrigger>
                      <TooltipContent>
                        <p className=' text-xs'>View, Edit, Copy & Complete</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </DialogTrigger>
                <DialogContent className=' bg-secondary border-none text-zinc-100 grid grid-cols-1 lg:grid-cols-[250px,1fr]'>
                  <div className=' bg-blue-400 lg:block hidden'
                  style={{backgroundImage: `url('/bg2.png')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat:"no-repeat"}}
                  
                  >
                    <p className=' p-2 uppercase text-lg font-semibold mt-8 bg-gradient-to-r from-zinc-950 to-zinc-950/10'>Edit project</p>
                  </div>

                  <div className=' flex flex-col gap-2 p-4'>
                    <DialogHeader>
                    <DialogDescription>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt, reprehenderit sequi. Quisquam, libero quam placeat molestias cum est.
                    </DialogDescription>
                    </DialogHeader>
                  <form action="" className=' flex flex-col '>

                    <div className=' w-full grid grid-cols-2 gap-4'>
                      <div className=' flex flex-col'>
                        <label htmlFor="" className=' mt-4'>Job no.</label>
                        <Input placeholder='Job no.' type='number' className=' bg-primary'/>

                        <label htmlFor="" className=' mt-4'>Project name</label>
                        <Input placeholder='Project name' type='text' className=' bg-primary'/>

                        <label htmlFor="" className=' mt-4'>Clients</label>
                        <Input placeholder='Clients' type='text' className=' bg-primary'/>
                      </div>

                      <div className=' flex flex-col'>
                        <label htmlFor="" className=' mt-4'>Job Manager</label>
                        <Input placeholder='Job Manager' type='number' className=' bg-primary'/>

                        <label htmlFor="" className=' mt-4'>Budget</label>
                        <Input placeholder='Budget' type='text' className=' bg-primary'/>

                        <label htmlFor="" className=' mt-4'>Job Component</label>
                        <Input placeholder='Job Component' type='text' className=' bg-primary'/>

                        
                      </div>
                    </div>

                    <div className=' mt-4'>
                      <label htmlFor="" className=''>Note</label>
                      <Textarea placeholder='Note' className=' bg-primary'/>
                    </div>
                  </form>
                  
                    <div className=' w-full flex items-end justify-end gap-2 mt-8'>
                      <ButtonSecondary onClick={() => setDialog3(false)}  name={'Cancel'}/>
                      <Button onClick={() => setDialog3(false)} name={'Save Changes'}/>
                    </div>

                  </div>
                  
                </DialogContent>
              </Dialog>

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

              
            </TableCell> */}
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
