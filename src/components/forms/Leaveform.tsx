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
import { useForm } from 'react-hook-form'
import { leaveSchema, LeaveSchema } from '@/schema/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { boolean, number, string } from 'zod'
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { start } from 'repl'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";



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

type Caculate = {
  totalworkingdays:  number
  inwellnessday: boolean
  totalHoliday:  number
  totalworkinghoursonleave:  number
  workinghoursduringleave: number
}

type Holidays = {
  grandTotal: number
}


export default function Leaveform( prop: Data) {
  const [dialog, setDialog] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [wd, setWd] = useState('No')
  const [total, setTotal] = useState(0)
  const [isWellnessday, setIswellnessday] = useState(false)


   const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<LeaveSchema>({
    resolver: zodResolver(leaveSchema),
    defaultValues:{
      type: '0',
      wdcycle: 'No'
    }
  });

  const onSubmit = async (data: LeaveSchema) => {
    const { declaration, ...filteredData } = data;
    setLoading(true)
    router.push('?state=true')
    if(isWellnessday === false){
      try {
        const request = axios.post(`${process.env. NEXT_PUBLIC_API_URL}/leave/requestleave`,{
        leavetype: data.type, // 0 to total number of types
        details: data.details,
        leavestart: data.startdate, // YYYY-MM-DD
        leaveend: data.enddate, // YYYY-MM-DD
        comments: '',
        totalworkingdays: data.workingdays,
        totalpublicholidays: data.holidays,
        wellnessdaycycle: data.wdcycle === 'Yes' ? true : false,
        workinghoursonleave: data.totalhoursonleave,
        workinghoursduringleave: data.duringleave
         
        },
            {
                withCredentials: true,
                headers: {
                'Content-Type': 'application/json'
                }
            }
        )
  
      const response = await toast.promise(request, {
          loading: 'Requesting a leave....',
          success: `Successfully rquested`,
          error: 'Error while requesting a leave',
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
    }else {
      toast.error('The dates you entered falls within the wellnessday dates.')
    }
    
  };

  const [holidays, setHolidays] = useState(0)
  const [onLeave, setOnleave] = useState(0)
  const hours = wd === 'No' ?  7.6 : 8.44 


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

  useEffect(() => {
    reset()
    totalWorkingDays()
  },[dialog])

  const workingDays = totalWorkingDays() - holidays;
  const hoursonleave = (((totalWorkingDays() - holidays) * hours) - onLeave)
  useEffect(() => {
    setValue('workingdays', workingDays); // Update form value whenever workingDays changes
    setValue('totalhoursonleave', hoursonleave)
}, [workingDays, setValue, hoursonleave, wd]);

  const startDateValue = watch("startdate")
  ? new Date(watch("startdate"))
  : null;

  const endDateValue = watch("enddate")
  ? new Date(watch("enddate"))
  : null;

  useEffect(() => {
    const getData = async () => {
      if(start !== '' && end !== ''){
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/events/gettotalholidays?startdate=${start}&enddate=${end}`,{
          withCredentials: true
        }
          
        )
  
        setHolidays(response.data.data.grandTotal)
      }
    
    }
    getData()
  },[start, end])

  useEffect(() => {
    const getData = async () => {
      if(start !== '' && end !== ''){
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/leave/checkwellnessdayinleave?startdate=${start}&enddate=${end}`,{
          withCredentials: true
        }

          
        )

        setIswellnessday(response.data.data.inwellnessday)

  
      }
    
    }
    getData()
  },[start, end])


  
  return (
    <Dialog open={dialog} onOpenChange={setDialog}>
    <DialogTrigger>
       {prop.children}
    </DialogTrigger>
    <DialogContent className=' max-h-[90%] overflow-y-auto overflow-auto'>
      <form className=' w-full p-4 flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
        <p className=' text-sm uppercase font-semibold text-red-700'>Leave request form</p>
        <div className=' w-full flex flex-col gap-1'>
          {/* <p className=' text-xs font-semibold mb-2'>Employee Details</p>
          <label htmlFor="" className=' text-xs text-zinc-700'>Name</label>
          <Input type='text' className=' text-xs h-[35px] bg-zinc-200' placeholder='Name' {...register('name')}/>
           {errors.name && <p className=' text-[.6em] text-red-500'>{errors.name.message}</p>} */}

          <label htmlFor="" className=' text-xs text-zinc-700'>Type <span className=' text-red-500'>*</span></label>

            <RadioGroup value={watch('type')}  onValueChange={(value) => setValue('type', value)} defaultValue="0" className=' w-full grid grid-cols-3' >
              <div className=' flex flex-col gap-2'>
                <div className="flex items-center space-x-2">
                <RadioGroupItem value="0" id="Annual Leave" />
                <Label htmlFor="Annual Leave">Annual leave</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1" id="SickLeave" />
                  <Label htmlFor="SickLeave">Sick Leave</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="2" id="Carer's Leave" />
                  <Label htmlFor="Carer's Leave">Carer's Leave</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="3" id="Bereavement Leave" />
                  <Label htmlFor="Bereavement Leave">Bereavement Leave</Label>
                </div>
              </div>

              <div className=' flex flex-col gap-2'>
                <div className="flex items-center space-x-2">
                <RadioGroupItem value="4" id="Study Leave" />
                <Label htmlFor="Study Leave">Study leave</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="5" id="Long Services Leave" />
                  <Label htmlFor="Long Services Leave">Long Service Leave</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="6" id="Anniversary Day" />
                  <Label htmlFor="Anniversary Day">Anniversary Day</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="7" id="Paid Parental Leave" />
                  <Label htmlFor="Paid Parental Leave">Paid Parental Leave</Label>
                </div>
              </div>

              <div className=' flex flex-col gap-2'>
                <div className="flex items-center space-x-2">
                <RadioGroupItem value="8" id="Time in Lieu" />
                <Label htmlFor="Time in Lieu">Time in Lieu</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="9" id="Leave Without Pay" />
                  <Label htmlFor="Leave Without Pay">Leave Without Pay</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="10" id="Other Leave" />
                  <Label htmlFor="Other Leave">Other Leave</Label>
                </div>
                  <Label htmlFor="" className=' text-zinc-400'>Includes Community Service, Maternity & Miscellaneous leave</Label>
              </div>
              
             
            </RadioGroup>

          <Label className=' mt-2 text-zinc-500'>Other Leave Details:</Label>
          <Textarea disabled={watch('type') !== '10'} placeholder='Please input text here' className=' text-xs bg-zinc-200' {...register('details')}/>

          <Label className=' mt-4 font-semibold'>Period Of Leave</Label>
          <div className=' flex items-center gap-4'>
            <div className=' flex items-center'>
              <Label className=' mt-2 text-zinc-500'>First Day Of Leave: <span className=' text-red-500'>*</span></Label>
              {/* <Input type='date' className=' text-xs h-[35px] bg-zinc-200'  placeholder='Name' {...register('startdate',{ onChange: (e) => setStart(e.target.value)})}/> */}
              <DatePicker
                selected={startDateValue} // Convert string to Date
                onChange={(date) =>{ setValue("startdate", date?.toISOString().split("T")[0] || ''); setStart(date?.toISOString().split("T")[0] || '')}} // Store as string
                dateFormat="dd/MM/yyyy"
                placeholderText="DD/MM/YYYY"
                className="bg-zinc-100 text-xs p-2 w-fit z-[9999] relative rounded-md"
                onKeyDown={(e) => e.preventDefault()}

              />
              {errors.startdate && <p className=' text-[.6em] text-red-500'>{errors.startdate.message}</p>}
            </div>

            <div className=' flex items-center'>
              <Label className=' mt-2 text-zinc-500'>Last Day Of Leave: <span className=' text-red-500'>*</span></Label>
              {/* <Input type='date' className=' text-xs h-[35px] bg-zinc-200' placeholder='Name' {...register('enddate', { onChange: (e) => setEnd(e.target.value)})}/> */}
              <DatePicker
                selected={endDateValue} // Convert string to Date
                onChange={(date) => {setValue("enddate", date?.toISOString().split("T")[0] || ''); setEnd(date?.toISOString().split("T")[0] || '')}} // Store as string
                dateFormat="dd/MM/yyyy"
                placeholderText="DD/MM/YYYY"
                className="bg-zinc-100 text-xs p-2 w-fit z-[9999] relative rounded-md"
                onKeyDown={(e) => e.preventDefault()}

              />
              {errors.enddate && <p className=' text-[.6em] text-red-500'>{errors.enddate.message}</p>}

            </div>

            {isWellnessday && (
              <p className=' text-[.7rem] max-w-[200px] text-zinc-500'>Note: The date you entered falls within the wellnessday, Please enter another dates.</p>
            )}
          </div>

          

          <div className=' w-full flex items-start gap-2'>
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
          </div>

          <div className=' flex items-center gap-2 mt-4'>
            <Label className=' text-zinc-500'>Are you in a Wellness Day Cycle? <span className=' text-red-500'>*</span></Label>
            <RadioGroup defaultValue="No"  className=' flex items-center gap-2' value={watch('wdcycle')}  onValueChange={(value) => {setValue('wdcycle', value), setWd(value)}} >
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
              <Label className=' text-zinc-500'>Total Working Hours on Leave:</Label>
            < Input type='number' value={hoursonleave.toLocaleString()} defaultValue={0} className=' text-xs h-[35px] bg-zinc-200' placeholder='0' {...register('totalhoursonleave',{ valueAsNumber: true})}/>
              {errors.totalhoursonleave && <p className=' text-[.6em] text-red-500'>{errors.totalhoursonleave.message}</p>}

            </div>

            <div className=' w-full'>
              <Label className=' text-zinc-500'>Total Working Hours During Leave:</Label>
            < Input type='number' value={onLeave}  defaultValue={0} className=' text-xs h-[35px] bg-zinc-200' placeholder='0' {...register('duringleave',{ valueAsNumber: true, onChange: (e) => setOnleave(e.target.value)})}/>
              {errors.duringleave && <p className=' text-[.6em] text-red-500'>{errors.duringleave.message}</p>}

            </div>
          </div>


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