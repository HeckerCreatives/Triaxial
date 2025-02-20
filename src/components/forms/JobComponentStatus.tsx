"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { FileCheck, TriangleAlert } from 'lucide-react'
import { Textarea } from '../ui/textarea'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useRouter } from 'next/navigation'
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { Input } from '../ui/input'


type Project = {
    children: React.ReactNode
  name: string
  status: string
  client: string
  _id: string
  jobno: string
  teamname: string
  managerName: string
  projectname: string
  invoiced: string
  budget: string
  currinvoice: number
  adminnotes: string
  }

export default function JobComponentStatus( prop: Project) {
    const [dialog, setDialog] = useState(false)
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState('')
    const [notes, setNotes] = useState('')
    const [comments, setComments] = useState('')

    const updateStatus = async () => {
       
        setLoading(true)
        try {
          const request = axios.get(`${process.env.NEXT_PUBLIC_API_URL}/jobcomponent/completejobcomponent?id=${prop._id}&comments=${comments}&adminnotes=${notes}`,
            {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json'
              }
          })

          const response = await toast.promise(request, {
            loading: 'Updating component status....',
            success: `Successfully updated`,
            error: 'Error while updating the component status',
        });

        if(response.data.message === 'success'){

          setDialog(false)
       
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
    <Dialog open={dialog} onOpenChange={setDialog}>
    <DialogTrigger>
      {prop.children}
    </DialogTrigger>
    <DialogContent className=' bg-white border-none w-[95%] md:w-full max-w-[600px]'>
    {/* <div id='invoice-container' className=" bg-white px-6 py-8 w-full  mx-auto">
      <p className=' text-lg font-semibold'>Complete Job Component Status</p>

      <p>Job no: {prop.jobno}</p>
      <p>Job Component Name: {prop.name}</p>
      <p>Client: {prop.client}</p>

      
    </div> */}





      {/* <div className=' flex items-center justify-end gap-2 px-4 pb-4'>
        <button disabled={loading} onClick={updateStatus} className=' text-xs flex items-center gap-2 bg-red-600 px-4 py-2 text-zinc-100 rounded-sm'>Complete</button>
      </div> */}

      <div id='invoice-container' className=" bg-white px-6 py-8 w-full flex flex-col gap-2  mx-auto">
          <p className=' text-lg font-semibold flex items-center gap-1'><TriangleAlert size={18}/>Complete Project</p>
          <p className=' text-zinc-500 text-xs'>You're about to delete a Component of a Project in this Workload. This will be removed permanently on this tab and will be tranferred to archive.</p>

          <p className=' text-xs flex items-center gap-1'><TriangleAlert size={15}/>This execution is <span className=' uppercase text-red-600'>irreversable.</span></p>
          <p className=' text-xs flex items-center gap-1'><TriangleAlert size={15}/>Please check information below and proceed with caution. </p>
         
      
            <div className=' w-[70%] mt-6'>
            <div className=' w-full grid grid-cols-2'>
              <div className=' w-full flex flex-col gap-2 text-xs'>
                <p className='  font-semibold'>Team Name</p>
                <p className='  font-semibold'>Job Manager</p>
                <p className='  font-semibold'>Job Number</p>
                <p className='  font-semibold'>Client Name</p>
                <p className='  font-semibold'>Project Name</p>
                <p className='  font-semibold'>Job Component</p>
                <p className='  font-semibold'>Component Budget</p>
                <p className='  font-semibold'>Current %Invoice</p>
                <p className='  font-semibold'>Complete %Invoice</p>
                <p className='  font-semibold'>This Claim %Invoice</p>
                <p className='  font-semibold'>This Claim Amount</p>
                <p className='  font-semibold'>Admin Notes</p>
                {/* <p className=' text-sm font-semibold'>Complete %Invoice</p>
                <p className=' text-sm font-semibold'>This claim %Invoice</p>
                <p className=' text-sm font-semibold'>This claim amount</p>
                <p className=' text-sm font-semibold'>Admin Notes</p> */}
      
              </div>
      
              <div className=' w-full flex flex-col gap-2 text-xs'>
                <p className=' '>:  {prop.teamname}</p>
                <p className=' '>:  {prop.managerName}</p>
                <p className=' '>:  {prop.jobno}</p>
                <p className=' '>:  {prop.client}</p>
                <p className=' '>:  {prop.projectname}</p>
                <p className=' '>:  {prop.name}</p>
                <p className=' '>:  $ {prop.budget}</p>
                <p className=' '>:  {prop.currinvoice}</p>
                <p className=' '>:  {'100%'}</p>
                <p className=' '>:  {'100%'}</p>
                <p className=' '>:  ${prop.budget}</p>
                <p className=' '>:  {prop.adminnotes}</p>
                {/* <p className=' text-sm '>:  Complete %Invoice</p>
                <p className=' text-sm '>:  This claim %Invoice</p>
                <p className=' text-sm '>:  This claim amount</p>   
                */}

              </div>
      
            </div>

      
            </div>

            <p className=' text-xs mt-4'>Please insert instructions or comments for the invoicer</p>
            <textarea  value={comments} onChange={(e) => setComments(e.target.value)} placeholder='Please input here' className=' bg-gray-200 text-xs p-2' />

            <p className=' text-xs mt-4 text-end'>A message will be sent to the Job Manager and Invoicing.</p>
            <p className=' text-xs mt-2 text-end'>Would you like to continue?</p>

      
            <div className=' flex items-center justify-end gap-2 px-4 pb-4'>
              <button disabled={loading} onClick={updateStatus} className=' text-xs flex items-center gap-2 bg-red-600 px-4 py-2 text-zinc-100 rounded-sm'>Yes</button>
              <button disabled={loading} onClick={() => setDialog(!dialog)}  className=' text-xs flex items-center gap-2 bg-gray-200 px-4 py-2 text-black rounded-sm'>No</button>
            </div>
      </div>

    </DialogContent>
</Dialog>

  )
}
