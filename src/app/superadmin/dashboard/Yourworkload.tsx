"use client"
import React, { useEffect, useMemo, useState } from 'react'
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { useRouter, useSearchParams } from 'next/navigation'
import { RefreshCcw } from 'lucide-react'
import { string } from 'zod'
import { formatDate } from '@/utils/functions'

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

type Leave = {
  leavestart: string
  leaveend: string
}

type Event = {
  startdate: string
  enddate: string
}

type Wellnessday = {
  startdate: string
  enddate: string
}

export default function Yourworkload() {
  const [memberIndex, setMemberIndex] = useState(0)
  const [list, setList] = useState<List[]>([])
  const [dates, setDates] = useState<string[]>([])
  const [filter, setFilter] = useState('')
  const router = useRouter()
  const params = useSearchParams()
  const getTeamid = params.get('team')


  useEffect(() => {
    const getList = async () => {
      if (getTeamid !== '' || undefined || null){
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/jobcomponent/getsuperadminjobcomponentdashboard?filterDate=${filter}`,{
            withCredentials: true
          })
  
          setDates(response.data.data.alldates)
          setList(response.data.data.teams)
        } catch (error) {
          
        }
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

  const statusData = ( hours: any, wd: boolean, event: boolean, leave: boolean, leaveDate: string, leaveArray: Array<{ leavestart: string; leaveend: string }>,eventArray: Array<{ eventstart: string; eventend: string }>,wellness: Array<{wellnessdates: string}>, ) => {
    const data = []

     // Check if the leaveDate is in any range in the leave array
    const isLeaveInRange = leaveArray.some((leaveItem) =>
      isDateInRange(leaveDate, leaveItem.leavestart, leaveItem.leaveend)
    );

    const isEventInRange = eventArray.some((leaveItem) =>
      isDateInRange(leaveDate, leaveItem.eventstart, leaveItem.eventend)
    );

    const isWellnessDay= wellness.some((leaveItem) => {
      if(leaveItem.wellnessdates.includes(leaveDate)){
        return true
      } else {
        return false
      }
    }
     
    );

    if(hours <= 2){
      data.push('bg-red-500')
    }

    if(hours <= 4 && hours >= 4){
      data.push('bg-orange-500')
    }

    if(hours <= 6 && hours >= 4){
      data.push('bg-yellow-500')
    }

    if(hours <= 8 && hours >= 6){
      data.push('bg-green-500')
    }

    if(hours > 8){
      data.push('bg-green-500')
    }

    if(isWellnessDay){
      data.push('bg-violet-500')
    }
    if(hours < 40){
      data.push('bg-cyan-500')
    }

    if(hours > 40){
      data.push('bg-indigo-500')
    }

    if(isEventInRange){
      data.push('bg-gray-400')

    }

    if(isEventInRange){
      data.push('bg-gray-400')

    }

    if(isLeaveInRange){
      data.push('bg-pink-500')
    }

    return data
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
    if(isLeaveInRange){
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



  const formatAustralianDate = (date: string) => {
    const dates = new Date(date); // Convert the string to a Date object
    return dates.toLocaleDateString('en-AU', { day: '2-digit', month: '2-digit', year: '2-digit' });
  };
  
  const formatMonthYear = (date: string) => {
    const dates = new Date(date); // Convert the string to a Date object
    return dates.toLocaleDateString('en-AU', { month: 'short', year: 'numeric' });
  };



  return (
    <div className=' w-full h-full flex flex-col justify-center bg-secondary p-4 text-zinc-100'>

    
      <div className=' h-full w-full flex flex-col gap-2 max-w-[1920px]'>
      <div className=' w-full flex items-center gap-2 justify-end'>
        <label htmlFor="" className=' text-xs'>Filter by date:</label>
        <input value={filter} onChange={(e) => setFilter(e.target.value)} type="date" name="" id="" className=' p-2 bg-primary text-xs rounded-sm' />
        <button onClick={() => setFilter('')} className=' p-2 bg-red-600 text-white rounded-sm'><RefreshCcw size={15}/></button>


      </div>
      {list.length !== 0 ? (
        <div className=' h-full overflow-y-auto flex items-start justify-center bg-secondary w-full max-w-[1920px]'>
          <table className="table-auto w-[300px] border-collapse ">
            <thead className=' bg-secondary h-[100px]'>

              <tr className=' text-[0.6rem] text-zinc-100 font-normal'>
                <th className=' w-[20px] font-normal'>Team</th>
                <th className=' w-[20px] font-normal'>Name</th>
                <th className=' w-[50px] font-normal'>Initial</th>
                <th className=' font-normal w-[50px]'>Resource</th>
            
              </tr>
            </thead>
            <tbody>
            {list.map((graphItem, graphIndex) =>
              graphItem.members.map((member, memberIndex) => (
                <tr key={`${graphIndex}-${memberIndex}`} className="bg-primary text-[.6rem] py-2 h-[40px] border-[1px] border-zinc-600">
                  {memberIndex === 0 ?
                  (<td  onClick={() => router.push(`/superadmin/projects/teamprojects?teamid=${graphItem.teamid}`)} className="text-center text-red-500 underline cursor-pointer">{graphItem.name}</td>) :  (<td className="text-center"></td>)
                  }
                  <td onClick={() => router.push(`/superadmin/individualworkload?employeeid=${member.id}`)} className="text-center cursor-pointer underline text-blue-400">{member.name}</td>
                  <td className="text-center">{member.initial}</td>
                  <td className="text-center">{member.resource}</td>
                 
              
                </tr>
              ))
            )}
          </tbody>
          </table>

          <div className=' overflow-x-auto w-full h-full'>
        
            <table className="table-auto w-full border-collapse ">
              <thead className=' w-full bg-secondary h-[100px]'>
                <tr className=' text-[0.6rem] text-zinc-100 font-normal'>
                
                  {dates.map((dateObj, index) => (
                    <>
                      <th key={index} className=' relative font-normal w-[30px] border-[1px] border-zinc-700'>
                        <div className="whitespace-nowrap transform -rotate-[90deg]">
                            <p>{formatAustralianDate(dateObj)}</p>
                            <p>{formatMonthYear(dateObj)}</p>
                          </div>
                      </th>
                      {(index + 1) % 5 === 0 && (
                        <th key={`total-${index}`} className='font-normal w-[30px] border-[1px] border-zinc-700'>
                          <p className='-rotate-90 w-[50px]'>Total Hours</p>
                        </th>
                      )}
                    </>
                  ))}
                
                  
                </tr>
              </thead>
              <tbody>
              {list.map((workItem, workIndex) => (
                <React.Fragment key={workIndex}>
                  {workItem.members.map((member, memberIndex) => (
                    <tr
                      key={`${workIndex}-${memberIndex}`}
                      className="bg-primary text-[.6rem] py-2 h-[40px] border-[1px] border-zinc-600"
                    >
                      {dates.map((date, dateIndex) => {
                        // Find date data for the current member and date
                        const dateData = member.dates.find(d => d.date === date);
                        const hours = dateData ? dateData.totalhoursofjobcomponents : '-';
                        const isEventDay = dateData ? dateData.eventDay : false;
                        const isWd = dateData ? dateData.wellnessDay : false;
                        const isLeave = dateData ? dateData.leave : false;

                        // Calculate total hours for every 5-day block
                        const startIndex = Math.floor(dateIndex / 5) * 5;
                        const endIndex = startIndex + 5;
                        const totalHours = member.dates
                          .filter(d => dates.slice(startIndex, endIndex).includes(d.date))
                          .reduce((acc, d) => acc + d.totalhoursofjobcomponents, 0);

                        return (
                          <React.Fragment key={dateIndex}>
                            {/* Render date cell */}
                            <td
                              className={`relative text-center overflow-hidden bg-white border-[1px] ${
                                isEventDay ? 'bg-red-200' : isWd ? 'bg-blue-200' : isLeave ? 'bg-yellow-200' : ''
                              }`}
                            >
                              <div className="flex absolute top-0 w-full h-[40px] text-center">
                                {statusData(hours, isWd, isEventDay, isLeave, date, member.leave, member.event, member.wellness).map((item, index) => (
                                  <div key={index} className={`w-full h-full ${item}`}></div>
                                ))}
                              </div>
                              <p className="relative text-black font-bold text-xs z-30">{!isEventDay && hours}</p>
                            </td>

                            {/* Render total for every 5-day block */}
                            {(dateIndex + 1) % 5 === 0 && (
                              <th
                                key={`total-${dateIndex}`}
                                className="font-normal w-[40px] bg-primary border-[1px] border-zinc-700"
                              >
                                <p className="text-white">{totalHours || '-'}</p>
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
