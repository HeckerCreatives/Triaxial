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


export default function Editwdrequest( prop: Data) {
  const [dialog, setDialog] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    unregister,
    formState: { errors },
  } = useForm<WdSchema>({
    resolver: zodResolver(wdSchema),
  });

  const onSubmit = (data: WdSchema) => {
    const { declaration, ...filteredData } = data;
    console.log(filteredData); // Handle form submission
  };

  useEffect(() => {
    reset()
  },[dialog])

  
  return (
    <Dialog open={dialog} onOpenChange={setDialog}>
    <DialogTrigger>
       {prop.children}
    </DialogTrigger>
    <DialogContent className=' max-h-[90%] overflow-y-auto'>
      <form className=' w-full p-4 flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
        <p className=' text-sm uppercase font-semibold text-red-700 flex items-center gap-2'><span className=' text-xs uppercase font-semibold px-4 py-1 bg-red-700 text-zinc-100'>Edit</span>Wellness Day application Form</p>
        <div className=' w-full flex flex-col gap-1'>
          <p className=' text-xs font-semibold mb-2'>Employee Details</p>
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

            {/* <div className=' w-full'> 
              <Label className=' mt-2 text-zinc-500'>This will be your Wellness Day:</Label>
              <Input type='date' className=' text-xs h-[35px] bg-zinc-200' placeholder='Name' {...register('enddate')}/>

            </div> */}

          </div>

          {/* <div className=' w-full flex items-center gap-2 mt-4'>
            <div className=' w-full'>
              <Label className=' text-zinc-500'>Total Number Of Working Days:</Label>
            < Input type='number' className=' text-xs h-[35px] bg-zinc-200' placeholder='0' {...register('totalworkingdays')}/>
              {errors.totalworkingdays && <p className=' text-[.6em] text-red-500'>{errors.totalworkingdays.message}</p>}

            </div>

            <div className=' w-full'>
              <Label className=' text-zinc-500'>Total Working Hours During Wellness Day Cycle:</Label>
            < Input type='number' className=' text-xs h-[35px] bg-zinc-200' placeholder='0' {...register('totalhoursduring')}/>
              {errors.totalhoursduring && <p className=' text-[.6em] text-red-500'>{errors.totalhoursduring.message}</p>}

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


          <button className=' bg-red-700 text-zinc-100 px-4 py-2 text-xs rounded-sm mt-4'>Submit</button>

         
        </div>

      </form>
    </DialogContent>
    </Dialog>

  )
}
