
'use client'
import { ToastSuccess, ToastError } from "@/components/common/Toast";
import axios, { AxiosError } from 'axios'
import { useEffect } from "react";
import { JobComponent, ManageUser, Project, Team, Event } from "@/types/interface";
import toast from "react-hot-toast";


// const router = useRouter()

//auth

export const autoLogin = () => {

    useEffect(() => {
         const autologin = async () => {
             try {
                 const response = await axios.get(``,{
                      withCredentials: true,
                         headers: {
                         'Content-Type': 'application/json',
                     }
                    
                 })
               
             } catch (error) {
                 if (axios.isAxiosError(error)) {
                         const axiosError = error as AxiosError<{ message: string, data: string }>;
                         if (axiosError.response && axiosError.response.status === 401) {
                             ToastError( axiosError.response.data.data)
                             
                         }

                         if (axiosError.response && axiosError.response.status === 400) {
                             ToastError( axiosError.response.data.data)

                             
                         }

                         if (axiosError.response && axiosError.response.status === 402) {
                             ToastError( axiosError.response.data.data)

                    
                         }

                         if (axiosError.response && axiosError.response.status === 403) {
                            
                             ToastError( axiosError.response.data.data)
                            
                         }

                         if (axiosError.response && axiosError.response.status === 404) {
                             ToastError( axiosError.response.data.data)
                         }
                 } 
             }
         }
         autologin()
   },[])
}

export const login = async () => {

             try {
                 const requestPromise = axios.get(`http://localhost:5001/auth/login`, {
                    withCredentials: true,
                    headers: {
                    'Content-Type': 'application/json',
                    },
                });

                // Pass the promise to toast.promise
                const response = await toast.promise(requestPromise, {
                    loading: 'Loading ...',
                    success: 'Success!',
                    error: 'Failed',
                });

                 if( response.data.message === 'success'){
                    ToastSuccess(response.data.data)
                 }

                 if( response.data.message === 'failed'){
                    ToastSuccess(response.data.data)
                 }
               
             } catch (error) {
                 if (axios.isAxiosError(error)) {
                         const axiosError = error as AxiosError<{ message: string, data: string }>;
                         if (axiosError.response && axiosError.response.status === 401) {
                             ToastError( axiosError.response.data.data)
                             
                         }

                         if (axiosError.response && axiosError.response.status === 400) {
                             ToastError( axiosError.response.data.data)

                             
                         }

                         if (axiosError.response && axiosError.response.status === 402) {
                             ToastError( axiosError.response.data.data)

                    
                         }

                         if (axiosError.response && axiosError.response.status === 403) {
                            
                             ToastError( axiosError.response.data.data)
                            
                         }

                         if (axiosError.response && axiosError.response.status === 404) {
                             ToastError( axiosError.response.data.data)
                         }
                 } 
             }
}

export const logout = async () => {

             try {
                 const response = await axios.get(``,{
                      withCredentials: true,
                         headers: {
                         'Content-Type': 'application/json',
                     }
                    
                 })
                 if( response.data.message === 'success'){
                    ToastSuccess(response.data.data)
                 }

                 if( response.data.message === 'failed'){
                    ToastSuccess(response.data.data)
                 }
               
             } catch (error) {
                 if (axios.isAxiosError(error)) {
                         const axiosError = error as AxiosError<{ message: string, data: string }>;
                         if (axiosError.response && axiosError.response.status === 401) {
                             ToastError( axiosError.response.data.data)
                             
                         }

                         if (axiosError.response && axiosError.response.status === 400) {
                             ToastError( axiosError.response.data.data)

                             
                         }

                         if (axiosError.response && axiosError.response.status === 402) {
                             ToastError( axiosError.response.data.data)

                    
                         }

                         if (axiosError.response && axiosError.response.status === 403) {
                            
                             ToastError( axiosError.response.data.data)
                            
                         }

                         if (axiosError.response && axiosError.response.status === 404) {
                             ToastError( axiosError.response.data.data)
                         }
                 } 
             }
}

//auth end



//admin

export const createJobComponent = async ( jobcomponent: JobComponent) => {

             try {
                 const response = await axios.get(``,{
                      withCredentials: true,
                         headers: {
                         'Content-Type': 'application/json',
                     }
                    
                 })
                 if( response.data.message === 'success'){
                    ToastSuccess(response.data.data)
                 }

                 if( response.data.message === 'failed'){
                    ToastSuccess(response.data.data)
                 }
               
             } catch (error) {
                 if (axios.isAxiosError(error)) {
                         const axiosError = error as AxiosError<{ message: string, data: string }>;
                         if (axiosError.response && axiosError.response.status === 401) {
                             ToastError( axiosError.response.data.data)
                             
                         }

                         if (axiosError.response && axiosError.response.status === 400) {
                             ToastError( axiosError.response.data.data)

                             
                         }

                         if (axiosError.response && axiosError.response.status === 402) {
                             ToastError( axiosError.response.data.data)

                    
                         }

                         if (axiosError.response && axiosError.response.status === 403) {
                            
                             ToastError( axiosError.response.data.data)
                            
                         }

                         if (axiosError.response && axiosError.response.status === 404) {
                             ToastError( axiosError.response.data.data)
                         }
                 } 
             }
}

export const createJob = async ( project: Project) => {

             try {
                 const response = await axios.get(``,{
                      withCredentials: true,
                         headers: {
                         'Content-Type': 'application/json',
                     }
                    
                 })
                 if( response.data.message === 'success'){
                    ToastSuccess(response.data.data)
                 }

                 if( response.data.message === 'failed'){
                    ToastSuccess(response.data.data)
                 }
               
             } catch (error) {
                 if (axios.isAxiosError(error)) {
                         const axiosError = error as AxiosError<{ message: string, data: string }>;
                         if (axiosError.response && axiosError.response.status === 401) {
                             ToastError( axiosError.response.data.data)
                             
                         }

                         if (axiosError.response && axiosError.response.status === 400) {
                             ToastError( axiosError.response.data.data)

                             
                         }

                         if (axiosError.response && axiosError.response.status === 402) {
                             ToastError( axiosError.response.data.data)

                    
                         }

                         if (axiosError.response && axiosError.response.status === 403) {
                            
                             ToastError( axiosError.response.data.data)
                            
                         }

                         if (axiosError.response && axiosError.response.status === 404) {
                             ToastError( axiosError.response.data.data)
                         }
                 } 
             }
}

export const createTeam = async ( team: Team) => {

             try {
                 const response = await axios.get(``,{
                      withCredentials: true,
                         headers: {
                         'Content-Type': 'application/json',
                     }
                    
                 })
                 if( response.data.message === 'success'){
                    ToastSuccess(response.data.data)
                 }

                 if( response.data.message === 'failed'){
                    ToastSuccess(response.data.data)
                 }
               
             } catch (error) {
                 if (axios.isAxiosError(error)) {
                         const axiosError = error as AxiosError<{ message: string, data: string }>;
                         if (axiosError.response && axiosError.response.status === 401) {
                             ToastError( axiosError.response.data.data)
                             
                         }

                         if (axiosError.response && axiosError.response.status === 400) {
                             ToastError( axiosError.response.data.data)

                             
                         }

                         if (axiosError.response && axiosError.response.status === 402) {
                             ToastError( axiosError.response.data.data)

                    
                         }

                         if (axiosError.response && axiosError.response.status === 403) {
                            
                             ToastError( axiosError.response.data.data)
                            
                         }

                         if (axiosError.response && axiosError.response.status === 404) {
                             ToastError( axiosError.response.data.data)
                         }
                 } 
             }
}

export const createEmployee = async ( employee: ManageUser) => {

             try {
                 const response = await axios.get(``,{
                      withCredentials: true,
                         headers: {
                         'Content-Type': 'application/json',
                     }
                    
                 })
                 if( response.data.message === 'success'){
                    ToastSuccess(response.data.data)
                 }

                 if( response.data.message === 'failed'){
                    ToastSuccess(response.data.data)
                 }
               
             } catch (error) {
                 if (axios.isAxiosError(error)) {
                         const axiosError = error as AxiosError<{ message: string, data: string }>;
                         if (axiosError.response && axiosError.response.status === 401) {
                             ToastError( axiosError.response.data.data)
                             
                         }

                         if (axiosError.response && axiosError.response.status === 400) {
                             ToastError( axiosError.response.data.data)

                             
                         }

                         if (axiosError.response && axiosError.response.status === 402) {
                             ToastError( axiosError.response.data.data)

                    
                         }

                         if (axiosError.response && axiosError.response.status === 403) {
                            
                             ToastError( axiosError.response.data.data)
                            
                         }

                         if (axiosError.response && axiosError.response.status === 404) {
                             ToastError( axiosError.response.data.data)
                         }
                 } 
             }
}

export const createProjectManager = async ( pm: ManageUser) => {

             try {
                 const response = await axios.post(``,{
                
                 },{
                      withCredentials: true,
                         headers: {
                         'Content-Type': 'application/json',
                     }
                    
                 })
                 if( response.data.message === 'success'){
                    ToastSuccess(response.data.data)
                 }

                 if( response.data.message === 'failed'){
                    ToastSuccess(response.data.data)
                 }
               
             } catch (error) {
                 if (axios.isAxiosError(error)) {
                         const axiosError = error as AxiosError<{ message: string, data: string }>;
                         if (axiosError.response && axiosError.response.status === 401) {
                             ToastError( axiosError.response.data.data)
                             
                         }

                         if (axiosError.response && axiosError.response.status === 400) {
                             ToastError( axiosError.response.data.data)

                             
                         }

                         if (axiosError.response && axiosError.response.status === 402) {
                             ToastError( axiosError.response.data.data)

                    
                         }

                         if (axiosError.response && axiosError.response.status === 403) {
                            
                             ToastError( axiosError.response.data.data)
                            
                         }

                         if (axiosError.response && axiosError.response.status === 404) {
                             ToastError( axiosError.response.data.data)
                         }
                 } 
             }
}

export const createFinanceStaff = async ( finance: ManageUser) => {

             try {
                 const response = await axios.post(``,{
                
                 },{
                      withCredentials: true,
                         headers: {
                         'Content-Type': 'application/json',
                     }
                    
                 })
                 if( response.data.message === 'success'){
                    ToastSuccess(response.data.data)
                 }

                 if( response.data.message === 'failed'){
                    ToastSuccess(response.data.data)
                 }
               
             } catch (error) {
                 if (axios.isAxiosError(error)) {
                         const axiosError = error as AxiosError<{ message: string, data: string }>;
                         if (axiosError.response && axiosError.response.status === 401) {
                             ToastError( axiosError.response.data.data)
                             
                         }

                         if (axiosError.response && axiosError.response.status === 400) {
                             ToastError( axiosError.response.data.data)

                             
                         }

                         if (axiosError.response && axiosError.response.status === 402) {
                             ToastError( axiosError.response.data.data)

                    
                         }

                         if (axiosError.response && axiosError.response.status === 403) {
                            
                             ToastError( axiosError.response.data.data)
                            
                         }

                         if (axiosError.response && axiosError.response.status === 404) {
                             ToastError( axiosError.response.data.data)
                         }
                 } 
             }
}

export const createHr = async ( hr: ManageUser) => {

             try {
                 const response = await axios.post(``,{
                
                 },{
                      withCredentials: true,
                         headers: {
                         'Content-Type': 'application/json',
                     }
                    
                 })
                 if( response.data.message === 'success'){
                    ToastSuccess(response.data.data)
                 }

                 if( response.data.message === 'failed'){
                    ToastSuccess(response.data.data)
                 }
               
             } catch (error) {
                 if (axios.isAxiosError(error)) {
                         const axiosError = error as AxiosError<{ message: string, data: string }>;
                         if (axiosError.response && axiosError.response.status === 401) {
                             ToastError( axiosError.response.data.data)
                             
                         }

                         if (axiosError.response && axiosError.response.status === 400) {
                             ToastError( axiosError.response.data.data)

                             
                         }

                         if (axiosError.response && axiosError.response.status === 402) {
                             ToastError( axiosError.response.data.data)

                    
                         }

                         if (axiosError.response && axiosError.response.status === 403) {
                            
                             ToastError( axiosError.response.data.data)
                            
                         }

                         if (axiosError.response && axiosError.response.status === 404) {
                             ToastError( axiosError.response.data.data)
                         }
                 } 
             }
}

export const createEvent = async ( event: Event) => {

             try {
                 const response = await axios.post(``,{
                
                 },{
                      withCredentials: true,
                         headers: {
                         'Content-Type': 'application/json',
                     }
                    
                 })
                 if( response.data.message === 'success'){
                    ToastSuccess(response.data.data)
                 }

                 if( response.data.message === 'failed'){
                    ToastSuccess(response.data.data)
                 }
               
             } catch (error) {
                 if (axios.isAxiosError(error)) {
                         const axiosError = error as AxiosError<{ message: string, data: string }>;
                         if (axiosError.response && axiosError.response.status === 401) {
                             ToastError( axiosError.response.data.data)
                             
                         }

                         if (axiosError.response && axiosError.response.status === 400) {
                             ToastError( axiosError.response.data.data)

                             
                         }

                         if (axiosError.response && axiosError.response.status === 402) {
                             ToastError( axiosError.response.data.data)

                    
                         }

                         if (axiosError.response && axiosError.response.status === 403) {
                            
                             ToastError( axiosError.response.data.data)
                            
                         }

                         if (axiosError.response && axiosError.response.status === 404) {
                             ToastError( axiosError.response.data.data)
                         }
                 } 
             }
}



