"use client"
import { ToastSuccess } from '@/components/common/Toast';
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import toast, { Toaster } from "react-hot-toast";
import { Eye, EyeOff } from 'lucide-react';


export default function page() {
    const [show, setShow] = useState('password')

  return (
    <div className=' relative w-full h-screen flex items-center justify-center bg-zinc-300 overflow-y-auto py-4'
    style={{backgroundImage: `url('/hrbg2.png')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat:"no-repeat"}}
    
    >

        <div className=' absolute top-0 w-full h-[50%] bg-red-700/50'>

        </div>

        <div className=' relative z-20 w-[95%] md:w-full flex flex-col gap-8 max-w-[500px] bg-white overflow-hidden'>
           <div className="relative w-full h-[150px] flex items-center justify-center">
                {/* Blurred Background Layer */}
                <div
                    className="absolute inset-0 bg-zinc-600 blur-[2px]"
                    style={{
                    backgroundImage: `url('/hrtop.webp')`,
                    backgroundSize: "cover",
                    backgroundPosition: "top",
                    backgroundRepeat: "no-repeat",
                    }}
                ></div>

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-zinc-950/70"></div>

                {/* Unblurred Content */}
                <div className="relative z-20 flex items-center gap-2 text-zinc-100">
                    <img src="/logo.webp" alt="" width={60} />
                    <div className="flex flex-col">
                    <h2 className="text-xl font-bold uppercase tracking-widest">Triaxial</h2>
                    <h2 className="text-lg font-bold uppercase">Consulting</h2>
                    </div>
                </div>
            </div>

           
            <form action="" className=' w-full flex flex-col gap-4 p-6'>
                <div className=' flex flex-col mb-4'>
                     <h2 className=' uppercase text-lg font-bold text-zinc-700'>Hr Finance Staff login</h2>
                    <div className=' w-[200px] h-1 bg-red-600'></div>
                </div>
               
                        <div className=' flex flex-col'>
                            <label htmlFor="" className=' text-sm text-zinc-400'>Email*</label>
                            <Input type='text' placeholder='Username' className=' bg-zinc-200 rounded-none'/>
                        </div>

                        <div className=' flex flex-col'>
                            <label htmlFor="" className=' text-sm text-zinc-400'>Password*</label>
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

                    <div className=' w-full flex items-center justify-center mb-8'>
                        <a href="/hr/dashboard">
                            <button onClick={() => ToastSuccess('Successfully login')} className=' px-12 py-2 bg-red-600 rounded-full text-zinc-100 text-sm'>Sign in</button>
                        </a>
                    </div>
        </div>
                    
    </div>
  )
}
