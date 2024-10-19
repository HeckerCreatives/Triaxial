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
import { Plus, Delete, Trash, Eye, CircleAlert } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"





export default function Employeetable() {
  const [tab, setTab] = useState('Workload')

  return (
    <div className=' w-full h-full flex justify-center bg-secondary p-6 text-zinc-100 mt-[170px]'>

      <div className=' w-full flex flex-col max-w-[1520px]'>
       

        <Table className=' mt-4'>
        <TableHeader>
            <TableRow>
            <TableHead className="">Select</TableHead>
            <TableHead>Employee Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead >Status</TableHead>
            <TableHead >Teams</TableHead>
            <TableHead >Date Created</TableHead>
            <TableHead >Action</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow>
            <TableCell className="font-medium"><Checkbox/></TableCell>
            <TableCell className="font-medium">00001</TableCell>
            <TableCell className="font-medium">Test</TableCell>
            <TableCell>Active</TableCell>
            <TableCell>Team 1</TableCell>
            <TableCell className="">16/08/24</TableCell>
            <TableCell className="">
            
            

              <Dialog >
                <DialogTrigger>
                    <button className=' p-2 rounded-sm bg-secondary'><Eye size={20}/></button>
                </DialogTrigger>
                <DialogContent className=' bg-secondary border-none w-[80%] text-zinc-100'>
                  <div className=' relative lg:block hidden py-4'
                  style={{backgroundImage: `url('/bg2.png')`, backgroundSize: "cover", backgroundPosition: "bottom", backgroundRepeat:"no-repeat"}}
                  
                  >
                    <div className=' w-full h-full top-0 absolute bg-gradient-to-tr from-zinc-950 to-zinc-950/10'></div>
                    <p className=' relative z-10 p-2 uppercase text-sm font-semibold text-red-700 '>Employee Name</p>
                  </div>

                  <div className=' flex flex-col gap-2 p-4'>
                    <div className=' bg-primary rounded-sm flex items-center w-fit'>
                      <button onClick={() => setTab('Workload')} className={`px-6 py-2 text-xs rounded-sm ${tab === 'Workload' && ' bg-red-700'}`}>Workload</button>
                      <button onClick={() => setTab('Schedule')} className={`px-6 py-2 text-xs rounded-sm ${tab === 'Schedule' && ' bg-red-700'}`}>Schedule</button>
                    </div>

                    {tab === 'Workload' ? (
                      <Table className=' mt-4'>
                      <TableHeader>
                          <TableRow>
                          <TableHead className="">Job No</TableHead>
                          <TableHead>Project Name</TableHead>
                          <TableHead>Client</TableHead>
                          <TableHead className="">Job Component</TableHead>
                          <TableHead className="">Start</TableHead>
                          <TableHead className="">Deadline</TableHead>
                          <TableHead className="">Status</TableHead>

                          </TableRow>
                      </TableHeader>
                      <TableBody>
                          <TableRow>
                          <TableCell className="font-medium">0001</TableCell>
                          <TableCell>Test</TableCell>
                          <TableCell>Test</TableCell>
                          <TableCell className="">Test</TableCell>
                          <TableCell className="">16/08/24</TableCell>
                          <TableCell className="">16/08/24</TableCell>
                          <TableCell className=" text-blue-500">Pending</TableCell>

                          </TableRow>
                      </TableBody>
                      </Table>
                    ) : (
                      <Table className=' mt-4 text-sm'>
                        <TableHeader className=''>
                            <TableRow>
                            <TableHead className="">Id</TableHead>
                            <TableHead>Project Name</TableHead>
                            <TableHead>Start Date</TableHead>
                            <TableHead className="">End Date</TableHead>
                            <TableHead className="">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className=' text-zinc-300'>
                            <TableRow>
                            <TableCell className="">00001</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>00/00/00</TableCell>
                            <TableCell className="">00/00/00</TableCell>
                            <TableCell className=" text-blue-500">Pending</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    )}

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
