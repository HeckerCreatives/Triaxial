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
import { leaveType } from '@/types/data'
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
     requestid: string
    manager:string
    status: string
    name:string
    type: number,
    leavestart: string
    leaveend: string
    totalworkingdays: number
    totalpublicholidays: number
    wellnessdaycycle: boolean
    workinghoursonleave: number
    workinghoursduringleave: number
    details: string

}


export default function Leaveformadmin( prop: Data) {
  const [dialog, setDialog] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loading1, setLoading1] = useState(false)
  const [comments, setComments] = useState('')
  const router = useRouter()

  const findType = (id: number) => {
    const find = leaveType.find((item) => item.id === id)

    return find?.type
  }

  const approved = async () => {
    setLoading(true)
    try {
      const request = axios.post(`${process.env. NEXT_PUBLIC_API_URL}/leave/superadminprocessleaverequest`,{
      requestid: prop.requestid,
      status: "Approved",
      comment : comments
       
      },
          {
              withCredentials: true,
              headers: {
              'Content-Type': 'application/json'
              }
          }
      )

    const response = await toast.promise(request, {
        loading: 'Approving leave request....',
        success: `Successfully approved`,
        error: 'Error while approving leave request',
    });

   if(response.data.message === 'success'){
    
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
  }

  const reject = async () => {
    setLoading1(true)
    try {
      const request = axios.post(`${process.env. NEXT_PUBLIC_API_URL}/leave/superadminprocessleaverequest`,{
      requestid: prop.requestid,
      status: "Rejected",
      comment : comments
       
      },
          {
              withCredentials: true,
              headers: {
              'Content-Type': 'application/json'
              }
          }
      )

    const response = await toast.promise(request, {
        loading: 'Approving leave request....',
        success: `Successfully approved`,
        error: 'Error while approving leave request',
    });

   if(response.data.message === 'success'){
    
     setDialog(false)
     router.push('?state=false')
     setLoading1(false)

   }

   console.log(response)

 
     
  } catch (error) {
      setLoading1(false)

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
  }

  
  return (
    <Dialog open={dialog} onOpenChange={setDialog} >
    <DialogTrigger>
       {prop.children}
    </DialogTrigger>
    <DialogContent className=' max-h-[90%] overflow-y-auto'>
      <div className=' w-full p-4 flex flex-col gap-4'>
        <p className=' text-sm uppercase font-semibold text-red-700'>Leave request form</p>
        <div className=' w-full flex flex-col gap-1'>
          <p className=' text-xs font-semibold mb-2'>Employee Details</p>
          <label htmlFor="" className=' text-xs text-zinc-700'>Name</label>
          <Input type='text' value={prop.name} className=' text-xs h-[35px] bg-zinc-200' placeholder='Name'/>

          <label htmlFor="" className=' text-xs text-zinc-700'>Type <span className=' text-red-500'>*</span></label>

            <RadioGroup defaultValue={findType(prop.type)} value={findType(prop.type)} className=' w-full grid grid-cols-3'>
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
          <Textarea value={prop.details} placeholder='Please input text here' className=' text-xs bg-zinc-200'/>

          <Label className=' mt-4 font-semibold'>Period Of Leave</Label>
          <div className=' flex items-center gap-4'>
            <div>
              <Label className=' mt-2 text-zinc-500'>First Day Of Leave:</Label>
              <Input type='date' value={prop.leavestart} className=' text-xs h-[35px] bg-zinc-200' placeholder='Name'/>

            </div>

            <div>
              <Label className=' mt-2 text-zinc-500'>Last Day Of Leave:</Label>
              <Input type='date' value={prop.leaveend} className=' text-xs h-[35px] bg-zinc-200' placeholder='Name'/>

            </div>

          </div>

          <div className=' w-full flex items-center gap-2'>
            <div className=' w-full'>
              <Label className=' mt-2 text-zinc-500'>Total Number of Working Days:</Label>
            < Input type='number' value={prop.totalworkingdays} className=' text-xs h-[35px] bg-zinc-200' placeholder='0'/>
            </div>

            <div className=' w-full'>
              <Label className=' mt-2 text-zinc-500'>Total Public Holidays(if applicable)</Label>
            < Input type='number' value={prop.totalpublicholidays} className=' text-xs h-[35px] bg-zinc-200' placeholder='0'/>
            </div>
          </div>

          <div className=' flex items-center gap-2 mt-4'>
            <Label className=' text-zinc-500'>Are you in a Wellness Day Cycle? <span className=' text-red-500'>*</span></Label>
            <RadioGroup defaultValue="Yes" value={prop.wellnessdaycycle === true ? 'Yes' : 'No'} className=' flex items-center gap-2'>
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
            < Input type='number' value={prop.workinghoursonleave} className=' text-xs h-[35px] bg-zinc-200' placeholder='0'/>
            </div>

            <div className=' w-full'>
              <Label className=' text-zinc-500'>Total Working Hours During Leave:</Label>
            < Input type='number' value={prop.workinghoursduringleave} className=' text-xs h-[35px] bg-zinc-200' placeholder='0'/>
            </div>
          </div>

           <Label className=' mt-2 text-zinc-500'>Comments:</Label>
          <Textarea  placeholder='Please input text here' value={comments} onChange={(e) => setComments(e.target.value)} className=' text-xs bg-zinc-200'/>


          <div className=' flex items-center gap-4 mt-4'>
          <button onClick={reject} className=' bg-red-700 text-zinc-100 px-4 py-2 text-xs rounded-sm mt-4 w-auto flex items-center justify-center gap-2'>
            {loading1 === true && (
              <div className=' spinner2'></div>
            )}
              Reject</button>
            <button onClick={approved} className=' bg-red-700 text-zinc-100 px-4 py-2 text-xs rounded-sm mt-4 w-auto flex items-center justify-center gap-2'>
            {loading === true && (
              <div className=' spinner2'></div>
            )}
              Approved</button>

          </div>


         
        </div>

      </div>
    </DialogContent>
    </Dialog>

  )
}
