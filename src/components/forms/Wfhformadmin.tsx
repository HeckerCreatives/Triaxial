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

}

type Props = {
  requestid:string
  startdate: string
  enddate: string
  // totalworkingdays: number
  // totalholidays: number
  totalworkinghours:  number
  wellnessdaycycle: boolean,
  hoursofleave:  number
  reason: string
  fullname: string
  // comments: string
  children?: React.ReactNode;

}


export default function Wfhformadmin( prop: Props) {
  const [dialog, setDialog] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loading1, setLoading1] = useState(false)
  const [comments, setComments] = useState('')
  const router = useRouter()

  

  const approved = async () => {
    router.push('?state=true')

    setLoading(true)
    try {
      const request = axios.post(`${process.env. NEXT_PUBLIC_API_URL}/wfh/approvewfhrequestadmin`,{
      requestid: prop.requestid,
      approvalstatus: "Approved",
      // comment : comments
       
      },
          {
              withCredentials: true,
              headers: {
              'Content-Type': 'application/json'
              }
          }
      )

    const response = await toast.promise(request, {
        loading: 'Approving wfh request....',
        success: `Successfully approved`,
        error: 'Error while approving wfh request',
    });

   if(response.data.message === 'success'){
    
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
  }

  const reject = async () => {
    setLoading1(true)
    router.push('?state=true')

    try {
      const request = axios.post(`${process.env. NEXT_PUBLIC_API_URL}/wfh/approvewfhrequestadmin`,{
      requestid: prop.requestid,
      approvalstatus: "Denied",
      // comment : comments
       
      },
          {
              withCredentials: true,
              headers: {
              'Content-Type': 'application/json'
              }
          }
      )

    const response = await toast.promise(request, {
        loading: 'Approving wfh request....',
        success: `Successfully approved`,
        error: 'Error while approving wfh request',
    });

   if(response.data.message === 'success'){
    
     setDialog(false)
     router.push('?state=false')
     setLoading1(false)

   }

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
        <p className=' text-sm uppercase font-semibold text-red-700'>Work from home application form</p>
        <div className=' w-full flex flex-col gap-1'>

          <p className=' text-lg font-medium'> Name: {prop.fullname}</p>

        <Label className=' mt-4 font-semibold'>Wfh Period</Label>
          <div className=' flex items-center gap-4'>
            <div>
              <Label className=' mt-2 text-zinc-500'>First Day Of Leave: <span className=' text-red-500'>*</span></Label>
              <Input type='date' value={prop.startdate} className=' text-xs h-[35px] bg-zinc-200'  placeholder='Name' />
              
            </div>

            <div>
              <Label className=' mt-2 text-zinc-500'>Last Day Of Leave: <span className=' text-red-500'>*</span></Label>
              <Input type='date' value={prop.enddate} className=' text-xs h-[35px] bg-zinc-200' placeholder='Name'/>

            </div>

  

          </div>
        

            {/* <div className=' w-full flex items-start gap-2'>
            <div className=' w-full'>
              <Label className=' mt-2 text-zinc-500'>Total Number of Working Days:</Label>
            < Input type='number' value={prop.totalworkingdays} className=' text-xs h-[35px] bg-zinc-200' placeholder='0' />

            </div>

            <div className=' w-full'>
              <Label className=' mt-2 text-zinc-500'>Total Public Holidays(if applicable)</Label>
            < Input type='number' value={prop.totalholidays}  defaultValue={0} className=' text-xs h-[35px] bg-zinc-200' placeholder='0' />
            

            </div>
          </div> */}

          <div className=' flex items-center gap-2 mt-4'>
            <Label className=' text-zinc-500'>Are you in a Wellness Day Cycle? <span className=' text-red-500'>*</span></Label>
            <RadioGroup value={prop.wellnessdaycycle === true ? 'Yes' : 'No'} className=' flex items-center gap-2'  >
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
              <Input type='number' value={prop.totalworkinghours}  defaultValue={0} className=' text-xs h-[35px] bg-zinc-200' placeholder='0' />
             

            </div>

            <div className=' w-full'>
              <Label className=' text-zinc-500'>Hours of Leave:</Label>
            < Input type='number' value={prop.hoursofleave}  defaultValue={0} className=' text-xs h-[35px] bg-zinc-200' placeholder='0' />

            </div>
          </div>

          <Label className=' mt-2 text-zinc-500'>Reason for Work From Home: <span className=' text-red-700'>*</span></Label>
          <Textarea value={prop.reason} placeholder='Please input text here' className=' text-xs bg-zinc-200' />

          <Label className=' mt-2 text-zinc-500'>Comments <span className=' text-red-700'>*</span></Label>
          <Textarea placeholder='Please input text here' className=' text-xs bg-zinc-200' />
          



          <p className=' text-xs text-zinc-500 mt-4'>Note: <span className=' text-red-500'>*</span><span className=' italic'>- Required</span></p>

          <div className=' mt-8 flex items-center gap-2'>
             <input
              type="checkbox"
              // Correctly handle as boolean
            />
            <p className=' text-xs text-zinc-500'>I declare that the provided information is true and accurate.</p>

          </div>
       

          <div className=' flex items-center gap-4 mt-4'>
          <button onClick={reject} className=' bg-red-700 text-zinc-100 px-4 py-2 text-xs rounded-sm mt-4 w-auto flex items-center justify-center gap-2'>
            {loading1 === true && (
              <div className=' spinner2'></div>
            )}
              Deny</button>
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
