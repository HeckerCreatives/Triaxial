"use client"
import React, { useMemo, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Leaveform from '@/components/forms/Leaveform'
import WDform from '@/components/forms/Wellnessday'
import Wfhform from '@/components/forms/Wfhform'
import Createprojectcomponent from '@/components/forms/Createprojectcomponent'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Legends from '@/components/common/Legends'


const datas = [
  [{ value: "Vanilla" }, { value: "Chocolate" }],
  [{ value: "Strawberry" }, { value: "Cookies" }],
];

const data = {
  graph: [
      {
          teamname: "team test",
          projectname: "project test",
          clientname: "client test",
          jobno: 1,
          jobmanager: {
              employeeid: "id here",
              fullname: "Darel Honrejas"
          },
          jobcomponent: {
              componentid: "id here",
              componentname: "testing component"
          },
          notes: "notes here",
          members: [
              {
                  role: "Engineer (Engr.)",
                  employee: {
                      employeeid: "id here",
                      fullname: "Bien Daniel"
                  },
                  dates: [
                      {
                          date: "05/11/2024",
                          status: 0 ,
                          hours: 9,
                          isOnLeave: false,
                          isOnWellnessday: false,
                          isOnEvent: false
                      },
                      {
                          date: "05/12/2024",
                          status: 0 ,
                          hours: 9,
                          isOnLeave: false,
                          isOnWellnessday: false,
                          isOnEvent: false
                      },
                      {
                          date: "05/13/2024",
                          status: 0 ,
                          hours: 9,
                          isOnLeave: false,
                          isOnWellnessday: false,
                          isOnEvent: false
                      },
                      {
                          date: "05/14/2024",
                          status: 0 ,
                          hours: 9,
                          isOnLeave: false,
                          isOnWellnessday: false,
                          isOnEvent: false
                      },
                      {
                          date: "05/15/2024",
                          status: 0,
                          hours: 9,
                          isOnLeave: false,
                          isOnWellnessday: false,
                          isOnEvent: false
                      }
                  ]
              },
              {
                  role: "Engineer Reviewer (Engr. Revr.)",
                  employee: {
                      employeeid: "id here",
                      fullname: "Bien Daniel"
                  }
              },
              {
                  role: "Drafter (Drft.)",
                  employee: {
                      employeeid: "id here",
                      fullname: "Joshua De Guzman"
                  }
              },
              {
                  role: "Drafter Reviewer (Drft. Revr.)",
                  employee: {
                      employeeid: "id here",
                      fullname: "Jomarie Luistro"
                  }
              },
          ]
      }
  ]
}

interface DateItem {
  date: string;
  status: number;
  hours: number;
  isOnLeave: boolean;
  isOnWellnessday: boolean;
  isOnEvent: boolean;
}

interface Member {
  role: string;
  employee: {
    employeeid: string;
    fullname: string;
  };
  dates?: DateItem[];
}

interface GraphItem {
  teamname: string;
  projectname: string;
  clientname: string;
  jobno: number;
  jobmanager: {
    employeeid: string;
    fullname: string;
  };
  jobcomponent: {
    componentid: string;
    componentname: string;
  };
  notes: string;
  members: Member[];
}

interface Data {
  graph: GraphItem[];
}

const initialData: Data = {
  graph: [
    {
      teamname: 'team test',
      projectname: 'project test',
      clientname: 'client test',
      jobno: 1,
      jobmanager: {
        employeeid: 'id here',
        fullname: 'Darel Honrejas'
      },
      jobcomponent: {
        componentid: 'id here',
        componentname: 'testing component'
      },
      notes: 'notes here',
      members: [
        {
          role: 'Engineer (Engr.)',
          employee: {
            employeeid: 'id here',
            fullname: 'Bien Daniel'
          },
          dates: [
            { date: '05/11/2024', status: 0, hours: 9, isOnLeave: true, isOnWellnessday: false, isOnEvent: true },
            { date: '05/12/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/13/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/14/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/15/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/16/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: false, isOnEvent: true },
            { date: '05/17/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/18/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/19/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/20/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false }
          ]
        },
        {
          role: "Engineer Reviewer (Engr. Revr.)",
          employee: {
              employeeid: "id here",
              fullname: "Bien Daniel"
          },
          dates: [
            { date: '05/11/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/12/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/13/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/14/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/15/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/16/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/17/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/18/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/19/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/20/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: true, isOnEvent: false }
          ]
      },
      {
          role: "Drafter (Drft.)",
          employee: {
              employeeid: "id here",
              fullname: "Joshua De Guzman"
          },
          dates: [
            { date: '05/11/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/12/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/13/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/14/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/15/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/16/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/17/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/18/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/19/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/20/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: true, isOnEvent: false }
          ]
      },
      {
          role: "Drafter Reviewer (Drft. Revr.)",
          employee: {
              employeeid: "id here",
              fullname: "Jomarie Luistro"
          },
          dates: [
            { date: '05/11/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/12/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/13/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/14/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/15/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/16/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/17/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/18/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/19/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/20/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: true, isOnEvent: false }
          ]
      },
       
      ]
    },
    {
      teamname: 'team 2',
      projectname: 'project test',
      clientname: 'client test',
      jobno: 1,
      jobmanager: {
        employeeid: 'id here',
        fullname: 'Team 2'
      },
      jobcomponent: {
        componentid: 'id here',
        componentname: 'testing component'
      },
      notes: 'notes here',
      members: [
        {
          role: 'Engineer (Engr.)',
          employee: {
            employeeid: 'id here',
            fullname: 'Bien Daniel'
          },
          dates: [
            { date: '05/11/2024', status: 0, hours: 9, isOnLeave: true, isOnWellnessday: false, isOnEvent: true },
            { date: '05/12/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/13/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/14/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/15/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/16/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/17/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/18/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/19/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/20/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: true, isOnEvent: false }
          ]
        },
        {
          role: "Engineer Reviewer (Engr. Revr.)",
          employee: {
              employeeid: "id here",
              fullname: "Bien Daniel"
          },
          dates: [
            { date: '05/11/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/12/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/13/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/14/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/15/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/16/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/17/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/18/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/19/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/20/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: true, isOnEvent: false }
          ]
      },
      {
          role: "Drafter (Drft.)",
          employee: {
              employeeid: "id here",
              fullname: "Joshua De Guzman"
          },
          dates: [
            { date: '05/11/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/12/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/13/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/14/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/15/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/16/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/17/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/18/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/19/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/20/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: true, isOnEvent: false }
          ]
      },
      {
          role: "Drafter Reviewer (Drft. Revr.)",
          employee: {
              employeeid: "id here",
              fullname: "Jomarie Luistro"
          },
          dates: [
            { date: '05/11/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/12/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/13/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/14/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/15/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/16/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/17/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/18/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/19/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/20/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: true, isOnEvent: false }
          ]
      },
       
      ]
    }
  ]
};


export default function Yourworkload() {
  const [tab2, setTab2] = useState('Leave')
  const [dialog, setDialog] = useState(false)
  const [index, setIndex] = useState(0)
  const [memberIndex, setMemberIndex] = useState(0)
  const [teamIndex, setTeamIndex] = useState(0)
  const [wdStatus, setWdstatus] = useState(false)
  const [leaveStatus, setLeavestatus] = useState(false)
  const [date, setDate] = useState('')
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [hours, setHours] = useState(0)
  const [status, setStatus] = useState('')
  const [employeeid, setEmployeeid] = useState('')
  const [loading, setLoading] = useState(false)


  const [data, setData] = useState(initialData);

  // Function to update status of a specific date
  const updateStatus = (memberIndex: number, dateIndex: number, newStatus: number,updatedHours: number, graphIndex: number) => {
    console.log(newStatus)
    setData(prevData => {
      const newData = { ...prevData };
      const selectedMember = newData.graph[teamIndex].members[memberIndex];
      if (selectedMember.dates && selectedMember.dates[dateIndex]) {
        selectedMember.dates[dateIndex].status = newStatus;
        selectedMember.dates[dateIndex].hours = updatedHours;
      }
      return newData;
    });
  };

// Memoized data to prevent unnecessary re-renders
  const memorizedData = useMemo(() => data, [data]);

  const getStatus = (data: number, leave: boolean, wd: boolean, event: boolean) => {

    const colorData = []
    if(leave === true){
      colorData.push('bg-pink-500')
    }
     if(wd === true){
      colorData.push('bg-violet-300')
    }
    if(event === true){
      colorData.push('bg-fuchsia-400')
    }
    if(data === 0){
     colorData.push('bg-red-500')
    }
    if(data === 1){
      colorData.push('bg-red-500')
    }
    if(data === 2){
      colorData.push('bg-amber-500')
    }
    if(data === 3){
      colorData.push('bg-yellow-500')
    }
    if(data === 4){
      colorData.push('bg-green-500')
    }
    if(data === 5){
      colorData.push('bg-blue-500')
    }
    if(data === 6){
      colorData.push('bg-cyan-300')
    }


    return colorData

   
  }

  //update workload
  const updateWorkload = async () => {
    
  }


  return (
   <div className=' w-full h-full flex flex-col justify-center bg-secondary p-4 text-zinc-100'>

      <div className=' w-full flex items-center justify-between h-auto bg-primary mb-2 p-4 text-xs'>
        <div className=' flex flex-col gap-1'>
          <p className=' text-zinc-400'>Name: <span className=' text-zinc-100 underline'>Name</span></p>
          <p className=' text-zinc-400'>Initial: <span className=' text-zinc-100 underline'>ABC</span></p>
          <p className=' text-zinc-400'>Email: <span className=' text-zinc-100 underline'>test@gmail.com</span></p>
        </div>

        {/* <div className=' flex flex-col gap-1 bg-primary rounded-sm text-xs'>

          <p className=' text-xs'>Request :</p>
          <div className='flex items-center gap-2 bg-primary rounded-sm text-xs'>
              <Leaveform onClick={() => undefined}>
                <button onClick={() =>  setTab2('Leave')} className={`text-xs px-3 py-1 bg-red-600  rounded-sm`}>Leave</button>
              </Leaveform>
              <WDform onClick={() => undefined}>
                <button onClick={() =>  setTab2('WD')} className={`text-xs px-3 py-1 bg-red-600  rounded-sm`}>Wellness Day</button>
              </WDform>

              <Wfhform onClick={() => undefined}>
                <button onClick={() =>  setTab2('WFH')} className={`text-xs px-3 py-1 bg-red-600  rounded-sm`}>WFH</button>
              </Wfhform>

          </div>

          <p className=' text-xs mt-2'>Project Component:</p>
          <div className='flex items-center gap-2 bg-primary rounded-sm text-xs'>
            <Createprojectcomponent>
              <button className={`text-xs px-3 py-1 bg-red-600  rounded-sm`}>Create</button>

            </Createprojectcomponent>
          </div>
            
        </div> */}

        <Legends/>

        <div className=' flex flex-col'>
          {/* <div className=' w-[100px] h-full rounded-sm p-2 bg-red-200 text-xs'>
            <p className=' text-zinc-900 font-semibold'>Note</p>
            <p className=' text-zinc-600 text-[.6rem]'>Lorem, ipsum dolor sit amet consectetur.</p>
          </div> */}

          <div className=' flex items-center gap-2 text-xs mt-2'>
            <p>Show:</p>
            <DropdownMenu>
            <DropdownMenuTrigger className=' bg-red-700 px-4 py-1 rounded-sm text-zinc-100'>Select</DropdownMenuTrigger>
            <DropdownMenuContent className=' bg-secondary border-none text-zinc-100 text-xs'>
              <DropdownMenuItem>Previous Week</DropdownMenuItem>
              <DropdownMenuItem>Current Week</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          </div>
        </div>

       
      </div>

      <div className=' h-full w-full flex flex-col max-w-[1920px]'>
        <div className=' h-full overflow-y-auto flex items-start justify-center bg-secondary w-full max-w-[1920px]'>
          <table className="table-auto w-full border-collapse ">
            <thead className=' bg-secondary h-[100px]'>

              <tr className=' text-[0.6rem] text-zinc-100 font-normal'>
                <th className=' w-[80px] font-normal'>Team</th>
                <th className=' font-normal w-[80px]'>Job No.</th>
                <th className=' font-normal w-[80px]'>Client</th>
                <th className=' font-normal w-[80px]'>Project Name</th>
                <th className=' font-normal w-[80px]'>Job Mgr.</th>
                <th className=' font-normal w-[80px]'>Job Component</th>
                <th className=' w-[80px] font-normal'>Members</th>
                <th className=' font-normal w-[80px]'>Role</th>
                <th className=' font-normal w-[80px]'>Notes</th>
                {memorizedData.graph[0].members[0].dates?.map((dateObj, index) => (
                  <>
                    <th key={index} className='font-normal w-[20px] border-[1px] border-zinc-700'>
                      <p className=' rotate-90'>{dateObj.date}</p>
                    </th>
                    {/* Insert a "Total" column every 5 days */}
                    {(index + 1) % 5 === 0 && (
                      <th key={`total-${index}`} className='font-normal w-[40px] border-[1px] border-zinc-700'>
                        <p className='rotate-90'>Total Hours</p>
                      </th>
                    )}
                  </>
                ))}
                

                
              </tr>
            </thead>
            <tbody>
            {memorizedData.graph.map((graphItem, graphIndex) =>
              graphItem.members.map((member, memberIndex) => (
                <tr key={`${graphIndex}-${memberIndex}`} className="bg-primary text-[.6rem] py-2 h-[40px] border-[1px] border-zinc-600">
                    <td className="text-center text-red-600">{memberIndex === 0 && graphItem.teamname}</td>
                    <td className="text-center">{memberIndex === 0 && graphItem.jobno}</td>
                    <td className="text-center">{memberIndex === 0 && graphItem.clientname}</td>
                    <td className="text-center">{memberIndex === 0 && graphItem.projectname}</td>
                    <td className="text-center">{memberIndex === 0 && graphItem.jobmanager.fullname}</td>
                    <td className="text-center">{memberIndex === 0 && graphItem.jobcomponent.componentname}</td>
        
                
                  
                  <td className="text-center">{member.employee.fullname}</td>
                  <td className="text-center">{member.role}</td>
                  <td className="text-center">{graphItem.notes}</td>
                  {member.dates?.map((dateObj, dateIndex) => {
                      // Calculate sum every 5 days
                      const startIndex = Math.floor(dateIndex / 5) * 5;
                      const endIndex = startIndex + 5;

                      // Sum the hours for the current set of 5 days
                      const totalHours = member.dates?.slice(startIndex, endIndex).reduce((acc, date) => acc + date.hours, 0);

                      return (
                        <>
                          <td 
                            key={dateIndex} 
                            className="relative text-center overflow-hidden bg-primary"
                            onClick={() => {
                              setDialog(true);
                              setIndex(dateIndex);
                              setHours(dateObj.hours);
                              setMemberIndex(memberIndex);
                              setTeamIndex(graphIndex);
                              setWdstatus(dateObj.isOnWellnessday);
                              setDate(dateObj.date);
                              setName(member.employee.fullname);
                              setRole(member.role);
                              setEmployeeid(member.employee.employeeid)
                          
                            }}
                          >
                            <div className='flex absolute top-0 w-full h-[40px] text-center'>
                              {getStatus(dateObj.status, dateObj.isOnLeave, dateObj.isOnWellnessday, dateObj.isOnEvent).map((item, index) => (
                                <div className={`w-full ${item}`} key={index}></div>
                              ))}
                            </div>
                            <p className='relative text-black font-bold text-xs z-30'>{dateObj.isOnWellnessday !== true && dateObj.hours}</p>
                          </td>

                          {/* Insert Total every 5 days */}
                          {(dateIndex + 1) % 5 === 0 && (
                            <th key={`total-${dateIndex}`} className='font-normal w-[40px] border-[1px] border-zinc-700'>
                              <p className=''>{totalHours}</p> {/* Display the sum of hours for every 5 days */}
                            </th>
                          )}
                        </>
                      );
                    })}

                </tr>
              ))
            )}
          </tbody>
          </table>

          <Dialog open={dialog} onOpenChange={setDialog}>
                  <DialogContent className=' p-8 bg-secondary border-none text-white'>
                    <DialogHeader>
                      <DialogTitle>Update workload</DialogTitle>
                      <DialogDescription>
                        You can only update the hours rendered if the employee is not on wellness day.
                      </DialogDescription>
                    </DialogHeader>
                    <div className=' w-full flex flex-col gap-2'>

                      <div className=' text-xs flex flex-col gap-1 bg-primary p-4 rounded-sm'>
                        <p className=' text-sm font-bold'>{name} <span className=' text-xs text-red-500'>({role})</span></p>
                        <p>Employee is currently in at {date}: </p>
                        <p className=' text-zinc-400'>Leave:{leaveStatus === true ? 'Yes' : 'No'}</p>
                        <p className=' text-zinc-400'>Wellness day:{wdStatus === true ? 'Yes' : 'No'}</p>
                      </div>

                    <Select value={status} onValueChange={setStatus}>
                      <SelectTrigger className="w-[180px] text-xs bg-primary">
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Due on</SelectItem>
                        <SelectItem value="2">25 %</SelectItem>
                        <SelectItem value="3">50 %</SelectItem>
                        <SelectItem value="4">75 %</SelectItem>
                        <SelectItem value="5">100 %</SelectItem>
                        <SelectItem value="6">CNST PH.</SelectItem>
                      </SelectContent>
                    </Select>


                  </div>

                  { wdStatus !== true && (
                    <div className=' flex flex-col gap-2 text-xs'>
                      <label htmlFor="">Hours Rendered</label>
                      <input type="number" value={hours} onChange={(e) => setHours(e.target.valueAsNumber)} placeholder='Hours' id="" className=' bg-primary p-2 rounded-md text-xs' />
                      
                    </div>
                  )}

                      <div className=' w-full flex items-end justify-end mt-4'>
                        <button onClick={() => updateStatus(memberIndex, index, parseInt(status), hours, teamIndex )} className=' px-4 py-2 bg-red-600 text-xs text-white rounded-md'>Save</button>
                      </div>

                 
                 
                  </DialogContent>
          </Dialog>

          

        </div>
       
        
      </div>

    
        
    </div>
  )
}
