import React from 'react'

export default function Dashboardlegends() {
  return (
    <div className=' w-full h-full flex-flex-col'>
    {/* <p className=' text-xs'>Showing 1/73 of 73 Entries</p> */}
    <p className=' text-[.6rem]'>Legend:</p>
    <div className=' grid grid-cols-2 mt-2'>
      <div className=' w-full flex flex-col gap-0'>
        <div className=' flex items-center gap-2'>
          <div className=' h-2 aspect-square bg-green-500'></div>
          <p className=' text-[.6rem] text-zinc-400'>0 - 5 Hours</p>


        </div>
         <div className=' flex items-center gap-2'>
          <div className=' h-2 aspect-square bg-orange-500'></div>
          <p className=' text-[.6rem] text-zinc-400'>5 - 9 Hours</p>


        </div>

         <div className=' flex items-center gap-2'>
          <div className=' h-2 aspect-square bg-pink-500'></div>
          <p className=' text-[.6rem] text-zinc-400'>Beyond 9.01 Hours</p>


        </div>
      </div>

      <div className=' w-full flex flex-col gap-0'>
        

         <div className=' flex items-center gap-2'>
          <div className=' h-2 aspect-square bg-fuchsia-300'></div>
          <p className=' text-[.6rem] text-zinc-400'>Wellness day</p>


        </div>

        <div className=' flex items-center gap-2'>
          <div className=' h-2 aspect-square bg-violet-500'></div>
          <p className=' text-[.6rem] text-zinc-400'>Leave</p>
        </div>

        <div className=' flex items-center gap-2'>
          <div className=' h-2 aspect-square bg-cyan-500'></div>
          <p className=' text-[.6rem] text-zinc-400'>WFH</p>
        </div>

        <div className=' flex items-center gap-2'>
          <div className=' h-2 aspect-square bg-gray-400'></div>
          <p className=' text-[.6rem] text-zinc-400'>Public Holiday</p>


        </div>
      </div>

    </div>

  </div>
  )
}
