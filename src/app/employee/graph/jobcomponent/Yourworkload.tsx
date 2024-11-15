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
import { months, statusData, weeks } from '@/types/data'
import { Check, File, OctagonAlert, Pen, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Graph, Members } from '@/types/types'
import { formatDate, formatDateTime } from '@/utils/functions'
import Invoice from '@/components/forms/Invoice'

type Employee = {
  employeeid: string,
  name: string
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
  const [ismanager, setIsmanager] = useState(false)
  const [isJobmanager, setIsjobmanager] = useState(true)
  const [engr, setEngr] = useState('')
  const [engrrvr, setEngrrvr] = useState('')
  const [drf, setDrf] = useState('')
  const [drfrvr, setDrfrvr] = useState('')
  const [notes, setNotes] = useState('')
  const [dialog2, setDialog2] = useState(false)
  const [employee, setEmployee] = useState<Employee[]>([])



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
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/jobcomponent/listjobcomponentemployee?projectid=${id}`,{
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
      const request = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/jobcomponent/editstatushoursemployee`,{
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
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/jobcomponent/listjobcomponentemployee?projectid=${id}`,{
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
      const request = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/jobcomponent/editjobmanagercomponentsjbmngr`,{
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

  //employee list
  useEffect(() => {
      try {
        const timer = setTimeout(() => {
          const getList = async () => {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/searchlistemployee?fullname`,{
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



  return (
    <div className=' w-full h-full flex flex-col justify-center bg-secondary p-4 text-zinc-100'>

    <div className=' w-full flex items-center justify-between h-auto bg-primary mb-2 p-4 text-xs'>

      <div className=' flex gap-12'>
        
        <div className=' flex flex-col gap-1 bg-primary p-2'>
          <p className=' text-sm font-semibold'>Project Details</p>
          <p className=' text-xs text-zinc-400'>Project Name: <span className=' text-red-500'>{list[0]?.projectname.name}</span></p>
          <p className=' text-xs text-zinc-400'>Client: <span className=' text-red-500'>{list[0]?.clientname.name}</span></p>
          <p className=' text-xs text-zinc-400'>Team: <span className=' text-red-500'>{list[0]?.teamname}</span></p>
          <p className=' text-xs text-zinc-400'>Job no.: <span className=' text-red-500'>{list[0]?.jobno}</span></p>
        </div>

       

      </div>


      <Legends/>

    </div>

    <div className=' h-full w-full flex flex-col max-w-[1920px]'>
      <div className=' h-full overflow-y-auto flex items-start justify-center bg-secondary w-full max-w-[1920px]'>
        {list.length !== 0 ? (
          <>
          <table className="table-auto w-[1000px] border-collapse ">
          <thead className=' bg-secondary h-[100px]'>

            <tr className=' text-[0.6rem] text-zinc-100 font-normal'>
              <th className=' w-[60px] font-normal'>Action</th>
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
                  <td className="text-center text-white flex items-center justify-center gap-2 h-[40px] w-[60px]">

                    {isJobmanager === true ? (
                      <Dialog open={dialog2} onOpenChange={setDialog2}>
                      <DialogTrigger>
                          {memberIndex === 0 && (<button onClick={() => {findMember(graphItem.members), setNotes(graphItem.members[0].notes), setIsjobmanager(graphItem.jobmanager.isJobManager)}} className=' p-1 bg-red-600 rounded-sm'><Pen size={12}/></button>)}
                      </DialogTrigger>
                      <DialogContent className=' max-w-[600px] bg-secondary border-none p-6 text-white'>
                        <DialogHeader>
                          <DialogTitle>Edit Project <span className=' text-xs text-zinc-400'>( As {position(graphItem.jobmanager.isJobManager, graphItem.jobmanager.isManager)})</span></DialogTitle>
                          <DialogDescription className={` ${graphItem.jobmanager.isManager === true ? 'text-white' : ' text-red-500'}`}>
                            {/* {graphItem.jobmanager.isManager === true ? 'Your the project manager of this project, you are allowed to edit this project' : ' Your are not the project manager of this project, you are not allowed to edit this project'} */}
                            
                          </DialogDescription>
                        </DialogHeader>



                        {isJobmanager === true && (
                          <div className=' flex flex-col w-full gap-2 text-xs'>
                          
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

                            <div className=' w-full flex items-end justify-end mt-4 text-xs'>
                              <button onClick={() => updateJobComponenAsJobManager(graphItem._id)} className=' bg-red-600 px-4 py-2 rounded-md w-fit'>Save</button>
                            </div>

                          </div>

                        </div>
                        )}


                     
                          
                        
                      </DialogContent>
                      </Dialog>
                    ): (
                      <Dialog open={dialog2} onOpenChange={setDialog2}>
                        <DialogTrigger>
                            {memberIndex === 0 && (<button onClick={() => {findMember(graphItem.members), setNotes(graphItem.members[0].notes), setIsjobmanager(graphItem.jobmanager.isJobManager)}} className=' p-1 bg-red-600 rounded-sm'><Pen size={12}/></button>)}
                        </DialogTrigger>
                        <DialogContent className=' max-w-[600px] bg-secondary border-none p-6 text-white'>
                          <DialogHeader>
                            <DialogTitle>Edit Project</DialogTitle>
                            <DialogDescription className={` ${graphItem.jobmanager.isManager === true ? 'text-white' : ' text-red-500'}`}>
                              {/* {graphItem.jobmanager.isManager === true ? 'Your the project manager of this project, you are allowed to edit this project' : ' Your are not the project manager of this project, you are not allowed to edit this project'} */}
                              
                            </DialogDescription>
                          </DialogHeader>
                          <p className=' text-lg text-red-500'>You are not allowed to edit this job component!</p>

                        </DialogContent>
                    </Dialog>
                    )}

                    {(memberIndex === 0 && graphItem.jobmanager.isJobManager === true) && (
                        <Invoice 
                          projectname={graphItem.projectname.name} 
                          jobno={graphItem.jobno} 
                          notes={graphItem.members[0].notes} 
                          jobcname={graphItem.jobcomponent} 
                          budgettype={graphItem.budgettype} 
                          estimatedbudget={graphItem.estimatedbudget} 
                          jobcid={graphItem.componentid} 
                          isJobmanager={graphItem.jobmanager.isJobManager}
                        >
                        
                            <button onClick={() => {
                              setIsjobmanager(graphItem.jobmanager.isJobManager);
                              url.searchParams.set("jobcid", graphItem.componentid);
                              router.push(url.toString());
                            }} className='p-1 bg-red-600 rounded-sm'>
                              <File size={12}/>
                            </button>
                        </Invoice>
                      )}

                    
                   
                    </td>
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

          <div className=' overflow-x-auto'>
            <table className="table-auto border-collapse ">
              <thead className=' w-[800px] bg-secondary h-[100px]'>
                <tr className=' text-[0.6rem] text-zinc-100 font-normal'>
                
                {list[0]?.allDates
                .filter((dateObj) => {
                  const day = new Date(dateObj).getDay();
                  return day >= 1 && day <= 5; // Filter to include only Monday through Friday
                })
                .map((dateObj, index) => {
                  const day = new Date(dateObj).getDay();
                  const isFriday = day === 5;

                  return (
                    <React.Fragment key={index}>
                      <th className="relative font-normal border-[1px] border-zinc-700">
                        <p className="whitespace-nowrap rotate-90">{formatDate(dateObj)}</p>
                      </th>
                      {isFriday && (
                        <th className="font-normal px-1 border-[1px] border-zinc-700">
                          <p className="rotate-90">Total Hours</p>
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
                    <tr key={`${graphIndex}-${memberIndex}`} className="bg-primary text-[.6rem] py-2 h-[41px] border-[1px] border-zinc-600">
                      
                
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
                              className="relative text-center overflow-hidden bg-white cursor-pointer border-[1px]"
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
                                  setLeavestatus(isDateInRange(dateObj,member.leaveDates[0]?.leavestart,member.leaveDates[0]?.leaveend))
                                  setEvent(isDateInRange(dateObj,member.eventDates[0]?.startdate,member.eventDates[0]?.enddate))
                                  wdStatusChecker(member.wellnessDates, dateObj, member.eventDates)
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
                                  member.eventDates,
                                  member.leaveDates,
                                  member.wellnessDates
                                ).map((item, index) => (
                                  <div key={index} className={`w-full h-[40px] ${item}`}>

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

          

         {isJobmanager === true ? (
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
