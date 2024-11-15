'use client'
import React, { useMemo, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Spreadsheet from 'react-spreadsheet';


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
};

export default function Indiviualworkloads() {
  const [tab, setTab] = useState('Workload')
  const [tab2, setTab2] = useState('Leave')
  const [dialog, setDialog] = useState(false)
  const [index, setIndex] = useState(0)
  const [hours, setHours] = useState(0)

  const [data, setData] = useState(initialData);

  // Function to update status of a specific date
  const updateStatus = (memberIndex: number, dateIndex: number, newStatus: number, newHours: number) => {
    setData(prevData => {
      const newData = { ...prevData };
      const selectedMember = newData.graph[0].members[memberIndex];
      if (selectedMember.dates && selectedMember.dates[dateIndex]) {
        selectedMember.dates[dateIndex].status = newStatus;
        selectedMember.dates[dateIndex].hours = newHours;
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


    return colorData

   
  }

  const columnLabels = ["Flavour", "Food"];
  const rowLabels = ["Item 1", "Item 2"];
  const data1 = [
    [{ value: "Vanilla" }, { value: "Chocolate" }],
    [{ value: "Strawberry" }, { value: "Cookies" }],
  ];

  return (
    <div className=' w-full h-full flex flex-col justify-center bg-secondary text-zinc-100 '>

      <div className=' w-full flex items-end gap-8 h-auto bg-primary mb-2 p-4 text-xs'>
        <div className=' w-auto flex flex-col gap-1'>
          <p className=' text-zinc-400'>Project Name: <span className=' text-zinc-100 underline'>Name</span></p>
          <p className=' text-zinc-400'>Project Manager: <span className=' text-zinc-100 underline'>ABC</span></p>
          <p className=' text-zinc-400'>Client Name: <span className=' text-zinc-100 underline'>test@gmail.com</span></p>

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

      <Spreadsheet
      data={data1}
      columnLabels={columnLabels}
      rowLabels={rowLabels}
      className=' text-xs'
      
    />

      <div className=' w-full flex flex-col max-w-[1920px]'>
        <div className=' h-full overflow-y-auto flex items-start justify-center bg-zinc-100 w-full max-w-[1920px]'>
        <table className="table-auto w-full border-collapse ">
          <thead className=' bg-secondary h-[100px]'>
            <tr className=' text-[0.6rem] text-zinc-100 font-normal'>
              <th className=' border-[1px] border-zinc-700 w-[80px] font-normal'>Members</th>
              <th className=' border-[1px] border-zinc-700 font-normal w-[80px]'>Role</th>
              <th className=' border-[1px] border-zinc-700 font-normal w-[80px]'>Notes</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 30 }).map((_, index) => (
              <tr key={index} className={index % 2 === 0 ? '' : ' bg-red-100'}>
            
                <td className=" h-[20px] "></td>
                <td className=" h-[20px] "></td>
                <td className=" h-[20px] "></td>
          
              
              </tr>
            ))}
          
        </tbody>
        </table>

       <div className=' flex w-full'>
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
              

              {memoizedData.graph[0].members[0].dates?.map((item, index) => (
                <>
                <td
                key={index}
                    className={`border relative text-center font-bold border-slate-700 h-[20px] text-black text-xs`}
                    onClick={() => {setDialog(true), setIndex(index), setHours(item.hours)}} // Cycle through statuses on click
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
                      <button onClick={() => updateStatus(0, index, 1, hours )} className=' bg-red-500'>
                        <p className=' text-[.7em] text-black font-semibold px-1'>Due On</p>
                      </button>
                    

                    </div>
                    <div className=' flex items-center gap-2'>
                      <button onClick={() => updateStatus(0, index, 2, hours )} className=' bg-orange-400'>
                        <p className=' text-[.7em] text-black font-semibold px-1'>25%</p>
                      </button>
                      


                    </div>

                    <div className=' flex items-center gap-2'>
                      <button onClick={() => updateStatus(0, index, 3, hours )} className=' bg-yellow-300'>
                      <p className=' text-[.7em] text-black font-semibold px-1'>50%</p>

                      </button>


                    </div>

                    <div className=' flex items-center gap-2'>
                      <button  onClick={() => updateStatus(0, index, 4, hours )} className=' bg-green-500'>
                      <p className=' text-[.7em] text-black font-semibold px-1'>75%</p>

                      </button >


                    </div>

                    <div className=' flex items-center gap-2'>
                      <button onClick={() => updateStatus(0, index, 5, hours )} className=' bg-blue-500'>
                      <p className=' text-[.7em] text-black font-semibold px-1'>100%</p>

                      </button>


                    </div>

                    <div className=' flex items-center gap-2'>
                      <button onClick={() => updateStatus(0, index, 6, hours)} className=' bg-cyan-400'>
                      <p className=' text-[.7em] text-black font-semibold px-1'>CNST PH.</p>

                      </button>


                    </div>
                  </div>

                  <input type="number" value={hours} onChange={(e) => setHours(e.target.valueAsNumber)} placeholder='Hours' id="" className=' bg-primary p-2 rounded-md text-xs' />
                  </DialogContent>
                  </Dialog>

                  
               
              
              </tr>
         
           
          
        </tbody>
        </table>
        </div>

      </div>
       
        
      </div>

      
        
    </div>
  )
}

