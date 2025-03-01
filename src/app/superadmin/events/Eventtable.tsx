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

import { Plus, Delete, Trash, Eye, Pen, Trash2 } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";
import { selectTeams } from '@/types/data'
import axios, { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { useRouter, useSearchParams } from 'next/navigation'
import { createEvent, CreateEvent } from '@/schema/schema'
import Spinner from '@/components/common/Spinner'
import PaginitionComponent from '@/components/common/Pagination'
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

type Team = Record<"teamname" | "teamid", string>;

type Events = {
  enddate: string
startdate: string
teams:Subdata[]
title: string
eventid: string

}

type Subdata = {
  teamname: string
_id: string

}


export default function Eventtable() {
  const [dialog, setDialog] = useState(false)
  const [dialog2, setDialog2] = useState(false)

  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<Team[]>([]);
  const [inputValue, setInputValue] = React.useState("");
  const [teams, setTeams] = useState<Team[]>([])


  const [list, setList] = useState<Events[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [totalpage, setTotalpage] = useState(0)
  const [currentpage, setCurrentpage] = useState(0)
  const router = useRouter()
  const params = useSearchParams()
  const state = params.get('state')
  const [id, setId] = useState('')

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
    (team) => !selected.some((selectedTeam) => selectedTeam.teamid === team.teamid)
  );
  


  //event list
  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      const getList = async () => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/events/listevents?page=${currentpage}&limit=10&eventtitlefilter=${search}`,{
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
            }
        })
  
        setList(response.data.data.eventlist)
        setTotalpage(response.data.data.totalpages)
        setLoading(false)

        if(search !== ''){
          setCurrentpage(0)
        }
       
      }
      getList()
    }, 500)
    return () => clearTimeout(timer)
    
  },[search, currentpage, state])

  const getList = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/events/listevents?page=${currentpage}&limit=10&eventtitlefilter=${search}`,{
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
        }
    })

    setList(response.data.data.eventlist)
    setTotalpage(response.data.data.totalpages)
    setLoading(false)

    if(search !== ''){
      setCurrentpage(0)
    }
   
  }

   //create events
   const {
    register,
    handleSubmit,
    reset,
    unregister,
    setValue,
    formState: { errors },
  } = useForm<CreateEvent>({
    resolver: zodResolver(createEvent),
  });

  const onSubmit = async (data: CreateEvent) => {
    setLoading(true)
    const selectedIds = selected.map((row) => row.teamid);
    router.push('?state=true')
    try {
      const request = axios.post(`${process.env. NEXT_PUBLIC_API_URL}/events/createevents`,{
          eventtitle: data.eventitle,
          startdate: data.startdate, 
          enddate: data.enddate, 
          teams: selectedIds
       
      },
          {
              withCredentials: true,
              headers: {
              'Content-Type': 'application/json'
              }
          }
      )

   const response = await toast.promise(request, {
       loading: 'Creating event ....',
       success: `Successfully created`,
       error: 'Error while creating event',
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

  const editEvent = async (data: CreateEvent) => {
    setLoading(true)
    const selectedIds = selected.map((row) => row.teamid);
    router.push('?state=true')
    try {
      const request = axios.post(`${process.env. NEXT_PUBLIC_API_URL}/events/editevents`,{
          eventid: id,
          eventtitle: data.eventitle,
          startdate: data.startdate, 
          enddate: data.enddate, 
          teams: selectedIds
       
      },
          {
              withCredentials: true,
              headers: {
              'Content-Type': 'application/json'
              }
          }
      )

   const response = await toast.promise(request, {
       loading: 'Editing event ....',
       success: `Successfully edited`,
       error: 'Error while editing event',
   });

   if(response.data.message === 'success'){
     reset()
     setDialog2(false)
     router.push('?state=false')
     setLoading(false)
     setSelected([])
     window.location.reload()

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

  //delete
  const deleteEvent = async (id: string) => {
    setLoading(true)
    router.push('?state=true')
    try {
      const request = axios.post(`${process.env. NEXT_PUBLIC_API_URL}/events/deleteevent`,{
        eventid: id
     
      },
          {
              withCredentials: true,
              headers: {
              'Content-Type': 'application/json'
              }
          }
      )

    const response = await toast.promise(request, {
        loading: 'Deleting event....',
        success: `Successfully deleted`,
        error: 'Error while deleting event',
    });

   if(response.data.message === 'success'){
     router.push('?state=false')
     setLoading(false)
     getList()

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

  //paginition
  const handlePageChange = (page: number) => {
    setCurrentpage(page)
  }

  const formatDate = (date: string) => {
    const newDate = date.split('T')

    return newDate[0]
  }


  console.log(selected, selectables)




  return (
    <div className=' w-full h-full flex justify-center bg-secondary p-6 mt-[150px] text-zinc-100'>

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
                    <p className=' p-2 uppercase text-sm font-semibold mt-8 bg-gradient-to-r from-zinc-950 to-zinc-950/10'>Create Event</p>
                  </div>

                  <div className=' flex flex-col gap-2 p-4'>
                    <DialogHeader>
                    <DialogDescription>
                    </DialogDescription>
                    </DialogHeader>
                  <form onSubmit={handleSubmit(onSubmit)} className=' flex flex-col '>
                    <h2 className=' uppercase font-semibold text-sm'>Event Details</h2>
                    <div className=' grid grid-cols-1 gap-4'>
                      <div className=' flex flex-col gap-1'>
                        <label htmlFor="" className=' mt-2 text-xs'>Event Title</label>
                        <Input placeholder='Event Title' type='text' className=' bg-primary h-[35px] text-xs' {...register('eventitle')}/>
                        {errors.eventitle && <p className=' text-[.6em] text-red-500'>{errors.eventitle.message}</p>}


                        <label htmlFor="" className=' mt-2 text-xs'>Start date</label>
                        <Input placeholder='Start date' type='date' className=' bg-primary h-[35px] text-xs' {...register('startdate')}/>
                        {errors.startdate && <p className=' text-[.6em] text-red-500'>{errors.startdate.message}</p>}


                        <label htmlFor="" className=' mt-2 text-xs'>End Date</label>
                        <Input placeholder='End Date' type='date' className=' bg-primary h-[35px] text-xs' {...register('enddate')}/>
                        {errors.enddate && <p className=' text-[.6em] text-red-500'>{errors.enddate.message}</p>}


                        <label htmlFor="" className=' mt-2 text-xs'>Team</label>
                        {/* <Select>
                          <SelectTrigger className="w-full bg-primary text-xs">
                            <SelectValue placeholder="Team" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            
                          </SelectContent>
                        </Select> */}

                        <Command
                        onKeyDown={handleKeyDown}
                        className="overflow-visible text-white bg-primary mt-2"
                      >
                        <div className="group bg-primary px-3 py-2 text-sm ">
                          <div className="flex flex-wrap gap-1">
                            {selected.map((framework) => {
                              return (
                                <Badge key={framework.teamid} variant="secondary" className=' text-white'>
                                  {framework.teamname}
                                  <button
                                    className="ml-1 rounded-full text-white outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter") {
                                        handleUnselect(framework);
                                      }
                                    }}
                                    onMouseDown={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                    }}
                                    onClick={() => handleUnselect(framework)}
                                  >
                                    <X className="h-3 w-3 text-red-600" />
                                  </button>
                                </Badge>
                              );
                            })}
                            {/* Avoid having the "Search" Icon */}
                            <CommandPrimitive.Input
                              ref={inputRef}
                              value={inputValue}
                              onValueChange={setInputValue}
                              onBlur={() => setOpen(false)}
                              onFocus={() => setOpen(true)}
                              placeholder="Select teams"
                              className=" flex-1 bg-transparent outline-none placeholder:text-white"
                            />
                          </div>
                        </div>
                        <div className="relative mt-2">
                          <CommandList>
                            {open && selectables.length > 0 ? (
                              <div className="absolute top-0 z-10 w-full h-[200px] rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
                                <CommandGroup className="h-full overflow-auto">
                                  {selectables.map((framework) => {
                                    return (
                                      <CommandItem
                                        key={framework.teamid}
                                        onMouseDown={(e) => {
                                          e.preventDefault();
                                          e.stopPropagation();
                                        }}
                                        onSelect={(value) => {
                                          setInputValue("");
                                          setSelected((prev) => [...prev, framework]);
                                        }}
                                        className={"cursor-pointer"}
                                      >
                                        {framework.teamname}
                                      </CommandItem>
                                    );
                                  })}
                                </CommandGroup>
                              </div>
                            ) : null}
                          </CommandList>
                        </div>
                        </Command>

                      </div>

                      <div className=' w-full flex items-end justify-end gap-2 mt-8'>
                            <button disabled={loading} className=' btn-red flex items-center justify-center gap-2'>
                            {loading === true && (
                              <div className=' spinner2'></div>
                            )}
                              Create</button>
                      
                      </div>

                      
                    </div>
                      

                  </form>
                  
                    

                  </div>
                  
                </DialogContent>
                </Dialog>
            </div>

            {/* <div className=' flex items-center gap-2'>
                <Input type='text' className=' bg-primary h-[35px] text-zinc-100'/>
                <button className=' bg-red-700 px-8 py-2 rounded-sm text-xs'>Search</button>
            </div> */}

          <div className=' flex flex-col gap-1'>
                <label htmlFor="" className=' text-xs'>Search</label>
                <Input value={search} placeholder='Search event title (clear the input to reset)' onChange={(e) => setSearch(e.target.value)} type='text' className=' w-[300px] bg-primary text-zinc-100 text-xs h-[35px]'/>
                {/* <button className='px-8 py-2 rounded-sm text-xs bg-red-700'>Search</button> */}
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
            <TableHead>Event Name</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Teams</TableHead>
            <TableHead>Action</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
          {list.map((item, index) => (
             <TableRow key={index}>
             <TableCell className="font-medium">{item.title}</TableCell>
             <TableCell className="font-medium">{new Date(item.startdate).toLocaleString()}</TableCell>
             <TableCell className="font-medium">{new Date(item.enddate).toLocaleString()}</TableCell>
             <TableCell className=' '>
             
              <Dialog>
                <DialogTrigger><button className=' bg-red-700 p-2 rounded-sm text-white flex items-center gap-2'><Eye size={15}/>View Team</button></DialogTrigger>
                <DialogContent className=' p-6 bg-secondary text-white border-none'>
                  <DialogHeader>
                    <DialogTitle className=' text-red-700'>Team</DialogTitle>
                    <DialogDescription>
                      
                    </DialogDescription>
                  </DialogHeader>

                   <Table className=''>
                    <TableHeader>
                        <TableRow>
                        <TableHead>Team Id</TableHead>
                        <TableHead>Name</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                      {item.teams.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{item._id}</TableCell>
                          <TableCell className="font-medium">{item.teamname}</TableCell>
                        </TableRow>
                      ))}
                        
                    </TableBody>
                    </Table>
                </DialogContent>
              </Dialog>
 
             </TableCell>
             <TableCell className=" flex items-center gap-2">
               

               <Dialog >
                <DialogTrigger>
                <button onClick={() => { setId(item.eventid),setValue('eventitle', item.title), setValue('startdate',formatDate(item.startdate)),setValue('enddate', formatDate(item.enddate)), setSelected(item.teams.map(team => ({ teamname: team.teamname, teamid: team._id })))}} className=' p-2 rounded-sm bg-red-700 text-white'><Pen size={15}/></button>
                </DialogTrigger>
                <DialogContent className=' bg-secondary border-none text-zinc-100 grid grid-cols-1 lg:grid-cols-[250px,1fr]'>
                  <div className=' bg-blue-400 lg:block hidden'
                  style={{backgroundImage: `url('/bg2.png')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat:"no-repeat"}}
                  
                  >
                    <p className=' p-2 uppercase text-sm font-semibold mt-8 bg-gradient-to-r from-zinc-950 to-zinc-950/10'>Edit Event</p>
                  </div>

                  <div className=' flex flex-col gap-2 p-4'>
                    <DialogHeader>
                    <DialogDescription>
                    </DialogDescription>
                    </DialogHeader>
                  <form onSubmit={handleSubmit(editEvent)} className=' flex flex-col '>
                    <h2 className=' uppercase font-semibold text-sm'>Event Details</h2>
                    <div className=' grid grid-cols-1 gap-4'>
                      <div className=' flex flex-col gap-1'>
                        <label htmlFor="" className=' mt-2 text-xs'>Event Title</label>
                        <Input placeholder='Event Title' type='text' className=' bg-primary h-[35px] text-xs' {...register('eventitle')}/>
                        {errors.eventitle && <p className=' text-[.6em] text-red-500'>{errors.eventitle.message}</p>}


                        <label htmlFor="" className=' mt-2 text-xs'>Start date</label>
                        <Input placeholder='Start date' type='date' className=' bg-primary h-[35px] text-xs' {...register('startdate')}/>
                        {errors.startdate && <p className=' text-[.6em] text-red-500'>{errors.startdate.message}</p>}


                        <label htmlFor="" className=' mt-2 text-xs'>End Date</label>
                        <Input placeholder='End Date' type='date' className=' bg-primary h-[35px] text-xs' {...register('enddate')}/>
                        {errors.enddate && <p className=' text-[.6em] text-red-500'>{errors.enddate.message}</p>}


                        <label htmlFor="" className=' mt-2 text-xs'>Team</label>
                      

                        <Command
                        onKeyDown={handleKeyDown}
                        className="overflow-visible text-white bg-primary mt-2"
                      >
                        <div className="group bg-primary px-3 py-2 text-sm ">
                          <div className="flex flex-wrap gap-1">
                            {selected.map((framework) => {
                              return (
                                <Badge key={framework.teamid} variant="secondary" className=' text-white'>
                                  {framework.teamname}
                                  <button
                                    className="ml-1 rounded-full text-white outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter") {
                                        handleUnselect(framework);
                                      }
                                    }}
                                    onMouseDown={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                    }}
                                    onClick={() => handleUnselect(framework)}
                                  >
                                    <X className="h-3 w-3 text-red-600" />
                                  </button>
                                </Badge>
                              );
                            })}
                            <CommandPrimitive.Input
                              ref={inputRef}
                              value={inputValue}
                              onValueChange={setInputValue}
                              onBlur={() => setOpen(false)}
                              onFocus={() => setOpen(true)}
                              placeholder="Select teams"
                              className=" flex-1 bg-transparent outline-none placeholder:text-white"
                            />
                          </div>
                        </div>
                        <div className="relative mt-2">
                          <CommandList>
                            {open && selectables.length > 0 ? (
                              <div className="absolute top-0 z-10 w-full h-[200px] rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
                                <CommandGroup className="h-full overflow-auto">
                                  {selectables.map((framework) => {
                                    return (
                                      <CommandItem
                                        key={framework.teamid}
                                        onMouseDown={(e) => {
                                          e.preventDefault();
                                          e.stopPropagation();
                                        }}
                                        onSelect={(value) => {
                                          setInputValue("");
                                          setSelected((prev) => [...prev, framework]);
                                        }}
                                        className={"cursor-pointer"}
                                      >
                                        {framework.teamname}
                                      </CommandItem>
                                    );
                                  })}
                                </CommandGroup>
                              </div>
                            ) : null}
                          </CommandList>
                        </div>
                        </Command>

                      </div>

                      <div className=' w-full flex items-end justify-end gap-2 mt-8'>
                            <button disabled={loading} className=' btn-red flex items-center justify-center gap-2'>
                            {loading === true && (
                              <div className=' spinner2'></div>
                            )}
                              Save</button>
                      
                      </div>

                      
                    </div>
                      

                  </form>
                  
                    

                  </div>
                  
                </DialogContent>
                </Dialog>

                <AlertDialog>
                <AlertDialogTrigger><button className=' p-2 bg-red-700 text-white rounded-md'><Trash2 size={15}/></button></AlertDialogTrigger>
                <AlertDialogContent className=' text-white'>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete the event.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => deleteEvent(item.eventid)} className=' bg-red-600'>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

               
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
  )
}
