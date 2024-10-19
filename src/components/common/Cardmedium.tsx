import React from 'react'

export default function Cardmedium(prop: any) {
  return (
    <div className=' flex items-center justify-center gap-4 bg-secondary p-4 md:w-[250px] h-[100px] w-full'>
        <div className=' h-full flex items-center justify-center p-4'>
        {prop.icon}
        </div>
        <div className=' flex flex-col gap-2 justify-center'>
            <p className=' uppercase text-xs text-zinc-100/40'>{prop.name}</p>
            <h2 className=' text-sm font-semibold text-white'>{prop.value}</h2>
        </div>
    </div>
  )
}
