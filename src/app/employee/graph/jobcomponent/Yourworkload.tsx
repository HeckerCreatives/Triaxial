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
import Individualrequest from '../../scheduling/IndividualRequest'
import DuplicateJobComponent from '@/components/forms/DuplicateJobComponent'


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
    (wellnessDate) => wellnessDate === date
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
    if(hours > 8){
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

  //update as manager
  const updateJobComponenAsManager = async (id: string) => {
  
    try {
      const request = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/jobcomponent/editjobcomponentdetails`,{
        jobcomponentid: componentid,
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
        jobcomponentid: componentid,
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
        jobcomponentid: componentid,
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

   //update as both
     const archived = async () => {
      try {
        const request = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/jobcomponent/archivejobcomponent`,{
         jobcomponentId: componentid,
        status: 'archived' // archived or "" to unarchive
        }, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
            }
        })
  
        const response = await toast.promise(request, {
          loading: 'Archiving job component....',
          success: `Successfully archived`,
          error: 'Error while archiving the job component',
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


    const engrMember = findJobComponent?.members.find((item) => item.role === 'Engr.');
  const engrId = engrMember?._id;

  const engrrvrMember = findJobComponent?.members.find((item) => item.role === 'Engr. Revr.');
  const engrrvrId = engrrvrMember?._id; 

  const drftrvrMember = findJobComponent?.members.find((item) => item.role === 'Drft. Revr.');
  const draftrvrId = drftrvrMember?._id; 

  const drftMember = findJobComponent?.members.find((item) => item.role === 'Drft.');
  const draftId = drftMember?._id; 

  const clientColor = (data: string) => {
    if(data.includes('1')){
      return 'bg-[#93C47D]'
    } else if(data.includes('2')){
      return 'bg-[#B6D7A7]'
    } else if(data.includes('3')){
      return 'bg-[#969696]'
    } 
  }

  const firstDivRef = useRef<HTMLDivElement>(null);
  const secondDivRef = useRef<HTMLDivElement>(null);

  const syncScroll = (
    sourceRef: React.RefObject<HTMLDivElement>,
    targetRefs: React.RefObject<HTMLDivElement>[]
  ) => {
    if (sourceRef.current) {
      const scrollLeft = sourceRef.current.scrollLeft;
      targetRefs.forEach((ref) => {
        if (ref.current && ref.current.scrollLeft !== scrollLeft) {
          ref.current.scrollLeft = scrollLeft;
        }
      });
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') return; // Ensure running on the client

    const firstDiv = firstDivRef.current;
    const secondDiv = secondDivRef.current;

    const handleFirstDivScroll = () => {
      console.log('First div scrolled');
      syncScroll(firstDivRef, [secondDivRef]);
    };

    const handleSecondDivScroll = () => {
      console.log('Second div scrolled');
      syncScroll(secondDivRef, [firstDivRef]);
    };

    if (firstDiv) {
      firstDiv.addEventListener('scroll', handleFirstDivScroll);
    }
    if (secondDiv) {
      secondDiv.addEventListener('scroll', handleSecondDivScroll);
    }

    return () => {
      if (firstDiv) {
        firstDiv.removeEventListener('scroll', handleFirstDivScroll);
      }
      if (secondDiv) {
        secondDiv.removeEventListener('scroll', handleSecondDivScroll);
      }
    };
  }, []);





  return (
   <div className=' w-full h-full flex flex-col justify-center bg-secondary p-4 text-zinc-100'>

      <div className=' w-full flex items-center justify-between h-auto bg-primary mb-2 p-4 text-xs'>

        <div className=' flex gap-12'>
          
          <div className=' flex flex-col gap-1 bg-primary p-2'>
            {/* <p className=' text-sm font-semibold'>Project Details</p>
            <p className=' text-xs text-zinc-400'>Project Name: <span className=' text-red-500'>{list[0]?.projectname.name}</span></p>
            <p className=' text-xs text-zinc-400'>Client: <span className=' text-red-500'>{list[0]?.clientname.name}</span></p>
            <p className=' text-xs text-zinc-400'>Team: <span className=' text-red-500'>{list[0]?.teamname}</span></p>
            <p className=' text-xs text-zinc-400'>Job no.: <span className=' text-red-500'>{list[0]?.jobno}</span></p> */}

            <p className=' text-sm font-semibold'>Team Members</p>

            <div className=' flex items-center gap-2 flex-wrap'>
              {list[0]?.members.map(( item, index) => (
                <p key={index} className=' text-blue-500 underline'>{item.employee.initials}</p>
              ))}
            </div>
            

          </div>

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
                   <EditJobComponent id={findJobComponent?.componentid} isManger={findJobComponent?.jobmanager.isManager} isJobManager={findJobComponent?.jobmanager.isJobManager} project={findJobComponent?.projectname.projectid} jobmanager={findJobComponent?.jobmanager.employeeid} engr={engrId} engrnotes={engrMember?.notes} engrrvr={engrrvrId} engrrvrnotes={engrrvrMember?.notes} drftr={draftId} drftrnotes={drftMember?.notes} drftrrvr={draftrvrId} drftrrvrnotes={drftrvrMember?.notes}  members={findJobComponent?.members || []}>
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
                <DuplicateJobComponent name={findJobComponent?.jobcomponent} manager={findJobComponent?.jobmanager.employeeid} type={findJobComponent?.budgettype} id={findJobComponent?.projectname.projectid}>
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
                <Copyprojectcomponent name={findJobComponent?.jobcomponent ?? ''} manager={findJobComponent?.jobmanager.employeeid ?? ''} budgettype={findJobComponent?.budgettype ?? ''} engr={findJobComponent?.members[0]?.employee._id} engrrvr={findJobComponent?.members[1]?.employee._id} drftr={findJobComponent?.members[2]?.employee._id} drftrrvr={findJobComponent?.members[3]?.employee._id} estbudget={findJobComponent?.estimatedbudget ?? 0} state={dialog3}>
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
                <JobComponentStatus name={findJobComponent?.jobcomponent ?? ''} status={findJobComponent?.status} client={findJobComponent?.clientname.name ?? ''} _id={findJobComponent?._id ?? ''} jobno={findJobComponent?.jobno ?? ''} >
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

              {componentid === '' ? (
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

                
              )}


             

                

                

              


            </div>
            
          </div>

        </div>


        <Legends/>

      </div>

      <Individualrequest alldates={list[0]?.allDates}/>

      <div
      className=' h-auto w-full flex flex-col max-w-[1920px]'>
        <div className=' h-auto overflow-y-auto flex items-start justify-center bg-secondary w-full max-w-[1920px]'>
          
            <table className="table-auto w-full borer-collapse ">
            <thead className='  bg-secondary h-[100px]'>

              <tr className=' text-[0.6rem] text-zinc-100 font-normal'>
                <th className=' font-normal'>Action</th>
                <th className=' font-normal'>Status</th>
                <th className=' font-normal'>Job no.</th>
                <th className=' font-normal'>Job Mgr.</th>
                <th className=' font-normal'>Job Component</th>
                <th className=' font-normal'>Est. $</th>
                <th className=' font-normal'>Invoiced (%/hrs)</th>
                <th className=' font-normal'>Budget type</th>
                <th className=' font-normal'>Members</th>
                <th className=' font-normal'>Role</th>
                <th className=' font-normal'>Notes</th>

              </tr>
            </thead>
         
            </table>

            <div ref={firstDivRef} 
             style={{
              overflowX: "scroll",
            }}
            className=' w-full'>
              <table className="table-auto border-collapse ">
                <thead className=' bg-secondary h-[100px]'>
                  <tr className=' text-[0.6rem] text-zinc-100 font-normal'>
                  
                  {list[0]?.allDates
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
                        <th className="relative font-normal border-[1px] border-zinc-700">
                          <div className="whitespace-nowrap transform -rotate-[90deg]">
                            <p>{formatAustralianDate(date)}</p>
                            <p>{formatMonthYear(date)}</p>
                          </div>
                        </th>
                        {isFriday && (
                          <th className="font-normal px-1 border-[1px] border-zinc-700">
                            <div className="transform -rotate-[90deg]">
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
      className=' h-[500px] w-full flex flex-col max-w-[1920px] overflow-y-auto ml-1'>
        <div className=' h-full flex items-start justify-center bg-secondary w-full max-w-[1920px]'>

              <table className="table-auto w-full borer-collapse mt-1 ">
                
              <tbody>
              {list.map((graphItem, graphIndex) =>
                graphItem.members.map((member, memberIndex) => (
                  <tr key={`${graphIndex}-${memberIndex}`} className={`text-[.6rem] py-2 h-[50px] border-[1px] border-zinc-600 ${clientColor(graphItem.clientname.priority)}`}>
                      <td className="text-center text-white flex items-center justify-center gap-1 h-[50px] w-[30px]">
                        

                        {(memberIndex === 0 ) && (
                          <input
                          type="checkbox"
                          checked={componentid === graphItem._id}
                          onChange={() => {handleCheckboxChange(graphItem._id),setProjectname(graphItem.projectname.projectid), setJobmanager(graphItem.jobmanager.employeeid), setJobno(graphItem.jobno), findMember(graphItem.members), setNotes(graphItem.members[0].notes),setNotes2(graphItem.members[1].notes),setNotes3(graphItem.members[2].notes),setNotes4(graphItem.members[3].notes), setIsmanager(graphItem.jobmanager.isManager),setIsjobmanager(graphItem.jobmanager.isJobManager)}}
                          />
                        )}

                                    
                    </td>
                    <td className={`${graphItem.status === null ? 'text-blue-400' :  'text-green-500'} text-center`}>{memberIndex === 0 && `${graphItem.status === null ? 'Ongoing' :  'Completed'}`}</td>
                    <td className="text-center">{memberIndex === 0 && graphItem.jobno}</td>
                      <td className="text-center">{memberIndex === 0 && graphItem.jobmanager.fullname}</td>
                      <td className="text-center">{memberIndex === 0 && graphItem.jobcomponent}</td>
                      <td className="text-center">{memberIndex === 0 && `$ ${graphItem.estimatedbudget?.toLocaleString()}`}</td>
                      <td className="text-center">{memberIndex === 0 && `${graphItem.invoice.percentage} ${graphItem.budgettype === 'lumpsum' ? '%' : 'hrs'}`}</td>
                      <td className="text-center">{memberIndex === 0 && graphItem.budgettype}</td>
          
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

              <div ref={secondDivRef} 
              className=' w-full overflow-x-auto'>
                <table className="table-auto border-collapse ">
                  <thead className=' bg-secondary '>
                    <tr className=' text-[0.6rem] text-zinc-100 font-normal'>
                    
                    {list[0]?.allDates
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
                          <th className="relative font-normal px-[20.15px] py-[2px] border-zinc-700">
                            
                          </th>
                          {isFriday && (
                            <th className="font-normal px-[20px] py-[2px] border-zinc-700">
                              
                            </th>
                          )}
                        </React.Fragment>
                      );
                    })}


                      
                    </tr>
                  </thead>
                  <tbody>
                  {list.map((graphItem, graphIndex) =>
                      graphItem.members.map((member, memberIndex) => (
                        <tr key={`${graphIndex}-${memberIndex}`} className="bg-primary text-[.6rem] py-2  h-[51px] border-[1px] border-zinc-600">
                          
                    
                          {list[0]?.allDates
                          .filter((dateObj) => {
                            const day = new Date(dateObj).getDay();
                            return day >= 1 && day <= 5; // Filter to include only Monday through Friday
                          })
                          .map((dateObj, index) => {
                            const day = new Date(dateObj).getDay();
                            const isFriday = day === 5;
                            const memberDate = member.dates?.find((date) => formatDate(date.date) === formatDate(dateObj));

                            
                            const totalHoursForWeek = list[0]?.allDates
                              .filter((dateObj) => {
                                const day = new Date(dateObj).getDay();
                                return day >= 1 && day <= 5; // Only include Monday to Friday
                              })
                              .reduce<{ weeklyTotals: number[]; currentWeekTotal: number }>((accumulated, dateObj, index, array) => {
                                const day = new Date(dateObj).getDay();
                                const memberDate = member.dates?.find((date) => formatDate(date.date) === formatDate(dateObj));
                                const hoursForDay = memberDate?.hours || 0;

                                // Add current day's hours
                                accumulated.currentWeekTotal += hoursForDay;

                                // Reset total on Friday
                                if (day === 5 || index === array.length - 1) { // On Friday or last day of the range
                                  accumulated.weeklyTotals.push(accumulated.currentWeekTotal);
                                  accumulated.currentWeekTotal = 0; // Reset total for next week
                                }

                                return accumulated;
                              }, { weeklyTotals: [], currentWeekTotal: 0 }).weeklyTotals;
    
                            
                            return (
                              <React.Fragment key={index}>
                                <td 
                                  key={index} 
                                  className="relative text-center overflow-hidden  bg-white cursor-pointer border-[1px]"
                                  onClick={() => {
                                
                                      setDialog(true);
                                      // setHours(memberDate.hours);
                                      setDate(dateObj);
                                      setProjectid(graphItem._id);
                                      setName(member.employee.fullname);
                                      setEmployeeid(member.employee._id);
                                      setHours(memberDate?.hours || 0)
                                      setAddstatus(memberDate?.status || [])
                                      setSelectedRows(memberDate?.status || [])
                                      setSelected(memberDate?.status || [])
                                      setLeavestatus(isDateInRange(dateObj,member.leaveDates[0]?.leavestart,member.leaveDates[0]?.leaveend))
                                      setEvent(isDateInRange(dateObj,member.eventDates[0]?.startdate,member.eventDates[0]?.enddate))
                                      wdStatusChecker(member.wellnessDates, dateObj, member.eventDates)
                                      setIsjobmanager(graphItem.jobmanager.isJobManager)
                                      setLeave(isDateInRange(dateObj,member.leaveDates[0]?.leavestart,member.leaveDates[0]?.leaveend))
                                    
                                      setRole(member.role)
            
                                    }
                                  }
                                >
                                  <div className=' w-full h-[50px] absolute flex top-0 '>
                                    {statusColor(
                                      memberDate?.status || [],
                                      dateObj,
                                      member.leaveDates.length !== 0 ? member.leaveDates[0]?.leavestart : '', 
                                      member.leaveDates.length !== 0 ? member.leaveDates[0]?.leaveend : '', 
                                      member.eventDates.length !== 0 ? member.eventDates[0].startdate : '', 
                                      member.eventDates.length !== 0 ? member.eventDates[0].enddate : '', 
                                      member.wellnessDates[0],
                                      memberDate?.hours || 0,
                                      member.eventDates,
                                      member.leaveDates,
                                      member.wellnessDates
                                    ).map((item, index) => (
                                      <div key={index} className={`w-full h-[50px] ${item}`}>

                                      </div>

                                    ))}

                                  </div>
                              
                                  <p className='relative text-black font-bold text-xs z-30'>
                                    {memberDate ? memberDate.hours : '-'}
                                  </p>
                                </td>

                              
                                {isFriday && totalHoursForWeek.length > 0 && (
                                    <td
                                      key={`total-${index}`}
                                      className="text-center font-normal w-[40px] bg-primary border-[1px] border-zinc-700"
                                    >
                                      <p className="text-center">
                                      {totalHoursForWeek[Math.floor(index / 5)]} {/* Display the week's total on Friday */}
                                      </p>
                                    </td>
                                  )}
                              </React.Fragment>
                            );
                          })}

                        </tr>
                      ))
                    )}


                </tbody>
                </table>
              </div>
          
            {list.length === 0 && (
                  <div className=' w-full h-full flex items-center justify-center'>
                    <p className=' text-xs text-zinc-400'>No job component's yet under this project, please create one to see the workload!</p>

                  </div>
                )}

        {isJobmamager === true ? (
              <Dialog open={dialog} onOpenChange={setDialog}>
                      <DialogContent className=' p-8 bg-secondary border-none text-white'>
                        <DialogHeader>
                          <DialogTitle>Update workload ({name} <span className=' text-xs text-red-500'>({role})</span> at {formatDate(date)})</DialogTitle>
                          <DialogDescription>
                            Note, you can only update the hours rendered if the employee is not on wellness day.
                          </DialogDescription>
                        </DialogHeader>
                        <div className=' w-full flex flex-col gap-2'>              

                        <label htmlFor="" className=' text-xs mt-4'>Select Status</label>

                        {/* <div className='w-full flex items-center gap-6'>
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
                          </div> */}

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
              
                        <div className=' w-full flex items-end justify-end mt-4'>
                          <button disabled={wdStatus || event || leave} onClick={() => updateWorkload()} className=' px-4 py-2 bg-red-600 text-xs text-white rounded-md'>Save</button>
                        </div>

                        {(wdStatus === true || event === true || leave === true) && (
                          <p className=' text-xs text-red-500 flex items-center gap-2'><OctagonAlert size={15}/> Employee is in on wellness or event day, you can't update this selected workload</p>
                        )}

                        
                    
                    
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

        
    </div>
  )
}
