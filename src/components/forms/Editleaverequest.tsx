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
import { leaveType } from '@/types/data'
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'


interface Data {
     children?: React.ReactNode;
      requestid: string
      type: number
      startdate: string
      enddate: string
      totalpublicholidays: number
      wellnessdaycycle: boolean
      workinghoursduringleave: number  
      workinghoursonleave: number
      totalworkingdays:  number
      details:  string
}


export default function Editleaverequest( prop: Data) {
  const [dialog, setDialog] = useState(false)
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [wd, setWd] = useState('Yes')
  const [type, setType] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const [holidays, setHolidays] = useState(0)
  const [onLeave, setOnleave] = useState(0)
  const [totaldays, setTotaldays] = useState(0)
  const hours = wd === 'Yes' ? 8.44 : 7.6
 


  const findType = (id: number) => {
    const find = leaveType.find((item) => item.id === id)
    return find?.type
  }

  const getID = (id: string) => {
    const find = leaveType.find((item) => item.type === id)
    return find?.id
  }


   const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LeaveSchema>({
    resolver: zodResolver(leaveSchema),
    defaultValues:{
      wdcycle: prop.wellnessdaycycle === true ? 'Yes' : 'No',
     type: findType(prop.type),
     startdate: prop.startdate,
     enddate: prop.enddate,
     holidays: prop.totalpublicholidays,
     duringleave: prop.workinghoursduringleave,
     totalhoursonleave: prop.workinghoursonleave,
     details: prop.details,
     workingdays: prop.totalworkingdays
    }
  });

  const onSubmit = async (data: LeaveSchema) => {
    setLoading(true)
    router.push('?state=true')
    try {
      const request = axios.post(`${process.env. NEXT_PUBLIC_API_URL}/leave/editrequestleave`,{
        requestid: prop.requestid,
        leavetype: getID(data.type), // 0 to total number of types
        details: data.details,
        leavestart: data.startdate, // YYYY-MM-DD
        leaveend: data.enddate, // YYYY-MM-DD
        totalworkingdays: data.workingdays,
        totalpublicholidays: data.holidays,
        wellnessdaycycle: data.wdcycle === 'Yes' ? true : false,
        workinghoursonleave: data.totalhoursonleave,
        workinghoursduringleave: data.duringleave,
        comments: ""
       
      },
          {
              withCredentials: true,
              headers: {
              'Content-Type': 'application/json'
              }
          }
      )

    const response = await toast.promise(request, {
        loading: 'Updating leave request....',
        success: `Successfully updated`,
        error: 'Error while updating leave rquest',
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

useEffect(()=> {
  setStart(prop.startdate)
  setEnd(prop.enddate)
  setOnleave(prop.workinghoursduringleave)
  setTotaldays(prop.totalworkingdays)
  setValue('workingdays', prop.totalworkingdays)
},[])

useEffect(() => {
  setTotaldays(workingDays)
  setValue('workingdays', workingDays)
},[start, end])



  
  return (
    <Dialog open={dialog} onOpenChange={setDialog}>
    <DialogTrigger>
       {prop.children}
    </DialogTrigger>
    <DialogContent className=' max-h-[90%] overflow-y-auto'>
      <form className=' w-full p-4 flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
        <p className=' text-sm uppercase font-semibold text-red-700 flex items-center gap-2'><span className=' text-xs uppercase font-semibold px-4 py-1 bg-red-700 text-zinc-100'>Edit</span>Leave request form</p>
        <div className=' w-full flex flex-col gap-1'>
          {/* <p className=' text-xs font-semibold mb-2'>Employee Details</p>
          <label htmlFor="" className=' text-xs text-zinc-700'>Name</label>
          <Input type='text' className=' text-xs h-[35px] bg-zinc-200' placeholder='Name' {...register('name')}/>
           {errors.name && <p className=' text-[.6em] text-red-500'>{errors.name.message}</p>} */}

          <label htmlFor="" className=' text-xs text-zinc-700'>Type <span className=' text-red-500'>*</span></label>

            <RadioGroup defaultValue="Annual Leave" className=' w-full grid grid-cols-3' value={watch('type')}  onValueChange={(value) => {setValue('type', value), setType(value)}}>
            <div className=' flex flex-col gap-2'>
                <div className="flex items-center space-x-2">
                <RadioGroupItem value="Annual Leave" id="Annual Leave" />
                <Label htmlFor="Annual Leave">Annual leave</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Sick Leave" id="Sick Leave" />
                  <Label htmlFor="Sick Leave">Sick Leave</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Carer's Leave" id="Carer's Leave" />
                  <Label htmlFor="Carer's Leave">Carer's Leave</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Bereavement Leave" id="Bereavement Leave" />
                  <Label htmlFor="Bereavement Leave">Bereavement Leave</Label>
                </div>
              </div>

              <div className=' flex flex-col gap-2'>
                <div className="flex items-center space-x-2">
                <RadioGroupItem value="Study Leave" id="Study Leave" />
                <Label htmlFor="Study Leave">Study leave</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Long Services Leave" id="Long Services Leave" />
                  <Label htmlFor="Long Services Leave">Long Services Leave</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Anniversary Day" id="Anniversary Day" />
                  <Label htmlFor="Anniversary Day">Anniversary Day</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Paid Parental Leave" id="Paid Parental Leave" />
                  <Label htmlFor="Paid Parental Leave">Paid Parental Leave</Label>
                </div>
              </div>

              <div className=' flex flex-col gap-2'>
                <div className="flex items-center space-x-2">
                <RadioGroupItem value="Time in Lieu" id="Time in Lieu" />
                <Label htmlFor="Time in Lieu">Time in Lieu</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Leave Without Pay" id="Leave Without Pay" />
                  <Label htmlFor="Leave Without Pay">Leave Without Pay</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Other Leave" id="Other Leave" />
                  <Label htmlFor="Other Leave">Other Leave</Label>
                </div>
                  <Label htmlFor="" className=' text-zinc-400'>Includes Community Service, Maternity & Miscellaneous leave</Label>
              </div>
              
             
            </RadioGroup>

          <Label className=' mt-2 text-zinc-500'>Details:</Label>
          <Textarea placeholder='Please input text here' className=' text-xs bg-zinc-200' {...register('details')}/>

          <Label className=' mt-4 font-semibold'>Period Of Leave</Label>
          <div className=' flex items-center gap-4'>
            <div>
              <Label className=' mt-2 text-zinc-500'>First Day Of Leave: <span className=' text-red-500'>*</span></Label>
              <Input type='date' className=' text-xs h-[35px] bg-zinc-200' placeholder='Name' {...register('startdate',{ onChange: (e) => setStart(e.target.value)})}/>
              {errors.startdate && <p className=' text-[.6em] text-red-500'>{errors.startdate.message}</p>}
            </div>

            <div>
              <Label className=' mt-2 text-zinc-500'>Last Day Of Leave: <span className=' text-red-500'>*</span></Label>
              <Input type='date' className=' text-xs h-[35px] bg-zinc-200' placeholder='Name' {...register('enddate', { onChange: (e) => setEnd(e.target.value)})}/>
              {errors.enddate && <p className=' text-[.6em] text-red-500'>{errors.enddate.message}</p>}

            </div>

          </div>

          <div className=' w-full flex items-start gap-2'>
            <div className=' w-full'>
              <Label className=' mt-2 text-zinc-500'>Total Number of Working Days:</Label>
            <Input disabled type='number' value={totaldays} className=' text-xs h-[35px] bg-zinc-200' {...register('workingdays', { valueAsNumber: true , onChange: (e) => setTotaldays(e.target.value)})}/>
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
              <Label className=' text-zinc-500'>Total Working Hours on Leave:</Label>
            < Input disabled type='number' value={hoursonleave} className=' text-xs h-[35px] bg-zinc-200' placeholder='0' {...register('totalhoursonleave',{ valueAsNumber: true})}/>
              {errors.totalhoursonleave && <p className=' text-[.6em] text-red-500'>{errors.totalhoursonleave.message}</p>}

            </div>

            <div className=' w-full'>
              <Label className=' text-zinc-500'>Total Working Hours During Leave:</Label>
            < Input type='number' value={onLeave} defaultValue={0} className=' text-xs h-[35px] bg-zinc-200' placeholder='0' {...register('duringleave',{ valueAsNumber: true, onChange: (e) => setOnleave(e.target.value)})}/>
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