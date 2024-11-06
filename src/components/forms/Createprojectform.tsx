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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useForm } from 'react-hook-form'
import { createProjectSchema, CreateProjectSchema } from '@/schema/schema'
import { zodResolver } from '@hookform/resolvers/zod'
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


export default function Createprojectform( prop: Data) {
  const [dialog, setDialog] = useState(false)
  const [jobno, setJobno] = useState('')
  const [client, setClient] = useState('')
  const [pm, setPm] = useState('')
  const router = useRouter()

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    trigger,
    formState: { errors },
  } = useForm<CreateProjectSchema>({
    resolver: zodResolver(createProjectSchema),
  });

  const createProject = async (data: CreateProjectSchema) => {
    try {
      const request = axios.post(`${process.env.NEXT_PUBLIC_API_URL}`,{

      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
          }
      })

      const response = await toast.promise(request, {
        loading: 'Updating workload....',
        success: `Successfully updated`,
        error: 'Error while updating the workload',
    });
    } catch (error) {
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


  const handleSelectChange = (value: string) => {
    setClient(value);
    setValue('client', value);
    trigger('client')
  };



  
  return (
    <Dialog open={dialog} onOpenChange={setDialog} >
    <DialogTrigger>
       {prop.children}
    </DialogTrigger>
    <DialogContent className=' max-h-[90%] overflow-y-auto'>
      <form className=' w-full p-4 flex flex-col gap-4' onSubmit={handleSubmit(createProject)}>
        <p className=' text-sm uppercase font-semibold text-red-700 flex items-center gap-2'><span className=' bg-red-700 px-4 py-1 text-zinc-100 text-xs'>Create</span>Project</p>
        <div className=' w-full flex flex-col gap-1'>
        <Label className=' mt-2 text-black font-bold'>Project Details</Label>

          <label htmlFor="" className=' text-xs text-zinc-700 mt-4'>Team</label>
          <Input type='text' className=' text-xs h-[35px] bg-zinc-200' placeholder='Team' {...register('team')}/>
           {errors.team && <p className=' text-[.6em] text-red-500'>{errors.team.message}</p>}

           <div className=' bg-zinc-200 flex flex-col p-2'>
                  {/* <Label className=' font-semibold'>Job Details</Label> */}

                  <div className=' flex items-start gap-4 '>
                    

                    <div className=' w-full'>
                      <Label className=' text-zinc-500'>Project Name <span className=' text-red-700'>*</span></Label>
                      <Input type='text' className=' text-xs h-[35px] bg-white' placeholder='Project name' {...register('projectname')}/>
                      {errors.projectname && <p className=' text-[.6em] text-red-500'>{errors.projectname.message}</p>}


                    </div>

                   
                      <div className=' w-full'>
                        <Label className=' text-zinc-500'>Client<span className=' text-red-700'>*</span></Label>
                        <Select value={client} onValueChange={handleSelectChange}>
                        <SelectTrigger className=" text-xs h-[35px] bg-white">
                          <SelectValue placeholder="Select Client" className=' text-black'  />
                        </SelectTrigger>
                        <SelectContent className=' text-xs'>
                          <SelectItem value="light">Client</SelectItem>
                          <SelectItem value="dark">Client</SelectItem>
                        </SelectContent>
                      </Select>
                        {errors.client && <p className=' text-[.6em] text-red-500'>{errors.client.message}</p>}

                      </div>

                  </div>

                  
          </div>

          <Label className=' text-zinc-500 mt-4'>Project Component</Label>
            <Select value={client} onValueChange={handleSelectChange}>
            <SelectTrigger className=" text-xs h-[35px] bg-zinc-200">
              <SelectValue placeholder="Select" className=' text-black'  />
            </SelectTrigger>
            <SelectContent className=' text-xs'>
              <SelectItem value="light">Component1</SelectItem>
              <SelectItem value="dark">Component2</SelectItem>
            </SelectContent>
          </Select>


         

          <div className=' flex items-center gap-4 mt-4'>
            <button className=' bg-red-700 text-zinc-100 px-4 py-2 text-xs rounded-sm mt-4 w-auto'>Submit</button>

          </div>


         
        </div>

      </form>
    </DialogContent>
    </Dialog>

  )
}
