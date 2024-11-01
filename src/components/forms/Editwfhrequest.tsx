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
import { Plus } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { WfhSchema, wfhSchema } from '@/schema/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { boolean } from 'zod'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'


interface Data {
   
     children?: React.ReactNode;
    requestid: string
    requestdate: string
    requestend:string
    wellnessdaycycle: boolean
    totalhourswfh: number


}

type Caculate = {
  totalworkingdays:  number
  inwellnessday: boolean
  totalHoliday:  number
  totalworkinghoursonleave:  number
  workinghoursduringleave: number
}


export default function Editwfhrequest( prop: Data) {
  const [dialog, setDialog] = useState(false)
  const [loading, setLoading] = useState(false)
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [wd, setWd] = useState('Yes')
  const [totalhrs, setTotalhrs] = useState('')
  const router = useRouter()



   const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<WfhSchema>({
    resolver: zodResolver(wfhSchema),
    defaultValues:{
      wdcycle: prop.wellnessdaycycle === true ? 'Yes' : 'No',
      startdate: prop.requestdate,
      enddate: prop.requestend,
      totalhoursonleave: prop.totalhourswfh,


    }
  });

  const editrequestWfh = async (data: WfhSchema) => {
    const { declaration, ...filteredData } = data;
    setLoading(true)
    router.push('?state=true')
    try {
      const request = axios.post(`${process.env. NEXT_PUBLIC_API_URL}/wfh/editrequestwfh`,{
        requestid: prop.requestid,
        requestdate: data.startdate, // Format YYYY-MM-DD
        requestend: data.enddate, // Format YYYY-MM-DD
        wellnessdaycycle: data.wdcycle === 'Yes' ? true : false ,
        totalhourswfh: hoursonleave,
        hoursofleave: data.duringleave,
        reason: data.reason
       
      },
          {
              withCredentials: true,
              headers: {
              'Content-Type': 'application/json'
              }
          }
      )

    const response = await toast.promise(request, {
        loading: 'Updating wfh request....',
        success: `Successfully updated`,
        error: 'Error while updating wfh request',
    });

   if(response.data.message === 'success'){
     reset()
     setDialog(false)
     router.push('?state=false')
     setLoading(false)

   }

   console.log(response)

 
     
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

   const [holidays, setHolidays] = useState(0)
   const [onLeave, setOnleave] = useState(0)
   const hours = wd === 'Yes' ? 8.44 : 7.6

 
 
   function totalWorkingDays(): number {
     const startDate = new Date(start)
     const endDate = new Date(end)
     let workingDays = 0;
 
     for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
         const dayOfWeek = date.getDay();
         if (dayOfWeek !== 0 && dayOfWeek !== 6) {
             workingDays++;
         }
     }
 
 
     return workingDays;
 }
 

 
   const workingDays = totalWorkingDays() - holidays;
   const hoursonleave = ((totalWorkingDays() - holidays) * hours) - onLeave


 console.log(errors)
 
 


  return (
    <Dialog open={dialog} onOpenChange={setDialog}>
    <DialogTrigger>
       {prop.children}
    </DialogTrigger>
    <DialogContent className=' max-h-[90%] overflow-y-auto'>
      <form className=' w-full p-4 flex flex-col gap-4' onSubmit={handleSubmit(editrequestWfh)}>
        <p className=' text-sm uppercase font-semibold text-red-700 flex items-center gap-2'><span className=' p-2 bg-red-600 text-xs text-white'>Edit</span>Work from home application form</p>
        <div className=' w-full flex flex-col gap-1'>

        <Label className=' mt-4 font-semibold'>Wfh Period</Label>
          <div className=' flex items-center gap-4'>
            <div>
              <Label className=' mt-2 text-zinc-500'>First Day Of Leave: <span className=' text-red-500'>*</span></Label>
              <Input type='date' value={start} className=' text-xs h-[35px] bg-zinc-200'  placeholder='Name' {...register('startdate',{ onChange: (e) => setStart(e.target.value)})}/>
              {errors.startdate && <p className=' text-[.6em] text-red-500'>{errors.startdate.message}</p>}
            </div>

            <div>
              <Label className=' mt-2 text-zinc-500'>Last Day Of Leave: <span className=' text-red-500'>*</span></Label>
              <Input type='date' value={end} className=' text-xs h-[35px] bg-zinc-200' placeholder='Name' {...register('enddate', { onChange: (e) => setEnd(e.target.value)})}/>
              {errors.enddate && <p className=' text-[.6em] text-red-500'>{errors.enddate.message}</p>}

            </div>

  

          </div>
        

            {/* <div className=' w-full flex items-start gap-2'>
            <div className=' w-full'>
              <Label className=' mt-2 text-zinc-500'>Total Number of Working Days:</Label>
            < Input type='number' value={workingDays} className=' text-xs h-[35px] bg-zinc-200' placeholder='0' {...register('workingdays', { valueAsNumber: true})}/>
              {errors.workingdays && <p className=' text-[.6em] text-red-500'>{errors.workingdays.message}</p>}

            </div>

            <div className=' w-full'>
              <Label className=' mt-2 text-zinc-500'>Total Public Holidays(if applicable)</Label>
            < Input type='number' value={holidays} defaultValue={0} className=' text-xs h-[35px] bg-zinc-200' placeholder='0' {...register('holidays',{ valueAsNumber: true, onChange: (e) => setHolidays(e.target.value)})}/>
              {errors.holidays && <p className=' text-[.6em] text-red-500'>{errors.holidays.message}</p>}

            </div>
          </div> */}

          <div className=' flex items-center gap-2 mt-4'>
            <Label className=' text-zinc-500'>Are you in a Wellness Day Cycle? <span className=' text-red-500'>*</span></Label>
            <RadioGroup className=' flex items-center gap-2' value={watch('wdcycle')}  onValueChange={(value) => {setValue('wdcycle', value), setWd(value)}} >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Yes" id="Yes"  />
                <Label htmlFor="Yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="No" id="No" />
                <Label htmlFor="No">No</Label>
              </div>
            </RadioGroup>
          </div>

          <div className=' w-full flex items-start gap-2 mt-4'>
            <div className=' w-full'>
              <Label className=' text-zinc-500'>Total Working Hours</Label>
            < Input type='number' value={hoursonleave.toLocaleString()} defaultValue={0} className=' text-xs h-[35px] bg-zinc-200' placeholder='0' {...register('totalhoursonleave',{ valueAsNumber: true})}/>
              {errors.totalhoursonleave && <p className=' text-[.6em] text-red-500'>{errors.totalhoursonleave.message}</p>}

            </div>

            <div className=' w-full'>
              <Label className=' text-zinc-500'>Hours of Leave:</Label>
            < Input type='number' value={onLeave}  defaultValue={0} className=' text-xs h-[35px] bg-zinc-200' placeholder='0' {...register('duringleave',{ valueAsNumber: true, onChange: (e) => setOnleave(e.target.value)})}/>
              {errors.duringleave && <p className=' text-[.6em] text-red-500'>{errors.duringleave.message}</p>}

            </div>
          </div>

          <Label className=' mt-2 text-zinc-500'>Reason for Work From Home: <span className=' text-red-700'>*</span></Label>
          <Textarea placeholder='Please input text here' className=' text-xs bg-zinc-200' {...register('reason')}/>
          {errors.reason && <p className=' text-[.6em] text-red-500'>{errors.reason.message}</p>}



          <p className=' text-xs text-zinc-500 mt-4'>Note: <span className=' text-red-500'>*</span><span className=' italic'>- Required</span></p>

          <div className=' mt-8 flex items-center gap-2'>
             <input
              type="checkbox"
              {...register("declaration", { setValueAs: boolean })} // Correctly handle as boolean
            />
            <p className=' text-xs text-zinc-500'>I declare that the provided information is true and accurate.</p>

          </div>
          {errors.declaration && <p className=' text-[.6em] text-red-500'>{errors.declaration.message}</p>}

          <button className=' bg-red-700 text-zinc-100 px-4 py-2 text-xs rounded-sm mt-4'>Submit</button>

         
        </div>

      </form>
    </DialogContent>
    </Dialog>

  )
}
