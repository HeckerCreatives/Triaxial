"use client"
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'

export default function Authcheck() {
    const router = useRouter()
    
    useEffect(() => {
        const getList = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/getuserdetails`,{
                    withCredentials: true,
                    headers: {
                      'Content-Type': 'application/json'
                      }
                  })
            
                 
            } catch (error) {
                
                if (axios.isAxiosError(error)) {
                    const axiosError = error as AxiosError<{ message: string, data: string }>;
                    if (axiosError.response && axiosError.response.status === 401) {
                        toast.error(`${axiosError.response.data.data}`) 
                        router.push('/')    
                    }
                    
                }
            }
            
           
          }
          getList()
       
          
     },[])
    
}
