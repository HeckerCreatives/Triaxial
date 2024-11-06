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
    {tab === null && (
      <div className=' w-full h-full flex justify-center bg-secondary p-6 text-zinc-100'>

      <div className=' w-full flex flex-col max-w-[1520px]'>
        <div className=' flex md:flex-row flex-col items-center justify-between gap-4'>
            <div className=' flex  items-center gap-4'>
              {/* <Dialog open={dialog} onOpenChange={setDialog}>
                <DialogTrigger>
                  <button className=' bg-primary px-6 py-2 rounded-sm flex items-center gap-1 text-xs'><Plus size={15}/>Create</button>
                </DialogTrigger>
                <DialogContent className=' bg-secondary border-none text-zinc-100 grid grid-cols-1 lg:grid-cols-[250px,1fr]'>
                  <div className=' bg-blue-400 lg:block hidden'
                  style={{backgroundImage: `url('/bg2.png')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat:"no-repeat"}}
                  
                  >
                    <p className=' p-2 uppercase text-lg font-semibold mt-8 bg-gradient-to-r from-zinc-950 to-zinc-950/10'>Create team</p>
                  </div>

                  <div className=' flex flex-col gap-2 p-4'>
                    <DialogHeader>
                    <DialogDescription>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt, reprehenderit sequi. Quisquam, libero quam placeat molestias cum est.
                    </DialogDescription>
                    </DialogHeader>
                  <form action="" className=' flex flex-col '>
                      <div className=' flex flex-col'>
                        <label htmlFor="" className=' mt-2 text-xs'>Team name</label>
                        <Input placeholder='Team Name' type='text' className=' bg-primary text-xs'/>

                        <label htmlFor="" className=' mt-2 text-xs'>Director Partner</label>
                        <Input placeholder='Director Partner' type='text' className=' bg-primary text-xs'/>

                        <label htmlFor="" className=' mt-2 text-xs'>Associate</label>
                        <Input placeholder='Associate' type='text' className=' bg-primary text-xs'/>

                        <label htmlFor="" className=' mt-2 text-xs'>Manager</label>
                        <Input placeholder='Manager' type='text' className=' bg-primary text-xs'/>

                        <label htmlFor="" className=' mt-2 text-xs'>Members</label>
                        <Textarea placeholder='Members' className=' bg-primary text-xs'/>

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
                  <button className=' bg-red-600 px-6 py-2 rounded-sm flex items-center gap-1 text-xs'><Trash size={15}/>Delete</button>
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
                <Viewbtn disabled={false} name='View' onClick={() => undefined}/>
            </TableCell>
            <TableCell>
                <Viewbtn disabled={false} name='View' onClick={() => router.push('?active=members')}/>

            </TableCell>

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
    )}

    {tab === 'members' && (
      <Teammembers/>
    )}

    {tab === 'individual workload' && (
      <Indiviualworkloads/>
    )}

    {tab === 'due on' && (
      <Dueon/>
    )}
    </>
    
  )
}
