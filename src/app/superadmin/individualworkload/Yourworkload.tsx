"use client"
import React, { useEffect, useState } from 'react'
import { Plus, Delete, Trash, Eye, CircleAlert, CalendarCheck } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import axios from 'axios'
import { useSearchParams } from 'next/navigation'

type Data = {
  employeeid: string
  email: string
  firstname: string
  lastname:string 
  initial: string
  contactno: string
  reportingto: {
      employeeid: string
      firstname: string
      lastname: string
  }
}



export default function Yourworkload() {
  const [tab, setTab] = useState('Workload')
  const params = useSearchParams()
  const employeeid = params.get('employeeid')
  const [data, setData] = useState<Data>()

  useEffect(() => {
    const getList = async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/viewemployeedata?employeeid=${employeeid}`,{
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
          }
      })
  
      console.log('Data',response.data)
      setData(response.data.data)

    
    }
    getList()
    
  },[])

  return (
    <div className=' w-full h-full flex flex-col justify-center bg-secondary p-4 text-zinc-100'>

      <div className=' w-full flex items-center justify-between h-auto bg-primary mb-2 p-4 text-xs'>
        <div className=' flex flex-col gap-1'>
          <p className=' text-zinc-400'>Name: <span className=' text-zinc-100 underline'>{data?.firstname} {data?.firstname}</span></p>
          <p className=' text-zinc-400'>Initial: <span className=' text-zinc-100 underline'>{data?.initial}</span></p>
          <p className=' text-zinc-400'>Email: <span className=' text-zinc-100 underline'>{data?.email}</span></p>

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
        <div className=' h-[580px] overflow-y-auto flex items-start justify-center bg-zinc-100 w-full max-w-[1920px]'>
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

      {/* <div className=' text-zinc-100 w-full grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-[1720px] p-4'>
        <div className=' w-full h-full flex-flex-col'>
            <div className=' grid grid-cols-2 mt-2'>
              <div className=' w-full flex flex-col gap-2'>
                <p className=' text-xs mt-4'>Status Legend</p>

                <div className=' flex items-center gap-2'>
                  <div className=' h-4 aspect-square bg-red-500'></div>
                  <p className=' text-xs text-zinc-400'>Due On</p>


                </div>
                 <div className=' flex items-center gap-2'>
                  <div className=' h-4 aspect-square bg-orange-400'></div>
                  <p className=' text-xs text-zinc-400'>25%</p>


                </div>

                 <div className=' flex items-center gap-2'>
                  <div className=' h-4 aspect-square bg-yellow-300'></div>
                  <p className=' text-xs text-zinc-400'>50%</p>


                </div>

                <div className=' flex items-center gap-2'>
                  <div className=' h-4 aspect-square bg-green-500'></div>
                  <p className=' text-xs text-zinc-400'>75%</p>


                </div>

                <div className=' flex items-center gap-2'>
                  <div className=' h-4 aspect-square bg-blue-500'></div>
                  <p className=' text-xs text-zinc-400'>100%</p>


                </div>

                <div className=' flex items-center gap-2'>
                  <div className=' h-4 aspect-square bg-cyan-400'></div>
                  <p className=' text-xs text-zinc-400'>CNST PH.</p>


                </div>
              </div>

              <div className=' w-full flex flex-col gap-2'>
                <p className=' text-xs mt-4'>Day / Hours Legend</p>

                <div className=' flex items-center gap-2'>
                  <div className=' h-4 aspect-square bg-fuchsia-400'></div>
                  <p className=' text-xs text-zinc-400'>Greater than 8 hours/ day or  40 hours / week</p>


                </div>

                 <div className=' flex items-center gap-2'>
                  <div className=' h-4 aspect-square bg-green-300'></div>
                  <p className=' text-xs text-zinc-400'>Unapplied Leave / WD or Holiday Leave</p>


                </div>

                <div className=' flex items-center gap-2'>
                  <div className=' h-4 aspect-square bg-violet-500'></div>
                  <p className=' text-xs text-zinc-400'>Leave</p>


                </div>

                <div className=' flex items-center gap-2'>
                  <div className=' h-4 aspect-square bg-rose-300'></div>
                  <p className=' text-xs text-zinc-400'>Wellness Day</p>


                </div>

                

                 
              </div>

            </div>

        </div>
         
        <div className=' w-full grid grid-cols-2 gap-4'>
           
            <div className=' flex md:flex-row flex-col gap-2 w-full h-auto bg-primary p-4'>
              <div className=' flex flex-col gap-2'>
                <h2 className=' uppercase font-semibold text-sm'>Current Event</h2>
                <p className=' text-sm text-zinc-400'>08/14/24</p>
                <p className=' text-zinc-300 text-xs'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi laborum, obcaecati velit molestiae ex atque illum similique sit corrupt.</p>
              </div>

              <div className=' flex items-center justify-center'>
                <div className='  p-4 bg-secondary'>
                <CalendarCheck size={30}/>

                </div>
              </div>
              
            </div>

            <div className=' flex md:flex-row flex-col gap-2 w-full h-auto bg-primary p-4'>
              <div className=' flex flex-col gap-2'>
                <h2 className=' uppercase font-semibold text-sm'>Upcoming Event</h2>
                <p className=' text-sm text-zinc-400'>08/14/24</p>
                <p className=' text-zinc-300 text-xs'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi laborum, obcaecati velit molestiae ex atque illum similique sit corrupt.</p>
              </div>

              <div className=' flex items-center justify-center'>
                <div className='  p-4 bg-secondary'>
                <CalendarCheck size={30}/>

                </div>
              </div>
              
            </div>
        </div>
          
            
        </div> */}
        
    </div>
  )
}
