"use client"
import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { useRouter, useSearchParams } from 'next/navigation'
import { formatDate } from '@/utils/functions'
import { Input } from '@/components/ui/input'

type values = {
  date: string
  amount: number,
  _id: string
}

type InvoiceProjection = {
  jobnumber: string,
  jobcomponent: string,
  estimatedbudget: 10000,
  projectedValues: values[],
  componentid: string
  invoice: {
    percentage: number
        amount: number
  }
}



export default function Yourworkload() {
  const [dialog, setDialog] = useState(false)
  const [date, setDate] = useState('')
  const [jobcid, setJobcid] = useState('')
  const params = useSearchParams()
  const id = params.get('jobcomponentid')
  const refresh = params.get('state')
  const [allDates, setAlldates] = useState<string[]>([])
  const [amount, setAmount] = useState(0)
  const router = useRouter()
  const [remaining, setRemaining] = useState(0)

  const getList = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/projectinvoice/managerlistcomponentprojectinvoice?projectid=${id}`,{
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
        }
    })

    setList(response.data.data.list)
    setAlldates(response.data.data.allDates)
  
  }

  //update invoice value
  const updateInvoiceValue = async () => {
    try {
      const request = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/projectinvoice/managersaveprojectinvoicevalue`,{
        jobcomponentid: jobcid,
        date: formatDate(date),
        amount: amount
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
          }
      })

      const response = await toast.promise(request, {
        loading: 'Updating workload....',
        success: `Successfully updated`,
        error: 'Error while updating the workload',
    });

    if(response.data.message === 'success'){
      getList()
      setDialog(false)
      setAmount(0)
    }
    } catch (error) {
      setAmount(0)
      setDialog(false)
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

  const [list, setList] = useState<InvoiceProjection[]>([])
  useEffect(() => {
    try {
      const timer = setTimeout(() => {
        const getList = async () => {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/projectinvoice/managerlistcomponentprojectinvoice?projectid=${id}`,{
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json'
              }
          })
      
          setList(response.data.data.list)
          setAlldates(response.data.data.allDates)
        
        }
        getList()
      }, 500)
      return () => clearTimeout(timer)
  } catch (error) {
    
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
    
    
  },[refresh])

  const formatYearMonth = (date: string) => {
    const newDate = new Date(date)
    const month = newDate.getMonth() + 1
    const year = newDate.getFullYear()

    return `${year} - ${month}`
  }




  return (
   <div className=' w-full h-full flex flex-col justify-center bg-secondary p-4 text-zinc-100'>

      <div className=' h-full w-full flex flex-col max-w-[1920px]'>
        {list.length !== 0 ? (
          <div className=' h-full overflow-y-auto flex items-start justify-center bg-secondary w-full max-w-[1920px]'>
     
          <table className="table-auto w-[1000px] border-collapse ">
          <thead className=' bg-secondary h-[80px]'>

            <tr className=' text-[0.6rem] text-zinc-100 font-normal'>
              <th className=' w-[70px] font-normal'>Job Component Name</th>
              <th className=' w-[70px] font-normal'>Job no:</th>
              <th className=' w-[70px] font-normal'>est. $</th>
              <th className=' w-[70px] font-normal'>% invoice</th>
              <th className=' w-[70px] font-normal'>invoiced $</th>
              <th className=' w-[70px] font-normal'>remaining $</th>
              <th className=' w-[70px] font-normal'>sub-cont. costs</th>
              <th className=' font-normal w-[70px]'>Wip</th>
              <th className=' font-normal w-[70px]'>catchup inv.</th>

            
            </tr>
          </thead>
          <tbody>
          {list.map((graphItem, graphIndex) => {
            // Calculate remaining for each graphItem
           
                // Sum up all memberDate.amount values for the current graphItem
              const catchupINV = graphItem.projectedValues.reduce((sum, date) => {
                  return sum + (date.amount || 0); // Accumulate amount, defaulting to 0 if undefined
            }, 0);

           
            const remaining = graphItem.estimatedbudget - ((graphItem.invoice.percentage / 100) * graphItem.estimatedbudget);

            return (
              <tr key={`${graphIndex}`} className="bg-primary text-[.6rem] py-2 h-[40px] border-[1px] border-zinc-600">
                <td className="text-center text-xs">{graphItem.jobcomponent}</td>
                <td className="text-center text-xs text-red-600">{graphItem.jobnumber}</td>
                <td className="text-center text-xs">$ {graphItem.estimatedbudget}</td>
                <td className="text-center text-xs">% {graphItem.invoice.percentage}</td>
                <td className="text-center text-xs">$ {remaining}</td>
                <td className="text-center text-xs">$ {remaining}</td>
                <td className="text-center text-xs"></td>
                <td className="text-center text-xs">${catchupINV + catchupINV}</td>
                <td className="text-center text-xs">$ {catchupINV}</td>
              </tr>
            );
          })}

        </tbody>
          </table>

          <div className=' overflow-x-auto'>
            <table className="table-auto border-collapse ">
              <thead className=' w-[800px] bg-zinc-800 h-[80px]'>
                <tr className=' text-[0.6rem] text-zinc-100 font-normal'>
                
              
                {allDates.map((dateObj, index) => {
                  const monthName = new Date(dateObj).toLocaleString('default', { month: 'long' });
                  const year = new Date(dateObj).getFullYear();

                  return (
                    <React.Fragment key={index}>
                      <th className="relative font-normal border-[1px] px-6 border-zinc-700">
                        <p className="whitespace-nowrap">{year} <span className=' text-red-600'>{monthName.slice(0,3)}</span></p>
                      </th>
                    
                    </React.Fragment>
                  );
                })}

                  
                </tr>
              </thead>
              <tbody>
              {list.map((graphItem, graphIndex) => {
                // Calculate the remaining value for each graphItem
                const remaining = graphItem.estimatedbudget - ((graphItem.invoice.percentage / 100) * graphItem.estimatedbudget);

                return (
                  <tr key={`${graphIndex}`} className="bg-zinc-800 text-[.6rem] py-2 px-4 h-[40px] border-[1px] border-zinc-600">
                    {allDates.map((dateObj, index) => {
                      const memberDate = graphItem.projectedValues.find(
                        (date) => formatYearMonth(date.date) === formatYearMonth(dateObj)
                      );

                      return (
                        <td
                          key={`${graphIndex}-${index}`}
                          className="text-center border-[1px] border-zinc-600 cursor-pointer"
                          onClick={() => {
                            setDialog(true);
                            setDate(dateObj);
                            setJobcid(graphItem.componentid);
                            setAmount(memberDate?.amount || 0)
                          }}
                        >
                          {memberDate ? (
                            <span className="text-xs">$ {memberDate.amount}</span>
                          ) : (
                            <span>-</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}




            </tbody>
            </table>
          </div>

     
           <Dialog open={dialog} onOpenChange={setDialog}>
                  <DialogContent className=' p-8 bg-secondary border-none text-white'>
                    <DialogHeader>
                      <DialogTitle>Update Invoice Amount (at {formatDate(date)})</DialogTitle>
                      <DialogDescription>
                        Update amount on selected job component.
                      </DialogDescription>
                    </DialogHeader>
                    <div className=' w-full flex flex-col gap-2'>

                      <label htmlFor="">Amount $</label>
                      <Input value={amount} onChange={(e) => setAmount(e.target.valueAsNumber)} placeholder='Amount' type='number' className=' bg-primary'/>

                      <div className=' w-full flex items-end justify-end mt-4'>
                        <button onClick={updateInvoiceValue} className=' px-4 py-2 bg-red-600 text-xs text-white rounded-md'>Save</button>
                      </div>

                    </div>
                    
                  </DialogContent>
          </Dialog>
         
      </div>
        ) : (
          <div className=' w-full h-full flex items-center justify-center'>
            <p className=' text-xs'>No data.</p>
          </div>
        )}
        
       
        
      </div>

    
        
    </div>
  )
}
