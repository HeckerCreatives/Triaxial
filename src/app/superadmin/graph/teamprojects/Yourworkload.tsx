"use client"
import React, { useMemo, useState } from 'react'
import { Plus, Delete, Trash, Eye, CircleAlert, CalendarCheck } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Actionbtn from '@/components/common/Actionbutton'
import Leaveform from '@/components/forms/Leaveform'
import WDform from '@/components/forms/Wellnessday'
import Wfhform from '@/components/forms/Wfhform'
import Createprojectcomponent from '@/components/forms/Createprojectcomponent'



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
            { date: '05/15/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false }
          ]
        }
        // Other members...
      ]
    }
  ]
};


export default function Yourworkload() {
  const [tab, setTab] = useState('Workload')
  const [tab2, setTab2] = useState('Leave')
  const [dialog, setDialog] = useState(false)
  const [index, setIndex] = useState(0)

  const [data, setData] = useState(initialData);

  // Function to update status of a specific date
  const updateStatus = (memberIndex: number, dateIndex: number, newStatus: number) => {
    setData(prevData => {
      const newData = { ...prevData };
      const selectedMember = newData.graph[0].members[memberIndex];
      if (selectedMember.dates && selectedMember.dates[dateIndex]) {
        selectedMember.dates[dateIndex].status = newStatus;
      }
      return newData;
    });
  };

// Memoized data to prevent unnecessary re-renders
  const memoizedData = useMemo(() => data, [data]);

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

    console.log('Color', colorData, leave, wd, event)

    return colorData

   
  }


  return (
   <div className=' w-full h-full flex flex-col justify-center bg-secondary p-4 text-zinc-100'>

      <div className=' w-full flex items-center justify-between h-auto bg-primary mb-2 p-4 text-xs'>
        <div className=' flex flex-col gap-1'>
          <p className=' text-zinc-400'>Team Name: <span className=' text-zinc-100 underline'>Name</span></p>
          <p className=' text-zinc-400'>Manager: <span className=' text-zinc-100 underline'>ABC</span></p>
          <p className=' text-zinc-400'>Leader: <span className=' text-zinc-100 underline'>ABC</span></p>
        </div>

        <div className=' flex items-center justify-center gap-4 text-xs bg-secondary p-2 rounded-sm'>
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

      <div className=' w-full flex flex-col max-w-[1920px]'>
        <div className=' h-full overflow-y-auto flex items-start justify-center bg-zinc-100 w-full max-w-[1920px]'>
        <table className="table-auto w-full border-collapse ">
          <thead className=' bg-secondary h-[103px]'>
            <tr className=' text-[0.6rem] text-zinc-100 font-normal'>
              <th className=' w-[80px] font-normal'>Team</th>
              <th className=' font-normal w-[80px]'>Job No.</th>
              <th className=' font-normal w-[80px]'>Client</th>
              <th className=' font-normal w-[80px]'>Project Name</th>
              <th className=' font-normal w-[80px]'>Job Mgr.</th>
              <th className=' font-normal w-[80px]'>Job Component</th>
              <th className=' font-normal w-[80px]'>Notes</th>
              <th className=' font-normal w-[80px]'>Role</th>
              <th className=' font-normal w-[80px]'>Other Members</th>
            </tr>
          </thead>
          <tbody>
            {data.graph.map((item, index) => (
               <tr key={index} className={` text-black text-xs`}>
                <td className=" h-[20px] w-[80px] text-center ">{item.teamname}</td>
                <td className=" h-[20px] w-[80px] text-center ">{item.jobno}</td>
                <td className=" h-[20px] w-[80px] text-center ">{item.clientname}</td>
                <td className=" h-[20px] w-[80px] text-center ">{item.projectname}</td>
                <td className=" h-[20px] w-[80px] text-center ">{item.jobmanager.fullname}</td>
                <td className=" h-[20px] w-[80px] text-center ">{item.jobcomponent.componentname}</td>
                <td className=" h-[20px] w-[80px] text-center ">{item.notes}</td>
                <td className=" h-[20px] w-[80px] text-center "></td>
                <td className=" h-[20px] w-[80px] text-center "></td>
                
              </tr>
            ))}
            {Array.from({ length: 35 }).map((_, index) => (
              <tr key={index} className={index % 2 === 0 ? '' : ' bg-red-100'}>
                <td className=" h-[20px] "></td>
                <td className=" h-[20px] "></td>
                <td className=" h-[20px] "></td>
                <td className=" h-[20px] "></td>
                <td className=" h-[20px] "></td>
                <td className=" h-[20px] "></td>
                <td className=" h-[20px] "></td>
                <td className=" h-[20px] "></td>
                <td className=" h-[20px] "></td>
              </tr>
            ))}
          
        </tbody>
        </table>

        <div className=' flex flex-col'>
        
          <table className="table-auto border-collapse border border-slate-500">
          
          <thead className=' bg-secondary'>
       
              <tr className=' text-[0.6rem] text-zinc-100 font-normal '>
                <th className=' w-[80px] font-normal border border-slate-500 py-2'>M</th>
                <th className=' w-[80px] font-normal border border-slate-500 py-2'>T</th>
                <th className=' w-[80px] font-normal border border-slate-500 py-2'>W</th>
                <th className=' w-[80px] font-normal border border-slate-500 py-2'>T</th>
                <th className=' w-[80px] font-normal border border-slate-500 py-2'>F</th>
                <th className=' w-[80px] font-normal border border-slate-500 py-2'></th>
              </tr>
           
            <tr className=' text-[0.6rem] text-zinc-100 font-normal h-[70px]'>
            {data.graph[0].members[0].dates?.map((item, index) => (
              <th className=' w-[80px] font-normal border border-slate-500 py-2'><p className=' rotate-90'>{item.date}</p></th>
            ))}
            <th className=' w-[80px] font-normal border border-slate-500 py-2 text-red-300'><p className=' rotate-90'>Total</p></th>

            </tr>

          </thead>
          <tbody>
         
              <tr>
                {/* {data.graph[0].members[0].dates?.map((item, index) => (
                <td className={`border border-slate-700 h-[20px] text-black text-xs ${getStatus(item.status)}`}>{item.hours}</td>
              ))} */}

              {memoizedData.graph[0].members[0].dates?.map((item, index) => (
                <>
                <td
                key={index}
                    className={`border relative text-center font-bold border-slate-700 h-[20px] text-black text-xs`}
                    onClick={() => {setDialog(true), setIndex(index)}} // Cycle through statuses on click
                  >
                    <div className=' flex absolute w-full h-full'>
                      {getStatus(item.status, item.isOnLeave, item.isOnWellnessday, item.isOnEvent).map((item) => (
                        <div className={` w-full ${item} `}>

                        </div>
                      ))}
                    </div>
                    <p className=' relative z-20'>{item.hours}</p>
                    
                  </td>

                  

                  
                </>
                  
              ))}

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
                      <button onClick={() => updateStatus(0, index, 1 )} className=' bg-red-500'>
                        <p className=' text-[.7em] text-black font-semibold px-1'>Due On</p>
                      </button>
                      


                    </div>
                    <div className=' flex items-center gap-2'>
                      <button onClick={() => updateStatus(0, index, 2 )} className=' bg-orange-400'>
                        <p className=' text-[.7em] text-black font-semibold px-1'>25%</p>
                      </button>
                      


                    </div>

                    <div className=' flex items-center gap-2'>
                      <button onClick={() => updateStatus(0, index, 3 )} className=' bg-yellow-300'>
                      <p className=' text-[.7em] text-black font-semibold px-1'>50%</p>

                      </button>


                    </div>

                    <div className=' flex items-center gap-2'>
                      <button  onClick={() => updateStatus(0, index, 4 )} className=' bg-green-500'>
                      <p className=' text-[.7em] text-black font-semibold px-1'>75%</p>

                      </button >


                    </div>

                    <div className=' flex items-center gap-2'>
                      <button onClick={() => updateStatus(0, index, 5 )} className=' bg-blue-500'>
                      <p className=' text-[.7em] text-black font-semibold px-1'>100%</p>

                      </button>


                    </div>

                    <div className=' flex items-center gap-2'>
                      <button onClick={() => updateStatus(0, index, 6)} className=' bg-cyan-400'>
                      <p className=' text-[.7em] text-black font-semibold px-1'>CNST PH.</p>

                      </button>


                    </div>
                  </div>
                  </DialogContent>
                  </Dialog>

                  
               
              
              </tr>
         
            {Array.from({ length: 35 }).map((_, index) => (
              <tr key={index} className={index % 2 === 0 ? '' : ' bg-red-100'}>
                <td className="border border-slate-700 h-[20px]"></td>
                <td className="border border-slate-700 h-[20px]"></td>
                <td className="border border-slate-700 h-[20px]"></td>
                <td className="border border-slate-700 h-[20px]"></td>
                <td className="border border-slate-700 h-[20px]"></td>
                <td className="border border-slate-700 h-[20px]"></td>
              </tr>
            ))}
          
        </tbody>
        </table>

       </div>

       <div className=' flex flex-col'>

          <table className="table-auto border-collapse border border-slate-500">
          
          <thead className=' bg-secondary'>
            <tr className=' text-[0.6rem] text-zinc-100 font-normal '>
                <th className=' w-[80px] font-normal border border-slate-500 py-2'>M</th>
                <th className=' w-[80px] font-normal border border-slate-500 py-2'>T</th>
                <th className=' w-[80px] font-normal border border-slate-500 py-2'>W</th>
                <th className=' w-[80px] font-normal border border-slate-500 py-2'>T</th>
                <th className=' w-[80px] font-normal border border-slate-500 py-2'>F</th>
                <th className=' w-[80px] font-normal border border-slate-500 py-2'></th>
              </tr>
            <tr className=' text-[0.6rem] text-zinc-100 font-normal h-[70px]'>
              <th className=' w-[80px] font-normal border border-slate-500 py-2'><p className=' rotate-90'>00/00/00</p></th>
              <th className=' w-[80px] font-normal border border-slate-500 py-2'><p className=' rotate-90'>00/00/00</p></th>
              <th className=' w-[80px] font-normal border border-slate-500 py-2'><p className=' rotate-90'>00/00/00</p></th>
              <th className=' w-[80px] font-normal border border-slate-500 py-2'><p className=' rotate-90'>00/00/00</p></th>
              <th className=' w-[80px] font-normal border border-slate-500 py-2'><p className=' rotate-90'>00/00/00</p></th>
              <th className=' w-[80px] font-normal border border-slate-500 py-2 text-red-300'><p className=' rotate-90'>Total</p></th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 35 }).map((_, index) => (
              <tr key={index} className={index % 2 === 0 ? '' : ' bg-red-100'}>
                <td className="border border-slate-700 h-[20px]"></td>
                <td className="border border-slate-700 h-[20px]"></td>
                <td className="border border-slate-700 h-[20px]"></td>
                <td className="border border-slate-700 h-[20px]"></td>
                <td className="border border-slate-700 h-[20px]"></td>
                <td className="border border-slate-700 h-[20px]"></td>
              </tr>
            ))}
          
        </tbody>
        </table>

       </div>

       <div className=' flex flex-col'>
          <table className="table-auto border-collapse border border-slate-500">
          
          <thead className=' bg-secondary'>
            <tr className=' text-[0.6rem] text-zinc-100 font-normal '>
                <th className=' w-[80px] font-normal border border-slate-500 py-2'>M</th>
                <th className=' w-[80px] font-normal border border-slate-500 py-2'>T</th>
                <th className=' w-[80px] font-normal border border-slate-500 py-2'>W</th>
                <th className=' w-[80px] font-normal border border-slate-500 py-2'>T</th>
                <th className=' w-[80px] font-normal border border-slate-500 py-2'>F</th>
                <th className=' w-[80px] font-normal border border-slate-500 py-2'></th>
              </tr>
            <tr className=' text-[0.6rem] text-zinc-100 font-normal h-[70px]'>
              <th className=' w-[80px] font-normal border border-slate-500 py-2'><p className=' rotate-90'>00/00/00</p></th>
              <th className=' w-[80px] font-normal border border-slate-500 py-2'><p className=' rotate-90'>00/00/00</p></th>
              <th className=' w-[80px] font-normal border border-slate-500 py-2'><p className=' rotate-90'>00/00/00</p></th>
              <th className=' w-[80px] font-normal border border-slate-500 py-2'><p className=' rotate-90'>00/00/00</p></th>
              <th className=' w-[80px] font-normal border border-slate-500 py-2'><p className=' rotate-90'>00/00/00</p></th>
              <th className=' w-[80px] font-normal border border-slate-500 py-2 text-red-300'><p className=' rotate-90'>Total</p></th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 35 }).map((_, index) => (
              <tr key={index} className={index % 2 === 0 ? '' : ' bg-red-100'}>
                <td className="border border-slate-700 h-[20px]"></td>
                <td className="border border-slate-700 h-[20px]"></td>
                <td className="border border-slate-700 h-[20px]"></td>
                <td className="border border-slate-700 h-[20px]"></td>
                <td className="border border-slate-700 h-[20px]"></td>
                <td className="border border-slate-700 h-[20px]"></td>
              </tr>
            ))}
          
        </tbody>
        </table>

       </div>

       

      </div>
       

        
      </div>

    
        
    </div>
  )
}
