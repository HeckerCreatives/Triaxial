import React from 'react'

export default function Dashboardlegends() {
  return (
    <div className=' w-full h-full flex-flex-col'>
    {/* <p className=' text-xs'>Showing 1/73 of 73 Entries</p> */}
    <p className=' text-xs mt-4'>Legend:</p>
    <div className=' grid grid-cols-2 mt-2'>
      <div className=' w-full flex flex-col gap-2'>
        <div className=' flex items-center gap-2'>
          <div className=' h-4 aspect-square bg-red-500'></div>
          <p className=' text-xs text-zinc-400'>0 - 2 Hours</p>


        </div>
         <div className=' flex items-center gap-2'>
          <div className=' h-4 aspect-square bg-orange-500'></div>
          <p className=' text-xs text-zinc-400'>2 - 4 Hours</p>


        </div>

         <div className=' flex items-center gap-2'>
          <div className=' h-4 aspect-square bg-yellow-500'></div>
          <p className=' text-xs text-zinc-400'>4 - 6 Hours</p>


        </div>

        <div className=' flex items-center gap-2'>
          <div className=' h-4 aspect-square bg-green-500'></div>
          <p className=' text-xs text-zinc-400'>6 - 8 Hours</p>


        </div>

        <div className=' flex items-center gap-2'>
          <div className=' h-4 aspect-square bg-cyan-300'></div>
          <p className=' text-xs text-zinc-400'>Beyond 8 Hours</p>


        </div>
      </div>

      <div className=' w-full flex flex-col gap-2'>
        <div className=' flex items-center gap-2'>
          <div className=' h-4 aspect-square bg-cyan-500'></div>
          <p className=' text-xs text-zinc-400'>Beyond Hours / Days or 40 Hours/ Week</p>


        </div>

      
        {/* <div className=' flex items-center gap-2'>
          <div className=' h-4 aspect-square bg-indigo-500'></div>
          <p className=' text-xs text-zinc-400'>Above Hours / Days or 40 Hours/ Week</p>


        </div> */}

         {/* <div className=' flex items-center gap-2'>
          <div className=' h-4 aspect-square bg-indigo-500'></div>
          <p className=' text-xs text-zinc-400'>Unapplied Leave / WD or Holiday Leave</p>


        </div> */}

         <div className=' flex items-center gap-2'>
          <div className=' h-4 aspect-square bg-violet-500'></div>
          <p className=' text-xs text-zinc-400'>Wellness day</p>


        </div>

        <div className=' flex items-center gap-2'>
          <div className=' h-4 aspect-square bg-pink-500'></div>
          <p className=' text-xs text-zinc-400'>Leave</p>


        </div>

        <div className=' flex items-center gap-2'>
          <div className=' h-4 aspect-square bg-gray-400'></div>
          <p className=' text-xs text-zinc-400'>Events</p>


        </div>
      </div>

    </div>

  </div>
  )
}
