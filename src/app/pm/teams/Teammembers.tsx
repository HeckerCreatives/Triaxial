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
import { Plus, Delete, Trash, Eye } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import ButtonSecondary from '@/components/common/ButtonSecondary'
import Button from '@/components/common/Button'
import { Textarea } from '@/components/ui/textarea'
import { useRouter, useSearchParams } from 'next/navigation'




export default function Teammembers() {
  const [dialog, setDialog] = useState(false)
  const [dialog2, setDialog2] = useState(false)
  const router = useRouter()
  const search = useSearchParams()
  const tab = search.get('active')

  return (
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
            <TableHead className="">Employee name</TableHead>
            <TableHead className="">Email</TableHead>
            <TableHead className="">Initial</TableHead>
            <TableHead>Repoting to</TableHead>
            <TableHead className="">Workload</TableHead>
            
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow>
            <TableCell className="font-medium">Test</TableCell>
            <TableCell className="font-medium">Test</TableCell>
            <TableCell>Test</TableCell>
            <TableCell>Test</TableCell>
           
            <TableCell>
                <button onClick={() => router.push('?active=individual workload')} className=' p-2 rounded-sm bg-red-700 text-xs'>View</button>
            </TableCell>
           
            {/* <TableCell className=" flex items-center gap-2">

              <Dialog open={dialog2} onOpenChange={setDialog2}>
                <DialogTrigger>
                  <button className=' p-2 rounded-sm bg-secondary'><Eye size={20}/></button>
                </DialogTrigger>
                <DialogContent className=' bg-secondary border-none text-zinc-100 grid grid-cols-1 lg:grid-cols-[250px,1fr]'>
                  <div className=' bg-blue-400 lg:block hidden'
                  style={{backgroundImage: `url('/bg2.png')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat:"no-repeat"}}
                  
                  >
                    <p className=' p-2 uppercase text-lg font-semibold mt-8 bg-gradient-to-r from-zinc-950 to-zinc-950/10'>Team</p>
                  </div>

                  <div className=' flex flex-col gap-2 p-4'>
                    <DialogHeader>
                      <DialogTitle className=' text-red-700'>Team Name</DialogTitle>
                    <DialogDescription>
                      Members:
                    </DialogDescription>
                    </DialogHeader>

                    <div className=' w-full grid grid-cols-2 gap-2'>
                      <div className=' flex flex-col p-4 w-full h-auto bg-primary rounded-sm'>
                        <p className=' text-sm font-semibold text-zinc-100'>Member Name</p>
                        <p className=' text-xs text-zinc-400'>Position</p>
                      </div>

                      <div className=' flex flex-col p-4 w-full h-auto bg-primary rounded-sm'>
                        <p className=' text-sm font-semibold text-zinc-100'>Member Name</p>
                        <p className=' text-xs text-zinc-400'>Position</p>
                      </div>

                      <div className=' flex flex-col p-4 w-full h-auto bg-primary rounded-sm'>
                        <p className=' text-sm font-semibold text-zinc-100'>Member Name</p>
                        <p className=' text-xs text-zinc-400'>Position</p>
                      </div>

                      <div className=' flex flex-col p-4 w-full h-auto bg-primary rounded-sm'>
                        <p className=' text-sm font-semibold text-zinc-100'>Member Name</p>
                        <p className=' text-xs text-zinc-400'>Position</p>
                      </div>

                      <div className=' flex flex-col p-4 w-full h-auto bg-primary rounded-sm'>
                        <p className=' text-sm font-semibold text-zinc-100'>Member Name</p>
                        <p className=' text-xs text-zinc-400'>Position</p>
                      </div>

                      <div className=' flex flex-col p-4 w-full h-auto bg-primary rounded-sm'>
                        <p className=' text-sm font-semibold text-zinc-100'>Member Name</p>
                        <p className=' text-xs text-zinc-400'>Position</p>
                      </div>

                    </div>
                 
                

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
