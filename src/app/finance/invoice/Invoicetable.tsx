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
  const [dialog, setDialog] = useState(false)
  const [dialog2, setDialog2] = useState(false)
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
  const proccessRequest = async (id: string) => {
    setLoading(true)
    router.push('?state=true')
    try {
      const request = axios.post(`${process.env. NEXT_PUBLIC_API_URL}/invoice/approvedenieinvoice`,{
        invoiceid: id,
        status: proccessstatus // Approved or Denied only
     
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

   }

 
     
  } catch (error) {
      setLoading(false)

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
        <SelectContent>
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
            {/* <TableHead className="">Select</TableHead> */}
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
            {status === 'Pending' && (
            <TableHead className="">Action</TableHead>
            )}
            </TableRow>
        </TableHeader>
        <TableBody>
            {list.map((item, index) => (
                <TableRow key={index}>
                {/* <TableCell className="font-medium"><Checkbox/></TableCell> */}
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
                {status === 'Pending' && (
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
                )}
                
                
                {/* <TableCell className=" flex items-center gap-2">
                  <Dialog open={dialog} onOpenChange={setDialog}>
                      <DialogTrigger>
                        <button className=' p-2 rounded-sm bg-secondary'><Eye size={20}/></button>
                      </DialogTrigger>
                      <DialogContent className=' bg-white border-none w-[95%] md:w-full max-w-[600px]'>
                       <div id='invoice-container' className=" bg-white px-6 py-8 w-full  mx-auto">
                            <div className=' flex items-center justify-center gap-2 text-white w-full'>
                                <img src="/logo.webp" alt="" width={50} />
                                <div className=' flex flex-col text-zinc-950'>
                                    <h2 className=' text-lg font-bold uppercase tracking-widest'>Triaxial</h2>
                                    <h2 className=' text-sm font-bold uppercase'>Consulting</h2>
                                </div>
                            </div>
                        <hr className=" my-2"/>
                        <div className="flex justify-between mb-6">
                            <h1 className="text-lg font-bold">Invoice</h1>
                            <div className="text-gray-700">
                                <div>Date: 01/05/2023</div>
                                <div>Invoice #: INV12345</div>
                            </div>
                        </div>
                        <div className="mb-8">
                            <h2 className="text-lg font-bold mb-4">Bill To:</h2>
                            <div className="text-gray-700 mb-2">John Doe</div>
                            <div className="text-gray-700 mb-2">123 Main St.</div>
                            <div className="text-gray-700 mb-2">Anytown, USA 12345</div>
                            <div className="text-gray-700">johndoe@example.com</div>
                        </div>
                        <table className="w-full mb-8">
                            <thead>
                                <tr>
                                    <th className="text-left font-bold text-gray-700">Description</th>
                                    <th className="text-right font-bold text-gray-700">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="text-left text-gray-700">Product 1</td>
                                    <td className="text-right text-gray-700">$100.00</td>
                                </tr>
                                <tr>
                                    <td className="text-left text-gray-700">Product 2</td>
                                    <td className="text-right text-gray-700">$50.00</td>
                                </tr>
                                <tr>
                                    <td className="text-left text-gray-700">Product 3</td>
                                    <td className="text-right text-gray-700">$75.00</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td className="text-left font-bold text-gray-700">Total</td>
                                    <td className="text-right font-bold text-gray-700">$225.00</td>
                                </tr>
                            </tfoot>
                        </table>
                        <div className="text-gray-700 mb-2">Thank you for your business!</div>
                        <div className="text-gray-700 text-sm">Please remit payment within 30 days.</div>
                        <hr className="my-2"/>
                        
                        </div>
    
                        <div className=' flex items-center justify-end gap-2 px-4 pb-4'>
                            <button onClick={printInvoice} className=' text-xs flex items-center gap-2 bg-primary p-2 text-zinc-100 rounded-sm'><Printer size={20}/>Print Invoice</button>
                            <button onClick={downloadInvoiceAsPdf} className=' text-xs flex items-center gap-2 bg-purple-600 p-2 text-zinc-100 rounded-sm'><FileDown size={20}/>Download Pdf</button>
                        </div>
                        
                      </DialogContent>
                  </Dialog>
    
                 <Dialog open={dialog2} onOpenChange={setDialog2}>
                      <DialogTrigger>
                        <button className=' bg-secondary p-2 rounded-sm flex items-center gap-1'><FilePenLine size={20}/></button>
                      </DialogTrigger>
                      <DialogContent className=' bg-white border-none w-[95%] md:w-full max-w-[600px]'>
                        <div className="bg-white px-6 py-8 w-full  mx-auto">
                            <div className=' flex items-center justify-center gap-2 text-white w-full'>
                                <img src="/logo.webp" alt="" width={50} />
                                <div className=' flex flex-col text-zinc-950'>
                                    <h2 className=' text-lg font-bold uppercase tracking-widest'>Triaxial</h2>
                                    <h2 className=' text-sm font-bold uppercase'>Consulting</h2>
                                </div>
                            </div>
                        <hr className=" my-2"/>
                        <div className="flex justify-between mb-6">
                            <h1 className="text-lg font-bold">Invoice</h1>
                            <div className="text-gray-700">
                                <div>Date: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                                <div>Invoice #: INV12345</div>
                            </div>
                        </div>
                        <div className="mb-8">
                            <h2 className="text-lg font-bold mb-4">Bill To:</h2>
                            <div className=' flex flex-col gap-2'>
                              <Input placeholder='Name' type=' text'/>
                              <Input placeholder='Address' type=' text'/>
                              <Input placeholder='Email' type='email'/>
                            </div>
                            
                        </div>
                        <table className="w-full mb-8">
                            <thead>
                                <tr>
                                    <th className="text-left font-bold text-gray-700">Description</th>
                                    <th className="text-right font-bold text-gray-700">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="text-left text-gray-700">
                                      <Input type='text' placeholder='Description'/>
                                    </td>
                                    <td className="text-right text-gray-700">
                                      <Input type='number' placeholder='Amount'/>
                                    </td>
                                </tr>
                                
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td className="text-left font-bold text-gray-700">Total</td>
                                    <td className="text-right font-bold text-gray-700">$ 00.00</td>
                                </tr>
                            </tfoot>
                        </table>
                        <div className="text-gray-700 mb-2">Thank you for your business!</div>
                        <div className="text-gray-700 text-sm">Please remit payment within 30 days.</div>
                        <hr className="my-2"/>
                        
                        <div className=' flex items-center justify-end gap-2 mt-4'>
                            <ButtonSecondary onClick={() => setDialog2(false)}  name={'Close'}/>
                            <Button onClick={() => setDialog2(false)} name={'Save Changes'}/>
                        </div>
                        </div>
                        
                      </DialogContent>
                  </Dialog>
                </TableCell> */}
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
