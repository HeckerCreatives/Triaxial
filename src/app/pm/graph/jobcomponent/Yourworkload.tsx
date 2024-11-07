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
import { Pen } from 'lucide-react'
import { Input } from '@/components/ui/input'
import Editprojectjobmanager from '@/components/forms/Editprojectjobmanager'
import { Textarea } from '@/components/ui/textarea'
import Createprojectcomponent from './Createprojectcomponent'
import { Graph } from '@/types/types'
import { formatDate, formatDateTime } from '@/utils/functions'


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
  // isManager: boolean,
}

type Row = { id: string; name: string };


export default function Yourworkload() {
  const [tab2, setTab2] = useState('Leave')
  const [dialog, setDialog] = useState(false)
  const [index, setIndex] = useState(0)
  const [memberIndex, setMemberIndex] = useState(0)
  const [teamIndex, setTeamIndex] = useState(0)
  const [wdStatus, setWdstatus] = useState(false)
  const [leaveStatus, setLeavestatus] = useState(false)
  const [date, setDate] = useState('')
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [hours, setHours] = useState(0)
  const [status, setStatus] = useState('')
  const [employeeid, setEmployeeid] = useState('')
  const [projectid, setProjectid] = useState('')
  const [jobmanager, setJobmanager] = useState(false)
  const [loading, setLoading] = useState(false)
  const params = useSearchParams()
  const id = params.get('projectid')
  const refresh = params.get('state')
  const [addStatus, setAddstatus] = useState([])


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

  console.log(selectedRows)




  // Function to update status of a specific date
  // const updateStatus = (memberIndex: number, dateIndex: number, newStatus: number,updatedHours: number, graphIndex: number,) => {
  //   console.log(newStatus)
  //   setData(prevData => {
  //     const newData = { ...prevData };
  //     const selectedMember = newData.graph[teamIndex].members[memberIndex];
  //     if (selectedMember.dates && selectedMember.dates[dateIndex]) {
  //       selectedMember.dates[dateIndex].status = newStatus;
  //       selectedMember.dates[dateIndex].hours = updatedHours;
  //     }
  //     return newData;
  //   });
  // };

// Memoized data to prevent unnecessary re-renders
  // const memorizedData = useMemo(() => data, [data]);

  const getStatus = (data: number, leave: boolean, wd: boolean, event: boolean, hours: number) => {

    const colorData = []
    if(leave === true){
      colorData.push('bg-violet-300')
    }
     if(wd === true){
      colorData.push('bg-fuchsia-400')
    }
    if(hours > 8){
      colorData.push('bg-pink-500')
    }
    // if(event === true){
    //   colorData.push('bg-fuchsia-400')
    // }
    // if(data === 0){
    //  colorData.push('bg-white')
    // }
    if(data === 1){
      colorData.push('bg-red-500')
    }
    if(data === 2){
      colorData.push('bg-amber-500')
    }
    if(data === 3){
      colorData.push('bg-yellow-300')
    }
    if(data === 4){
      colorData.push('bg-green-500')
    }
    if(data === 5){
      colorData.push('bg-blue-500')
    }
    if(data === 6){
      colorData.push('bg-cyan-400')
    }

    console.log(colorData)


    return colorData

   
  }

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
        projectid:  projectid,
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

  console.log(leaveStatus)

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

  const statusColor = (data: string[], date: string, leaveStart: string, leaveEnd: string, eventStart: string, eventEnd: string, wddate: string) => {
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


  
    return colorData; // Return the colorData array
  }

  



  return (
   <div className=' w-full h-full flex flex-col justify-center bg-secondary p-4 text-zinc-100'>

      <div className=' w-full flex items-center justify-between h-auto bg-primary mb-2 p-4 text-xs'>
        {/* <div className=' flex flex-col gap-1'>
          <p className=' text-zinc-400'>Name: <span className=' text-zinc-100 underline'>Name</span></p>
          <p className=' text-zinc-400'>Initial: <span className=' text-zinc-100 underline'>ABC</span></p>
          <p className=' text-zinc-400'>Email: <span className=' text-zinc-100 underline'>test@gmail.com</span></p>
        </div> */}

        <div className=' flex flex-col gap-1 bg-primary rounded-sm text-xs'>

          <p className=' text-xs mt-2'>Project Component:</p>
          <div className='flex items-center gap-2 bg-primary rounded-sm text-xs'>
            <Createprojectcomponent>
              <button className={`text-xs px-3 py-1 bg-red-600  rounded-sm`}>Create</button>
            </Createprojectcomponent>
          </div>
            
        </div>

        <Legends/>

        <div className=' flex flex-col'>
          {/* <div className=' w-[100px] h-full rounded-sm p-2 bg-red-200 text-xs'>
            <p className=' text-zinc-900 font-semibold'>Note</p>
            <p className=' text-zinc-600 text-[.6rem]'>Lorem, ipsum dolor sit amet consectetur.</p>
          </div> */}

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
        </div>

       
      </div>

      <div className=' h-full w-full flex flex-col max-w-[1920px]'>
        <div className=' h-full overflow-y-auto flex items-start justify-center bg-secondary w-full max-w-[1920px]'>
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

                      <Dialog>
                          <DialogTrigger>
                              {memberIndex === 0 && (<button className=' p-1 bg-red-600 rounded-sm'><Pen size={12}/></button>)}
                          </DialogTrigger>
                          <DialogContent className=' max-w-[600px] bg-secondary border-none p-6 text-white'>
                            <DialogHeader>
                              <DialogTitle>Edit Project <span className=' text-xs text-zinc-400'>({position(graphItem.jobmanager.isJobManager, graphItem.jobmanager.isManager)})</span></DialogTitle>
                              <DialogDescription className={` ${graphItem.jobmanager.isManager === true ? 'text-white' : ' text-red-500'}`}>
                                {/* {graphItem.jobmanager.isManager === true ? 'Your the project manager of this project, you are allowed to edit this project' : ' Your are not the project manager of this project, you are not allowed to edit this project'} */}
                                
                              </DialogDescription>
                            </DialogHeader>

                            {(graphItem.jobmanager.isManager === true && graphItem.jobmanager.isJobManager === false ) && (
                              <div className=' flex flex-col w-full gap-2 text-xs'>
                                <label htmlFor="">Client</label>
                                <Select>
                                  <SelectTrigger className="w-full bg-primary">
                                    <SelectValue placeholder="Client" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="light">Light</SelectItem>
                                    <SelectItem value="dark">Dark</SelectItem>
                                    <SelectItem value="system">System</SelectItem>
                                  </SelectContent>
                                </Select>

                                <label htmlFor="">Project Name</label>
                                <Input type='text' className=' text-xs h-[35px] bg-primary' placeholder='Project Name' />

                                <label htmlFor="">Job Manager</label>
                                <Select>
                                  <SelectTrigger className="w-full bg-primary">
                                    <SelectValue placeholder="Job Manager" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="light">Light</SelectItem>
                                    <SelectItem value="dark">Dark</SelectItem>
                                    <SelectItem value="system">System</SelectItem>
                                  </SelectContent>
                                </Select>

                                
                              </div>
                            )}

                            {(graphItem.jobmanager.isJobManager === true && graphItem.jobmanager.isManager === false ) && (
                              <div className=' flex flex-col w-full gap-2 text-xs'>
                              
                                <label htmlFor="">Engineer (Engr.)</label>
                                <Input type='text' className=' text-xs h-[35px] bg-primary' placeholder='Engineer (Engr.)' />

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
                                <label htmlFor="">Client</label>
                                <Select>
                                  <SelectTrigger className="w-full bg-primary">
                                    <SelectValue placeholder="Client" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="light">Light</SelectItem>
                                    <SelectItem value="dark">Dark</SelectItem>
                                    <SelectItem value="system">System</SelectItem>
                                  </SelectContent>
                                </Select>

                                <label htmlFor="">Project Name</label>
                                <Input type='text' className=' text-xs h-[35px] bg-primary' placeholder='Project Name' />

                                <label htmlFor="">Job Manager</label>
                                <Select>
                                  <SelectTrigger className="w-full bg-primary">
                                    <SelectValue placeholder="Job Manager" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="light">Light</SelectItem>
                                    <SelectItem value="dark">Dark</SelectItem>
                                    <SelectItem value="system">System</SelectItem>
                                  </SelectContent>
                                </Select>

                                

                              </div>

                              <div className=' flex flex-col w-full gap-2 text-xs'>
                                  <label htmlFor="">Engineer (Engr.)</label>
                                  <Input type='text' className=' text-xs h-[35px] bg-primary' placeholder='Engineer (Engr.)' />

                                  <label htmlFor="">Engineer Reviewer (Engr. Revr.)</label>
                                  <Input type='text' className=' text-xs h-[35px] bg-primary' placeholder='Engineer Reviewer (Engr. Revr.)' />

                                  <label htmlFor="">Drafter (Drft.)</label>
                                  <Input type='text' className=' text-xs h-[35px] bg-primary' placeholder='Drafter (Drft.)' />

                                  <label htmlFor="">Drafter Reviewer (Drft. Revr.)	</label>
                                  <Input type='text' className=' text-xs h-[35px] bg-primary' placeholder='Drafter Reviewer (Drft. Revr.)	' />

                                  <label htmlFor="">Notes</label>
                                  <Textarea className=' text-xs h-[35px] bg-primary' placeholder='Notes' />
                                  

                              </div>
                              </>
                            )}

                            {(graphItem.jobmanager.isJobManager !== false || graphItem.jobmanager.isManager !== false) && (
                              <div className=' w-full flex items-end justify-end mt-4 text-xs'>
                                <button className=' bg-red-600 px-4 py-2 rounded-md w-fit'>Save</button>
                              </div>
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
                      <th key={index} className=' relative font-normal w-[60px] border-[1px] border-zinc-700'>
                        <p className=' absolute top-12 rotate-90'>{formatDate(dateObj)}</p>
                      </th>
                      {(index + 1) % 5 === 0 && (
                        <th key={`total-${index}`} className='font-normal w-[30px] border-[1px] border-zinc-700'>
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
                                  setProjectid(graphItem.projectname.projectid);
                                  setName(member.employee.fullname);
                                  setEmployeeid(member.employee.employeeid);
                                  setHours(memberDate?.hours || 0)
                                  setAddstatus(memberDate?.status || [])
        
                                }
                              }
                            >
                              <div className=' w-full h-[40px] absolute flex top-0 '>
                                {statusColor(
                                  memberDate?.status || [],
                                  dateObj,
                                  member.leaveDates.length !== 0 ? member.leaveDates[0]?.startdate : '', 
                                  member.leaveDates.length !== 0 ? member.leaveDates[0]?.enddate : '', 
                                  member.eventDates.length !== 0 ? member.eventDates[0]?.startdate : '', 
                                  member.eventDates.length !== 0 ? member.eventDates[0]?.enddate : '', 
                                  member.wellnessDates[0]?.startdate || ''
                                ).map((item, index) => (
                                  <div key={index} className={`w-full h-[40px] ${item}`}>

                                  </div>

                                ))}

                              </div>
                              <p>{member.leaveDates[0]?.startdate}</p>
                              {/* Render the hours if the date exists, otherwise initialize with 0 */}
                              <p className='relative text-black font-bold text-xs z-30'>
                                {memberDate ? memberDate.hours : 0}
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

          

          <Dialog open={dialog} onOpenChange={setDialog}>
                  <DialogContent className=' p-8 bg-secondary border-none text-white'>
                    <DialogHeader>
                      <DialogTitle>Update workload</DialogTitle>
                      <DialogDescription>
                        You can only update the hours rendered if the employee is not on wellness day.
                      </DialogDescription>
                    </DialogHeader>
                    <div className=' w-full flex flex-col gap-2'>

                      <div className=' text-xs flex flex-col gap-1 bg-primary p-4 rounded-sm'>
                        <p className=' text-sm font-bold'>{name} <span className=' text-xs text-red-500'>({role})</span></p>
                        <p>Employee is currently in at {date}: </p>
                        <p className=' text-zinc-400'>Leave:{leaveStatus === true ? 'Yes' : 'No'}</p>
                        <p className=' text-zinc-400'>Wellness day:{wdStatus === true ? 'Yes' : 'No'}</p>
                      </div>

                    {/* <Select value={status} onValueChange={setStatus}>
                      <SelectTrigger className="w-[180px] text-xs bg-primary">
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Due on</SelectItem>
                        <SelectItem value="2">25 %</SelectItem>
                        <SelectItem value="3">50 %</SelectItem>
                        <SelectItem value="4">75 %</SelectItem>
                        <SelectItem value="5">100 %</SelectItem>
                        <SelectItem value="6">CNST PH.</SelectItem>
                      </SelectContent>
                    </Select> */}

                    <label htmlFor="" className=' text-xs'>Select Status</label>

                    <div className='w-full flex items-center gap-6'>
                        {statusData.map((item) => (
                          <div key={item.id} className='flex items-center gap-1 text-xs'>
                            <input
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
                      <input  type="number" value={hours} onChange={(e) => setHours(e.target.valueAsNumber)} placeholder='Hours' id="" className=' bg-primary p-2 rounded-md text-xs' />
                      
                    </div>
           

                      <div className=' w-full flex items-end justify-end mt-4'>
                        <button onClick={() => updateWorkload()} className=' px-4 py-2 bg-red-600 text-xs text-white rounded-md'>Save</button>
                      </div>

                    
                 
                 
                  </DialogContent>
          </Dialog>

          

        </div>
       
        
      </div>

    
        
    </div>
  )
}
