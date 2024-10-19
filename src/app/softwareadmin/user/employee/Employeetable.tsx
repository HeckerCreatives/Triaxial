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
import { Plus, Delete, Trash, Eye, CircleAlert, ArrowUp } from 'lucide-react'
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
import Viewbtn from '@/components/common/Viewbtn'
import { useRouter, useSearchParams } from 'next/navigation'
import Workload from './Workload'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ProjectsSection, Teams } from '@/types/data'
import CreateEmployee from '@/components/forms/CreateEmployee'




export default function Employeetable() {
  const [dialog, setDialog] = useState(false)
  const [dialog2, setDialog2] = useState(false)
  const router = useRouter()
  const search = useSearchParams()
  const active = search.get('active')

  return (
    <>
    {active === null && (
      <div className=' w-full h-full flex justify-center bg-secondary p-6 text-zinc-100'>

      <div className=' w-full flex flex-col max-w-[1520px]'>
        <div className=' flex md:flex-row flex-col items-center justify-between gap-4'>
            <div className=' flex  items-center gap-4'>
              {/* <CreateEmployee/> */}
               
              
              <Dialog open={dialog} onOpenChange={setDialog}>
                <DialogTrigger>
                  <button className=' bg-red-700 px-6 py-2 rounded-sm flex items-center gap-1 text-xs'><Plus size={15}/>Create</button>
                </DialogTrigger>
                <DialogContent className=' bg-secondary border-none text-zinc-100 grid grid-cols-1 lg:grid-cols-[250px,1fr]'>
                  <div className=' bg-blue-400 lg:block hidden'
                  style={{backgroundImage: `url('/bg2.png')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat:"no-repeat"}}
                  
                  >
                    <p className=' p-2 uppercase text-sm font-semibold mt-8 bg-gradient-to-r from-zinc-950 to-zinc-950/10'>Create Employee</p>
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
                      <div className=' flex flex-col gap-1'>
                        <label htmlFor="" className=' mt-2 text-xs'>First name</label>
                        <Input placeholder='First name' type='text' className=' bg-primary text-xs h-[35px]'/>
                      
                        <label htmlFor="" className=' mt-2 text-xs'>Last name</label>
                        <Input placeholder='Last name' type='text' className=' bg-primary text-xs h-[35px]'/>

                        <label htmlFor="" className=' mt-2 text-xs'>Initial*</label>
                        <Input placeholder='Initial' type='text' className=' bg-primary text-xs h-[35px]'/>

                        <label htmlFor="" className=' mt-2 text-xs'>Contact no</label>
                        <Input placeholder='Contact no' type='text' className=' bg-primary text-xs h-[35px]'/>

                        <label htmlFor="" className=' mt-2 text-xs'>Reporting to *</label>
                        <Select>
                          <SelectTrigger className="w-full text-xs h-[35px] bg-primary">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent className=' text-xs'>
                            {Teams.map((item, index) => (
                            <SelectItem key={index} value={item.name}>{item.name}</SelectItem>

                            ))}
                           
                          </SelectContent>
                        </Select>
                      </div>

                      <div className=' flex flex-col gap-1'>
                        <label htmlFor="" className=' mt-2 text-xs'>Email *</label>
                        <Input placeholder='Email' type='email' className=' bg-primary text-xs h-[35px]'/>

                        <label htmlFor="" className=' mt-2 text-xs'>Team *</label>
                        <Select>
                          <SelectTrigger className="w-full text-xs h-[35px] bg-primary">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent className=' text-xs'>
                            {Teams.map((item, index) => (
                            <SelectItem key={index} value={item.name}>{item.name}</SelectItem>

                            ))}
                           
                          </SelectContent>
                        </Select>

                        <label htmlFor="" className=' mt-2 text-xs'>Position *</label>
                        <Input placeholder='Position' type='text' className=' bg-primary text-xs h-[35px]'/>

                        <div className=' w-full bg-primary flex flex-col items-center mt-2 p-2'>
                          <div className=' w-20 aspect-square bg-secondary'>

                          </div>
                          <input type="file" className=' text-[.5em] mt-2 bg-secondary' placeholder='Select Image' />
                        </div>
                       
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

              <Dialog open={dialog2} onOpenChange={setDialog2}>
                <DialogTrigger>
                  <button className=' bg-red-700 px-6 py-2 rounded-sm flex items-center gap-1 text-xs'><ArrowUp size={15}/>Promote</button>
                </DialogTrigger>
                <DialogContent className=' bg-secondary border-none text-zinc-100 grid grid-cols-1 lg:grid-cols-[250px,1fr]'>
                  <div className=' bg-blue-400 lg:block hidden'
                  style={{backgroundImage: `url('/bg2.png')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat:"no-repeat"}}
                  
                  >
                    <p className=' p-2 uppercase text-sm font-semibold mt-8 bg-gradient-to-r from-zinc-950 to-zinc-950/10'>Promote To Manager</p>
                  </div>

                  <div className=' flex flex-col gap-2 p-4'>
                    <DialogHeader>
                    <DialogDescription>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt, reprehenderit sequi. Quisquam, libero quam placeat molestias cum est.
                    </DialogDescription>
                    </DialogHeader>
                  <form action="" className=' flex flex-col '>
                    <h2 className=' uppercase font-semibold text-xs'>Account Details</h2>
                    <div className=' grid grid-cols-2 gap-4'>
                      <div className=' flex flex-col gap-1'>
                        <label htmlFor="" className=' mt-4 text-xs'>Employee</label>
                        <Select>
                          <SelectTrigger className="w-full text-xs bg-primary">
                            <SelectValue placeholder="Employee" />
                          </SelectTrigger>
                          <SelectContent className=' text-xs'>
                            {Teams.map((item, index) => (
                            <SelectItem key={index} value={item.name}>{item.name}</SelectItem>

                            ))}
                           
                          </SelectContent>
                        </Select>

                        <label htmlFor="" className=' mt-4 text-xs'>Team</label>
                        <Select>
                          <SelectTrigger className="w-full text-xs bg-primary">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent className=' text-xs'>
                            {Teams.map((item, index) => (
                            <SelectItem key={index} value={item.name}>{item.name}</SelectItem>

                            ))}
                           
                          </SelectContent>
                        </Select>

                        
                      </div>

                      <div className=' flex flex-col bg-primary rounded-sm p-2'>
                       <p className=' text-xs text-zinc-400'>Email:</p>
                       <p className=' text-xs text-zinc-400'>Contact:</p>
                       <p className=' text-xs text-zinc-400'>Initial:</p>
                       <p className=' text-xs text-zinc-400'>Position:</p>

                      
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

              <button className=' bg-primary px-8 py-2 rounded-sm text-xs flex items-center gap-1 text-red-700'><CircleAlert size={15}/>Ban</button>


              {/* <AlertDialog>
                <AlertDialogTrigger>
                <button className=' bg-red-600 px-6 py-2 rounded-sm flex items-center gap-1'><CircleAlert size={25}/>Ban</button>
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
              </AlertDialog> */}
            </div>

            <div className=' flex items-center gap-2'>
                <Input type='text' className=' bg-primary h-[35px] text-zinc-100'/>
                <button className=' bg-red-700 px-8 py-2 rounded-sm text-xs'>Search</button>
            </div>
            
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
            <TableHead >Individual Workload</TableHead>
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
             <Viewbtn disabled={false} name='View' onClick={() => router.push('?active=workload')}/>
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
    )}

    {active === 'workload' && (
      <Workload/>
    )}
    </>
    
  )
}
