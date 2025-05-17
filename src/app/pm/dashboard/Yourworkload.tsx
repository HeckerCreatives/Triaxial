"use client"
import React, { useEffect, useMemo, useRef, useState } from 'react'
import axios, { AxiosError } from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import { Filter, RefreshCcw } from 'lucide-react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import SortableTeamsDialog from '@/components/common/SortTeam'


type Dates = {
  date: string
  eventDay: boolean
  leave: boolean
  status: string[]
  totalhoursofjobcomponents: number
  wellnessDay: boolean
}


type List = {
  name: string
  teamid: string
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
    startdate: string
    enddate: string
    }
],
wellness: [
  {
    requestdate: string
  }
],
wfh: [
  {
      requestdate: string
      requestend: string
  }
]
}

type Wfh = {
  requestdate: string
  requestend: string
}

const teams = [
  "NSW Hydraulic",
  "NSW CC Civil W&S",
  "NSW CC Newcastle Civil",
  "NSW Civil",
  "NSW CW Civil",
  "SA Civil",
  "NSW Remedial Strata",
  "NSW Remedial Legal",
  "NSW Structural",
  "NT Remedial & Design",
  "QLD Structural",
  "SA Structural",
  "SA Industrial",
  "Drafting",
  "Administration"
];

export default function Yourworkload() {
  const [list, setList] = useState<List[]>([])
  const [dates, setDates] = useState<string[]>([])
  const [filter, setFilter] = useState<Date | null>(null)
  const router = useRouter()
  const params = useSearchParams()
  const getTeamid = params.get('team')
  const [date, setDate] = useState('')

    const containerRef1 = useRef<HTMLDivElement>(null);
      const containerRef2 = useRef<HTMLDivElement>(null);
    
      const isDownRef = useRef(false);
      const startXRef = useRef(0);
      const scrollLeftRef = useRef(0);
      
    
      // Sync scroll positions
      const syncScroll = (source: React.RefObject<HTMLDivElement>, target: React.RefObject<HTMLDivElement>) => {
        if (source.current && target.current) {
          target.current.scrollLeft = source.current.scrollLeft;
        }
      };
    
      // Handle mouse down for dragging
      const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>, containerRef: React.RefObject<HTMLDivElement>) => {
        if (!containerRef.current) return;
        isDownRef.current = true;
        startXRef.current = e.pageX - containerRef.current.offsetLeft;
        scrollLeftRef.current = containerRef.current.scrollLeft;
      };
    
      // Handle mouse up or leave
      const handleMouseLeaveOrUp = () => {
        isDownRef.current = false;
      };
    
      // Handle mouse move for dragging
      const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, containerRef: React.RefObject<HTMLDivElement>) => {
        if (!isDownRef.current || !containerRef.current) return;
        e.preventDefault();
        const x = e.pageX - containerRef.current.offsetLeft;
        const walk = (x - startXRef.current) * 2;
        containerRef.current.scrollLeft = scrollLeftRef.current - walk;
        syncScroll(containerRef, containerRef === containerRef1 ? containerRef2 : containerRef1);
      };

  const filterDate = filter === null ?  '' : (filter?.toLocaleString())?.split(',')[0]

  useEffect(() => {
    const getList = async () => {
     
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/jobcomponent/getsuperadminjobcomponentdashboard?filterDate=${filterDate}`,{
            withCredentials: true
          })
  
          setDates(response.data.data.alldates)
          setList(response.data.data.teams)
        } catch (error) {
          
        }
      
     
    }
    getList()
  },[filter, getTeamid])

   

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

  
  const statusData = ( hours: any, wd: boolean, event: boolean, leave: boolean, wfh: Wfh[], leaveDate: string, leaveArray: Array<{ leavestart: string; leaveend: string }>,eventArray: Array<{ startdate: string; enddate: string }>,wellness: {requestdate: string}[] , ) => {
    const data = []

     // Check if the leaveDate is in any range in the leave array
    const isLeaveInRange = leaveArray.some((leaveItem) =>
      isDateInRange(leaveDate, leaveItem.leavestart, leaveItem.leaveend)
    );

    const isEventInRange = eventArray.some((leaveItem) =>
      isDateInRange(leaveDate, leaveItem.startdate, leaveItem.enddate)
    );

    const isWfhInRange = wfh.some((item) =>
      isDateInRange(leaveDate, item.requestdate, item.requestend)
    );

    const isWellnessDay= wellness.some((leaveItem) => {
      if(leaveItem.requestdate?.includes(leaveDate)){
        return true
      } else {
        return false
      }
    }
     
    );

    if (!isLeaveInRange) {
      if (hours <= 7.00) {
        data.push('bg-green-500');
      } else if (hours > 7.00 && hours <= 9.00 && !isEventInRange) {
        data.push('bg-orange-500');
      }
      else if(hours > 9.01){
        data.push('bg-pink-500')
      } else if(isEventInRange){
        data.push('bg-gray-400')
  
      } else if(isWfhInRange){
        data.push('bg-lime-300')
  
      } else 
      if(isWellnessDay){
        data.push('bg-fuchsia-300')
      }
    }

  
    // if(hours < 40){
    //   data.push('bg-cyan-500')
    // }

    // if(hours > 40){
    //   data.push('bg-indigo-500')
    // }

    

    if(isLeaveInRange){
      data.push('bg-violet-500')
    }

    return data
  }


  const formatAustralianDate = (date: string) => {
    const dates = new Date(date);
    return dates.toLocaleDateString('en-AU', { day: '2-digit', month: '2-digit', year: '2-digit' });
  };
  



  return (
    <div className=' w-full h-full flex flex-col justify-center bg-secondary p-4 text-zinc-100'>

    
      <div className=' relative h-full w-full flex flex-col'>
        <div className=' flex flex-col gap-2 sticky top-0 z-[9999] bg-secondary'>
          <div className=' flex items-center justify-between'>
          {/* <SortableTeamsDialog/> */}

            <div className=' relative z-[9999] w-full flex items-center gap-2 justify-end'>
              <label htmlFor="" className=' text-xs'>Filter by date:</label>
              <div className=' relative z-[999999]'>
              <DatePicker
                selected={filter}
                onChange={(date) => setFilter(date)}
                dateFormat="dd/MM/yyyy"
                placeholderText="DD/MM/YYYY"
                className="bg-primary text-xs p-2 w-fit z-[9999] relative"
                onKeyDown={(e) => e.preventDefault()}
                

              />
            </div>
            
            <button onClick={() => setFilter(null)} className=' p-2 bg-red-600 text-white rounded-sm'><RefreshCcw size={15}/></button>


            </div>
          </div>

          <div className=' w-full flex'>
            <div className=' h-full overflow-y-auto flex items-start justify-center bg-secondary w-full max-w-[1920px]'>
              <table className="table-auto w-auto border-collapse ">
                <thead className=' bg-secondary h-[70px]'>

                  <tr className=' text-[0.5rem] text-zinc-100 font-normal border-collapse'>
                    <th className=' text-left min-w-[120px] font-normal whitespace-normal break-all border-[1px] border-zinc-600 px-2'>Team</th>
                    <th className=' text-left min-w-[50px] font-normal whitespace-normal break-all border-[1px] border-zinc-600 px-2'>Initial</th>
                    <th className=' text-left font-normal min-w-[60px] whitespace-normal break-all border-[1px] border-zinc-600 px-2'>Resource</th>
                
                  </tr>
                </thead>
                <tbody>
              
              </tbody>
              </table>

              <div 
               ref={containerRef1}
               onMouseDown={(e) => handleMouseDown(e, containerRef1)}
               onMouseLeave={handleMouseLeaveOrUp}
               onMouseUp={handleMouseLeaveOrUp}
               onMouseMove={(e) => handleMouseMove(e, containerRef1)}
               onScroll={() => syncScroll(containerRef1, containerRef2)}
              className=' overflow-x-auto w-full h-full'>
            
                <table className="table-auto w-full border-collapse ">
                  
                <thead className="w-full bg-white h-[70px]">
                  <tr className="text-[0.6rem] text-black font-normal">
                    {dates.map((dateObj, index) => {
                      const date = new Date(dateObj);
                      date.setHours(0, 0, 0, 0);

                      const today = new Date();
                      today.setHours(0, 0, 0, 0);

                      const startOfWeek = new Date(today);
                      startOfWeek.setDate(today.getDate() - (today.getDay() - 1));

                      const endOfWeek = new Date(startOfWeek);
                      endOfWeek.setDate(startOfWeek.getDate() + 4);

                      let bgColor = "bg-white";
                      if (date >= startOfWeek && date <= endOfWeek) {
                        const prevDay = new Date(today);
                        prevDay.setDate(today.getDate() - 1);

                        const nextDay = new Date(today);
                        nextDay.setDate(today.getDate() + 1);

                        if (date.getTime() < today.getTime()) {
                          bgColor = "bg-gray-300"; 
                        } else if (date.getTime() === today.getTime()) {
                          bgColor = "bg-pink-500";
                        } else if (date.getTime() >= nextDay.getTime()) {
                          bgColor = "bg-white";
                        }
                      }

                      return (
                        <React.Fragment key={index}>
                          <th className={`relative font-normal border-[1px] border-zinc-700 max-w-[20px] ${bgColor}`}>
                            <div className="whitespace-nowrap transform -rotate-[90deg] max-w-[20px]">
                              <p className="mt-6 font-bold">{formatAustralianDate(dateObj)}</p>
                            </div>
                          </th>
                          {(index + 1) % 5 === 0 && (
                            <th
                              key={`total-${index}`}
                              className="font-normal max-w-[25px] border-[1px] bg-primary border-zinc-700"
                            >
                              <p className="-rotate-90 max-w-[25px] ml-[2px] font-bold text-white">Total Hours</p>
                            </th>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </tr>
                </thead>
                  <tbody>
                
                </tbody>
                </table>
              
                
              </div>


            </div>
          </div>
        </div>
       
      
      {list.length !== 0 ? (
              <div className=' h-full overflow-y-auto flex items-start justify-center bg-secondary w-full max-w-[1920px]'>
                <table className="table-auto w-auto border-collapse ">
                  <thead className=' bg-secondary h-[70px]'
                  style={{ visibility: 'collapse' }}
                  >
      
                   <tr className=' text-[0.5rem] text-zinc-100 font-normal border-collapse'>
                        <th className=' text-left min-w-[120px] font-normal whitespace-normal break-all border-[1px] border-zinc-600 px-2'>Team</th>
                        <th className=' text-left min-w-[50px] font-normal whitespace-normal break-all border-[1px] border-zinc-600 px-2'>Initial</th>
                        <th className=' text-left font-normal min-w-[60px] whitespace-normal break-all border-[1px] border-zinc-600 px-2'>Resource</th>
                    
                      </tr>
                  </thead>
                  <tbody>
                  {list.map((graphItem, graphIndex) =>
                    graphItem.members
                    .sort((a, b) => {
                        const initialsA = a.initial?.toLowerCase() || '';
                        const initialsB = b.initial?.toLowerCase() || '';
                        return initialsA.localeCompare(initialsB);
                      })
                    .map((member, memberIndex) => (
                      <tr key={`${graphIndex}-${memberIndex}`} className="bg-primary text-[.5rem] py-2 h-[35px] border-[1px] border-zinc-600 text-left border-collapse">
                        {memberIndex === 0 ?
                        (<td  onClick={() => router.push(`/pm/graph/jobcomponent?teamid=${graphItem.teamid}&teamname=${graphItem.name}`)} className=" text-[.65rem]  whitespace-normal break-all border-[1px] border-zinc-600 px-2 text-left underline cursor-pointer">{graphItem.name}</td>) :  (<td className="text-center"></td>)
                        }
                        {/* <td onClick={() => router.push(`/pm/individualworkload?employeeid=${member.id}&name=${member.name}&teamname=${graphItem.name}`)} className=" whitespace-normal break-all border-[1px] border-zinc-600 px-2 text-left cursor-pointer underline text-blue-400">{member.name}</td> */}
                        <td className="text-left whitespace-normal break-all border-[1px] border-zinc-600 px-2">
                        <a href={`/pm/individualworkload?employeeid=${member.id}&name=${member.name}&teamname=${graphItem.name}`} className=' underline'>{member.initial}</a>
                        </td>
                        <td className="text-left whitespace-normal break-all border-[1px] border-zinc-600 px-2">{member.resource}</td>
                       
                    
                      </tr>
                    ))
                  )}
                </tbody>
                </table>
      
                <div 
                  ref={containerRef2}
                  onMouseDown={(e) => handleMouseDown(e, containerRef1)}
                  onMouseLeave={handleMouseLeaveOrUp}
                  onMouseUp={handleMouseLeaveOrUp}
                  onMouseMove={(e) => handleMouseMove(e, containerRef1)}
                  onScroll={() => syncScroll(containerRef2, containerRef1)}
                className=' w-full h-full overflow-x-auto'>
              
                  <table className="table-auto w-full border-collapse ">
                    
                  <thead className="w-full bg-white h-[70px]"
                  style={{ visibility: 'collapse' }}
                  >
                    <tr className="text-[0.6rem] text-black font-normal">
                      {dates.map((dateObj, index) => {
                        const date = new Date(dateObj);
                        date.setHours(0, 0, 0, 0);
      
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
      
                        const startOfWeek = new Date(today);
                        startOfWeek.setDate(today.getDate() - (today.getDay() - 1));
      
                        const endOfWeek = new Date(startOfWeek);
                        endOfWeek.setDate(startOfWeek.getDate() + 4);
      
                        let bgColor = "bg-white";
                        if (date >= startOfWeek && date <= endOfWeek) {
                          const prevDay = new Date(today);
                          prevDay.setDate(today.getDate() - 1);
      
                          const nextDay = new Date(today);
                          nextDay.setDate(today.getDate() + 1);
      
                          if (date.getTime() < today.getTime()) {
                            bgColor = "bg-gray-300"; 
                          } else if (date.getTime() === today.getTime()) {
                            bgColor = "bg-pink-500";
                          } else if (date.getTime() >= nextDay.getTime()) {
                            bgColor = "bg-white";
                          }
                        }
      
                        return (
                          <React.Fragment key={index}>
                          <th className={`relative font-normal max-w-[20px] border-[1px] border-zinc-700 ${bgColor}`}>
                            <div className="whitespace-nowrap transform -rotate-[90deg] w-[20px]">
                              <p className="mt-6 font-bold">{formatAustralianDate(dateObj)}</p>
                            </div>
                          </th>
                          {(index + 1) % 5 === 0 && (
                            <th
                              key={`total-${index}`}
                              className="font-normal max-w-[25px] border-[1px] bg-primary border-zinc-700"
                            >
                              <p className="-rotate-90  ml-[2px] font-bold text-white">Total Hours</p>
                            </th>
                          )}
                        </React.Fragment>
                        );
                      })}
                    </tr>
                  </thead>
      
                    <tbody>
                    {list.map((workItem, workIndex) => (
                      <React.Fragment key={workIndex}>
                        {workItem.members.map((member, memberIndex) => (
                          <tr
                            key={`${workIndex}-${memberIndex}`}
                            className="bg-primary text-[.6rem] py-2 h-[35px] border-[1px] border-zinc-600"
                          >
                            {dates.map((date, dateIndex) => {
                            
                              const dateData = member.dates.find(d => d.date === date);
                              const hours = dateData ? dateData.totalhoursofjobcomponents : '-';
                              const isEventDay = dateData ? dateData.eventDay : false;
                              const isWd = dateData ? dateData.wellnessDay : false;
                              const isLeave = dateData ? dateData.leave : false;
      
                           
                              const startIndex = Math.floor(dateIndex / 5) * 5;
                              const endIndex = startIndex + 5;
                              const totalHours = member.dates
                              .filter(d => {
                                const isWithinSelectedDates = dates.slice(startIndex, endIndex).includes(d.date);
                                return isWithinSelectedDates; // No longer excluding leave dates
                              })
                              .reduce((acc, d) => acc + d.totalhoursofjobcomponents, 0);
                              // const totalHours = member.dates
                              // .filter(d => {
                              //   const isWithinSelectedDates = dates.slice(startIndex, endIndex).includes(d.date);
                            
                              //   const isOnLeave = member.leave?.some(leave =>
                              //     isDateInRange(d.date, leave.leavestart, leave.leaveend)
                              //   );
                            
                              //   return isWithinSelectedDates && !isOnLeave;
                              // })
                              // .reduce((acc, d) => acc + d.totalhoursofjobcomponents, 0);
      
                              return (
                                <React.Fragment key={dateIndex}>
                               
                                  <td
                                    className={`relative text-center overflow-hidden bg-white border-[1px] ${
                                      isEventDay ? 'bg-red-200' : isWd ? 'bg-blue-200' : isLeave ? 'bg-yellow-200' : ''
                                    }`}
                                  >
                                    <div className="flex absolute top-0 w-full h-[48px] text-center">
                                      {statusData(hours, isWd, isEventDay, isLeave,member.wfh , date, member.leave, member.event, member.wellness).map((item, index) => (
                                        <div key={index} className={`w-full h-full ${item}`}></div>
                                      ))}
                                    </div>
                                    <p className="relative text-black font-bold text-[.45rem] z-30">{!isEventDay && hours}</p>
                                  </td>
      
                                  {(dateIndex + 1) % 5 === 0 && (
                                    <th
                                      key={`total-${dateIndex}`}
                                      className="font-normal  max-w-[25px] bg-primary border-[1px] border-zinc-700"
                                    >
                                      <p className="text-white text-[.5rem] font-medium">{totalHours.toLocaleString() || '-'}</p>
                                    </th>
                                  )}
                                </React.Fragment>
                              );
                            })}
                          </tr>
                        ))}
                      </React.Fragment>
                      ))}
      
                  </tbody>
                  </table>
                
                  
                </div>
      
      
              </div>
                ): (
              
                  <div className=' w-full h-[300px] flex items-center justify-center'>
                    <p className=' text-sm text-zinc-400'>No data.</p>
                  </div>
                
              )}
     
      
    </div>
   
      

    
        
    </div>
  )
}
