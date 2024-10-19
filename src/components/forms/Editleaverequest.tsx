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


export default function Editleaverequest( prop: Data) {
  const [dialog, setDialog] = useState(false)
  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [details, setDetails] = useState('')
  const [startdate, setStartdate] = useState('')
  const [enddate, setEnddate] = useState('')
  const [cycle, setCycle] = useState('Yes')
  const [totalhoursonleave, setTotalhours] = useState('')
  const [duringleave, setDuringleave] = useState('')
  const [workingdays, setWorkingdays] = useState('')
  const [holidays,setHolidays] = useState('')

   const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LeaveSchema>({
    resolver: zodResolver(leaveSchema),
  });

  const onSubmit = (data: LeaveSchema) => {
    console.log(data); // Handle form submission
  };

  useEffect(() => {
    reset()
  },[dialog])

  console.log(errors)

   const handleRadioChange = (value: string) => {
    setCycle(value);
    
  };

  
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

            <RadioGroup defaultValue="Annual Leave" className=' w-full grid grid-cols-3' {...register('type')}>
              <div className=' flex flex-col gap-2'>
                <div className="flex items-center space-x-2">
                <RadioGroupItem value="Annual Leave" id="Annual Leave" />
                <Label htmlFor="Annual Leave">Annual leave</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Sick Leave" id="SickLeave" />
                  <Label htmlFor="SickLeave">Sick Leave</Label>
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
              <Input type='date' className=' text-xs h-[35px] bg-zinc-200' placeholder='Name' {...register('startdate')}/>
              {errors.startdate && <p className=' text-[.6em] text-red-500'>{errors.startdate.message}</p>}
            </div>

            <div>
              <Label className=' mt-2 text-zinc-500'>Last Day Of Leave: <span className=' text-red-500'>*</span></Label>
              <Input type='date' className=' text-xs h-[35px] bg-zinc-200' placeholder='Name' {...register('enddate')}/>
              {errors.enddate && <p className=' text-[.6em] text-red-500'>{errors.enddate.message}</p>}

            </div>

          </div>

          <div className=' w-full flex items-start gap-2'>
            <div className=' w-full'>
              <Label className=' mt-2 text-zinc-500'>Total Number of Working Days:</Label>
            < Input type='number' defaultValue={0} className=' text-xs h-[35px] bg-zinc-200' placeholder='0' {...register('workingdays',{ valueAsNumber: true})}/>
              {errors.workingdays && <p className=' text-[.6em] text-red-500'>{errors.workingdays.message}</p>}

            </div>

            <div className=' w-full'>
              <Label className=' mt-2 text-zinc-500'>Total Public Holidays(if applicable)</Label>
            < Input type='number' defaultValue={0} className=' text-xs h-[35px] bg-zinc-200' placeholder='0' {...register('holidays',{ valueAsNumber: true})}/>
              {errors.holidays && <p className=' text-[.6em] text-red-500'>{errors.holidays.message}</p>}

            </div>
          </div>

          {/* <div className=' flex items-center gap-2 mt-4'>
            <Label className=' text-zinc-500'>Are you in a Wellness Day Cycle? <span className=' text-red-500'>*</span></Label>
            <RadioGroup defaultValue="Yes"  className=' flex items-center gap-2' {...register('wdcycle')} >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Yes" id="Yes"  />
                <Label htmlFor="Yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="No" id="No" />
                <Label htmlFor="No">No</Label>
              </div>
            </RadioGroup>
          </div> */}

          <div className=' w-full flex items-start gap-2 mt-4'>
            <div className=' w-full'>
              <Label className=' text-zinc-500'>Total Working Hours on Leave:</Label>
            < Input type='number' defaultValue={0} className=' text-xs h-[35px] bg-zinc-200' placeholder='0' {...register('totalhoursonleave',{ valueAsNumber: true})}/>
              {errors.totalhoursonleave && <p className=' text-[.6em] text-red-500'>{errors.totalhoursonleave.message}</p>}

            </div>

            <div className=' w-full'>
              <Label className=' text-zinc-500'>Total Working Hours During Leave:</Label>
            < Input type='number' defaultValue={0} className=' text-xs h-[35px] bg-zinc-200' placeholder='0' {...register('duringleave',{ valueAsNumber: true})}/>
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