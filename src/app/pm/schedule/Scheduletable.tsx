'use client'
import React, { useState } from 'react'
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import ButtonSecondary from '@/components/common/ButtonSecondary'
import { Plus, FilePenLine } from 'lucide-react'
import Button from '@/components/common/Button'

export default function Scheduletable() {
  const [dialog, setDialog] = useState(false)

  return (
    <div className=' w-full gap-4 p-4 mt-[170px] h-full bg-secondary'>

        <div className=' flex flex-col w-full p-4 rounded-sm'>
            <p className=' text-zinc-100 text-lg'>Schedules</p>
            <Table className=' mt-4 text-sm'>
            <TableHeader className=''>
                <TableRow>
                <TableHead className="">Id</TableHead>
                <TableHead>Project Name</TableHead>
                <TableHead>Schedule</TableHead>
                <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className=' text-zinc-300'>
                <TableRow>
                <TableCell className="">00001</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>00/00/00</TableCell>
                <TableCell className="">
                  <Dialog open={dialog} onOpenChange={setDialog}>
                <DialogTrigger>
                  <button className=' p-2 bg-secondary rounded-sm flex items-center gap-1'><FilePenLine size={20}/></button>
                </DialogTrigger>
                <DialogContent className=' bg-secondary border-none text-zinc-100 grid grid-cols-1 lg:grid-cols-[250px,1fr]'>
                  <div className=' bg-blue-400 lg:block hidden'
                  style={{backgroundImage: `url('/bg2.png')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat:"no-repeat"}}
                  
                  >
                    <p className=' p-2 uppercase text-lg font-semibold mt-8 bg-gradient-to-r from-zinc-950 to-zinc-950/10'>Set Schedule</p>
                  </div>

                  <div className=' flex flex-col gap-2 p-8'>
                    <DialogHeader>
                    <DialogTitle></DialogTitle>
                    <DialogDescription>
                      
                    </DialogDescription>
                  </DialogHeader>
                
                   

                    <label htmlFor="" className=' mt-4'>Date</label>
                    <Input type='date' className=' bg-primary'/>

                    <div className=' w-full flex items-end justify-end gap-2 mt-4'>
                      <ButtonSecondary onClick={() => setDialog(false)}  name={'Cancel'}/>
                      <Button onClick={() => setDialog(false)} name={'Save Changes'}/>
                    </div>

                  </div>
                  
                </DialogContent>
              </Dialog>
                </TableCell>
                </TableRow>
            </TableBody>
            </Table>
        </div>

       
    </div>
  )
}
