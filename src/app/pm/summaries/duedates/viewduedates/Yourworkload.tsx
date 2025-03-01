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
import { Check, Copy, File, OctagonAlert, Pen, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Graph, Members } from '@/types/types'
import { formatDate } from '@/utils/functions'
import { any } from 'zod'
import Invoice from '@/components/forms/Invoice'
import { formatAustralianDate } from '@/utils/helpers'


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



  const router = useRouter()

  //selected status
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);



  const getList = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/jobcomponent/listjobcomponent?projectid=${id}`,{
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
        }
    })

  
    setList(response.data.data)
  
  }


  const [list, setList] = useState<Graph[]>([])
  useEffect(() => {
    try {
      const timer = setTimeout(() => {
        const getList = async () => {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/jobcomponent/viewduedatesgraph?teamid=${id}`,{
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
    if(isWithinAnyEventDate){
      colorData.push('bg-gray-300')
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
                <a href={`/pm/individualworkload?employeeid=${item.employee._id}&name=${item.employee.initials}&teamname=${''}`} key={index} className=' text-blue-500 underline'>{item.employee.initials}</a>
              ))}
            </div>
          </div>



          

        </div>


        <div className=' flex items-center justify-center gap-4 text-xs bg-secondary p-2 rounded-sm'>
          <div className=' h-full flex items-end gap-2'>
            <p className=' text-[.8em]'>Status Legend:</p>

              <div className=' w-fit flex items-center gap-2'>

                <div className=' flex items-center gap-2'>
                  <div className=' bg-red-500'>
                    <p className=' text-[.7em] text-black font-semibold px-1'>Due On</p>
                  </div>
              
                </div>
            
              </div>


          </div>

          <div className=' h-full flex items-end gap-2'>

                <div className=' w-fit flex items-center gap-2'>
                  <div className=' flex items-center gap-2'>
                    <div className=' bg-gray-400'>
                      <p className=' text-[.7em] text-black font-semibold px-1'>Holidays</p>
                    </div>


                  </div>


                </div>

              


          </div>
          
        </div>

      </div>

      <div className=' h-full w-full flex flex-col max-w-[1920px]'>
        <div className=' h-full overflow-y-auto flex items-start justify-center bg-secondary w-full max-w-[1920px]'>
          {list.length !== 0 ? (
            <div className=' w-full flex'>
            <table className=" table-auto border-collapse">
            <thead className=' h-[100px]'>

              <tr className=' text-left text-[0.6rem] text-zinc-100 font-normal border-collapse '>
                <th className=' min-w-[150px] font-normal border-[1px] border-zinc-600 px-2'>Job No.</th>
                <th className=' min-w-[150px] font-normal border-[1px] border-zinc-600 px-2'>Client Name</th>
                <th className=' min-w-[150px] font-normal border-[1px] border-zinc-600 px-2'>Proj. Name</th>
                <th className=' min-w-[100px] font-normal border-[1px] border-zinc-600 px-2'>Job Mgr.</th>
                <th className=' min-w-[100px] font-normal border-[1px] border-zinc-600 px-2'>Job Component</th>
                <th className=' min-w-[100px] font-normal border-[1px] border-zinc-600 px-2'>Members</th>
              
              </tr>
            </thead>
            <tbody>
            {list.map((graphItem, graphIndex) =>
              graphItem.members
                .filter(member => member.employee.fullname !== "N/A") // Filter out members with fullname "N/A"
                .map((member, memberIndex) => (
                  <tr key={`${graphIndex}-${memberIndex}`} className="bg-primary text-[.6rem] py-2 h-[40px] border-[1px] border-zinc-600 border-collapse">
                    <td className="text-left min-w-[150px] break-all whitespace-normal border-r-[1px] border-zinc-600 px-2 ">{graphItem.jobno}</td>
                    <td className="text-left min-w-[150px] break-all whitespace-normal border-r-[1px] border-zinc-600 px-2 ">{graphItem.clientname.name}</td>
                    <td className="text-left min-w-[150px] break-all whitespace-normal border-r-[1px] border-zinc-600 px-2 ">{graphItem.projectname.name}</td>
                    <td className="text-left min-w-[150px] break-all whitespace-normal border-r-[1px] border-zinc-600 px-2 ">{graphItem.jobmanager.fullname}</td>
                    <td className="text-left min-w-[150px] break-all whitespace-normal border-r-[1px] border-zinc-600 px-2 ">{graphItem.jobcomponent}</td>
                    <td className="text-left min-w-[150px] break-all whitespace-normal border-r-[1px] border-zinc-600 px-2 ">{member.employee.fullname}</td>
                  </tr>
                ))
            )}
          </tbody>
            </table>

              <div className=' overflow-x-auto'>
                <table className=" border-collapse ">
                <thead className="w-full bg-white h-[100px]">
                  <tr className="text-[0.6rem] text-black font-normal">
                    {list[0].allDates
                      ?.filter((dateObj) => {
                        const day = new Date(dateObj).getDay();
                        return day !== 0 && day !== 6; // Exclude Sundays (0) and Saturdays (6)
                      })
                      .map((dateObj, index, filteredDates) => {
                        const date = new Date(dateObj);
                        date.setHours(0, 0, 0, 0);

                        const today = new Date();
                        today.setHours(0, 0, 0, 0);

                        let bgColor = "bg-white";
                        if (date.getTime() === today.getTime()) {
                          bgColor = "bg-pink-500"; // Highlight today
                        } else if (date.getTime() < today.getTime()) {
                          bgColor = "bg-gray-300"; // Past dates
                        }

                        const isFriday = date.getDay() === 5; // Check if this column is Friday

                        return (
                          <React.Fragment key={index}>
                            {/* Weekday Header */}
                            <th className={`relative font-normal border-[1px] border-zinc-700 ${bgColor}`}>
                              <div className="whitespace-nowrap transform -rotate-[90deg] w-[20px]">
                                <p className="mt-4 font-bold">{formatAustralianDate(dateObj)}</p>
                              </div>
                            </th>

                            {/* Add "Total Hours" column immediately after Friday */}
                            {isFriday && (
                              <th
                                key={`total-${index}`}
                                className="font-normal w-[20px] border-[1px] bg-primary border-zinc-700"
                              >
                                <p className="-rotate-90 w-[20px] ml-[8px] font-bold text-white">Total Hours</p>
                              </th>
                            )}
                          </React.Fragment>
                        );
                      })}
                  </tr>
                </thead>


                  <tbody>
                  {list.map((graphItem, graphIndex) =>
                      graphItem.members
                      .filter(member => member.employee.fullname !== "N/A")
                      .map((member, memberIndex) => (
                        <tr key={`${graphIndex}-${memberIndex}`} className="bg-primary text-[.6rem] py-2 h-[40px] border-[1px] border-zinc-600">
                          
                    
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
                                  className="relative text-center w-[30px] overflow-hidden bg-white border-[1px]"
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
                                  <div className=' w-full h-[40px] absolute flex top-0 '>
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
                                      <div key={index} className={`w-full h-[40px] ${item}`}>

                                      </div>

                                    ))}

                                  </div>
                              
                                  <p className='relative text-black font-bold text-xs z-30'>
                                    {/* {memberDate ? memberDate.hours : '-'} */}
                                  -
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
            </div>
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
