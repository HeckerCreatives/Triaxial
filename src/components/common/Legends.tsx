import React from 'react'

export default function Legends() {
  return (
    <div className=' flex items-center justify-center gap-4 text-xs bg-secondary p-2 rounded-sm'>
    <div className=' h-full flex items-end gap-2'>
      <p className=' text-[.8em]'>Status Legend:</p>

        <div className=' w-fit flex flex-wrap items-center gap-2'>

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

          <div className=' w-fit flex flex-wrap items-center gap-2'>

            <div className=' flex items-center gap-2'>
              <div className=' bg-pink-500'>
                <p className=' text-[.7em] text-black font-semibold px-1'>Greater than 9 hours/day</p>
              </div>
              


            </div>
            <div className=' flex items-center gap-2'>
              <div className=' bg-violet-300'>
                <p className=' text-[.7em] text-black font-semibold px-1'>Leave</p>
              </div>
              


            </div>

            <div className=' flex items-center gap-2'>
              <div className=' bg-lime-300'>
                <p className=' text-[.7em] text-black font-semibold px-1'>WFH</p>
              </div>
            
            </div>

            <div className=' flex items-center gap-2'>
              <div className=' bg-fuchsia-300'>
              <p className=' text-[.7em] text-black font-semibold px-1'>Wellness Day</p>

              </div>


            </div>

            <div className=' flex items-center gap-2'>
              <div className=' bg-gray-400'>
              <p className=' text-[.7em] text-black font-semibold px-1'>Public Holidays</p>

              </div>


            </div>


          </div>

        


    </div>
    
  </div>
  )
}
