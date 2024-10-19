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
import { Plus, FilePenLine, Trash } from 'lucide-react'
import Button from '@/components/common/Button'
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


export default function Scheduletable() {
  const [dialog, setDialog] = useState(false)
  const [dialog2, setDialog2] = useState(false)

  return (
    <div className=' w-full gap-4 p-4 h-full bg-secondary'>

        

        <div className=' flex flex-col w-full p-4 rounded-sm'>
            {/* <p className=' text-zinc-100 text-lg'>Schedules</p> */}

            <div className=' flex md:flex-row flex-col items-center justify-between gap-4 text-zinc-100'>
            <div className=' flex items-center gap-4'>
              <Dialog open={dialog} onOpenChange={setDialog}>
                <DialogTrigger>
                  <button className=' bg-red-700 text-xs px-6 py-2 rounded-sm flex items-center gap-1'><Plus size={15}/>Create</button>
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
                      <Button onClick={() => setDialog(false)} name={'Save'}/>
                    </div>

                  </div>
                  
                </DialogContent>
              </Dialog>
            </div>
            
            </div>
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
                <TableCell className=" flex items-center gap-2">
                 
                  <Dialog open={dialog2} onOpenChange={setDialog2}>
                <DialogTrigger>
                  <button className=' p-2 bg-secondary rounded-sm flex items-center gap-1'><FilePenLine size={15}/></button>
                </DialogTrigger>
                <DialogContent className=' bg-secondary border-none text-zinc-100 grid grid-cols-1 lg:grid-cols-[250px,1fr]'>
                  <div className=' bg-blue-400 lg:block hidden'
                  style={{backgroundImage: `url('/bg2.png')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat:"no-repeat"}}
                  
                  >
                    <p className=' p-2 uppercase text-sm font-semibold mt-8 bg-gradient-to-r from-zinc-950 to-zinc-950/10'>Edit Schedule</p>
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
                      <Input type='date' placeholder='Date' className=' bg-primary text-xs h-[35px]'/>
                    </div>
                  </form>
                  
                    <div className=' w-full flex items-end justify-end gap-2 mt-8'>
                      <ButtonSecondary onClick={() => setDialog2(false)}  name={'Cancel'}/>
                      <Button onClick={() => setDialog2(false)} name={'Save'}/>
                    </div>

                  </div>
                  
                </DialogContent>
                  </Dialog>

                

                 <AlertDialog>
                <AlertDialogTrigger>
                 <button className=' p-2 bg-secondary rounded-sm flex items-center gap-1'><Trash size={15}/></button>
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


                </TableCell>
                </TableRow>
            </TableBody>
            </Table>
        </div>

       
    </div>
  )
}
