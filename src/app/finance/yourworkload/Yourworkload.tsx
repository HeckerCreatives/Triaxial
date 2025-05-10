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
import { formatDate, getInitials, truncateText } from '@/utils/functions'
import Leaveform from '@/components/forms/Leaveform'
import WDform from '@/components/forms/Wellnessday'
import Wfhform from '@/components/forms/Wfhform'
import { Eye, RefreshCcw } from 'lucide-react'
import { clientColor } from '@/utils/helpers'
import DatePicker from 'react-datepicker'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"



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


type Dates = {
  date: string
  hours: number, 
  status:[], 
  _id: string
}

type Request = {
  enddate: string
startdate: string
}

type Leavedates = {
  leaveend: string
leavestart: string
}


type Members = {
    dates: Dates[]
employee: {_id: string,fullname: string, initials: string}
eventDates: Request[]
leaveDates: Leavedates[]
notes: string
role: string
wellnessDates: string[]
wfhDates: [{
  requeststart: string,
  requestend: string
}]
_id: string
 }

type Workload = {
    _id: string
    jobmanager: {employeeid: string, fullname: string, initials: string}
    componentid:  string
    clientname: string
    clientid: string
    clientpriority: string
    teamname:  string
    teamid: string
    projectname:  string
    jobcomponent: string
    teammembers: string[]
    members: Members[]
    jobno: string
}


type List = {
  name: string
  members: Workloads[]
}

type Workloads = {
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


type Wellness = { requestdate: string };
type WFH = { requestdate: string };
type eventRequest = {
                                    startdate: string
                                    enddate: string
                                }

export default function Yourworkload() {
  const [dateFilter, setDateFilter] = useState<Date | null>(null)
  const [list, setList] = useState<Workload[]>([])
  const [listRequest, setListrequest] = useState<List[]>([])
  
  const [dates, setDates] = useState<string[]>([])
  const router = useRouter()
  const [id, setId] = useState('')
  const [userid, setUserid] = useState('')
  const [memberslist, setMemberslist] = useState<Members[]>([])

  const filterDate = dateFilter === null ?  '' : (dateFilter?.toLocaleString())?.split(',')[0]

  useEffect(() => {
    const getWorkload = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/jobcomponent/yourworkload?filterDate=${filterDate}`,{
          withCredentials: true
        })

        setList(response.data.data.yourworkload)
        setMemberslist(response.data.data.members)
        setDates(response.data.data.alldates)
        setId(response.data.data.yourworkload[0].teamid)
        setId(response.data.data.yourworkload[0].members[0].employee.employeeid[0])
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

  const statusColor = (data: string[], date: string, hours: number, eventStart: string, eventEnd: string, eventDates: Event[], leaveDates: Leave[], wellnessDates: string[],wfhDates: { requeststart: string; requestend: string }[] = []) => {
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
    );

    const isWFH = wfhDates.some(
      (wellnessDate) => formatDate(wellnessDate.requeststart) === date
    );


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

    if(isWFH){
      colorData.push('bg-lime-300')
    }


    return colorData; 
  }

  const statusRequest = (data: string[], date: string, hours: number, eventStart: string, eventEnd: string, eventDates: Event[], leaveDates: Leave[], wellnessDates: string[],wfhDates: { requeststart: string; requestend: string }[] = []) => {
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
    );

    const isWFH = wfhDates.some(
      (wellnessDate) => formatDate(wellnessDate.requeststart) === date
    );


    // if(data.includes('1')){
    //   colorData.push('bg-red-500')
    // }
    // if(data.includes('2')){
    //   colorData.push('bg-amber-500')
    // }
    // if(data.includes('3')){
    //   colorData.push('bg-yellow-300')
    // }
    // if(data.includes('4')){
    //   colorData.push('bg-green-500')
    // }
    // if(data.includes('5')){
    //   colorData.push('bg-blue-500')
    // }
    // if(data.includes('6')){
    //   colorData.push('bg-cyan-400')
    // }
    // if(hours > 9){
    //   colorData.push('bg-pink-500')
    // }
    if(isWithinAnyEventDate){
      colorData.push('bg-gray-400')
    }
    if(isWithinAnyLeaveDate){
      colorData.push('bg-violet-300')
    }
    if(isWellnessDate){
      colorData.push('bg-fuchsia-400')
    }

    if(isWFH){
      colorData.push('bg-lime-300')
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


    //individual reaquest
    useEffect(() => {
      const getList = async () => {
        if (id !== '') {
          try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/jobcomponent/getjobcomponentindividualrequest?teamid=${id}`, {
              withCredentials: true
            })
            setListrequest(response.data.data.teams)
          } catch (error) {
            console.error('Error fetching data', error)
          }
        }
      }
      getList()
    }, [ id])


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

      console.log(dates,memberslist)

  



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

      <div className=' text-[.6rem] flex items-center gap-2 '>
        <p>Filter by dates</p>
        {/* <input value={dateFilter} onChange={(e) => setDateFilter(e.target.value)}  min="1900-01-01" max="2099-12-31" type="date" className=' text-white bg-secondary p-2 rounded-md' /> */}
        <DatePicker
           selected={dateFilter}
          onChange={(date) => setDateFilter(date)}
          dateFormat="dd/MM/yyyy"
          placeholderText="DD/MM/YYYY"
          className="bg-secondary text-[.6rem] p-2 w-fit z-[9999] relative"
          onKeyDown={(e) => e.preventDefault()}
          />

          <button onClick={() => setDateFilter(null)} className=' p-2 bg-red-600 text-white rounded-sm'><RefreshCcw size={12}/></button>


      </div>

    </div>

    <div className=' h-full w-full flex flex-col '>
      <div className=' h-full overflow-y-auto flex items-start justify-center bg-secondary w-full '>
        {memberslist.length !== 0 ? (
          <>
          <table className="table-auto border-collapse ">
          <thead className=' bg-secondary h-[95px]'>

            <tr className=' text-[0.5rem] text-zinc-100 font-normal border-collapse'>
              <th className=' text-left font-normal min-w-[50px] whitespace-normal break-all border-[1px] border-zinc-600 px-2'>Team</th>
              <th className=' text-left font-normal min-w-[50px] whitespace-normal break-all border-[1px] border-zinc-600 px-2'>Job No.</th>
              <th className=' text-left font-normal min-w-[50px] whitespace-normal break-all border-[1px] border-zinc-600 px-2'>Client</th>
              <th className=' text-left font-normal min-w-[80px] whitespace-normal break-all border-[1px] border-zinc-600 px-2'>Project Name</th>
              <th className=' text-left font-normal min-w-[60px] whitespace-normal break-all border-[1px] border-zinc-600 px-2'>Job Mgr.</th>
              <th className=' text-left font-normal min-w-[95px] whitespace-normal border-[1px] border-zinc-600 px-2'>Job Component</th>
              <th className=' text-left font-normal min-w-[70px] whitespace-normal break-all border-[1px] border-zinc-600 px-2'>Notes</th>

              <th className=' text-left font-normal min-w-[60px] whitespace-normal break-all border-[1px] border-zinc-600 px-2'>Role</th>
              <th className=' text-left min-w-[100px] whitespace-normal break-all border-[1px] border-zinc-600 font-normal px-2'>Other Members</th>
            </tr>
          </thead>
          {/* request */}
          <tbody>
                    {memberslist.slice(0,1).map((item, graphIndex) =>
                        <tr key={`${graphIndex}`} className="bg-primary text-[.5rem] py-2 h-[30px] border-[1px] border-zinc-600">
                          <td className=' border-[1px] border-zinc-600'>TX10010.00-</td>
                          <td className=' border-[1px] border-zinc-600'></td>
                          <td className=' border-[1px] border-zinc-600'>Triaxial Consulting</td>
                          <td className=' border-[1px] border-zinc-600'>On-Leave</td>
                          <td className=' border-[1px] border-zinc-600'></td>
                          <td className=' border-[1px] border-zinc-600'>AL, SL & Other Leaves</td>
                          <td className=' border-[1px] border-zinc-600'></td>
                          <td className=' border-[1px] border-zinc-600'></td>
                          <td className=" border-[1px] border-zinc-600 px-2 text-start">{item.employee.initials}</td>
                          <td className=' border-[1px] border-zinc-600'></td>

                        </tr>
                    )}
          </tbody>

          <tbody>
          {list.map((graphItem, graphIndex) =>
            graphItem.members.map((member, memberIndex) => (
              <tr key={`${graphIndex}-${memberIndex}`} className={` text-black text-[.5rem] py-2 h-[40px] border-[1px] border-zinc-600 ${clientColor(graphItem.clientpriority)}`}>
                 
                  {/* <td className="text-left  whitespace-normal break-all border-[1px] border-zinc-600 px-2">{graphItem.teamname}</td> */}
                  <td className="text-left  whitespace-normal break-all border-[1px] border-zinc-600 px-2">
                  
                  <TooltipProvider delayDuration={.1}>
                    <Tooltip>
                      <TooltipTrigger>{memberIndex === 0 && truncateText(graphItem.teamname, 5)}</TooltipTrigger>
                      <TooltipContent>
                        <p className=' text-[.6rem]'>{memberIndex === 0 && graphItem.teamname}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  </td>
                  <td className="text-left  whitespace-normal break-all border-[1px] border-zinc-600 px-2">
                  
                  <TooltipProvider delayDuration={.1}>
                    <Tooltip>
                      <TooltipTrigger>{memberIndex === 0 && truncateText(graphItem.jobno, 5)}</TooltipTrigger>
                      <TooltipContent>
                        <p className=' text-[.6rem]'>{memberIndex === 0 && graphItem.jobno}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  </td>
                  <td className="text-left  whitespace-normal break-all border-[1px] border-zinc-600 px-2">

                  <TooltipProvider delayDuration={.1}>
                    <Tooltip>
                      <TooltipTrigger>{memberIndex === 0 && truncateText(graphItem.clientname, 5)}</TooltipTrigger>
                      <TooltipContent>
                        <p className=' text-[.6rem]'>{memberIndex === 0 && graphItem.clientname}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  </td>
                  <td className="text-left  whitespace-normal break-all border-[1px] border-zinc-600 px-2">
                  <TooltipProvider delayDuration={.1}>
                    <Tooltip>
                      <TooltipTrigger>{memberIndex === 0 && truncateText(graphItem.projectname, 8)}</TooltipTrigger>
                      <TooltipContent>
                        <p className=' text-[.6rem]'>{memberIndex === 0 && graphItem.projectname}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  </td>
                  <td className="text-left whitespace-normal break-all border-[1px] border-zinc-600 px-2">{graphItem.jobmanager.initials}</td>
                  <td className="text-left whitespace-normal break-all border-[1px] border-zinc-600 px-2">

                  <TooltipProvider delayDuration={.1}>
                    <Tooltip>
                      <TooltipTrigger>{memberIndex === 0 && truncateText(graphItem.jobcomponent, 6)}</TooltipTrigger>
                      <TooltipContent>
                        <p className=' text-[.6rem]'>{memberIndex === 0 && graphItem.jobcomponent}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  </td>
      
                <td className="text-left whitespace-normal break-all border-[1px] border-zinc-600 px-2">
                  <Dialog>
                    <DialogTrigger className=' p-1 rounded-sm flex items-center text-[.5rem]'>
                    {member.notes === '' ? (
                        <p className=' h-full w-full text-center'>No notes.</p>
                      ):(
                      <p className=' '>{truncateText(member.notes, 10)}</p>
                      )}
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
                <td className="text-left text-[.5rem whitespace-normal break-all border-[1px] border-zinc-600 px-2">{member.role}</td>


                  <td className="text-left whitespace-normal break-all border-[1px] border-zinc-600 px-2">{graphItem.teammembers.join(", ")}</td>

              

              </tr>
            ))
          )}
          </tbody>
          </table>

          <div className=' overflow-x-auto'>
            <table className="table-auto border-collapse ">
              <thead className="w-full bg-white h-[70px]">
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
                                    bgColor = "bg-white";
                                  }
                                }
              
                                return (
                                  <React.Fragment key={index}>
                                    <th
                                      className={`relative font-normal border-[1px] border-zinc-700 ${bgColor}`}
                                    >
                                      <div className="whitespace-nowrap transform -rotate-[90deg] w-[20px]">
                                        <p className="mt-5 font-bold">{formatAustralianDate(dateObj)}</p>
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

              <thead className="w-full h-[25px]">
                <tr className="text-[0.6rem] text-black font-normal">
                  {dates.map((dateObj, index) => {
                    const formattedDate = formatDate(dateObj);

                    // Calculate total hours for this date
                    const totalHoursForDate = list.reduce((total, graphItem) => {
                      return total + graphItem.members.reduce((memberTotal, member) => {
                        const memberDate = member.dates?.find((date) => formatDate(date.date) === formattedDate);
                        return memberTotal + (memberDate?.hours || 0);
                      }, 0);
                    }, 0);

                    // Compute the total hours for every 5 dates
                    const totalHoursForWeek = dates
                      .slice(index - (index % 5), index + 1) // Get the previous 5 dates or less
                      .reduce((total, currentDate) => {
                        const formattedCurrentDate = formatDate(currentDate);
                        return total + list.reduce((graphTotal, graphItem) => {
                          return graphTotal + graphItem.members.reduce((memberTotal, member) => {
                            const memberDate = member.dates?.find((date) => formatDate(date.date) === formattedCurrentDate);
                            return memberTotal + (memberDate?.hours || 0);
                          }, 0);
                        }, 0);
                      }, 0);

                    return (
                      <React.Fragment key={index}>
                        <th className="relative font-normal border-[1px] border-zinc-700 bg-sky-200">
                          <p className="text-[.5rem] break-all">{totalHoursForDate.toLocaleString()}</p>
                        </th>

                        {/* Show total hours for every 5th date */}
                        {(index + 1) % 5 === 0 && (
                          <th className="font-normal w-[20px] border-[1px] border-zinc-700 bg-sky-200">
                            {/* <p className="text-xs font-bold text-white">{totalHoursForWeek}</p> */}
                          </th>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tr>
              </thead>

                {/* request */}
                <tbody>
                                                    {memberslist?.slice(0, 1).map((member, memberIndex) => (
                                                        <tr
                                                          key={`0-${memberIndex}`}
                                                          className="bg-primary text-[.6rem] py-2 h-[30px] border-[1px] border-zinc-600"
                                                        >
                                                          {dates.map((dateObj, index) => {
                                                            const memberDate = member.dates?.find(
                                                              (date) => formatDate(date.date) === formatDate(dateObj)
                                                            );
                            
                                                            const totalHoursForWeek = dates
                                                              .slice(index - (index % 5), index + 1)
                                                              .reduce((total, currentDate) => {
                                                                const memberDateForCurrent = member.dates?.find(
                                                                  (date) => formatDate(date.date) === formatDate(currentDate)
                                                                );
                                                                return total + (memberDateForCurrent?.hours || 0);
                                                              }, 0);
                            
                                                            return (
                                                              <React.Fragment key={index}>
                                                                <td className="relative text-center overflow-hidden bg-white border-[1px]">
                                                                  <div className="w-full h-[30px] absolute flex top-0">
                                                                    {statusRequest(
                                                                      memberDate?.status || [],
                                                                      dateObj,
                                                                      memberDate?.hours || 0,
                                                                      member.eventDates?.[0]?.startdate || '',
                                                                      member.eventDates?.[0]?.enddate || '',
                                                                      member.eventDates || [],
                                                                      member.leaveDates || [],
                                                                      member.wellnessDates || [],
                                                                      member.wfhDates || []
                                                                    ).map((item, idx) => (
                                                                      <div key={idx} className={`w-full h-[30px] ${item}`} />
                                                                    ))}
                                                                  </div>
                            
                                                                  <p className="relative text-black font-bold text-[.5rem] z-30">
                                                                    {/* {memberDate ? memberDate.hours : '-'} */}
                                                                  </p>
                                                                </td>
                            
                                                                {(index + 1) % 5 === 0 && (
                                                                  <th className="font-normal text-[.5rem] px-1 border-[1px] border-zinc-700">
                                                                    {/* {totalHoursForWeek.toLocaleString()} */}
                                                                  </th>
                                                                )}
                                                              </React.Fragment>
                                                            );
                                                          })}
                                                        </tr>
                                                      ))}
                            
                                                     
              </tbody>

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
                                  member.wellnessDates,
                                  member.wfhDates
                                ).map((item, idx) => (
                                  <div key={idx} className={`w-full h-[40px] ${item}`} />
                                ))}
                              </div>

                              <p className="relative text-black font-bold text-[.5rem] z-30">
                                {memberDate ? memberDate.hours : '-'}
                              </p>
                            </td>

                            {/* Show total hours for every 5th date */}
                            {(index + 1) % 5 === 0 && (
                              <th className="font-normal text-[.5rem] px-1 border-[1px] border-zinc-700">
                                <p className="">{totalHoursForWeek.toLocaleString()}</p>
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
