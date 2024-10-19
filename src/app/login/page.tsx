"use client"
import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import toast, { Toaster } from "react-hot-toast";
import { ToastError, ToastSuccess } from '@/components/common/Toast';
import { Eye, EyeOff, LogIn, Target } from 'lucide-react';
import { useRouter } from 'next/navigation';
import axios, { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema, login } from '@/schema/schema';



export default function Login() {
    const [show, setShow] = useState('password')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    // const login = () => {
    //     if(email === 'hr@gmail.com' && password === 'dev123'){
    //         router.push('/hr/dashboard')
    //         ToastSuccess('Success')

    //     } else if (email === 'pm@gmail.com' && password === 'dev123'){
    //         router.push('/pm/dashboard')
    //         ToastSuccess('Success')

    //     }else if (email === 'finance@gmail.com' && password === 'dev123'){
    //         router.push('/finance/dashboard')
    //         ToastSuccess('Success')

    //     }else if (email === 'employee@gmail.com' && password === 'dev123'){
    //         router.push('/employee/dashboard')
    //         ToastSuccess('Success')

    //     } else {
    //         ToastError('Invalid Credentials')
    //     }
    // }

    const loginUser = async () => {
        setLoading(true)
        try {
            const request = axios.get(`${process.env.NEXT_API_URL}/auth/login?username=${username}&password=${password}`,
                {
                    withCredentials: true,
                    headers: {
                    'Content-Type': 'application/json'
                    }
                }
            )

         const response = await toast.promise(request, {
             loading: 'Log in account....',
             success: `Successfully loged in`,
             error: 'Error while logging your account',
         });

        if (response.data.data.auth === 'user' ){
            toast.success('Successfully logged in')
            router.push('/user/dashboard')
            setLoading(false)


        } else if(response.data.data.auth === 'superadmin'){
            toast.success('Successfully logged in')
            router.push('/superadmin/dashboard')
            setLoading(false)
        } else if(response.data.data.auth === 'admin'){
            toast.success('Successfully logged in')
            router.push('/admin/dashboard')
            setLoading(false)
        } else {
            toast.error(response.data.data)
            setLoading(false)

        }
            
        } catch (error) {
            setLoading(false)

             if (axios.isAxiosError(error)) {
                    const axiosError = error as AxiosError<{ message: string, data: string }>;
                    if (axiosError.response && axiosError.response.status === 401) {
                        toast.error(`${axiosError.response.data.data}`)     
                    }

                    if (axiosError.response && axiosError.response.status === 400) {
                        toast.error(`${axiosError.response.data.data}`)     
                            
                    }

                    if (axiosError.response && axiosError.response.status === 402) {
                        toast.error(`${axiosError.response.data.data}`)          
                                
                    }

                    if (axiosError.response && axiosError.response.status === 403) {
                        toast.error(`${axiosError.response.data.data}`)              
                        
                    }

                    if (axiosError.response && axiosError.response.status === 404) {
                        toast.error(`${axiosError.response.data.data}`)             
                    }
            } 
            
        }
    }

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm<LoginSchema>({
        resolver: zodResolver(login),
      });
    
    const onSubmit = async (data: LoginSchema) => {
        setLoading(true)
        try {
            const request = axios.get(`${process.env. NEXT_PUBLIC_API_URL}/auth/login?email=${data.email}&password=${data.password}`,
                {
                    withCredentials: true,
                    headers: {
                    'Content-Type': 'application/json'
                    }
                }
            )

         const response = await toast.promise(request, {
             loading: 'Log in account....',
             success: `Successfully loged in`,
             error: 'Error while logging your account',
         });

        if (response.data.data.auth === 'employee' ){
            reset()
            router.push('/employee/dashboard')
            setLoading(false)
        }else if (response.data.data.auth === 'manager'){
            reset()
            router.push('/pm/dashboard')
            setLoading(false)
        }else if (response.data.data.auth === 'hr'){
            reset()
            router.push('/hr/dashboard')
            setLoading(false)
        }else if (response.data.data.auth === 'finance'){
            reset()
            router.push('/finance/dashboard')
            setLoading(false)
        } else{
            
        }


            
        } catch (error) {
            setLoading(false)

             if (axios.isAxiosError(error)) {
                    const axiosError = error as AxiosError<{ message: string, data: string }>;
                    if (axiosError.response && axiosError.response.status === 401) {
                        toast.error(`${axiosError.response.data.data}`)     
                    }

                    if (axiosError.response && axiosError.response.status === 400) {
                        toast.error(`${axiosError.response.data.data}`)     
                            
                    }

                    if (axiosError.response && axiosError.response.status === 402) {
                        toast.error(`${axiosError.response.data.data}`)          
                                
                    }

                    if (axiosError.response && axiosError.response.status === 403) {
                        toast.error(`${axiosError.response.data.data}`)              
                        
                    }

                    if (axiosError.response && axiosError.response.status === 404) {
                        toast.error(`${axiosError.response.data.data}`)             
                    }
            } 
            
        }
    };


  return (
    <div className=' w-full h-screen flex items-center justify-center bg-zinc-800 p-4'
    style={{backgroundImage: `url('/bg2.png')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat:"no-repeat"}}
    
    >
        <div className=' w-full max-w-[1000px] h-[500px] bg-white rounded-2xl overflow-hidden'>
            <div className=' w-full h-full grid grid-cols-1 lg:grid-cols-2'>
                <div className=' w-full h-full p-6 flex flex-col gap-2 items-center justify-center'>
                    <div className=' flex items-center gap-2'>
                        <img src="/logo.webp" alt="" width={60} />
                        <div className=' flex flex-col'>
                            <h2 className=' text-xl font-bold uppercase tracking-widest'>Triaxial</h2>
                            <h2 className=' text-lg font-bold uppercase'>Consulting</h2>
                        </div>
                    </div>
                   
                    {/* <p className=' text-sm text-zinc-600 w-[70%] text-center'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere </p> */}

                    <form onSubmit={handleSubmit(onSubmit)} className=' w-full flex flex-col px-6 gap-4 mt-4'>

                        <div className=' flex flex-col'>
                            <label htmlFor="" className=' text-sm text-zinc-400'>Email*</label>
                            <Input type='text' placeholder='Email' className=' bg-zinc-200 rounded-none' {...register('email')}/>
                            {errors.email && <p className=' text-[.6em] text-red-500'>{errors.email.message}</p>}

                        </div>

                        

                        <div className=' flex flex-col'>
                            <label htmlFor="" className=' text-sm text-zinc-400'>Password*</label>
                            <div className=" relative flex items-center">
                            
                                <Input type={show} placeholder='Password' className=' bg-zinc-200 rounded-none' {...register('password')}/>
                                {show === 'password' ?  <EyeOff onClick={() => setShow('text')} size={20} className=" text-zinc-950 absolute cursor-pointer right-5 top-5 z-50 transform -translate-y-1/2"/> :  <Eye onClick={() => setShow('password')} size={20} className=" text-zinc-950 absolute cursor-pointer right-5 top-5 z-50 transform -translate-y-1/2"/> }
                            
                            </div>
                            {errors.password && <p className=' text-[.6em] text-red-500'>{errors.password.message}</p>}

                        </div>
                        
                        <div className=' flex items-center gap-2'>
                            <Checkbox />
                            <p className=' text-sm text-zinc-500'>Remember me</p>

                        </div>

                        <div className=' w-full flex items-center justify-center mt-8'>
                            
                            <button disabled={loading} className=' px-12 py-3 bg-red-600 rounded-full text-zinc-100 text-sm flex items-center gap-2 justify-center'>
                                {loading == true && (
                                    <div className=' spinner2'>

                                    </div>
                                )}
                                Sign in</button>
                            

                        </div>

                    </form>

                     

                         <div className=' p-1 text-sm mt-8 flex items-center justify-center w-fit'>
                            <a href="/login/superadmin" className=' flex items-center gap-2 text-red-500'>Superadmin? <LogIn size={15}/></a>

                        </div>
                </div>
                <div className=' w-full h-full bg-zinc-600 hidden lg:block'
                style={{backgroundImage: `url('/admin.webp')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat:"no-repeat"}}
                
                >

                    <div className=' relative w-full h-full bg-red-600/50 flex flex-col gap-4 items-center justify-center p-6'>
                        <div className=' flex items-center'>
                            <img src="/logowhite.webp" alt="" width={70} />
                            {/* <h2 className=' text-white text-lg font-bold'>ADMINISTRATOR</h2> */}
                            
                        </div>
                        <h2 className=' text-white text-lg font-bold'>COMPLEX PROBLEMS RESOLVED SIMPLY</h2>
                        {/* <p className=' text-xs text-center text-zinc-100'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est eaque neque aliquid sint, distinctio incidunt quaerat, perferendis deleniti iure deserunt unde sed obcaecati similique doloremque corporis, ratione voluptatum veritatis velit.</p> */}

                        <a href="https://www.triaxial.au/" className=' text-zinc-100 text-xs absolute bottom-4 right-4'>https://www.triaxial.au/</a>
                    </div>

                </div>
            </div>
        </div>
    </div>
  )
}
