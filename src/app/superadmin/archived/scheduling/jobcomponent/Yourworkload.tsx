"use client"
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
import { formatAustralianDate, formatDate } from '@/utils/functions'
import { any } from 'zod'
import Invoice from '@/components/forms/Invoice'
import Copyprojectcomponent from './Copyprojectcomponent'
import JobComponentStatus from '@/components/forms/JobComponentStatus'
import EditJobComponent from '@/components/forms/EditJobComponent'
import Individualrequest from '../../scheduling/IndividualRequest'
import DuplicateJobComponent from '@/components/forms/DuplicateJobComponent'
import { clientColor } from '@/utils/helpers'


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

  const getList = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/jobcomponent/listteamjobcomponent?teamid=${id}`,{
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
        }
    })

  
    setList(response.data.data)
  
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
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/jobcomponent/listarchivedteamjobcomponent?teamid=${id}`,{
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

  const statusColor = (data: string[], date: string, leaveStart: string, leaveEnd: string, eventStart: string, eventEnd: string, wddate: string, hours: number, eventDates: Event[], leaveDates: Leave[], wellnessDates: string[], wfhDates: string []) => {
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
  );

  // const isWFH = wfhDates.some(
  //   (wfh) => wfh.includes(date.split('T')[0])
  // );;


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
      colorData.push('bg-fuchsia-300')
    }

     if(isWellnessDate){
      colorData.push('bg-fuchsia-300')
    }

    // if(isWFH){
    //   colorData.push('bg-lime-300')
    // }

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

   //archived
   const archived = async () => {
    try {
      const request = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/jobcomponent/archivejobcomponent`,{
       jobcomponentId: componentid,
      status: 'unarchive' // archived or "" to unarchive
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
          }
      })

      const response = await toast.promise(request, {
        loading: 'Unarchiving job component....',
        success: `Successfully unarchived`,
        error: 'Error while unarchiving the job component',
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

  const longestAlldates = list.reduce((max, current) => {
    return current.allDates.length > max.allDates.length ? current : max;
  }, list[0]);




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

       
          <div className='flex items-center gap-2 bg-primary rounded-sm text-xs mt-2'>

            {componentid === '' ? (
              <div className=' flex flex-col items-center justify-center gap-1 text-[.6rem] w-[40px]'>
                <button onClick={() => toast.error('Please select a job component below')} className={`text-xs p-1 bg-red-600  rounded-sm`}><Folder size={12}/></button>
                <p>Unarchive</p>
              </div>

            ) : (

              <Dialog>
              <DialogTrigger>
              <div className=' flex flex-col items-center justify-center gap-1 text-[.6rem] w-[40px]'>
                <button className={`text-xs p-1 bg-red-600  rounded-sm`}><Folder size={12}/></button>
                <p>Unarchive</p>
              </div>
              </DialogTrigger>
              <DialogContent className=' bg-secondary p-6 text-white border-none'>
                <DialogHeader>
                  <DialogTitle>Unarchived.</DialogTitle>
                  <DialogDescription>
                    Are you sure you to unarchived the selected job component?
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

      {/* <Individualrequest/> */}

      <div
      className=' h-[67dvh] w-full flex flex-col overflow-y-auto'>
        
        <div className=' relative h-auto flex items-start bg-secondary w-full overflow-y-auto  '>

          <div className=' w-fit flex flex-col sticky top-0'>
         
            <table className="table-auto w-auto border-collapse">
              <thead className="h-[60px] text-nowrap"
                // style={{ visibility: 'collapse' }}

              >
                <tr className="text-[0.5rem] text-zinc-100 font-normal text-left border-collapse">
                  <th className="text-left font-normal min-w-[30px] whitespace-normal border-[1px] border-zinc-600 px-2">
                    Action
                  </th>
                  <th className="text-left font-normal min-w-[70px] whitespace-normal border-[1px] border-zinc-600 px-2">
                    Job Number
                  </th>
                  <th className="text-left font-normal min-w-[70px] whitespace-normal border-[1px] border-zinc-600 px-2">
                    Client
                  </th>
                  <th className="text-left font-normal min-w-[80px] whitespace-normal border-[1px] border-zinc-600 px-2">
                    Project Name
                  </th>
                  <th className="text-left font-normal min-w-[30px] whitespace-normal border-[1px] border-zinc-600 px-2">
                    JM
                  </th>
                  <th className="text-left font-normal min-w-[90px] whitespace-normal border-[1px] border-zinc-600 px-2">
                    Job Component
                  </th>
                  <th className="text-left font-normal min-w-[100px] whitespace-normal border-[1px] border-zinc-600 px-2">
                    Notes
                  </th>
                  <th className="text-left font-normal min-w-[55px] whitespace-normal border-[1px] border-zinc-600 px-2">
                    Role
                  </th>
                  <th className="text-left font-normal min-w-[83px] whitespace-normal border-[1px] border-zinc-600 px-2">
                    Team
                  </th>
                  <th className="text-left font-normal min-w-[45px] whitespace-normal border-[1px] border-zinc-600 px-2">
                    Members
                  </th>
                  <th className="text-left font-normal min-w-[50px] whitespace-normal border-[1px] border-zinc-600 px-2">
                    Total Hours
                  </th>
                </tr>
              </thead>
                <tbody>
                 {list.map((graphItem, graphIndex) =>
                                    graphItem.members.map((member, memberIndex) => {
                                      // Sum all hours for the member
                                      const totalHours = member.dates?.reduce((sum, date) => sum + date.hours, 0) || 0;
                
                                      return (
                                        <tr 
                                          key={`${graphItem._id}-${memberIndex}`}
                                          data-invoice-id={graphItem._id} 
                                          className={`text-left text-[.5rem] py-2 h-[30px] border-[1px] border-zinc-600 border-collapse ${graphItem.isVariation ? 'text-red-600 font-black' : 'text-black'} ${clientColor(graphItem.clientname.priority)}`}
                                        >
                                          <td className="text-center text-white h-[30px] flex items-center justify-center gap-1">
                                            {memberIndex === 0 && (
                                              <input
                                                type="checkbox"
                                                checked={componentid === graphItem._id}
                                                onChange={() => {
                                                  handleCheckboxChange(graphItem._id);
                                                  setProjectname(graphItem.projectname.projectid);
                                                  setJobmanager(graphItem.jobmanager.employeeid);
                                                  setJobno(graphItem.jobno);
                                                  findMember(graphItem.members);
                                                  setNotes(graphItem.members[0]?.notes || "");
                                                  setNotes2(graphItem.members[1]?.notes || "");
                                                  setNotes3(graphItem.members[2]?.notes || "");
                                                  setNotes4(graphItem.members[3]?.notes || "");
                                                  setIsmanager(graphItem.jobmanager.isManager);
                                                  setIsjobmanager(graphItem.jobmanager.isJobManager);
                                                }}
                                              />
                                            )}
                                          </td>
                
                                          <td className="text-wrap whitespace-normal break-all border-[1px] border-zinc-600 px-2">
                                            {memberIndex === 0 && graphItem.jobno}
                                          </td>
                                          <td className="text-wrap whitespace-normal break-all border-[1px] border-zinc-600 px-2">
                                            {memberIndex === 0 && graphItem.clientname.name}
                                          </td>
                                          <td className="text-wrap whitespace-normal break-all border-[1px] border-zinc-600 px-2">
                                            {memberIndex === 0 && graphItem.projectname.name}
                                          </td>
                                          <td className="text-wrap whitespace-normal break-all border-[1px] border-zinc-600 px-2">
                                            {memberIndex === 0 && graphItem.jobmanager.initials}
                                          </td>
                                          <td className="text-wrap whitespace-normal break-all border-[1px] border-zinc-600 px-2">
                                            {memberIndex === 0 && graphItem.jobcomponent}
                                          </td>
                                          <td className="text-wrap whitespace-normal break-all border-[1px] border-zinc-600 px-2">
                                            <Dialog>
                                              <DialogTrigger className="rounded-sm flex items-center text-black text-[.5rem]">
                                                {member.notes ? <p className="text-[.5rem]">{member.notes.slice(0, 20)}</p> : <p className="text-[.5rem] h-full w-full text-center">No notes.</p>}
                                              </DialogTrigger>
                                              <DialogContent className="bg-secondary p-6 border-none max-w-[600px] text-white">
                                                <DialogHeader>
                                                  <DialogTitle>Notes</DialogTitle>
                                                  <DialogDescription></DialogDescription>
                                                </DialogHeader>
                                                {member.notes ? <p className="text-xs text-zinc-400">{member.notes}</p> : <p className="text-xs text-zinc-400 h-full w-full text-center">No notes.</p>}
                                              </DialogContent>
                                            </Dialog>
                                          </td>
                                          <td className="text-wrap whitespace-normal break-all border-[1px] border-zinc-600 px-2 text-[.5rem]">
                                            {member.role}
                                          </td>
                                          <td className="text-wrap whitespace-normal break-all border-[1px] border-zinc-600 px-2 text-[.5rem]">
                                            {graphItem.teamname}
                                          </td>
                                          <td className="text-wrap whitespace-normal break-all border-[1px] border-zinc-600 px-2">
                                            {member.employee.initials}
                                          </td>
                                          {/* Display the total hours for the member */}
                                          <td className="text-wrap whitespace-normal break-all border-[1px] border-zinc-600 px-2">{totalHours.toLocaleString()}</td>
                                        </tr>
                                      );
                                    })
                                  )}
                </tbody>
            </table>

          
          </div>

          <div 
          className=' w-full flex flex-col max-w-[1920px] hide-scrollbar overflow-x-auto hide cursor-pointer'>
            <table className="table-auto border-collapse min-w-full ">
                <thead className="bg-secondary h-[60px]"
                // style={{ visibility: 'collapse' }}
                
                >
                  <tr className="bg-secondary text-[0.5rem] text-black font-normal h-[60px]">
                   {longestAlldates?.allDates.map((dateObj, index) => {
                                    const date = new Date(dateObj);
                                    const utcDate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
                                    
                   
                                     const today = new Date();
                                     today.setHours(0, 0, 0, 0); // Ensure today is set at midnight for accurate comparisons
                                     
                   
                                     const startOfWeek = new Date(today);
                                     startOfWeek.setDate(today.getDate() - (today.getDay() - 1));
                   
                                     const endOfWeek = new Date(startOfWeek);
                                     endOfWeek.setDate(startOfWeek.getDate() + 5);
                   
                                     let bgColor = "bg-white";
                   
                                     // ✅ Corrected: Ensure past days in the week are gray
                                     if (date >= startOfWeek && date <= endOfWeek) {
                                       if (date <= today) {
                                         bgColor = "bg-gray-300"; // ✅ Past days turn gray properly
                                       } else if (date.getDate() - 1 === today.getDate()) {
                                         bgColor = "bg-pink-500"; // ✅ Today is pink
                                       } else {
                                         bgColor = 'bg-white'
                                       }
                                     }
                   
                                     const shouldInsertTotal = (index + 1) % 5 === 0; // Insert "Total Hours" after every 5 dates
                   
                                     return (
                                       <React.Fragment key={index}>
                                         {/* Date Cell */}
                                         <th
                                           data-id={formatAustralianDate(dateObj)}
                                           className={`relative min-w-[22px] font-normal border-[1px] border-zinc-700 ${bgColor}`}
                                         >
                                           <div className="whitespace-nowrap w-[20px]  transform -rotate-[90deg]">
                                             <p className="mt-3 font-semibold">{formatAustralianDate(dateObj)}</p>
                                           </div>
                                         </th>
                   
                                         {/* Add "Total Hours" **AFTER EVERY 5th DATE** */}
                                         {shouldInsertTotal && (
                                           <th
                                             key={`total-${index}`}
                                             className="font-normal min-w-[20px] px-1 border-[1px] border-zinc-700 bg-primary text-white"
                                           >
                                             <div className="transform w-[20px] -rotate-[90deg] font-semibold">
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

            <table className="table-auto border-collapse ">
                  <thead className=' bg-secondary h-0'
                  style={{ visibility: 'collapse' }}
                  >
                    <tr className=' text-[0.6rem] text-zinc-100 font-normal h-[50px]'>
                    
                    {longestAlldates?.allDates.map((dateObj, index) => {
                      const date = new Date(dateObj);
                      const day = date.getDay();
                      const isFriday = day === 5;

                   
                      return (
                        <React.Fragment key={index}>
                         <th className="relative font-normal  border-[1px] h-1 overflow-hidden border-zinc-800">
                          <div className="whitespace-nowrap transform w-[20px] -rotate-[90deg]">
                            {/* <p>{formatAustralianDate(date)}</p> */}
                          </div>
                        </th>
                        {isFriday && (
                          <th className="font-normal  px-1 border-[1px] h-1 overflow-hidden border-zinc-800">
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
                  <tbody className=' -translate-y-[1px]'>
                  {list.map((graphItem, graphIndex) =>
                    graphItem.members.map((member, memberIndex) => {
                      // Precompute weekly totals
                      const totalHoursForWeek: number[] = [];
                      let currentWeekTotal = 0;
                      let weekCounter = 0;



                      longestAlldates.allDates.forEach((dateObj, index) => {
                        const memberDate = member.dates?.find(
                          (date) => formatDate(date.date) === formatDate(dateObj)
                        );
                        currentWeekTotal += memberDate?.hours || 0;

                        // If it's Friday or last date, store the week's total
                        const isLastDate = index === longestAlldates.allDates.length - 1;
                        if (new Date(dateObj).getDay() === 5 || isLastDate) {
                          totalHoursForWeek.push(currentWeekTotal);
                          currentWeekTotal = 0; // Reset for next week
                          weekCounter++; // Move to next week
                        }
                      });

                      return (
                        <tr
                          key={`${graphIndex}-${memberIndex}`}
                          className="bg-primary text-[.6rem] py-2 h-[31px] border-[1px] border-zinc-600"
                        >
                          {longestAlldates.allDates.map((dateObj, index) => {
                            const date = new Date(dateObj);
                            const isFriday = date.getDay() === 5;
                            const weekIndex = Math.floor(index / 5); // Ensure correct indexing
                            
                            const memberDate = member.dates?.find(
                              (date) => formatDate(date.date) === formatDate(dateObj)
                            );

                            const shouldInsertTotal = (index + 1) % 5 === 0;

                            



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
                                      member.wellnessDates,
                                      member.wfhDates
                                    ).map((item, index) => (
                                      <div key={index} className={`w-full h-[50px] ${item}`}></div>
                                    ))}
                                  </div>
                                  <p className="relative text-black font-bold text-[.5rem] z-30">
                                    {/* {memberDate ? memberDate.hours : "-"} */}
                                    {memberDate ? memberDate.hours : "-"}
                                  </p>
                                </td>

                                {shouldInsertTotal && (
                                  <td className="text-center font-normal min-w-[29px] bg-primary border-[1px] border-zinc-700">
                                    <p className="text-white text-[.5rem] font-semibold">
                                      {Number.isInteger(totalHoursForWeek[weekIndex])
                                        ? totalHoursForWeek[weekIndex]
                                        : totalHoursForWeek[weekIndex]?.toLocaleString()}
                                    </p>
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

        </div>

      
    </div>

    
        
    </div>
  )
}
