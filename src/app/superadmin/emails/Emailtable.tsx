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


export default function Emailtable() {
  const [dialog, setDialog] = useState(false)

  return (
    <div className=' w-full h-full flex justify-center bg-secondary p-6 mt-[150px] text-zinc-100'>

      <div className=' w-full flex flex-col max-w-[1520px]'>
        <div className=' flex md:flex-row flex-col items-center justify-between gap-4'>
            <div className=' flex  items-center gap-4'>
                <Dialog open={dialog} onOpenChange={setDialog}>
                <DialogTrigger>
                  <button className=' bg-red-700 px-6 py-2 rounded-sm flex items-center gap-1 text-xs'><Plus size={15}/>Create</button>
                </DialogTrigger>
                <DialogContent className=' bg-secondary border-none text-zinc-100 grid grid-cols-1 lg:grid-cols-[250px,1fr]'>
                  <div className=' bg-blue-400 lg:block hidden'
                  style={{backgroundImage: `url('/bg2.png')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat:"no-repeat"}}
                  
                  >
                    <p className=' p-2 uppercase text-sm font-semibold mt-8 bg-gradient-to-r from-zinc-950 to-zinc-950/10'>Create Mail</p>
                  </div>

                  <div className=' flex flex-col gap-2 p-4'>
                    <DialogHeader>
                    <DialogDescription>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt, reprehenderit sequi. Quisquam, libero quam placeat molestias cum est.
                    </DialogDescription>
                    </DialogHeader>
                  <form action="" className=' flex flex-col '>
                    <h2 className=' uppercase font-semibold text-sm'>Recipient</h2>
                    <div className=' grid grid-cols-1 gap-4'>
                      <div className=' flex flex-col'>
                        <label htmlFor="" className=' mt-4 text-xs'>Subject</label>
                        <Input placeholder='Subject' type='text' className=' bg-primary text-xs h-[35px]'/>

                        <label htmlFor="" className=' mt-4 text-xs'>Content</label>
                        <Textarea placeholder='Content' className=' bg-primary border-none text-xs h-[35px]'/>
                      </div>

                      
                    </div>
                      

                  </form>
                  
                    <div className=' w-full flex items-end justify-end gap-2 mt-8'>
                      <ButtonSecondary onClick={() => setDialog(false)}  name={'Cancel'}/>
                      <Button onClick={() => setDialog(false)} name={'Save'}/>
                    </div>

                  </div>
                  
                </DialogContent>
                </Dialog>

                <AlertDialog>
                <AlertDialogTrigger>
                  <button className=' bg-primary text-red-700 text-xs px-6 py-2 rounded-sm flex items-center gap-1'><Trash size={15}/>Delete</button>
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
            <TableHead className="w-[100px]">Select</TableHead>
            <TableHead>Sender</TableHead>
            <TableHead>Message</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow>
            <TableCell className="font-medium"><Checkbox/></TableCell>
            <TableCell>Test</TableCell>
            <TableCell>
              <p className=' line-clamp-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde nostrum in deleniti ex sequi natus numquam, quibusdam perferendis totam, reprehenderit repudiandae. Dolore voluptate qui iure nobis veritatis eaque a! Saepe?</p>
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
