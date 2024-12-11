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
import axios, { AxiosError } from 'axios'
import { financeInvoice } from '@/types/types'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import Spinner from '@/components/common/Spinner'
import PaginitionComponent from '@/components/common/Pagination'
import { useRouter, useSearchParams } from 'next/navigation'
import toast from 'react-hot-toast'
import { RotateCw } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { statusColor } from '@/utils/functions'
  

export default function Invoicetable() {
  const [list, setList] = useState<financeInvoice[]>([])
  const [status, setStatus] = useState('Pending')
  const [proccessstatus, setProccessStatus] = useState('Approved')
  const [loading, setLoading] = useState(false)
  const [totalpage, setTotalpage] = useState(0)
  const [currentpage, setCurrentpage] = useState(0)
  const router = useRouter()
  const params = useSearchParams()
  const refresh = params.get('state')
  const [jobno, setJobno] = useState('')
  const [notes, setNotes] = useState('')
  const [modal, setModal] = useState(false)

  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleSelect = (invoiceId: string) => {
    setSelectedItems((prev) =>
      prev.includes(invoiceId)
        ? prev.filter((id) => id !== invoiceId)
        : [...prev, invoiceId]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === list.length) {
      setSelectedItems([]); // Deselect all if everything is selected
    } else {
      setSelectedItems(list.map((item) => item.invoiceid)); // Select all
    }
  };


  useEffect(() => {
    setLoading(true)
    const getInvoice = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/invoice/getinvoicelist?jobnofilter=${jobno}&status=${status}&page=${currentpage}&limit=10`,{
                withCredentials: true
            })

            setList(response.data.data.data)
            setLoading(false)
            setTotalpage(response.data.data.totalpage)

        } catch (error) {
            
        }
    }
    getInvoice()
  },[status, refresh, currentpage, jobno])

   //paginition
   const handlePageChange = (page: number) => {
    setCurrentpage(page)
  }

  //proccess
  const proccessRequest = async () => {
    setLoading(true)
    router.push('?state=true')

    const requestBody = selectedItems.map((invoiceid) => ({
        invoiceid,
        status: proccessstatus, // Approved or Denied only
        notes,
      }));


    try {
      const request = axios.post(`${process.env. NEXT_PUBLIC_API_URL}/invoice/approvedenieinvoice`,{
        invoices: requestBody
     
      },
          {
              withCredentials: true,
              headers: {
              'Content-Type': 'application/json'
              }
          }
      )

    const response = await toast.promise(request, {
        loading: 'Proccessing invoice request....',
        success: `Successfully proccessed`,
        error: 'Error while proccessing invoice request',
    });

   if(response.data.message === 'success'){
     router.push('?state=false')
     setLoading(false)
     setModal(false)

   }

 
     
  } catch (error) {
      setLoading(false)
     setModal(false)
       if (axios.isAxiosError(error)) {
              const axiosError = error as AxiosError<{ message: string, data: string }>;
              if (axiosError.response && axiosError.response.status === 401) {
                  toast.error(`${axiosError.response.data.data}`) 
                  router.push('/')    
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
  };

  console.log(selectedItems)

  return (
   <div className=' w-full h-full flex justify-center bg-secondary p-6 text-zinc-100'>

    <div className=' w-full flex flex-col max-w-[1520px]'>
      <div className=' flex md:flex-row flex-col items-center justify-between gap-4'>

        <div className=' flex items-center gap-2'>
        <label htmlFor="" className=' text-xs text-zinc-400'>Filter by status</label>
        <Select value={status} onValueChange={setStatus}>
        <SelectTrigger className="w-[180px] bg-primary mt-2">
            <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent className=' text-xs'>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Approved">Approved</SelectItem>
            <SelectItem value="Denied">Denied</SelectItem>
        </SelectContent>
        </Select>
        </div>

        
        <div className=' flex flex-col gap-1'>
                <label htmlFor="" className=' text-xs'>Search</label>
                <Input value={jobno} placeholder='Search job no (clear the input to reset)' onChange={(e) => setJobno(e.target.value)} type='text' className=' w-[300px] bg-primary text-zinc-100 text-xs h-[35px]'/>
            </div>
            
        </div>

        { status === 'Pending' && (
            <>
            {selectedItems.length === 0 ? (
            <button onClick={() => toast.error('Please select a invoice request below')} className=' bg-red-600 p-2 text-xs rounded-sm text-white flex items-center gap-2 w-fit mt-4'><RotateCw size={15}/>Proccess</button>
            ):(
                <Dialog open={modal} onOpenChange={setModal}>
                        <DialogTrigger className=' mt-4'>
                            <button className=' bg-red-600 p-2 text-xs rounded-sm text-white flex items-center gap-2'><RotateCw size={15}/>Proccess</button>
                        </DialogTrigger>
                        <DialogContent className=' p-6 bg-secondary border-none text-white'>
                            <DialogHeader>
                            <DialogTitle>Proccess Invoice Request</DialogTitle>
                            <DialogDescription>
                                Update Invoice Request status to Approved / Denied
                            </DialogDescription>
                            </DialogHeader>

                            <label htmlFor="" className=' text-xs text-zinc-400'>Select Status</label>
                            <Select value={proccessstatus} onValueChange={setProccessStatus}>
                            <SelectTrigger className="w-[180px] bg-primary ">
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Approved">Approved</SelectItem>
                                <SelectItem value="Denied">Denied</SelectItem>
                            </SelectContent>
                            </Select>

                            <label htmlFor="" className=' text-xs'>Notes</label>
                            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} name="" id="" placeholder=' Notes' className=' p-2 bg-primary rounded-md focus:ring-1 focus:ring-red-500 focus:outline-none text-xs h-[100px]'></textarea>

                            <div className=' w-full flex items-end justify-end'>
                                <button onClick={() => proccessRequest()}  className='bg-red-600 p-2 text-xs rounded-sm text-white flex items-center gap-2'>Proccess</button>
                            </div>
                        </DialogContent>
            </Dialog>
            )}
            </>
        )}

        

        

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
            {status === 'Pending' && (
                <TableHead className="">Select</TableHead>
            )}
            <TableHead className="">Invoice Id</TableHead>
            <TableHead>Job no</TableHead>
            <TableHead>Job Component Name</TableHead>
            <TableHead>Manager Name</TableHead>
            <TableHead className="">Budget</TableHead>
            <TableHead className="">Budget Type</TableHead>
            <TableHead className="">Curr. In.</TableHead>
            <TableHead className="">New In.</TableHead>
            <TableHead className="">In. Amount</TableHead>
            <TableHead className="">Status</TableHead>
            {/* {status === 'Pending' && (
            <TableHead className="">Action</TableHead>
            )} */}
            </TableRow>
        </TableHeader>
        <TableBody>
            {list.map((item, index) => (
                <TableRow key={index}>
                {status === 'Pending' && (
                    <TableCell className="font-medium">
                        <input 
                        type="checkbox"
                        checked={selectedItems.includes(item.invoiceid)}
                        onChange={() => handleSelect(item.invoiceid)}
                        />
                    </TableCell> 
                )}
               
                <TableCell className="font-medium">{item.invoiceid}</TableCell>
                <TableCell className="font-medium">{item.jobcomponent.jobno}</TableCell>
                <TableCell className="font-medium">{item.jobcomponent.name}</TableCell>
                <TableCell className="font-medium">{item.jobcomponent.jobmanager}</TableCell>
                <TableCell className="font-medium">{item.jobcomponent.budget}</TableCell>
                <TableCell className="font-medium">{item.jobcomponent.budgettype}</TableCell>
                <TableCell className="font-medium">{item.currentinvoice}</TableCell>
                <TableCell className="font-medium">{item.newinvoice}</TableCell>
                <TableCell className="font-medium">{item.invoiceamount}</TableCell>
                <TableCell className={` ${statusColor(item.status)} text-xs`}>{item.status}</TableCell>
                {/* {status === 'Pending' && (
                <TableCell className="font-medium">
                    <Dialog>
                    <DialogTrigger>
                        <button className=' bg-red-600 p-2 text-xs rounded-sm text-white flex items-center gap-2'><RotateCw size={15}/>Proccess</button>
                    </DialogTrigger>
                    <DialogContent className=' p-6 bg-secondary border-none text-white'>
                        <DialogHeader>
                        <DialogTitle>Proccess Invoice Request <span className=' text-xs text-red-500'>({item.invoiceid})</span></DialogTitle>
                        <DialogDescription>
                            Update Invoice Request status to Approved / Denied
                        </DialogDescription>
                        </DialogHeader>

                        <label htmlFor="" className=' text-xs text-zinc-400'>Select Status</label>
                        <Select value={proccessstatus} onValueChange={setProccessStatus}>
                        <SelectTrigger className="w-[180px] bg-primary ">
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Approved">Approved</SelectItem>
                            <SelectItem value="Denied">Denied</SelectItem>
                        </SelectContent>
                        </Select>

                        <div className=' w-full flex items-end justify-end'>
                            <button onClick={() => proccessRequest(item.invoiceid)} className='bg-red-600 p-2 text-xs rounded-sm text-white flex items-center gap-2'>Proccess</button>
                        </div>
                    </DialogContent>
                    </Dialog>

                </TableCell>
                )} */}
                
                
               
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
