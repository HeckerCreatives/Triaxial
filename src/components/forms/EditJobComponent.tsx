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
    component: string
    adminnotes: string
    budget: number
    budgettype: string
    jcname: string
    clientid: string
    jobno: string
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
  const [budget, setBudget] = useState(0)
  const [budgettype, setBudgettype] = useState('')
  const [jcname, setJcname] = useState('')
  const [clientid, setClientid] = useState('')
  const [adminnotes, setAdminnotes] = useState('')

  const [engr, setEngr] = useState('')
  const [engrrvr, setEngrrvr] = useState('')
  const [drf, setDrf] = useState('')
  const [drfrvr, setDrfrvr] = useState('')
  const [notes, setNotes] = useState('')
  const [notes2, setNotes2] = useState('')
  const [notes3, setNotes3] = useState('')
  const [notes4, setNotes4] = useState('')


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
        members: members,
        budgettype: budgettype, 
        budget: budget, 
        adminnotes: adminnotes, 
        jobcomponentname: jcname, 
        clientid: clientid,
        // projectname: projectname
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
      setProjectname(prop.pname);
      setEngr(engrId || '');
      setNotes(engrMember?.notes || '');
      setEngrrvr(engrrvrId || '');
      setNotes2(engrrvrMember?.notes || '');
      setDrf(draftrvrId || '');
      setNotes3(drftrvrMember?.notes || ''); // Corrected: Use drftrvrMember for Drft. Revr. notes
      setDrfrvr(draftId || ''); // Corrected: Use draftId for Drft. role
      setNotes4(drftMember?.notes || ''); // Corrected: Use drftMember for Drft. notes
      setJobno(prop.jobno)
      setBudget(prop.budget)
      setBudgettype(prop.budgettype)
      setJcname(prop.jcname)
      setClientid(prop.clientid)
      setAdminnotes(prop.adminnotes)
    
    }
  }, [prop]); // Only `prop` is needed as a dependency


  return (
   <>
   <Dialog >
                          <DialogTrigger className=''>
                           {prop.children}
                          </DialogTrigger>
                          <DialogContent className=' max-w-[600px] max-h-[80%] h-auto bg-white border-none p-6 text-black overflow-y-auto'>
                            <DialogHeader>
                              <DialogTitle className=' text-sm'><span className=' bg-red-600 px-2 py-1 text-white'>Edit</span> Project Component <span className=' text-xs text-zinc-400'></span></DialogTitle>
                              <DialogDescription className={` ${prop.isManger === true ? 'text-white' : ' text-red-500'}`}>
                                {/* {graphItem.jobmanager.isManager === true ? 'Your the project manager of this project, you are allowed to edit this project' : ' Your are not the project manager of this project, you are not allowed to edit this project'} */}
                                
                              </DialogDescription>
                            </DialogHeader>

                            {/* {(prop.isManger === true && prop.isJobManager=== false ) && (
                              <div className=' flex flex-col w-full gap-2 text-xs'>


                                <div className=' flex flex-col w-full gap-2 text-xs'>
                                 <label htmlFor="">Project Details</label>
                               

                                  <div className=' flex items-start gap-4 '>
                                                                                          
                                                                      
                                      <div className=' w-full'>
                                        <Label className=' text-zinc-500'>Project Name</Label>
                                        <Select value={projectname} onValueChange={setProjectname}>
                                          <SelectTrigger className="text-xs h-[35px] bg-zinc-100">
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
                                          <Label className=' text-zinc-500'>Client Name</Label>
                                        <Input type='text' value={prop.client}  className=' text-xs h-[35px] bg-zinc-100' placeholder='Project name'/>
                                                                    
                                                                                            
                                                                                                                                          
                                        </div>
                                                                                                                                          
                                    </div>
                                                                                                                                          
                                    <div className=' flex items-start gap-4 '>
                                                                                                                                                              
                                                                                                                                          
                                      <div className=' w-full'>
                                        <Label className=' text-zinc-500'>Start Date</Label>
                                        <Input type='text' value={prop.start.split('T')[0]}  className=' text-xs h-[35px] bg-zinc-100' placeholder='Project name' />
                                                                                                                                          
                                                                                                                                          
                                      </div>
                                                                                                                                          
                                                                                                                                                             
                                        <div className=' w-full'>
                                          <Label className=' text-zinc-500'>End date</Label>
                                          <Input type='text' value={prop.end.split('T')[0]}  className=' text-xs h-[35px] bg-zinc-100' placeholder='Project name'/>
                                                                                                                                          
                                        </div>
                                                                                                                                          
                                    </div>

                                  <div>

                                  <Label className=' text-zinc-500'>Job Component</Label>
                                  <Input type='text' value={prop.component}  className=' text-xs h-[35px] bg-zinc-100 mb-2' placeholder='Project name'/>

                                  <Label className=' text-zinc-500'>Admin Notes</Label>
                                  <Textarea value={prop.adminnotes}  className=' text-xs h-[35px] bg-zinc-100' placeholder='Project name'/>

                                  </div>

                                <label htmlFor="">Job Manager</label>
                                <Select value={jobmanager} onValueChange={setJobmanager}>
                                          <SelectTrigger className="text-xs h-[35px] bg-zinc-100 mt-2">
                                          <SelectValue placeholder="Select" className="text-black" />
                                          </SelectTrigger>
                                          <SelectContent className="text-xs">
                                            {employee.map((item, index) => (
                                            <SelectItem key={index} value={item.employeeid}>{item.name}</SelectItem>

                                            ))}
                                          
                                      </SelectContent>
                                  </Select>

                                

                              </div>

                           

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
                                        <SelectTrigger className="text-xs h-[35px] bg-zinc-100 mt-2">
                                        <SelectValue placeholder="Select" className="text-black" />
                                        </SelectTrigger>
                                        <SelectContent className="text-xs">
                                          {employee.map((item, index) => (
                                          <SelectItem key={item.employeeid} value={item.employeeid}>{item.name}</SelectItem>

                                          ))}
                                        
                                        </SelectContent>
                                </Select>
                                <label htmlFor="">Notes</label>
                                <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} className=' text-xs h-[15px] bg-zinc-100' placeholder='Notes' />

                                <label htmlFor="">Engineer Reviewer (Engr. Revr.)</label>
                                <Select value={engrrvr} onValueChange={(setEngrrvr)}>
                                        <SelectTrigger className="text-xs h-[35px] bg-zinc-100 mt-2">
                                        <SelectValue placeholder="Select" className="text-black" />
                                        </SelectTrigger>
                                        <SelectContent className="text-xs">
                                          {employee.map((item, index) => (
                                          <SelectItem key={index} value={item.employeeid}>{item.name}</SelectItem>

                                          ))}
                                        
                                        </SelectContent>
                                </Select>
                                <label htmlFor="">Notes</label>
                                <Textarea value={notes2} onChange={(e) => setNotes2(e.target.value)} className=' text-xs h-[15px] bg-zinc-100' placeholder='Notes' />

                                <label htmlFor="">Drafter (Drft.)</label>
                                <Select value={drf} onValueChange={(setDrf)}>
                                        <SelectTrigger className="text-xs h-[35px] bg-zinc-100 mt-2">
                                        <SelectValue placeholder="Select" className="text-black" />
                                        </SelectTrigger>
                                        <SelectContent className="text-xs">
                                          {employee.map((item, index) => (
                                          <SelectItem key={index} value={item.employeeid}>{item.name}</SelectItem>

                                          ))}
                                        
                                        </SelectContent>
                                </Select>
                                <label htmlFor="">Notes</label>
                                <Textarea value={notes3} onChange={(e) => setNotes3(e.target.value)} className=' text-xs h-[15px]  bg-zinc-100' placeholder='Notes' />

                                <label htmlFor="">Drafter Reviewer (Drft. Revr.)	</label>
                                <Select value={drfrvr} onValueChange={(setDrfrvr)}>
                                        <SelectTrigger className="text-xs h-[35px] bg-zinc-100 mt-2">
                                        <SelectValue placeholder="Select" className="text-black" />
                                        </SelectTrigger>
                                        <SelectContent className="text-xs">
                                          {employee.map((item, index) => (
                                          <SelectItem key={index} value={item.employeeid}>{item.name}</SelectItem>

                                          ))}
                                        
                                        </SelectContent>
                                </Select>
                                <label htmlFor="">Notes</label>
                                <Textarea value={notes4} onChange={(e) => setNotes4(e.target.value)} className=' text-xs h-[15px] bg-zinc-100' placeholder='Notes' />
                             

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
                                          <SelectTrigger className="text-xs h-[35px] bg-zinc-100">
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
                                          <Label className=' text-zinc-500'>Client Name</Label>
                                        <Input type='text' value={prop.client}  className=' text-xs h-[35px] bg-zinc-100' placeholder='Project name'/>
                                                                    
                                                                                            
                                                                                                                                          
                                        </div>
                                                                                                                                          
                                    </div>
                                                                                                                                          
                                    <div className=' flex items-start gap-4 '>
                                                                                                                                                              
                                                                                                                                          
                                      <div className=' w-full'>
                                        <Label className=' text-zinc-500'>Start Date</Label>
                                        <Input type='text' value={prop.start.split('T')[0]}  className=' text-xs h-[35px] bg-zinc-100' placeholder='Project name' />
                                                                                                                                          
                                                                                                                                          
                                      </div>
                                                                                                                                          
                                                                                                                                                             
                                        <div className=' w-full'>
                                          <Label className=' text-zinc-500'>End date</Label>
                                          <Input type='text' value={prop.end.split('T')[0]}  className=' text-xs h-[35px] bg-zinc-100' placeholder='Project name'/>
                                                                                                                                          
                                        </div>
                                                                                                                                          
                                    </div>

                                  <div>

                                  <Label className=' text-zinc-500'>Job Component</Label>
                                  <Input type='text' value={prop.component}  className=' text-xs h-[35px] bg-zinc-100 mb-2' placeholder='Project name'/>

                                  <Label className=' text-zinc-500'>Admin Notes</Label>
                                  <Textarea value={prop.adminnotes}  className=' text-xs h-[35px] bg-zinc-100' placeholder='Project name'/>

                                  </div>

                                <label htmlFor="">Job Manager</label>
                                <Select value={jobmanager} onValueChange={setJobmanager}>
                                          <SelectTrigger className="text-xs h-[35px] bg-zinc-100 mt-2">
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
                                          <SelectTrigger className="text-xs h-[35px] bg-zinc-100 mt-2">
                                          <SelectValue placeholder="Select" className="text-black" />
                                          </SelectTrigger>
                                          <SelectContent className="text-xs">
                                            {employee.map((item, index) => (
                                            <SelectItem key={item.employeeid} value={item.employeeid}>{item.name}</SelectItem>

                                            ))}
                                          
                                          </SelectContent>
                                  </Select>
                                  <label htmlFor="">Notes</label>
                                  <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} className=' text-xs h-[15px] bg-zinc-100' placeholder='Notes' />

                                  <label htmlFor="">Engineer Reviewer (Engr. Revr.)</label>
                                  <Select value={engrrvr} onValueChange={(setEngrrvr)}>
                                          <SelectTrigger className="text-xs h-[35px] bg-zinc-100 mt-2">
                                          <SelectValue placeholder="Select" className="text-black" />
                                          </SelectTrigger>
                                          <SelectContent className="text-xs">
                                            {employee.map((item, index) => (
                                            <SelectItem key={index} value={item.employeeid}>{item.name}</SelectItem>

                                            ))}
                                          
                                          </SelectContent>
                                  </Select>
                                  <label htmlFor="">Notes</label>
                                  <Textarea value={notes2} onChange={(e) => setNotes2(e.target.value)} className=' text-xs h-[15px] bg-zinc-100' placeholder='Notes' />

                                  <label htmlFor="">Drafter (Drft.)</label>
                                  <Select value={drf} onValueChange={(setDrf)}>
                                          <SelectTrigger className="text-xs h-[35px] bg-zinc-100 mt-2">
                                          <SelectValue placeholder="Select" className="text-black" />
                                          </SelectTrigger>
                                          <SelectContent className="text-xs">
                                            {employee.map((item, index) => (
                                            <SelectItem key={index} value={item.employeeid}>{item.name}</SelectItem>

                                            ))}
                                          
                                          </SelectContent>
                                  </Select>
                                  <label htmlFor="">Notes</label>
                                  <Textarea value={notes3} onChange={(e) => setNotes3(e.target.value)} className=' text-xs h-[15px]  bg-zinc-100' placeholder='Notes' />

                                  <label htmlFor="">Drafter Reviewer (Drft. Revr.)	</label>
                                  <Select value={drfrvr} onValueChange={(setDrfrvr)}>
                                          <SelectTrigger className="text-xs h-[35px] bg-zinc-100 mt-2">
                                          <SelectValue placeholder="Select" className="text-black" />
                                          </SelectTrigger>
                                          <SelectContent className="text-xs">
                                            {employee.map((item, index) => (
                                            <SelectItem key={index} value={item.employeeid}>{item.name}</SelectItem>

                                            ))}
                                          
                                          </SelectContent>
                                  </Select>
                                  <label htmlFor="">Notes</label>
                                  <Textarea value={notes4} onChange={(e) => setNotes4(e.target.value)} className=' text-xs h-[15px] bg-zinc-100' placeholder='Notes' />

                              
                                  

                              </div>

                                <div className=' w-full flex items-end justify-end mt-4 text-xs'>
                                  <button onClick={() => updateJobComponenAsBoth()} className=' bg-red-600 px-4 py-2 rounded-md w-fit'>Save</button>
                                </div>
                              </>
                            )}  */}

                            

                              <div className=' flex flex-col'>
                                <label htmlFor="" className=' text-xs'>Job Number<span className=' text-red-500 text-lg'>*</span></label>
                                <Input type='text' value={jobno} onChange={(e) => setJobno(e.target.value)} className=' text-xs h-[35px] bg-zinc-200' placeholder='Job Number'/>
                              </div>

                              {/* <div className=' flex items-start gap-4 '>
                                                                                                              
                                                                                          
                                                                                                              <div className=' w-full'>
                                                                                                                <Label className=' text-zinc-500'>Project Name <span className=' text-red-500 text-lg'>*</span></Label>
                                                                                                                <Input type='text' value={projectname} onChange={(e) => setProjectname(e.target.value)} className=' text-xs h-[35px] bg-white' placeholder='Project name'/>
                                                                                          
                                                                                          
                                                                                                              </div>
                                                                                          
                                                                                                             
                                                                                                              <div className="w-full">
                                                                                                                  <Label className="text-zinc-500">
                                                                                                                    Client Name<span className="text-red-500 text-lg">*</span>
                                                                                                                  </Label>
                                                                                                                  <Select value={clientid} onValueChange={setClientid} disabled={!!client}>
                                                                                                                    <SelectTrigger className="text-xs h-[35px] bg-white">
                                                                                                                      <SelectValue placeholder="Select Client" className="text-black" />
                                                                                                                    </SelectTrigger>
                                                                                                                    <SelectContent className="text-xs">
                                                                                                                      {clients.map((item) => (
                                                                                                                        <SelectItem key={item.clientid} value={item.clientid}>
                                                                                                                          {item.clientname}
                                                                                                                        </SelectItem>
                                                                                                                      ))}
                                                                                                                    </SelectContent>
                                                                                                                  </Select>
                                                                                                                </div>
                              
                                                                                                                
                                                                                          
                              </div> */}
                         
                               <div className=' flex flex-col w-full gap-2 text-xs'>
                                 <label htmlFor="">Project Details</label>
                               

                                  <div className=' flex items-start gap-4 '>
                                                                                          
                                                                      
                                      <div className=' w-full'>
                                        <Label className=' text-zinc-500 mt-1'>Project Name</Label>
                                        <Input type='text' value={projectname} onChange={(e) => setProjectname(e.target.value)}   className=' text-xs h-[35px] bg-zinc-100' placeholder='Project name'/>

                                        {/* <Select value={projectname} onValueChange={setProjectname}>
                                          <SelectTrigger className="text-xs h-[35px] bg-zinc-100">
                                          <SelectValue placeholder="Select" className="text-black" />
                                          </SelectTrigger>
                                          <SelectContent className="text-xs">
                                            {projects.map((item, index) => (
                                            <SelectItem key={index} value={item.projectid}>{item.projectname}</SelectItem>

                                            ))}
                                          
                                          </SelectContent>
                                        </Select> */}
                                                                                                                                                                                                                                      
                                      </div>
                                                                                                                                          
                                                                                                                                                             
                                        <div className=' w-full'>
                                              <Label className="text-zinc-500">
                                                Client Name
                                              </Label>
                                              <Select value={clientid} onValueChange={setClientid}>
                                                <SelectTrigger className="text-xs h-[35px] bg-zinc-100">
                                                  <SelectValue placeholder="Select Client" className="text-black" />
                                                </SelectTrigger>
                                                <SelectContent className="text-xs">
                                                  {client.map((item) => (
                                                    <SelectItem key={item.clientid} value={item.clientid}>
                                                      {item.clientname}
                                                    </SelectItem>
                                                  ))}
                                                </SelectContent>
                                              </Select>
                                          </div>
                                          {/* <Label className=' text-zinc-500'>Client Name</Label>
                                        <Input type='text' value={prop.client}  className=' text-xs h-[35px] bg-zinc-100' placeholder='Project name'/> */}
                                                                                                                                                                 
                                                                                                                                          
                                    </div>
                                                                                                                                          
                                    {/* <div className=' flex items-start gap-4 '>
                                                                                                                                                              
                                                                                                                                          
                                      <div className=' w-full'>
                                        <Label className=' text-zinc-500'>Start Date</Label>
                                        <Input type='text' value={prop.start.split('T')[0]}  className=' text-xs h-[35px] bg-zinc-100' placeholder='Project name' />
                                                                                                                                          
                                                                                                                                          
                                      </div>
                                                                                                                                          
                                                                                                                                                             
                                        <div className=' w-full'>
                                          <Label className=' text-zinc-500'>End date</Label>
                                          <Input type='text' value={prop.end.split('T')[0]}  className=' text-xs h-[35px] bg-zinc-100' placeholder='Project name'/>
                                                                                                                                          
                                        </div>
                                                                                                                                          
                                    </div> */}

                                  <div>

                                  <Label className=' text-zinc-500'>Job Component Name</Label>
                                  <Input type='text' value={jcname} onChange={(e) => setJcname(e.target.value)}  className=' text-xs h-[35px] bg-zinc-100' placeholder='Project name'/>

                               
                                 <Label className="mt-2 text-zinc-500">
                                                            Budget Type<span className="text-lg text-red-500">*</span>
                                                          </Label>
                                                          <Select
                                                             value={budgettype}
                                                             onValueChange={setBudgettype}
                                                             disabled
                                                          >
                                                            <SelectTrigger className="text-xs h-[35px] bg-zinc-100 mb-2 ">
                                                              <SelectValue placeholder="Type" className="text-black" />
                                                            </SelectTrigger>
                                                            <SelectContent className="text-xs">
                                                              <SelectItem value="rates">Rates</SelectItem>
                                                              <SelectItem value="lumpsum">Lump sum</SelectItem>
                                                            </SelectContent>
                                                          </Select>
                                
                                                          <Label className="mt-2 text-zinc-500">Job Component Budget $</Label>
                                                          <Input
                                                            type="number"
                                                            disabled
                                                            className="text-xs h-[35px] bg-zinc-100 mb-2"
                                                            placeholder="0"
                                                            value={budget}
                                                            onChange={(e) => setBudget(e.target.valueAsNumber)}
                                                            // disabled={budgettype === "rates"}
                                                          />


                                  <Label className=' text-zinc-500'>Admin Notes</Label>
                                  <Textarea value={adminnotes} onChange={(e) => setAdminnotes(e.target.value)}  className=' text-xs h-[35px] bg-zinc-100' placeholder='Please input here'/>

                                  </div>

                                <label htmlFor="">Job Manager</label>
                                <Select value={jobmanager} onValueChange={setJobmanager}>
                                          <SelectTrigger className="text-xs h-[35px] bg-zinc-100 mt-2">
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
                                          <SelectTrigger className="text-xs h-[35px] bg-zinc-100 mt-2">
                                          <SelectValue placeholder="Select" className="text-black" />
                                          </SelectTrigger>
                                          <SelectContent className="text-xs">
                                            {employee.map((item, index) => (
                                            <SelectItem key={item.employeeid} value={item.employeeid}>{item.name}</SelectItem>

                                            ))}
                                          
                                          </SelectContent>
                                  </Select>
                                  <label htmlFor="">Notes</label>
                                  <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} className=' text-xs h-[15px] bg-zinc-100' placeholder='Notes' />

                                  <label htmlFor="">Engineer Reviewer (Engr. Revr.)</label>
                                  <Select value={engrrvr} onValueChange={(setEngrrvr)}>
                                          <SelectTrigger className="text-xs h-[35px] bg-zinc-100 mt-2">
                                          <SelectValue placeholder="Select" className="text-black" />
                                          </SelectTrigger>
                                          <SelectContent className="text-xs">
                                            {employee.map((item, index) => (
                                            <SelectItem key={index} value={item.employeeid}>{item.name}</SelectItem>

                                            ))}
                                          
                                          </SelectContent>
                                  </Select>
                                  <label htmlFor="">Notes</label>
                                  <Textarea value={notes2} onChange={(e) => setNotes2(e.target.value)} className=' text-xs h-[15px] bg-zinc-100' placeholder='Notes' />

                                  <label htmlFor="">Drafter (Drft.)</label>
                                  <Select value={drf} onValueChange={(setDrf)}>
                                          <SelectTrigger className="text-xs h-[35px] bg-zinc-100 mt-2">
                                          <SelectValue placeholder="Select" className="text-black" />
                                          </SelectTrigger>
                                          <SelectContent className="text-xs">
                                            {employee.map((item, index) => (
                                            <SelectItem key={index} value={item.employeeid}>{item.name}</SelectItem>

                                            ))}
                                          
                                          </SelectContent>
                                  </Select>
                                  <label htmlFor="">Notes</label>
                                  <Textarea value={notes3} onChange={(e) => setNotes3(e.target.value)} className=' text-xs h-[15px]  bg-zinc-100' placeholder='Notes' />

                                  <label htmlFor="">Drafter Reviewer (Drft. Revr.)	</label>
                                  <Select value={drfrvr} onValueChange={(setDrfrvr)}>
                                          <SelectTrigger className="text-xs h-[35px] bg-zinc-100 mt-2">
                                          <SelectValue placeholder="Select" className="text-black" />
                                          </SelectTrigger>
                                          <SelectContent className="text-xs">
                                            {employee.map((item, index) => (
                                            <SelectItem key={index} value={item.employeeid}>{item.name}</SelectItem>

                                            ))}
                                          
                                          </SelectContent>
                                  </Select>
                                  <label htmlFor="">Notes</label>
                                  <Textarea value={notes4} onChange={(e) => setNotes4(e.target.value)} className=' text-xs h-[15px] bg-zinc-100' placeholder='Notes' />

                              
                                  

                              </div>

                                <div className=' w-full flex items-end justify-end mt-4 text-xs'>
                                  <button onClick={() => updateJobComponenAsBoth()} className=' bg-red-600 px-4 py-2 rounded-md w-fit text-white'>Save</button>
                                </div>
                         
                          </DialogContent>
                      </Dialog>
   </>
  )
}
