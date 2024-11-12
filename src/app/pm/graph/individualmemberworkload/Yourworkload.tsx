'use client'
import React, { useMemo, useState } from 'react'
import Spreadsheet from 'react-spreadsheet';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

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
            { date: '05/11/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: false, isOnEvent: true },
            { date: '05/12/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/13/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/14/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/15/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
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
   
  ]
};

export default function Indiviualworkloads() {
  const [dialog, setDialog] = useState(false)
  const [index, setIndex] = useState(0)
  const [memberIndex, setMemberIndex] = useState(0)
  const [hours, setHours] = useState(0)


  const [data, setData] = useState(initialData);

  // Function to update status of a specific date
  const updateStatus = (memberIndex: number, dateIndex: number, newStatus: number,updatedHours: number) => {
    setData(prevData => {
      const newData = { ...prevData };
      const selectedMember = newData.graph[0].members[memberIndex];
      if (selectedMember.dates && selectedMember.dates[dateIndex]) {
        selectedMember.dates[dateIndex].status = newStatus;
        selectedMember.dates[dateIndex].hours = updatedHours;
      }
      return newData;
    });
  };

// Memoized data to prevent unnecessary re-renders
  const memorizedData = useMemo(() => data, [data]);

  const getStatus = (data: number, leave: boolean, wd: boolean, event: boolean, hours: number) => {

    const colorData = []
    if(leave === true){
      colorData.push('bg-violet-300')
    }
     if(wd === true){
      colorData.push('bg-fuchsia-400')
    }
    if(hours > 8){
      colorData.push('bg-pink-500')
    }
    // if(event === true){
    //   colorData.push('bg-fuchsia-400')
    // }
    // if(data === 0){
    //  colorData.push('bg-white')
    // }
    if(data === 1){
      colorData.push('bg-red-500')
    }
    if(data === 2){
      colorData.push('bg-amber-500')
    }
    if(data === 3){
      colorData.push('bg-yellow-300')
    }
    if(data === 4){
      colorData.push('bg-green-500')
    }
    if(data === 5){
      colorData.push('bg-blue-500')
    }
    if(data === 6){
      colorData.push('bg-cyan-400')
    }

    console.log(colorData)


    return colorData

   
  }


  // Function to calculate total hours for every 5 days
  const calculateTotalHours = (dates: DateItem[]) => {
    const totals: number[] = [];
    for (let i = 0; i < dates.length; i += 5) {
      const total = dates.slice(i, i + 5).reduce((sum, dateObj) => sum + dateObj.hours, 0);
      totals.push(total);
    }
    return totals;
  };


  
  
  return (
    <div className=' w-full h-full flex flex-col justify-center bg-secondary text-zinc-100 p-4 '>

      <div className=' w-full flex items-end gap-8 h-auto bg-primary mb-2 p-4 text-xs'>
        <div className=' w-auto flex flex-col gap-1'>
          <p className=' text-zinc-400'>Team Name: <span className=' text-zinc-100 underline'>{initialData.graph[0].teamname}</span></p>
          <p className=' text-zinc-400'>Project Manager: <span className=' text-zinc-100 underline'>{initialData.graph[0].jobmanager.fullname}</span></p>
          {/* <p className=' text-zinc-400'>Client Name: <span className=' text-zinc-100 underline'>test@gmail.com</span></p> */}

        </div>

        <div className=' h-full flex items-end gap-2'>
            <p className=' text-[.8em]'>Status Legend:</p>

              <div className=' w-fit flex items-center gap-2'>

                <div className=' flex items-center gap-2'>
                  <div className=' bg-red-500'>
                    <p className=' text-[.7em] text-black font-semibold px-1'>Due On</p>
                  </div>
                  


                </div>
                 <div className=' flex items-center gap-2'>
                  <div className=' bg-orange-400'>
                    <p className=' text-[.7em] text-black font-semibold px-1'>25%</p>
                  </div>
                  


                </div>

                 <div className=' flex items-center gap-2'>
                  <div className=' bg-yellow-300'>
                  <p className=' text-[.7em] text-black font-semibold px-1'>50%</p>

                  </div>


                </div>

                <div className=' flex items-center gap-2'>
                  <div className=' bg-green-500'>
                  <p className=' text-[.7em] text-black font-semibold px-1'>75%</p>

                  </div>


                </div>

                <div className=' flex items-center gap-2'>
                  <div className=' bg-blue-500'>
                  <p className=' text-[.7em] text-black font-semibold px-1'>100%</p>

                  </div>


                </div>

                <div className=' flex items-center gap-2'>
                  <div className=' bg-cyan-400'>
                  <p className=' text-[.7em] text-black font-semibold px-1'>CNST PH.</p>

                  </div>


                </div>
              </div>

             


        </div>

        <div className=' h-full flex items-end gap-2'>
            <p className=' text-[.8em]'>Total Hours Legend:</p>

              <div className=' w-fit flex items-center gap-2'>

                <div className=' flex items-center gap-2'>
                  <div className=' bg-pink-500'>
                    <p className=' text-[.7em] text-black font-semibold px-1'>Greater than 8 hours/ day or  40 hours / week</p>
                  </div>
                  


                </div>
                 <div className=' flex items-center gap-2'>
                  <div className=' bg-violet-300'>
                    <p className=' text-[.7em] text-black font-semibold px-1'>Leave</p>
                  </div>
                  


                </div>

                 <div className=' flex items-center gap-2'>
                  <div className=' bg-fuchsia-400'>
                  <p className=' text-[.7em] text-black font-semibold px-1'>Wellness Day</p>

                  </div>


                </div>


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
                  <td className="text-center">{graphItem.teamname}</td>
                  <td className="text-center">{graphItem.jobno}</td>
                  <td className="text-center">{graphItem.clientname}</td>
                  <td className="text-center">{graphItem.projectname}</td>
                  <td className="text-center">{graphItem.jobmanager.fullname}</td>
                  <td className="text-center">{graphItem.jobcomponent.componentname}</td>
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
                            className="relative text-center overflow-hidden bg-white"
                            onClick={() => {
                              setDialog(true);
                              setIndex(dateIndex);
                              setHours(dateObj.hours);
                              setMemberIndex(memberIndex);
                            }}
                          >
                            <div className='flex absolute top-0 w-full h-[40px] text-center'>
                              {getStatus(dateObj.status, dateObj.isOnLeave, dateObj.isOnWellnessday, dateObj.isOnEvent, dateObj.hours).map((item, index) => (
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
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                      </DialogDescription>
                    </DialogHeader>
                    <div className=' w-fit flex items-center gap-2'>

                    <div className=' flex items-center gap-2'>
                      <button onClick={() => updateStatus(memberIndex, index, 1, hours )} className=' bg-red-500'>
                        <p className=' text-[.7em] text-black font-semibold px-1'>Due On</p>
                      </button>
                    

                    </div>
                    <div className=' flex items-center gap-2'>
                      <button onClick={() => updateStatus(memberIndex, index, 2, hours )} className=' bg-orange-400'>
                        <p className=' text-[.7em] text-black font-semibold px-1'>25%</p>
                      </button>
                      


                    </div>

                    <div className=' flex items-center gap-2'>
                      <button onClick={() => updateStatus(memberIndex, index, 3, hours )} className=' bg-yellow-300'>
                      <p className=' text-[.7em] text-black font-semibold px-1'>50%</p>

                      </button>


                    </div>

                    <div className=' flex items-center gap-2'>
                      <button  onClick={() => updateStatus(memberIndex, index, 4, hours )} className=' bg-green-500'>
                      <p className=' text-[.7em] text-black font-semibold px-1'>75%</p>

                      </button >


                    </div>

                    <div className=' flex items-center gap-2'>
                      <button onClick={() => updateStatus(memberIndex, index, 5, hours )} className=' bg-blue-500'>
                      <p className=' text-[.7em] text-black font-semibold px-1'>100%</p>

                      </button>


                    </div>

                    <div className=' flex items-center gap-2'>
                      <button onClick={() => updateStatus(memberIndex, index, 6, hours)} className=' bg-cyan-400'>
                      <p className=' text-[.7em] text-black font-semibold px-1'>CNST PH.</p>

                      </button>


                    </div>
                  </div>

                  <input type="number" value={hours} onChange={(e) => setHours(e.target.valueAsNumber)} placeholder='Hours' id="" className=' bg-primary p-2 rounded-md text-xs' />
                  </DialogContent>
          </Dialog>

          

        </div>
       
        
      </div>

      
        
    </div>
  )
}

