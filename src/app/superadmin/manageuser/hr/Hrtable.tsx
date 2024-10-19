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
import { Plus, Delete, Trash, Eye, CircleAlert, ArrowUp, ArrowDown } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ProjectsSection, Teams } from '@/types/data'
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { useRouter, useSearchParams } from 'next/navigation'
import Spinner from '@/components/common/Spinner'
import PaginitionComponent from '@/components/common/Pagination'
import Viewbtn from '@/components/common/Viewbtn'

type Hr = {
  employeeid:  string
  name: string
  teamname:  string
  initial:  string
  status:  string
  auth: string 
  reportingto:  string
  email: string
  dateCreated: string
}

type Row = { id: string; name: string };



export default function Hrtable() {
  const [dialog, setDialog] = useState(false)
  const [dialog2, setDialog2] = useState(false)
  const [dialog3, setDialog3] = useState(false)
  const [loading, setLoading] = useState(false)
  const search = useSearchParams()
  const active = search.get('active')
  const state = search.get('state')
  const router = useRouter()
  const [totalpage, setTotalpage] = useState(0)
  const [currentpage, setCurrentpage] = useState(0)

  //hr list
  const [hr, setHr] = useState<Hr[]>([])
  const [searchhr, setSearchhr] = useState('')
  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      const getList = async () => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/employeelist?positionfilter=hr&page=${currentpage}&limit=10&fullnamefilter=${searchhr}`,{
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
            }
        })
  
        console.log('Managers',response.data)
        setHr(response.data.data.employeelist)
        setTotalpage(response.data.data.totalpages)
        setLoading(false)
  
        if(searchhr !== ''){
          setCurrentpage(0)
        }
  
      }
      getList()
    }, 500)
    return () => clearTimeout(timer)
   
    
  },[state, currentpage, searchhr])

  //demote hr
  const promote = async () => {
      setLoading(true)
      const selectedIds = selectedRows.map((row) => row.id);
      router.push('?state=true')
      if(selectedIds.length === 0){
        toast.error(`Please select an hr to demote`)
        setLoading(false)
      }else{
        try {
          const request = axios.post(`${process.env. NEXT_PUBLIC_API_URL}/users/changepositionemployee`,{
              userids: selectedIds, // employee ids
              position: 'employee' // if promote choose those three (manager, hr, finance)    if demote always go to employee
          },
              {
                  withCredentials: true,
                  headers: {
                  'Content-Type': 'application/json'
                  }
              }
          )
      
       const response = await toast.promise(request, {
        loading: 'Demoting hr....',
        success: `Hr successfully demoted to employee`,
        error: 'Error while demoting hr',
       });
      
       if(response.data.message === 'success'){
        router.push('?state=false')
        setSelectedRows([])
        setDialog2(false)
        setLoading(false)
  
       }
      
       console.log(response)
      
      
         
        } catch (error) {
            setLoading(false)
        
            if (axios.isAxiosError(error)) {
                    const axiosError = error as AxiosError<{ message: string, data: string }>;
                    if (axiosError.response && axiosError.response.status === 401) {
                        toast.error(`${axiosError.response.data.data}`)     
                    }
        
                    if (axiosError.response && axiosError.response.status === 400) {
                        toast.error(`${axiosError.response.data.data}`)     
                          
                    }
        
                    if (axiosError.response && axiosError.response.status === 402) {
                        toast.error(`${axiosError.response.data.data}`)          
                              
                    }
        
                    if (axiosError.response && axiosError.response.status === 403) {
                        toast.error(`${axiosError.response.data.data}`)              
                      
                    }
        
                    if (axiosError.response && axiosError.response.status === 404) {
                        toast.error(`${axiosError.response.data.data}`)             
                    }
            } 
          
        }
      }
     
  }
  
  
  //select row
  const [selectedRows, setSelectedRows] = useState<Row[]>([]);
  const handleSelectRow = (id: string, name: string) => {
      setSelectedRows((prevSelectedRows) => {
        // Check if the row is already selected by its id
        const isSelected = prevSelectedRows.some((row) => row.id === id);
  
        if (isSelected) {
          // Remove the row object from the array if it is already selected (deselect)
          return prevSelectedRows.filter((row) => row.id !== id);
        } else {
          // Add the new row object to the array (select)
          return [...prevSelectedRows, { id, name }];
        }
      });
  };
  
  console.log('Rows',selectedRows)

  //paginition
  const handlePageChange = (page: number) => {
  setCurrentpage(page)
  }

  //slice team
  const slice = (data: string) => {
    const splitData = data.split(',')
    const array = splitData.slice(1,10)
    return array
  }

  //ban
  const banEmployee = async () => {
    setLoading(true)
    router.push('?state=true')
    const selectedIds = selectedRows.map((row) => row.id);

    if(selectedIds.length === 0){
      toast.error(`Please select an hr to proceed`)  
      setLoading(false)

    } else{
      try {
        const request = axios.post(`${process.env. NEXT_PUBLIC_API_URL}/users/banemployees`,{
          employeeid: selectedIds
        },
            {
                withCredentials: true,
                headers: {
                'Content-Type': 'application/json'
                }
            }
        )
  
    const response = await toast.promise(request, {
        loading: 'Banning employee....',
        success: `Banned successfully`,
        error: 'Error while banning employee',
    });
  
    if(response.data.message === 'success'){
      
      setDialog3(false)
      setSelectedRows([])
      router.push('?state=false')
      setLoading(false)
    }
  
    console.log(response)
  
  
      
      } catch (error) {
        setLoading(false)
          if (axios.isAxiosError(error)) {
                  const axiosError = error as AxiosError<{ message: string, data: string }>;
                  if (axiosError.response && axiosError.response.status === 401) {
                      toast.error(`${axiosError.response.data.data}`)     
                  }
    
                  if (axiosError.response && axiosError.response.status === 400) {
                      toast.error(`${axiosError.response.data.data}`)     
                        
                  }
    
                  if (axiosError.response && axiosError.response.status === 402) {
                      toast.error(`${axiosError.response.data.data}`)          
                            
                  }
    
                  if (axiosError.response && axiosError.response.status === 403) {
                      toast.error(`${axiosError.response.data.data}`)              
                    
                  }
    
                  if (axiosError.response && axiosError.response.status === 404) {
                      toast.error(`${axiosError.response.data.data}`)             
                  }
          } 
        
      }
    }
  
  }

  

  return (
    <div className=' w-full h-full flex justify-center bg-secondary p-6 text-zinc-100'>

      <div className=' w-full flex flex-col max-w-[1520px]'>
        <div className=' flex md:flex-row flex-col items-center justify-between gap-4'>
            <div className=' flex  items-center gap-4'>
            <Dialog open={dialog2} onOpenChange={setDialog2}>
                <DialogTrigger>
                  <button className=' bg-red-700 px-6 py-2 rounded-sm flex items-center gap-1 text-xs'><ArrowDown size={15}/>Demote</button>
                </DialogTrigger>
                <DialogContent className=' bg-secondary border-none text-zinc-100 grid grid-cols-1 lg:grid-cols-[250px,1fr]'>
                  <div className=' bg-blue-400 lg:block hidden'
                  style={{backgroundImage: `url('/bg2.png')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat:"no-repeat"}}
                  
                  >
                    <p className=' p-2 uppercase text-sm font-semibold mt-8 bg-gradient-to-r from-zinc-950 to-zinc-950/10'>Demote</p>
                  </div>

                  <div className=' flex flex-col gap-2 p-4'>
                    <DialogHeader>
                    <DialogDescription>
                      Are you sure you want to demote the selected hr?
                    </DialogDescription>
                    </DialogHeader>
                  <form action="" className=' flex flex-col gap-4 '>
                    <h2 className=' uppercase font-semibold text-xs'>Selected Hr</h2>
                    <div className=' w-full flex flex-col gap-4'>
                      {selectedRows.map((item, index) => (
                        <p key={index} className=' text-sm font-semibold'><span className=' text-zinc-500'>Name:</span> {item.name}</p>
                      ))}

              
                    </div>

                    <label htmlFor="" className=' mt-4 text-xs'>Demote to</label>
                    <Input placeholder='Employee' value={'Employee'} type='text' className=' bg-primary text-xs h-[35px]'/>
                    
                    {/* <div className=' grid grid-cols-2 gap-4'>
                      <div className=' flex flex-col gap-1'>
                        <label htmlFor="" className=' mt-4 text-xs'>Employee Name</label>
                        <Input placeholder='Employe Name' type='text' className=' bg-primary text-xs h-[35px]'/>

                        <label htmlFor="" className=' mt-4 text-xs'>Current Position</label>
                        <Input placeholder='Current position' type='text' className=' bg-primary text-xs h-[35px]'/>

                        <label htmlFor="" className=' mt-4 text-xs'>Promote to</label>
                        <Select>
                          <SelectTrigger className="w-full text-xs bg-primary">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent className=' text-xs'>
                           
                            <SelectItem value={'manager'}>Manager</SelectItem>
                            <SelectItem value={'hr'}>Hr</SelectItem>
                            <SelectItem value={'finance'}>Finance</SelectItem>

                           
                          </SelectContent>
                        </Select>

                       

                        
                      </div>

                      <div className=' flex flex-col bg-primary rounded-sm p-2'>
                       <p className=' text-xs text-zinc-400'>Email:</p>
                       <p className=' text-xs text-zinc-400'>Contact:</p>
                       <p className=' text-xs text-zinc-400'>Initial:</p>
                       <p className=' text-xs text-zinc-400'>Position:</p>

                      
                      </div>
                    </div> */}
                      

                  </form>
                  
                    <div className=' w-full flex items-end justify-end gap-2 mt-8'>
                      <button disabled={loading} onClick={promote} className=' btn-red flex items-center justify-center gap-2'>
                        {loading === true && (
                          <div className=' spinner2'></div>
                        )}
                        Demote</button>
                    </div>

                  </div>
                  
                </DialogContent>
            </Dialog>

            <Dialog open={dialog3} onOpenChange={setDialog3}>
                <DialogTrigger>
                  <button className=' bg-primary px-8 py-2 rounded-sm text-xs flex items-center gap-1 text-red-700'><CircleAlert size={15}/>Ban</button>
                  
                </DialogTrigger>
                <DialogContent className=' bg-secondary border-none text-zinc-100 grid grid-cols-1 lg:grid-cols-[250px,1fr]'>
                  <div className=' bg-blue-400 lg:block hidden'
                  style={{backgroundImage: `url('/bg2.png')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat:"no-repeat"}}
                  
                  >
                    <p className=' p-2 uppercase text-sm font-semibold mt-8 bg-gradient-to-r from-zinc-950 to-zinc-950/10'>Ban</p>
                  </div>

                  <div className=' flex flex-col gap-2 p-4'>
                    <DialogHeader>
                    <DialogDescription>
                      Are you sure you want to ban the selected hr?
                    </DialogDescription>
                    </DialogHeader>
                  <form action="" className=' flex flex-col gap-4 '>
                    <h2 className=' uppercase font-semibold text-xs'>Selected Hr</h2>
                    <div className=' w-full flex flex-col gap-4'>
                      {selectedRows.map((item, index) => (
                        <p key={index} className=' text-sm font-semibold'><span className=' text-zinc-500'>Name:</span> {item.name}</p>
                      ))}

              
                    </div>
                  
                
                  </form>
                  
                    <div className=' w-full flex items-end justify-end gap-2 mt-8'>
                      <button disabled={loading} onClick={banEmployee} className=' btn-red flex items-center justify-center gap-2'>
                        {loading === true && (
                          <div className=' spinner2'></div>
                        )}
                        Ban</button>
                    </div>

                  </div>
                  
                </DialogContent>
            </Dialog>

            
            </div>

            {/* <div className=' flex items-center gap-4'>
                <Input value={searchhr} onChange={(e) => setSearchhr(e.target.value)} type='text' className=' bg-primary h-[35px] text-zinc-100'/>
                <button className=' bg-red-700 px-8 py-2 rounded-sm text-xs'>Search</button>
            </div> */}

            <div className=' flex flex-col gap-1'>
                <label htmlFor="" className=' text-xs'>Search</label>
                <Input value={searchhr} placeholder='Search hr name (clear the input to reset)' onChange={(e) => setSearchhr(e.target.value)} type='text' className=' w-[300px] bg-primary text-zinc-100 text-xs h-[35px]'/>
               
            </div>
            
        </div>

      
          
        <Table className=' mt-4'>
        {hr.length === 0 &&  
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
            <TableHead>Employee Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Team</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Initial</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Reporting to</TableHead>
            <TableHead >Date Created</TableHead>
            <TableHead >Status</TableHead>
            <TableHead >Individual Workload</TableHead>
            <TableHead >Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
        {hr.map((item, index) => (
             <TableRow key={index}>
             <TableCell className="font-medium">
             <input 
                checked={selectedRows.some((row) => row.id === `${item.employeeid}`)}
                onChange={() => handleSelectRow(`${item.employeeid}`, `${item.name}`)} 
                type="checkbox" />
             </TableCell>
             <TableCell className="font-medium">{item.employeeid}</TableCell>
             <TableCell className="font-medium">{item.name}</TableCell>
             <TableCell className="font-medium flex flex-wrap w-[150px] overflow-hidden">
              <Dialog>
                <DialogTrigger><button className=' bg-red-700 text-xs p-2 rounded-sm text-white flex items-center gap-2'><Eye size={15}/>View Team</button></DialogTrigger>
                <DialogContent className=' p-6 bg-secondary text-white border-none'>
                  <DialogHeader>
                    <DialogTitle className=' text-red-700'>Team</DialogTitle>
                    <DialogDescription>
                      
                    </DialogDescription>
                  </DialogHeader>

                   <Table className=''>
                    {slice(item.teamname).length === 0 && (
                    <TableCaption>No team</TableCaption>

                    )}
                    <TableHeader>
                        <TableRow>
                        <TableHead>Name</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                     {slice(item.teamname).map((item,) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{item}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </DialogContent>
              </Dialog>
             </TableCell>
             
             <TableCell className="font-medium uppercase">{item.auth}</TableCell>
             <TableCell className="font-medium uppercase">{item.initial}</TableCell>
             <TableCell className="font-medium">{item.email}</TableCell>
             <TableCell className="font-medium">{item.reportingto}</TableCell>
             <TableCell className="">{new Date(item.dateCreated).toLocaleString()}</TableCell>
             <TableCell className={` uppercase font-medium ${item.status === 'active' ? 'text-green-400' : 'text-red-500'}`}>{item.status}</TableCell>
             <TableCell className="font-medium"><Viewbtn name={'View'} onClick={() => router.push(`/superadmin/individualworkload?employeeid=${item.employeeid}`)} disabled={false}/></TableCell>
             <TableCell className="font-medium">action</TableCell>
            
            
 
             </TableRow>
            ))}
        </TableBody>
        </Table>
     

       {hr.length !== 0 && (
        <PaginitionComponent currentPage={currentpage} total={totalpage} onPageChange={handlePageChange}/>
       )}

        


      </div>
        
    </div>
  )
}
