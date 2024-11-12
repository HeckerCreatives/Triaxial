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
import {  Eye, FileDown, ReceiptText, FilePlus2, FileCheck, Search, Copy, Layers, TriangleAlert, Pen } from 'lucide-react'
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
import Createprojectform from '@/components/forms/Createprojectform'
import Editprojectform from '@/components/forms/Editprojectform'
import Variationprojectform from '@/components/forms/Variationprojectform'
import axios from 'axios'
import { formatDateTime } from '@/utils/functions'
import PaginitionComponent from '@/components/common/Pagination'
import Spinner from '@/components/common/Spinner'
import { useSearchParams } from 'next/navigation'
import Projectstatusform from '@/components/forms/Projectstatusform'


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
client: string
_id: string
jobno: string
}

export default function Projecttable() {
  const [dialog, setDialog] = useState(false)
  const [dialog2, setDialog2] = useState(false)
  const [dialog6, setDialog6] = useState(false)
  const [loading, setLoading] = useState(false)

  const [list, setList] = useState<Project[]>([])
  const [totalpage, setTotalpage] = useState(0)
  const [currentpage, setCurrentpage] = useState(0)
  const [search, setSearch] = useState('')
  const params = useSearchParams()
  const refresh = params.get('state')
  const id = params.get('projectid')

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      const getList = async () => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/projects/listprojects?searchproject=${search}&page=${currentpage}&limit=10`,{
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
            }
        })
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
    setList(response.data.data.projectlist)
    setTotalpage(response.data.data.totalpages)
    setLoading(false)
 
  }

   //paginition
   const handlePageChange = (page: number) => {
    setCurrentpage(page)
  }

  const statusColor = (data: string) => {
    if(data === 'On-going'){
      return 'text-blue-500'
    } else if(data === 'Complete'){
      return 'text-green-500'
    } else{
      return 'text-red-500'
    }
  }

  return (
   <div className=' w-full h-full flex justify-center bg-secondary p-6 text-zinc-100'>

    <div className=' w-full flex flex-col max-w-[1520px]'>

      <div className=' w-full flex items-center justify-between'>
        <div className=' flex items-center gap-2'>

          <Createprojectform onClick={() => undefined}>
            <button className=' bg-red-700 p-2 rounded-sm text-zinc-100'><FilePlus2 size={15}/></button>
          </Createprojectform>

        </div>

          <div className=' flex flex-col gap-1'>
            <label htmlFor="" className=' text-xs'>Search</label>
            <Input value={search} placeholder='Search client name (clear the input to reset)' onChange={(e) => setSearch(e.target.value)} type='text' className=' w-[300px] bg-primary text-zinc-100 text-xs h-[35px]'/>
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
            <TableHead>Job no</TableHead>
            <TableHead>Project Name</TableHead>
            <TableHead>Client</TableHead>
            <TableHead className="">Job Component</TableHead>
            <TableHead className="">% Invoiced</TableHead>
            <TableHead className="">Est. $</TableHead>
            <TableHead className="">Status</TableHead>
            <TableHead className="">Start</TableHead>
            <TableHead className="">Deadline</TableHead>
            <TableHead className="">Action</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
          {list.map((item, index) => (
            <TableRow key={index}>
            <TableCell className="font-medium"><Checkbox/></TableCell>
            <TableCell>{item.jobno}</TableCell>
            <TableCell>{item.projectname}</TableCell>
            <TableCell>{item.client}</TableCell>
            <TableCell className="">
              <a href={`/pm/graph/jobcomponent?projectid=${item._id}`} className=' w-fit bg-red-700 rounded-sm p-1 text-white flex items-center gap-2'>Job Component<Eye size={15}/></a>
              </TableCell>
            <TableCell className="">{item.invoiced}</TableCell>
            <TableCell className=""></TableCell>
            <TableCell className={`${statusColor(item.status)}`}>{item.status}</TableCell>
            <TableCell className="">{formatDateTime(item.startdate)}</TableCell>
            <TableCell className="">{formatDateTime(item.deadlinedate)}</TableCell>
            <TableCell className=" flex items-center gap-2">


              <Editprojectform projectid={item._id} team={item.teamname} projectname={item.projectname} startdate={item.startdate} deadlinedate={item.deadlinedate} client={item.client} jobno={item.jobno} >
                <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger><button className=' p-2 bg-secondary rounded-md'><Pen size={15}/></button></TooltipTrigger>
                      <TooltipContent>
                        <p className=' text-xs'>Edit Project</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
              </Editprojectform>

              {/* <Variationprojectform onClick={() => undefined}>
                <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger><button className=' p-2 bg-secondary rounded-md'><Layers size={15}/></button></TooltipTrigger>
                      <TooltipContent>
                        <p className=' text-xs'>Create Project Variation</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
              </Variationprojectform>

              <Dialog open={dialog2} onOpenChange={setDialog2}>
                    <DialogTrigger>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger><button className=' p-2 bg-secondary rounded-md'><ReceiptText size={15}/></button></TooltipTrigger>
                          <TooltipContent>
                            <p className=' text-xs'>Invoice</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </DialogTrigger>
                    <DialogContent className=' bg-white border-none w-[95%] md:w-full max-w-[600px] overflow-hidden'>
                    <div id='invoice-container' className=" bg-white px-6 py-8 h-full w-full  mx-auto">
                          <div className=' flex items-center justify-center gap-2 text-white w-full'>
                              <img src="/logo.webp" alt="" width={50} />
                              <div className=' flex flex-col text-zinc-950'>
                                  <h2 className=' text-lg font-bold uppercase tracking-widest'>Triaxial</h2>
                                  <h2 className=' text-sm font-bold uppercase'>Consulting</h2>
                              </div>
                          </div>
                      <hr className=" my-2"/>
                      <div className="flex justify-between mb-4">
                          <h1 className="text-lg font-bold">Invoice</h1>
                          <div className="text-gray-700">
                              <div>Date: 01/05/2023</div>
                              <div>Invoice #: INV12345</div>
                          </div>
                      </div>
                      <div className="mb-4">
                          <h2 className="text-lg font-bold mb-4">To:</h2>
                          <div className="text-gray-700 mb-2">John Doe</div>
                          <div className="text-gray-700 mb-2">123 Main St.</div>
                          <div className="text-gray-700 mb-2">Project Name - TX293847</div>
                          <div className="text-gray-700 mb-2">Admin Notes : Lorem ipsum</div>
                      </div>
                      <table className="w-full mb-4">
                          <thead>
                              <tr>
                                  <th className="text-left font-bold text-gray-700">Job Component Budget</th>
                                  <th className="text-left font-bold text-gray-700">Curr. Invoice</th>
                                  <th className="text-right font-bold text-gray-700">New Invoice</th>
                              </tr>
                          </thead>
                          <tbody>
                              <tr>
                                  <td className="text-left text-gray-700">
                                  <Input placeholder='Amount' className=' bg-zinc-200'/>
                                  </td>

                                  <td className="text-left text-gray-700">
                                  <Input placeholder='Amount' className=' bg-zinc-200'/>
                                  </td>

                                  <td className=" relative text-left text-gray-700">
                                  <Input placeholder='Amount' className=' bg-zinc-200'/>
                                  <p className=' absolute top-2 right-4'>%</p>
                                  </td>
                              </tr>
                            
                          </tbody>
                         
                      </table>

                      <button className=' p-2 text-xs text-zinc-100 bg-purple-600 rounded-sm'>Calculate</button>

                    
                      <hr className="my-2"/>

                      <label htmlFor="">This invoice amount</label>
                    < Input placeholder=' Amount' className=' bg-zinc-200'/>

                      <label htmlFor="" className=' mt-8'>Please insert an instruction or comments for the invoice</label>
                      <Textarea placeholder=' Please input here' className=' bg-zinc-200'/>
                      
                    </div>

                    

                      <div className=' flex items-center justify-end gap-2 px-4 pb-4'>
                          <button className=' text-xs flex items-center gap-2 bg-purple-600 p-2 text-zinc-100 rounded-sm'><FileDown size={20}/>Record</button>
                      </div>
                      
                    </DialogContent>
              </Dialog> */}

              <Projectstatusform deadlinedate={item.deadlinedate} invoiced={item.invoiced} managerName={item.managerName} projectname={item.projectname} startdate={item.startdate} status={item.status} teamname={item.teamname} client={item.client} _id={item._id} jobno={item.jobno}/>

              
            </TableCell>
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
