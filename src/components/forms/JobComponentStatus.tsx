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
    children: React.ReactNode
  name: string
  status: string
  client: string
  _id: string
  jobno: string
  }

export default function JobComponentStatus( prop: Project) {
    const [dialog, setDialog] = useState(false)
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState('')

    const updateStatus = async () => {
       
        setLoading(true)
        try {
          const request = axios.get(`${process.env.NEXT_PUBLIC_API_URL}/jobcomponent/completejobcomponent?id=${prop._id}`,
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
    <div id='invoice-container' className=" bg-white px-6 py-8 w-full  mx-auto">
      <p className=' text-lg font-semibold'>Complete Job Component Status</p>

      <p>Job no: {prop.jobno}</p>
      <p>Job Component Name: {prop.name}</p>
      <p>Client: {prop.client}</p>

      
    </div>



      <div className=' flex items-center justify-end gap-2 px-4 pb-4'>
        <button disabled={loading} onClick={updateStatus} className=' text-xs flex items-center gap-2 bg-red-600 px-4 py-2 text-zinc-100 rounded-sm'>Complete</button>
      </div>

    </DialogContent>
</Dialog>

  )
}
