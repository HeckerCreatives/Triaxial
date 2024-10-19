'use client'
import Button from '@/components/common/Button'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Viewmembertable from './Viewmembertable'
import { Undo2 } from 'lucide-react'

export default function Teamcards() {
  const router = useRouter()
  const [dialog, setDialog] = useState(false)
  const [view, setView] = useState(false)

  return (
    <div className=' w-full flex flex-col gap-6 mt-[170px] h-full bg-secondary p-8'>
      {view === false ? (
        <>
        <p className=' text-2xl font-semibold text-zinc-100 w-full text-center'>Teams</p>
        <div className=' w-full max-w-[1520px] flex items-start justify-center gap-4 flex-wrap'>

          <div className=' relative w-[90%] md:max-w-[400px] h-[300px] group overflow-hidden'

          >
            <img src="/admin.webp" alt="" className=' relative z-0 w-full group-hover:scale-110 ease-in-out duration-300' />

           
            <div className=' absolute z-50 bottom-0 bg-gradient-to-t from-zinc-950 to-zinc-950/50 w-full flex items-center justify-between h-[90px] p-4'>
              <div className=' flex flex-col'>
                <p className=' text-zinc-100 text-xl font-semibold'>Team Name</p>
                <p className=' text-xs text-zinc-400'>Project Manager</p>
                <p onClick={() => setView(true)} className=' text-xs text-zinc-400 underline mt-4 cursor-pointer'>View Member List</p>

              </div>

              <Dialog >
                <DialogTrigger>
                  <Button onClick={() => router.push('')} name='Projects'/>
                </DialogTrigger>
                <DialogContent className=' bg-secondary border-none w-[80%] text-zinc-100'>
                  <div className=' relative lg:block hidden py-4'
                  style={{backgroundImage: `url('/bg2.png')`, backgroundSize: "cover", backgroundPosition: "bottom", backgroundRepeat:"no-repeat"}}
                  
                  >
                    <div className=' w-full h-full top-0 absolute bg-gradient-to-tr from-zinc-950 to-zinc-950/10'></div>
                    <p className=' relative z-10 p-2 uppercase text-sm font-semibold text-red-700 '>Team Name</p>
                  </div>

                  <div className=' flex flex-col gap-2 p-4'>
                    <DialogHeader>
                      <DialogTitle>Projects</DialogTitle>
                    <DialogDescription>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt, reprehenderit sequi. Quisquam, libero quam placeat molestias cum est.
                    </DialogDescription>
                    </DialogHeader>

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
                        <TableCell className=" text-blue-400">Pending</TableCell>

                        </TableRow>
                    </TableBody>
                    </Table>
                 
                

                  </div>
                  
                </DialogContent>
              </Dialog>
              
            </div>
          </div>

           <div className=' relative w-[90%] md:max-w-[400px] h-[300px] group overflow-hidden'

          >
            <img src="/hrtop.webp" alt="" className=' relative z-0 w-full group-hover:scale-110 ease-in-out duration-300' />

           
            <div className=' absolute z-50 bottom-0 bg-gradient-to-t from-zinc-950 to-zinc-950/50 w-full flex items-center justify-between h-[90px] p-4'>
              <div className=' flex flex-col'>
                <p className=' text-zinc-100 text-xl font-semibold'>Team Name</p>
                <p className=' text-xs text-zinc-400'>Project Manager</p>
                <p onClick={() => setView(true)} className=' text-xs text-zinc-400 underline mt-4 cursor-pointer'>View Member List</p>

              </div>

               <Dialog >
                <DialogTrigger>
                  <Button onClick={() => router.push('')} name='Projects'/>
                </DialogTrigger>
                <DialogContent className=' bg-secondary border-none w-[80%] text-zinc-100'>
                  <div className=' relative lg:block hidden py-4'
                  style={{backgroundImage: `url('/bg2.png')`, backgroundSize: "cover", backgroundPosition: "bottom", backgroundRepeat:"no-repeat"}}
                  
                  >
                    <div className=' w-full h-full top-0 absolute bg-gradient-to-tr from-zinc-950 to-zinc-950/10'></div>
                    <p className=' relative z-10 p-2 uppercase text-sm font-semibold text-red-700 '>Team Name</p>
                  </div>

                  <div className=' flex flex-col gap-2 p-4'>
                    <DialogHeader>
                      <DialogTitle>Projects</DialogTitle>
                    <DialogDescription>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt, reprehenderit sequi. Quisquam, libero quam placeat molestias cum est.
                    </DialogDescription>
                    </DialogHeader>

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
                        <TableCell className=" text-blue-400">Pending</TableCell>

                        </TableRow>
                    </TableBody>
                    </Table>
                 
                

                  </div>
                  
                </DialogContent>
              </Dialog>
             
              
            </div>
          </div>

          <div className=' relative w-[90%] md:max-w-[400px] h-[300px] group overflow-hidden'

          >
            <img src="/admin.webp" alt="" className=' relative z-0 w-full group-hover:scale-110 ease-in-out duration-300' />

           
            <div className=' absolute z-50 bottom-0 bg-gradient-to-t from-zinc-950 to-zinc-950/50 w-full flex items-center justify-between h-[90px] p-4'>
              <div className=' flex flex-col'>
                <p className=' text-zinc-100 text-xl font-semibold'>Team Name</p>
                <p className=' text-xs text-zinc-400'>Project Manager</p>
                <p onClick={() => setView(true)} className=' text-xs text-zinc-400 underline mt-4 cursor-pointer'>View Member List</p>

              </div>

              
             

                <Dialog >
                <DialogTrigger>
                  <Button onClick={() => router.push('')} name='Projects'/>
                </DialogTrigger>
                <DialogContent className=' bg-secondary border-none w-[80%] text-zinc-100'>
                  <div className=' relative lg:block hidden py-4'
                  style={{backgroundImage: `url('/bg2.png')`, backgroundSize: "cover", backgroundPosition: "bottom", backgroundRepeat:"no-repeat"}}
                  
                  >
                    <div className=' w-full h-full top-0 absolute bg-gradient-to-tr from-zinc-950 to-zinc-950/10'></div>
                    <p className=' relative z-10 p-2 uppercase text-sm font-semibold text-red-700 '>Team Name</p>
                  </div>

                  <div className=' flex flex-col gap-2 p-4'>
                    <DialogHeader>
                      <DialogTitle>Projects</DialogTitle>
                    <DialogDescription>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt, reprehenderit sequi. Quisquam, libero quam placeat molestias cum est.
                    </DialogDescription>
                    </DialogHeader>

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
                        <TableCell className=" text-blue-400">Pending</TableCell>

                        </TableRow>
                    </TableBody>
                    </Table>
                 
                

                  </div>
                  
                </DialogContent>
              </Dialog>
             
              
            </div>
          </div>

           <div className=' relative w-[90%] md:max-w-[400px] h-[300px] group overflow-hidden'

          >
            <img src="/hrtop.webp" alt="" className=' relative z-0 w-full group-hover:scale-110 ease-in-out duration-300' />

           
            <div className=' absolute z-50 bottom-0 bg-gradient-to-t from-zinc-950 to-zinc-950/50 w-full flex items-center justify-between h-[90px] p-4'>
              <div className=' flex flex-col'>
                <p className=' text-zinc-100 text-xl font-semibold'>Team Name</p>
                <p className=' text-xs text-zinc-400'>Project Manager</p>
                <p onClick={() => setView(true)} className=' text-xs text-zinc-400 underline mt-4 cursor-pointer'>View Member List</p>

              </div>

               <Dialog >
                <DialogTrigger>
                  <Button onClick={() => router.push('')} name='Projects'/>
                </DialogTrigger>
                <DialogContent className=' bg-secondary border-none w-[80%] text-zinc-100'>
                  <div className=' relative lg:block hidden py-4'
                  style={{backgroundImage: `url('/bg2.png')`, backgroundSize: "cover", backgroundPosition: "bottom", backgroundRepeat:"no-repeat"}}
                  
                  >
                    <div className=' w-full h-full top-0 absolute bg-gradient-to-tr from-zinc-950 to-zinc-950/10'></div>
                    <p className=' relative z-10 p-2 uppercase text-sm font-semibold text-red-700 '>Team Name</p>
                  </div>

                  <div className=' flex flex-col gap-2 p-4'>
                    <DialogHeader>
                      <DialogTitle>Projects</DialogTitle>
                    <DialogDescription>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt, reprehenderit sequi. Quisquam, libero quam placeat molestias cum est.
                    </DialogDescription>
                    </DialogHeader>

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
                        <TableCell className=" text-blue-400">Pending</TableCell>

                        </TableRow>
                    </TableBody>
                    </Table>
                 
                

                  </div>
                  
                </DialogContent>
              </Dialog>
             
              
            </div>
          </div>

        </div>
        </>
      ) : (
        <div className=' w-full flex flex-col'>
        <button onClick={() => setView(false)} className=' w-fit text-zinc-100 bg-primary p-1 px-2 rounded-sm text-xs flex items-center gap-1'><Undo2 size={15}/>Go Back</button>
        <Viewmembertable/>
        </div>
      )}
        
    </div>
  )
}
