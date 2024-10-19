import React from 'react'

export default function Card(prop: any) {
  return (
    <div className=' h-[116px] flex items-center justify-between gap-4 bg-secondary p-6 md:w-[300px] w-full'>
        <div className=' w-fit h-full flex items-center justify-center'>
        {prop.icon}
        </div>
        <div className=' flex flex-col items-end justify-center'>
            <p className=' uppercase text-xs text-zinc-100/40'>{prop.name}</p>
            <div className=' flex items-center gap-2'>
              <h2 className=' text-lg font-semibold text-zinc-400'>{prop.value}</h2>
              <h2 className=' text-lg font-semibold text-zinc-100'>{prop.value2}</h2>
            </div>
        </div>
    </div>
  )
}
