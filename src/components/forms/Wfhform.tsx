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


export default function Wfhform( prop: Data) {
  const [dialog, setDialog] = useState(false)

   const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<WfhSchema>({
    resolver: zodResolver(wfhSchema),
  });

  const onSubmit = (data: WfhSchema) => {
    const {declaration, ...filteredData} = data
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
        <p className=' text-sm uppercase font-semibold text-red-700'>Work from home application form</p>
        <div className=' w-full flex flex-col gap-1'>
          <p className=' text-xs font-semibold mb-2'>Employee Details</p>
          <label htmlFor="" className=' text-xs text-zinc-700'>Name</label>
          <Input type='text' className=' text-xs h-[35px] bg-zinc-200' placeholder='Name' {...register('name')}/>
           {errors.name && <p className=' text-[.6em] text-red-500'>{errors.name.message}</p>}


          <Label className=' mt-4 font-semibold'>Work From Home Details</Label>

           <Label className=' mt-2 text-zinc-500'>Date of Birth: <span className=' text-red-700'>*</span></Label>
            <Input type='date' className=' text-xs h-[35px] bg-zinc-200 w-fit' placeholder='Name' {...register('dateofbirth')}/>
            {errors.dateofbirth && <p className=' text-[.6em] text-red-500'>{errors.dateofbirth.message}</p>}


            <div className=' flex items-center gap-2 mt-4'>
            <Label className=' text-zinc-500'>Are you in a Wellness Day Cycle? <span className=' text-red-500'>*</span></Label>
            <RadioGroup defaultValue="Yes" className=' flex items-center gap-2' {...register('wdcycle')}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Yes" id="Yes" />
                <Label htmlFor="Yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="No" id="No" />
                <Label htmlFor="No">No</Label>
              </div>
            </RadioGroup>
            </div>


          {/* <div className=' w-full flex items-center gap-2'>
            <div className=' w-full'>
              <Label className=' mt-2 text-zinc-500'>Total Number of Working Days:</Label>
            < Input type='number' className=' text-xs h-[35px] bg-zinc-200' placeholder='0'/>
            </div>

            <div className=' w-full'>
              <Label className=' mt-2 text-zinc-500'>Total Public Holidays(if applicable)</Label>
            < Input type='number' className=' text-xs h-[35px] bg-zinc-200' placeholder='0'/>
            </div>
          </div> */}

          

          <div className=' w-full flex items-center gap-2 mt-4'>
            <div className=' w-full'>
              <Label className=' text-zinc-500'>Total Hours Working From Home:</Label>
            < Input type='number' className=' text-xs h-[35px] bg-zinc-200' placeholder='0' {...register('totalhourswfh')}/>
            {errors.totalhourswfh && <p className=' text-[.6em] text-red-500'>{errors.totalhourswfh.message}</p>}

            </div>

            <div className=' w-full'>
              <Label className=' text-zinc-500'>Hours Of Leave:</Label>
            < Input type='number' className=' text-xs h-[35px] bg-zinc-200' placeholder='0' {...register('hoursofleave')}/>
            {errors.hoursofleave && <p className=' text-[.6em] text-red-500'>{errors.hoursofleave.message}</p>}

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
