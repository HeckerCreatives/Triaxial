import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Pen } from 'lucide-react'
import { employee } from '@/types/routes'
import axios, { AxiosError } from 'axios'
import { Textarea } from '../ui/textarea'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { Label } from '../ui/label'
import { Input } from '../ui/input'

type Members = {
  employee: {
      _id:string
      fullname: string
      initials: string
  },
  role:string
  notes: string
}

type Prop = {
    children: React.ReactNode
    id: any
    isManger: any
    isJobManager: any
    project: any
    jobmanager: any
    engr: any
    engrnotes: any
    engrrvr: any
    engrrvrnotes: any
    drftr: any
    drftrnotes: any
    drftrrvr: any
    drftrrvrnotes: any
    members: Members[]
    pname: string
    client: string
    start: string
    end: string
}

type Employee = {
    employeeid: string,
    name: string
  }
  
  type Client = {
    clientname: string
  clientid: string
  }
  
  type Project = {
    projectid: string
    projectname: string
  }

export default function EditJobComponent( prop: Prop) {
    const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([])
  const [employee, setEmployee] = useState<Employee[]>([])
  const [client, setClient] = useState<Client[]>([])
  const [projectname, setProjectname] = useState('')
  const [jobmanager, setJobmanager] = useState('')
  const [jobno, setJobno] = useState('')

  const [engr, setEngr] = useState('')
  const [engrrvr, setEngrrvr] = useState('')
  const [drf, setDrf] = useState('')
  const [drfrvr, setDrfrvr] = useState('')
  const [notes, setNotes] = useState('')
  const [notes2, setNotes2] = useState('')
  const [notes3, setNotes3] = useState('')
  const [notes4, setNotes4] = useState('')

  console.log(prop)

//employee list
  useEffect(() => {
    try {
      const timer = setTimeout(() => {
        const getList = async () => {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/employeesearchlistmanager?fullname`,{
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json'
              }
          })
    
          setEmployee(response.data.data.employeelist)
        
        
        }
        getList()
      }, 500)
      return () => clearTimeout(timer)
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

  //projects list
  useEffect(() => {

    const timer = setTimeout(() => {
      const getList = async () => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/projects/listallprojects?searchproject`,{
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
            }
        })
        setProjects(response.data.data.projectlist)
    
      }
      getList()
    },500)
    return () => clearTimeout(timer)
    
    
  },[])

   //update as manager
   const updateJobComponenAsManager = async () => {
  
    try {
      const request = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/jobcomponent/editjobcomponentdetails`,{
        jobcomponentid: prop.id,
        projectid: projectname,
        jobmanagerid: jobmanager // employeeid
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

    if(response.data.message === 'success'){
        window.location.reload()

     

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
  }

  //update as job manager
  const updateJobComponenAsJobManager = async () => {

    const members = [
      {
        employee: engr, 
        role: "Engr.",
        notes: notes
    },
    {
      employee: engrrvr, 
      role: "Engr. Revr.",
      notes: notes2
  },
  {
    employee: drf, 
    role: "Drft.", 
    notes: notes3
  },
  {
    employee: drfrvr, 
    role: "Drft. Revr.", 
    notes: notes4
  },
]
  
    try {
      const request = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/jobcomponent/editjobmanagercomponents`,{
        jobcomponentid: prop.id,
        members: members
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

    if(response.data.message === 'success'){
        window.location.reload()

     

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
  }

  //update as both
  const updateJobComponenAsBoth = async () => {

    const members = [
      {
        employee: engr, 
        role: "Engr.",
        notes: notes
    },
    {
      employee: engrrvr, 
      role: "Engr. Revr.",
      notes: notes2
  },
  {
    employee: drf, 
    role: "Drft.", 
    notes: notes3
  },
  {
    employee: drfrvr, 
    role: "Drft. Revr.", 
    notes: notes4
  },
]
  
    try {
      const request = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/jobcomponent/editalljobcomponentdetails`,{
        jobcomponentid: prop.id,
        projectid: projectname,
        jobmanagerid: jobmanager, // employeeid
        members: members
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

    if(response.data.message === 'success'){
        window.location.reload()
     
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
  }

  const engrMember = prop?.members.find((item) => item.role === 'Engr.');
  const engrId = engrMember?.employee._id;
  
  const engrrvrMember = prop?.members.find((item) => item.role === 'Engr. Revr.');
  const engrrvrId = engrrvrMember?.employee._id;
  
  const drftrvrMember = prop?.members.find((item) => item.role === 'Drft. Revr.');
  const draftrvrId = drftrvrMember?.employee._id;
  
  const drftMember = prop?.members.find((item) => item.role === 'Drft.');
  const draftId = drftMember?.employee._id;
  
  useEffect(() => {
    if (prop) {
      setJobmanager(prop.jobmanager);
      setProjectname(prop.project);
      setEngr(engrId || '');
      setNotes(engrMember?.notes || '');
      setEngrrvr(engrrvrId || '');
      setNotes2(engrrvrMember?.notes || '');
      setDrf(draftrvrId || '');
      setNotes3(drftrvrMember?.notes || ''); // Corrected: Use drftrvrMember for Drft. Revr. notes
      setDrfrvr(draftId || ''); // Corrected: Use draftId for Drft. role
      setNotes4(drftMember?.notes || ''); // Corrected: Use drftMember for Drft. notes
    }
  }, [prop]); // Only `prop` is needed as a dependency


  return (
   <>
   <Dialog >
                          <DialogTrigger className=''>
                           {prop.children}
                          </DialogTrigger>
                          <DialogContent className=' max-w-[600px] max-h-[80%] h-auto bg-secondary border-none p-6 text-white overflow-y-auto'>
                            <DialogHeader>
                              <DialogTitle>Edit Project <span className=' text-xs text-zinc-400'></span></DialogTitle>
                              <DialogDescription className={` ${prop.isManger === true ? 'text-white' : ' text-red-500'}`}>
                                {/* {graphItem.jobmanager.isManager === true ? 'Your the project manager of this project, you are allowed to edit this project' : ' Your are not the project manager of this project, you are not allowed to edit this project'} */}
                                
                              </DialogDescription>
                            </DialogHeader>

                            {(prop.isManger === true && prop.isJobManager=== false ) && (
                              <div className=' flex flex-col w-full gap-2 text-xs'>


                                <div className=' flex flex-col w-full gap-2 text-xs'>
                                 <label htmlFor="">Project Details</label>
                               

                                  <div className=' flex items-start gap-4 '>
                                                                                          
                                                                      
                                      <div className=' w-full'>
                                        <Label className=' text-zinc-500'>Project Name</Label>
                                        <Select value={projectname} onValueChange={setProjectname}>
                                          <SelectTrigger className="text-xs h-[35px] bg-primary">
                                          <SelectValue placeholder="Select" className="text-black" />
                                          </SelectTrigger>
                                          <SelectContent className="text-xs">
                                            {projects.map((item, index) => (
                                            <SelectItem key={index} value={item.projectid}>{item.projectname}</SelectItem>

                                            ))}
                                          
                                          </SelectContent>
                                        </Select>
                                                                                                                                                                                                                                      
                                      </div>
                                                                                                                                          
                                                                                                                                                             
                                        <div className=' w-full'>
                                          <Label className=' text-zinc-500'>Client</Label>
                                        <Input type='text' value={prop.client}  className=' text-xs h-[35px] bg-primary' placeholder='Project name'/>
                                                                    
                                                                                            
                                                                                                                                          
                                        </div>
                                                                                                                                          
                                    </div>
                                                                                                                                          
                                    <div className=' flex items-start gap-4 '>
                                                                                                                                                              
                                                                                                                                          
                                      <div className=' w-full'>
                                        <Label className=' text-zinc-500'>Start Date</Label>
                                        <Input type='text' value={prop.start.split('T')[0]}  className=' text-xs h-[35px] bg-primary' placeholder='Project name' />
                                                                                                                                          
                                                                                                                                          
                                      </div>
                                                                                                                                          
                                                                                                                                                             
                                        <div className=' w-full'>
                                          <Label className=' text-zinc-500'>End date</Label>
                                          <Input type='text' value={prop.end.split('T')[0]}  className=' text-xs h-[35px] bg-primary' placeholder='Project name'/>
                                                                                                                                          
                                        </div>
                                                                                                                                          
                                    </div>

                                  <div>

                                  </div>

                                <label htmlFor="">Job Manager</label>
                                <Select value={jobmanager} onValueChange={setJobmanager}>
                                          <SelectTrigger className="text-xs h-[35px] bg-primary mt-2">
                                          <SelectValue placeholder="Select" className="text-black" />
                                          </SelectTrigger>
                                          <SelectContent className="text-xs">
                                            {employee.map((item, index) => (
                                            <SelectItem key={index} value={item.employeeid}>{item.name}</SelectItem>

                                            ))}
                                          
                                      </SelectContent>
                                  </Select>

                                

                              </div>

                                {/* <label htmlFor="">Job no</label>
                                <Input value={jobno} onChange={(e) => setJobno(e.target.value)} type='text' className=' text-xs h-[35px] bg-primary' placeholder='Job no' /> */}

                                <label htmlFor="">Job Manager</label>
                                <Select value={jobmanager} onValueChange={setJobmanager}>
                                          <SelectTrigger className="text-xs h-[35px] bg-primary mt-2">
                                          <SelectValue placeholder="Select" className="text-black" />
                                          </SelectTrigger>
                                          <SelectContent className="text-xs">
                                            {employee.map((item, index) => (
                                            <SelectItem key={index} value={item.employeeid}>{item.name}</SelectItem>

                                            ))}
                                          
                                          </SelectContent>
                                  </Select>

                                  <div className=' w-full flex items-end justify-end mt-4 text-xs'>
                                    <button onClick={() => updateJobComponenAsManager()} className=' bg-red-600 px-4 py-2 rounded-md w-fit'>Save</button>
                                  </div>
                                
                              </div>
                            )}


                            {(prop.isJobManager === true && prop.isManger === false ) && (
                              <div className=' flex flex-col w-full gap-2 text-xs'>
                              
                              <div className=' flex flex-col w-full gap-2 text-xs'>

                              <label htmlFor="">Engineer (Engr.)</label>
                                <Select value={engr} onValueChange={setEngr}>
                                      <SelectTrigger className="text-xs h-[35px] bg-primary mt-2">
                                      <SelectValue placeholder="Select" className="text-black" />
                                      </SelectTrigger>
                                      <SelectContent className="text-xs">
                                        {employee.map((item, index) => (
                                        <SelectItem key={item.employeeid} value={item.employeeid}>{item.name}</SelectItem>

                                        ))}
                                      
                                      </SelectContent>
                              </Select>

                              <label htmlFor="">Notes</label>
                              <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} className=' text-xs h-[25px] bg-primary' placeholder='Notes' />

                              <label htmlFor="">Engineer Reviewer (Engr. Revr.)</label>
                              <Select value={engrrvr} onValueChange={setEngrrvr}>
                                      <SelectTrigger className="text-xs h-[35px] bg-primary mt-2">
                                      <SelectValue placeholder="Select" className="text-black" />
                                      </SelectTrigger>
                                      <SelectContent className="text-xs">
                                        {employee.map((item, index) => (
                                        <SelectItem key={index} value={item.employeeid}>{item.name}</SelectItem>

                                        ))}
                                      
                                      </SelectContent>
                              </Select>

                              <label htmlFor="">Notes</label>
                              <Textarea value={notes2} onChange={(e) => setNotes(e.target.value)} className=' text-xs h-[25px] bg-primary' placeholder='Notes' />

                              <label htmlFor="">Drafter (Drft.)</label>
                              <Select value={drf} onValueChange={(setDrf)}>
                                      <SelectTrigger className="text-xs h-[35px] bg-primary mt-2">
                                      <SelectValue placeholder="Select" className="text-black" />
                                      </SelectTrigger>
                                      <SelectContent className="text-xs">
                                        {employee.map((item, index) => (
                                        <SelectItem key={index} value={item.employeeid}>{item.name}</SelectItem>

                                        ))}
                                      
                                      </SelectContent>
                              </Select>
                              <label htmlFor="">Notes</label>
                              <Textarea value={notes3} onChange={(e) => setNotes(e.target.value)} className=' text-xs h-[25px] bg-primary' placeholder='Notes' />

                              <label htmlFor="">Drafter Reviewer (Drft. Revr.)	</label>
                              <Select value={drfrvr} onValueChange={(setDrfrvr)}>
                                      <SelectTrigger className="text-xs h-[35px] bg-primary mt-2">
                                      <SelectValue placeholder="Select" className="text-black" />
                                      </SelectTrigger>
                                      <SelectContent className="text-xs">
                                        {employee.map((item, index) => (
                                        <SelectItem key={index} value={item.employeeid}>{item.name}</SelectItem>

                                        ))}
                                      
                                      </SelectContent>
                              </Select>

                              <label htmlFor="">Notes</label>
                              <Textarea value={notes4} onChange={(e) => setNotes(e.target.value)} className=' text-xs h-[25px] bg-primary' placeholder='Notes' />

                                <div className=' w-full flex items-end justify-end mt-4 text-xs'>
                                  <button onClick={() => updateJobComponenAsJobManager()} className=' bg-red-600 px-4 py-2 rounded-md w-fit'>Save</button>
                                </div>

                              </div>

                            </div>
                            )}

                            {(prop.isJobManager === true && prop.isManger === true) && (
                              <>
                               <div className=' flex flex-col w-full gap-2 text-xs'>
                                 <label htmlFor="">Project Details</label>
                               

                                  <div className=' flex items-start gap-4 '>
                                                                                          
                                                                      
                                      <div className=' w-full'>
                                        <Label className=' text-zinc-500'>Project Name</Label>
                                        <Select value={projectname} onValueChange={setProjectname}>
                                          <SelectTrigger className="text-xs h-[35px] bg-primary">
                                          <SelectValue placeholder="Select" className="text-black" />
                                          </SelectTrigger>
                                          <SelectContent className="text-xs">
                                            {projects.map((item, index) => (
                                            <SelectItem key={index} value={item.projectid}>{item.projectname}</SelectItem>

                                            ))}
                                          
                                          </SelectContent>
                                        </Select>
                                                                                                                                                                                                                                      
                                      </div>
                                                                                                                                          
                                                                                                                                                             
                                        <div className=' w-full'>
                                          <Label className=' text-zinc-500'>Client</Label>
                                        <Input type='text' value={prop.client}  className=' text-xs h-[35px] bg-primary' placeholder='Project name'/>
                                                                    
                                                                                            
                                                                                                                                          
                                        </div>
                                                                                                                                          
                                    </div>
                                                                                                                                          
                                    <div className=' flex items-start gap-4 '>
                                                                                                                                                              
                                                                                                                                          
                                      <div className=' w-full'>
                                        <Label className=' text-zinc-500'>Start Date</Label>
                                        <Input type='text' value={prop.start.split('T')[0]}  className=' text-xs h-[35px] bg-primary' placeholder='Project name' />
                                                                                                                                          
                                                                                                                                          
                                      </div>
                                                                                                                                          
                                                                                                                                                             
                                        <div className=' w-full'>
                                          <Label className=' text-zinc-500'>End date</Label>
                                          <Input type='text' value={prop.end.split('T')[0]}  className=' text-xs h-[35px] bg-primary' placeholder='Project name'/>
                                                                                                                                          
                                        </div>
                                                                                                                                          
                                    </div>

                                  <div>

                                  </div>

                                <label htmlFor="">Job Manager</label>
                                <Select value={jobmanager} onValueChange={setJobmanager}>
                                          <SelectTrigger className="text-xs h-[35px] bg-primary mt-2">
                                          <SelectValue placeholder="Select" className="text-black" />
                                          </SelectTrigger>
                                          <SelectContent className="text-xs">
                                            {employee.map((item, index) => (
                                            <SelectItem key={index} value={item.employeeid}>{item.name}</SelectItem>

                                            ))}
                                          
                                      </SelectContent>
                                  </Select>

                                

                              </div>

                              <div className=' flex flex-col w-full gap-2 text-xs'>

                                  <label htmlFor="">Engineer (Engr.)</label>
                                    <Select value={engr} onValueChange={setEngr}>
                                          <SelectTrigger className="text-xs h-[35px] bg-primary mt-2">
                                          <SelectValue placeholder="Select" className="text-black" />
                                          </SelectTrigger>
                                          <SelectContent className="text-xs">
                                            {employee.map((item, index) => (
                                            <SelectItem key={item.employeeid} value={item.employeeid}>{item.name}</SelectItem>

                                            ))}
                                          
                                          </SelectContent>
                                  </Select>
                                  <label htmlFor="">Notes</label>
                                  <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} className=' text-xs h-[15px] bg-primary' placeholder='Notes' />

                                  <label htmlFor="">Engineer Reviewer (Engr. Revr.)</label>
                                  <Select value={engrrvr} onValueChange={(setEngrrvr)}>
                                          <SelectTrigger className="text-xs h-[35px] bg-primary mt-2">
                                          <SelectValue placeholder="Select" className="text-black" />
                                          </SelectTrigger>
                                          <SelectContent className="text-xs">
                                            {employee.map((item, index) => (
                                            <SelectItem key={index} value={item.employeeid}>{item.name}</SelectItem>

                                            ))}
                                          
                                          </SelectContent>
                                  </Select>
                                  <label htmlFor="">Notes</label>
                                  <Textarea value={notes2} onChange={(e) => setNotes2(e.target.value)} className=' text-xs h-[15px] bg-primary' placeholder='Notes' />

                                  <label htmlFor="">Drafter (Drft.)</label>
                                  <Select value={drf} onValueChange={(setDrf)}>
                                          <SelectTrigger className="text-xs h-[35px] bg-primary mt-2">
                                          <SelectValue placeholder="Select" className="text-black" />
                                          </SelectTrigger>
                                          <SelectContent className="text-xs">
                                            {employee.map((item, index) => (
                                            <SelectItem key={index} value={item.employeeid}>{item.name}</SelectItem>

                                            ))}
                                          
                                          </SelectContent>
                                  </Select>
                                  <label htmlFor="">Notes</label>
                                  <Textarea value={notes3} onChange={(e) => setNotes3(e.target.value)} className=' text-xs h-[15px] bg-primary' placeholder='Notes' />

                                  <label htmlFor="">Drafter Reviewer (Drft. Revr.)	</label>
                                  <Select value={drfrvr} onValueChange={(setDrfrvr)}>
                                          <SelectTrigger className="text-xs h-[35px] bg-primary mt-2">
                                          <SelectValue placeholder="Select" className="text-black" />
                                          </SelectTrigger>
                                          <SelectContent className="text-xs">
                                            {employee.map((item, index) => (
                                            <SelectItem key={index} value={item.employeeid}>{item.name}</SelectItem>

                                            ))}
                                          
                                          </SelectContent>
                                  </Select>
                                  <label htmlFor="">Notes</label>
                                  <Textarea value={notes4} onChange={(e) => setNotes4(e.target.value)} className=' text-xs h-[15px] bg-primary' placeholder='Notes' />

                              
                                  

                              </div>

                                <div className=' w-full flex items-end justify-end mt-4 text-xs'>
                                  <button onClick={() => updateJobComponenAsBoth()} className=' bg-red-600 px-4 py-2 rounded-md w-fit'>Save</button>
                                </div>
                              </>
                            )} 

                          </DialogContent>
                      </Dialog>
   </>
  )
}
