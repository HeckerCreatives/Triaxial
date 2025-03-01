"use client"
import React, { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Plus, Delete, Trash, Eye, CircleAlert, ArrowUp, Pen } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { useRouter, useSearchParams } from 'next/navigation'
import Workload from './Workload'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ProjectsSection, resources, selectTeams, Teams } from '@/types/data'
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { createEmployee, CreateEmployee } from '@/schema/schema'
import Spinner from '@/components/common/Spinner'
import PaginitionComponent from '@/components/common/Pagination'
import Viewbtn from '@/components/common/Viewbtn'
import { undefined } from 'zod'

type Teams = Record<"label" | "value", string>;


type Reportto = {
  employeeid: string
  name: string
}

type Employee = {
  employeeid:  string
  name: string
  teamname:  string
  initial:  string
  status:  string
  auth: string 
  reportingto:  string
  email: string
  dateCreated: string
  resource: string
}

type Data = {
  employeeid: string
  email: string
  firstname: string
  lastname:string 
  initial: string
  contactno: string
  resource: string
  reportingto: {
      employeeid: string
      firstname: string
      lastname: string
  }
}

type Team = {
  teamname: string
}

type Row = { id: string; name: string };



export default function Employeetable() {
  const [dialog, setDialog] = useState(false)
  const [dialog2, setDialog2] = useState(false)
  const [dialog3, setDialog3] = useState(false)
  const [dialog4, setDialog4] = useState(false)
  const [dialog5, setDialog5] = useState(false)
  const router = useRouter()
  const search = useSearchParams()
  const active = search.get('active')
  const state = search.get('state')
  const [loading, setLoading] = useState(false)

   const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<Teams[]>([]);
  const [inputValue, setInputValue] = React.useState("");
  const [totalpage, setTotalpage] = useState(0)
  const [currentpage, setCurrentpage] = useState(0)
  const [employeedata, setEmployeedata] = useState<Data>()
  const [id, setEmployeeid] = useState('')
  const [resource, setResource] = useState('')

  const findResource = resources.find((item) => item === employeedata?.resource )


  //create employee
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateEmployee>({
    resolver: zodResolver(createEmployee),
    defaultValues: {
      resource: findResource,
      firstname:  employeedata?.firstname  || '',
      lastname:  employeedata?.lastname || '',
      initial:  employeedata?.initial || '',
      email:  employeedata?.email || '',
      reportingto:  employeedata?.reportingto.employeeid || '',
      contactno:  employeedata?.contactno || '',
      team: 'Team',
    },
  });



const onSubmit = async (data: CreateEmployee) => {
    setLoading(true)
    router.push('?state=true')
    
     try {
         const request = axios.post(`${process.env. NEXT_PUBLIC_API_URL}/users/createemployee`,{
          email: data.email,
          password: data.password,
          firstname: data.firstname,
          initial: data.initial,
          lastname: data.lastname,
          contactnumber: data.contactno,
          reportingto: data.reportingto, // employee id
          position: data.position.toLocaleLowerCase(), // employee, manager, hr, finance
          resource: data.resource
         },
             {
                 withCredentials: true,
                 headers: {
                 'Content-Type': 'application/json'
                 }
             }
         )

      const response = await toast.promise(request, {
          loading: 'Creating employee account....',
          success: `Employee account successfully created`,
          error: 'Error while creating employee account',
      });

      if(response.data.message === 'success'){
        reset()
        setDialog(false)
        router.push('?state=false')
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
};

const editEmployee = async (data: CreateEmployee) => {
  setLoading(true)
  router.push('?state=true')
  
   try {
       const request = axios.post(`${process.env. NEXT_PUBLIC_API_URL}/users/editemployees`,{
        employeeid: id,
        email: data.email,
        password: data.password,
        firstname: data.firstname,
        initial: data.initial,
        lastname: data.lastname,
        contactnumber: data.contactno,
        reportingto: data.reportingto, // employee id
        position: data.position.toLocaleLowerCase(), // employee, manager, hr, finance
        resource: data.resource
       },
           {
               withCredentials: true,
               headers: {
               'Content-Type': 'application/json'
               }
           }
       )

    const response = await toast.promise(request, {
        loading: 'Editing employee account....',
        success: `Employee account edited created`,
        error: 'Error while editing employee account',
    });

    if(response.data.message === 'success'){
      reset()
      setDialog4(false)
      router.push('?state=false')
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
};



//employee list
const [searchemployee, setSearchEmployee] = useState('')
const [list, setList]= useState<Employee[]>([])
useEffect(() => {
  setLoading(true)
  try {
    const timer = setTimeout(() => {
      const getList = async () => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/employeelist?positionfilter=employee&page=${currentpage}&limit=10&fullnamefilter=${searchemployee}`,{
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
            }
        })
    
        setList(response.data.data.employeelist)
        setTotalpage(response.data.data.totalpages)
        setLoading(false)

        if(searchemployee !== ''){
          setCurrentpage(0)
        }
      
      }
      getList()
    }, 500)
    return () => clearTimeout(timer)
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
  
  
},[state, currentpage, searchemployee])

//reporting to list
const [reportto, setReportto] = useState<Reportto[]>([])
useEffect(() => {
  const getList = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/managerlist`,{
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
        }
    })

    setReportto(response.data.data.managerlist)
  
  }
  getList()
  
},[])


//promote
const [position, setPosition] = useState('')
const promote = async () => {
  setLoading(true)
  router.push('?state=true')
  const selectedIds = selectedRows.map((row) => row.id);
  try {
    const request = axios.post(`${process.env. NEXT_PUBLIC_API_URL}/users/changepositionemployee`,{
        userids: selectedIds, // employee ids
        position: position // if promote choose those three (manager, hr, finance)    if demote always go to employee
    },
        {
            withCredentials: true,
            headers: {
            'Content-Type': 'application/json'
            }
        }
    )

 const response = await toast.promise(request, {
     loading: 'Promoting employee....',
     success: `Promoted successfully`,
     error: 'Error while promoting employee',
 });

 if(response.data.message === 'success'){
   reset()
   setDialog2(false)
   setSelectedRows([])
   router.push('?state=false')
   setLoading(false)
 }

   
} catch (error) {
    setLoading(false)
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

//select row
const [selectedRows, setSelectedRows] = useState<Row[]>([]);
const handleSelectRow = (id: string, name: string) => {
  setSelectedRows((prevSelectedRows) => {
    // Check if the row is already selected by its id
    const isSelected = prevSelectedRows.some((row) => row.id === id);

    if (isSelected) {
      // Remove the row object from the array if it is already selected (deselect)
      return prevSelectedRows.filter((row) => row.id !== id);
    } else {
      // Add the new row object to the array (select)
      return [...prevSelectedRows, { id, name }];
    }
  });
};

//paginition
const handlePageChange = (page: number) => {
  setCurrentpage(page)
}

//slice team
const slice = (data: string) => {
  const splitData = data.split(',')
  const array = splitData.slice(1,10)
  return array
}

//ban
const banEmployee = async () => {
  setLoading(true)
  router.push('?state=true')
  const selectedIds = selectedRows.map((row) => row.id);
  if(selectedIds.length === 0){
    toast.error(`Please select a user to proceed`)  
    setLoading(false)

  } else{
    try {
      const request = axios.post(`${process.env. NEXT_PUBLIC_API_URL}/users/banemployees`,{
        employeeid: selectedIds,
        status: 'banned'
      },
          {
              withCredentials: true,
              headers: {
              'Content-Type': 'application/json'
              }
          }
      )

  const response = await toast.promise(request, {
      loading: 'Banning employee....',
      success: `Banned successfully`,
      error: 'Error while banning employee',
  });

  if(response.data.message === 'success'){
    
    setDialog3(false)
    setSelectedRows([])
    router.push('?state=false')
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
}

const unbanEmployee = async () => {
  setLoading(true)
  router.push('?state=true')
  const selectedIds = selectedRows.map((row) => row.id);
  if(selectedIds.length === 0){
    toast.error(`Please select a user to proceed`)  
    setLoading(false)

  } else{
    try {
      const request = axios.post(`${process.env. NEXT_PUBLIC_API_URL}/users/banemployees`,{
        employeeid: selectedIds,
        status: 'active'
      },
          {
              withCredentials: true,
              headers: {
              'Content-Type': 'application/json'
              }
          }
      )

  const response = await toast.promise(request, {
      loading: 'UnBanning employee....',
      success: `UnBan successfully`,
      error: 'Error while unbanning employee',
  });

  if(response.data.message === 'success'){
    
    setDialog3(false)
    setSelectedRows([])
    router.push('?state=false')
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
}

//employe data
 useEffect(() => {
  if(id !== ''){
    const getData = async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/viewemployeedata?employeeid=${id}`,{
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
          }
      })
    
      setEmployeedata(response.data.data)
    
    }
    getData()
  }
   

 },[id])


useEffect(() => {
  if (id !== '') {
    reset({
      firstname:  employeedata?.firstname  || '',
      lastname:  employeedata?.lastname || '',
      initial:  employeedata?.initial || '',
      email:  employeedata?.email || '',
      reportingto:  employeedata?.reportingto.employeeid || '',
      contactno:  employeedata?.contactno || '',
      team: 'Team',
    });
  } else {
    reset({
      firstname:  '',
      lastname:  '',
      initial:'',
      email:'',
      reportingto:'',
      contactno:'',
      team: 'Team',
    });
  }
}, [id, employeedata, reset]);

useEffect(() => {
  if(dialog4 === false){
    setEmployeeid('')
  }
},[dialog4])




//team data
const [team, setTeam] = useState<Team[]>([])
  const getTeamname = async ( id: string) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/viewteamemployees?employeeid=${id}`,{
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
        }
    })
  
    setTeam(response.data.data.list)
  
  }


const reportingtoValue = watch('reportingto');
const resourceValue = watch('resource');

useEffect(() => {
  if (findResource) {
    reset({
      resource: findResource,
      firstname:  employeedata?.firstname  || '',
      lastname:  employeedata?.lastname || '',
      initial:  employeedata?.initial || '',
      email:  employeedata?.email || '',
      reportingto:  employeedata?.reportingto.employeeid || '',
      contactno:  employeedata?.contactno || '',
      team: 'Team',

    });
  }
}, [employeedata, findResource, reset]);





  return (
    <>
    {active === null && (
      <div className=' w-full h-full flex justify-center bg-secondary p-6 text-zinc-100'>

      <div className=' w-full flex flex-col max-w-[1520px]'>
        <div className=' flex md:flex-row flex-col items-center justify-between gap-4'>
            <div className=' flex  items-center gap-4'>
             
               
              
              <Dialog open={dialog} onOpenChange={setDialog}>
                <DialogTrigger>
                  <button className=' bg-red-700 px-6 py-2 rounded-sm flex items-center gap-1 text-xs'><Plus size={15}/>Create</button>
                </DialogTrigger>
                <DialogContent className=' bg-secondary border-none text-zinc-100 grid grid-cols-1 lg:grid-cols-[250px,1fr]'>
                  <div className=' bg-blue-400 lg:block hidden'
                  style={{backgroundImage: `url('/bg2.png')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat:"no-repeat"}}
                  
                  >
                    <p className=' p-2 uppercase text-sm font-semibold mt-8 bg-gradient-to-r from-zinc-950 to-zinc-950/10'>Create Employee</p>
                  </div>

                  <div className=' flex flex-col gap-2 p-4'>
                    <DialogHeader>
                    <DialogDescription>
                    </DialogDescription>
                    </DialogHeader>
                      <form onSubmit={handleSubmit(onSubmit)} className=' flex flex-col '>
                        <h2 className=' uppercase font-semibold text-sm'>Employee Details</h2>
                        <div className=' grid grid-cols-2 gap-4'>
                          <div className=' flex flex-col gap-1'>
                            <label htmlFor="" className=' mt-2 text-xs'>First name</label>
                            <Input placeholder='First name' maxLength={25} type='text' className=' bg-primary text-xs h-[35px]' {...register('firstname')}/>
                            {errors.firstname && <p className=' text-[.6em] text-red-500'>{errors.firstname.message}</p>}

                          
                            <label htmlFor="" className=' mt-2 text-xs'>Last name</label>
                            <Input placeholder='Last name' maxLength={25} type='text' className=' bg-primary text-xs h-[35px]' {...register('lastname')}/>
                            {errors.lastname && <p className=' text-[.6em] text-red-500'>{errors.lastname.message}</p>}


                            <label htmlFor="" className=' mt-2 text-xs'>Initial*</label>
                            <Input placeholder='Initial' maxLength={10} type='text' className=' bg-primary text-xs h-[35px]' {...register('initial')}/>
                            {errors.initial && <p className=' text-[.6em] text-red-500'>{errors.initial.message}</p>}


                            <label htmlFor="" className=' mt-2 text-xs'>Contact no</label>
                            <Input
                              placeholder="Contact no"
                              type="text" 
                              maxLength={20}
                              className="bg-primary text-xs h-[35px]"
                              {...register("contactno", { pattern: /^[0-9]{1,20}$/ })} 
                            />

                            {errors.contactno && <p className=' text-[.6em] text-red-500'>{errors.contactno.message}</p>}

                           
                            


                            <label htmlFor="" className=' mt-2 text-xs'>Reporting to *</label>
                            <Select onValueChange={(value) => setValue('reportingto', value)} {...register('reportingto')}>
                              <SelectTrigger className="w-full text-xs h-[35px] bg-primary">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent className=' text-xs'>
                               
                                {Object.values(reportto).map((item, index) => (
                                <SelectItem key={index} value={item.employeeid}>{item.name}</SelectItem>

                                ))}
                              
                              </SelectContent>
                            </Select>

                            {errors.reportingto && <p className=' text-[.6em] text-red-500'>{errors.reportingto.message}</p>}


                          </div>

                          <div className=' flex flex-col gap-1'>
                            <label htmlFor="" className=' mt-2 text-xs'>Email *</label>
                            <Input placeholder='Email' type='email' className=' bg-primary text-xs h-[35px]' {...register('email')}/>
                            {errors.email && <p className=' text-[.6em] text-red-500'>{errors.email.message}</p>}

                            <label htmlFor="" className=' mt-2 text-xs'>Password *</label>
                            <Input placeholder='Password' maxLength={15} type='text' className=' bg-primary text-xs h-[35px]' {...register('password')}/>
                            {errors.password && <p className=' text-[.6em] text-red-500'>{errors.password.message}</p>}


                            <label htmlFor="" className=' mt-2 text-xs hidden'>Team *</label>
                            <Select value='First manger' onValueChange={(value) => setValue('team', value)} {...register('team')}>
                              <SelectTrigger className="w-full text-xs h-[35px] bg-primary hidden">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent className=' text-xs'>
                                {Teams.map((item, index) => (
                                <SelectItem key={index} value={item.name}>{item.name}</SelectItem>

                                ))}
                              
                              </SelectContent>
                            </Select>
                            {errors.team && <p className=' text-[.6em] text-red-500'>{errors.team.message}</p>}


                            <label htmlFor="" className=' mt-2 text-xs'>Position *</label>
                            <Input placeholder='Position' value={'Employee'} type='text' className=' bg-primary text-xs h-[35px]' {...register('position')}/>
                            {errors.position && <p className=' text-[.6em] text-red-500'>{errors.position.message}</p>}

                            <label htmlFor="" className=' mt-2 text-xs'>Resource *</label>
                            <Select onValueChange={(value) => setValue('resource', value)} {...register('resource')}>
                              <SelectTrigger className="w-full text-xs h-[35px] bg-primary ">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent className=' text-xs'>
                                {resources.map((item, index) => (
                                <SelectItem key={index} value={item}>{item}</SelectItem>

                                ))}
                              
                              </SelectContent>
                            </Select>
                            {errors.resource && <p className=' text-[.6em] text-red-500'>{errors.resource.message}</p>}


                            {/* <div className=' w-full bg-primary flex flex-col items-center mt-2 p-2'>
                              <div className=' w-20 aspect-square bg-secondary'>

                              </div>
                              <input type="file"  accept="image/*" className=' text-[.5em] mt-2 bg-secondary' placeholder='Select Image' {...register('img')} />
                            </div> */}
                          
                          </div>
                        </div>

                        <div className=' w-full flex items-end justify-end gap-2 mt-8'>
                          <button disabled={loading} className=' btn-red flex items-center gap-2 justify-center'>
                            {loading === true && (
                              <div className=' spinner2'></div>
                            )}
                            Create</button>
                          {/* <ButtonSecondary onClick={() => setDialog(false)}  name={'Cancel'}/>
                          <Button name={'Save'} onClick={function (): void {
                            throw new Error('Function not implemented.')
                          } }/> */}
                        </div>
                          

                      </form>
                  
                    

                  </div>
                  
                </DialogContent>
              </Dialog>



              <Dialog open={dialog2} onOpenChange={setDialog2}>
                <DialogTrigger>
                  <button className=' bg-red-700 px-6 py-2 rounded-sm flex items-center gap-1 text-xs'><ArrowUp size={15}/>Promote</button>
                </DialogTrigger>
                <DialogContent className=' bg-secondary border-none text-zinc-100 grid grid-cols-1 lg:grid-cols-[250px,1fr]'>
                  <div className=' bg-blue-400 lg:block hidden'
                  style={{backgroundImage: `url('/bg2.png')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat:"no-repeat"}}
                  
                  >
                    <p className=' p-2 uppercase text-sm font-semibold mt-8 bg-gradient-to-r from-zinc-950 to-zinc-950/10'>Promote</p>
                  </div>

                  <div className=' flex flex-col gap-2 p-4'>
                    <DialogHeader>
                    <DialogDescription>
                      Are you sure you want to promote the selected employee?
                    </DialogDescription>
                    </DialogHeader>
                  <form action="" className=' flex flex-col gap-4 '>
                    <h2 className=' uppercase font-semibold text-xs'>Selected Employe</h2>
                    <div className=' w-full flex flex-col gap-4'>
                      {selectedRows.map((item, index) => (
                        <p key={index} className=' text-sm font-semibold'><span className=' text-zinc-500'>Name:</span> {item.name}</p>
                      ))}

              
                    </div>
                    <Select value={position} onValueChange={setPosition}>
                          <SelectTrigger className="w-full text-xs bg-primary">
                            <SelectValue placeholder="Position" />
                          </SelectTrigger>
                          <SelectContent className=' text-xs'>
                           
                            <SelectItem value={'manager'}>Manager</SelectItem>
                            <SelectItem value={'hr'}>Hr</SelectItem>
                            <SelectItem value={'finance'}>Finance</SelectItem>

                           
                          </SelectContent>
                        </Select>
                    {/* <div className=' grid grid-cols-2 gap-4'>
                      <div className=' flex flex-col gap-1'>
                        <label htmlFor="" className=' mt-4 text-xs'>Employee Name</label>
                        <Input placeholder='Employe Name' type='text' className=' bg-primary text-xs h-[35px]'/>

                        <label htmlFor="" className=' mt-4 text-xs'>Current Position</label>
                        <Input placeholder='Current position' type='text' className=' bg-primary text-xs h-[35px]'/>

                        <label htmlFor="" className=' mt-4 text-xs'>Promote to</label>
                        <Select>
                          <SelectTrigger className="w-full text-xs bg-primary">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent className=' text-xs'>
                           
                            <SelectItem value={'manager'}>Manager</SelectItem>
                            <SelectItem value={'hr'}>Hr</SelectItem>
                            <SelectItem value={'finance'}>Finance</SelectItem>

                           
                          </SelectContent>
                        </Select>

                       

                        
                      </div>

                      <div className=' flex flex-col bg-primary rounded-sm p-2'>
                       <p className=' text-xs text-zinc-400'>Email:</p>
                       <p className=' text-xs text-zinc-400'>Contact:</p>
                       <p className=' text-xs text-zinc-400'>Initial:</p>
                       <p className=' text-xs text-zinc-400'>Position:</p>

                      
                      </div>
                    </div> */}
                      

                  </form>
                  
                    <div className=' w-full flex items-end justify-end gap-2 mt-8'>
                      <button disabled={loading} onClick={promote} className=' btn-red flex items-center justify-center gap-2'>
                        {loading === true && (
                          <div className=' spinner2'></div>
                        )}
                        Promote</button>
                    </div>

                  </div>
                  
                </DialogContent>
              </Dialog>

              <Dialog open={dialog3} onOpenChange={setDialog3}>
                <DialogTrigger>
                  <button className=' bg-primary px-8 py-2 rounded-sm text-xs flex items-center gap-1 text-red-700'><CircleAlert size={15}/>Ban</button>
                  
                </DialogTrigger>
                <DialogContent className=' bg-secondary border-none text-zinc-100 grid grid-cols-1 lg:grid-cols-[250px,1fr]'>
                  <div className=' bg-blue-400 lg:block hidden'
                  style={{backgroundImage: `url('/bg2.png')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat:"no-repeat"}}
                  
                  >
                    <p className=' p-2 uppercase text-sm font-semibold mt-8 bg-gradient-to-r from-zinc-950 to-zinc-950/10'>Ban</p>
                  </div>

                  <div className=' flex flex-col gap-2 p-4'>
                    <DialogHeader>
                    <DialogDescription>
                      Are you sure you want to ban the selected employee?
                    </DialogDescription>
                    </DialogHeader>
                  <form action="" className=' flex flex-col gap-4 '>
                    <h2 className=' uppercase font-semibold text-xs'>Selected Employe</h2>
                    <div className=' w-full flex flex-col gap-4'>
                      {selectedRows.map((item, index) => (
                        <p key={index} className=' text-sm font-semibold'><span className=' text-zinc-500'>Name:</span> {item.name}</p>
                      ))}

              
                    </div>
                    {/* <Select value={position} onValueChange={setPosition}>
                          <SelectTrigger className="w-full text-xs bg-primary">
                            <SelectValue placeholder="Position" />
                          </SelectTrigger>
                          <SelectContent className=' text-xs'>
                           
                            <SelectItem value={'manager'}>Manager</SelectItem>
                            <SelectItem value={'hr'}>Hr</SelectItem>
                            <SelectItem value={'finance'}>Finance</SelectItem>

                           
                          </SelectContent>
                        </Select> */}
                  

                  </form>
                  
                    <div className=' w-full flex items-end justify-end gap-2 mt-8'>
                      <button disabled={loading} onClick={banEmployee} className=' btn-red flex items-center justify-center gap-2'>
                        {loading === true && (
                          <div className=' spinner2'></div>
                        )}
                        Ban</button>
                    </div>

                  </div>
                  
                </DialogContent>
              </Dialog>

              <Dialog open={dialog5} onOpenChange={setDialog5}>
                <DialogTrigger>
                  <button className=' bg-primary px-8 py-2 rounded-sm text-xs flex items-center gap-1 text-blue-400'><CircleAlert size={15}/>UnBan</button>
                  
                </DialogTrigger>
                <DialogContent className=' bg-secondary border-none text-zinc-100 grid grid-cols-1 lg:grid-cols-[250px,1fr]'>
                  <div className=' bg-blue-400 lg:block hidden'
                  style={{backgroundImage: `url('/bg2.png')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat:"no-repeat"}}
                  
                  >
                    <p className=' p-2 uppercase text-sm font-semibold mt-8 bg-gradient-to-r from-zinc-950 to-zinc-950/10'>UnBan</p>
                  </div>

                  <div className=' flex flex-col gap-2 p-4'>
                    <DialogHeader>
                    <DialogDescription>
                      Are you sure you want to unban the selected employee?
                    </DialogDescription>
                    </DialogHeader>
                  <form action="" className=' flex flex-col gap-4 '>
                    <h2 className=' uppercase font-semibold text-xs'>Selected Employe</h2>
                    <div className=' w-full flex flex-col gap-4'>
                      {selectedRows.map((item, index) => (
                        <p key={index} className=' text-sm font-semibold'><span className=' text-zinc-500'>Name:</span> {item.name}</p>
                      ))}

              
                    </div>
                   
                  

                  </form>
                  
                    <div className=' w-full flex items-end justify-end gap-2 mt-8'>
                      <button disabled={loading} onClick={unbanEmployee} className=' btn-red flex items-center justify-center gap-2'>
                        {loading === true && (
                          <div className=' spinner2'></div>
                        )}
                        Ban</button>
                    </div>

                  </div>
                  
                </DialogContent>
              </Dialog>


            </div>

            {/* <div className=' flex items-center gap-2'>
                <Input value={searchemployee} onChange={(e) => setSearchEmployee(e.target.value)} type='text' className=' bg-primary h-[35px] text-zinc-100'/>
                <button className=' bg-red-700 px-8 py-2 rounded-sm text-xs'>Search</button>
            </div> */}

            <div className=' flex flex-col gap-1'>
                <label htmlFor="" className=' text-xs'>Search</label>
                <Input value={searchemployee} placeholder='Search employee name (clear the input to reset)' onChange={(e) => setSearchEmployee(e.target.value)} type='text' className=' w-[320px] bg-primary text-zinc-100 text-xs h-[35px]'/>
               
            </div>
            
        </div>

     
          
        <Table className=' mt-4'>

        {list.length === 0 &&  
          <TableCaption className=' text-xs text-zinc-500'>No data</TableCaption>
          }
          
        {loading === true && (
            <TableCaption className=' '>
              <Spinner/>
            </TableCaption>
          )}
        <TableHeader>
        <TableRow>
            <TableHead className="">Select</TableHead>
            <TableHead>Employee Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Team</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Initial</TableHead>
            <TableHead>Resource</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Reporting to</TableHead>
            <TableHead >Date Created</TableHead>
            <TableHead >Status</TableHead>
            {/* <TableHead >Individual Workload</TableHead> */}
            <TableHead >Action</TableHead>

            </TableRow>
        </TableHeader>
        <TableBody>
        {list.map((item, index) => (
             <TableRow key={index}>
             <TableCell className="font-medium">
             <input 
                checked={selectedRows.some((row) => row.id === `${item.employeeid}`)}
                onChange={() => handleSelectRow(`${item.employeeid}`, `${item.name}`)} 
                type="checkbox" />
             </TableCell>
             <TableCell className="font-medium">{item.employeeid}</TableCell>
             <TableCell className="font-medium">{item.name}</TableCell>
             <TableCell className="font-medium flex flex-wrap w-[150px] overflow-hidden">
             <Dialog>
                <DialogTrigger><button onClick={() => getTeamname(item.employeeid)} className=' bg-red-700 p-2 rounded-sm text-white flex items-center gap-2'><Eye size={15}/>View Team</button></DialogTrigger>
                <DialogContent className=' p-6 bg-secondary text-white border-none'>
                  <DialogHeader>
                    <DialogTitle className=' text-red-700'>Team</DialogTitle>
                    <DialogDescription>
                      
                    </DialogDescription>
                  </DialogHeader>

                   <Table className=''>
                    {team.length === 0 && (
                    <TableCaption>No team</TableCaption>

                    )}
                    <TableHeader>
                        <TableRow>
                        <TableHead>Name</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                     {team.map((item,) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{item.teamname}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </DialogContent>
              </Dialog>
             </TableCell>
        
             <TableCell className="font-medium uppercase">{item.auth}</TableCell>
             <TableCell className="font-medium uppercase">{item.initial}</TableCell>
             <TableCell className="font-medium">{item.resource}</TableCell>
             <TableCell className="font-medium">{item.email}</TableCell>
             <TableCell className="font-medium">{item.reportingto}</TableCell>
             <TableCell className="">{new Date(item.dateCreated).toLocaleString()}</TableCell>
             <TableCell className={` uppercase font-medium ${item.status === 'active' ? 'text-green-400' : 'text-red-500'}`}>{item.status}</TableCell>
             {/* <TableCell className="font-medium"><Viewbtn name={'View'} onClick={() => router.push(`/superadmin/individualworkload?employeeid=${item.employeeid}`)} disabled={false}/></TableCell> */}
             <TableCell className="font-medium">

             <Dialog open={dialog4} onOpenChange={setDialog4}>
                <DialogTrigger>
                  <button onClick={() => {setEmployeeid(item.employeeid), setResource(item.resource)}} className=' bg-red-700 text-xs px-6 py-2 rounded-sm flex items-center gap-1 text-white'><Pen size={15}/>Edit</button>
                </DialogTrigger>
                <DialogContent className=' bg-secondary border-none text-zinc-100 grid grid-cols-1 lg:grid-cols-[250px,1fr]'>
                  <div className=' bg-blue-400 lg:block hidden'
                  style={{backgroundImage: `url('/bg2.png')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat:"no-repeat"}}
                  
                  >
                    <p className=' p-2 uppercase text-sm font-semibold mt-8 bg-gradient-to-r from-zinc-950 to-zinc-950/10'>Edit Employee</p>
                  </div>

                  <div className=' flex flex-col gap-2 p-4'>
                    <DialogHeader>
                    <DialogDescription>
                      
                    </DialogDescription>
                    </DialogHeader>
                      <form onSubmit={handleSubmit(editEmployee)} className=' flex flex-col '>
                        <h2 className=' uppercase font-semibold text-sm'>Employee Details</h2>
                        <div className=' grid grid-cols-2 gap-4'>
                          <div className=' flex flex-col gap-1'>
                            <label htmlFor="" className=' mt-2 text-xs'>First name</label>
                            <Input placeholder='First name' type='text' className=' bg-primary text-xs h-[35px]' {...register('firstname')}/>
                            {errors.firstname && <p className=' text-[.6em] text-red-500'>{errors.firstname.message}</p>}

                          
                            <label htmlFor="" className=' mt-2 text-xs'>Last name</label>
                            <Input placeholder='Last name' type='text' className=' bg-primary text-xs h-[35px]' {...register('lastname')}/>
                            {errors.lastname && <p className=' text-[.6em] text-red-500'>{errors.lastname.message}</p>}


                            <label htmlFor="" className=' mt-2 text-xs'>Initial*</label>
                            <Input placeholder='Initial' type='text' className=' bg-primary text-xs h-[35px]' {...register('initial')}/>
                            {errors.initial && <p className=' text-[.6em] text-red-500'>{errors.initial.message}</p>}


                            <label htmlFor="" className=' mt-2 text-xs'>Contact no</label>
                            <Input placeholder='Contact no' type='number' className=' bg-primary text-xs h-[35px]' {...register('contactno')}/>
                            {errors.contactno && <p className=' text-[.6em] text-red-500'>{errors.contactno.message}</p>}

                           
                            


                          </div>

                          <div className=' flex flex-col gap-1'>

                          <label htmlFor="" className=' mt-2 text-xs'>Reporting to *</label>
                            <Select value={reportingtoValue} onValueChange={(value) => setValue('reportingto', value)} {...register('reportingto')}>
                              <SelectTrigger className="w-full text-xs h-[35px] bg-primary">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent className=' text-xs'>
                               
                                {reportto.map((item, index) => (
                                <SelectItem key={index} value={item.employeeid}>{item.name}</SelectItem>

                                ))}
                              
                              </SelectContent>
                            </Select>
                            {errors.reportingto && <p className=' text-[.6em] text-red-500'>{errors.reportingto.message}</p>}
                            
                            <label htmlFor="" className=' mt-2 text-xs'>Email *</label>
                            <Input placeholder='Email' type='email' className=' bg-primary text-xs h-[35px]' {...register('email')}/>
                            {errors.email && <p className=' text-[.6em] text-red-500'>{errors.email.message}</p>}

                            <label htmlFor="" className=' mt-2 text-xs'>Password *</label>
                            <Input placeholder='Password' type='text' className=' bg-primary text-xs h-[35px]' {...register('password')}/>
                            {errors.password && <p className=' text-[.6em] text-red-500'>{errors.password.message}</p>}


                          


                            <label htmlFor="" className=' mt-2 text-xs'>Position *</label>
                            <Input placeholder='Position' value={'Employee'} type='text' className=' bg-primary text-xs h-[35px]' {...register('position')}/>
                            {errors.position && <p className=' text-[.6em] text-red-500'>{errors.position.message}</p>}

                            <label htmlFor="" className=' mt-2 text-xs'>Resource *</label>
                            <Select value={resourceValue} onValueChange={(value) => {setValue('resource', value)}} {...register('resource')}>
                              <SelectTrigger className="w-full text-xs h-[35px] bg-primary ">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent className=' text-xs'>
                                {resources.map((item, index) => (
                                <SelectItem key={index} value={item}>{item}</SelectItem>

                                ))}
                              
                              </SelectContent>
                            </Select>
                            {errors.resource && <p className=' text-[.6em] text-red-500'>{errors.resource.message}</p>}


                            {/* <div className=' w-full bg-primary flex flex-col items-center mt-2 p-2'>
                              <div className=' w-20 aspect-square bg-secondary'>

                              </div>
                              <input type="file"  accept="image/*" className=' text-[.5em] mt-2 bg-secondary' placeholder='Select Image' {...register('img')} />
                            </div> */}
                          
                          </div>
                        </div>

                        <div className=' w-full flex items-end justify-end gap-2 mt-8'>
                          <button disabled={loading} className=' btn-red flex items-center gap-2 justify-center'>
                            {loading === true && (
                              <div className=' spinner2'></div>
                            )}
                            Save</button>
                          {/* <ButtonSecondary onClick={() => setDialog(false)}  name={'Cancel'}/>
                          <Button name={'Save'} onClick={function (): void {
                            throw new Error('Function not implemented.')
                          } }/> */}
                        </div>
                          

                      </form>
                  
                    

                  </div>
                  
                </DialogContent>
              </Dialog>
             </TableCell>
            
            
 
             </TableRow>
            ))}
        </TableBody>
        </Table>
    
       {list.length !== 0 && (
       <PaginitionComponent currentPage={currentpage} total={totalpage} onPageChange={handlePageChange}/>
       )}

    
      </div>
        
    </div>
    )}

    {active === 'workload' && (
      <Workload/>
    )}
    </>
    
  )
}
