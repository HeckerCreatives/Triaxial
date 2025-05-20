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

type Team = {
  manager: string
teamid: string
teamleader: string
teamname: string
}

type Client = {
  clientname: string
clientid: string
}

export default function Createprojectform( prop: Data) {
  const [dialog, setDialog] = useState(false)
  const [jobno, setJobno] = useState('')
  const [client, setClient] = useState<Client[]>([])
  const router = useRouter()
  const [team, setTeam] = useState<Team[]>([])
  const [loading, setLoading] = useState(false)

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
    router.push('?state=true')
    setLoading(true)
    try {
      const request = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/projects/createproject`,{
     
          team: data.team, // teamid
          projectname: data.projectname,
          startdate: data.start,
          deadlinedate: data.end,
          client: data.client,
          jobno: data.jobno,

      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
          }
      })

      const response = await toast.promise(request, {
        loading: 'Creating project....',
        success: `Successfully created`,
        error: 'Error while creating project',
    });

    if(response.data.message === 'success'){
      reset()
      setDialog(false)
      router.push('?state=false')
      setLoading(false)
 
    }
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


  //team list
  useEffect(() => {
  
    const timer = setTimeout(() => {
      const getList = async () => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/teams/managerlistownteam?teamnamefilter&page=0&limit=10`,{
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
            }
        })
  
        setTeam(response.data.data.teams)
      
       
      }
      getList()
    },500)
    return () => clearTimeout(timer)
    
    
  },[])

  //client list
  useEffect(() => {
    const timer = setTimeout(() => {
      const getList = async () => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/clients/clientlistallmanager?clientname`,{
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
            }
        })
  
        setClient(response.data.data.clients)
    
      }
      getList()
    },500)
    return () => clearTimeout(timer)
    
    
  },[])







  
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
          {/* <Input type='text' className=' text-xs h-[35px] bg-zinc-200' placeholder='Team' {...register('team')}/> */}
          <Select onValueChange={(value) => setValue('team', value)}>
            <SelectTrigger className=" text-xs h-[35px] bg-zinc-200">
              <SelectValue placeholder="Select Team" className=' text-black'  />
            </SelectTrigger>
            <SelectContent className=' text-xs'>
              {team.map((item, index) => (
                <SelectItem key={item.teamid} value={item.teamid}>{item.teamname}</SelectItem>
              ))}
              
              
            </SelectContent>
          </Select>
           {errors.team && <p className=' text-[.6em] text-red-500'>{errors.team.message}</p>}

           
           <label htmlFor="" className=' text-xs'>Job no</label>
          <Input type='text' maxLength={15} className=' text-xs h-[35px] bg-zinc-200' placeholder='Job no' {...register('jobno')}/>
          {errors.jobno && <p className=' text-[.6em] text-red-500'>{errors.jobno.message}</p>}


           <div className=' bg-zinc-200 rounded-sm flex flex-col p-2'>
             
                  <div className=' flex items-start gap-4 '>
                    

                    <div className=' w-full'>
                      <Label className=' text-zinc-500'>Project Name <span className=' text-red-700'>*</span></Label>
                      <Input type='text' className=' text-xs h-[35px] bg-white' placeholder='Project name' {...register('projectname')}/>
                      {errors.projectname && <p className=' text-[.6em] text-red-500'>{errors.projectname.message}</p>}


                    </div>

                   
                      <div className=' w-full'>
                        <Label className=' text-zinc-500'>Client<span className=' text-red-700'>*</span></Label>
                        <Select onValueChange={(value) => setValue('client', value)} {...register('client')}>
                        <SelectTrigger className=" text-xs h-[35px] bg-white">
                          <SelectValue placeholder="Select Client" className=' text-black'  />
                        </SelectTrigger>
                        <SelectContent className=' text-xs'>
                          {client.map((item, index) => (
                          <SelectItem key={item.clientid} value={item.clientid}>{item.clientname}</SelectItem>

                          ))}
                        </SelectContent>
                      </Select>
                        {errors.client && <p className=' text-[.6em] text-red-500'>{errors.client.message}</p>}

                      </div>

                  </div>

                  <div className=' flex items-start gap-4 '>
                    

                    <div className=' w-full'>
                      <Label className=' text-zinc-500'>Start Date <span className=' text-red-700'>*</span></Label>
                      <Input type='date' className=' text-xs h-[35px] bg-white' placeholder='Project name' {...register('start')}/>
                      {errors.start && <p className=' text-[.6em] text-red-500'>{errors.start.message}</p>}


                    </div>

                   
                      <div className=' w-full'>
                        <Label className=' text-zinc-500'>End date<span className=' text-red-700'>*</span></Label>
                        <Input type='date' className=' text-xs h-[35px] bg-white' placeholder='Project name' {...register('end')}/>
                        {errors.end && <p className=' text-[.6em] text-red-500'>{errors.end.message}</p>}

                      </div>

                  </div>

                  
          </div>

          {/* <Label className=' text-zinc-500 mt-4'>Project Component</Label>
            <Select>
            <SelectTrigger className=" text-xs h-[35px] bg-zinc-200">
              <SelectValue placeholder="Select" className=' text-black'  />
            </SelectTrigger>
            <SelectContent className=' text-xs'>
              <SelectItem value="light">Component1</SelectItem>
              <SelectItem value="dark">Component2</SelectItem>
            </SelectContent>
          </Select> */}


         

          <div className=' flex items-center gap-4 mt-4'>
            <button className=' bg-red-700 text-zinc-100 px-4 py-2 text-xs rounded-sm mt-4 w-auto'>Submit</button>

          </div>


         
        </div>

      </form>
    </DialogContent>
    </Dialog>

  )
}
