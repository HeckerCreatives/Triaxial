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




export default function Employeetable() {
  const [dialog, setDialog] = useState(false)
  const [dialog2, setDialog2] = useState(false)

  return (
    <div className=' w-full h-full flex justify-center bg-secondary p-6 text-zinc-100'>

      <div className=' w-full flex flex-col max-w-[1520px]'>
        <div className=' flex md:flex-row flex-col items-center justify-between gap-4'>
            <div className=' flex  items-center gap-4'>
              <Dialog open={dialog} onOpenChange={setDialog}>
                <DialogTrigger>
                  <button className=' bg-primary px-6 py-2 rounded-sm flex items-center gap-1'><Plus size={25}/>Create</button>
                </DialogTrigger>
                <DialogContent className=' bg-secondary border-none text-zinc-100 grid grid-cols-1 lg:grid-cols-[250px,1fr]'>
                  <div className=' bg-blue-400 lg:block hidden'
                  style={{backgroundImage: `url('/bg2.png')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat:"no-repeat"}}
                  
                  >
                    <p className=' p-2 uppercase text-lg font-semibold mt-8 bg-gradient-to-r from-zinc-950 to-zinc-950/10'>Create Account</p>
                  </div>

                  <div className=' flex flex-col gap-2 p-4'>
                    <DialogHeader>
                    <DialogDescription>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt, reprehenderit sequi. Quisquam, libero quam placeat molestias cum est.
                    </DialogDescription>
                    </DialogHeader>
                  <form action="" className=' flex flex-col '>
                    <h2 className=' uppercase font-semibold text-sm'>Employee Details</h2>
                    <div className=' grid grid-cols-2 gap-4'>
                      <div className=' flex flex-col'>
                        <label htmlFor="" className=' mt-4 text-sm'>First name</label>
                        <Input placeholder='First name' type='text' className=' bg-primary'/>

                        <label htmlFor="" className=' mt-4 text-sm'>Middle name</label>
                        <Input placeholder='Middle name' type='text' className=' bg-primary'/>

                        <label htmlFor="" className=' mt-4 text-sm'>Last name</label>
                        <Input placeholder='Last name' type='text' className=' bg-primary'/>
                      </div>

                      <div className=' flex flex-col'>
                        <label htmlFor="" className=' mt-4 text-sm'>Email</label>
                        <Input placeholder='Email' type='email' className=' bg-primary'/>

                        <label htmlFor="" className=' mt-4 text-sm'>Password</label>
                        <Input placeholder='Password' type='password' className=' bg-primary'/>

                        <label htmlFor="" className=' mt-4 text-sm'>Confirm password</label>
                        <Input placeholder='Confirm password' type='text' className=' bg-primary'/>
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

             
            </div>

            {/* <div className=' flex items-center gap-4'>
                <Input type='text' className=' text-zinc-900'/>
                <button className=' bg-primary px-8 py-2 rounded-sm'>Search</button>
            </div> */}
            
        </div>

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
            
              <Dialog open={dialog2} onOpenChange={setDialog2}>
                <DialogTrigger>
                  <button className=' p-2 rounded-sm bg-secondary'><Eye size={20}/></button>
                </DialogTrigger>
                <DialogContent className=' bg-secondary border-none text-zinc-100 grid grid-cols-1 lg:grid-cols-[250px,1fr]'>
                  <div className=' bg-blue-400 lg:block hidden'
                  style={{backgroundImage: `url('/bg2.png')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat:"no-repeat"}}
                  
                  >
                    <p className=' p-2 uppercase text-lg font-semibold mt-8 bg-gradient-to-r from-zinc-950 to-zinc-950/10'>Edit Account</p>
                  </div>

                  <div className=' flex flex-col gap-2 p-4'>
                    <DialogHeader>
                    <DialogDescription>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt, reprehenderit sequi. Quisquam, libero quam placeat molestias cum est.
                    </DialogDescription>
                    </DialogHeader>
                  <form action="" className=' flex flex-col '>
                    <h2 className=' uppercase font-semibold text-sm'>Employee Details</h2>
                    <div className=' grid grid-cols-2 gap-4'>
                      <div className=' flex flex-col'>
                        <label htmlFor="" className=' mt-4 text-sm'>First name</label>
                        <Input placeholder='First name' type='text' className=' bg-primary'/>

                        <label htmlFor="" className=' mt-4 text-sm'>Middle name</label>
                        <Input placeholder='Middle name' type='text' className=' bg-primary'/>

                        <label htmlFor="" className=' mt-4 text-sm'>Last name</label>
                        <Input placeholder='Last name' type='text' className=' bg-primary'/>
                      </div>

                      <div className=' flex flex-col'>
                        <label htmlFor="" className=' mt-4 text-sm'>Email</label>
                        <Input placeholder='Email' type='email' className=' bg-primary'/>

                        <label htmlFor="" className=' mt-4 text-sm'>Password</label>
                        <Input placeholder='Password' type='password' className=' bg-primary'/>

                        <label htmlFor="" className=' mt-4 text-sm'>Confirm password</label>
                        <Input placeholder='Confirm password' type='text' className=' bg-primary'/>
                      </div>
                    </div>
                      

                  </form>
                  
                    <div className=' w-full flex items-end justify-end gap-2 mt-8'>
                      <ButtonSecondary onClick={() => setDialog2(false)}  name={'Cancel'}/>
                      <Button onClick={() => setDialog2(false)} name={'Save Changes'}/>
                    </div>

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
