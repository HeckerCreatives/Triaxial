'use client'
import Button from '@/components/common/Button'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Undo2 } from 'lucide-react'
import Teamprojects from './Teamprojects'

export default function Teams() {
  const router = useRouter()
  const [dialog, setDialog] = useState(false)
  const [view, setView] = useState(false)

  return (
    <div className=' w-full flex flex-col gap-6 mt-[170px] h-full bg-secondary p-8'>
      {view === false ? (
        <>
        <p className=' text-2xl font-semibold text-zinc-100 w-full text-center'>Teams</p>
        <div className=' w-full max-w-[1520px] flex items-start justify-center gap-4 flex-wrap'>

          <div className=' relative w-[90%] md:max-w-[400px] h-[300px] group overflow-hidden'

          >
            <img src="/admin.webp" alt="" className=' relative z-0 w-full group-hover:scale-110 ease-in-out duration-300' />

           
            <div className=' absolute z-50 bottom-0 bg-gradient-to-t from-zinc-950 to-zinc-950/50 w-full flex items-center justify-between h-[90px] p-4'>
              <div className=' flex flex-col'>
                <p className=' text-zinc-100 text-xl font-semibold'>Team Name</p>
                <p className=' text-xs text-zinc-400'>Project Manager</p>

              </div>
                <Button onClick={() => setView(true)} name='Projects'/>
           
              
            </div>
          </div>

           <div className=' relative w-[90%] md:max-w-[400px] h-[300px] group overflow-hidden'

          >
            <img src="/hrtop.webp" alt="" className=' relative z-0 w-full group-hover:scale-110 ease-in-out duration-300' />

           
            <div className=' absolute z-50 bottom-0 bg-gradient-to-t from-zinc-950 to-zinc-950/50 w-full flex items-center justify-between h-[90px] p-4'>
              <div className=' flex flex-col'>
                <p className=' text-zinc-100 text-xl font-semibold'>Team Name</p>
                <p className=' text-xs text-zinc-400'>Project Manager</p>

              </div>

               <Button onClick={() => setView(true)} name='Projects'/>
             
              
            </div>
          </div>

          <div className=' relative w-[90%] md:max-w-[400px] h-[300px] group overflow-hidden'

          >
            <img src="/admin.webp" alt="" className=' relative z-0 w-full group-hover:scale-110 ease-in-out duration-300' />

           
            <div className=' absolute z-50 bottom-0 bg-gradient-to-t from-zinc-950 to-zinc-950/50 w-full flex items-center justify-between h-[90px] p-4'>
              <div className=' flex flex-col'>
                <p className=' text-zinc-100 text-xl font-semibold'>Team Name</p>
                <p className=' text-xs text-zinc-400'>Project Manager</p>

              </div>

                <Button onClick={() => setView(true)} name='Projects'/>
             
              
            </div>
          </div>

           <div className=' relative w-[90%] md:max-w-[400px] h-[300px] group overflow-hidden'

          >
            <img src="/hrtop.webp" alt="" className=' relative z-0 w-full group-hover:scale-110 ease-in-out duration-300' />

           
            <div className=' absolute z-50 bottom-0 bg-gradient-to-t from-zinc-950 to-zinc-950/50 w-full flex items-center justify-between h-[90px] p-4'>
              <div className=' flex flex-col'>
                <p className=' text-zinc-100 text-xl font-semibold'>Team Name</p>
                <p className=' text-xs text-zinc-400'>Project Manager</p>

              </div>

              <Button onClick={() => setView(true)} name='Projects'/>
             
            </div>
          </div>

        </div>
        </>
      ) : (
        <div className=' w-full flex flex-col'>
        <button onClick={() => setView(false)} className=' w-fit text-zinc-100 bg-primary p-1 px-2 rounded-sm text-xs flex items-center gap-1'><Undo2 size={15}/>Go Back</button>
        <p className=' text-lg font-semibold text-red-700 mt-4'>Team Name</p>
        <Teamprojects/>
        </div>
      )}
        
    </div>
  )
}
