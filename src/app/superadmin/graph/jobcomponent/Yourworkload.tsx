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
import Legends from '@/components/common/Legends'
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { useRouter, useSearchParams } from 'next/navigation'
import { Graph } from '@/types/types'
import { formatDate, formatDateTime } from '@/utils/functions'


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
  const params = useSearchParams()
  const id = params.get('projectid')
  const refresh = params.get('state')
  const [wdStatus, setWdstatus] = useState(false)
  const router = useRouter()


  const getList = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/jobcomponent/listjobcomponentsa?projectid=${id}`,{
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
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/jobcomponent/listjobcomponentsa?projectid=${id}`,{
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
          <table className="table-auto w-[700px] border-collapse ">
          <thead className=' bg-secondary h-[100px]'>

            <tr className=' text-[0.6rem] text-zinc-100 font-normal'>
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
                              className="relative text-center overflow-hidden bg-white cursor-pointer border-[1px]"
                         
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
