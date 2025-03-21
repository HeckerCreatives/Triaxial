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
import { Controller, useForm } from 'react-hook-form'
import { wdSchema, WdSchema } from '@/schema/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { boolean } from 'zod'
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import DatePicker from 'react-datepicker'
import { format } from "date-fns";


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
  const [wellnessDay, setWellnessDay] = useState('');

  const calculateWellnessDay = (selectedDate: Date) => {
    if (!selectedDate) return "";
  
    const date = new Date(selectedDate);
    const dayOfMonth = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
  
    // Calculate the first Monday of the month
    const firstDayOfMonth = new Date(year, month, 1);
    const firstMonday = new Date(firstDayOfMonth);
  
    while (firstMonday.getDay() !== 1) {
      firstMonday.setDate(firstMonday.getDate() + 1);
    }
  
    // Calculate the selected week's index (1-based)
    const weekIndex = Math.ceil((dayOfMonth - firstMonday.getDate() + 1) / 7) + 1;
  
    // Find the first day (Monday) of the second week relative to selected week
    const secondWeekMonday = new Date(date);
    secondWeekMonday.setDate(date.getDate() + (8 - date.getDay()));
  
    // Find the Friday of that week
    const wellnessFriday = new Date(secondWeekMonday);
    while (wellnessFriday.getDay() !== 5) {
      wellnessFriday.setDate(wellnessFriday.getDate() + 1);
    }
  
    return format(wellnessFriday, "dd/MM/yy"); // Format as DD/MM/YY
  };
  

  //request welness day
  const {
    register,
    handleSubmit,
    reset,
    unregister,
    control,
    setValue,
    formState: { errors },
  } = useForm<WdSchema>({
    resolver: zodResolver(wdSchema),
  });

  const onSubmit = async (data: WdSchema) => {
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
            <div  className=' w-full flex flex-col gap-1'>
              <Label className=' mt-2 text-zinc-500'>Start Day Of Wellness Day Cycle:</Label>
              <Controller
                name="startdate"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <DatePicker
                    selected={value && !isNaN(Date.parse(value)) ? new Date(value) : null} 
                    onChange={(date) => {
                      if (date) {
                        onChange(format(date, "yyyy-MM-dd"));
                        setWellnessDay(calculateWellnessDay(date));
                      }
                    }}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="DD/MM/YYYY"
                    className="w-full rounded-sm text-xs h-9 px-3 bg-zinc-100 z-[9999] relative"
                    onKeyDown={(e) => e.preventDefault()}
                    filterDate={(date) => {
                      const day = date.getDay();
                      const dateOfMonth = date.getDate();
                      const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
                    
                      const adjustedDate = dateOfMonth + firstDayOfMonth;
                      const weekOfMonth = Math.ceil(adjustedDate / 7);
                    
                      return (day === 1 || day === 2)
                    }}
                  />
                )}
              />

              {errors.startdate && (
                <p className="text-[.6em] text-red-500">{errors.startdate.message}</p>
              )}


            </div>

            <div  className=' w-full'>
              <Label className=' mt-2 text-zinc-500'>This is your Wellness Day. <span className=' text-red-700'>*</span></Label>
              <Input 
                disabled 
                type="text" 
                value={wellnessDay} 
                className="text-xs h-[35px] bg-zinc-200"
              />



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
            <p className=' text-xs text-zinc-500'>• For staff who are working towards a Wellness Day, any leave (sick or other) fortnightly cycle will be deducted in 8.5hr days (not 7.6hr days).</p>
            <p className=' text-xs text-zinc-500'>• Unless approved, a minimum of 8 hours must be spent on billable project work each day to qualify for the
Wellness Day.</p>

          </div>

          <div className=' mt-8 flex items-center gap-2'>
             <input
              type="checkbox"
              {...register("declaration", { setValueAs: boolean })} // Correctly handle as boolean
            />
            <p className=' text-xs text-zinc-500'>I acknowledge that I understand and agree to the contents of this application.</p>

          </div>
          {errors.declaration && <p className=' text-[.6em] text-red-500'>{errors.declaration.message}</p>}


          <button disabled={loading} className=' bg-red-700 text-zinc-100 px-4 py-3 text-xs rounded-sm mt-4 flex items-center justify-center gap-2'>
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
