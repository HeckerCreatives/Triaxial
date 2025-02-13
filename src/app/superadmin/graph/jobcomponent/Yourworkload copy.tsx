"use client"
import React, { useEffect, useRef, useState } from 'react'
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
import Legends from '@/components/common/Legends'
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { useRouter, useSearchParams } from 'next/navigation'
import {statusData} from '@/types/data'
import { Check, Copy, File, Folder, Layers2, OctagonAlert, Pen, Plus, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import Createprojectcomponent from './Createprojectcomponent'
import { Graph, Members } from '@/types/types'
import { formatDate } from '@/utils/functions'
import { any } from 'zod'
import Invoice from '@/components/forms/Invoice'
import Copyprojectcomponent from './Copyprojectcomponent'
import JobComponentStatus from '@/components/forms/JobComponentStatus'
import EditJobComponent from '@/components/forms/EditJobComponent'
import DuplicateJobComponent from '@/components/forms/DuplicateJobComponent'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { clientColor } from '@/utils/helpers'
import Individualrequest from './IndividualRequest'




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

type Event = {
  startdate: string
  enddate: string
}

type Wellnessday = {
  startdate: string
  enddate: string
}

type Leave = {
  leavestart: string
  leaveend: string
}

interface FormData {
  date: string;
  employeeid: string;
  hours: number;
  jobcomponentid: string;
  status: string[];
}

type List = {
  name: string
  members: Workload[]
}

type Workload = {
initial: string
id: string,
name: string
resource: string
dates: Dates[]
leave: [
  {
    leavestart: string
    leaveend: string
    }
],
event: [
  {
    eventstart: string
    eventend: string
    }
],
wellness: [
  {
      wellnessdates: string
  }
],
}

type Dates = {
  date: string
  eventDay: boolean
  leave: boolean
  status: string[]
  totalhoursofjobcomponents: number
  wellnessDay: boolean
}



export default function Yourworkload() {
  const [dialog, setDialog] = useState(false)
  const [dialog2, setDialog2] = useState(false)
  const [dialog3, setDialog3] = useState(false)
  const [leaveStatus, setLeavestatus] = useState(false)
  const [date, setDate] = useState('')
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [hours, setHours] = useState(0)
  const [employeeid, setEmployeeid] = useState('')
  const [projectid, setProjectid] = useState('')
  const params = useSearchParams()
  const id = params.get('teamid')
  const scrollId= params.get('jobno')
  const refresh = params.get('state')
  const [addStatus, setAddstatus] = useState([])
  const [wdStatus, setWdstatus] = useState(false)
  const [event, setEvent] = useState(false)
  const [leave, setLeave] = useState(false)
  const [isJobmamager, setIsjobmanager] = useState(true) 
  const [isMamager, setIsmanager] = useState(true) 
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
  const [notes2, setNotes2] = useState('')
  const [notes3, setNotes3] = useState('')
  const [notes4, setNotes4] = useState('')

  const [componentid, setComponentid] = useState('')
  const [tempData, setTempdata] = useState()
  const [list, setList] = useState<Graph[]>([])

   const handleCheckboxChange = (id: string) => {
     setComponentid((prevSelectedId) => (prevSelectedId === id ? '' : id));
   };

  const findJobComponent = list.find((item) => item._id === componentid)



  const router = useRouter()

  //selected status
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);

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
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/jobcomponent/listteamjobcomponent?teamid=${id}`,{
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
        status: selected,
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

  const removeWorkload = async () => {
    setHours(0)
    setSelected([])
  
    try {
      const request = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/jobcomponent/editstatushours`,{
        jobcomponentid:  projectid,
        employeeid: employeeid,
        date: date,
        status: [],
        hours: null
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
          }
      })

      const response = await toast.promise(request, {
        loading: 'Removing workload data....',
        success: `Successfully removed`,
        error: 'Error while removing workload data',
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
            toast.error(`Cannot remove an empty data`)     
               
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

  useEffect(() => {
    try {
      const timer = setTimeout(() => {
        const getList = async () => {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/jobcomponent/listteamjobcomponent?teamid=${id}`,{
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

  const statusColor = (data: string[], date: string, leaveStart: string, leaveEnd: string, eventStart: string, eventEnd: string, wddate: string, hours: number, eventDates: Event[], leaveDates: Leave[], wellnessDates: string[]) => {
    const colorData: string[] = [];

    const isLeaveInRange = isDateInRange(date, leaveStart, leaveEnd);
    const isEventInRange = isDateInRange(date, eventStart, eventEnd);

    const isWithinAnyEventDate = eventDates.some((item) =>
      isDateInRange(date, item.startdate, item.enddate)
    );

    const isWithinAnyLeaveDate = leaveDates.some((item) =>
      isDateInRange(date, item.leavestart, item.leaveend)
    );

     // Check if the date is in wellnessDates
  const isWellnessDate = wellnessDates.some(
    (wellnessDate) => wellnessDate.includes(date.split('T')[0])
  );;

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
    if(isWithinAnyLeaveDate){
      colorData.push('bg-violet-300')
    }
    if(isWithinAnyEventDate){
      colorData.push('bg-gray-300')
    }
    if(hours > 9){
      colorData.push('bg-pink-500')
    }

    if(isWellnessDate){
      colorData.push('bg-fuchsia-400')
    }

    return colorData; 
  }

  const wdStatusChecker = (wddate: string[], date: string, eventDates: Event[]) => {

    const isWellnessDate = wddate.includes(date)

    const isWithinAnyEventDate = eventDates.some((item) =>
      isDateInRange(date, item.startdate, item.enddate)
    );
   
    if(isWellnessDate){
      setWdstatus(true)
    } else if(isWithinAnyEventDate){
      setWdstatus(true)
    }else {
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
        setProjects(response.data.data.projectlist)
    
      }
      getList()
    },500)
    return () => clearTimeout(timer)
    
    
  },[])


  const findMember = (data: Members[]) => {
    const role1 = data.find((item) => item.role.trim() === 'Engnr.')
    const role2 = data.find((item) => item.role.trim() === 'Engr. Revr.')
    const role3 = data.find((item) => item.role.trim() === 'Drft.')
    const role4 = data.find((item) => item.role.trim() === 'Drft. Revr.')


    setEngr(role1?.employee._id || '')
    setEngrrvr(role2?.employee._id || '')
    setDrf(role3?.employee._id || '')
    setDrfrvr(role4?.employee._id || '')
   
  }

  const url = new URL(window.location.href);

  const handleChangeCheckbox = (id: string) => {
    setSelected((prevSelected) => {
      // If the first item is selected, toggle it
      if (id === statusData[0].id) {
        return prevSelected.includes(id)
          ? prevSelected.filter((item) => item !== id)
          : [...prevSelected, id];
      }

      // For the other items, only allow one to be selected at a time
      return prevSelected.includes(id)
        ? prevSelected.filter((item) => item !== id)
        : [statusData[0].id, id].filter((value) => prevSelected.includes(value) || value === id);
    });
  };


    const engrMember = findJobComponent?.members.find((item) => item.role === 'Engr.');
  const engrId = engrMember?._id;

  const engrrvrMember = findJobComponent?.members.find((item) => item.role === 'Engr. Revr.');
  const engrrvrId = engrrvrMember?._id; 

  const drftrvrMember = findJobComponent?.members.find((item) => item.role === 'Drft. Revr.');
  const draftrvrId = drftrvrMember?._id; 

  const drftMember = findJobComponent?.members.find((item) => item.role === 'Drft.');
  const draftId = drftMember?._id; 


  const firstDivRef = useRef<HTMLDivElement>(null);
  const secondDivRef = useRef<HTMLDivElement>(null);
  const individualRequestRef = useRef<HTMLDivElement>(null); // New ref
  
  

  const syncScroll = (source: HTMLDivElement, targets: HTMLDivElement[]) => {
    const scrollLeft = source.scrollLeft;
    targets.forEach((target) => {
      if (Math.abs(target.scrollLeft - scrollLeft) > 1) { // Only update if there's a significant difference
        target.scrollLeft = scrollLeft;
      }
    });
  };
  
  

  useEffect(() => {
    const firstDiv = firstDivRef.current;
    const secondDiv = secondDivRef.current;
    const individualRequestDiv = individualRequestRef.current;
  
    if (!firstDiv || !secondDiv || !individualRequestDiv) return;
  
    let timeout: NodeJS.Timeout | null = null;
  
    const handleScroll = (source: HTMLDivElement, targets: HTMLDivElement[]) => {
      return () => {
        if (timeout) clearTimeout(timeout);
        
        timeout = setTimeout(() => {
          syncScroll(source, targets);
        }, 10); // Delay to prevent jittering
      };
    };
  
    const firstScroll = handleScroll(firstDiv, [secondDiv, individualRequestDiv]);
    const secondScroll = handleScroll(secondDiv, [firstDiv, individualRequestDiv]);
    const individualScroll = handleScroll(individualRequestDiv, [firstDiv, secondDiv]);
  
    firstDiv.addEventListener("scroll", firstScroll);
    secondDiv.addEventListener("scroll", secondScroll);
    individualRequestDiv.addEventListener("scroll", individualScroll);
  
    return () => {
      firstDiv.removeEventListener("scroll", firstScroll);
      secondDiv.removeEventListener("scroll", secondScroll);
      individualRequestDiv.removeEventListener("scroll", individualScroll);
    };
  }, []);



  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollId && tableRef.current && list.length > 0) {
      const row = tableRef.current.querySelector(`[data-invoice-id="${scrollId}"]`);
      if (row) {
        row.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        console.log('Row not found'); // Debugging
      }
    }
  }, [scrollId, list]);







  //multi form
  const [forms, setForms] = useState<FormData[]>([
    {
      date: '',
      employeeid: employeeid,
      hours: 0,
      jobcomponentid: projectid,
      status: [],
    },
  ]);

  // Add a new form
  const addForm = () => {
    setForms([
      ...forms,
      {
        date: '',
        employeeid: employeeid,
        hours: 0,
        jobcomponentid: projectid,
        status: [],
      },
    ]);
  };

  const deleteForm = (index: number) => {
    const newForms = forms.filter((_, i) => i !== index);
    setForms(newForms);
  };

  const handleChange = (index: number, field: keyof FormData, value: string | number | string[]) => {
    const newForms = [...forms];
    (newForms[index][field] as typeof value) = value;
    setForms(newForms);
  };


  const handleCheckbox = (index: number, id: string) => {
    const newForms = [...forms];
  
    const currentStatus = newForms[index].status;
  
    if (id === statusData[0].id) {
      newForms[index].status = currentStatus.includes(id)
        ? currentStatus.filter((statusId) => statusId !== id)
        : [...currentStatus, id]; 
    } else {
      if (currentStatus.includes(id)) {
        newForms[index].status = currentStatus.filter((statusId) => statusId !== id);
      } else {
        const newStatus = [statusData[0].id, id].filter(
          (value) => currentStatus.includes(value) || value === id
        );
        newForms[index].status = newStatus;
      }
    }
  
    setForms(newForms);
  };

  const handleSubmit = () => {
    console.log('Submitted Forms:', forms);
  };

  const updateMultipleWorkload = async () => {
  
    try {
      const request = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/jobcomponent/editmultiplestatushours`,{
        jobcomponentid:  projectid,
        employeeid: employeeid,
        updates: forms
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
      setForms([
        {
          date: '',
          employeeid: employeeid,
          hours: 0,
          jobcomponentid: projectid,
          status: [],
        },
      ]);
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

  const longestAlldates = list.reduce((max, current) => {
    return current.allDates.length > max.allDates.length ? current : max;
  }, list[0]);

  console.log(longestAlldates?.allDates)









  return (
   <div className=' w-full h-full flex flex-col justify-center bg-secondary p-4 text-zinc-100'>

      <div className=' w-full flex items-center justify-between h-auto bg-primary mb-2 p-4 text-xs'>

        <div className=' flex gap-12'>

          <div className=' flex flex-col gap-1 bg-primary rounded-sm text-xs'>

            <p className=' text-xs mt-2'>Project Component:</p>
            <div className='flex items-center gap-2 bg-primary rounded-sm text-xs mt-2'>
              <Createprojectcomponent>
                <div className=' flex flex-col items-center justify-center gap-1 text-[.6rem] w-[40px]'>
                  <button className={`text-xs p-1 bg-red-600  rounded-sm`}><Plus size={12}/></button>
                  <p>Create</p>
                </div>
              </Createprojectcomponent>

              {componentid === '' ? (
                 <div className=' flex flex-col items-center justify-center gap-1 text-[.6rem] w-[40px]'>
                  <button onClick={() => toast.error('Please select a job component below')} className={`text-xs p-1 bg-red-600  rounded-sm`}><Pen size={12}/></button>
                  <p>Edit</p>
                </div>
                
              ) : (
                <>
                {(isJobmamager === true || isMamager === true) ? (
                   <EditJobComponent id={findJobComponent?.componentid} isManger={findJobComponent?.jobmanager.isManager} isJobManager={findJobComponent?.jobmanager.isJobManager} project={findJobComponent?.projectname.projectid} jobmanager={findJobComponent?.jobmanager.employeeid} engr={engrId} engrnotes={engrMember?.notes} engrrvr={engrrvrId} engrrvrnotes={engrrvrMember?.notes} drftr={draftId} drftrnotes={drftMember?.notes} drftrrvr={draftrvrId} drftrrvrnotes={drftrvrMember?.notes} members={findJobComponent?.members || []} pname={findJobComponent?.projectname.name || ''} client={findJobComponent?.clientname.name || ''} start={findJobComponent?.projectstart || ''} end={findJobComponent?.projectend || ''}>
                                                                       <div className=' flex flex-col items-center justify-center gap-1 text-[.6rem] w-[40px]'>
                                                                         <button onClick={() => setDialog2(true)} className={`text-xs p-1 bg-red-600  rounded-sm`}><Pen size={12}/></button>
                                                                         <p>Edit</p>
                                                                       </div>
                                                                     </EditJobComponent>
                ):(
                  <div className=' flex flex-col items-center justify-center gap-1 text-[.6rem] w-[40px]'>
                    <button onClick={() => toast.error('Only job manager & project manager can edit this job component.')} className={`text-xs p-1 bg-red-600  rounded-sm`}><Pen size={12}/></button>
                    <p>Edit</p>
                  </div>
                )}
                </>
                
              )}

              {componentid === '' ? (
                 <div className=' flex flex-col items-center justify-center gap-1 text-[.6rem] w-[40px]'>
                  <button  onClick={() => toast.error('Please select a job component below')} className={`text-xs p-1 bg-red-600  rounded-sm`}><Layers2 size={12}/></button>
                  <p>Duplicate</p>
                </div>
                
              ) : (
                <DuplicateJobComponent name={findJobComponent?.jobcomponent} manager={findJobComponent?.jobmanager.employeeid} type={findJobComponent?.budgettype} id={findJobComponent?.projectname.projectid} pname={findJobComponent?.projectname.name || ''} client={findJobComponent?.clientname.name || ''} start={findJobComponent?.projectstart || ''} end={findJobComponent?.projectend || ''} estbudget={findJobComponent?.estimatedbudget || 0}>
                  <div className=' flex flex-col items-center justify-center gap-1 text-[.6rem] w-[40px]'>
                    <button onClick={() => setDialog2(true)} className={`text-xs p-1 bg-red-600  rounded-sm`}><Layers2 size={12}/></button>
                    <p>Duplicate</p>
                  </div>
                </DuplicateJobComponent>
                
              )}

            


             

              {componentid === '' ? (
                <div className=' flex flex-col items-center justify-center gap-1 text-[.6rem] w-[40px]'>
                  <button onClick={() => toast.error('Please select a job component below')} className={`text-xs p-1 bg-red-600  rounded-sm`}><Copy size={12}/></button>
                  <p>Variation</p>
                </div>
                
              ) : (
                <Copyprojectcomponent name={findJobComponent?.jobcomponent ?? ''} manager={findJobComponent?.jobmanager.employeeid ?? ''} budgettype={findJobComponent?.budgettype ?? ''} engr={findJobComponent?.members[0]?.employee._id} engrrvr={findJobComponent?.members[1]?.employee._id} drftr={findJobComponent?.members[2]?.employee._id} drftrrvr={findJobComponent?.members[3]?.employee._id} estbudget={findJobComponent?.estimatedbudget ?? 0} state={dialog3} client={findJobComponent?.clientname.name || ''} start={findJobComponent?.projectstart || ''} end={findJobComponent?.projectend || ''} pname={findJobComponent?.projectname.name || ''} clientid={findJobComponent?.clientname.clientid || ''}>
                <div className=' flex flex-col items-center justify-center gap-1 text-[.6rem] w-[40px]'>
                  <button onClick={() => setDialog3(!dialog3)} className={`text-xs p-1 bg-red-600  rounded-sm`}><Copy size={12}/></button>
                  <p>Variation</p>
                </div>
              </Copyprojectcomponent>
              )}

              {componentid === '' ? (
                 <div className=' flex flex-col items-center justify-center gap-1 text-[.6rem] w-[40px]'>
                  <button onClick={() => toast.error('Please select a job component below')} className={`text-xs p-1 bg-red-600  rounded-sm`}><File size={12}/></button>
                  <p>Complete</p>
                </div>

              ) : (
                <JobComponentStatus name={findJobComponent?.jobcomponent ?? ''} status={findJobComponent?.status} client={findJobComponent?.clientname.name ?? ''} _id={findJobComponent?._id ?? ''} jobno={findJobComponent?.jobno ?? ''} teamname={findJobComponent?.teamname ?? ''} managerName={findJobComponent?.jobmanager.fullname ?? ''} projectname={findJobComponent?.projectname.name ?? ''} invoiced={`${findJobComponent?.invoice.amount ?? ''}`} budget={`${findJobComponent?.estimatedbudget}`} currinvoice={findJobComponent?.invoice.amount || 0}  >
                  <div className=' flex flex-col items-center justify-center gap-1 text-[.6rem] w-[40px]'>
                    <button className={`text-xs p-1 bg-red-600  rounded-sm`}><File size={12}/></button>
                    <p>Complete</p>
                  </div>
                </JobComponentStatus>
              )}

              {componentid === '' ? (
                 <div className=' flex flex-col items-center justify-center gap-1 text-[.6rem] w-[40px]'>
                  <button onClick={() => toast.error('Please select a job component below')} className={`text-xs p-1 bg-red-600  rounded-sm`}><File size={12}/></button>
                  <p>Invoice</p>
                </div>

              ) : (
                <Invoice projectname={findJobComponent?.projectname.name} jobcname={findJobComponent?.jobcomponent} jobno={findJobComponent?.jobno} budgettype={findJobComponent?.budgettype} estimatedbudget={findJobComponent?.estimatedbudget} jobcid={findJobComponent?.componentid} isJobmanager={findJobComponent?.jobmanager.isJobManager} currinvoice={findJobComponent?.invoice.percentage}>
                  <div className=' flex flex-col items-center justify-center gap-1 text-[.6rem] w-[40px]'>
                    <button className={`text-xs p-1 bg-red-600  rounded-sm`}><File size={12}/></button>
                    <p>Invoice</p>
                  </div>       
                </Invoice>
              )}

              {/* {componentid === '' ? (
                 <div className=' flex flex-col items-center justify-center gap-1 text-[.6rem] w-[40px]'>
                  <button onClick={() => toast.error('Please select a job component below')} className={`text-xs p-1 bg-red-600  rounded-sm`}><Folder size={12}/></button>
                  <p>Archive</p>
                </div>

              ) : (

                <Dialog>
                <DialogTrigger>
                <div className=' flex flex-col items-center justify-center gap-1 text-[.6rem] w-[40px]'>
                  <button className={`text-xs p-1 bg-red-600  rounded-sm`}><Folder size={12}/></button>
                  <p>Archive</p>
                </div>
                </DialogTrigger>
                <DialogContent className=' bg-secondary p-6 text-white border-none'>
                  <DialogHeader>
                    <DialogTitle>Move to archived.</DialogTitle>
                    <DialogDescription>
                      Are you sure you to archived the selected job component?
                    </DialogDescription>
                  </DialogHeader>

                  <p>Job Component: {findJobComponent?.jobcomponent} </p>

                  <div className=' flex items-center justify-end gap-4 mt-4'>
                    <button onClick={archived} className=' bg-red-700 text-zinc-100 px-4 py-2 text-xs rounded-sm mt-4 w-auto'>Continue</button>

                  </div>
                </DialogContent>
              </Dialog>

                
              )} */}


             

                

                

              


            </div>
            
          </div>

        </div>
        <Legends/>

      </div>

      



      <Individualrequest ref={individualRequestRef} alldates={longestAlldates?.allDates} data={list}/>

      <div
      className=' h-auto w-full flex flex-col max-w-[1920px]'>
        <div className=' h-auto overflow-y-auto flex items-start justify-center bg-secondary w-full max-w-[1920px]'>
          
            <table className="table-auto w-[1600px] borer-collapse ml-[6px] ">
            <thead className='  bg-secondary h-[50px]'>

              <tr className=' text-[0.6rem] text-zinc-100 font-normal '>
                  <th className=' font-normal w-[40px]'>Action</th>
                  <th className=' font-normal w-[100px] ' >Job no.</th>

                    <th className=' font-normal w-[100px] ' >Client Name</th>
                    <th className=' font-normal w-[100px] ' >Project Name</th>
                    <th className=' font-normal w-[100px] ' >Job Mgr.</th>

                    <th className=' font-normal w-[100px] ' >Est. $</th>
                    <th className=' font-normal w-[100px] ' >Invoiced (%/hrs)</th>
                    <th className=' font-normal w-[100px] ' >Budget type</th>
                    <th className=' font-normal w-[100px] ' >Job Component</th>

                    <th className=' font-normal w-[50px] ' >Members</th>
                    <th className=' font-normal w-[50px] ' >Role</th>
                    <th className=' font-normal w-[50px] ' >Notes</th>

              </tr>
            </thead>
         
            </table>

            <div ref={firstDivRef} 
             style={{
              overflowX: "hidden",
            }}
            className=' w-full'>
              <table className="table-auto border-collapse "
              style={{ visibility: 'collapse' }}
              >
                <thead className=' bg-secondary h-[100px]'>
                  <tr 
                 
                  className=' text-[0.6rem] text-zinc-100 font-normal'>
                  
                  {longestAlldates?.allDates
                  .filter((dateObj) => {
                    const day = new Date(dateObj).getDay();
                    return day >= 1 && day <= 5; // Filter to include only Monday through Friday
                  })
                  .map((dateObj, index) => {
                    const date = new Date(dateObj);
                    const day = date.getDay();
                    const isFriday = day === 5;

                    // Format functions for Australian date
                    const formatAustralianDate = (date: Date) =>
                      date.toLocaleDateString('en-AU', { day: '2-digit', month: '2-digit', year: '2-digit' });
                    const formatMonthYear = (date: Date) =>
                      date.toLocaleDateString('en-AU', { month: 'short', year: 'numeric' });

                    return (
                      <React.Fragment key={index}>
                        <th 
                         data-date={date} 
                        className="relative  w-[20px] font-normal border-[1px] border-zinc-700">
                          <div className="whitespace-nowrap  w-[20px] transform -rotate-[90deg]">
                            <p className=' mt-3'>{formatAustralianDate(date)}</p>
                            {/* <p>{formatMonthYear(date)}</p> */}
                          </div>
                        </th>
                        {isFriday && (
                          <th className="font-normal  w-[20px] px-1 border-[1px] border-zinc-700">
                            <div className="transform  w-[20px] -rotate-[90deg]">
                              <p>Total Hours</p>
                            </div>
                          </th>
                        )}
                      </React.Fragment>
                    );
                  })}


                    
                  </tr>
                </thead>
               
              </table>
            </div>
            </div>
      </div>

         <div
      ref={tableRef}
      className=' h-[500px] w-full flex flex-col max-w-[1920px] overflow-y-auto ml-1'>
        <div className=' h-[500px] flex items-start justify-center bg-secondary w-full max-w-[1920px]'>

              <table 
              
              className="table-auto w-[1600px] borer-collapse ">
                 <thead className='  bg-secondary h-[100px]'
                 style={{ visibility: 'collapse' }}
                 >

                  <tr className=' text-[0.6rem] text-zinc-100 font-normal'>
                    <th className=' font-normal'>Action</th>
                    <th className=' font-normal  w-[95px]'>Job no.</th>
                    <th className=' font-normal  w-[95px]'>Client Name</th>
                    <th className=' font-normal  w-[95px]'>Project Name</th>
                    <th className=' font-normal w-[95px]'>Job Mgr.</th>

                    <th className=' font-normal  w-[95px]'>Job Component</th>
                    <th className=' font-normal  w-[95px]'>Est. $</th>
                    <th className=' font-normal  w-[95px]'>Invoiced (%/hrs)</th>
                    <th className=' font-normal  w-[95px]'>Budget type</th>
                    <th className=' font-normal  w-[50px]'>Members</th>
                    <th className=' font-normal  w-[50px]'>Role</th>
                    <th className=' font-normal  w-[50px]'>Notes</th>

                  </tr>
                  </thead>
              <tbody>
              {list.map((graphItem, graphIndex) =>
                graphItem.members.map((member, memberIndex) => (
                  <tr 
                  key={`${graphItem._id}-${memberIndex}`}
                  data-invoice-id={graphItem._id} 
                  className={`text-[.6rem] py-2 h-[35px] border-[1px] border-zinc-600 ${graphItem.isVariation === true ? 'text-red-600 font-black' : ' text-black'} ${clientColor(graphItem.clientname.priority)}`}>
                      <td className="text-center text-white h-[30px] flex items-center justify-center gap-1 w-[30px]">
                        

                        {(memberIndex === 0 ) && (
                          <input
                          type="checkbox"
                          checked={componentid === graphItem._id}
                          onChange={() => {handleCheckboxChange(graphItem._id),setProjectname(graphItem.projectname.projectid), setJobmanager(graphItem.jobmanager.employeeid), setJobno(graphItem.jobno), findMember(graphItem.members), setNotes(graphItem.members[0].notes),setNotes2(graphItem.members[1].notes),setNotes3(graphItem.members[2].notes),setNotes4(graphItem.members[3].notes), setIsmanager(graphItem.jobmanager.isManager),setIsjobmanager(graphItem.jobmanager.isJobManager)}}
                          />
                        )}

                                    
                    </td>
                    {/* ${graphItem.status === null ? 'text-blue-400' :  'text-green-500'} */}
                    {/* <td className={` text-center`}>{memberIndex === 0 && `${graphItem.status === null ? 'Ongoing' :  'Completed'}`}</td> */}
                    <td className="text-center">{memberIndex === 0 && graphItem.jobno}</td>

                      <td className="text-center">{memberIndex === 0 && graphItem.clientname.name}</td>
                      <td className="text-center">{memberIndex === 0 && graphItem.projectname.name}</td>
                      <td className="text-center">{memberIndex === 0 && graphItem.jobmanager.fullname}</td>
                      <td className="text-center ">{memberIndex === 0 && `$ ${graphItem.estimatedbudget?.toLocaleString()}`}</td>

                      <td className="text-center">{memberIndex === 0 && `${graphItem.invoice.percentage} ${graphItem.budgettype === 'lumpsum' ? '%' : 'hrs'}`}</td>
                      <td className="text-center">{memberIndex === 0 && graphItem.budgettype.charAt(0).toUpperCase() + graphItem.budgettype.slice(1)}</td>
                      <td className={` text-center ${scrollId === graphItem._id && 'text-black'}`}>{memberIndex === 0 && graphItem.jobcomponent}</td>


          
                    <td className="text-center">{member.employee.initials}</td>
                    <td className="text-center text-[.5rem]">{member.role}</td>
                    <td className="text-center">
                      <Dialog>
                        <DialogTrigger>{member.notes === '' ? '... ' : <button className=' text-[.5rem] bg-red-600 rounded-sm text-white p-1'>View</button>}</DialogTrigger>
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

              <div ref={secondDivRef} 
              className=' w-full overflow-x-auto'>
                <table className="table-auto border-collapse ">
                  <thead className=' bg-secondary h-1'
                  style={{ visibility: 'collapse' }}
                  >
                    <tr className=' text-[0.6rem] text-zinc-100 font-normal h-1'>
                    
                    {longestAlldates?.allDates.map((dateObj, index) => {
                      const date = new Date(dateObj);
                      const day = date.getDay();
                      const isFriday = day === 5;

                      // Format functions for Australian date
                      const formatAustralianDate = (date: Date) =>
                        date.toLocaleDateString('en-AU', { day: '2-digit', month: '2-digit', year: '2-digit' });
                      const formatMonthYear = (date: Date) =>
                        date.toLocaleDateString('en-AU', { month: 'short', year: 'numeric' });

                      return (
                        <React.Fragment key={index}>
                         <th className="relative font-normal w-[20px] border-[1px] h-1 overflow-hidden border-zinc-700">
                          <div className="whitespace-nowrap transform w-[20px] -rotate-[90deg]">
                            <p>{formatAustralianDate(date)}</p>
                            <p>{formatMonthYear(date)}</p>
                          </div>
                        </th>
                        {isFriday && (
                          <th className="font-normal  w-[20px] px-1 border-[1px] h-1 overflow-hidden border-zinc-700">
                            <div className="transform  w-[20px] -rotate-[90deg]">
                              <p>Total Hours</p>
                            </div>
                          </th>
                        )}
                        </React.Fragment>
                      );
                    })}


                      
                    </tr>
                  </thead>
                  <tbody>
                  {list.map((graphItem, graphIndex) =>
                    graphItem.members.map((member, memberIndex) => {
                      // Precompute weekly totals
                      const totalHoursForWeek: number[] = [];
                      let currentWeekTotal = 0;
                      let weekIndex = 0; // Track the current week's index

                      longestAlldates.allDates.forEach((dateObj, index) => {
                        const memberDate = member.dates?.find(
                          (date) => formatDate(date.date) === formatDate(dateObj)
                        );
                        currentWeekTotal += memberDate?.hours || 0;

                        // If it's Friday or the last date in the range, push the total for the week
                        if (new Date(dateObj).getDay() === 5 || index === longestAlldates.allDates.length - 1) {
                          totalHoursForWeek.push(currentWeekTotal);
                          currentWeekTotal = 0; // Reset for the next week
                          weekIndex++; // Move to the next week
                        }
                      });

                      return (
                        <tr
                          key={`${graphIndex}-${memberIndex}`}
                          className="bg-primary text-[.6rem] py-2 h-[35px] border-[1px] border-zinc-600"
                        >
                          {longestAlldates.allDates.map((dateObj, index) => {
                            const date = new Date(dateObj);
                            const isFriday = date.getDay() === 5;
                            const memberDate = member.dates?.find(
                              (date) => formatDate(date.date) === formatDate(dateObj)
                            );

                            // Handle Click
                            const handleClick = () => {
                              setDialog(true);
                              setDate(dateObj);
                              setProjectid(graphItem._id);
                              setName(member.employee.fullname);
                              setEmployeeid(member.employee._id);
                              setHours(memberDate?.hours || 0);
                              setAddstatus(memberDate?.status || []);
                              setSelectedRows(memberDate?.status || []);
                              setSelected(memberDate?.status || []);
                              setLeavestatus(
                                isDateInRange(
                                  dateObj,
                                  member.leaveDates[0]?.leavestart,
                                  member.leaveDates[0]?.leaveend
                                )
                              );
                              setEvent(
                                isDateInRange(
                                  dateObj,
                                  member.eventDates[0]?.startdate,
                                  member.eventDates[0]?.enddate
                                )
                              );
                              wdStatusChecker(member.wellnessDates, dateObj, member.eventDates);
                              setIsjobmanager(graphItem.jobmanager.isJobManager);
                              setLeave(
                                isDateInRange(
                                  dateObj,
                                  member.leaveDates[0]?.leavestart,
                                  member.leaveDates[0]?.leaveend
                                )
                              );
                              setRole(member.role);
                            };

                            return (
                              <React.Fragment key={index}>
                                <td
                                  className="relative text-center overflow-hidden bg-white cursor-pointer border-[1px]"
                                  onClick={handleClick}
                                >
                                  <div className="w-full h-[50px] absolute flex top-0">
                                    {statusColor(
                                      memberDate?.status || [],
                                      dateObj,
                                      member.leaveDates[0]?.leavestart || "",
                                      member.leaveDates[0]?.leaveend || "",
                                      member.eventDates[0]?.startdate || "",
                                      member.eventDates[0]?.enddate || "",
                                      member.wellnessDates[0],
                                      memberDate?.hours || 0,
                                      member.eventDates,
                                      member.leaveDates,
                                      member.wellnessDates
                                    ).map((item, index) => (
                                      <div key={index} className={`w-full h-[50px] ${item}`}></div>
                                    ))}
                                  </div>
                                  <p className="relative text-black font-bold text-xs z-30">
                                    {memberDate ? memberDate.hours : "-"}
                                  </p>
                                </td>

                                {/* Display total hours next to Friday */}
                                {isFriday && (
                                  <td className="text-center font-normal w-[40px] bg-primary border-[1px] border-zinc-700">
                                    <p>{totalHoursForWeek[weekIndex]}</p>
                                  </td>
                                )}
                              </React.Fragment>
                            );
                          })}
                        </tr>
                      );
                    })
                  )}




                </tbody>
                </table>
              </div>
          
          
           

        {isJobmamager === true ? (
              <Dialog open={dialog} onOpenChange={setDialog}>
                      <DialogContent className=' p-8 bg-secondary border-none text-white max-h-[80%] overflow-y-auto'>
                        
                        <Tabs defaultValue="account" className=" w-full">
                          <TabsList className=' text-xs bg-zinc-800'>
                            <TabsTrigger value="single">Single</TabsTrigger>
                            <TabsTrigger value="multiple">Multiple</TabsTrigger>
                          </TabsList>
                          <TabsContent value="single">
                            <DialogHeader>
                              <DialogTitle>Update workload ({name} <span className=' text-xs text-red-500'>({role})</span> at {formatDate(date)})</DialogTitle>
                              <DialogDescription>
                                Note, you can only update the hours rendered if the employee is not on wellness day.
                              </DialogDescription>
                            </DialogHeader>
                            <div className=' w-full flex flex-col gap-2'>              
                            <label htmlFor="" className=' text-xs mt-4'>Select Status</label>

                              <div className='w-full flex items-center gap-6'>
                                {statusData.map((item) => (
                                  <div key={item.id} className='flex items-center gap-1 text-xs'>
                                    <input
                                    disabled={wdStatus || event || leave}
                                      value={item.id}
                                      type="checkbox"
                                      checked={selected.includes(item.id)}
                                    onChange={() => handleChangeCheckbox(item.id as any)}
                                    />
                                    <p className=' p-1'>{item.name}</p>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className=' flex flex-col gap-2 text-xs'>
                              <label htmlFor="">Hours Rendered</label>
                              <input disabled={wdStatus || event || leave} type="number" value={hours} onChange={(e) => setHours(e.target.valueAsNumber)} placeholder='Hours' id="" className=' bg-primary p-2 rounded-md text-xs' />
                              
                            </div>

                        
                  
                            <div className=' w-full flex items-end justify-end mt-4 gap-2'>
                              <button disabled={wdStatus || event || leave} onClick={() => removeWorkload()} className=' px-4 py-2 bg-zinc-600 text-xs text-white rounded-md'>Remove</button>

                              <button disabled={wdStatus || event || leave} onClick={() => updateWorkload()} className=' px-4 py-2 bg-red-600 text-xs text-white rounded-md'>Save</button>

                            </div>
                         
                            {(wdStatus === true || event === true || leave === true) && (
                              <p className=' text-xs text-red-500 flex items-center gap-2'><OctagonAlert size={15}/> Employee is in on wellness or event day, you can't update this selected workload</p>
                            )}
                          </TabsContent>
                          <TabsContent value="multiple">

                            <DialogHeader>
                              <DialogTitle>Update workload ({name} <span className=' text-xs text-red-500'>({role})</span></DialogTitle>
                              <DialogDescription>
                                Note, you can only update the hours rendered if the employee is not on wellness day.
                              </DialogDescription>
                            </DialogHeader>
                            {forms.map((form, index) => (
                            <div key={index} className=" w-full mb-6 p-4 border border-zinc-700 rounded-lg text-xs">
                              <h2 className="text-sm font-semibold mb-2">Form {index + 1}</h2>
                              <div className="space-y-4">
                                <div>
                                  <label className="block text-sm font-medium">Date</label>
                                  <input disabled={wdStatus || event || leave}
                                    type="date"
                                    value={form.date.split('T')[0]}
                                    onChange={(e) => handleChange(index, 'date', e.target.value + 'T00:00:00.000Z')}
                                  placeholder='Date'
                                  className=' bg-primary p-2 rounded-md text-xs' />
                                
                                </div>

                                <div>
                                <label className="block text-sm font-medium">Hours Rendered</label>
                                <input disabled={wdStatus || event || leave} type="number"
                                  value={form.hours}
                                  onChange={(e) => handleChange(index, 'hours', e.target.valueAsNumber)}
                                placeholder='Hours' id="" className=' bg-primary p-2 rounded-md text-xs' />
                                
                                </div>

                                <div>
                                  <label className="block text-sm font-medium">Status</label>
                                  <div className="flex space-x-4">
                                    {statusData.map((option) => (
                                      <label key={option.id} className="flex items-center">
                                        <input
                                          type="checkbox"
                                          value={option.id}
                                          checked={form.status.includes(option.id)}
                                          onChange={() => handleCheckbox(index, option.id)}
                                          className="mr-2"
                                        />
                                        {option.name}
                                      </label>
                                    ))}
                                  </div>
                                </div>

                                {index !== 0 && (
                                  <button
                                  onClick={() => deleteForm(index)}
                                  className="px-4 py-2 bg-red-500 text-white rounded-md text-[.6rem]"
                                >
                                  Delete Form
                                </button>
                                )}
                                
                              </div>
                            </div>
                            ))}

                            <button
                              onClick={addForm}
                              className=" w-fit text-xs px-4 py-2 bg-blue-500 text-white rounded-md mr-2"
                            >
                              Add Form
                            </button>

                            <button
                              onClick={updateMultipleWorkload}
                              className=" w-fit text-xs px-4 py-2 bg-green-500 text-white rounded-md"
                            >
                              Save All
                            </button>

                          </TabsContent>
                        </Tabs>
                        

                    
                      </DialogContent>
              </Dialog>
            ): (
              <Dialog open={dialog} onOpenChange={setDialog}>
                <DialogContent className=' p-8 bg-secondary border-none text-white'>
                        <DialogHeader>
                          <DialogTitle>Update workload ({name} <span className=' text-xs text-red-500'>({role})</span> at {formatDate(date)})</DialogTitle>
                          <DialogDescription>
                          
                          </DialogDescription>
                        </DialogHeader>

                        <p className=' text-lg text-red-500'>Only job manager can update a workload!</p>
                      
                </DialogContent>
              </Dialog>
            )}

            

        </div>
        </div>

        {list.length === 0 && (
          <div className=' w-full h-full flex items-center justify-center'>
            <p className=' text-xs text-zinc-400'>No job component's yet under this project, please create one to see the workload!</p>
          </div>
        )}
  
       
    

     

        
    </div>
  )
}
