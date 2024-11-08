"use client"
import React, { useEffect, useMemo, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Leaveform from '@/components/forms/Leaveform'
import WDform from '@/components/forms/Wellnessday'
import Wfhform from '@/components/forms/Wfhform'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Legends from '@/components/common/Legends'
import axios, { AxiosError } from 'axios'
import { env } from 'process'
import toast from 'react-hot-toast'
import { useRouter, useSearchParams } from 'next/navigation'
import { months, statusData, weeks } from '@/types/data'
import { Check, OctagonAlert, Pen, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import Editprojectjobmanager from '@/components/forms/Editprojectjobmanager'
import { Textarea } from '@/components/ui/textarea'
import Createprojectcomponent from './Createprojectcomponent'
import { Graph, Members } from '@/types/types'
import { formatDate, formatDateTime } from '@/utils/functions'
import { Label } from '@/components/ui/label'


interface DateItem {
  date: string;
  status: number;
  hours: number;
  isOnLeave: boolean;
  isOnWellnessday: boolean;
  isOnEvent: boolean;
}

interface Member {
  role: string;
  employee: {
    employeeid: string;
    fullname: string;
  };
  dates?: DateItem[];
}

interface GraphItem {
  teamname: string;
  projectname: string;
  clientname: string;
  jobno: number;
  jobmanager: {
    employeeid: string;
    fullname: string;
    isManager: boolean;
    isJobManager: boolean,
  };
  jobcomponent: {
    componentid: string;
    componentname: string;
  };
  notes: string;
  members: Member[];
}

interface Data {
  graph: GraphItem[];

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



export default function Yourworkload() {
  const [dialog, setDialog] = useState(false)
  const [dialog2, setDialog2] = useState(false)
  const [leaveStatus, setLeavestatus] = useState(false)
  const [date, setDate] = useState('')
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [hours, setHours] = useState(0)
  const [employeeid, setEmployeeid] = useState('')
  const [projectid, setProjectid] = useState('')
  const params = useSearchParams()
  const id = params.get('projectid')
  const refresh = params.get('state')
  const [addStatus, setAddstatus] = useState([])
  const [wdStatus, setWdstatus] = useState(false)
  const [event, setEvent] = useState(false)
  const [isJobmamager, setIsjobmanager] = useState(true) 
  const [employee, setEmployee] = useState<Employee[]>([])
  const [client, setClient] = useState<Client[]>([])
  const [projects, setProjects] = useState<Project[]>([])

  const [projectname, setProjectname] = useState('')
  const [jobmanager, setJobmanager] = useState('')
  const [jobno, setJobno] = useState('')

  const [engr, setEngr] = useState('')
  const [engrrvr, setEngrrvr] = useState('')
  const [drf, setDrf] = useState('')
  const [drfrvr, setDrfrvr] = useState('')
  const [notes, setNotes] = useState('')


  const router = useRouter()

  //selected status
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const handleSelectRow = (id: string) => {
    setSelectedRows((prevSelectedRows) => {
      const isSelected = prevSelectedRows.includes(id);
  
      if (isSelected) {
        // Deselect: Remove the id from the array
        return prevSelectedRows.filter((rowId) => rowId !== id);
      } else {
        // Select: Add the id to the array
        return [...prevSelectedRows, id];
      }
    });
  };


  const getList = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/jobcomponent/listjobcomponent?projectid=${id}`,{
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
        }
    })

  
    setList(response.data.data)
  
  }

  //update workload
  const updateWorkload = async () => {
  
    try {
      const request = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/jobcomponent/editstatushours`,{
        jobcomponentid:  projectid,
        employeeid: employeeid,
        date: date,
        status: selectedRows,
        hours: hours
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
      getList()
      setDialog(false)
      setSelectedRows([])
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


  const position = (jobManager: boolean, manager: boolean) => {
    if(jobManager && manager === true){
      return 'Project & Job Manager'
    }else if(jobManager === false && manager === true){
      return 'Project Manager'
    }else if(jobManager === true && manager === false){
      return 'Job Manager'
    }else{
      return 'Your not allowed to edit this project'
    }
  }

  const [list, setList] = useState<Graph[]>([])
  useEffect(() => {
    try {
      const timer = setTimeout(() => {
        const getList = async () => {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/jobcomponent/listjobcomponent?projectid=${id}`,{
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json'
              }
          })
      
        
          setList(response.data.data)
        
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
    
    
  },[refresh])


  const isDateInRange = (dateToCheck: string, startDate: string, endDate: string): boolean => {
    const checkDate = new Date(dateToCheck);
    const start = new Date(startDate);
    const end = new Date(endDate);

    checkDate.setHours(0, 0, 0, 0);
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);


  
    // Check if the dateToCheck is between or equal to startDate and endDate
    return checkDate >= start && checkDate <= end;
  }

  const statusColor = (data: string[], date: string, leaveStart: string, leaveEnd: string, eventStart: string, eventEnd: string, wddate: string, hours: number) => {
    const colorData: string[] = [];

    const isLeaveInRange = isDateInRange(date, leaveStart, leaveEnd);
    const isEventInRange = isDateInRange(date, eventStart, eventEnd);


    if(data.includes('1')){
      colorData.push('bg-red-500')
    }
    if(data.includes('2')){
      colorData.push('bg-amber-500')
    }
    if(data.includes('3')){
      colorData.push('bg-yellow-300')
    }
    if(data.includes('4')){
      colorData.push('bg-green-500')
    }
    if(data.includes('5')){
      colorData.push('bg-blue-500')
    }
    if(data.includes('6')){
      colorData.push('bg-cyan-400')
    }
    if(isLeaveInRange == true){
      colorData.push('bg-violet-300')
    }
    if(isEventInRange == true){
      colorData.push('bg-gray-300')
    }
    if(hours > 8){
      colorData.push('bg-pink-500')
    }

    if(date === wddate){
      colorData.push('bg-fuchsia-400')
    }

    return colorData; 
  }

  const wdStatusChecker = (wddate: string, date: string) => {
    console.log('wd',wddate, date)
    if(wddate === date){
      setWdstatus(true)
    } else if (wddate === undefined){
      setWdstatus(false)
    } else {
      setWdstatus(false)
    }
   
  }


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
  
        console.log('Project list',response.data)
        setProjects(response.data.data.projectlist)
    
      }
      getList()
    },500)
    return () => clearTimeout(timer)
    
    
  },[])

  //update as manager
  const updateJobComponenAsManager = async (id: string) => {
  
    try {
      const request = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/jobcomponent/editjobcomponentdetails`,{
        jobcomponentid: id,
        projectid: projectname,
        jobno: jobno,
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
      getList()
      setDialog(false)
      setSelectedRows([])
      setDialog2(false)

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
  const updateJobComponenAsJobManager = async (id: string) => {

    const members = [
      {
        employee: engr, 
        role: "Engnr.",
        notes: notes
    },
    {
      employee: engrrvr, 
      role: "Engr. Revr.",
      notes: notes
  },
  {
    employee: drf, 
    role: "Drft.", 
    notes: notes
  },
  {
    employee: drfrvr, 
    role: "Drft. Revr.", 
    notes: notes
  },
]
  
    try {
      const request = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/jobcomponent/editjobmanagercomponents`,{
        jobcomponentid: id,
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
      getList()
      setDialog(false)
      setSelectedRows([])
      setDialog2(false)

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
  const updateJobComponenAsBoth = async (id: string) => {

    const members = [
      {
        employee: engr, 
        role: "Engnr.",
        notes: notes
    },
    {
      employee: engrrvr, 
      role: "Engr. Revr.",
      notes: notes
  },
  {
    employee: drf, 
    role: "Drft.", 
    notes: notes
  },
  {
    employee: drfrvr, 
    role: "Drft. Revr.", 
    notes: notes
  },
]
  
    try {
      const request = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/jobcomponent/editalljobcomponentdetails`,{
        jobcomponentid: id,
        projectid: projectname,
        jobno: jobno,
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
      getList()
      setDialog(false)
      setSelectedRows([])
      setDialog2(false)
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

  const findMember = (data: Members[]) => {
    const role1 = data.find((item) => item.role.trim() === 'Engnr.')
    const role2 = data.find((item) => item.role.trim() === 'Engr. Revr.')
    const role3 = data.find((item) => item.role.trim() === 'Drft.')
    const role4 = data.find((item) => item.role.trim() === 'Drft. Revr.')

    console.log('Members',data)

    setEngr(role1?.employee.employeeid || '')
    setEngrrvr(role2?.employee.employeeid || '')
    setDrf(role3?.employee.employeeid || '')
    setDrfrvr(role4?.employee.employeeid || '')
   
  }



  



  return (
   <div className=' w-full h-full flex flex-col justify-center bg-secondary p-4 text-zinc-100'>

      <div className=' w-full flex items-center justify-between h-auto bg-primary mb-2 p-4 text-xs'>

        <div className=' flex flex-col gap-1 bg-primary rounded-sm text-xs'>

          <p className=' text-xs mt-2'>Project Component:</p>
          <div className='flex items-center gap-2 bg-primary rounded-sm text-xs'>
            <Createprojectcomponent>
              <button className={`text-xs px-3 py-1 bg-red-600  rounded-sm`}>Create</button>
            </Createprojectcomponent>
          </div>
            
        </div>

        <Legends/>

        {/* <div className=' flex flex-col'>
         
          <div className=' flex items-center gap-2 text-xs mt-2'>
          <div className=' flex flex-col items-center gap-2 text-xs mt-2'>
            <p className=' text-xs'>Filter by week:</p>
            <Select >
              <SelectTrigger className="w-[120px] bg-secondary text-xs">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent className=' bg-primary text-xs border-zinc-600 text-white '>
              {weeks.map((item, index) => (
                <SelectItem key={index} value={item}>{item}</SelectItem>
              ))}
               
              </SelectContent>
            </Select>

           

          </div>

          </div>
        </div> */}

       
      </div>

      <div className=' h-full w-full flex flex-col max-w-[1920px]'>
        <div className=' h-full overflow-y-auto flex items-start justify-center bg-secondary w-full max-w-[1920px]'>
          {list.length !== 0 ? (
            <>
            <table className="table-auto w-full border-collapse ">
            <thead className=' bg-secondary h-[100px]'>

              <tr className=' text-[0.6rem] text-zinc-100 font-normal'>
                <th className=' w-[20px] font-normal'>Action</th>
                <th className=' w-[50px] font-normal'>Team</th>
                <th className=' font-normal w-[50px]'>Job No.</th>
                <th className=' font-normal w-[50px]'>Client</th>
                <th className=' font-normal w-[70px]'>Project Name</th>
                <th className=' font-normal w-[70px]'>Job Mgr.</th>
                <th className=' font-normal w-[70px]'>Job Component</th>
                <th className=' w-[70px] font-normal'>Members</th>
                <th className=' font-normal w-[70px]'>Role</th>
                <th className=' font-normal w-[70px]'>Notes</th>

              
              </tr>
            </thead>
            <tbody>
            {list.map((graphItem, graphIndex) =>
              graphItem.members.map((member, memberIndex) => (
                <tr key={`${graphIndex}-${memberIndex}`} className="bg-primary text-[.6rem] py-2 h-[40px] border-[1px] border-zinc-600">
                    <td className="text-center text-white flex items-center justify-center h-[40px] w-[30px]">
                      {/* <Editprojectjobmanager isJobmanager={graphItem.jobmanager.isJobManager} isManager={graphItem.jobmanager.isManager} teamindex={graphIndex}>
                        {memberIndex === 0 && (<button className=' p-1 bg-red-600 rounded-sm'><Pen size={12}/></button>)}
                      </Editprojectjobmanager> */}

                      <Dialog open={dialog2} onOpenChange={setDialog2}>
                          <DialogTrigger>
                              {memberIndex === 0 && (<button onClick={() => {setProjectname(graphItem.projectname.projectid), setJobmanager(graphItem.jobmanager.employeeid), setJobno(graphItem.jobno), findMember(graphItem.members), setNotes(graphItem.members[0].notes)}} className=' p-1 bg-red-600 rounded-sm'><Pen size={12}/></button>)}
                          </DialogTrigger>
                          <DialogContent className=' max-w-[600px] bg-secondary border-none p-6 text-white'>
                            <DialogHeader>
                              <DialogTitle>Edit Project <span className=' text-xs text-zinc-400'>( As {position(graphItem.jobmanager.isJobManager, graphItem.jobmanager.isManager)})</span></DialogTitle>
                              <DialogDescription className={` ${graphItem.jobmanager.isManager === true ? 'text-white' : ' text-red-500'}`}>
                                {/* {graphItem.jobmanager.isManager === true ? 'Your the project manager of this project, you are allowed to edit this project' : ' Your are not the project manager of this project, you are not allowed to edit this project'} */}
                                
                              </DialogDescription>
                            </DialogHeader>

                            {(graphItem.jobmanager.isManager === true && graphItem.jobmanager.isJobManager === false ) && (
                              <div className=' flex flex-col w-full gap-2 text-xs'>


                                <label htmlFor="">Project Name</label>
                                <Select value={projectname} onValueChange={setProjectname}>
                                          <SelectTrigger className="text-xs h-[35px] bg-primary mt-2">
                                          <SelectValue placeholder="Select" className="text-black" />
                                          </SelectTrigger>
                                          <SelectContent className="text-xs">
                                            {projects.map((item, index) => (
                                            <SelectItem key={index} value={item.projectid}>{item.projectname}</SelectItem>

                                            ))}
                                          
                                          </SelectContent>
                                  </Select>

                                <label htmlFor="">Job no</label>
                                <Input value={jobno} onChange={(e) => setJobno(e.target.value)} type='text' className=' text-xs h-[35px] bg-primary' placeholder='Job no' />

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
                                    <button onClick={() => updateJobComponenAsManager(graphItem._id)} className=' bg-red-600 px-4 py-2 rounded-md w-fit'>Save</button>
                                  </div>
                                
                              </div>
                            )}



                            {(graphItem.jobmanager.isJobManager === true && graphItem.jobmanager.isManager === false ) && (
                              <div className=' flex flex-col w-full gap-2 text-xs'>
                              
                                <label htmlFor="">Engineer (Engr.)</label>
                              
                                  <Select>
                                        <SelectTrigger className="text-xs h-[35px] bg-white mt-2">
                                        <SelectValue placeholder="Select Employee" className="text-black" />
                                        </SelectTrigger>
                                        <SelectContent className="text-xs">
                                          {employee.map((item, index) => (
                                          <SelectItem key={index} value={item.employeeid}>{item.name}</SelectItem>

                                          ))}
                                        
                                        </SelectContent>
                                </Select>

                                <label htmlFor="">Engineer Reviewer (Engr. Revr.)</label>
                                <Input type='text' className=' text-xs h-[35px] bg-primary' placeholder='Engineer Reviewer (Engr. Revr.)' />

                                <label htmlFor="">Drafter (Drft.)</label>
                                <Input type='text' className=' text-xs h-[35px] bg-primary' placeholder='Drafter (Drft.)' />

                                <label htmlFor="">Drafter Reviewer (Drft. Revr.)	</label>
                                <Input type='text' className=' text-xs h-[35px] bg-primary' placeholder='Drafter Reviewer (Drft. Revr.)	' />

                                <label htmlFor="">Notes</label>
                                <Textarea className=' text-xs h-[35px] bg-primary' placeholder='Notes' />
                              

                            </div>
                            )}

                            {(graphItem.jobmanager.isJobManager === true && graphItem.jobmanager.isManager === true) && (
                              <>
                               <div className=' flex flex-col w-full gap-2 text-xs'>
                                 <label htmlFor="">Project Name</label>
                                <Select value={projectname} onValueChange={setProjectname}>
                                          <SelectTrigger className="text-xs h-[35px] bg-primary mt-2">
                                          <SelectValue placeholder="Select" className="text-black" />
                                          </SelectTrigger>
                                          <SelectContent className="text-xs">
                                            {projects.map((item, index) => (
                                            <SelectItem key={index} value={item.projectid}>{item.projectname}</SelectItem>

                                            ))}
                                          
                                          </SelectContent>
                                  </Select>

                                <label htmlFor="">Job no</label>
                                <Input value={jobno} onChange={(e) => setJobno(e.target.value)} type='text' className=' text-xs h-[35px] bg-primary' placeholder='Job no' />

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
                                    <Select value={engr} onValueChange={(setEngr)}>
                                          <SelectTrigger className="text-xs h-[35px] bg-primary mt-2">
                                          <SelectValue placeholder="Select" className="text-black" />
                                          </SelectTrigger>
                                          <SelectContent className="text-xs">
                                            {employee.map((item, index) => (
                                            <SelectItem key={index} value={item.employeeid}>{item.name}</SelectItem>

                                            ))}
                                          
                                          </SelectContent>
                                  </Select>

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
                                  <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} className=' text-xs h-[35px] bg-primary' placeholder='Notes' />
                                  

                              </div>

                                <div className=' w-full flex items-end justify-end mt-4 text-xs'>
                                  <button onClick={() => updateJobComponenAsBoth(graphItem._id)} className=' bg-red-600 px-4 py-2 rounded-md w-fit'>Save</button>
                                </div>
                              </>
                            )} 

                         
                              
                            
                          </DialogContent>
                        </Dialog>
                     
                      </td>
                    <td className="text-center text-red-600">{memberIndex === 0 && graphItem.teamname}</td>
                    <td className="text-center">{memberIndex === 0 && graphItem.jobno}</td>
                    <td className="text-center">{memberIndex === 0 && graphItem.clientname.name}</td>
                    <td className="text-center">{memberIndex === 0 && graphItem.projectname.name}</td>
                    <td className="text-center">{memberIndex === 0 && graphItem.jobmanager.fullname}</td>
                    <td className="text-center">{memberIndex === 0 && graphItem.jobcomponent}</td>
        
                  <td className="text-center">{member.employee.fullname}</td>
                  <td className="text-center text-[.5rem]">{member.role}</td>
                  <td className="text-center">
                    <Dialog>
                      <DialogTrigger>{member.notes.slice(0, 25) || ''} ...</DialogTrigger>
                      <DialogContent className=' bg-secondary p-6 border-none max-w-[600px] text-white'>
                        <DialogHeader>
                          <DialogTitle>Notes</DialogTitle>
                          <DialogDescription>
                            
                          </DialogDescription>
                        </DialogHeader>
                        <p className=' text-xs text-zinc-400'>{member.notes}</p>
                      </DialogContent>
                    </Dialog>

                    </td>
                

                </tr>
              ))
            )}
          </tbody>
            </table>

            <div className=' overflow-x-auto w-[1100px]'>
              <table className="table-auto w-[700px] border-collapse ">
                <thead className=' w-[800px] bg-secondary h-[100px]'>
                  <tr className=' text-[0.6rem] text-zinc-100 font-normal'>
                  
                    {list[0]?.allDates.map((dateObj, index) => (
                      <>
                        <th key={index} className=' relative font-normal px-1 border-[1px] border-zinc-700'>

                       
                          <p className=' whitespace-nowrap rotate-90'>{formatDate(dateObj)}</p>
                        </th>
                        {(index + 1) % 5 === 0 && (
                          <th key={`total-${index}`} className='font-normal px-1 w-[30px] border-[1px] border-zinc-700'>
                            <p className='rotate-90'>Total Hours</p>
                          </th>
                        )}
                      </>
                    ))}
                  
                    
                  </tr>
                </thead>
                <tbody>
                {list.map((graphItem, graphIndex) =>
                    graphItem.members.map((member, memberIndex) => (
                      <tr key={`${graphIndex}-${memberIndex}`} className="bg-primary text-[.6rem] py-2 h-[41px] border-[1px] border-zinc-600">
                        
                        {list[0]?.allDates.map((dateObj, dateIndex) => {
                          // Find the corresponding date in member.dates
                          const memberDate = member.dates?.find(date => formatDate(date.date) === formatDate(dateObj));
                          
                          // Calculate sum every 5 days
                          const startIndex = Math.floor(dateIndex / 5) * 5;
                          const endIndex = startIndex + 5;

                          // Sum the hours for the current set of 5 days
                          const totalHours = member.dates?.slice(startIndex, endIndex).reduce((acc, date) => acc + date.hours, 0);

                          return (
                            <>
                              <td 
                                key={dateIndex} 
                                className="relative text-center overflow-hidden bg-white cursor-pointer border-[1px]"
                                onClick={() => {
                              
                                    setDialog(true);
                                    // setHours(memberDate.hours);
                                    setDate(dateObj);
                                    setProjectid(graphItem._id);
                                    setName(member.employee.fullname);
                                    setEmployeeid(member.employee.employeeid);
                                    setHours(memberDate?.hours || 0)
                                    setAddstatus(memberDate?.status || [])
                                    setSelectedRows(memberDate?.status || [])
                                    setLeavestatus(isDateInRange(dateObj,member.leaveDates[0]?.leavestart,member.leaveDates[0]?.leaveend))
                                    setEvent(isDateInRange(dateObj,member.eventDates[0]?.startdate,member.eventDates[0]?.enddate))
                                    wdStatusChecker(member.wellnessDates[0], dateObj)
                                    setIsjobmanager(graphItem.jobmanager.isJobManager)
                                  
                                    setRole(member.role)
          
                                  }
                                }
                              >
                                <div className=' w-full h-[40px] absolute flex top-0 '>
                                  {statusColor(
                                    memberDate?.status || [],
                                    dateObj,
                                    member.leaveDates.length !== 0 ? member.leaveDates[0]?.leavestart : '', 
                                    member.leaveDates.length !== 0 ? member.leaveDates[0]?.leaveend : '', 
                                    member.eventDates.length !== 0 ? member.eventDates[0]?.startdate : '', 
                                    member.eventDates.length !== 0 ? member.eventDates[0]?.enddate : '', 
                                    member.wellnessDates[0],
                                    memberDate?.hours || 0,
                                  ).map((item, index) => (
                                    <div key={index} className={`w-full h-[40px] ${item}`}>

                                    </div>

                                  ))}

                                </div>
                            
                                {/* Render the hours if the date exists, otherwise initialize with 0 */}
                                <p className='relative text-black font-bold text-xs z-30'>
                                  {memberDate ? memberDate.hours : '-'}
                                </p>
                              </td>

                              {/* Insert Total every 5 days */}
                              {(dateIndex + 1) % 5 === 0 && (

                                <th key={`total-${dateIndex}`} className='font-normal w-[40px] bg-primary border-[1px] border-zinc-700'>
                                  <p className=''>{totalHours}</p> {/* Display the sum of hours for every 5 days */}
                                </th>
                              )}
                            </>
                          );
                        })}
                      </tr>
                    ))
                  )}
              </tbody>
              </table>
            </div>

            

           {isJobmamager === true && (
             <Dialog open={dialog} onOpenChange={setDialog}>
                    <DialogContent className=' p-8 bg-secondary border-none text-white'>
                      <DialogHeader>
                        <DialogTitle>Update workload ({name} <span className=' text-xs text-red-500'>({role})</span> at {formatDate(date)})</DialogTitle>
                        <DialogDescription>
                          Note, you can only update the hours rendered if the employee is not on wellness day.
                        </DialogDescription>
                      </DialogHeader>
                      <div className=' w-full flex flex-col gap-2'>

                        <p>Employee is on:</p>

                        <div className=' text-xs flex flex-col gap-1 rounded-sm'>
                        
                          <p className=' text-zinc-400 flex items-center gap-2'>Leave:{leaveStatus === true ? <Check size={12} color='green'/> : <X size={12} color='red'/>}</p>
                          <p className=' text-zinc-400 flex items-center gap-2'>Wellness day:{wdStatus === true ? <Check size={12} color='green'/> : <X size={12} color='red'/>}</p>
                          <p className=' text-zinc-400 flex items-center gap-2'>Event:{event === true ? <Check size={12} color='green'/> : <X size={12} color='red'/>}</p>
                        </div>

                    

                      <label htmlFor="" className=' text-xs mt-4'>Select Status</label>

                      <div className='w-full flex items-center gap-6'>
                          {statusData.map((item) => (
                            <div key={item.id} className='flex items-center gap-1 text-xs'>
                              <input
                              disabled={wdStatus}
                                value={item.id}
                                type="checkbox"
                                checked={selectedRows.includes(item.id)}
                                onChange={() => handleSelectRow(item.id)}
                              />
                              <p className=' p-1'>{item.name}</p>
                            </div>
                          ))}
                        </div>


                    </div>

                
                      <div className=' flex flex-col gap-2 text-xs'>
                        <label htmlFor="">Hours Rendered</label>
                        <input disabled={wdStatus || event} type="number" value={hours} onChange={(e) => setHours(e.target.valueAsNumber)} placeholder='Hours' id="" className=' bg-primary p-2 rounded-md text-xs' />
                        
                      </div>
            
                      <div className=' w-full flex items-end justify-end mt-4'>
                        <button disabled={wdStatus || event} onClick={() => updateWorkload()} className=' px-4 py-2 bg-red-600 text-xs text-white rounded-md'>Save</button>
                      </div>

                      {(wdStatus === true || event === true) && (
                        <p className=' text-xs text-red-500 flex items-center gap-2'><OctagonAlert size={15}/> Employee is in on wellness or event day, you can't update this selected workload</p>
                      )}

                      
                  
                  
                    </DialogContent>
            </Dialog>
           )}
            
            </>
          ) : (
            <div className=' w-full h-full flex items-center justify-center'>
              <p className=' text-xs text-zinc-400'>No job component's yet under this project, please create one to see the workload!</p>

            </div>
          )}
          

          

        </div>
       
        
      </div>

    
        
    </div>
  )
}
