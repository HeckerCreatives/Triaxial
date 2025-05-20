"use client"
import React, { useEffect, useMemo, useState } from 'react'
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { useRouter, useSearchParams } from 'next/navigation'
import { RefreshCcw } from 'lucide-react'
import { string } from 'zod'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { formatAustralianDate, formatDate, formatMonthYear } from '@/utils/functions'
import DatePicker from 'react-datepicker'
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
  event: eventRequest []
  wellness: [
    {
      requestdate: string
    }
  ],
  wfh: [
    {
      requestdate: string
    }
  ]
  }

type Team = {
  teamid: string
teamname: string
}

type Leave = {
  leavestart: string
  leaveend: string
}

type Wellness = { requestdate: string };
type WFH = { requestdate: string };
type eventRequest = {
                                    startdate: string
                                    enddate: string
                                }

export default function Yourworkload() {
  const [memberIndex, setMemberIndex] = useState(0)
  const [list, setList] = useState<List[]>([])
  const [dates, setDates] = useState<string[]>([])
  const router = useRouter()
  const params = useSearchParams()
  const getTeamid = params.get('team')
  const [team, setTeam] = useState<Team[]>([])
  const [id, setId] = useState('')
    const [filter, setFilter] = useState<Date | null>(null)

  const filterDate = filter === null ?  '' : (filter?.toLocaleString())?.split(',')[0]


  useEffect(() => {
    const getList = async () => {
    
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/jobcomponent/getmasterleavelist?teamid&filterDate=${filterDate}`,{
            withCredentials: true
          })

          setDates(response.data.data.alldates)
          setList(response.data.data.teams)
        } catch (error) {

        }
      }

    getList()
  },[filter, id, filterDate])

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

  const statusColorRequest = (
    date: string, 
    eventDates: eventRequest[], 
    // events: { eventstart: string; eventend: string }[], 
    leaveDates: Leave[], 
    wellness: Wellness[], 
    wfh: WFH[] = []
  ): string[] => {
    const colorData: string[] = [];
  
    const isWithinAnyEventDate = eventDates.some((item) =>
      isDateInRange(date, item.startdate, item.enddate)
    );
  
    const isWithinAnyLeaveDate = leaveDates.some((item) =>
      isDateInRange(date, item.leavestart, item.leaveend)
    );

    // const isWellnessDate = wellness.some((item) =>
    //   isDateInRange(date, item.wellnessdates, item.leaveend)
    // );

    const isWFH = wfh.some((item) => formatDate(item.requestdate) === formatDate(date));
    const isWellnessDate = wellness.some((item) => formatDate(item.requestdate) === formatDate(date));

  
    if (isWithinAnyEventDate) {
      colorData.push("bg-gray-300");
    }
    if (isWithinAnyLeaveDate) {
      colorData.push("bg-violet-300");
    }
    if (isWFH) {
      colorData.push("bg-lime-300");
    }

    if(isWellnessDate){
      colorData.push('bg-fuchsia-300')
    }
  
    return colorData;
  };


  useEffect(() => {
    const getList = async () => {
   
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/teams/listteamselect`,{
            withCredentials: true
          })

        setTeam(response.data.data)
        setId(response.data.data[0].teamid)
        } catch (error) {

        }
      }
    getList()
  },[])



  return (
    <div className=' w-full h-full flex flex-col justify-center bg-secondary p-4 text-zinc-100'>


      <div className=' h-full w-full flex flex-col gap-2'>
      <div className=' w-full flex items-center gap-2 justify-between py-4'>

        <div className=' text-xs'>
          {/* <label htmlFor="">Filter by team:</label>
          <Select value={id} onValueChange={setId}>
            <SelectTrigger className="w-[180px] bg-primary mt-1" >
              <SelectValue placeholder="Select Team" />
            </SelectTrigger>
            <SelectContent>
              {team.map((item, index) => (
                <SelectItem value={item.teamid}>{item.teamname}</SelectItem>
              ))}
             
            </SelectContent>
          </Select> */}

          {/* <SortableTeamsDialog/> */}

        </div>

        <div className=' h-full flex items-end gap-2'>
          <p className=' text-[.8em]'>Legend:</p>

            <div className=' w-fit flex items-center gap-2'>
              <div className=' flex items-center gap-2'>
                <div className=' bg-violet-300'>
                  <p className=' text-[.7em] text-black font-semibold px-1'>Leave</p>
                </div>



              </div>

              <div className=' flex items-center gap-2'>
                <div className=' bg-lime-300'>
                  <p className=' text-[.7em] text-black font-semibold px-1'>WFH</p>
                </div>
              </div>

              <div className=' flex items-center gap-2'>
                <div className=' bg-fuchsia-400'>
                <p className=' text-[.7em] text-black font-semibold px-1'>Wellness Day</p>

                </div>


              </div>

              <div className=' flex items-center gap-2'>
                <div className=' bg-gray-400'>
                <p className=' text-[.7em] text-black font-semibold px-1'>Public Holidays</p>

                </div>


              </div>


            </div>

            <div className=' flex flex-col mr-8'>
            <label htmlFor="" className=' text-xs'>Filter by date:</label>
                          <div className=' flex relative z-50'>
                          <DatePicker
                            selected={filter}
                            onChange={(date) => setFilter(date)}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="DD/MM/YYYY"
                            className="bg-primary text-xs p-2 w-fit z-[9999] relative"
                            onKeyDown={(e) => e.preventDefault()}
                            
            
                          />
                          <button onClick={() => setFilter(null)} className=' p-2 bg-red-600 text-white rounded-sm'><RefreshCcw size={15}/></button>
                          
                        </div>
            </div>

                         

            

      </div>


      </div>
      {list.length !== 0 ? (
        <div className=' h-full overflow-y-auto flex items-start justify-center bg-secondary w-full'>
          <table className="table-auto w-[300px] border-collapse ">
            <thead className=' bg-secondary h-[100px]'>

              <tr className=' text-[0.6rem] text-zinc-100 font-normal border-collapse'>
                <th className=' min-w-[100px] font-normal border-[1px] border-zinc-600 whitespace-normal break-all'>Team</th>
                <th className=' min-w-[100px] font-normal border-[1px] border-zinc-600 whitespace-normal break-all'>Name</th>
                <th className=' min-w-[100px] font-normal border-[1px] border-zinc-600 whitespace-normal break-all'>Initial</th>
                <th className=' font-normal min-w-[100px] border-[1px] border-zinc-600 whitespace-normal break-all'>Resource</th>

              </tr>
            </thead>
            <tbody>
            {list.map((graphItem, graphIndex) =>
              graphItem.members.map((member, memberIndex) => (
                <tr key={`${graphIndex}-${memberIndex}`} className="bg-primary text-[.6rem] py-2 h-[30px] border-[1px] border-zinc-600 border-collapse">

                   {memberIndex === 0 ?
                        (<td  onClick={() => router.push(`/pm/graph/jobcomponent?teamid=${graphItem.teamid}&teamname=${graphItem.name}`)} className=" text-[.65rem]  whitespace-normal break-all border-[1px] border-zinc-600 px-2 text-left underline cursor-pointer">{graphItem.name}</td>) :  (<td className="text-center"></td>)
                      }

                  <td onClick={() => router.push(`/pm/individualworkload?employeeid=${member.id}&name=${member.name}&teamname=${graphItem.name}`)} className=" border-[1px] border-zinc-600 whitespace-normal break-all text-center cursor-pointer underline text-white-400">{member.name}</td>
                  <td className="text-center border-[1px] border-zinc-600 whitespace-normal break-all ">{member.initial}</td>
                  <td className="text-center border-[1px] border-zinc-600 whitespace-normal break-all ">{member.resource}</td>



                </tr>
              ))
            )}
          </tbody>
          </table>

          <div className=' overflow-x-auto w-full h-auto'>

            <table className="table-auto w-full border-collapse ">
              <thead className=' w-full bg-secondary h-[100px]'>
                <tr className=' text-[0.6rem] text-zinc-100 font-normal'>

                {dates
                    .filter(dateObj => {
                      const date = new Date(dateObj);
                      return date.getDay() !== 0 && date.getDay() !== 6; // Exclude Sundays (0) & Saturdays (6)
                    })
                    .map((dateObj, index) => {
                      const date = new Date(dateObj);
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);

                      const startOfWeek = new Date(today);
                      startOfWeek.setDate(today.getDate() - (today.getDay() - 1));

                      const endOfWeek = new Date(startOfWeek);
                      endOfWeek.setDate(startOfWeek.getDate() + 4);

                      const prevDay = new Date(today);
                      prevDay.setDate(today.getDate() - 1);

                      const nextDay = new Date(today);
                      nextDay.setDate(today.getDate() + 1);

                      let bgColor = "bg-white";
                      if (date >= startOfWeek && date <= endOfWeek) {
                        if (date.getTime() < today.getTime()) {
                          bgColor = "bg-gray-300"; // Past days
                        } else if (date.toDateString() === today.toDateString()) {
                          bgColor = "bg-pink-500"; // Today
                        } else if (date.getTime() >= nextDay.getTime()) {
                          bgColor = "bg-white"; // Future days
                        }
                      }

                      return (
                        <React.Fragment key={index}>
                          <th className={`relative font-normal w-[30px] border-[1px] border-zinc-700 ${bgColor}`}>
                            <div className="whitespace-nowrap w-[20px] transform -rotate-[90deg]">
                              <p className="mt-3 font-bold text-black">{formatAustralianDate(dateObj)}</p>
                            </div>
                          </th>

                          {(index + 1) % 5 === 0 && (
                            <th key={`total-${index}`} className="font-normal w-[30px] border-[1px] border-zinc-700">
                              <p className="-rotate-90 w-[30px] text-black">Total Hours</p>
                            </th>
                          )}
                        </React.Fragment>
                      );
                    })}




                </tr>
              </thead>
                <tbody>
                    {list.map((graphItem, graphIndex) =>
                                     graphItem.members.map((member, memberIndex) => {
                                       // Precompute weekly totals
                                       const totalHoursForWeek: number[] = [];
                                       let currentWeekTotal = 0;
                                       let weekCounter = 0;
                                     
                                       return (
                                         <tr
                                           key={`${graphIndex}-${memberIndex}`}
                                           className="bg-primary text-[.6rem] py-2 h-[30px] border-[1px] border-zinc-600"
                                         >
                                           {dates.map((dateObj, index) => {
                                             const date = new Date(dateObj);
                                             const isFriday = date.getDay() === 5;
                                             const weekIndex = Math.floor(index / 5); // Ensure correct indexing
                 
                                             const shouldInsertTotal = (index + 1) % 5 === 0;
                                             
                                             const memberDate = member.dates?.find(
                                               (date) => formatDate(date.date) === formatDate(dateObj)
                                             );
                 
                                             return (
                                               <React.Fragment key={index}>
                                                 <td
                                                   className="relative text-center overflow-hidden bg-white cursor-pointer border-[1px] border-zinc-400"
                                                 >
                                                   <div className="w-full h-[50px] absolute flex top-0">
                                                   {statusColorRequest( dateObj, member.event, member.leave, member.wellness, member.wfh).map((item, index) => (
                                                   <div key={index} className={`w-full h-full ${item}`}></div>
                                                     ))}
                                                   </div>
                                                   <p className="relative text-black font-bold text-[.45rem] z-30">
                                                       {
                                                     member.leave?.some(leave =>
                                                       isDateInRange(formatDate(dateObj), leave.leavestart, leave.leaveend)
                                                     )
                                                       ? Math.max(memberDate?.totalhoursofjobcomponents ?? 0, 0).toLocaleString() // ensures result is never negative
                                                       : '-'
                                                        }
                                                   </p>
                                                 </td>
                 
                                                 {shouldInsertTotal && (
                                                   <td className="text-center font-normal w-[40px] bg-primary border-[1px] border-zinc-700">
                                                     <p className="text-white">
                                                       {Number.isInteger(totalHoursForWeek[weekIndex])
                                                         ? totalHoursForWeek[weekIndex]
                                                         : totalHoursForWeek[weekIndex]?.toFixed(2)}
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
          ): (

            <div className=' w-full h-[300px] flex items-center justify-center'>
              <p className=' text-sm text-zinc-400'>No data.</p>
            </div>

        )}


    </div>





    </div>
  )
}
