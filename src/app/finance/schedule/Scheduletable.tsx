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
import { Plus } from 'lucide-react'
import { Input } from '@/components/ui/input'
import ButtonSecondary from '@/components/common/ButtonSecondary'
import Button from '@/components/common/Button'

export default function Scheduletable() {
  const [dialog, setDialog] = useState(false)

  return (
    <div className=' w-full gap-4 p-4 h-full bg-secondary'>

        <div className=' flex flex-col w-full p-4 rounded-sm'>

            <div className=' flex items-center gap-4'>
              <Dialog open={dialog} onOpenChange={setDialog}>
                <DialogTrigger>
                  <button className=' bg-red-700 text-xs px-6 py-2 rounded-sm flex items-center gap-1 text-zinc-100'><Plus size={15}/>Create</button>
                </DialogTrigger>
                <DialogContent className=' bg-secondary border-none text-zinc-100 grid grid-cols-1 lg:grid-cols-[250px,1fr]'>
                  <div className=' bg-blue-400 lg:block hidden'
                  style={{backgroundImage: `url('/bg2.png')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat:"no-repeat"}}
                  
                  >
                    <p className=' p-2 uppercase text-sm font-semibold mt-8 bg-gradient-to-r from-zinc-950 to-zinc-950/10'>Create Schedule</p>
                  </div>

                  <div className=' flex flex-col gap-2 p-4'>
                    <DialogHeader>
                    <DialogDescription>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt, reprehenderit sequi. Quisquam, libero quam placeat molestias cum est.
                    </DialogDescription>
                    </DialogHeader>
                  <form action="" className=' flex flex-col '>

                    <div className=' w-full grid grid-cols-2 gap-4'>
                      <div className=' flex flex-col gap-1'>
                        <label htmlFor="" className=' mt-2 text-xs'>Job no.</label>
                        <Input placeholder='Job no.' type='number' className=' bg-primary border-none text-xs h-[35px]'/>

                        <label htmlFor="" className=' mt-2 text-xs'>Project name</label>
                        <Input placeholder='Project name' type='text' className=' bg-primary border-none text-xs h-[35px]'/>

                      </div>

                      <div className=' flex flex-col gap-1'>
                        <label htmlFor="" className=' mt-2 text-xs'>Job Manager</label>
                        <Input placeholder='Job Manager' type='number' className=' bg-primary border-none text-xs h-[35px]'/>

                       

                        <label htmlFor="" className=' mt-2 text-xs'>Job Component</label>
                        <Input placeholder='Job Component' type='text' className=' bg-primary border-none text-xs h-[35px]'/>

                        
                      </div>
                    </div>

                    <div className=' mt-2'>
                      <label htmlFor="" className=' text-xs'>Schedule</label>
                      <Input type='date' placeholder='Date' className=' bg-primary text-xs h-[35px]' border-none/>
                    </div>
                  </form>
                  
                    <div className=' w-full flex items-end justify-end gap-2 mt-8'>
                      <ButtonSecondary onClick={() => setDialog(false)}  name={'Cancel'}/>
                      <Button onClick={() => setDialog(false)} name={'Submit'}/>
                    </div>

                  </div>
                  
                </DialogContent>
              </Dialog>
            </div>
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
                <TableCell className=" text-blue-400">Pending</TableCell>
                </TableRow>
            </TableBody>
            </Table>
        </div>

       
    </div>
  )
}
