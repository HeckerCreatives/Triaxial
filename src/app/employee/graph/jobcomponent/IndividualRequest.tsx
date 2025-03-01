"use client"
import React, { forwardRef, useEffect, useLayoutEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import { formatAustralianDate } from '@/utils/functions'

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
  members: Workload[]
}

type Workload = {
  initial: string
  id: string
  name: string
  resource: string
  dates: Dates[]
  leave: [
    {
      leavestart: string
      leaveend: string
    }
  ]
  event: [
    {
      eventstart: string
      eventend: string
    }
  ]
  wellness: [
    {
      wellnessdates: string
    }
  ]
}

type Prop = {
  alldates: string[]
  data: TeamData[]
}

type Employee = {
  _id: string | null;
  fullname: string;
  initials: string;
};

type Member = {
  employee: Employee;
  role: string;
  notes: string;
  dates: any[];
  _id: string;
  leaveDates: any[];
  wellnessDates: any[];
  eventDates: any[];
};

type TeamData = {
  _id: string;
  teamname: string;
  members: Member[];
};

const Individualrequest = forwardRef<HTMLDivElement, Prop>(({ alldates, data }, ref) => {
  const [memberIndex, setMemberIndex] = useState(0)
  const [list, setList] = useState<List[]>([])
  const [dates, setDates] = useState<string[]>([])
  const [filter, setFilter] = useState('')
  const router = useRouter()
  const params = useSearchParams()
  const getTeamid = params.get('teamid')
  const divRef = ref as React.MutableRefObject<HTMLDivElement | null>
  const today = new Date()
    const tableRef = useRef<HTMLDivElement>(null);
  

  useEffect(() => {
    const getList = async () => {
      if (getTeamid !== '' || undefined || null) {
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/jobcomponent/getjobcomponentindividualrequest?teamid=${getTeamid}`, {
            withCredentials: true
          })
          setDates(response.data.data.alldates)
          setList(response.data.data.teams)
        } catch (error) {
          console.error('Error fetching data', error)
        }
      }
    }
    getList()
  }, [filter, getTeamid])


  const isDateInRange = (dateToCheck: string, startDate: string, endDate: string): boolean => {
    const checkDate = new Date(dateToCheck)
    const start = new Date(startDate)
    const end = new Date(endDate)
    checkDate.setHours(0, 0, 0, 0)
    start.setHours(0, 0, 0, 0)
    end.setHours(0, 0, 0, 0)
    return checkDate >= start && checkDate <= end
  }

  const statusData = (hours: any, wd: boolean, event: boolean, leave: boolean, leaveDate: string, leaveArray: Array<{ leavestart: string; leaveend: string }>, eventArray: Array<{ startdate: string; enddate: string }>, wellness: string[]) => {
    const data = []

    const isLeaveInRange = leaveArray.some(leaveItem =>
      isDateInRange(leaveDate, leaveItem.leavestart, leaveItem.leaveend)
    )

    const isEventInRange = eventArray.some(leaveItem =>
      isDateInRange(leaveDate, leaveItem.startdate, leaveItem.enddate)
    )


    const isWellnessDay = wellness.some(
      (wellnessDate) => wellnessDate.includes(leaveDate.split('T')[0])
    );
    


    if (isEventInRange) data.push('bg-gray-300')
    if (isWellnessDay) data.push('bg-fuchsia-400')
    if (isLeaveInRange) data.push('bg-violet-300')

    return data
  }

  useEffect(() => {
    const scrollToDate = () => {
      if (divRef.current && list.length > 0) {
        const targetDate = formatAustralianDate(today.toLocaleString());
        const header = Array.from(divRef.current.querySelectorAll('th')).find(th => {
          const dateText = th.querySelector('p')?.textContent;
          return dateText === targetDate;  // Compare the textContent of <p> inside <th>
        });
  
        if (header) {
          header.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
        }
      }
    };
  
    const timeout = setTimeout(scrollToDate, 1500); // Delay by 300ms
  
    return () => clearTimeout(timeout);
  
  }, [list]);



  const extractUniqueTeamMembers = (data: TeamData[]): Member[] => {
    const memberMap = new Map<string | null, Member>();
    
    data.forEach(team => {
      team.members.forEach(member => {
        const employeeId = member.employee._id;
        if (employeeId && employeeId !== null && member.employee.fullname !== "N/A" && !memberMap.has(employeeId)) {
          memberMap.set(employeeId, member);
        }
      });
    });
    
    return Array.from(memberMap.values());
  };
  
  // Example usage
  const extractedmember = extractUniqueTeamMembers(data);




  return (
    <div className='h-auto flex items-start justify-center bg-secondary w-full max-w-[1920px]'>
      <table className="table-auto min-w-[963px] border-collapse">
        <thead className='bg-secondary h-[80px]'>
          <tr className='text-[0.6rem] text-zinc-100 font-normal border-collapse'>
            <th className=' text-center w-[20px] font-normal border-[1px] border-zinc-600 whitespace-normal break-all'>Name</th>
            <th className=' text-center w-[50px] font-normal border-[1px] border-zinc-600 whitespace-normal break-all'>Initial</th>
            <th className=' text-center font-normal w-[50px] border-[1px] border-zinc-600 whitespace-normal break-all'>Resource</th>
          </tr>
        </thead>
        <tbody>
          {extractedmember.map((item, graphIndex) =>
              <tr key={`${graphIndex}-${memberIndex}`} className="bg-primary text-[.6rem] py-2 h-[30px] border-[1px] border-zinc-600 border-collapse">
                <td onClick={() => router.push(`/employee/individualworkload?employeeid=${item.employee._id}&name=${item.employee.fullname}&teamname=${list[0].name}`)} className="text-center cursor-pointer underline text-blue-400 border-[1px] border-zinc-600 whitespace-normal break-all">{item.employee.fullname}</td>
                <td className="text-center border-[1px] border-zinc-600 whitespace-normal break-all">{item.employee.initials}</td>
                <td className="text-center border-[1px] border-zinc-600 whitespace-normal break-all">{item.role}</td>
              </tr>
          )}
        </tbody>
      </table>

      <div ref={divRef} className='overflow-x-auto w-full h-auto'>
        <table className="table-auto w-full border-collapse">
        <thead className="w-full h-[80px]">
        <tr className="text-[0.6rem] text-black font-bold">
        {alldates?.map((dateObj, index) => {
          const date = new Date(dateObj);
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
          

            const isFriday = date.getDay() === 5

            return (
              <React.Fragment key={index}>
                <th
                  data-id={formatAustralianDate(dateObj)}
                  className={`relative w-[20px] font-normal border-[1px] border-zinc-700 ${bgColor}`}
                >
                  <div className="whitespace-nowrap w-[20px] transform -rotate-[90deg]">
                    <p className="mt-3 font-bold">{formatAustralianDate(dateObj)}</p>
                  </div>
                </th>
                {isFriday && (
                  <th
                    key={`total-${index}`}
                    className="font-normal w-[20px] px-1 border-[1px] border-zinc-700 bg-primary text-white"
                  >
                    <div className="transform w-[20px] -rotate-[90deg] font-semibold">
                      <p>Total Hours</p>
                    </div>
                  </th>
                )}
              </React.Fragment>
            )
          })}

        </tr>
        </thead>
          <tbody>
            {list.map((workItem, workIndex) => (
              <React.Fragment key={workIndex}>
                {extractedmember.map((member, memberIndex) => (
                  <tr key={`${workIndex}-${memberIndex}`} className="bg-primary text-[.6rem] py-2 h-[30px] border-[1px] w-[50px] border-zinc-600">
                    {alldates?.map((date, dateIndex) => {
                        const dateData = member.dates.find(d => d.date === date)
                        const hours = dateData ? dateData.totalhoursofjobcomponents : '-'
                        const isEventDay = dateData ? dateData.eventDay : false
                        const isWd = dateData ? dateData.wellnessDay : false
                        const isLeave = dateData ? dateData.leave : false
                        const getdate = new Date(date)


                        const isFriday = getdate.getDay() === 5


                        const startIndex = Math.floor(dateIndex / 5) * 5
                        const endIndex = startIndex + 5
                        const totalHours = member.dates
                          .filter(d => dates.slice(startIndex, endIndex).includes(d.date))
                          .reduce((acc, d) => acc + d.totalhoursofjobcomponents, 0)

                        return (
                          <React.Fragment key={dateIndex}>
                            <td className={`relative text-center overflow-hidden bg-white border-[1px] ${isEventDay ? 'bg-red-200' : isWd ? 'bg-blue-200' : isLeave ? 'bg-yellow-200' : ''}`}>
                              <div className="flex absolute top-0 w-full h-[40px] text-center">
                                {statusData(hours, isWd, isEventDay, isLeave, date, member.leaveDates, member.eventDates, member.wellnessDates).map((item, index) => (
                                  <div key={index} className={`w-full h-full ${item}`}></div>
                                ))}
                              </div>
                              <p className="relative text-black font-bold text-xs z-30">-</p>
                            </td>

                            {isFriday && (
                              <th key={`total-${dateIndex}`} className="font-normal w-[40px] bg-primary border-[1px] border-zinc-700">
                                <p className="text-white">-</p>
                              </th>
                            )}
                          </React.Fragment>
                        )
                      })}
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
})

export default Individualrequest;
