" use client"
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
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from '../ui/textarea'
import { Checkbox } from '../ui/checkbox'
import { Bell, Plus } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { wdSchema, WdSchema } from '@/schema/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { boolean } from 'zod'
import { formatDate } from '@/utils/functions'
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'


interface Data {
 
     children?: React.ReactNode;
     start: string
     id: string

}


export default function Approvewdrequest( prop: Data) {
  const [dialog, setDialog] = useState(false)
  const [start, setStart] = useState('')
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [loading1, setLoading1] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    unregister,
    formState: { errors },
  } = useForm<WdSchema>({
    resolver: zodResolver(wdSchema),
    defaultValues: {
      startdate: prop.start
    }
  });

  const approval = async ( status: string) => {
    router.push('?state=true')
    try {
      const request = axios.post(`${process.env. NEXT_PUBLIC_API_URL}/wellnessday/wellnessdayapprovaladmin`,{
        approvalstatus: status, // Approved or Denied
        requestid: prop.id
     
      },
          {
              withCredentials: true,
              headers: {
              'Content-Type': 'application/json'
              }
          }
      )

    const response = await toast.promise(request, {
        loading: 'A wellness day request....',
        success: `Successfully ${status}`,
        error: 'Error while updating wellness day request',
    });

   if(response.data.message === 'success'){
     router.push('?state=false')
     setDialog(false)

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
    <DialogContent className=' max-h-[90%] overflow-y-auto'>
      <form className=' w-full p-4 flex flex-col gap-4' >
        <p className=' text-sm uppercase font-semibold text-red-700 flex items-center gap-2'><span className=' text-xs uppercase font-semibold px-4 py-1 bg-red-700 text-zinc-100'>Edit</span>Wellness Day application Form</p>
        <div className=' w-full flex flex-col gap-1'>

         


          <Label className=' mt-4 font-semibold'>Period Wellness Day Cycle</Label>
          <div className=' flex items-center gap-2 w-full'>
            <div  className=' w-full'>
              <Label className=' mt-2 text-zinc-500'>Start Day Of Wellness Day Cycle: <span className=' text-red-700'>*</span></Label>
              <Input type='date' value={prop.start} className=' text-xs h-[35px] bg-zinc-200' placeholder='Name' {...register('startdate')}/>
              {errors.startdate && <p className=' text-[.6em] text-red-500'>{errors.startdate.message}</p>}


            </div>
          </div>

        


          <p className=' text-xs text-zinc-500 mt-4'>Note: <span className=' text-red-500'>*</span><span className=' italic'>- Required</span></p>

          <div className=' flex flex-col gap-2 mt-6'>
            <p className=' text-xs font-semibold italic flex items-center gap-1'><Bell size={15} color='red'/>Reminder</p>
            <p className=' text-xs text-zinc-500'>• Wellness Day's won't occur on fortnights with public holidays. Normal 7.6hr days will apply during those fortnights.</p>
            <p className=' text-xs text-zinc-500'>• For staff who are working towards a Wellnes Day, any leave (sick or other) formightly cycle will be deducted in 8.5hr days (not 7.6hr days).</p>
            <p className=' text-xs text-zinc-500'>• Unless approved, a minimum of 8 hours must be spent on billable project work each day to qualify for the
Weines Day.</p>

          </div>

          <div className=' mt-8 flex items-center gap-2'>
             <input
              type="checkbox"
              {...register("declaration", { setValueAs: boolean })} // Correctly handle as boolean
            />
            <p className=' text-xs text-zinc-500'>I acknowledge that I understand and agree to the contents of this application.</p>

          </div>
          {errors.declaration && <p className=' text-[.6em] text-red-500'>{errors.declaration.message}</p>}


          <div className=' flex items-center gap-4 mt-4'>
          <button onClick={() => approval('Denied')} className=' bg-red-700 text-zinc-100 px-4 py-2 text-xs rounded-sm mt-4 w-auto flex items-center justify-center gap-2'>
            {loading1 === true && (
              <div className=' spinner2'></div>
            )}
              Reject</button>
            <button onClick={() => approval('Approved')} className=' bg-red-700 text-zinc-100 px-4 py-2 text-xs rounded-sm mt-4 w-auto flex items-center justify-center gap-2'>
            {loading === true && (
              <div className=' spinner2'></div>
            )}
              Approved</button>

          </div>

         
        </div>

      </form>
    </DialogContent>
    </Dialog>

  )
}
