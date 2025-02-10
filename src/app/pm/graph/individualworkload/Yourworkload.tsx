'use client'
import React, { useEffect, useMemo, useState } from 'react'
import Spreadsheet from 'react-spreadsheet';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { Workload } from '@/types/types';
import { formatAustralianDate, formatDate, formatMonthYear } from '@/utils/functions';
import Legends from '@/components/common/Legends';

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


export default function Indiviualworkloads() {
  const params = useSearchParams()
  const id = params.get('employeeid')
  const [list, setList] = useState<Workload[]>([])
  const [dates, setDates] = useState<string[]>([])
  const [dateFilter, setDateFilter] = useState('')


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
    if(hours > 8){
      colorData.push('bg-pink-500')
    }
    if(isWithinAnyEventDate){
      colorData.push('bg-gray-400')
    }
    if(isWithinAnyLeaveDate){
      colorData.push('bg-violet-300')
    }
    if(isWellnessDate){
      colorData.push('bg-fuchsia-500')
    }

    return colorData; 
  }


  useEffect(() => {
    const getMembers = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/jobcomponent/individualworkloadmanager?employeeid=${id}&filterDate=${dateFilter}`,{
          withCredentials: true
        })

        setList(response.data.data.yourworkload)
        setDates(response.data.data.alldates)
        setList
      } catch (error) {
        
      }
    }
    getMembers()
  },[id, dateFilter])


  
  
  return (
    <div className=' w-full h-full flex flex-col justify-center bg-secondary text-zinc-100 p-4'>

      <div className=' w-full flex justify-between items-end gap-8 h-auto bg-primary mb-2 p-4 text-xs'>
        {/* <div className=' w-auto flex flex-col gap-1'>
          <p className=' text-zinc-400'>Project Name: <span className=' text-red-500 underline'>{list.length !== 0 ? list[0].projectname : ''}</span></p>
          <p className=' text-zinc-400'>Employee Name: <span className=' text-red-500 underline'>{list.length !== 0 ? list[0].members[0].employee.fullname : ''}</span></p>
          <p className=' text-zinc-400'>Manager Name: <span className=' text-red-500 underline'>{list.length !== 0 ? list[0].jobmanager.fullname : ''}</span></p>

        </div> */}

        <Legends/>

        <div className=' flex flex-col gap-2'>
          <p>Filter by dates</p>
          <input value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} type="date" className=' text-white bg-secondary p-2 rounded-md' />

        </div>

      
      </div>

      <div className=' h-full w-full flex flex-col max-w-[1920px]'>
        <div className=' h-full overflow-y-auto flex items-start justify-center bg-secondary w-full max-w-[1920px]'>
        {list.length !== 0 ? (
          <>
          <table className="table-auto w-[800px] border-collapse ">
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
                <thead className="w-full bg-white h-[100px]">
                    <tr className="text-[0.6rem] text-black font-normal">
                                            {dates.map((dateObj, index) => {
                                              const date = new Date(dateObj)
                                              date.setHours(0, 0, 0, 0) // Normalize the date to remove time differences
                            
                                              const today = new Date()
                                              today.setHours(0, 0, 0, 0) // Normalize today
                            
                                              const tomorrow = new Date(today)
                                              tomorrow.setDate(today.getDate() + 1) // Get tomorrow's date
                            
                                              // Determine background color
                                              let bgColor = "bg-white"
                                              if (date.getTime() < today.getTime()) bgColor = "bg-gray-300"
                                              else if (date.getTime() === today.getTime()) bgColor = "bg-pink-500"
                                              else if (date.getTime() === tomorrow.getTime()) bgColor = "bg-pink-300"
                            
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
                    <tr key={`${graphIndex}-${memberIndex}`} className="bg-primary text-[.6rem] py-2 h-[41px] border-[1px] border-zinc-600">
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

