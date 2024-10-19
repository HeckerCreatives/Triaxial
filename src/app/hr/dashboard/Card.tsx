import React from 'react'

export default function Card(prop: any) {
  return (
    <div className=' h-auto grid grid-cols-2 gap-4 bg-secondary p-6 md:w-[240px] w-full'>
        <div className=' w-full h-full flex items-center justify-center'>
        {prop.icon}
        </div>
        <div className=' flex flex-col justify-center'>
            <p className=' uppercase text-zinc-100/40'>{prop.name}</p>
            <h2 className=' text-xl font-semibold text-white'>{prop.value}</h2>
        </div>
    </div>
  )
}
