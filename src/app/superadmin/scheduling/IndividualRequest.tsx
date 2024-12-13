"use client"
import React, { useEffect, useMemo, useState } from 'react'
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { useRouter, useSearchParams } from 'next/navigation'
import { RefreshCcw } from 'lucide-react'
import { string } from 'zod'

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

export default function Individualrequest() {
  const [memberIndex, setMemberIndex] = useState(0)
  const [list, setList] = useState<List[]>([])
  const [dates, setDates] = useState<string[]>([])
  const [filter, setFilter] = useState('')
  const router = useRouter()
  const params = useSearchParams()
  const getTeamid = params.get('teamid')


  useEffect(() => {
    const getList = async () => {
      if (getTeamid !== '' || undefined || null){
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/jobcomponent/getjobcomponentindividualrequest?teamid=${getTeamid}`,{
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

  const statusData = ( hours: any, wd: boolean, event: boolean, leave: boolean, leaveDate: string, leaveArray: Array<{ leavestart: string; leaveend: string }>, eventArray: Array<{ eventstart: string; eventend: string }>, wellness: Array<{wellnessdates: string}>) => {
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
    })

    if(isEventInRange){
      data.push('bg-gray-400')

    }

    if(isWellnessDay) {
      data.push('bg-fuchsia-400')
    }

    if(isLeaveInRange){
      data.push('bg-violet-300')
    }

    return data
  }



  return (
    <div className=' w-full h-full flex flex-col justify-center bg-secondary text-zinc-100'>


      <div className=' h-full w-full flex flex-col gap-2 max-w-[1920px]'>
     
      {list.length !== 0 ? (
        <div className=' h-full overflow-y-auto flex items-start justify-center bg-secondary w-full max-w-[1920px]'>
          <table className="table-auto w-[700px] border-collapse ">
            <thead className=' bg-secondary h-[100px]'>

              <tr className=' text-[0.6rem] text-zinc-100 font-normal'>
                <th className=' w-[20px] font-normal'>Name</th>
                <th className=' w-[50px] font-normal'>Initial</th>
                <th className=' font-normal w-[50px]'>Resource</th>

              </tr>
            </thead>
            <tbody>
            {list.map((graphItem, graphIndex) =>
              graphItem.members.map((member, memberIndex) => (
                <tr key={`${graphIndex}-${memberIndex}`} className="bg-primary text-[.6rem] py-2 h-[40px] border-[1px] border-zinc-600">


                  <td onClick={() => router.push(`/pm/individualworkload?employeeid=${member.id}`)} className="text-center cursor-pointer underline text-blue-400">{member.name}</td>
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
                      <th key={index} className=' relative font-normal w-[30px] border-[1px] border-zinc-700 px-6'>
                        <p className=' w-[50px] -translate-x-6 absolute rotate-90 top-10'>{dateObj}</p>
                      </th>
                      {(index + 1) % 5 === 0 && (
                        <th key={`total-${index}`} className='font-normal w-[30px] border-[1px] border-zinc-700'>
                          <p className='rotate-90 w-[50px]'>-</p>
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
                      className="bg-primary text-[.6rem] py-2 h-[40px] border-[1px] w-[50px] border-zinc-600"
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
                              <p className="relative text-black font-bold text-xs z-30">-</p>
                              {/* <p className="relative text-black font-bold text-xs z-30">{!isEventDay && hours}</p> */}
                            </td>

                            {/* Render total for every 5-day block */}
                            {(dateIndex + 1) % 5 === 0 && (
                              <th
                                key={`total-${dateIndex}`}
                                className="font-normal w-[40px] bg-primary border-[1px] border-zinc-700"
                              >
                                {/* <p className="text-white">{totalHours || '-'}</p> */}
                                <p className="text-white">-</p>
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
