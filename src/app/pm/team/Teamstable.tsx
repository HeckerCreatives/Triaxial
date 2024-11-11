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
import { useRouter, useSearchParams } from 'next/navigation'
import Indiviualworkloads from './Individualworkloads'
import Viewbtn from '@/components/common/Viewbtn'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createTeam, CreateTeam } from '@/schema/schema'
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import Spinner from '@/components/common/Spinner'
import PaginitionComponent from '@/components/common/Pagination'


type Members = Record<"name" | "employeeid", string>;

type Team = {
  manager: string
teamid: string
teamleader: string
teamname: string
}


type TeamData = {
  teamid: string
  teamname: string
  directorpartner: string
  associate: string
  manager: {
      fullname: string
      managerid: string
  },
  teamleader: {
      fullname:string 
      teamleaderid: string
  },
  members: [
      {
          fullname: string
          memberid: string
      }
    ]
}

export default function Teamstable() {
  const router = useRouter()
  const search = useSearchParams()
  const tab = search.get('active')

  const [loading, setLoading] = useState(false)
  const [employee, setEmployee] = useState<Members[]>([])
  const state = search.get('state')
  const [totalpage, setTotalpage] = useState(0)
  const [currentpage, setCurrentpage] = useState(0)
  const [teamdata, setTeamdata] = useState<TeamData>()
  const [teamid, setTeamid] = useState('')


  //create team
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateTeam>({
    resolver: zodResolver(createTeam),
    defaultValues: {
      teamname: teamid !== '' ? teamdata?.teamname : '',
      teamleader: teamid !== '' ? teamdata?.teamleader.teamleaderid : '',
      associate: teamid !== '' ? teamdata?.associate : '',
      directorpartner: teamid !== '' ? teamdata?.directorpartner : '',
      manager: teamid !== '' ? teamdata?.manager.managerid : '',
    },
  });

  //team list
  const [searchteam, setSearchteam] = useState('')
  const [teamlist, setTeamlist] = useState<Team[]>([])
  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      const getList = async () => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/teams/managerlistownteam?teamnamefilter=${searchteam}&page=${currentpage}&limit=10`,{
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
            }
        })
  
        setTeamlist(response.data.data.teams)
        setTotalpage(response.data.data.totalpages)
        setLoading(false)
       
      }
      getList()
    },500)
    return () => clearTimeout(timer)
    
    
  },[state, searchteam, currentpage])


  //paginition
  const handlePageChange = (page: number) => {
    setCurrentpage(page)
  }

   // Dynamically reset the form based on teamid
   useEffect(() => {
    if (teamid !== '') {
      // If teamid exists, populate form with teamdata for edit
      reset({
        teamname: teamdata?.teamname || '',
        teamleader: teamdata?.teamleader?.teamleaderid || '',
        associate: teamdata?.associate || '',
        directorpartner: teamdata?.directorpartner || '',
        manager: teamdata?.manager?.managerid || '',
      });
    } else {
      // If teamid is empty, reset the form to empty for create
      reset({
        teamname: '',
        teamleader: '',
        associate: '',
        directorpartner: '',
        manager: '',
      });
    }
  }, [teamid, teamdata, reset]);


  return (
    <>
    {tab === null && (
      <div className=' w-full h-full flex justify-center bg-secondary p-6 text-zinc-100'>

      <div className=' w-full flex flex-col max-w-[1520px]'>
        <div className=' flex md:flex-row flex-col items-center justify-between gap-4'>
          <div>
            
          </div>
            {/* <div className=' flex  items-center gap-4'>
              <Dialog open={dialog} onOpenChange={setDialog}>
                <DialogTrigger>
                  <button className=' bg-primary px-6 py-2 rounded-sm flex items-center gap-1 text-xs'><Plus size={15}/>Create</button>
                </DialogTrigger>
                <DialogContent className=' bg-secondary border-none text-zinc-100 grid grid-cols-1 lg:grid-cols-[250px,1fr]'>
                  <div className=' bg-blue-400 lg:block hidden'
                  style={{backgroundImage: `url('/bg2.png')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat:"no-repeat"}}
                  
                  >
                    <p className=' p-2 uppercase text-lg font-semibold mt-8 bg-gradient-to-r from-zinc-950 to-zinc-950/10'>Create team</p>
                  </div>

                  <div className=' flex flex-col gap-2 p-4'>
                    <DialogHeader>
                    <DialogDescription>
                      
                    </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)} action="" className=' flex flex-col '>
                        <div className=' flex flex-col'>
                          <label htmlFor="" className=' mt-2 text-xs'>Team name</label>
                          <Input placeholder='Team Name' type='text' className=' bg-primary text-xs' {...register('teamname')}/>
                          {errors.teamname && <p className=' text-[.6em] text-red-500'>{errors.teamname.message}</p>}


                          <label htmlFor="" className=' mt-2 text-xs'>Director Partner</label>
                          <Input placeholder='Director Partner' type='text' className=' bg-primary text-xs' {...register('directorpartner')}/>
                          {errors.directorpartner && <p className=' text-[.6em] text-red-500'>{errors.directorpartner.message}</p>}


                          <label htmlFor="" className=' mt-2 text-xs'>Associate</label>
                          <Input placeholder='Associate' type='text' className=' bg-primary text-xs' {...register('associate')}/>
                          {errors.associate && <p className=' text-[.6em] text-red-500'>{errors.associate.message}</p>}


                          <label htmlFor="" className=' mt-2 text-xs'>Manager</label>
                          <Select onValueChange={(value) => setValue('manager', value)} {...register('manager')}>
                              <SelectTrigger className="w-full text-xs h-[35px] bg-primary">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent className=' text-xs'>
                               
                                {Object.values(managers).map((item, index) => (
                                  <SelectItem key={index} value={item.employeeid}>{item.name}</SelectItem>
                                ))}
                              
                              </SelectContent>
                            </Select>
                          {errors.manager && <p className=' text-[.6em] text-red-500'>{errors.manager.message}</p>}

                          <label htmlFor="" className=' mt-2 text-xs'>Team Leader</label>
                          <Select onValueChange={(value) => setValue('teamleader', value)} {...register('teamleader')}>
                              <SelectTrigger className="w-full text-xs h-[35px] bg-primary">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent className=' text-xs'>
                               
                                {Object.values(employee).map((item, index) => (
                                  <SelectItem key={index} value={item.employeeid}>{item.name}</SelectItem>
                                ))}
                              
                              </SelectContent>
                            </Select>
                          {errors.teamleader && <p className=' text-[.6em] text-red-500'>{errors.teamleader.message}</p>}



                        <Command
                          onKeyDown={handleKeyDown}
                          className="overflow-visible text-white bg-primary mt-4"
                        >
                          <div className="group bg-primary px-3 py-2 text-sm ">
                            <div className="flex flex-wrap gap-1">
                              {selected.map((item) => {
                                return (
                                  <Badge key={item.employeeid} variant="secondary" className=' text-white'>
                                    {item.name}
                                    <button
                                      className="ml-1 rounded-full text-white outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                      onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                          handleUnselect(item);
                                        }
                                      }}
                                      onMouseDown={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                      }}
                                      onClick={() => handleUnselect(item)}
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
                                placeholder="Select members"
                                className=" flex-1 bg-transparent outline-none placeholder:text-white"
                              />
                            </div>
                          </div>
                          <div className="relative mt-2">
                            <CommandList>
                              {open && selectables.length > 0 ? (
                                <div className="absolute top-0 z-10 w-full h-[200px] rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
                                  <CommandGroup className="h-full overflow-auto">
                                    {selectables.map((list) => {
                                      return (
                                        <CommandItem
                                          key={list.employeeid}
                                          onMouseDown={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                          }}
                                          onSelect={(value) => {
                                            setInputValue("");
                                            setSelected((prev) => [...prev, list]);
                                          }}
                                          className={"cursor-pointer"}
                                        >
                                          {list.name}
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

                    </form>
                  
                    

                  </div>
                  
                </DialogContent>
              </Dialog>

                <AlertDialog open={dialog2} onOpenChange={setDialog2}>
                <AlertDialogTrigger>
                  <button className=' bg-red-600 px-6 py-2 rounded-sm flex items-center gap-1 text-xs'><Trash size={15}/>Delete</button>
                </AlertDialogTrigger>
                <AlertDialogContent className=' bg-secondary text-zinc-100'>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete the team
                      and remove your data from servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className=' hover:bg-primary hover:text-zinc-100'>Cancel</AlertDialogCancel>
                    <button disabled={loading} onClick={deleteTeam} className=' btn-red flex items-center justify-center gap-2'>
                      {loading === true && (
                        <div className='spinner2 '></div>
                      )}
                      Continue</button>
                  </AlertDialogFooter>
                </AlertDialogContent>
                </AlertDialog>
            </div> */}

            <div className=' flex flex-col gap-1'>
                <label htmlFor="" className=' text-xs'>Search</label>
                <Input value={searchteam} placeholder='Search team name (clear the input to reset)' onChange={(e) => setSearchteam(e.target.value)} type='text' className=' w-[300px] bg-primary text-zinc-100 text-xs h-[35px]'/>
                {/* <button className='px-8 py-2 rounded-sm text-xs bg-red-700'>Search</button> */}
            </div>

         
            
        </div>

        <Table className=' mt-4'>
        {teamlist.length === 0 &&  
          <TableCaption className=' text-xs text-zinc-500'>No data</TableCaption>
          }
          
        {loading === true && (
            <TableCaption className=' '>
              <Spinner/>
            </TableCaption>
          )}
        <TableHeader>
            <TableRow>
            {/* <TableHead className="">Select</TableHead> */}
            <TableHead className="">Team name</TableHead>
            <TableHead className="">Project Manager</TableHead>
            <TableHead className="">Team Leader</TableHead>
            <TableHead>Total Project</TableHead>
            {/* <TableHead className="">Projects</TableHead> */}
            <TableHead className="">Individual Workloads</TableHead>
            <TableHead className="">Invoice Projection</TableHead>
            {/* <TableHead className="">Due on</TableHead> */}
            {/* <TableHead className="">Action</TableHead> */}
            </TableRow>
        </TableHeader>
        <TableBody>
          {teamlist.map((item, index) => (
            <TableRow key={item.teamid}>
            {/* <TableCell className="font-medium">
            <input 
                checked={selectedRows.some((row) => row.id === `${item.teamid}`)}
                onChange={() => handleSelectRow(`${item.teamid}`, `${item.teamname}`)}
                type="checkbox" />
            </TableCell> */}
            <TableCell className="font-medium">{item.teamname}</TableCell>
            <TableCell className="font-medium">{item.manager}</TableCell>
            <TableCell>{item.teamleader}</TableCell>
            <TableCell>1</TableCell>
            {/* <TableCell>
                <Viewbtn disabled={false} name='View' onClick={() => router.push('/pm/graph/teamprojects')}/>
            </TableCell> */}
            <TableCell>
                <Viewbtn disabled={false} name='View' onClick={() => router.push('/pm/graph/individualmemberworkload')}/>
            </TableCell>
            <TableCell>
                <Viewbtn disabled={true} name='View' onClick={() => router.push('?active=members')}/>
            </TableCell>

            {/* <TableCell>
                <Viewbtn disabled={false} name='View' onClick={() => router.push('?active=due on')}/>
            </TableCell> */}

            {/* <TableCell>
               
                <Dialog open={dialog3} onOpenChange={setDialog3}>
                <DialogTrigger>
                  <button onClick={() => {setTeamid(item.teamid) }} className=' btn-red'>Edit</button>
                </DialogTrigger>
                <DialogContent className=' bg-secondary border-none text-zinc-100 grid grid-cols-1 lg:grid-cols-[250px,1fr]'>
                  <div className=' bg-blue-400 lg:block hidden'
                  style={{backgroundImage: `url('/bg2.png')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat:"no-repeat"}}
                  
                  >
                    <p className=' p-2 uppercase text-lg font-semibold mt-8 bg-gradient-to-r from-zinc-950 to-zinc-950/10'>Edit team</p>
                  </div>

                  <div className=' flex flex-col gap-2 p-4'>
                    <DialogHeader>
                    <DialogDescription>
                    </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(editTeam)} action="" className=' flex flex-col '>
                        <div className=' flex flex-col'>
                          <label htmlFor="" className=' mt-2 text-xs'>Team name</label>
                          <Input placeholder={'Team Name'} type='text' className=' bg-primary text-xs' {...register('teamname')}/>
                          {errors.teamname && <p className=' text-[.6em] text-red-500'>{errors.teamname.message}</p>}


                          <label htmlFor="" className=' mt-2 text-xs'>Director Partner</label>
                          <Input placeholder='Director Partner' type='text' className=' bg-primary text-xs' {...register('directorpartner')}/>
                          {errors.directorpartner && <p className=' text-[.6em] text-red-500'>{errors.directorpartner.message}</p>}


                          <label htmlFor="" className=' mt-2 text-xs'>Associate</label>
                          <Input placeholder='Associate' type='text' className=' bg-primary text-xs' {...register('associate')}/>
                          {errors.associate && <p className=' text-[.6em] text-red-500'>{errors.associate.message}</p>}


                          <label htmlFor="" className=' mt-2 text-xs'>Current Manager({teamdata?.manager.fullname})</label>
                          <Select value={managerValue} onValueChange={(value) => setValue('manager', value)} {...register('manager')}>
                              <SelectTrigger className="w-full text-xs h-[35px] bg-primary">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent className=' text-xs'>
                               
                                {Object.values(managers).map((item, index) => (
                                  <SelectItem key={index} value={item.employeeid}>{item.name}</SelectItem>
                                ))}
                              
                              </SelectContent>
                            </Select>
                          {errors.manager && <p className=' text-[.6em] text-red-500'>{errors.manager.message}</p>}

                          <label htmlFor="" className=' mt-2 text-xs'>Current Team Leader({teamdata?.teamleader.fullname})</label>
                          <Select value={leaderValue} onValueChange={(value) => setValue('teamleader', value)} {...register('teamleader')}>
                              <SelectTrigger className="w-full text-xs h-[35px] bg-primary">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent className=' text-xs'>
                               
                                {Object.values(employee).map((item, index) => (
                                  <SelectItem key={index} value={item.employeeid}>{item.name}</SelectItem>
                                ))}
                              
                              </SelectContent>
                            </Select>
                          {errors.teamleader && <p className=' text-[.6em] text-red-500'>{errors.teamleader.message}</p>}


                       

                        <Command
                          onKeyDown={handleKeyDown}
                          className="overflow-visible text-white bg-primary mt-4"
                        >
                          <div className="group bg-primary px-3 py-2 text-sm ">
                            <div className="flex flex-wrap gap-1">
                              {selected.map((item) => {
                                return (
                                  <Badge key={item.employeeid} variant="secondary" className=' text-white'>
                                    {item.name}
                                    <button
                                      className="ml-1 rounded-full text-white outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                      onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                          handleUnselect(item);
                                        }
                                      }}
                                      onMouseDown={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                      }}
                                      onClick={() => handleUnselect(item)}
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
                                placeholder="Select members"
                                className=" flex-1 bg-transparent outline-none placeholder:text-white"
                              />
                            </div>
                          </div>
                          <div className="relative mt-2">
                            <CommandList>
                              {open && selectables.length > 0 ? (
                                <div className="absolute top-0 z-10 w-full h-[200px] rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
                                  <CommandGroup className="h-full overflow-auto">
                                    {selectables.map((list) => {
                                      return (
                                        <CommandItem
                                          key={list.employeeid}
                                          onMouseDown={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                          }}
                                          onSelect={(value) => {
                                            setInputValue("");
                                            setSelected((prev) => [...prev, list]);
                                          }}
                                          className={"cursor-pointer"}
                                        >
                                          {list.name}
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
                            Save Changes</button>
                        </div>

                    </form>
                  
                    

                  </div>
                  
                </DialogContent>
              </Dialog>
            </TableCell> */}
           

            </TableRow>
          ))}
            
        </TableBody>
        </Table>

        
       {teamlist.length !== 0 && (
       <PaginitionComponent currentPage={currentpage} total={totalpage} onPageChange={handlePageChange}/>
       )}
      </div>
        
    </div>
    )}

  

    {tab === 'members' && (
      <Indiviualworkloads/>
    )}

    </>
    
  )
}
