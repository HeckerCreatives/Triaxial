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
  

type Project = {
  deadlinedate: string
  invoiced: number
  managerName: string
  projectname: string
  startdate: string
  status: string
  teamname: string
  client: string
  _id: string
  jobno: string
  }

export default function Projectstatusform( prop: Project) {
    const [dialog, setDialog] = useState(false)
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState('')

    const updateStatus = async () => {
        router.push('?state=true')
        setLoading(true)
        try {
          const request = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/projects/changeprojectstatus`,{
            projectid: prop._id,
            status: status 
    
          }, {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json'
              }
          })
    
          const response = await toast.promise(request, {
            loading: 'Updating project status....',
            success: `Successfully updated`,
            error: 'Error while updating the project status',
        });
    
        if(response.data.message === 'success'){
         
          setDialog(false)
          router.push('?state=false')
          setLoading(false)
     
        }
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
      };


  return (
    <Dialog open={dialog} onOpenChange={setDialog}>
    <DialogTrigger>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger><button className=' p-2 bg-secondary rounded-md'><FileCheck size={15}/></button></TooltipTrigger>
          <TooltipContent>
            <p className=' text-xs'>Update Project Status</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </DialogTrigger>
    <DialogContent className=' bg-white border-none w-[95%] md:w-full max-w-[600px]'>
    <div id='invoice-container' className=" bg-white px-6 py-8 w-full  mx-auto">
      <p className=' text-lg font-semibold'>Update Project Status</p>
      {/* <p className=' text-sm text-zinc-500'>You're about to delete the Component of a Project in this Workload.This will be removed permanently on this Tab and will be transfered to Invoice Spreadsheet.</p>
      <p className=' text-sm text-zinc-500 flex items-center gap-1'><TriangleAlert size={20} color='red'/>This execution is<span className=' bg-red-100'>IRREVERSIBLE</span>.</p>
      <p className=' text-sm text-zinc-500 flex items-center gap-1'><TriangleAlert size={20} color='red'/>Please check information below and proceed with caution.</p> */}
      <hr className=" my-2"/>

      <div className=' w-[70%]'>
      <div className=' w-full grid grid-cols-2'>
        <div className=' w-full flex flex-col gap-1'>
          <p className=' text-sm font-semibold'>Team Name</p>
          <p className=' text-sm font-semibold'>Job Manager</p>
          <p className=' text-sm font-semibold'>Job Number</p>
          <p className=' text-sm font-semibold'>Client Name</p>
          <p className=' text-sm font-semibold'>Project Name</p>
          {/* <p className=' text-sm font-semibold'>Job Component</p> */}
          <p className=' text-sm font-semibold'>Component Budget</p>
          {/* <p className=' text-sm font-semibold'>Current %Invoice</p>
          <p className=' text-sm font-semibold'>Complete %Invoice</p>
          <p className=' text-sm font-semibold'>This claim %Invoice</p>
          <p className=' text-sm font-semibold'>This claim amount</p> */}
          {/* <p className=' text-sm font-semibold'>Admin Notes</p> */}

        </div>

        <div className=' w-full flex flex-col gap-1'>
          <p className=' text-sm '>:  {prop.teamname}</p>
          <p className=' text-sm '>:  {prop.managerName}</p>
          <p className=' text-sm '>:  {prop.jobno}</p>
          <p className=' text-sm '>:  {prop.client}</p>
          <p className=' text-sm '>:  {prop.projectname}</p>
          {/* <p className=' text-sm '>:  Job Component</p> */}
          <p className=' text-sm '>:  {prop.invoiced}</p>
          {/* <p className=' text-sm '>:  Current %Invoice</p>
          <p className=' text-sm '>:  Complete %Invoice</p>
          <p className=' text-sm '>:  This claim %Invoice</p>
          <p className=' text-sm '>:  This claim amount</p> */}
          {/* <p className=' text-sm '>:  Admin Notes</p> */}

        </div>

      </div>

      </div>

      <hr className=' my-2' />
      <p className=' text-xs text-zinc-500 mb-2'>Select Status</p>
      {/* <Textarea placeholder='Please input here' className=' bg-zinc-200'/>
      <p className=' font-semibold text-sm mt-4'>Note: An email notification will be sent to the Job Manager and Invoicing.Would you like to continue?</p> */}
      <Select value={status} onValueChange={setStatus}>
        <SelectTrigger className="w-[180px] bg-zinc-200">
            <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="On-going">On-going</SelectItem>
            <SelectItem value="Complete">Complete</SelectItem>
            <SelectItem value="Beyond Deadline">Beyond Deadline</SelectItem>
        </SelectContent>
        </Select>
    </div>

    

      <div className=' flex items-center justify-end gap-2 px-4 pb-4'>
        <button disabled={loading} onClick={updateStatus} className=' text-xs flex items-center gap-2 bg-red-600 px-4 py-2 text-zinc-100 rounded-sm'>Save</button>
      </div>
      
    </DialogContent>
</Dialog>

  )
}
