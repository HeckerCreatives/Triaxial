"use client"
import React, { useEffect, useState } from 'react'
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
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Eye, Pen, Plus, Trash } from 'lucide-react'
import { Input } from '@/components/ui/input'
import ButtonSecondary from '@/components/common/ButtonSecondary'
import Button from '@/components/common/Button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ProjectsSection, selectTeams } from '@/types/data'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";
import toast from 'react-hot-toast'
import axios, { AxiosError } from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { createClient, CreateClient } from '@/schema/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import Spinner from '@/components/common/Spinner'
import PaginitionComponent from '@/components/common/Pagination'
import { clientColor } from '@/utils/helpers'

type Team = Record<"teamname" | "teamid", string>;

type Teams = {
  clientname: string
createdAt: string
priority: string
teamid: string
teams: SubTeams[]
}

type SubTeams = {
  teamname: string
_id: string
}

type Row = { id: string; name: string };



export default function ClientTable() {
  const [dialog, setDialog] = useState(false)
  const [dialog2, setDialog2] = useState(false)
  const [dialog3, setDialog3] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const params = useSearchParams()
  const state = params.get('state')

  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<Team[]>([]);
  const [inputValue, setInputValue] = React.useState("");
  const [search, setSearch] = useState('')
  const [teams, setTeams] = useState<Team[]>([])
  const [totalpage, setTotalpage] = useState(0)
  const [currentpage, setCurrentpage] = useState(0)
  const [clientid, setClientid] = useState('')
  const [clientdata, setClientdata] = useState<Teams>()



  // multi select
  const handleUnselect = React.useCallback((team: Team) => {
    setSelected((prev) => prev.filter((s) => s.teamid !== team.teamid));
  }, []);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "") {
            setSelected((prev) => {
              const newSelected = [...prev];
              newSelected.pop();
              return newSelected;
            });
          }
        }
        // This is not a default behaviour of the <input /> field
        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    []
  );

  const selectables = teams.filter(
    (team) => !selected.includes(team)
  );

  //end multi select

  //create client
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateClient>({
    resolver: zodResolver(createClient),
    defaultValues: {
      clientname: clientid !== '' ? clientdata?.clientname : '',
      priority: clientid !== '' ? clientdata?.priority: '',
    },
  });

  const onSubmit = async (data: CreateClient) => {
    setLoading(true)
    router.push('?state=true')
    const selectedIds = selected.map((row) => row.teamid);
    
    try {
        const request = axios.post(`${process.env. NEXT_PUBLIC_API_URL}/clients/createclients`,{
        clientname: data.clientname,
        priority: data.priority, // Priority 1, Priority 2, Priority 3, Others
        //teams: selectedIds 
        },
            {
                withCredentials: true,
                headers: {
                'Content-Type': 'application/json'
                }
            }
        )

      const response = await toast.promise(request, {
          loading: 'Creating client ....',
          success: `Client successfully created`,
          error: 'Error while creating the client',
      });

      if(response.data.message === 'success'){
        reset()
        setDialog(false)
        router.push('?state=false')
        setLoading(false)
        setSelected([])
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
  };

  const editClient = async (data: CreateClient) => {
    setLoading(true)
    router.push('?state=true')
    const selectedIds = selected.map((row) => row.teamid);
    
    try {
        const request = axios.post(`${process.env. NEXT_PUBLIC_API_URL}/clients/editclient`,{
          clientid: clientid,
        clientname: data.clientname,
        priority: data.priority, // Priority 1, Priority 2, Priority 3, Others
        //teams: selectedIds // teamsid
        },
            {
                withCredentials: true,
                headers: {
                'Content-Type': 'application/json'
                }
            }
        )

      const response = await toast.promise(request, {
          loading: 'Editing client ....',
          success: `Client successfully edited`,
          error: 'Error while editing the client',
      });

      if(response.data.message === 'success'){
        reset()
        setDialog3(false)
        router.push('?state=false')
        setLoading(false)
        setSelected([])
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
  };


  //team list
  useEffect(() => {
    const getList = async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/teams/teamsearchlist?teamname`,{
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
          }
      })

      setTeams(response.data.data.teamlist)
    }
    getList()
  },[])


  //client list
  const [clients, setClients] = useState<Teams[]>([])
  const [searchclient, setSearchclient] = useState('')
  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      const getList = async () => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/clients/clientlist?clientnamefilter=${searchclient}&page=${currentpage}&limit=10`,{
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
            }
        })
  
        setClients(response.data.data.teamlist)
        setTotalpage(response.data.data.totalpages)
        setLoading(false)
  
        if(searchclient !== ''){
          setCurrentpage(0)
        }
      }
      getList()
    }, 500)
    return () => clearTimeout(timer)
   
  },[state, currentpage, searchclient])


  //paginition
  const handlePageChange = (page: number) => {
    setCurrentpage(page)
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

  //delete client
  const deleteTeam = async () => {
    setLoading(true)
    router.push('?state=true')
    const selectedIds = selectedRows.map((row) => row.id);

    if(selectedIds.length === 0){
      toast.error(`Please select a client to proceed`)  
      setLoading(false)

    } else{
      try {
        const request = axios.post(`${process.env. NEXT_PUBLIC_API_URL}/clients/deleteclients`,{
          clientId: selectedIds
        },
            {
                withCredentials: true,
                headers: {
                'Content-Type': 'application/json'
                }
            }
        )
  
    const response = await toast.promise(request, {
        loading: 'Deleting team....',
        success: `Deleted successfully`,
        error: 'Error while deleting team',
    });
  
    if(response.data.message === 'success'){
      
      setDialog2(false)
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

  //client data
  useEffect(() => {
    if(clientid !== '') {
      const getData = async () => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/clients/getclientdata?clientid=${clientid}`,{
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
            }
        })
  
        setClientdata(response.data.data)
      }
      getData()
    }
    
  },[clientid])



  // Update form values when clientid or clientdata changes
  useEffect(() => {
    if (clientid !== '') {
      reset({
        clientname: clientdata?.clientname || '',
        priority: clientdata?.priority || '',
      });
    } else {
      reset({
        clientname: '',
        priority: '',
      });
    }
  }, [clientid, clientdata, reset]);

  useEffect(() => {
    if(dialog3 === false){
      setClientid('')
    }
  },[dialog3])

  const priorityValue = watch('priority');

  
  
  return (
    <div className=' w-full h-full flex justify-center bg-secondary p-6 text-zinc-100'>

      <div className=' w-full flex flex-col max-w-[1520px]'>

        <div className=' flex md:flex-row flex-col items-center justify-between gap-4'>
            <div className=' flex  items-center gap-4'>
              <Dialog open={dialog} onOpenChange={setDialog}>
                <DialogTrigger>
                  <button className=' bg-red-700 text-xs px-6 py-2 rounded-sm flex items-center gap-1'><Plus size={15}/>Create</button>
                </DialogTrigger>
                <DialogContent className=' bg-secondary border-none text-zinc-100 grid grid-cols-1 lg:grid-cols-[250px,1fr]'>
                  <div className=' bg-blue-400 lg:block hidden'
                  style={{backgroundImage: `url('/bg2.png')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat:"no-repeat"}}
                  
                  >
                    <p className=' p-2 uppercase text-sm font-semibold mt-8 bg-gradient-to-r from-zinc-950 to-zinc-950/10'>Create Client</p>
                  </div>

                  <div className=' flex flex-col gap-2 p-4'>
                    <DialogHeader>
                    <DialogDescription>
                    </DialogDescription>
                    </DialogHeader>
                  <form onSubmit={handleSubmit(onSubmit)} className=' flex flex-col '>
                      <div className=' flex flex-col gap-1'>
                        <label htmlFor="" className=' mt-2 text-xs'>Client name</label>
                        <Input placeholder='Client Name' type='text' className=' bg-primary text-xs h-[35px]' {...register('clientname')}/>
                        {errors.clientname && <p className=' text-[.6em] text-red-500'>{errors.clientname.message}</p>}

                        <label htmlFor="" className=' mt-2 text-xs'>Priority</label>
                        <Select onValueChange={(value) => setValue('priority', value)} {...register('priority')}>
                        <SelectTrigger className="w-full text-xs h-[35px] bg-primary">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent className=' text-xs'>
                          <SelectItem value="Priority 1">Priority 1</SelectItem>
                          <SelectItem value="Priority 2">Priority 2</SelectItem>
                          <SelectItem value="Priority 3">Priority 3</SelectItem>
                          <SelectItem value="Others">Others</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.priority && <p className=' text-[.6em] text-red-500'>{errors.priority.message}</p>}


                     

                    

                      </div>


                      <div className=' w-full flex items-end justify-end gap-2 mt-8'>
                        
                        <button disabled={loading} className=' btn-red flex items-center justify-center gap-2'>
                          {loading === true && (
                            <div className=' spinner2'></div>
                          )}
                          Create</button>
                      </div>

                  </form>
                  
                    

                  </div>
                  
                </DialogContent>
              </Dialog>


                <AlertDialog open={dialog2} onOpenChange={setDialog2}>
                <AlertDialogTrigger>
                  <button className=' bg-primary text-red-700 px-6 py-2 rounded-sm flex items-center gap-1 text-xs'><Trash size={15}/>Delete</button>
                </AlertDialogTrigger>
                <AlertDialogContent className=' bg-secondary text-zinc-100'>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your account
                      and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className=' hover:bg-primary hover:text-zinc-100'>Cancel</AlertDialogCancel>
                    <button disabled={loading} onClick={deleteTeam} className=' btn-red flex items-center justify-center gap-2'>
                      {loading === true && (
                        <div className='spinner2 '></div>
                      )}
                      Delete</button>
                  </AlertDialogFooter>
                </AlertDialogContent>
                </AlertDialog>
            </div>

            <div className=' flex flex-col gap-1'>
                <label htmlFor="" className=' text-xs'>Search</label>
                <Input value={searchclient} placeholder='Search client name (clear the input to reset)' onChange={(e) => setSearchclient(e.target.value)} type='text' className=' w-[300px] bg-primary text-zinc-100 text-xs h-[35px]'/>
                {/* <button className='px-8 py-2 rounded-sm text-xs bg-red-700'>Search</button> */}
            </div>
            
        </div>
       

        <Table className=' mt-4'>
        {teams.length === 0 &&  
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
            <TableHead>Client Name</TableHead>
            <TableHead>Priority</TableHead>
        
            <TableHead >Created At</TableHead>
            <TableHead >Action</TableHead>
            {/* <TableHead >Action</TableHead> */}

            </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((item, index) => (
            <TableRow key={index} className={` bg-red-500`}>
            <TableCell className={`${clientColor(item.priority)} text-black`}>
            <input 
                checked={selectedRows.some((row) => row.id === `${item.teamid}`)}
                onChange={() => handleSelectRow(`${item.teamid}`, `${item.clientname}`)}
                type="checkbox" />
            </TableCell>
            <TableCell className={`font-medium ${clientColor(item.priority)} text-black `}>{item.clientname}</TableCell>
            <TableCell className={`font-medium ${clientColor(item.priority)} text-black `}>{item.priority}</TableCell>


            
          
            <TableCell className={`font-medium ${clientColor(item.priority)} text-black `}>{new Date(item.createdAt).toLocaleString()}</TableCell>
            <TableCell className={`font-medium ${clientColor(item.priority)} text-black `}>

            <Dialog open={dialog3} onOpenChange={setDialog3}>
                <DialogTrigger>
                  <button onClick={() => {setClientid(item.teamid)}} className=' bg-red-700 text-xs px-6 py-2 rounded-sm flex items-center gap-1 text-white'><Pen size={15}/>Edit</button>
                </DialogTrigger>
                <DialogContent className=' bg-secondary border-none text-zinc-100 grid grid-cols-1 lg:grid-cols-[250px,1fr]'>
                  <div className=' bg-blue-400 lg:block hidden'
                  style={{backgroundImage: `url('/bg2.png')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat:"no-repeat"}}
                  
                  >
                    <p className=' p-2 uppercase text-sm font-semibold mt-8 bg-gradient-to-r from-zinc-950 to-zinc-950/10'>Edit Client</p>
                  </div>

                  <div className=' flex flex-col gap-2 p-4'>
                    <DialogHeader>
                    <DialogDescription>
                    </DialogDescription>
                    </DialogHeader>
                  <form onSubmit={handleSubmit(editClient)} className=' flex flex-col '>
                      <div className=' flex flex-col gap-1'>
                        <label htmlFor="" className=' mt-2 text-xs'>Client name</label>
                        <Input placeholder='Client Name' type='text' className=' bg-primary text-xs h-[35px]' {...register('clientname')}/>
                        {errors.clientname && <p className=' text-[.6em] text-red-500'>{errors.clientname.message}</p>}

                        <label htmlFor="" className=' mt-2 text-xs'>Current Priority ({item.priority})</label>
                        <Select value={priorityValue} onValueChange={(value) => setValue('priority', value)} {...register('priority')}>
                        <SelectTrigger className="w-full text-xs h-[35px] bg-primary">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent className=' text-xs'>
                          <SelectItem value="Priority 1">Priority 1</SelectItem>
                          <SelectItem value="Priority 2">Priority 2</SelectItem>
                          <SelectItem value="Priority 3">Priority 3</SelectItem>
                          {/* <SelectItem value="Others">Others</SelectItem> */}
                        </SelectContent>
                      </Select>
                      {errors.priority && <p className=' text-[.6em] text-red-500'>{errors.priority.message}</p>}


                

                      </div>


                      <div className=' w-full flex items-end justify-end gap-2 mt-8'>
                        
                        <button disabled={loading} className=' btn-red flex items-center justify-center gap-2'>
                          {loading === true && (
                            <div className=' spinner2'></div>
                          )}
                          Create</button>
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

        {clients.length !== 0 && (
          <PaginitionComponent currentPage={currentpage} total={totalpage} onPageChange={handlePageChange}/>
        )}
      </div>
        
    </div>
  )
}
