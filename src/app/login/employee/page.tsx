"use client"
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { HardHat } from 'lucide-react'
import toast, { Toaster } from "react-hot-toast";
import { ToastSuccess } from '@/components/common/Toast'
import { Eye, EyeOff } from 'lucide-react'

export default function page() {
    const [show, setShow] = useState('password')
  return (
    <div className=' w-full h-screen flex items-center justify-center bg-zinc-300 overflow-y-auto'
    style={{backgroundImage: `url('/employeebg.png')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat:"no-repeat"}}
    
    >
        <div className=' h-screen w-full flex flex-col gap-4 items-center justify-center max-w-[600px] lg:bg-red-600/50 p-4 md:p-16'>

            <div className=' flex items-center gap-2 text-white mb-10'>
                        <img src="/logowhite.webp" alt="" width={60} />
                        <div className=' flex flex-col'>
                            <h2 className=' text-xl font-bold uppercase tracking-widest'>Triaxial</h2>
                            <h2 className=' text-lg font-bold uppercase'>Consulting</h2>
                        </div>
                    </div>
           

            <div className=' w-[80%] h-auto bg-white rounded-3xl flex flex-col items-center'>
                <div className=' relative p-4 flex items-center justify-center text-white bg-red-500 rounded-2xl -translate-y-10'>
                    <HardHat size={50}/>
                </div>
                <p className=' text-zinc-900 uppercase text-lg font-semibold border-b-4 border-red-600 px-2'>Employee Login</p>

                <form action="" className=' w-full flex flex-col gap-4 mt-4 p-4'>

                        <div className=' flex flex-col'>
                            <label htmlFor="" className=' text-sm text-zinc-600'>Email*</label>
                            <Input type='text' placeholder='Username' className=' bg-zinc-200 rounded-none'/>
                        </div>

                        <div className=' flex flex-col'>
                            <label htmlFor="" className=' text-sm text-zinc-600'>Password*</label>
                            <div className=" relative flex items-center">
                                <Input type={show} size={40} placeholder='Password' className=' bg-zinc-200 rounded-none'/>
                                {show === 'password' ?  <EyeOff onClick={() => setShow('text')} size={20} className=" text-zinc-950 absolute cursor-pointer right-5 top-5 z-50 transform -translate-y-1/2"/> :  <Eye onClick={() => setShow('password')} size={20} className=" text-zinc-950 absolute cursor-pointer right-5 top-5 z-50 transform -translate-y-1/2"/> }
                            </div>
                        </div>
                        
                        <div className=' flex items-center gap-2'>
                            <Checkbox />
                            <p className=' text-sm text-zinc-500'>Remember me</p>

                        </div>

                    </form>

                    <div className=' w-full flex items-center justify-center mb-6 mt-4'>
                        <a href="/employee/dashboard">
                            <button onClick={() => ToastSuccess('Successfully login')} className=' px-10 py-2 bg-red-600  rounded-full text-zinc-100 text-sm'>Sign in</button>
                        </a>
                    </div>

            </div>
        </div>
    </div>
  )
}
