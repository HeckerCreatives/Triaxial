"use client"
import React from 'react'
import { CalendarCheck, TrendingUp } from "lucide-react"

export default function Bottomcards() {

  const date = '00/00/00'
  return (
    <div className=' relative w-full h-full flex flex-col gap-2 items-center bg-secondary justify-start'>
      <div className=' h-[550px] overflow-y-auto overflow-x-auto flex items-start justify-center bg-zinc-100 w-full max-w-[1920px]'>

        <div className=' w-full'>
          <table className="table-auto w-full border-collapse ">
          <thead className=' bg-secondary h-[102px]'>
            <tr className=' text-[0.6rem] text-zinc-100 font-normal'>
              <th className='border-[1px] border-zinc-700 w-[80px] font-normal'>Name</th>
              <th className=' border-[1px] border-zinc-700 font-normal w-[80px]'>Initial</th>
              <th className=' border-[1px] border-zinc-700 font-normal w-[80px]'>Resource</th>
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
        </div>


        {Array.from({ length: 8 }).map((_, index) => (
            <div className=' flex flex-col bg-secondary text-[.6rem] text-white'>
              <div className=' w-full py-2 border-[1px] border-zinc-700 flex items-center justify-center'>
                <p className=' whitespace-nowrap'>Current Week</p>
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
                    <div className=' border-[.5px] border-zinc-600 h-[20px] w-[23px] flex items-center justify-center'>
                    </div>
                    <div className=' border-[1px] border-zinc-600 h-[20px] w-[23px] flex items-center justify-center'>
                    </div>
                    <div className=' border-[1px] border-zinc-600 h-[20px] w-[23px] flex items-center justify-center'>
                    </div>

                    <div className=' border-[1px] border-zinc-600 h-[20px] w-[23px] flex items-center justify-center'>
                    </div>

                    <div className=' border-[1px] border-zinc-600 h-[20px] w-[23px] flex items-center justify-center'>
                    </div>

                    <div className=' border-[1px] border-zinc-600 h-[20px] w-[23px] flex items-center justify-center'>
                    </div>
                  </div>
                ))}
            </div>   
        ))}

       
      </div>
       

         <div className=' bg-secondary absolute bottom-0 text-zinc-100 w-full grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-[1920px] p-4'>
          <div className=' w-full h-full flex-flex-col'>
            <p className=' text-xs'>Showing 1/73 of 73 Entries</p>
            <p className=' text-xs mt-4'>Legend:</p>
            <div className=' grid grid-cols-2 mt-2'>
              <div className=' w-full flex flex-col gap-2'>
                <div className=' flex items-center gap-2'>
                  <div className=' h-4 aspect-square bg-red-300'></div>
                  <p className=' text-xs text-zinc-400'>0 - 2 Hours</p>


                </div>
                 <div className=' flex items-center gap-2'>
                  <div className=' h-4 aspect-square bg-green-300'></div>
                  <p className=' text-xs text-zinc-400'>2 - 4 Hours</p>


                </div>

                 <div className=' flex items-center gap-2'>
                  <div className=' h-4 aspect-square bg-indigo-300'></div>
                  <p className=' text-xs text-zinc-400'>4 - 6 Hours</p>


                </div>

                <div className=' flex items-center gap-2'>
                  <div className=' h-4 aspect-square bg-amber-300'></div>
                  <p className=' text-xs text-zinc-400'>6 - 8 Hours</p>


                </div>
              </div>

              <div className=' w-full flex flex-col gap-2'>
                <div className=' flex items-center gap-2'>
                  <div className=' h-4 aspect-square bg-purple-300'></div>
                  <p className=' text-xs text-zinc-400'>Beyond Hours / Days or 40 Hours/ Week</p>


                </div>
                 <div className=' flex items-center gap-2'>
                  <div className=' h-4 aspect-square bg-orange-300'></div>
                  <p className=' text-xs text-zinc-400'>Unapplied Leave / WD or Holiday Leave</p>


                </div>

                 <div className=' flex items-center gap-2'>
                  <div className=' h-4 aspect-square bg-yellow-300'></div>
                  <p className=' text-xs text-zinc-400'>Wellness day</p>


                </div>

                <div className=' flex items-center gap-2'>
                  <div className=' h-4 aspect-square bg-teal-300'></div>
                  <p className=' text-xs text-zinc-400'>Leave</p>


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
            

            
        </div>
    </div>
  )
}
