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
import { Plus, Delete, Trash, Eye, FileDown, Printer, ReceiptText, FilePlus2, FileCheck, RefreshCw, Filter, Search, Copy, Layers, TriangleAlert, Pen } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from '@/components/ui/textarea'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Createprojectform from '@/components/forms/Createprojectform'
import Editprojectform from '@/components/forms/Editprojectform'
import Copyprojectform from '@/components/forms/Copyprojectform'
import Variationprojectform from '@/components/forms/Variationprojectform'
import Viewproject from '@/components/forms/Viewproject'
import axios from 'axios'
import { formatDateTime } from '@/utils/functions'
import PaginitionComponent from '@/components/common/Pagination'
import Spinner from '@/components/common/Spinner'
import { useSearchParams } from 'next/navigation'


type Project = {
  createdAt: string
deadlinedate: string
invoiced: number
managerName: string
projectname: string
startdate: string
status: string
teamname: string
updatedAt: string
_id: string
}

export default function Projecttable() {
  const [dialog2, setDialog2] = useState(false)
  const [dialog6, setDialog6] = useState(false)
  const [loading, setLoading] = useState(false)

  const [list, setList] = useState<Project[]>([])
  const [totalpage, setTotalpage] = useState(0)
  const [currentpage, setCurrentpage] = useState(0)
  const [search, setSearch] = useState('')
  const params = useSearchParams()
  const refresh = params.get('state')

   useEffect(() => {
     setLoading(true)
     const timer = setTimeout(() => {
       const getList = async () => {
         const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/projects/listprojectsemployee?searchproject=${search}&page=${currentpage}&limit=10`,{
           withCredentials: true,
           headers: {
             'Content-Type': 'application/json'
             }
         })
  
         console.log('project list',response.data)
         setList(response.data.data.projectlist)
         setTotalpage(response.data.data.totalpages)
         setLoading(false)
     
       }
       getList()
     },500)
     return () => clearTimeout(timer)
    
   },[currentpage, search, refresh])

  const getList = async () => {
    setLoading(true)
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/projects/listprojects?searchproject=${search}&page=0&limit=10`,{
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
        }
    })

    console.log('project list',response.data)
    setList(response.data.data.projectlist)
    setTotalpage(response.data.data.totalpages)
    setLoading(false)
 
  }

   //paginition
   const handlePageChange = (page: number) => {
    setCurrentpage(page)
  }

  return (
   <div className=' w-full h-full flex justify-center bg-secondary p-6 text-zinc-100'>

    <div className=' w-full flex flex-col max-w-[1520px]'>

      <div className=' w-full flex items-center justify-between'>
        <div className=' flex items-center gap-2'>

          {/* <Createprojectform onClick={() => undefined}>
            <button className=' bg-red-700 p-2 rounded-sm text-zinc-100'><FilePlus2 size={15}/></button>
          </Createprojectform>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger onClick={getList}>
                <button className=' bg-red-700 p-2 rounded-sm text-zinc-100'><RefreshCw size={15}/></button>
              </TooltipTrigger>
              <TooltipContent className=' bg-secondary text-zinc-100 border-zinc-700'>
                <p>Refresh</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <DropdownMenu>
          <DropdownMenuTrigger>
            <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <button className=' bg-red-700 p-2 rounded-sm text-zinc-100'><Filter size={15}/></button>
              </TooltipTrigger>
              <TooltipContent className=' bg-secondary text-zinc-100 border-zinc-700'>
                <p>Filter</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          </DropdownMenuTrigger>
          <DropdownMenuContent className=' bg-secondary border-zinc-600 text-zinc-100'>
            <DropdownMenuLabel>Filter</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Mangager 1</DropdownMenuItem>
            <DropdownMenuItem>Mangager 2</DropdownMenuItem>
            <DropdownMenuItem>Mangager 3</DropdownMenuItem>
          </DropdownMenuContent>
          </DropdownMenu> */}

        </div>

        <div className=' flex items-center gap-2'>
                <Input value={search} onChange={(e) => setSearch(e.target.value)} type='text' placeholder='Search' className=' text-sm bg-primary text-zinc-100'/>
                  <button className=' text-sm px-4 h-[40px] rounded-sm bg-red-700 flex items-center gap-1'><Search size={15}/>Search</button>
              </div>
        </div>

        <Table className=' mt-4'>
        {list.length === 0 &&  
          <TableCaption className=' text-xs text-zinc-500'>No data</TableCaption>
          }
          
        {loading === true && (
            <TableCaption className=' '>
              <Spinner/>
            </TableCaption>
          )}
        <TableHeader>
            <TableRow>
            <TableHead className="">Select</TableHead>
            <TableHead>Project Name</TableHead>
            <TableHead>Client</TableHead>
            <TableHead className="">Job Component</TableHead>
            <TableHead className="">% Invoiced</TableHead>
            <TableHead className="">Est. $</TableHead>
            <TableHead className="">Type</TableHead>
            <TableHead className="">Status</TableHead>
            <TableHead className="">Start</TableHead>
            <TableHead className="">Deadline</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
          {list.map((item, index) => (
            <TableRow key={index}>
            <TableCell className="font-medium"><Checkbox/></TableCell>
            <TableCell>{item.projectname}</TableCell>
            <TableCell className=""></TableCell>
            <TableCell className="">
              <a href='/employee/graph/jobcomponent' className=' w-fit bg-red-700 rounded-sm p-1 text-white flex items-center gap-2'>Job Component<Eye size={15}/></a>
              </TableCell>
            <TableCell className="">{item.invoiced}</TableCell>
            <TableCell className=""></TableCell>
            <TableCell className=""></TableCell>
            <TableCell className="">{item.status}</TableCell>
            <TableCell className="">{formatDateTime(item.startdate)}</TableCell>
            <TableCell className="">{formatDateTime(item.deadlinedate)}</TableCell>
           
            </TableRow>
          ))}
            
        </TableBody>
        </Table>

        {list.length !== 0 && (
       <PaginitionComponent currentPage={currentpage} total={totalpage} onPageChange={handlePageChange}/>
       )}
    </div>
        
    </div>
  )
}
