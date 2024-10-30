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
import { ArrowDownAZ, Eye, RefreshCcw } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ProjectsSection, Teams } from '@/types/data'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"





export default function Projecttable() {
  const [dialog, setDialog] = useState(false)
  const [dialog2, setDialog2] = useState(false)
  const [dialog3, setDialog3] = useState(false)
  const [tab, setTab] = useState('Shaw All')

  return (
   <div className=' w-full h-full flex justify-center bg-secondary p-6 text-zinc-100'>

    <div className=' w-full flex flex-col max-w-[1520px]'>
      <div className=' flex md:flex-row flex-col items-center justify-between gap-4'>
            <div className=' flex items-center gap-2'>
              {/* <Dialog open={dialog} onOpenChange={setDialog}>
                <DialogTrigger>
                  <button className=' bg-primary px-6 py-2 rounded-sm flex items-center gap-1'><Plus size={25}/>Create</button>
                </DialogTrigger>
                <DialogContent className=' bg-secondary border-none text-zinc-100 grid grid-cols-1 lg:grid-cols-[250px,1fr]'>
                  <div className=' bg-blue-400 lg:block hidden'
                  style={{backgroundImage: `url('/bg2.png')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat:"no-repeat"}}
                  
                  >
                    <p className=' p-2 uppercase text-lg font-semibold mt-8 bg-gradient-to-r from-zinc-950 to-zinc-950/10'>Create project</p>
                  </div>

                  <div className=' flex flex-col gap-2 p-4'>
                    <DialogHeader>
                    <DialogDescription>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt, reprehenderit sequi. Quisquam, libero quam placeat molestias cum est.
                    </DialogDescription>
                    </DialogHeader>
                  <form action="" className=' flex flex-col '>

                    <div className=' w-full grid grid-cols-2 gap-4'>
                      <div className=' flex flex-col'>
                        <label htmlFor="" className=' mt-4'>Job no.</label>
                        <Input placeholder='Job no.' type='number' className=' bg-primary'/>

                        <label htmlFor="" className=' mt-4'>Project name</label>
                        <Input placeholder='Project name' type='text' className=' bg-primary'/>

                        <label htmlFor="" className=' mt-4'>Clients</label>
                        <Input placeholder='Clients' type='text' className=' bg-primary'/>
                      </div>

                      <div className=' flex flex-col'>
                        <label htmlFor="" className=' mt-4'>Job Manager</label>
                        <Input placeholder='Job Manager' type='number' className=' bg-primary'/>

                        <label htmlFor="" className=' mt-4'>Budget</label>
                        <Input placeholder='Budget' type='text' className=' bg-primary'/>

                        <label htmlFor="" className=' mt-4'>Job Component</label>
                        <Input placeholder='Job Component' type='text' className=' bg-primary'/>

                        
                      </div>
                    </div>

                    <div className=' mt-4'>
                      <label htmlFor="" className=''>Note</label>
                      <Textarea placeholder='Note' className=' bg-primary'/>
                    </div>
                  </form>
                  
                    <div className=' w-full flex items-end justify-end gap-2 mt-8'>
                      <ButtonSecondary onClick={() => setDialog(false)}  name={'Cancel'}/>
                      <Button onClick={() => setDialog(false)} name={'Save'}/>
                    </div>

                  </div>
                  
                </DialogContent>
              </Dialog> */}
              <button className={`text-xs rounded-sm px-4 py-2 bg-red-700 text-zinc-50`}>Show All</button>
              
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <button className=' text-xs bg-red-700 rounded-sm p-2 text-zinc-50 flex items-center gap-2'><ArrowDownAZ size={15}/>Sort by Team</button>
                      </TooltipTrigger>
                      <TooltipContent >
                        <p className=' text-xs'>Sort By Team</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </DropdownMenuTrigger>
                <DropdownMenuContent className=' h-[300px] overflow-y-auto'>
                  <DropdownMenuLabel>Teams</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {ProjectsSection.map((item, index) => (
                    <a key={index} href={`${item.route}?team=${item.name}`}>
                    <DropdownMenuItem  className=' text-xs'>{item.name}</DropdownMenuItem>
                    </a>
                  ))}
                  
                </DropdownMenuContent>
              </DropdownMenu>

               <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <button className={`text-xs rounded-sm p-2 bg-red-700 text-zinc-50`}><RefreshCcw size={15}/></button>
                    </TooltipTrigger>
                    <TooltipContent >
                      <p className=' text-xs'>Refresh</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>




            </div>

            <div className=' flex items-center gap-2'>
                <Input type='text' placeholder='Search' className=' bg-primary h-[35px] text-zinc-100'/>
                <button className=' bg-red-700 px-8 py-2 rounded-sm text-xs'>Search</button>
            </div>
            
      </div>

        <Table className=' mt-4'>
        <TableHeader>
            <TableRow>
            <TableHead className="">Job No</TableHead>
            <TableHead>Project Name</TableHead>
            <TableHead>Client Name</TableHead>
            <TableHead className="">Job Manager</TableHead>
            <TableHead className="">Est.$</TableHead>
            <TableHead className="">%Invoice</TableHead>
            <TableHead className="">Job Component</TableHead>
            <TableHead className="">Job Members</TableHead>
            <TableHead className="">Team Name</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow>
            <TableCell className="font-medium"><a href="/superadmin/project/projectdetails" className=' text-blue-400 underline'>tx0934857</a></TableCell>
            <TableCell>Test</TableCell>
            <TableCell>Test</TableCell>
            <TableCell className="">Test</TableCell>
            <TableCell className="">99,999</TableCell>
            <TableCell className="">100%</TableCell>
            <TableCell className="">
              <Dialog>
              <DialogTrigger><button className=' bg-red-700 rounded-sm p-1 text-white flex items-center gap-2'>Job Component<Eye size={15}/></button></DialogTrigger>
              <DialogContent className=' p-6 bg-secondary border-none text-white'>
                <DialogHeader>
                  <DialogTitle>Job Component</DialogTitle>
                  <DialogDescription>
                    This will be the job components to the select project
                  </DialogDescription>
                   <Table className=' mt-4'>
                    <TableHeader>
                        <TableRow>
                        <TableHead className="">Job Manager</TableHead>
                        <TableHead>Est Budget $</TableHead>
                        <TableHead>Components</TableHead>
                        {/* <TableHead >Action</TableHead> */}

                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                        <TableCell className="font-medium">Name</TableCell>
                        <TableCell className="font-medium">1</TableCell>
                        <TableCell className="font-medium">Name</TableCell>
                        

                        </TableRow>
                    </TableBody>
                    </Table>

                </DialogHeader>
              </DialogContent>
            </Dialog>

              </TableCell>
            <TableCell className="">Members</TableCell>
            <TableCell className="">Team Name</TableCell>
            
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
