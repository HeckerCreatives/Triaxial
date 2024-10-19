" use client"
import React, { useState } from 'react'
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


export default function Wfhformadmin( prop: Data) {
  const [dialog, setDialog] = useState(false)
  return (
    <Dialog >
    <DialogTrigger>
       {prop.children}
    </DialogTrigger>
    <DialogContent className=' max-h-[90%] overflow-y-auto'>
      <form className=' w-full p-4 flex flex-col gap-4'>
        <p className=' text-sm uppercase font-semibold text-red-700'>Work from home application form</p>
        <div className=' w-full flex flex-col gap-1'>
          <p className=' text-xs font-semibold mb-2'>Employee Details</p>
          <label htmlFor="" className=' text-xs text-zinc-700'>Name</label>
          <Input type='text' className=' text-xs h-[35px] bg-zinc-200' placeholder='Name'/>

          <Label className=' mt-4 font-semibold'>Work From Home Details</Label>

           <Label className=' mt-2 text-zinc-500'>Date of Birth: <span className=' text-red-700'>*</span></Label>
            <Input type='date' className=' text-xs h-[35px] bg-zinc-200 w-fit' placeholder='Name'/>

            <div className=' flex items-center gap-2 mt-4'>
            <Label className=' text-zinc-500'>Are you in a Wellness Day Cycle? <span className=' text-red-500'>*</span></Label>
            <RadioGroup defaultValue="option-one" className=' flex items-center gap-2'>
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
          

          <div className=' w-full flex items-center gap-2 mt-4'>
            <div className=' w-full'>
              <Label className=' text-zinc-500'>Total Hours Working From Home:</Label>
            < Input type='number' className=' text-xs h-[35px] bg-zinc-200' placeholder='0'/>
            </div>

            <div className=' w-full'>
              <Label className=' text-zinc-500'>Hours Of Leave:</Label>
            < Input type='number' className=' text-xs h-[35px] bg-zinc-200' placeholder='0'/>
            </div>
          </div>

          <Label className=' mt-2 text-zinc-500'>Reason for Work From Home: <span className=' text-red-700'>*</span></Label>
          <Textarea placeholder='Please input text here' className=' text-xs bg-zinc-200'/>

          <Label className=' mt-2 text-zinc-500'>Comment</Label>
          <Textarea placeholder='Comment' className=' text-xs bg-zinc-200'/>


         

          <div className=' flex items-center gap-4 mt-8'>
            <button className=' border-[1px] border-red-700 px-4 py-2 text-xs rounded-sm mt-4 w-auto'>Deny</button>
            <button className=' bg-red-700 text-zinc-100 px-4 py-2 text-xs rounded-sm mt-4 w-auto'>Approved</button>

          </div>


         
        </div>

      </form>
    </DialogContent>
    </Dialog>

  )
}
