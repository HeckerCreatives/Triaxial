"use client"
import React, { useState } from 'react'
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


export default function Yourworkload() {
  const [tab, setTab] = useState('Workload')
  const [tab2, setTab2] = useState('Leave')


  return (
   <div className=' w-full h-full flex flex-col justify-center bg-secondary p-4 text-zinc-100'>

      <div className=' w-full flex items-center justify-between h-auto bg-primary mb-2 p-4 text-xs'>
        <div className=' flex flex-col gap-1'>
          <p className=' text-zinc-400'>Name: <span className=' text-zinc-100 underline'>Name</span></p>
          <p className=' text-zinc-400'>Initial: <span className=' text-zinc-100 underline'>ABC</span></p>
          <p className=' text-zinc-400'>Email: <span className=' text-zinc-100 underline'>test@gmail.com</span></p>
        </div>

        <div className=' flex flex-col gap-2 bg-primary rounded-sm text-xs'>

          <p>Request :</p>
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
