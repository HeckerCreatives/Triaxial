import { Slides } from '@/types/data';
import React, { useEffect, useState } from 'react'

export default function Loader() {

  return (
    <div className=' relative w-full h-screen bg-secondary flex flex-col gap-4 items-center justify-center'
    
    >
      
         <div className=' flex items-center gap-2 text-white'>
            <img src="/logo.webp" alt="" width={60} />
            <div className=' flex flex-col'>
                <h2 className=' text-xl font-bold uppercase tracking-widest'>Triaxial</h2>
                <h2 className=' text-lg font-bold uppercase'>Consulting</h2>
            </div>
        </div>
        <div className=' loader w-[150px]'>

        </div>

    </div>
  )
}
