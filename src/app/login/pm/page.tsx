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
    <div className=' w-full h-screen flex items-center justify-center bg-zinc-300'
    style={{backgroundImage: `url('/pmbg.png')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat:"no-repeat"}}
    >
        <div className=' w-full p-8 bg-red-600/50 flex items-center justify-center'>
            <div className=' w-full max-w-[950px] h-[500px] bg-white overflow-hidden'>
                <div className=' w-full h-full grid grid-cols-1 lg:grid-cols-2'>
                    <div className=' w-full h-full bg-zinc-600 hidden lg:block'
                        style={{backgroundImage: `url('/pm.webp')`, backgroundSize: "cover", backgroundPosition: "left", backgroundRepeat:"no-repeat"}}
                    
                    >

                    </div>
                    <div className=' w-full h-full p-6 flex flex-col gap-4 items-center justify-center'>
                        <div className=' flex items-center gap-2'>
                            <img src="/logo.webp" alt="" width={80} />
                            <div className=' flex flex-col'>
                                <h2 className=' text-3xl font-bold uppercase tracking-widest'>Triaxial</h2>
                                <h2 className=' text-2xl font-bold uppercase'>Consulting</h2>
                            </div>
                        </div>

                        <form action="" className=' w-full flex flex-col gap-4 mt-4'>

                            <div className=' flex flex-col mb-4'>
                                <h2 className=' uppercase text-xl text-zinc-700 font-semibold'>Project Manager login</h2>
                                <div className=' w-[200px] h-1 bg-red-600'></div>
                            </div>

                            <div className=' flex flex-col'>
                                <label htmlFor="">Email*</label>
                                <Input type='text' placeholder='Username' className=' bg-zinc-200 rounded-none'/>
                            </div>

                            <div className=' flex flex-col'>
                                <label htmlFor="">Password*</label>
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

                         <div className=' w-full flex items-center justify-center mt-4'>
                            <a href="/pm/dashboard">
                                <button onClick={() => ToastSuccess('Successfully login')} className=' px-6 py-2 bg-red-600 w-[200px] rounded-full text-zinc-100 text-lg'>Sign in</button>
                            </a>
                            </div>
                    </div>
                
                </div>
            </div>
        </div>
        
    </div>
  )
}
