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
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'


interface Data {
    // open: boolean
    // onOpenChange: boolean
    onClick: () => void
    // name: string
    // type: string
    // start: Date
    // end: Date
    // details: string
    // wd
     children?: React.ReactNode;

}


export default function WDform( prop: Data) {
  const [dialog, setDialog] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const [friday, setFriday] = useState('')

  //request welness day
  const {
    register,
    handleSubmit,
    reset,
    unregister,
    formState: { errors },
  } = useForm<WdSchema>({
    resolver: zodResolver(wdSchema),
  });

  const onSubmit = async (data: WdSchema) => {
    const { declaration, ...filteredData } = data;
    setLoading(true)
    router.push('?state=true')

    try {
      const request = axios.post(`${process.env. NEXT_PUBLIC_API_URL}/wellnessday/wellnessdayrequest`,{
       requestdate: data.startdate // Format YYYY-MM
       
      },
          {
              withCredentials: true,
              headers: {
              'Content-Type': 'application/json'
              }
          }
      )

   const response = await toast.promise(request, {
       loading: 'Requesting wellness day ....',
       success: `Successfully rquested`,
       error: 'Error while requesting wellness day',
   });

   if(response.data.message === 'success'){
     reset()
     setDialog(false)
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

  useEffect(() => {
    reset()
  },[dialog])

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/wellnessday/getwellnessdaylastfriday`,{
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
          }
      })

    console.log(response.data)
    setFriday(response.data.data)
       
      
    
    }
    getData()

  
},[])



  
  return (
    <Dialog open={dialog} onOpenChange={setDialog}>
    <DialogTrigger>
       {prop.children}
    </DialogTrigger>
    <DialogContent className=' max-h-[90%] overflow-y-auto'>
      <form className=' w-full p-4 flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
        <p className=' text-sm uppercase font-semibold text-red-700'>Wellness Day application Form</p>
        <div className=' w-full flex flex-col gap-1'>
          {/* <p className=' text-xs font-semibold mb-2'>Employee Details</p> */}
          {/* <label htmlFor="" className=' text-xs text-zinc-700'>Name</label>
          <Input type='text' className=' text-xs h-[35px] bg-zinc-200' placeholder='Name' {...register('name')}/>
           {errors.name && <p className=' text-[.6em] text-red-500'>{errors.name.message}</p>} */}


          <Label className=' mt-4 font-semibold'>Period Wellness Day Cycle</Label>
          <div className=' flex items-center gap-2 w-full'>
            <div  className=' w-full'>
              <Label className=' mt-2 text-zinc-500'>Start Day Of Wellness Day Cycle: <span className=' text-red-700'>*</span></Label>
              <Input type='date' className=' text-xs h-[35px] bg-zinc-200' placeholder='Name' {...register('startdate')}/>
              {errors.startdate && <p className=' text-[.6em] text-red-500'>{errors.startdate.message}</p>}


            </div>

            <div  className=' w-full'>
              <Label className=' mt-2 text-zinc-500'>Last friday of the a 2-week cycle <span className=' text-red-700'>*</span></Label>
              <Input type='date' value={friday.split('T')[0]} className=' text-xs h-[35px] bg-zinc-200'/>


            </div>

            {/* <div className=' w-full'> 
              <Label className=' mt-2 text-zinc-500'>This will be your Wellness Day:</Label>
              <Input type='date' className=' text-xs h-[35px] bg-zinc-200' placeholder='Name' />

            </div> */}

          </div>

          {/* <div className=' w-full flex items-center gap-2 mt-4'>
            <div className=' w-full'>
              <Label className=' text-zinc-500'>Total Number Of Working Days:</Label>
            < Input type='number' className=' text-xs h-[35px] bg-zinc-200' placeholder='0' />

            </div>

            <div className=' w-full'>
              <Label className=' text-zinc-500'>Total Working Hours During Wellness Day Cycle:</Label>
            < Input type='number' className=' text-xs h-[35px] bg-zinc-200' placeholder='0' />

            </div>
          </div> */}


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


          <button className=' bg-red-700 text-zinc-100 px-4 py-3 text-xs rounded-sm mt-4 flex items-center justify-center gap-2'>
            {loading === true && (
              <div className=' spinner2'></div>
            )}
            Submit</button>

         
        </div>

      </form>
    </DialogContent>
    </Dialog>

  )
}
