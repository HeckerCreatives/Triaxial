import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { FileDown, Printer } from 'lucide-react'
import { downloadInvoiceAsPdf, printInvoice } from '@/utils/invoice'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
  

type Props = {
    children: React.ReactNode
    projectname: any
    jobcname: any
    jobno: any
    budgettype: any
    estimatedbudget: any
    jobcid: any
    isJobmanager: any
    currinvoice: any
    manager: string
    client: string
    notes: string
}

export default function Invoice( prop: Props) {
    const currentDate = new Date()
    const [currInvoice, setCurrInvoice] = useState(0)
    const [newInvoice, setNewInvoice] = useState(0)
    const [amount, setAmount] = useState('')
    const [notes, setNotes] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const path = usePathname()
    const [dialog, setDialog] = useState(false)
    const dynamicCreateInvoiceApiUrl = path.includes('/pm') ? '/invoice/createinvoicemanager' : '/invoice/createinvoicemployee'
    const dynamicCurrInApiUrl = path.includes('/pm') ? '/invoice/getinvoicedatamanager' : '/invoice/getinvoicedataemployee'
    const params = useSearchParams()
    const id = params.get('jobcid')
    const [hasFetched, setHasFetched] = useState(false);

    const lumpsumCalculation = ((newInvoice / 100 ) * prop.estimatedbudget) -  (currInvoice / 100) * prop.estimatedbudget
    // const lumpsumCalculation = ((newInvoice / 100 ) * prop.estimatedbudget)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.replace(/,/g, ""); // Remove existing commas
        if (!isNaN(Number(rawValue)) && rawValue !== "") {
            setAmount(Number(rawValue).toLocaleString()); // Format with commas
        } else {
            setAmount(""); // Clear input if invalid
        }
    };



    const ratesCalculation = prop.estimatedbudget * newInvoice

       useEffect(() => {
         const currIn = async () => {
             if(id !== null){
                 try {
                     const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}${dynamicCurrInApiUrl}?jobcomponentid=${id}`,{
                         withCredentials: true
                     })
    
                     setCurrInvoice(response.data.data.currinvoice)
                     setHasFetched(true)
                } catch (error) {
                    
                }
             }
          
         }
         currIn()
       },[id, hasFetched])

    const requestInvoice = async () => {
        setLoading(true)
       
            try {
                const request = axios.post(`${process.env.NEXT_PUBLIC_API_URL}${dynamicCreateInvoiceApiUrl}`,{
                    jobcomponentid: prop.jobcid,
                    // currentinvoice: currInvoice,
                    invoice: newInvoice,
                    invoiceamount: lumpsumCalculation,
                    comments: notes
                },{
                    withCredentials: true,
                    headers: {
                      'Content-Type': 'application/json'
                      }
    
                })

                const response = await toast.promise(request, {
                    loading: 'Requesting invoice ....',
                    success: `Successfully requested`,
                    error: 'Error while requesting invoice',
                });
            
               if(response.data.message === 'success'){
                 setLoading(false)
                 setDialog(false)
                 setNewInvoice(0)
                 window.location.reload()
            
               }
    
                
            } catch (error) {
            setLoading(false)
            setDialog(false)
             setNewInvoice(0)
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
       
      }


    const requestInvoiceRates = async () => {
        // if(amount as any > prop.estimatedbudget){
        //     toast.error(`Invoice amount should not exceed to the estimated budget.`)              

        // } else {
            try {
                const request = axios.post(`${process.env.NEXT_PUBLIC_API_URL}${dynamicCreateInvoiceApiUrl}`,{
                    jobcomponentid: prop.jobcid,
                    invoice: newInvoice,
                    invoiceamount: Number(amount.replace(/,/g, "")),
                    comments: notes
                },{
                    withCredentials: true,
                    headers: {
                      'Content-Type': 'application/json'
                      }
    
                })
    
                const response = await toast.promise(request, {
                    loading: 'Requesting invoice ....',
                    success: `Successfully requested`,
                    error: 'Error while requesting invoice',
                });
            
               if(response.data.message === 'success'){
                 setLoading(false)
                 setDialog(false)
                 setNewInvoice(0)
                 window.location.reload()
    
               }  
            } catch (error) {
            setLoading(false)
            setDialog(false)
            setNewInvoice(0)
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
        // }
        
    }


    useEffect(() => {
        if(prop){
            setCurrInvoice(prop.currinvoice)
        }
    },[prop])

    const formatBudgetType = (budgetType: string) => {
        return budgetType.toLowerCase() === "lumpsum" ? "Lump Sum" : 
               budgetType.toLowerCase() === "rates" ? "Rates" : budgetType;
      };

      useEffect(() => {
        setNewInvoice(prop.currinvoice)
      }, [prop])

  return (
    <Dialog open={dialog} onOpenChange={setDialog} >
                    <DialogTrigger>
                      {prop.children}
                    </DialogTrigger>
                    <DialogContent className=' text-sm bg-white border-none w-[95%] md:w-full max-w-[600px] overflow-hidden'>
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
                          <h1 className="text-sm font-bold">Invoice</h1>
                          <div className="text-gray-700">
                              <div>Date: {currentDate.toLocaleString()}</div>
                              {/* <div>Invoice #: {generateRandomTransactionID()}</div> */}
                          </div>
                      </div>
                      <div className="mb-4">
                          {/* <h2 className="text-lg font-bold mb-4">To:</h2>
                          <div className="text-gray-700 mb-2">John Doe</div>
                          <div className="text-gray-700 mb-2">123 Main St.</div> */}
                          <div className="text-gray-700 mb-1 text-xs">Job No. - {prop.jobno}</div>
                          <div className="text-gray-700 mb-1 text-xs">Client Name. - {prop.client}</div>
                          <div className="text-gray-700 mb-1 text-xs">Project Name - {prop.projectname}</div>
                          <div className="text-gray-700 mb-1 text-xs">Job Manager - {prop.manager}</div>
                          <div className="text-gray-700 mb-1 text-xs">Job Component - {prop.jobcname}</div>
                          <div className="text-gray-700 mb-1 text-xs flex items-center">Budget Type - <p className=' text-blue-600 font-semibold'>{formatBudgetType(prop.budgettype)}</p></div>
                          <div className="text-gray-700 mb-2 text-xs">Admin Notes : {prop.notes}</div>

                          

                      </div>
                      <table className="w-full mb-4">
                          <thead>
                              <tr className=' text-xs'>
                                {prop.budgettype === 'rates' ? (
                                  <th className="text-left font-bold text-gray-700">Invoiced to Date</th>

                                ): (
                                  <th className="text-left font-bold text-gray-700">Job Component Budget</th>
                                )}
                                  {prop.budgettype !== 'rates' && (
                                    <>
                                    <th className="text-left font-bold text-gray-700">$ Invoiced to Date</th>
                                    <th className="text-right font-bold text-gray-700">% New Invoice 

                                    {/* ({prop.budgettype === 'lumpsum' ?  '%' : 'hours'}) */}
                                    </th>
                                    </>
                                  )}
                                  
                              </tr>
                          </thead>
                          <tbody>
                              <tr>
                                  

                                  {prop.budgettype !== 'rates' ? (
                                    <>
                                    <td className="text-left text-gray-700">

                                    <div className="relative">
                                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 text-xs">$</span>
                                            <Input 
                                                type="text" 
                                                value={(prop.estimatedbudget as number).toLocaleString()} 
                                                placeholder="Amount" 
                                                className="bg-zinc-200 pl-6 text-xs"
                                            />  
                                        </div>
                                    </td>

                                    <td className="text-left text-gray-700">
                                    <Input defaultValue={prop.currinvoice}  value={currInvoice} placeholder='Amount' className=' bg-zinc-200 text-xs'/>
                                    </td>

                                    <td className="text-left text-gray-700">
                                    <Input max={100} type='number'  value={newInvoice} onChange={(e) => setNewInvoice(e.target.valueAsNumber)} placeholder='Amount' className=' bg-white text-xs'/>
                                    </td>
                                    </>
                                  ) : (
                                    <td className="text-left text-gray-700">
                                    <div className="relative">
                                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 text-xs">$</span>
                                            <Input 
                                                type="text" 
                                                disabled
                                                value={(prop.estimatedbudget as number).toLocaleString()} 
                                                placeholder="Amount" 
                                                className="bg-zinc-200 pl-6 text-xs"
                                            />  
                                        </div>

                                    </td>
                                  )}


                                  
                              </tr>
                            
                          </tbody>
                         
                      </table>

                      {/* <button className=' p-2 text-xs text-zinc-100 bg-red-600 rounded-sm'>Calculate</button> */}

                    
                      <hr className="my-2"/>

                      {prop.budgettype !== 'rates' ? (
                        <>
                            <label htmlFor="" className="text-xs">This invoice amount</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 text-xs">$</span>
                                <Input 
                                    value={prop.budgettype === 'rates' ? ratesCalculation.toLocaleString() : lumpsumCalculation.toLocaleString()} 
                                    placeholder="Amount" 
                                    className="bg-zinc-200 pl-6 text-xs" // Add left padding to avoid overlap
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <label htmlFor="" className="text-xs">This invoice amount</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 text-xs">$</span>
                                <Input
                                    type="text" // Use text to display formatted values
                                    value={amount}
                                    onChange={handleChange}
                                    placeholder="Amount"
                                    className="bg-white pl-6 text-xs w-full [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                />
                            </div>
                        </>
                    )}


                       

                    

                      <label htmlFor="" className=' mt-8 text-xs'>Please insert an instruction or comments for the invoice</label>
                      <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder=' Please input here' className=' bg-white text-xs'/>
                      
                    </div>

                    

                      <div className=' flex items-center justify-end gap-2 px-4 pb-4'>
                          <button disabled={loading} onClick={prop.budgettype === 'lumpsum' ? requestInvoice : requestInvoiceRates} className=' text-xs flex items-center gap-2 bg-red-600 p-2 text-zinc-100 rounded-sm'>Request</button>
                          {/* <button onClick={printInvoice} className=' text-xs flex items-center gap-2 bg-zinc-200 p-2 text-black rounded-sm'><Printer size={20}/>Print</button> */}
                      </div>
                      
                    </DialogContent>
    </Dialog>
  )
}
