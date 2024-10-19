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


export default function Leaveformadmin( prop: Data) {
  const [dialog, setDialog] = useState(false)
  return (
    <Dialog >
    <DialogTrigger>
       {prop.children}
    </DialogTrigger>
    <DialogContent className=' max-h-[90%] overflow-y-auto'>
      <form className=' w-full p-4 flex flex-col gap-4'>
        <p className=' text-sm uppercase font-semibold text-red-700'>Leave request form</p>
        <div className=' w-full flex flex-col gap-1'>
          <p className=' text-xs font-semibold mb-2'>Employee Details</p>
          <label htmlFor="" className=' text-xs text-zinc-700'>Name</label>
          <Input type='text' className=' text-xs h-[35px] bg-zinc-200' placeholder='Name'/>

          <label htmlFor="" className=' text-xs text-zinc-700'>Type <span className=' text-red-500'>*</span></label>

            <RadioGroup defaultValue="Annual Leave" className=' w-full grid grid-cols-3'>
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
          <Textarea placeholder='Please input text here' className=' text-xs bg-zinc-200'/>

          <Label className=' mt-4 font-semibold'>Period Of Leave</Label>
          <div className=' flex items-center gap-4'>
            <div>
              <Label className=' mt-2 text-zinc-500'>First Day Of Leave:</Label>
              <Input type='date' className=' text-xs h-[35px] bg-zinc-200' placeholder='Name'/>

            </div>

            <div>
              <Label className=' mt-2 text-zinc-500'>Last Day Of Leave:</Label>
              <Input type='date' className=' text-xs h-[35px] bg-zinc-200' placeholder='Name'/>

            </div>

          </div>

          <div className=' w-full flex items-center gap-2'>
            <div className=' w-full'>
              <Label className=' mt-2 text-zinc-500'>Total Number of Working Days:</Label>
            < Input type='number' className=' text-xs h-[35px] bg-zinc-200' placeholder='0'/>
            </div>

            <div className=' w-full'>
              <Label className=' mt-2 text-zinc-500'>Total Public Holidays(if applicable)</Label>
            < Input type='number' className=' text-xs h-[35px] bg-zinc-200' placeholder='0'/>
            </div>
          </div>

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
              <Label className=' text-zinc-500'>Total Working Hours on Leave:</Label>
            < Input type='number' className=' text-xs h-[35px] bg-zinc-200' placeholder='0'/>
            </div>

            <div className=' w-full'>
              <Label className=' text-zinc-500'>Total Working Hours During Leave:</Label>
            < Input type='number' className=' text-xs h-[35px] bg-zinc-200' placeholder='0'/>
            </div>
          </div>

           <Label className=' mt-2 text-zinc-500'>Comments:</Label>
          <Textarea placeholder='Please input text here' className=' text-xs bg-zinc-200'/>


          <div className=' flex items-center gap-4 mt-4'>
            <button className=' border-[1px] border-red-700 px-4 py-2 text-xs rounded-sm mt-4 w-auto'>Deny</button>
            <button className=' bg-red-700 text-zinc-100 px-4 py-2 text-xs rounded-sm mt-4 w-auto'>Approved</button>

          </div>


         
        </div>

      </form>
    </DialogContent>
    </Dialog>

  )
}
