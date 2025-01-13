import React from 'react'

export default function Dashboardlegends() {
  return (
    <div className=' w-full h-full flex-flex-col'>
    {/* <p className=' text-xs'>Showing 1/73 of 73 Entries</p> */}
    <p className=' text-xs mt-4'>Legend:</p>
    <div className=' grid grid-cols-2 mt-2'>
      <div className=' w-full flex flex-col gap-2'>
        <div className=' flex items-center gap-2'>
          <div className=' h-4 aspect-square bg-green-500'></div>
          <p className=' text-xs text-zinc-400'>0 - 7 Hours</p>


        </div>
         <div className=' flex items-center gap-2'>
          <div className=' h-4 aspect-square bg-orange-500'></div>
          <p className=' text-xs text-zinc-400'>7 - 9 Hours</p>


        </div>

         <div className=' flex items-center gap-2'>
          <div className=' h-4 aspect-square bg-pink-500'></div>
          <p className=' text-xs text-zinc-400'>Beyond 9 Hours</p>


        </div>
      </div>

      <div className=' w-full flex flex-col gap-2'>
        

         <div className=' flex items-center gap-2'>
          <div className=' h-4 aspect-square bg-fuchsia-500'></div>
          <p className=' text-xs text-zinc-400'>Wellness day</p>


        </div>

        <div className=' flex items-center gap-2'>
          <div className=' h-4 aspect-square bg-violet-500'></div>
          <p className=' text-xs text-zinc-400'>Leave</p>
        </div>

        <div className=' flex items-center gap-2'>
          <div className=' h-4 aspect-square bg-cyan-500'></div>
          <p className=' text-xs text-zinc-400'>WFH</p>
        </div>

        <div className=' flex items-center gap-2'>
          <div className=' h-4 aspect-square bg-gray-400'></div>
          <p className=' text-xs text-zinc-400'>Holiday</p>


        </div>
      </div>

    </div>

  </div>
  )
}
