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
import { Checkbox } from '@/components/ui/checkbox'
import { useRouter, useSearchParams } from 'next/navigation'
import Teammembers from './Teammembers'
import Indiviualworkloads from './Individualworkloads'
import Dueon from './Dueon'
import Viewbtn from '@/components/common/Viewbtn'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"





export default function Teamstable() {
  const [dialog, setDialog] = useState(false)
  const [dialog2, setDialog2] = useState(false)
  const router = useRouter()
  const search = useSearchParams()
  const tab = search.get('active')

  useEffect(() => {

  },[tab])

  return (
    <>
   
      <div className=' w-full h-full flex justify-center bg-secondary p-6 text-zinc-100'>

      <div className=' w-full flex flex-col max-w-[1520px]'>
        <div className=' flex md:flex-row flex-col items-center justify-between gap-4'>
            <div className=' flex  items-center gap-4'>
             
            </div>

            <div className=' flex items-center gap-4'>
                <Input type='text' className=' h-[35px] text-xs text-zinc-100 bg-primary'/>
                <button className=' bg-red-600 px-8 py-2 rounded-sm text-xs'>Search</button>
            </div>
            
        </div>

        <Table className=' mt-4'>
        <TableHeader>
            <TableRow>
            <TableHead className="">Select</TableHead>
            <TableHead className="">Team name</TableHead>
            <TableHead className="">Project Manager</TableHead>
            <TableHead className="">Team Leader</TableHead>
            <TableHead>Total Project</TableHead>
            <TableHead className="">Projects</TableHead>
            <TableHead className="">Individual Workloads</TableHead>
            <TableHead className="">Due on</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow>
            <TableCell className="font-medium"><Checkbox/></TableCell>
            <TableCell className="font-medium">Test</TableCell>
            <TableCell className="font-medium">Test</TableCell>
            <TableCell>Test</TableCell>
            <TableCell>1</TableCell>
            <TableCell>
            <Dialog>
                <DialogTrigger>Open</DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. This will permanently delete your account
                      and remove your data from our servers.
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>

            </TableCell>
            {/* <TableCell>
                <Viewbtn disabled={false} name='View' onClick={() => router.push('?active=members')}/>

            </TableCell> */}

            <TableCell>
                <Viewbtn disabled={false} name='View' onClick={() => router.push('?active=due on')}/>
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
 

    {/* {tab === 'members' && (
      <Teammembers/>
    )}

    {tab === 'individual workload' && (
      <Indiviualworkloads/>
    )}

    {tab === 'due on' && (
      <Dueon/>
    )} */}
    </>
    
  )
}
