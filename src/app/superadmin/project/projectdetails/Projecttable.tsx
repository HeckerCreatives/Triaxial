"use client"
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


type Options = {
  value: string
  label: string
}

interface CellProps {
  date: string;
  day: string;
  status: string;
  onClick: (status: string) => void;
}

const Cell: React.FC<CellProps> = ({ date, day, status, onClick }) => {
  const handleClick = () => {
    onClick(status === 'present' ? 'absent' : 'present');
  };

  const backgroundColor = status === 'present' ? 'bg-green-500' : 'bg-red-500';

  return (
    <td
      className={`border-[1px] border-zinc-600 h-[20px] w-[23px] flex items-center justify-center ${backgroundColor}`}
      onClick={handleClick}
    >
      {date}
    </td>
  );
};

interface TableProps {
  dates: string[];
}

const Table: React.FC<TableProps> = ({ dates }) => {
  const [statuses, setStatuses] = useState<{ [date: string]: string }>({});

  const handleCellClick = (date: string) => (status: string) => {
  setStatuses((prevStatuses) => ({ ...prevStatuses, [date]: status }));
};

  return (
    <table className="table-auto w-full border-collapse">
      <thead>
        <tr>
          <th className="border-[1px] border-zinc-600">Date</th>
          <th className="border-[1px] border-zinc-600">Monday</th>
          <th className="border-[1px] border-zinc-600">Tuesday</th>
          <th className="border-[1px] border-zinc-600">Wednesday</th>
          <th className="border-[1px] border-zinc-600">Thursday</th>
          <th className="border-[1px] border-zinc-600">Friday</th>
        </tr>
      </thead>
      <tbody>
        {dates.map((date) => (
          <tr key={date}>
            <td className="border-[1px] border-zinc-600">{date}</td>
            <Cell
              date={date}
              day="Monday"
              status={statuses[date] || 'absent'}
              onClick={handleCellClick}
            />
            <Cell
              date={date}
              day="Tuesday"
              status={statuses[date] || 'absent'}
              onClick={handleCellClick}
            />
            <Cell
              date={date}
              day="Wednesday"
              status={statuses[date] || 'absent'}
              onClick={handleCellClick}
            />
            <Cell
              date={date}
              day="Thursday"
              status={statuses[date] || 'absent'}
              onClick={handleCellClick}
            />
            <Cell
              date={date}
              day="Friday"
              status={statuses[date] || 'absent'}
              onClick={handleCellClick}
            />
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default function Projecttable() {
  const [selected, setSelected] = useState('')
  const [color, setColor] = useState('')

  // const updateStatus = (select: string) => {
  //   setSelected(select)
  //   if(selected === 'Due On'){
  //     setColor('bg-red-500')
  //   }
  // }

  const weeks = 12;
    const days = ['M', 'T', 'W', 'T', 'F'];

     const [cells, setCells] = useState(
  Array.from({ length: weeks * days.length }).map(() => ({
    status: '',
  }))
);

const updateStatus = (index: any, status: string) => {
  setCells((prevCells) => {
    const newCells = [...prevCells];
    newCells[index].status = status;
    return newCells;
  });
};

  return (
   <div className=' w-full h-full flex flex-col justify-center bg-secondary text-zinc-100'>

      <div className=' w-full flex items-end gap-8 h-auto bg-primary mb-2 p-4 text-xs'>
        <div className=' w-auto flex flex-col gap-1 text-[.6rem]'>
          <p className=' text-zinc-400'>Job no: <span className=' text-zinc-100 underline'>TRX0001</span></p>
          <p className=' text-zinc-400'>Project name: <span className=' text-zinc-100 underline'>ABC</span></p>
          <p className=' text-zinc-400'>Client name: <span className=' text-zinc-100 underline'>test</span></p>
          <p className=' text-zinc-400'>% Invoiced: <span className=' text-zinc-100 underline'>test</span></p>
          <p className=' text-zinc-400'>Job budget: <span className=' text-zinc-100 underline'>test</span></p>
          <p className=' text-zinc-400'>Notes: <span className=' text-zinc-100 underline'>test</span></p>

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

      <div className=' w-full flex flex-col max-w-[1920px]'>
        <div className=' h-[580px] overflow-y-auto flex items-start justify-center bg-zinc-100 w-full'>
        <table className="table-auto w-[750px] border-collapse ">
          <thead className=' bg-secondary h-[100px] w-full'>
            <tr className=' text-[0.6rem] text-zinc-100 font-normal'>
              <th className=' border-[1px] border-zinc-700 font-normal'>Job Component</th>
              <th className=' border-[1px] border-zinc-700 font-normal'>Notes</th>
              <th className=' border-[1px] border-zinc-700 font-normal'>Role</th>
              <th className=' border-[1px] border-zinc-700 font-normal'>Members</th>
              <th className=' border-[1px] border-zinc-700 font-normal'>Total Hours</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 30 }).map((_, index) => (
              <tr key={index} className={index % 2 === 0 ? '' : ' bg-red-100'}>
                <td className=" h-[20px] "></td>
                <td className=" h-[20px] "></td>
                <td className=" h-[20px] "></td>
                <td className=" h-[20px] "></td>
                <td className=" h-[20px] "></td>
              
              </tr>
            ))}
          
        </tbody>
        </table>

        <div className=' flex w-full overflow-x-auto'>
          {Array.from({ length: 24 }).map((_, index) => (
            <div className=' flex flex-col bg-secondary text-[.6rem] text-white'>
             <div className=' flex items-center'>
                <div className=' border-[1px] border-zinc-600 h-[30px] w-[23px] flex items-center justify-center'>
                  <p className=''>M</p>
                </div>
                <div className=' border-[1px] border-zinc-600 h-[30px] w-[23px] flex items-center justify-center'>
                  <p className=''>T</p>
                </div>
                <div className=' border-[1px] border-zinc-600 h-[30px] w-[23px] flex items-center justify-center'>
                  <p className=''>W</p>
                </div>

                <div className=' border-[1px] border-zinc-600 h-[30px] w-[23px] flex items-center justify-center'>
                  <p className=''>T</p>
                </div>

                <div className=' border-[1px] border-zinc-600 h-[30px] w-[23px] flex items-center justify-center'>
                  <p className=''>F</p>
                </div>

                <div className=' border-[1px] border-zinc-600 h-[30px] w-[23px] flex items-center justify-center'>
                </div>
              </div>
              <div className=' flex items-center'>
                <div className=' border-[1px] border-zinc-600 h-[70px] w-[23px] flex items-center justify-center'>
                  <p className=' rotate-90'>00/00/00</p>
                </div>
                <div className=' border-[1px] border-zinc-600 h-[70px] w-[23px] flex items-center justify-center'>
                  <p className=' rotate-90'>00/00/00</p>
                </div>
                <div className=' border-[1px] border-zinc-600 h-[70px] w-[23px] flex items-center justify-center'>
                  <p className=' rotate-90'>00/00/00</p>
                </div>

                <div className=' border-[1px] border-zinc-600 h-[70px] w-[23px] flex items-center justify-center'>
                  <p className=' rotate-90'>00/00/00</p>
                </div>

                <div className=' border-[1px] border-zinc-600 h-[70px] w-[23px] flex items-center justify-center'>
                  <p className=' rotate-90'>00/00/00</p>
                </div>

                <div className=' border-[1px] border-zinc-600 h-[70px] w-[23px] flex items-center justify-center'>
                  <p className=' rotate-90 text-red-300'>Total</p>
                </div>
              </div>
              {Array.from({ length: 30 }).map((_, index) => (
                  <div className=' flex items-center bg-white'>
                    
                    <Dialog>
                    <DialogTrigger>
                      <button className={` ${color} hover:bg-zinc-300 border-[.5px] border-zinc-600 h-[20px] w-[23px] flex items-center justify-center`}>
                      </button>
                    </DialogTrigger>
                    <DialogContent className=' w-[200px] bg-secondary border-none p-6 text-white'>
                      <DialogHeader>
                        <DialogTitle>Update Status</DialogTitle>
                        <DialogDescription>
                          This action updates the status on selected item.
                        </DialogDescription>
                        <p>Select:</p>
                        <div className=' w-fit flex items-center gap-2'>

                          <div className=' flex items-center gap-2'>
                            <button  className=' bg-red-500'>
                              <p className=' text-xs text-black font-semibold px-4 py-2'>Due On</p>
                            </button>
                        
                          </div>
                          <div className=' flex items-center gap-2'>
                            <div className=' bg-orange-400'>
                              <p className=' text-xs text-black font-semibold px-4 py-2'>25%</p>
                            </div>
                            


                          </div>

                          <div className=' flex items-center gap-2'>
                            <div className=' bg-yellow-300'>
                            <p className=' text-xs text-black font-semibold px-4 py-2'>50%</p>

                            </div>


                          </div>

                          <div className=' flex items-center gap-2'>
                            <div className=' bg-green-500'>
                            <p className=' text-xs text-black font-semibold px-4 py-2'>75%</p>

                            </div>


                          </div>

                          <div className=' flex items-center gap-2'>
                            <div className=' bg-blue-500'>
                            <p className=' text-xs text-black font-semibold px-4 py-2'>100%</p>

                            </div>


                          </div>

                          <div className=' flex items-center gap-2'>
                            <div className=' bg-cyan-400'>
                            <p className=' text-xs text-black font-semibold px-4 py-2'>CNST PH.</p>
                          </div>


                          </div>
                        </div>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>

                    <button className=' hover:bg-zinc-300 border-[1px] border-zinc-600 h-[20px] w-[23px] flex items-center justify-center'>
                    </button>
                    <button className=' hover:bg-zinc-300 border-[1px] border-zinc-600 h-[20px] w-[23px] flex items-center justify-center'>
                    </button>

                    <button className=' hover:bg-zinc-300 border-[1px] border-zinc-600 h-[20px] w-[23px] flex items-center justify-center'>
                    </button>

                    <button className=' hover:bg-zinc-300 border-[1px] border-zinc-600 h-[20px] w-[23px] flex items-center justify-center'>
                    </button>

                    <div className=' border-[1px] border-zinc-600 h-[20px] w-[23px] flex items-center justify-center'>
                    </div>
                  </div>
                ))}
            </div>   
          ))}
        </div>

        {/* <div className='flex w-full overflow-x-auto'>
            {Array.from({ length: weeks }).map((_, weekIndex) => (
              <div className='flex flex-col bg-secondary text-[.6rem] text-white'>
                <div className='flex items-center'>
                  {days.map((day, dayIndex) => (
                    <div
                      key={dayIndex}
                      className='border-[1px] border-zinc-600 h-[30px] w-[23px] flex items-center justify-center'
                    >
                      <p
                       
                      >
                        {day}
                      </p>
                    </div>
                  ))}
                </div>
                <div className='flex items-center'>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <div
                      key={index}
                      className='border-[1px] border-zinc-600 h-[70px] w-[23px] flex items-center justify-center'
                    >
                      <p className='rotate-90'>00/00/00</p>
                    </div>
                  ))}
                </div>

                {Array.from({ length: 30 }).map((_, index) => (
                    <div className=' flex'>
                      {Array.from({ length: 5 }).map((_, index) => (
                      <div key={index} className='flex items-center bg-white'>
                            <button
                              className={`${cells[weekIndex * days.length + index].status === 'Due On'
                                ? 'bg-red-500'
                                : ''} ${color} hover:bg-zinc-300 border-[.5px] border-zinc-600 h-[20px] w-[23px] flex items-center justify-center`}
                              onClick={() =>
                                updateStatus(weekIndex * days.length + index % days.length, 'Due On')
                              }
                            >
                            
                            </button>
                          
                      </div>
                    ))}
                    </div>
                  ))}
                
                
                
              </div>
            ))}
        </div> */}



      </div>
       
        
      </div>

       {/* <Table dates={dates} /> */}

      
        
    </div>
  )
}
