'use client'
import React, { useState } from 'react'


import Breadcrumbdb from '@/components/common/Breadcrumb'
import EmployeeLayout from '@/components/layout/EmployeeLayout'
import { Input } from '@/components/ui/input'
import { Eye, EyeOff } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { changepassword, Changepassword } from '@/schema/schema'
import axios, { AxiosError } from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import HrLayout from '@/components/layout/HrLayout'


export default function page() {
  const [shownew, setShownew] = useState('password')
  const [showconfirm, setShowconfirm] = useState('password')
  const [showc, setShowc] = useState('password')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    trigger,
    formState: { errors },
  } = useForm<Changepassword>({
    resolver: zodResolver(changepassword),
  });

  const changePasswordUser = async (data: Changepassword) => {
    setLoading(true)
    try {
         const request = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/changepassword`,{
          currentpw: data.cpassword,
          newpw: data.newpassword
        },{
            withCredentials:true,
            headers:{
            'Content-Type': 'application/json',
            }
        })

        const response = await toast.promise(request, {
            loading: 'Upadating password....',
            success: `Successfully updated`,
            error: 'Error while updating password',
        });
        reset()

        if( response.data.message === 'success'){
            setLoading(false)
            router.push('?state=true')
        }
        
    } catch (error) {
         setLoading(false)
       if (axios.isAxiosError(error)) {
                    const axiosError = error as AxiosError<{ message: string, data: string }>;
                    if (axiosError.response && axiosError.response.status === 401) {
                        toast.error(`${axiosError.response.data.data}`) 
                        router.push('/')    
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

  console.log(errors)

  
  return (
    <HrLayout>
      <div className=' p-6 top-0 left-0 w-full h-[100px] bg-zinc-800'
      style={{backgroundImage: `url('/dbbg.png')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat:"no-repeat"}}
      >
        <Breadcrumbdb page={'Settings'}/>
      </div>

      <div className=' w-full p-12'>
        <form onSubmit={handleSubmit(changePasswordUser)} className=' flex flex-col gap-2 max-w-[400px] w-full bg-secondary h-auto rounded-md p-8 text-white text-xs'>
          <p className='text-sm font-semibold'>Change Password</p>

          <label htmlFor="" className=' mt-6'>Current password</label>
            <div className=' relative w-full'>
                <Input type={showc} className=' text-xs h-[35px] bg-primary' placeholder='Current password' {...register('cpassword')} />
                    {showc === 'password' ? 
                    (
                    <p onClick={() => setShowc('text')} className=' absolute right-1 top-1 bg-slate-300 p-1 rounded-sm text-black cursor-pointer'><EyeOff size={15}/></p>
                    ):(
                    <p onClick={() => setShowc('password')} className=' absolute right-1 top-1 bg-slate-300 p-1 rounded-sm text-black cursor-pointer'><Eye size={15}/></p>
                    )}
                    
                </div>
                {errors.newpassword && <p className=' text-[.6em] text-red-400'>{errors.newpassword.message}</p>}
        
          <label htmlFor="" className=''>New password</label>

            <div className=' relative w-full'>
                <Input type={shownew} className=' text-xs h-[35px] bg-primary' placeholder='New password' {...register('newpassword')} />
                    {shownew === 'password' ? 
                    (
                    <p onClick={() => setShownew('text')} className=' absolute right-1 top-2 bg-slate-300 p-1 rounded-sm text-black cursor-pointer'><EyeOff size={15}/></p>
                    ):(
                    <p onClick={() => setShownew('password')} className=' absolute right-1 top-1 bg-slate-300 p-1 rounded-sm text-black cursor-pointer'><Eye size={15}/></p>
                    )}
                    
                </div>
                {errors.newpassword && <p className=' text-[.6em] text-red-400'>{errors.newpassword.message}</p>}

                <label htmlFor="" className=' text-zinc-300 '>Confirm password</label>
                <div className=' relative w-full'>
                <Input type={showconfirm} className=' text-xs h-[35px] bg-primary' placeholder='Confirm password' {...register('confirmpassword')} />

                    {showconfirm === 'password' ? 
                        (
                        <p onClick={() => setShowconfirm('text')} className=' absolute right-1 top-1 bg-slate-300 p-1 rounded-sm text-black cursor-pointer'><EyeOff size={15}/></p>
                        ):(
                        <p onClick={() => setShowconfirm('password')} className=' absolute right-1 top-1 bg-slate-300 p-1 rounded-sm text-black cursor-pointer'><Eye size={15}/></p>
                    )}
                        
                </div>
              {errors.confirmpassword && <p className=' text-[.6em] text-red-400'>{errors.confirmpassword.message}</p>}

              <button className=' bg-red-700 text-zinc-100 px-4 py-2 text-xs rounded-sm mt-8'>Save</button>



        </form>
      </div>

      

    </HrLayout>
  )
}
