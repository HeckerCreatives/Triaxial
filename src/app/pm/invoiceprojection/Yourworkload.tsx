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
import { formatDate, getInitials, truncateText } from '@/utils/functions'
import { Input } from '@/components/ui/input'
import Invoice from '@/components/forms/Invoice'
import { File } from 'lucide-react'
import { clientColor } from '@/utils/helpers'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


type values = {
  date: string
  amount: number,
  _id: string
}

type InvoiceProjection = {
componentid: string
jobnumber: string
jobcomponent: string
jobmanager: {
    employeeid: string
    fullname: string
},
clientname: string
priority: string
projectname: string
budgettype: string
estimatedbudget: number
teamname: string
projectedValues: [
    {
        date: string
        amount: number,
        _id: string
    }
],
invoice: {
    percentage: number,
    amount: number
},
lumpsum: {
    invoiced: number,
    remaining: number,
    subconts: number,
    catchupinv: number,
    wip: number
},
rates: {
    invoiced: number,
    wip: number
}
}





export default function Yourworkload() {
  const [dialog, setDialog] = useState(false)
  const [dialog2, setDialog2] = useState(false)
  const [date, setDate] = useState('')
  const [jobcid, setJobcid] = useState('')
  const params = useSearchParams()
  const id = params.get('jobcomponentid')
  const refresh = params.get('state')
  const [allDates, setAlldates] = useState<string[]>([])
  const [amount, setAmount] = useState(0)
  const [subamount, setSubAmount] = useState(0)
  const router = useRouter()
  const [remaining, setRemaining] = useState(0)
  const [componentid, setComponentid] = useState('')
  const [search, setSearch] = useState('')

  const getList = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/projectinvoice/managerlistcomponentprojectinvoice?teamid=${id}`,{
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

  const updateSubsconstvalue = async () => {
    try {
      const request = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/projectinvoice/managersavesubconstvalue`,{
        jobcomponentid: componentid,
        subconts: subamount
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
      setDialog2(false)
      setAmount(0)
    }
    } catch (error) {
      setAmount(0)
      setDialog2(false)
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
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/projectinvoice/managerlistcomponentprojectinvoice?teamid=${id}&search=${search}`,{
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
    
    
  },[refresh, search])

  const formatYearMonth = (date: string) => {
    const newDate = new Date(date)
    const month = newDate.getMonth() + 1
    const year = newDate.getFullYear()

    return `${year} - ${month}`
  }

  //totals
  const totalEstimatedBudget = list.reduce((acc, item) => acc + (item.estimatedbudget || 0), 0);
const totalInvoicePercentage = list.reduce((acc, item) => {
  return item.budgettype === 'rates'
    ? acc // Skip summing for 'rates' as it's in hours
    : acc + (item.invoice.percentage || 0);
}, 0);
const totalInvoiced = list.reduce((acc, item) => {
  return item.budgettype === 'rates'
    ? acc + (item.rates.invoiced || 0)
    : acc + (item.lumpsum.invoiced || 0);
}, 0);
const totalRemaining = list.reduce((acc, item) => {
  return item.budgettype === 'lumpsum'
    ? acc + (item.lumpsum.remaining || 0)
    : acc;
}, 0);
const totalSubAmount = list.reduce((acc, item) => {
  return item.budgettype === 'lumpsum'
    ? acc + (item.lumpsum.subconts || 0)
    : acc;
}, 0);
const totalWIP = list.reduce((acc, item) => {
  return item.budgettype === 'rates'
    ? acc + (item.rates.wip || 0)
    : acc + (item.lumpsum.wip || 0);
}, 0);
const totalCatchupInv = list.reduce((acc, item) => {
  return item.budgettype === 'lumpsum'
    ? acc + (item.lumpsum.catchupinv || 0)
    : acc;
}, 0);

const totalsByDate = allDates.map((dateObj) => {
  return list.reduce((total, graphItem) => {
    const memberDate = graphItem.projectedValues.find(
      (date) => formatYearMonth(date.date) === formatYearMonth(dateObj)
    );
    return total + (memberDate?.amount || 0); // Add amount if it exists, otherwise add 0
  }, 0);
});

 const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelectedId((prevId) => (prevId === id ? null : id)); // Toggle selection
  };

  const findJobComponent = list.find((item) => item.componentid === componentid)







  return (
   <div className=' w-full h-full flex flex-col justify-center bg-secondary p-4 text-zinc-100'>

      <div className=' h-full w-full flex flex-col'>
        <p className=' text-xs text-zinc-400'>Note: Sub-cont. cost cell data is editable.</p>

        <div className=' w-full flex items-end justify-end mb-4'>
          <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder='Search project' className=' text-black text-[.6rem] p-2 bg-white rounded-sm' />

        </div>

        
        {list.length !== 0 ? (
          <div className=' h-full overflow-y-auto flex items-start justify-center bg-secondary w-full'>
              
              
            <table className="table-auto border-collapse ">
          
            <thead className=' bg-primary h-[50px] border-collapse'>

              <tr className=' text-[0.6rem] text-zinc-100 font-normal'>
              <th className=' w-[70px] font-normal border-[1px] border-zinc-600 whitespace-normal break-all px-2'>
              {componentid === '' ? (
                 <div className=' flex flex-col items-center justify-center gap-1 text-[.6rem] w-[40px]'>
                  <button onClick={() => toast.error('Please select a job component below')} className={`text-xs p-1 bg-red-600  rounded-sm`}><File size={12}/></button>
                  <p>Invoice</p>
                </div>

              ) : (
                <Invoice projectname={findJobComponent?.projectname} jobcname={findJobComponent?.jobcomponent} jobno={findJobComponent?.jobnumber} budgettype={findJobComponent?.budgettype} estimatedbudget={findJobComponent?.estimatedbudget} jobcid={findJobComponent?.componentid} isJobmanager={findJobComponent?.jobmanager.employeeid} currinvoice={findJobComponent?.invoice.percentage}  manager={findJobComponent?.jobmanager.fullname || ''} client={findJobComponent?.clientname || ``} notes={''}>
                  <div className=' flex flex-col items-center justify-center gap-1 text-[.6rem] w-[40px]'>
                    <button className={`text-xs p-1 bg-red-600  rounded-sm`}><File size={12}/></button>
                    <p>Invoice</p>
                  </div>       
                </Invoice>
              )}
              </th>
                <th className=' min-w-[70px] font-normal border-[1px] border-zinc-600 whitespace-normal break-all px-2'></th>
                <th className=' min-w-[70px] font-normal border-[1px] border-zinc-600 whitespace-normal break-all px-2'></th>
                <th className=' min-w-[70px] font-normal border-[1px] border-zinc-600 whitespace-normal break-all px-2'></th>
                <th className=' min-w-[70px] font-normal border-[1px] border-zinc-600 whitespace-normal break-all px-2'></th>
                <th className=' min-w-[70px] font-normal border-[1px] border-zinc-600 whitespace-normal break-all px-2'>Totals</th>
                <th className=' min-w-[70px] font-normal border-[1px] border-zinc-600 whitespace-normal break-all px-2'>$ {totalEstimatedBudget.toLocaleString()}</th>
                <th className=' min-w-[70px] font-normal border-[1px] border-zinc-600 whitespace-normal break-all px-2'></th>
                <th className=' min-w-[70px] font-normal border-[1px] border-zinc-600 whitespace-normal break-all px-2'>$ {totalInvoiced.toLocaleString()}</th>
                <th className=' min-w-[70px] font-normal border-[1px] border-zinc-600 whitespace-normal break-all px-2'>$ {totalRemaining.toLocaleString()}</th>
                <th className=' min-w-[70px] font-normal border-[1px] border-zinc-600 whitespace-normal break-all px-2'>$ {totalSubAmount.toLocaleString()}</th>
                <th className=' font-normal min-w-[70px] border-[1px] border-zinc-600 whitespace-normal break-all px-2'>$ {totalWIP.toLocaleString()}</th>
                <th className=' font-normal min-w-[70px] border-[1px] border-zinc-600 whitespace-normal break-all px-2'>$ {totalCatchupInv.toLocaleString()}</th>

              </tr>
            </thead>

            <thead className=' bg-secondary h-[60px]'>

              <tr className=' text-[0.6rem] text-zinc-100 font-normal border-collapse'>
                <th className=' min-w-[70px] font-normal border-[1px] border-zinc-600 whitespace-normal break-all px-2'>Action</th>
                <th className=' min-w-[70px] font-normal border-[1px] border-zinc-600 whitespace-normal break-all px-2'>Job no:</th>
                <th className={`min-w-[70px] font-normal border-[1px] border-zinc-600 whitespace-normal break-all px-2`}>Client</th>
                <th className=' min-w-[90px] font-normal border-[1px] border-zinc-600 whitespace-normal break-all px-2'>Project Name</th>
                <th className=' min-w-[70px] font-normal border-[1px] border-zinc-600 whitespace-normal break-all px-2'>JM</th>
                <th className=' min-w-[70px] font-normal border-[1px] border-zinc-600 whitespace-normal break-all px-2'>Job Comp.</th>
                <th className=' min-w-[70px] font-normal border-[1px] border-zinc-600 whitespace-normal break-all px-2'>Est. $</th>
                <th className=' min-w-[70px] font-normal border-[1px] border-zinc-600 whitespace-normal break-all px-2'>Invoice (%)</th>
                <th className=' min-w-[70px] font-normal border-[1px] border-zinc-600 whitespace-normal break-all px-2'>Invoiced $</th>
                <th className=' min-w-[80px] font-normal border-[1px] border-zinc-600 whitespace-normal break-all px-2'>Remaining $</th>
                <th className=' min-w-[100px] font-normal border-[1px] border-zinc-600 whitespace-normal break-all px-2'>Sub-cont. costs</th>
                <th className=' font-normal min-w-[70px] border-[1px] border-zinc-600 whitespace-normal break-all px-2'>Wip</th>
                <th className=' font-normal min-w-[100px] border-[1px] border-zinc-600 whitespace-normal break-all px-2'>Catchup Invoice</th>

              
              </tr>
            </thead>
            <tbody>
            {list.map((graphItem, graphIndex) => {
              return (
                <tr key={`${graphIndex}`} className={`text-[.6rem] text-black py-2 h-[40px] border-[1px] border-zinc-600 ${clientColor(graphItem.priority)}`}>
                  <td className="text-center  text-red-600 border-[1px] border-zinc-600 whitespace-normal break-all px-2 ">
                    <input 
                     type="checkbox"
                     checked={selectedId === graphItem.componentid}
                     onChange={() => {handleSelect(graphItem.componentid), setComponentid(graphItem.componentid)}}
                    />
                  </td>
                  <td className="text-center underline cursor-pointer border-[1px] border-zinc-600 whitespace-normal break-all px-2 ">
                  <a href={`/pm/graph/jobcomponent?teamid=${id}&jobno=${graphItem.componentid}&teamname=${graphItem.teamname}`} className='  '>
                   <TooltipProvider delayDuration={.1}>
                      <Tooltip>
                        <TooltipTrigger>{truncateText(graphItem.jobnumber, 6)}</TooltipTrigger>
                        <TooltipContent>
                          <p className=' text-[.6rem]'>{graphItem.jobnumber}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </a>

                  </td>
                  <td className={`text-center border-[1px] border-zinc-600 whitespace-normal break-all px-2   ${clientColor(graphItem.priority)}`}>
                  <TooltipProvider delayDuration={.1}>
                      <Tooltip>
                        <TooltipTrigger>{truncateText(graphItem.clientname, 6)}</TooltipTrigger>
                        <TooltipContent>
                          <p className=' text-[.6rem]'>{graphItem.clientname}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </td>
                  <td className="text-center border-[1px] border-zinc-600 whitespace-normal break-all px-2  ">
                  <TooltipProvider delayDuration={.1}>
                      <Tooltip>
                        <TooltipTrigger>{truncateText(graphItem.projectname, 8)}</TooltipTrigger>
                        <TooltipContent>
                          <p className=' text-[.6rem]'>{graphItem.projectname}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </td>
                  <td className="text-center border-[1px] border-zinc-600 whitespace-normal break-all px-2  ">{getInitials(graphItem.jobmanager.fullname)}</td>
                  <td className="text-center border-[1px] border-zinc-600 whitespace-normal break-all px-2  ">
                  <TooltipProvider delayDuration={.1}>
                      <Tooltip>
                        <TooltipTrigger>{truncateText(graphItem.jobcomponent, 8)}</TooltipTrigger>
                        <TooltipContent>
                          <p className=' text-[.6rem]'>{graphItem.jobcomponent}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                  </td>
                  <td className="text-center border-[1px] border-zinc-600 whitespace-normal break-all px-2  ">{graphItem.budgettype === 'rates' ? `Rates` : `$ ${ graphItem.estimatedbudget.toLocaleString()}` }</td>
                  <td className="text-center border-[1px] border-zinc-600 whitespace-normal break-all px-2  ">{graphItem.budgettype === 'rates' ? `` : ` ${ graphItem.invoice.percentage.toLocaleString()}%` }</td>
                  <td className="text-center border-[1px] border-zinc-600 whitespace-normal break-all px-2  ">$ {graphItem.budgettype === 'rates' ? `${ graphItem.rates.invoiced.toLocaleString()}` : `${ graphItem.lumpsum.invoiced.toLocaleString()}` }</td>
                  <td className="text-center border-[1px] border-zinc-600 whitespace-normal break-all px-2  ">{graphItem.budgettype === 'rates' ? `-` : `$ ${ graphItem.lumpsum.remaining.toLocaleString()}`}</td>
                  <td onClick={() => {setDialog2(graphItem.budgettype === 'lumpsum' && true), setComponentid(graphItem.componentid), setSubAmount(graphItem.lumpsum.subconts)}} className={` border-[1px] border-zinc-600 whitespace-normal break-all px-2 text-center cursor-pointer font-semibold text-red-500 ${graphItem.budgettype === 'lumpsum' && ''}`}> {graphItem.budgettype === 'rates' ? '-' : `$ ${graphItem.lumpsum.subconts.toLocaleString()}`}</td>
                  <td className="text-center border-[1px] border-zinc-600 whitespace-normal break-all px-2  ">$ {graphItem.budgettype === 'rates' ? `${ graphItem.rates.wip.toLocaleString()}` : ` ${ graphItem.lumpsum.wip.toLocaleString()}`}</td>
                  <td className="text-center border-[1px] border-zinc-600 whitespace-normal break-all px-2  ">{graphItem.budgettype === 'rates' ? `-` : `$ ${ graphItem.lumpsum.catchupinv.toLocaleString()}`}</td>
                </tr>
              );
            })}

          </tbody>
            </table>

          <div className=' overflow-x-auto'>
            <table className="table-auto border-collapse ">
              <thead className=' w-[800px] bg-primary h-[50px] border-none'>
                <tr className=' text-[0.6rem] text-zinc-100 font-normal border-collapse'>
                  {totalsByDate.map((item, index) => (
                    <th key={index} className="relative font-normal border-[1px] border-zinc-600 whitespace-normal break-all px-2 ">
                      $ {item.toLocaleString()}
                    </th>
                  ))}
                      
                  
                </tr>
              </thead>

              <thead className=' bg-zinc-800 h-[30px]'>
                <tr className='text-[0.6rem] text-zinc-100 font-normal'>
                  <th className="relative px-6 border-zinc-700">
                  </th>
                  <th className="relative col-span-full px-6 border-zinc-700"></th>
                  <th className="relative col-span-full px-6 border-zinc-700"></th>
                  <th className="relative text-end col-span-full px-2 text-sm text-blue-500  border-zinc-700">PROJECTED</th>
                  <th className="relative text-start col-span-full px-2 text-sm text-blue-500 border-zinc-700">INVOICING</th>
                  <th className="relative col-span-full px-6 border-zinc-700"></th>
                  <th className="relative col-span-full px-6 border-zinc-700"></th>
                  <th className="relative col-span-full px-6 border-zinc-700"></th>
                  <th className="relative col-span-full px-6 border-zinc-700"></th>
                  <th className="relative col-span-full px-6 border-zinc-700"></th>
                  <th className="relative col-span-full px-6 border-zinc-700"></th>
                  <th className="relative col-span-full px-6 border-zinc-700"></th>
                  <th className="relative col-span-full px-6 border-zinc-700"></th>
                </tr>
              </thead>

              <thead className=' w-[800px] bg-zinc-800 h-[30px]'>
                <tr className=' text-[0.6rem] text-zinc-100 font-normal'>
                
              
                {allDates.map((dateObj, index) => {
                  const monthName = new Date(dateObj).toLocaleString('default', { month: 'long' });
                  const year = new Date(dateObj).getFullYear();

                  return (
                    <React.Fragment key={index}>
                      <th className="relative font-normal border-[1px] px-6 border-zinc-700">
                        <p className="whitespace-nowrap">{monthName.slice(0,3)} {year} </p>
                      </th>
                    
                    </React.Fragment>
                  );
                })}

                  
                </tr>
              </thead>
              <tbody>
              {list.map((graphItem, graphIndex) => {
                

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
                            <span className="">$ {memberDate.amount}</span>
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

          <Dialog open={dialog2} onOpenChange={setDialog2}>
          <DialogTrigger></DialogTrigger>
          <DialogContent className='p-8 bg-secondary border-none text-white'>
            <DialogHeader>
              <DialogTitle>Sub-Cont. Cost</DialogTitle>
              <DialogDescription>
                Update Sub-Cont. Cost value
              </DialogDescription>
            </DialogHeader>

            <label htmlFor="">Amount $</label>
            <Input
              value={subamount}
              onChange={(e) => {
                const value = e.target.value;
                if (value === "" || /^-?\d*\.?\d*$/.test(value)) {
                  setSubAmount(value as any);
                }
              }}
              placeholder="Amount"
              type="number"
              className="bg-primary"
            />

            <div className=' w-full flex items-end justify-end mt-4'>
              <button onClick={updateSubsconstvalue} className=' px-4 py-2 bg-red-600 text-xs text-white rounded-md'>Save</button>
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
