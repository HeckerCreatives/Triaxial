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
import { useRouter } from 'next/navigation'
import { Workload } from '@/types/types'
import { formatDate } from '@/utils/functions'
import Leaveform from '@/components/forms/Leaveform'
import WDform from '@/components/forms/Wellnessday'
import Wfhform from '@/components/forms/Wfhform'
import { Eye } from 'lucide-react'
import { clientColor } from '@/utils/helpers'


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
  const [dateFilter, setDateFilter] = useState('')
  const [list, setList] = useState<Workload[]>([])
  const [dates, setDates] = useState<string[]>([])
  const router = useRouter()

  useEffect(() => {
    const getWorkload = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/jobcomponent/yourworkload?filterDate=${dateFilter}`,{
          withCredentials: true
        })

        setList(response.data.data.yourworkload)
        setDates(response.data.data.alldates)
      } catch (error) {
        
      }
    }
    getWorkload()
   
  },[dateFilter])

  
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

  const statusColor = (data: string[], date: string, hours: number, eventStart: string, eventEnd: string, eventDates: Event[], leaveDates: Leave[], wellnessDates: string[]) => {
    const colorData: string[] = [];

    const isWithinAnyEventDate = eventDates.some((item) =>
      isDateInRange(date, item.startdate, item.enddate)
    );

    const isWithinAnyLeaveDate = leaveDates.some((item) =>
      isDateInRange(date, item.leavestart, item.leaveend)
    );

     // Check if the date is in wellnessDates
    const isWellnessDate = wellnessDates.some(
      (wellnessDate) => formatDate(wellnessDate) === date
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
    if(hours > 9){
      colorData.push('bg-pink-500')
    }
    if(isWithinAnyEventDate){
      colorData.push('bg-gray-400')
    }
    if(isWithinAnyLeaveDate){
      colorData.push('bg-violet-300')
    }
    if(isWellnessDate){
      colorData.push('bg-fuchsia-400')
    }


    return colorData; 
  }

  const formatAustralianDate = (date: any) => {
    const parsedDate = new Date(date); // Ensure the date is converted to a Date object
    return parsedDate.toLocaleDateString('en-AU', { day: '2-digit', month: '2-digit', year: '2-digit' });
  };
  
  const formatMonthYear = (date: any) => {
    const parsedDate = new Date(date); // Ensure the date is converted to a Date object
    return parsedDate.toLocaleDateString('en-AU', { month: 'short', year: 'numeric' });
  };
  



  return (
    <div className=' w-full h-full flex flex-col justify-center bg-secondary p-4 text-zinc-100'>

    <div className=' w-full flex items-center justify-between h-auto bg-primary mb-2 p-4 text-xs'>
    <div className=' flex flex-col gap-1 bg-primary rounded-sm text-xs'>
        <p className=' text-xs'>Request :</p>
        <div className='flex items-center gap-2 bg-primary rounded-sm text-xs'>
            <Leaveform onClick={() => undefined}>
              <button className={`text-xs px-3 py-1 bg-red-600  rounded-sm`}>Leave</button>
            </Leaveform>
            <WDform onClick={() => undefined}>
              <button className={`text-xs px-3 py-1 bg-red-600  rounded-sm`}>Wellness Day</button>
            </WDform>

            <Wfhform onClick={() => undefined}>
              <button className={`text-xs px-3 py-1 bg-red-600  rounded-sm`}>WFH</button>
            </Wfhform>

        </div>
          
        </div>
      <Legends/>

      <div className=' flex flex-col gap-2'>
        <p>Filter by dates</p>
        <input value={dateFilter} onChange={(e) => setDateFilter(e.target.value)}  min="1900-01-01" max="2099-12-31" type="date" className=' text-white bg-secondary p-2 rounded-md' />

      </div>

    </div>

    <div className=' h-full w-full flex flex-col max-w-[1920px]'>
      <div className=' h-full overflow-y-auto flex items-start justify-center bg-secondary w-full max-w-[1920px]'>
        {list.length !== 0 ? (
          <>
          <table className="table-auto w-[800px] border-collapse ">
          <thead className=' bg-secondary h-[100px]'>

            <tr className=' text-[0.6rem] text-zinc-100 font-normal border-collapse'>
              <th className=' text-left font-normal min-w-[80px] whitespace-normal break-all border-[1px] border-zinc-600 px-2'>Team.</th>
              <th className=' text-left font-normal min-w-[80px] whitespace-normal break-all border-[1px] border-zinc-600 px-2'>Job No.</th>
              <th className=' text-left font-normal min-w-[80px] whitespace-normal break-all border-[1px] border-zinc-600 px-2'>Client Name</th>
              <th className=' text-left font-normal min-w-[80px] whitespace-normal break-all border-[1px] border-zinc-600 px-2'>Project name</th>
              <th className=' text-left font-normal min-w-[80px] whitespace-normal break-all border-[1px] border-zinc-600 px-2'>Job Mgr.</th>
              <th className=' text-left font-normal min-w-[80px] whitespace-normal break-all border-[1px] border-zinc-600 px-2'>Job Component</th>
              <th className=' text-left min-w-[80px] whitespace-normal break-all border-[1px] border-zinc-600 font-normal px-2'>Other Members</th>
              <th className=' text-left font-normal min-w-[80px] whitespace-normal break-all border-[1px] border-zinc-600 px-2'>Role</th>
              <th className=' text-left font-normal min-w-[80px] whitespace-normal break-all border-[1px] border-zinc-600 px-2'>Notes</th>

            
            </tr>
          </thead>
          <tbody>
          {list.map((graphItem, graphIndex) =>
            graphItem.members.map((member, memberIndex) => (
              <tr key={`${graphIndex}-${memberIndex}`} className={` text-black text-[.6rem] py-2 h-[40px] border-[1px] border-zinc-600 ${clientColor(graphItem.clientpriority)}`}>
                 
                  <td className="text-left  whitespace-normal break-all border-[1px] border-zinc-600 px-2">{graphItem.teamname}</td>
                  <td className="text-left  whitespace-normal break-all border-[1px] border-zinc-600 px-2">{memberIndex === 0 && graphItem.jobno}</td>
                  <td className="text-left  whitespace-normal break-all border-[1px] border-zinc-600 px-2">{memberIndex === 0 && graphItem.clientname}</td>
                  <td className="text-left  whitespace-normal break-all border-[1px] border-zinc-600 px-2">{memberIndex === 0 && graphItem.projectname}</td>
                  <td className="text-left whitespace-normal break-all border-[1px] border-zinc-600 px-2">{memberIndex === 0 && graphItem.jobmanager.fullname}</td>
                  <td className="text-left whitespace-normal break-all border-[1px] border-zinc-600 px-2">{memberIndex === 0 && graphItem.jobcomponent}</td>
      
                  <td className="text-left whitespace-normal break-all border-[1px] border-zinc-600 px-2">{graphItem.teammembers.join(", ")}</td>
                <td className="text-left text-[.5rem whitespace-normal break-all border-[1px] border-zinc-600 px-2]">{member.role}</td>
                <td className="text-left whitespace-normal break-all border-[1px] border-zinc-600 px-2">
                  <Dialog>
                    <DialogTrigger className=' bg-red-600 p-1 rounded-sm flex items-center'>
                      <Eye size={12} className=' text-[.6rem]'/> View
                    </DialogTrigger>
                    <DialogContent className=' bg-secondary p-6 border-none max-w-[600px] text-white'>
                      <DialogHeader>
                        <DialogTitle>Notes</DialogTitle>
                        <DialogDescription>
                          
                        </DialogDescription>
                      </DialogHeader>
                      {member.notes === '' ? (
                        <p className=' text-xs text-zinc-400 h-full w-full text-center'>No notes.</p>
                      ):(
                      <p className=' text-xs text-zinc-400'>{member.notes}</p>
                      )}
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
              <thead className="w-full bg-white h-[100px]">
                <tr className={`text-[0.6rem] text-black font-normal`}>
                              {dates.map((dateObj, index) => {
                                const date = new Date(dateObj)
                                date.setHours(0, 0, 0, 0) // Normalize the date to remove time differences
              
                               
              
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
                                    bgColor = "bg-pink-200";
                                  }
                                }
              
                                return (
                                  <React.Fragment key={index}>
                                    <th
                                      className={`relative font-normal border-[1px] border-zinc-700 ${bgColor}`}
                                    >
                                      <div className="whitespace-nowrap transform -rotate-[90deg] w-[20px]">
                                        <p className="mt-4 font-bold">{formatAustralianDate(dateObj)}</p>
                                      </div>
                                    </th>
                                    {(index + 1) % 5 === 0 && (
                                      <th
                                        key={`total-${index}`}
                                        className="font-normal bg-primary w-[20px] border-[1px] border-zinc-700"
                                      >
                                        <p className="-rotate-90 w-[20px] ml-[2px] font-bold text-white">Total Hours</p>
                                      </th>
                                    )}
                                  </React.Fragment>
                                )
                              })}
                </tr>
              </thead>
              <tbody>
              {list.map((graphItem, graphIndex) =>
                  graphItem.members.map((member, memberIndex) => (
                    <tr key={`${graphIndex}-${memberIndex}`} className="bg-primary text-[.6rem] py-2 h-[40px] border-[1px] border-zinc-600">
                      {dates.map((dateObj, index) => {
                        // Find member data for the given date
                        const memberDate = member.dates?.find((date) => formatDate(date.date) === formatDate(dateObj));

                        // Compute the total hours for every 5 dates
                        const totalHoursForWeek = dates
                          .slice(index - (index % 5), index + 1) // Get the previous 5 dates or less
                          .reduce((total, currentDate) => {
                            const memberDateForCurrent = member.dates?.find((date) => formatDate(date.date) === formatDate(currentDate));
                            return total + (memberDateForCurrent?.hours || 0);
                          }, 0);

                        return (
                          <React.Fragment key={index}>
                            <td
                              className="relative text-center overflow-hidden bg-white border-[1px]"
                            >
                              <div className="w-full h-[40px] absolute flex top-0">
                                {statusColor(
                                  memberDate?.status || [],
                                  dateObj,
                                  memberDate?.hours || 0,
                                  member.eventDates[0]?.startdate || '',
                                  member.eventDates[0]?.enddate || '',
                                  member.eventDates,
                                  member.leaveDates,
                                  member.wellnessDates
                                ).map((item, idx) => (
                                  <div key={idx} className={`w-full h-[40px] ${item}`} />
                                ))}
                              </div>

                              <p className="relative text-black font-bold text-xs z-30">
                                {memberDate ? memberDate.hours : '-'}
                              </p>
                            </td>

                            {/* Show total hours for every 5th date */}
                            {(index + 1) % 5 === 0 && (
                              <th className="font-normal px-1 border-[1px] border-zinc-700">
                                <p className="">{totalHoursForWeek}</p>
                              </th>
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
            <p className=' text-xs text-zinc-400'>No data.</p>

          </div>
        )}
        

        

      </div>
     
      
    </div>

  
      
  </div>
  )
}
