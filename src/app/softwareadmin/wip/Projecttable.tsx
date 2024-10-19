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
  const [tab, setTab] = useState('Teams')

  return (
   <div className=' w-full h-full flex justify-center bg-secondary p-6 text-zinc-100'>

    <div className=' w-full flex flex-col max-w-[1520px]'>
      <div className=' flex md:flex-row flex-col items-center justify-between gap-4'>
            <div className=' flex items-center bg-primary'>
              <button onClick={() => setTab('Teams')} className={` ${tab === 'Teams' && ' bg-red-700'} text-xs text-zinc-100 px-4 py-2 rounded-sm`}>Team</button>
              <button onClick={() => setTab('Client')} className={` ${tab === 'Client' && ' bg-red-700'} text-xs text-zinc-100 px-4 py-2 rounded-sm`}>Client</button>
            </div>
            
        </div>

        {tab === 'Teams' && (
           <Table className=' mt-4'>
          <TableHeader>
              <TableRow>
              <TableHead className="">Team</TableHead>
              <TableHead>WIP</TableHead>
              <TableHead>Total</TableHead>
              
              </TableRow>
          </TableHeader>
          <TableBody>
              <TableRow>
              <TableCell>Test</TableCell>
              <TableCell>Test</TableCell>
              <TableCell>$</TableCell>
              <TableCell className=" flex items-center gap-2">
                

                {/* <Dialog open={dialog3} onOpenChange={setDialog3}>
                  <DialogTrigger>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger><button className=' p-2 bg-secondary rounded-md'><Eye size={15}/></button></TooltipTrigger>
                        <TooltipContent>
                          <p className=' text-xs'>View & Edit</p>
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
                </Dialog> */}
                
              </TableCell>
              </TableRow>
          </TableBody>
        </Table>
        )}

        {tab === 'Client' && (
           <Table className=' mt-4'>
          <TableHeader>
              <TableRow>
              <TableHead className="">Clients</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Total</TableHead>
              
              </TableRow>
          </TableHeader>
          <TableBody>
              <TableRow>
              <TableCell>Test</TableCell>
              <TableCell>Test</TableCell>
              <TableCell>$</TableCell>
              <TableCell className=" flex items-center gap-2">
                

                {/* <Dialog open={dialog3} onOpenChange={setDialog3}>
                  <DialogTrigger>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger><button className=' p-2 bg-secondary rounded-md'><Eye size={15}/></button></TooltipTrigger>
                        <TooltipContent>
                          <p className=' text-xs'>View & Edit</p>
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
                </Dialog> */}
                
              </TableCell>
              </TableRow>
          </TableBody>
        </Table>
        )}

       

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
