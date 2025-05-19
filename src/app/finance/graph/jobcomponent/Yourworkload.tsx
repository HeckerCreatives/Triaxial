"use client"
import React, { useEffect, useRef, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Legends from '@/components/common/Legends'
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { useRouter, useSearchParams } from 'next/navigation'
import {statusData, statusDataMultiple} from '@/types/data'
import { Check, Copy, Eye, File, Folder, Layers2, OctagonAlert, Pen, Plus, RefreshCcw, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Graph, GraphComponent, Members, MembersComponent } from '@/types/types'
import { formatAustralianDate, formatDate, truncateText } from '@/utils/functions'
import { any } from 'zod'
import Invoice from '@/components/forms/Invoice'
import JobComponentStatus from '@/components/forms/JobComponentStatus'
import EditJobComponent from '@/components/forms/EditJobComponent'
import DuplicateJobComponent from '@/components/forms/DuplicateJobComponent'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { clientColor } from '@/utils/helpers'
import Individualrequest from './IndividualRequest'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import Createprojectcomponent from '@/components/forms/Createprojectcomponent'
import Duplicatecomponent from '@/components/forms/DuplicateComponent'
import Variationcomponent from '@/components/forms/Variationcomponent'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import Loader from '@/components/common/Loader'
import Button from '@/components/common/Button'
import Editnotes from '@/components/forms/Editnotes'
import EditMember from '@/components/forms/EditMember'
import refreshStore from '@/zustand/refresh'






type Employee = {
  employeeid: string,
  name: string
}

type Client = {
  clientname: string
clientid: string
}

type Project = {
  projectid: string
  projectname: string
}

type Event = {
  startdate: string
  enddate: string
}

type Wellnessday = {
  startdate: string
  enddate: string
}

type Leave = {
  leavestart: string
  leaveend: string
}

interface FormData {
  startdate: string;
  enddate: string;
  employeeid: string;
  hours: number;
  jobcomponentid: string;
  status: string[];
}

type List = {
  name: string
  members: Workload[]
}

type Workload = {
initial: string
id: string,
name: string
resource: string
dates: Dates[]
leave: [
  {
    leavestart: string
    leaveend: string
    }
],
event: eventRequest []
wellness: [
  {
    requestdate: string
  }
],
wfh: [
  {
    requestdate: string
  }
]
}

type Dates = {
  date: string
  eventDay: boolean
  leave: boolean
  status: string[]
  totalhoursofjobcomponents: number
  wellnessDay: boolean
}

type Wellness = { requestdate: string };
type WFH = { requestdate: string };
type eventRequest = {
                                    startdate: string
                                    enddate: string
                                }



export default function Yourworkload() {
  const [dialog, setDialog] = useState(false)
  const [dialog2, setDialog2] = useState(false)
  const [dialog3, setDialog3] = useState(false)
  const [leaveStatus, setLeavestatus] = useState(false)
  const [date, setDate] = useState('')
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [hours, setHours] = useState(0)
  const [employeeid, setEmployeeid] = useState('')
  const [projectid, setProjectid] = useState('')
  const params = useSearchParams()
  const id = params.get('teamid')
  const jobid = params.get('682ada5577050389a5178073')
  const scrollId= params.get('jobno')
  const refresh = params.get('state')
  const [addStatus, setAddstatus] = useState<string[]>([])
  const [wdStatus, setWdstatus] = useState(false)
  const [event, setEvent] = useState(false)
  const [leave, setLeave] = useState(false)
  const [isJobmamager, setIsjobmanager] = useState(true) 
  const [isMamager, setIsmanager] = useState(true) 
  const [employee, setEmployee] = useState<Employee[]>([])
  const [client, setClient] = useState<Client[]>([])
  const [projects, setProjects] = useState<Project[]>([])

  const [projectname, setProjectname] = useState('')
  const [jobmanager, setJobmanager] = useState('')
  const [jobno, setJobno] = useState('')

  const [engr, setEngr] = useState('')
  const [engrrvr, setEngrrvr] = useState('')
  const [drf, setDrf] = useState('')
  const [drfrvr, setDrfrvr] = useState('')
  const [notes, setNotes] = useState('')
  const [notes2, setNotes2] = useState('')
  const [notes3, setNotes3] = useState('')
  const [notes4, setNotes4] = useState('')

  const [componentid, setComponentid] = useState('')
  const [tempData, setTempdata] = useState()
  const [list, setList] = useState<GraphComponent[]>([])
  const [search, setSearch] = useState('')
  const [startReq, setStartReq] = useState('')
  const [endReq, setEndReq] = useState('')
  const [listRequest, setListrequest] = useState<List[]>([])
  const [dateFilter, setDateFilter] = useState<Date | null>(null)
  const gettoday = new Date()
  const todaysDate = gettoday.getDate()

  const filterDate = dateFilter === null ?  '' : (dateFilter?.toLocaleString())?.split(',')[0]
  const [loading, setLoading] = useState(false)

  

  const containerRef1 = useRef<HTMLDivElement>(null);
  const containerRef2 = useRef<HTMLDivElement>(null);
  // const rowRefs = useRef<{ [key: string]: HTMLTableRowElement | null }>({});
  const rowRefs = useRef<{ [key: string]: HTMLTableRowElement | null }>({});


  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const {refresh: isRefresh, setRefresh} = refreshStore()
  const [listrequestdates, setListrequestdates] = useState<string[]>([])
  

  // Sync scroll positions
  const syncScroll = (source: React.RefObject<HTMLDivElement>, target: React.RefObject<HTMLDivElement>) => {
    if (source.current && target.current) {
      target.current.scrollLeft = source.current.scrollLeft;
    }
  };

  // Handle mouse down for dragging
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>, containerRef: React.RefObject<HTMLDivElement>) => {
    if (!containerRef.current) return;
    isDownRef.current = true;
    startXRef.current = e.pageX - containerRef.current.offsetLeft;
    scrollLeftRef.current = containerRef.current.scrollLeft;
  };

  // Handle mouse up or leave
  const handleMouseLeaveOrUp = () => {
    isDownRef.current = false;
  };

  // Handle mouse move for dragging
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, containerRef: React.RefObject<HTMLDivElement>) => {
    if (!isDownRef.current || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 2;
    containerRef.current.scrollLeft = scrollLeftRef.current - walk;
    syncScroll(containerRef, containerRef === containerRef1 ? containerRef2 : containerRef1);
  };
  

  //individual reaquest
  useEffect(() => {
    const getList = async () => {
      if (id !== '' || undefined || null) {
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/jobcomponent/getjobcomponentindividualrequest?teamid=${id}`, {
            withCredentials: true
          })
          setListrequest(response.data.data.teams)
          setListrequestdates(response.data.data.alldates)
        } catch (error) {
          console.error('Error fetching data', error)
        }
      }
    }
    getList()
  }, [ id])

   const getIndividualList = async () => {
      if (id !== '' || undefined || null) {
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/jobcomponent/getjobcomponentindividualrequest?teamid=${id}`, {
            withCredentials: true
          })
          setListrequest(response.data.data.teams)
          setListrequestdates(response.data.data.alldates)
        } catch (error) {
          console.error('Error fetching data', error)
        }
      }
    }

  const statusColorRequest = (
    date: string, 
    eventDates: eventRequest[], 
    // events: { eventstart: string; eventend: string }[], 
    leaveDates: Leave[], 
    wellness: Wellness[], 
    wfh: WFH[] = []
  ): string[] => {
    const colorData: string[] = [];
  
    const isWithinAnyEventDate = eventDates.some((item) =>
      isDateInRange(date, item.startdate, item.enddate)
    );
  
    const isWithinAnyLeaveDate = leaveDates.some((item) =>
      isDateInRange(date, item.leavestart, item.leaveend)
    );

    // const isWellnessDate = wellness.some((item) =>
    //   isDateInRange(date, item.wellnessdates, item.leaveend)
    // );

    const isWFH = wfh.some((item) => formatDate(item.requestdate) === formatDate(date));
    const isWellnessDate = wellness.some((item) => formatDate(item.requestdate) === formatDate(date));

    if(!isWithinAnyLeaveDate){
      if (isWithinAnyEventDate) {
        colorData.push("bg-gray-300");
      } else
      if (isWFH) {
        colorData.push("bg-lime-300");
      } else
  
      if(isWellnessDate){
        colorData.push('bg-fuchsia-300')
      }
    }

    if (isWithinAnyLeaveDate) {
      colorData.push("bg-violet-300");
    }

  
    
  
    return colorData;
  };


   const handleCheckboxChange = (id: string) => {
     setComponentid((prevSelectedId) => (prevSelectedId === id ? '' : id));
   };

  const findJobComponent = list.find((item) => item._id === componentid)




  const router = useRouter()

  //selected status
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);

  const handleSelectRow = (id: string) => {
    setSelectedRows((prevSelectedRows) => {
      const isSelected = prevSelectedRows.includes(id);
  
      if (isSelected) {
        // Deselect: Remove the id from the array
        return prevSelectedRows.filter((rowId) => rowId !== id);
      } else {
        // Select: Add the id to the array
        return [...prevSelectedRows, id];
      }
    });
  };


  const getList = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/jobcomponent/listteamjobcomponent?teamid=${id}`,{
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
        }
    })

  
    setList(response.data.data)
  
  }

  //update workload
  const updateWorkload = async () => {
    if(selected.length === 0){
      toast.error(`Status is required.`) 

    } else {
      try {
        const request = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/jobcomponent/editstatushours`,{
          jobcomponentid:  projectid,
          employeeid: employeeid,
          date: date,
          status: selected,
          hours: hours,
          role: role
        }, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
            }
        })
  
        const response = await toast.promise(request, {
          loading: 'Updating workload....',
          success: `Successfully updated`,
          error: 'Error while updating the workload',
      });
  
  
      if(response.data.message === 'success'){
        getList()
        setDialog(false)
        setSelectedRows([])
        getIndividualList()
      }
      } catch (error) {
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
  
  
  }

  const removeWorkload = async () => {
    setHours(0)
    setSelected([])
  
    try {
      const request = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/jobcomponent/editstatushours`,{
        jobcomponentid:  projectid,
        employeeid: employeeid,
        date: date,
        status: [],
        hours: 0,
        role: role
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
          }
      })

      const response = await toast.promise(request, {
        loading: 'Removing workload data....',
        success: `Successfully removed`,
        error: 'Error while removing workload data',
    });


    if(response.data.message === 'success'){
      getList()
      setDialog(false)
      setSelectedRows([])
        getIndividualList()

    }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ message: string, data: string }>;
        if (axiosError.response && axiosError.response.status === 401) {
            toast.error(`${axiosError.response.data.data}`) 
            router.push('/')    
        }

        if (axiosError.response && axiosError.response.status === 400) {
            toast.error(`Cannot remove an empty data`)     
               
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



  useEffect(() => {
    setLoading(true)
    try {
      const timer = setTimeout(() => {
        const getList = async () => {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/jobcomponent/listteamjobcomponent?teamid=${id}&search=${search}&filterdate=${filterDate}`,{
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json'
              }
          })
      
        
          setList(response.data.data)
          setStartReq(response.data.data[0]?.projectstart)
          setEndReq(response.data.data[0]?.projectend)
          setLoading(false)
        
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
    
    
  },[refresh, search, filterDate])

  useEffect(() => {
    try {
      const timer = setTimeout(() => {
        const getList = async () => {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/jobcomponent/listteamjobcomponent?teamid=${id}&search=${search}&filterdate=${filterDate}`,{
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json'
              }
          })
      
        
          setList(response.data.data)
          setStartReq(response.data.data[0]?.projectstart)
          setEndReq(response.data.data[0]?.projectend)
        
        }
        getList()
      }, 500)
      return () => clearTimeout(timer)
  } catch (error) {
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
    
    
  },[isRefresh])


  const isDateInRange = (dateToCheck: string, startDate: string, endDate: string): boolean => {
    const checkDate = new Date(dateToCheck);
    const start = new Date(startDate);
    const end = new Date(endDate);

    checkDate.setHours(0, 0, 0, 0);
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    // Check if the dateToCheck is between or equal to startDate and endDate
    return checkDate >= start && checkDate <= end;
  }

  const statusColor = (data: string[], date: string, leaveStart: string, leaveEnd: string, eventStart: string, eventEnd: string, wddate: string, hours: number, eventDates: Event[], leaveDates: Leave[], wellnessDates: string[], wfhDates: string []) => {
    const colorData: string[] = [];

    const isLeaveInRange = isDateInRange(date, leaveStart, leaveEnd);
    const isEventInRange = isDateInRange(date, eventStart, eventEnd);

    const isWithinAnyEventDate = eventDates.some((item) =>
      isDateInRange(date, item.startdate, item.enddate)
    );

    const isWithinAnyLeaveDate = leaveDates.some((item) =>
      isDateInRange(date, item.leavestart, item.leaveend)
    );

     // Check if the date is in wellnessDates
  const isWellnessDate = wellnessDates.some(
    (wellnessDate) => wellnessDate.includes(date.split('T')[0])
  );

  const isWFH = wfhDates.some(
    (wfh) => wfh.includes(date.split('T')[0])
  );;


  if(!data.includes('Leave')){
    if(data.includes('1')){
      colorData.push('bg-red-500')
    } else
    if(data.includes('2')){
      colorData.push('bg-amber-500')
    } else
    if(data.includes('3')){
      colorData.push('bg-yellow-300')
    } else
    if(data.includes('4')){
      colorData.push('bg-green-500')
    } else
    if(data.includes('5')){
      colorData.push('bg-blue-500')
    } else
    if(data.includes('6')){
      colorData.push('bg-cyan-400')
    } else
    if(hours > 9){
      colorData.push('bg-pink-500')
    }
  }
    // if(isWithinAnyLeaveDate){
    //   colorData.push('bg-violet-300')
    // }
    // if(isWithinAnyEventDate){
    //   colorData.push('bg-gray-300')
    // }
    

    // if(isWellnessDate){
    //   colorData.push('bg-fuchsia-300')
    // }

    //  if(isWellnessDate){
    //   colorData.push('bg-fuchsia-300')
    // }

    // if(isWFH){
    //   colorData.push('bg-lime-300')
    // }

    return colorData; 
  }

  const wdStatusChecker = (wddate: string[], date: string, eventDates: Event[]) => {

    const isWellnessDate = wddate.includes(date)

    const isWithinAnyEventDate = eventDates.some((item) =>
      isDateInRange(date, item.startdate, item.enddate)
    );
   
    if(isWellnessDate){
      setWdstatus(true)
    } else if(isWithinAnyEventDate){
      setWdstatus(true)
    }else {
      setWdstatus(false)
    }
   
  }

  //employee list
  useEffect(() => {
    try {
      const timer = setTimeout(() => {
        const getList = async () => {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/employeesearchlistmanager?fullname`,{
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json'
              }
          })
    
          setEmployee(response.data.data.employeelist)
        
        
        }
        getList()
      }, 500)
      return () => clearTimeout(timer)
  } catch (error) {
     
  
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
    
    
  },[])

  //client list
   useEffect(() => {
  
    const timer = setTimeout(() => {
      const getList = async () => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/clients/clientlistallmanager?clientname`,{
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
            }
        })
  
        setClient(response.data.data.clients)
    
      }
      getList()
    },500)
    return () => clearTimeout(timer)
    
    
  },[])

  //projects list
  useEffect(() => {

    const timer = setTimeout(() => {
      const getList = async () => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/projects/listallprojects?searchproject`,{
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
            }
        })
        setProjects(response.data.data.projectlist)
    
      }
      getList()
    },500)
    return () => clearTimeout(timer)
    
    
  },[])


  const findMember = (data: MembersComponent[]) => {
    const role1 = data.find((item) => item.role.trim() === 'Engnr.')
    const role2 = data.find((item) => item.role.trim() === 'Engr. Revr.')
    const role3 = data.find((item) => item.role.trim() === 'Drft.')
    const role4 = data.find((item) => item.role.trim() === 'Drft. Revr.')


    setEngr(role1?.employee._id || '')
    setEngrrvr(role2?.employee._id || '')
    setDrf(role3?.employee._id || '')
    setDrfrvr(role4?.employee._id || '')
   
  }

  const url = new URL(window.location.href);

  const handleChangeCheckbox = (id: string) => {
    setSelected((prevSelected) => {
      // If the first item is selected, toggle it
      if (id === statusData[0].id) {
        return prevSelected.includes(id)
          ? prevSelected.filter((item) => item !== id)
          : [...prevSelected, id];
      }

      // For the other items, only allow one to be selected at a time
      return prevSelected.includes(id)
        ? prevSelected.filter((item) => item !== id)
        : [statusData[0].id, id].filter((value) => prevSelected.includes(value) || value === id);
    });
  };


    const engrMember = findJobComponent?.members.find((item) => item.role === 'Engr.');
  const engrId = engrMember?._id;

  const engrrvrMember = findJobComponent?.members.find((item) => item.role === 'Engr. Revr.');
  const engrrvrId = engrrvrMember?._id; 

  const drftrvrMember = findJobComponent?.members.find((item) => item.role === 'Drft. Revr.');
  const draftrvrId = drftrvrMember?._id; 

  const drftMember = findJobComponent?.members.find((item) => item.role === 'Drft.');
  const draftId = drftMember?._id; 


  const firstDivRef = useRef<HTMLDivElement>(null);
  const secondDivRef = useRef<HTMLDivElement>(null);
  const individualRequestRef = useRef<HTMLDivElement>(null); // New ref
  

  //multi form
  const [forms, setForms] = useState<FormData[]>([
    {
      startdate: new Date().toISOString(),
      enddate:'',
      employeeid: employeeid,
      hours: 0,
      jobcomponentid: projectid,
      status: [],
    },
  ]);

  const deleteForm = (index: number) => {
    const newForms = forms.filter((_, i) => i !== index);
    setForms(newForms);
  };

  const handleChange = (index: number, field: keyof FormData, value: string | number | string[]) => {
    const newForms = [...forms];
    (newForms[index][field] as typeof value) = value;
    setForms(newForms);
  };


  const handleCheckbox = (index: number, id: string) => {
    const newForms = [...forms];
  
    const currentStatus = newForms[index].status;
  
    if (id === statusData[0].id) {
      newForms[index].status = currentStatus.includes(id)
        ? currentStatus.filter((statusId) => statusId !== id)
        : [...currentStatus, id]; 
    } else {
      if (currentStatus.includes(id)) {
        newForms[index].status = currentStatus.filter((statusId) => statusId !== id);
      } else {
        const newStatus = [statusData[0].id, id].filter(
          (value) => currentStatus.includes(value) || value === id
        );
        newForms[index].status = newStatus;
      }
    }
  
    setForms(newForms);
  };

 const updateMultipleWorkload = async () => {
  const hasEmptyStatus = forms.some(form => form.status.length === 0);
  if (hasEmptyStatus) {
    toast.error("Status is required for all workload entries.");
    return;
  }

  try {
    const request = axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/jobcomponent/editmultiplestatushours`,
      {
        jobcomponentid: projectid,
        employeeid: employeeid,
        updates: forms,
      role: role
      },
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    const response = await toast.promise(request, {
      loading: 'Updating workload....',
      success: `Successfully updated`,
      error: 'Error while updating the workload',
    });

    if (response.data.message === 'success') {
      getList();
      setDialog(false);
      setSelectedRows([]);
        getIndividualList()

      setForms([
        {
          startdate: '',
          enddate: '',
          employeeid: employeeid,
          hours: 0,
          jobcomponentid: projectid,
          status: [],
        },
      ]);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ message: string, data: string }>;

      if (axiosError.response) {
        const status = axiosError.response.status;
        const errorMessage = axiosError.response.data.data;

        if ([400, 401, 402, 403, 404].includes(status)) {
          toast.error(errorMessage);
        }

        if (status === 401) {
          router.push('/');
        }
      }
    }
  }
};


  const longestAlldates = list.reduce((max, current) => {
    return current.allDates.length > max.allDates.length ? current : max;
  }, list[0]);

  const formatGetDate = (data: string) => {
    const selectedDate = new Date(date); // Convert 'date' to Date object
    selectedDate.setHours(0, 0, 0, 0);
    const selectedTimestamp = selectedDate.getDate();

    return selectedTimestamp

  }


  const canEdit = (dateStr: string): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    const selectedDate = new Date(dateStr);
    selectedDate.setHours(0, 0, 0, 0);
    console.log(today, selectedDate)
  
    return selectedDate.getTime() >= today.getTime();
  };


  useEffect(() => {
     const timeout = setTimeout(() => {
      if (scrollId && typeof scrollId === 'string') {
        const rowElement = rowRefs.current[scrollId];
        console.log('Attempting scroll', rowElement, scrollId);

        if (rowElement) {
          rowElement.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }

    
    }
     return () => clearTimeout(timeout);
  }, 5000);
  
}, [scrollId]);


  console.log('Available rowRefs:', Object.keys(rowRefs.current));



  return (
   <div className=' w-full h-full flex flex-col bg-secondary p-4 text-zinc-100'>
    <div className=' flex flex-col bg-primary mb-2 p-4'>
        <div className=' w-full flex gap-4 items-end justify-end'>
           <div className=' relative z-[99] text-[.6rem] flex items-center gap-2 '>
                  <p>Filter by dates</p>
                  <DatePicker
                     selected={dateFilter}
                    onChange={(date) => setDateFilter(date)}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="DD/MM/YYYY"
                    className="bg-secondary text-[.6rem] p-2 w-fit z-[99999999999] relative"
                    onKeyDown={(e) => e.preventDefault()}
                    />
          
                    <button onClick={() => setDateFilter(null)} className=' p-2 bg-red-600 text-white rounded-sm'><RefreshCcw size={12}/></button>
          
          
        </div>
          <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder='Search project' className=' p-2 text-black bg-white rounded-sm text-[.6rem]' />
        </div>

        <div className=' w-full flex items-center justify-between gap-6 h-auto bg-primary text-xs hide-scrollbar'>

          <div className=' flex gap-12'>

            <div className=' flex flex-col gap-1 bg-primary rounded-sm text-xs'>

              

              <p className=' text-xs mt-2'>Project Component:</p>
              <div className='flex items-center gap-2 bg-primary rounded-sm text-xs mt-2'>
                <Createprojectcomponent teamid={id || ''}>
                  <div className=' flex flex-col items-center justify-center gap-1 text-[.6rem] w-[40px]'>
                    <button className={`text-xs p-1 bg-red-600  rounded-sm`}><Plus size={20}/></button>
                    <p>Create</p>
                  </div>
                </Createprojectcomponent>

                    {componentid === '' ? (
                  <div className=' flex flex-col items-center justify-center gap-1 text-[.6rem] w-[40px]'>
                    <button  onClick={() => toast.error('Please select a job component below')} className={`text-xs p-1 bg-red-600  rounded-sm`}><Pen size={20}/></button>
                    <p>Edit</p>
                  </div>
                  
                ) : (
                  <EditJobComponent id={findJobComponent?.componentid} isManger={findJobComponent?.jobmanager.isManager} isJobManager={findJobComponent?.jobmanager.isJobManager} project={findJobComponent?.projectname.projectid} jobmanager={findJobComponent?.jobmanager.employeeid} engr={engrId} engrnotes={engrMember?.notes} engrrvr={engrrvrId} engrrvrnotes={engrrvrMember?.notes} drftr={draftId} drftrnotes={drftMember?.notes} drftrrvr={draftrvrId} drftrrvrnotes={drftrvrMember?.notes} members={findJobComponent?.members || []} pname={findJobComponent?.projectname.name || ''} client={findJobComponent?.clientname.name || ''} start={findJobComponent?.projectstart || ''} end={findJobComponent?.projectend || ''} component={findJobComponent?.jobcomponent || ''} adminnotes={findJobComponent?.adminnotes || ''} budget={findJobComponent?.estimatedbudget || 0} budgettype={findJobComponent?.budgettype || ''} jcname={findJobComponent?.jobcomponent || ''} clientid={findJobComponent?.clientname.clientid || ''} jobno={findJobComponent?.jobno || ''}>
                                                                        <div className=' flex flex-col items-center justify-center gap-1 text-[.6rem] w-[40px]'>
                                                                          <button onClick={() => setDialog2(true)} className={`text-xs p-1 bg-red-600  rounded-sm`}><Pen size={20}/></button>
                                                                          <p>Edit</p>
                                                                        </div>
                                                                      </EditJobComponent>
                  
                )}

                {componentid === '' ? (
                  <div className=' flex flex-col items-center justify-center gap-1 text-[.6rem] w-[40px]'>
                    <button  onClick={() => toast.error('Please select a job component below')} className={`text-xs p-1 bg-red-600  rounded-sm`}><Layers2 size={20}/></button>
                    <p>Copy</p>
                  </div>
                  
                ) : (
                  <Duplicatecomponent name={findJobComponent?.jobcomponent ?? ''} manager={findJobComponent?.jobmanager.employeeid ?? ''} budgettype={findJobComponent?.budgettype ?? ''} engr={findJobComponent?.members[0]?.employee._id} engrrvr={findJobComponent?.members[1]?.employee._id} drftr={findJobComponent?.members[2]?.employee._id} drftrrvr={findJobComponent?.members[3]?.employee._id} estbudget={findJobComponent?.estimatedbudget ?? 0} state={dialog3} client={findJobComponent?.clientname.name || ''} start={findJobComponent?.projectstart || ''} end={findJobComponent?.projectend || ''} pname={findJobComponent?.projectname.name || ''} clientid={findJobComponent?.clientname.clientid || ''} jobno={findJobComponent?.jobno || ''}>
                    <div className=' flex flex-col items-center justify-center gap-1 text-[.6rem] w-[40px]'>
                      <button onClick={() => setDialog2(true)} className={`text-xs p-1 bg-red-600  rounded-sm`}><Layers2 size={20}/></button>
                      <p>Copy</p>
                    </div>
                  </Duplicatecomponent>
                  
                )}

              


              

                {componentid === '' ? (
                  <div className=' flex flex-col items-center justify-center gap-1 text-[.6rem] w-[40px]'>
                    <button onClick={() => toast.error('Please select a job component below')} className={`text-xs p-1 bg-red-600  rounded-sm`}><Copy size={20}/></button>
                    <p>Variation</p>
                  </div>
                  
                ) : (
                  <Variationcomponent name={findJobComponent?.jobcomponent ?? ''} manager={findJobComponent?.jobmanager.employeeid ?? ''} budgettype={findJobComponent?.budgettype ?? ''} engr={findJobComponent?.members[0]?.employee._id} engrrvr={findJobComponent?.members[1]?.employee._id} drftr={findJobComponent?.members[2]?.employee._id} drftrrvr={findJobComponent?.members[3]?.employee._id} estbudget={findJobComponent?.estimatedbudget ?? 0} state={dialog3} client={findJobComponent?.clientname.name || ''} start={findJobComponent?.projectstart || ''} end={findJobComponent?.projectend || ''} pname={findJobComponent?.projectname.name || ''} clientid={findJobComponent?.clientname.clientid || ''} jobno={findJobComponent?.jobno || ''}>
                  <div className=' flex flex-col items-center justify-center gap-1 text-[.6rem] w-[40px]'>
                    <button onClick={() => setDialog3(!dialog3)} className={`text-xs p-1 bg-red-600  rounded-sm`}><Copy size={20}/></button>
                    <p>Variation</p>
                  </div>
                </Variationcomponent>
                )}

                {componentid === '' ? (
                  <div className=' flex flex-col items-center justify-center gap-1 text-[.6rem] w-[40px]'>
                    <button onClick={() => toast.error('Please select a job component below')} className={`text-xs p-1 bg-red-600  rounded-sm`}><File size={20}/></button>
                    <p>Complete</p>
                  </div>

                ) : (
                  <JobComponentStatus name={findJobComponent?.jobcomponent ?? ''} status={findJobComponent?.status} client={findJobComponent?.clientname.name ?? ''} _id={findJobComponent?._id ?? ''} jobno={findJobComponent?.jobno ?? ''} teamname={findJobComponent?.teamname ?? ''} managerName={findJobComponent?.jobmanager.fullname ?? ''} projectname={findJobComponent?.projectname.name ?? ''} invoiced={`${findJobComponent?.invoice.amount ?? ''}`} budget={`${findJobComponent?.estimatedbudget}`} currinvoice={findJobComponent?.invoice.amount || 0} adminnotes={findJobComponent?.adminnotes || ''}  >
                    <div className=' flex flex-col items-center justify-center gap-1 text-[.6rem] w-[40px]'>
                      <button className={`text-xs p-1 bg-red-600  rounded-sm`}><File size={20}/></button>
                      <p>Complete</p>
                    </div>
                  </JobComponentStatus>
                )}

                {/* {componentid === '' ? (
                  <div className=' flex flex-col items-center justify-center gap-1 text-[.6rem] w-[40px]'>
                    <button onClick={() => toast.error('Please select a job component below')} className={`text-xs p-1 bg-red-600  rounded-sm`}><File size={20}/></button>
                    <p>Invoice</p>
                  </div>

                ) : (
                  <Invoice projectname={findJobComponent?.projectname.name} jobcname={findJobComponent?.jobcomponent} jobno={findJobComponent?.jobno} budgettype={findJobComponent?.budgettype} estimatedbudget={findJobComponent?.estimatedbudget} jobcid={findJobComponent?.componentid} isJobmanager={findJobComponent?.jobmanager.isJobManager} currinvoice={findJobComponent?.invoice.percentage} manager={findJobComponent?.jobmanager.fullname || ''} client={findJobComponent?.clientname.name || ''} notes={findJobComponent?.adminnotes || ''}>
                    <div className=' flex flex-col items-center justify-center gap-1 text-[.6rem] w-[40px]'>
                      <button className={`text-xs p-1 bg-red-600  rounded-sm`}><File size={20}/></button>
                      <p>Invoice</p>
                    </div>       
                  </Invoice>
                )} */}

              </div>
              
            </div>

          </div>
          <Legends/>

        </div>
    </div>

      {loading ? (

        <div className=' w-full h-full flex items-center justify-center'>
           <div className=' spinner'>
            </div>
        </div>
       
      ) : (
        <>
        {list.length === 0 ? (

          <div className='hide-scrollbar'>
                              <div
                              className=' h-full w-full flex flex-col overflow-x-hidden hide-scrollbar'>
                  
                                <div className=' w-fit flex sticky top-0 z-50'>
                  
                                  <div className=' w-fit flex flex-col sticky'>
                                    <table className="table-auto w-auto border-collapse">
                                      <thead className="h-[60px] text-nowrap bg-primary"
                                      style={{ visibility: 'collapse' }}
                                      
                                      >
                                        <tr className="text-[0.5rem] text-zinc-100 font-normal text-left border-collapse">
                                          <th className="text-left font-normal min-w-[30px] whitespace-normal border-[1px] border-zinc-600 px-2">
                                            Action
                                          </th>
                                          <th className="text-left font-normal min-w-[70px] whitespace-normal border-[1px] border-zinc-600 px-2">
                                            Job Number
                                          </th>
                                          <th className="text-left font-normal min-w-[70px] whitespace-normal border-[1px] border-zinc-600 px-2">
                                            Client
                                          </th>
                                          <th className="text-left font-normal min-w-[80px] whitespace-normal border-[1px] border-zinc-600 px-2">
                                            Project Name
                                          </th>
                                          <th className="text-left font-normal min-w-[30px] whitespace-normal border-[1px] border-zinc-600 px-2">
                                            JM
                                          </th>
                                          <th className="text-left font-normal min-w-[60px] whitespace-normal border-[1px] border-zinc-600 px-2">
                                          EST. $
                                          </th> 
                                          <th className="text-left font-normal min-w-[60px] whitespace-normal border-[1px] border-zinc-600 px-2">
                                            % Inv.
                                          </th>
                                          <th className="text-left font-normal min-w-[90px] whitespace-normal border-[1px] border-zinc-600 px-2">
                                            Job Component
                                          </th>
                                          <th className="text-left font-normal min-w-[100px] whitespace-normal border-[1px] border-zinc-600 px-2">
                                            Notes
                                          </th>
                                          <th className="text-left font-normal min-w-[62px] whitespace-normal border-[1px] border-zinc-600 px-2">
                                            Role
                                          </th>
                                      
                                          <th className="text-left font-normal min-w-[45px] whitespace-normal border-[1px] border-zinc-600 px-2">
                                            Team
                                          </th>
                                          <th className="text-left font-normal min-w-[50px] whitespace-normal border-[1px] border-zinc-600 px-2">
                                            Total Hours
                                          </th>
                                        </tr>
                                      </thead>               
                                    </table>
                                  </div>
                                  
                  
                                    <div className='w-full flex flex-col max-w-[1920px] overflow-x-auto cursor-pointer'
                                    ref={containerRef1}
                                    onMouseDown={(e) => handleMouseDown(e, containerRef2)}
                                    onMouseLeave={handleMouseLeaveOrUp}
                                    onMouseUp={handleMouseLeaveOrUp}
                                    onMouseMove={(e) => handleMouseMove(e, containerRef2)}
                                    onScroll={() => syncScroll(containerRef1, containerRef2)}
                                    >
                                      <table className="table-auto w-auto border-collapse">
                                        <thead className="bg-secondary h-[60px]"
                                        style={{ visibility: 'collapse' }}
                                        
                                        >
                                          <tr className="bg-secondary text-[0.5rem] text-black font-normal h-[60px]">
                                            {listrequestdates.map((dateObj, index) => {
                                            const date = new Date(dateObj);
                                            date.setHours(0, 0, 0, 0);
                  
                                            const today = new Date();
                                            today.setHours(0, 0, 0, 0);
                  
                                            const startOfWeek = new Date(today);
                                            startOfWeek.setDate(today.getDate() - (today.getDay() - 1));
                  
                                            const endOfWeek = new Date(startOfWeek);
                                            endOfWeek.setDate(startOfWeek.getDate() + 4);
                  
                                            let bgColor = "bg-white";
                                            if (date >= startOfWeek && date <= endOfWeek) {
                                              const prevDay = new Date(today);
                                              prevDay.setDate(today.getDate() - 1);
                  
                                              const nextDay = new Date(today);
                                              nextDay.setDate(today.getDate() + 1);
                  
                                              if (date.getTime() < today.getTime()) {
                                                bgColor = "bg-gray-300"; 
                                              } else if (date.getTime() === today.getTime()) {
                                                bgColor = "bg-pink-500";
                                              } else if (date.getTime() >= nextDay.getTime()) {
                                                bgColor = "bg-white";
                                              }
                                            }
                  
                  
                                              const shouldInsertTotal = (index + 1) % 5 === 0; // Insert "Total Hours" after every 5 dates
                  
                                              return (
                                                <React.Fragment key={index}>
                                                  {/* Date Cell */}
                                                  <th
                                                    data-id={formatAustralianDate(dateObj)}
                                                    className={`relative w-[20px] font-normal border-[1px] border-zinc-700 ${bgColor}`}
                                                  >
                                                    <div className="whitespace-nowrap w-[20px] transform -rotate-[90deg]">
                                                      <p className="mt-3 font-semibold">{formatAustralianDate(dateObj)}</p>
                                                    </div>
                                                  </th>
                  
                                                  {/* Add "Total Hours" **AFTER EVERY 5th DATE** */}
                                                  {shouldInsertTotal && (
                                                    <th
                                                      key={`total-${index}`}
                                                      className="font-normal w-[20px] px-1 border-[1px] border-zinc-700 bg-primary text-white"
                                                    >
                                                      <div className="transform w-[20px] -rotate-[90deg] font-semibold">
                                                        <p>Total Hours</p>
                                                      </div>
                                                    </th>
                                                  )}
                                                </React.Fragment>
                                              );
                                            })}
                                          </tr>
                                        </thead>            
                                      </table>
                                    </div>
                  
                                    
                  
                                  
                                </div>

                            
                  
                                <div className=' relative h-auto flex items-start bg-secondary w-full'>
                                  
                                  <div className=' w-fit flex flex-col sticky'>
                                    <table className="table-auto w-auto border-collapse">
                                      <thead className="h-[60px] text-nowrap"
                                      // style={{ visibility: 'collapse' }}
                                      >
                                        <tr className="text-[0.5rem] text-zinc-100 font-normal text-left border-collapse">
                                          <th className="text-left font-normal min-w-[30px] whitespace-normal border-[1px] border-zinc-600 px-2">
                                            Action
                                          </th>
                                          <th className="text-left font-normal min-w-[70px] whitespace-normal border-[1px] border-zinc-600 px-2">
                                            Job Number
                                          </th>
                                          <th className="text-left font-normal min-w-[70px] whitespace-normal border-[1px] border-zinc-600 px-2">
                                            Client
                                          </th>
                                          <th className="text-left font-normal min-w-[80px] whitespace-normal border-[1px] border-zinc-600 px-2">
                                            Project Name
                                          </th>
                                          <th className="text-left font-normal min-w-[30px] whitespace-normal border-[1px] border-zinc-600 px-2">
                                            JM
                                          </th>
                                          <th className="text-left font-normal min-w-[60px] whitespace-normal border-[1px] border-zinc-600 px-2">
                                          EST. $
                                          </th> 
                                          <th className="text-left font-normal min-w-[60px] whitespace-normal border-[1px] border-zinc-600 px-2">
                                            % Inv.
                                          </th>
                                          <th className="text-left font-normal min-w-[90px] whitespace-normal border-[1px] border-zinc-600 px-2">
                                            Job Component
                                          </th>
                                          <th className="text-left font-normal min-w-[100px] whitespace-normal border-[1px] border-zinc-600 px-2">
                                            Notes
                                          </th>
                                          <th className="text-left font-normal min-w-[62px] whitespace-normal border-[1px] border-zinc-600 px-2">
                                            Role
                                          </th>
                                      
                                          <th className="text-left font-normal min-w-[45px] whitespace-normal border-[1px] border-zinc-600 px-2">
                                            Team
                                          </th>
                                          <th className="text-left font-normal min-w-[50px] whitespace-normal border-[1px] border-zinc-600 px-2">
                                            Total Hours
                                          </th>
                                        </tr>
                                      </thead>
                  
                                      {/* request */}
                                      <tbody>
                                        {listRequest[0]?.members.map((item, graphIndex) =>
                                            <tr key={`${graphIndex}`} className="bg-primary text-[.5rem] py-2 h-[30px] border-[1px] border-zinc-600">
                                              <td className=' border-[1px] border-zinc-600 px-1'></td>
                                              <td className=' border-[1px] border-zinc-600 px-1'>TX10010.00-</td>
                                              <td className=' border-[1px] border-zinc-600 px-1'>Triaxial Consulting</td>
                                              <td className=' border-[1px] border-zinc-600 px-1'>On-Leave</td>
                                              <td className=' border-[1px] border-zinc-600 px-1'></td>
                                              <td className=' border-[1px] border-zinc-600 px-1'></td>
                                              <td className=' border-[1px] border-zinc-600 px-1'></td>
                                              <td className=' border-[1px] border-zinc-600 px-1'>AL, SL & Other Leaves</td>
                                              <td className=' border-[1px] border-zinc-600 px-1'></td>
                                              <td className=' border-[1px] border-zinc-600 px-1'></td>
                                              <td onClick={() => router.push(`/pm/individualworkload?employeeid=${item.id}&name=${item.name}&teamname=${listRequest[0].name}`)} className=" border-[1px] border-zinc-600 px-2 text-start cursor-pointer underline text-blue-400">{item.initial}</td>
                                              <td></td>
                  
                                            </tr>
                                        )}
                                      </tbody>
                  
                                      {/* project */}
                                      <tbody>
                                        {list.map((graphItem, graphIndex) =>
                                                            graphItem.members
                                                            .sort((a, b) => {
                                                              const roleOrder = ["Engr.", "Engr. Revr.", "Drft.", "Drft. Revr."];
                                                        
                                                              const indexA = roleOrder.indexOf(a.role);
                                                              const indexB = roleOrder.indexOf(b.role);
                                                        
                                                              return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
                                                            })
                                                            .map((member, memberIndex) => {
                                                              // Sum all hours for the member
                                                              const totalHours = member.dates?.reduce((sum, date) => sum + date.hours, 0) || 0;
                                        
                                                              return (
                                                                <tr 
                                                                  key={`${graphItem._id}-${memberIndex}`}
                                                                  data-invoice-id={graphItem._id} 
                                                                  className={`text-left text-[.5rem] py-2 h-[30px] border-[1px] border-zinc-600 border-collapse ${graphItem.isVariation ? 'text-red-600 font-black' : 'text-black'} ${clientColor(graphItem.clientname.priority)}`}
                                                                >
                                                                  <td className="text-center text-white h-[30px] flex items-center justify-center gap-1">
                                                                    {memberIndex === 0 && (
                                                                      <input
                                                                        type="checkbox"
                                                                        checked={componentid === graphItem._id}
                                                                        onChange={() => {
                                                                          handleCheckboxChange(graphItem._id);
                                                                          setProjectname(graphItem.projectname.projectid);
                                                                          setJobmanager(graphItem.jobmanager.employeeid);
                                                                          setJobno(graphItem.jobno);
                                                                          findMember(graphItem.members);
                                                                          setNotes(graphItem.members[0]?.notes || "");
                                                                          setNotes2(graphItem.members[1]?.notes || "");
                                                                          setNotes3(graphItem.members[2]?.notes || "");
                                                                          setNotes4(graphItem.members[3]?.notes || "");
                                                                          setIsmanager(graphItem.jobmanager.isManager);
                                                                          setIsjobmanager(graphItem.jobmanager.isJobManager);
                                                                        }}
                                                                      />
                                                                    )}
                                                                  </td>
                                        
                                                                  <td className="text-wrap whitespace-normal break-all border-[1px] border-zinc-600 px-2">
                                                                    <TooltipProvider delayDuration={.1}>
                                                                      <Tooltip>
                                                                        <TooltipTrigger>{memberIndex === 0 && truncateText(graphItem.jobno, 8)}</TooltipTrigger>
                                                                        <TooltipContent className=' text-[.6rem]'>
                                                                          <p>{memberIndex === 0 && graphItem.jobno}</p>
                                                                        </TooltipContent>
                                                                      </Tooltip>
                                                                    </TooltipProvider>
                      
                                                                    
                                                                  </td>
                                                                  <td className="text-wrap whitespace-normal break-all border-[1px] border-zinc-600 px-2">
                                                                    
                                                                    <TooltipProvider delayDuration={.1}>
                                                                      <Tooltip>
                                                                        <TooltipTrigger>{memberIndex === 0 && truncateText(graphItem.clientname.name, 10)}</TooltipTrigger>
                                                                        <TooltipContent className=' text-[.6rem]'>
                                                                          <p>{memberIndex === 0 && graphItem.clientname.name}</p>
                                                                        </TooltipContent>
                                                                      </Tooltip>
                                                                    </TooltipProvider>
                                                                  </td>
                                                                  <td className="text-wrap whitespace-normal break-all border-[1px] border-zinc-600 px-2">
                                                                    
                                                                    <TooltipProvider delayDuration={.1}>
                                                                      <Tooltip>
                                                                        <TooltipTrigger>{memberIndex === 0 && truncateText(graphItem.projectname.name, 10)}</TooltipTrigger>
                                                                        <TooltipContent className=' text-[.6rem]'>
                                                                          <p>{memberIndex === 0 && graphItem.projectname.name}</p>
                                                                        </TooltipContent>
                                                                      </Tooltip>
                                                                    </TooltipProvider>
                                                                  </td>
                                                                  <td className="text-wrap whitespace-normal break-all border-[1px] border-zinc-600 px-2">
                                                                    {memberIndex === 0 && graphItem.jobmanager.initials}
                                                                  </td>
                  
                                                                  <td className="text-wrap whitespace-normal break-all border-[1px] border-zinc-600 px-2">
                                                                    ${memberIndex === 0 && graphItem.estimatedbudget.toLocaleString()}
                                                                    {/* $ {graphItem.estimatedbudget.toLocaleString()} */}
                                                                  </td>
                  
                                                                  <td className="text-wrap whitespace-normal break-all border-[1px] border-zinc-600 px-2">
                                                                    {memberIndex === 0 && graphItem.budgettype !== 'rates' && `${graphItem.invoice.percentage}%`}
                                                                    {/* {graphItem.budgettype !== 'rates' && `${graphItem.invoice.percentage}%`} */}
                                                                  </td>
                                                                  <td className="text-wrap whitespace-normal break-all border-[1px] border-zinc-600 px-2">
                                                                    
                                                                    <TooltipProvider delayDuration={.1}>
                                                                      <Tooltip>
                                                                        <TooltipTrigger>{memberIndex === 0 && truncateText(graphItem.jobcomponent, 15)}</TooltipTrigger>
                                                                        <TooltipContent className=' text-[.6rem]'>
                                                                          <p>{memberIndex === 0 && graphItem.jobcomponent}</p>
                                                                        </TooltipContent>
                                                                      </Tooltip>
                                                                    </TooltipProvider>
                                                                  </td>
                                                                  <td className="text-wrap whitespace-normal break-all border-[1px] border-zinc-600 px-2">
                                                                    <Editnotes note={member.notes} role={member.role} userid={member._id} componentid={graphItem.componentid}>
                                                                      {member.notes ? <p className="text-[.5rem]">{truncateText(member.notes, 18)}</p> : <p className="text-[.5rem] h-full w-full text-center">No notes.</p>}
                                                                    </Editnotes>
                                                                  
                                                                  </td>
                                                                  <td className="text-wrap whitespace-normal break-all border-[1px] border-zinc-600 px-2 text-[.5rem]">
                                                                    {member.role}
                                                                  </td>
                                                                
                                                                  <td className="text-wrap whitespace-normal break-all border-[1px] border-zinc-600 px-2">
                                                                  
                                                                    <EditMember membername={member.employee.fullname} memberid={member._id} role={member.role} memberlist={employee} userid={member.employee._id} componentid={graphItem.componentid}>
                                                                      {member.employee.initials}
                                                                    </EditMember>
                                                                  
                                                                  </td>
                                                                  <td className="text-wrap whitespace-normal break-all border-[1px] border-zinc-600 px-2">{totalHours.toLocaleString()}</td>
                                                                </tr>
                                                              );
                                                            })
                                                          )}
                                      </tbody>
                                        
                                    </table>
                  
                                  
                                  </div>

                                  <div className='w-full flex flex-col max-w-[1920px] overflow-x-auto cursor-pointer'
                                    ref={containerRef2}
                                    onMouseDown={(e) => handleMouseDown(e, containerRef1)}
                                    onMouseLeave={handleMouseLeaveOrUp}
                                    onMouseUp={handleMouseLeaveOrUp}
                                    onMouseMove={(e) => handleMouseMove(e, containerRef1)}
                                    onScroll={() => syncScroll(containerRef2, containerRef1)}
                                    >
                                      <table className="table-auto w-auto border-collapse">
                                        <thead className="bg-secondary h-[60px]">
                                          <tr className="bg-secondary text-[0.5rem] text-black font-normal h-[60px]">
                                            {listrequestdates.map((dateObj, index) => {
                                            const date = new Date(dateObj);
                                            date.setHours(0, 0, 0, 0);
                  
                                            const today = new Date();
                                            today.setHours(0, 0, 0, 0);
                  
                                            const startOfWeek = new Date(today);
                                            startOfWeek.setDate(today.getDate() - (today.getDay() - 1));
                  
                                            const endOfWeek = new Date(startOfWeek);
                                            endOfWeek.setDate(startOfWeek.getDate() + 4);
                  
                                            let bgColor = "bg-white";
                                            if (date >= startOfWeek && date <= endOfWeek) {
                                              const prevDay = new Date(today);
                                              prevDay.setDate(today.getDate() - 1);
                  
                                              const nextDay = new Date(today);
                                              nextDay.setDate(today.getDate() + 1);
                  
                                              if (date.getTime() < today.getTime()) {
                                                bgColor = "bg-gray-300"; 
                                              } else if (date.getTime() === today.getTime()) {
                                                bgColor = "bg-pink-500";
                                              } else if (date.getTime() >= nextDay.getTime()) {
                                                bgColor = "bg-white";
                                              }
                                            }
                  
                  
                                              const shouldInsertTotal = (index + 1) % 5 === 0; // Insert "Total Hours" after every 5 dates
                  
                                              return (
                                                <React.Fragment key={index}>
                                                  {/* Date Cell */}
                                                  <th
                                                    data-id={formatAustralianDate(dateObj)}
                                                    className={`relative w-[20px] font-normal border-[1px] border-zinc-700 ${bgColor}`}
                                                  >
                                                    <div className="whitespace-nowrap w-[20px] transform -rotate-[90deg]">
                                                      <p className="mt-3 font-semibold">{formatAustralianDate(dateObj)}</p>
                                                    </div>
                                                  </th>
                  
                                                  {/* Add "Total Hours" **AFTER EVERY 5th DATE** */}
                                                  {shouldInsertTotal && (
                                                    <th
                                                      key={`total-${index}`}
                                                      className="font-normal w-[20px] px-1 border-[1px] border-zinc-700 bg-primary text-white"
                                                    >
                                                      <div className="transform w-[20px] -rotate-[90deg] font-semibold">
                                                        <p>Total Hours</p>
                                                      </div>
                                                    </th>
                                                  )}
                                                </React.Fragment>
                                              );
                                            })}
                                          </tr>
                                        </thead> 

                                        {/* request */}
                                    <tbody>
                                          {listRequest.map((graphItem, graphIndex) =>
                                            graphItem.members.map((member, memberIndex) => {
                                              // Precompute weekly totals
                                              const totalHoursForWeek: number[] = [];
                                              let currentWeekTotal = 0;
                                              let weekCounter = 0;
                                            
                                              return (
                                                <tr
                                                  key={`${graphIndex}-${memberIndex}`}
                                                  className="bg-primary text-[.6rem] py-2 h-[30px] border-[1px] border-zinc-600"
                                                >
                                                  {listrequestdates.map((dateObj, index) => {
                                                    const date = new Date(dateObj);
                                                    const isFriday = date.getDay() === 5;
                                                    const weekIndex = Math.floor(index / 5); // Ensure correct indexing
                        
                                                    const shouldInsertTotal = (index + 1) % 5 === 0;
                                                    
                                                    const memberDate = member.dates?.find(
                                                      (date) => formatDate(date.date) === formatDate(dateObj)
                                                    );
                        
                                                    return (
                                                      <React.Fragment key={index}>
                                                        <td
                                                          className="relative text-center overflow-hidden bg-white cursor-pointer border-[1px] border-zinc-400"
                                                        >
                                                          <div className="w-full h-[50px] absolute flex top-0">
                                                          {statusColorRequest( dateObj, member.event, member.leave, member.wellness, member.wfh).map((item, index) => (
                                                          <div key={index} className={`w-full h-full ${item}`}></div>
                                                            ))}
                                                          </div>
                                                          <p className="relative text-black font-bold text-[.5rem] z-30">
                                                            
                                                          </p>
                                                        </td>
                        
                                                        {shouldInsertTotal && (
                                                          <td className="text-center font-normal w-[40px] bg-primary border-[1px] border-zinc-700">
                                                            <p className="text-white">
                                                              {Number.isInteger(totalHoursForWeek[weekIndex])
                                                                ? totalHoursForWeek[weekIndex]
                                                                : totalHoursForWeek[weekIndex]?.toFixed(2)}
                                                            </p>
                                                          </td>
                                                        )}
                                                      </React.Fragment>
                                                    );
                                                  })}
                                                </tr>
                                              );
                                            })
                                          )}
                        
                                    </tbody>           
                                      </table>
                                    </div>
                  
                                
                  
                                </div>
                        
                            
                            </div>
                  
                            <div className=' w-full h-full flex items-center justify-center'>
                                <p className=' text-xs text-zinc-400'>No job component's yet under this project.</p>
                              </div>
          </div>
         
        ) : (
          <div
          className=' h-[67dvh] w-full flex flex-col overflow-x-hidden custom-scrollbar'>

            <div className=' w-fit flex sticky top-0 z-50'>

              <div className=' w-fit flex flex-col sticky'>
                <table className="table-auto w-auto border-collapse">
                  <thead className="h-[60px] text-nowrap bg-primary">
                    <tr className="text-[0.6rem] text-white font-normal text-left border-collapse">
                      <th className="text-left font-normal min-w-[30px] whitespace-normal border-[1px] border-zinc-600 px-2">
                        Action
                      </th>
                      <th className="text-left font-normal min-w-[80px] whitespace-normal border-[1px] border-zinc-600 px-2">
                        Job Number
                      </th>
                      <th className="text-left font-normal min-w-[70px] whitespace-normal border-[1px] border-zinc-600 px-2">
                        Client
                      </th>
                      <th className="text-left font-normal min-w-[80px] whitespace-normal border-[1px] border-zinc-600 px-2">
                        Project Name
                      </th>
                      <th className="text-left font-normal min-w-[50px] whitespace-normal border-[1px] border-zinc-600 px-2">
                        JM
                      </th>
                      <th className="text-left font-normal min-w-[60px] whitespace-normal border-[1px] border-zinc-600 px-2">
                       EST. $
                      </th> 
                      <th className="text-left font-normal min-w-[60px] whitespace-normal border-[1px] border-zinc-600 px-2">
                        % Inv.
                      </th>
                      <th className="text-left font-normal min-w-[90px] whitespace-normal border-[1px] border-zinc-600 px-2">
                        Job Component
                      </th>
                      <th className="text-left font-normal min-w-[100px] whitespace-normal border-[1px] border-zinc-600 px-2">
                        Notes
                      </th>
                      <th className="text-left font-normal min-w-[65px] whitespace-normal border-[1px] border-zinc-600 px-2">
                        Role
                      </th>
                  
                      <th className="text-left font-normal min-w-[50px] whitespace-normal border-[1px] border-zinc-600 px-2">
                        Team
                      </th>
                      <th className="text-left font-normal min-w-[50px] whitespace-normal border-[1px] border-zinc-600 px-2">
                        Total Hours
                      </th>
                    </tr>
                  </thead>               
                </table>
              </div>
               

                <div className='w-full flex flex-col max-w-[1920px] overflow-x-auto cursor-pointer custom-scrollbar'
                 ref={containerRef1}
                 onMouseDown={(e) => handleMouseDown(e, containerRef2)}
                 onMouseLeave={handleMouseLeaveOrUp}
                 onMouseUp={handleMouseLeaveOrUp}
                 onMouseMove={(e) => handleMouseMove(e, containerRef2)}
                 onScroll={() => syncScroll(containerRef1, containerRef2)}
                >
                  <table className="table-auto w-auto border-collapse">
                    <thead className="bg-secondary h-[60px]">
                      <tr className="bg-secondary text-[0.5rem] text-black font-normal h-[60px]">
                        {longestAlldates?.allDates.map((dateObj, index) => {
                        const date = new Date(dateObj);
                        date.setHours(0, 0, 0, 0);

                        const today = new Date();
                        today.setHours(0, 0, 0, 0);

                        const startOfWeek = new Date(today);
                        startOfWeek.setDate(today.getDate() - (today.getDay() - 1));

                        const endOfWeek = new Date(startOfWeek);
                        endOfWeek.setDate(startOfWeek.getDate() + 4);

                        let bgColor = "bg-white";
                        if (date >= startOfWeek && date <= endOfWeek) {
                          const prevDay = new Date(today);
                          prevDay.setDate(today.getDate() - 1);

                          const nextDay = new Date(today);
                          nextDay.setDate(today.getDate() + 1);

                          if (date.getTime() < today.getTime()) {
                            bgColor = "bg-gray-300"; 
                          } else if (date.getTime() === today.getTime()) {
                            bgColor = "bg-pink-500";
                          } else if (date.getTime() >= nextDay.getTime()) {
                            bgColor = "bg-white";
                          }
                        }


                          const shouldInsertTotal = (index + 1) % 5 === 0; // Insert "Total Hours" after every 5 dates

                          return (
                            <React.Fragment key={index}>
                              {/* Date Cell */}
                              <th
                                data-id={formatAustralianDate(dateObj)}
                                className={`relative w-[20px] font-normal border-[1px] border-zinc-700 ${bgColor}`}
                              >
                                <div className="whitespace-nowrap w-[20px] transform -rotate-[90deg]">
                                  <p className="mt-3 font-semibold">{formatAustralianDate(dateObj)}</p>
                                </div>
                              </th>

                              {/* Add "Total Hours" **AFTER EVERY 5th DATE** */}
                              {shouldInsertTotal && (
                                <th
                                  key={`total-${index}`}
                                  className="font-normal w-[20px] px-1 border-[1px] border-zinc-700 bg-primary text-white"
                                >
                                  <div className="transform w-[20px] -rotate-[90deg] font-semibold">
                                    <p>Total Hours</p>
                                  </div>
                                </th>
                              )}
                            </React.Fragment>
                          );
                        })}
                      </tr>
                    </thead>            
                  </table>
                </div>

                

              
            </div>

            <div className=' relative h-auto flex items-start bg-secondary w-full'>
              
              <div className=' w-fit flex flex-col sticky'>
                <table className="table-auto w-auto border-collapse">
                  <thead className="h-[60px] text-nowrap"
                  style={{ visibility: 'collapse' }}
                  >
                    <tr className="text-[0.6rem] text-white font-normal text-left border-collapse">
                      <th className="text-left font-normal min-w-[30px] whitespace-normal border-[1px] border-zinc-600 px-2">
                        Action
                      </th>
                      <th className="text-left font-normal min-w-[80px] whitespace-normal border-[1px] border-zinc-600 px-2">
                        Job Number
                      </th>
                      <th className="text-left font-normal min-w-[70px] whitespace-normal border-[1px] border-zinc-600 px-2">
                        Client
                      </th>
                      <th className="text-left font-normal min-w-[80px] whitespace-normal border-[1px] border-zinc-600 px-2">
                        Project Name
                      </th>
                      <th className="text-left font-normal min-w-[50px] whitespace-normal border-[1px] border-zinc-600 px-2">
                        JM
                      </th>
                      <th className="text-left font-normal min-w-[60px] whitespace-normal border-[1px] border-zinc-600 px-2">
                       EST. $
                      </th> 
                      <th className="text-left font-normal min-w-[60px] whitespace-normal border-[1px] border-zinc-600 px-2">
                        % Inv.
                      </th>
                      <th className="text-left font-normal min-w-[90px] whitespace-normal border-[1px] border-zinc-600 px-2">
                        Job Component
                      </th>
                      <th className="text-left font-normal min-w-[100px] whitespace-normal border-[1px] border-zinc-600 px-2">
                        Notes
                      </th>
                      <th className="text-left font-normal min-w-[65px] whitespace-normal border-[1px] border-zinc-600 px-2">
                        Role
                      </th>
                  
                      <th className="text-left font-normal min-w-[50px] whitespace-normal border-[1px] border-zinc-600 px-2">
                        Team
                      </th>
                      <th className="text-left font-normal min-w-[50px] whitespace-normal border-[1px] border-zinc-600 px-2">
                        Total Hours
                      </th>
                    </tr>
                  </thead>

                  {/* request */}
                  <tbody>
                    {listRequest[0]?.members.map((item, graphIndex) =>
                        <tr key={`${graphIndex}`} className="bg-primary text-[.55rem] py-2 h-[30px] border-[1px] border-zinc-600">
                          <td className=' border-[1px] border-zinc-600 px-1'></td>
                          <td className=' border-[1px] border-zinc-600 px-1'>TX10010.00-</td>
                          <td className=' border-[1px] border-zinc-600 px-1'>Triaxial Consulting</td>
                          <td className=' border-[1px] border-zinc-600 px-1'>On-Leave</td>
                          <td className=' border-[1px] border-zinc-600 px-1'></td>
                          <td className=' border-[1px] border-zinc-600 px-1'></td>
                          <td className=' border-[1px] border-zinc-600 px-1'></td>
                          <td className=' border-[1px] border-zinc-600 px-1'>AL, SL & Other Leaves</td>
                          <td className=' border-[1px] border-zinc-600 px-1'></td>
                          <td className=' border-[1px] border-zinc-600 px-1'></td>
                          <td onClick={() => router.push(`/finance/individualworkload?employeeid=${item.id}&name=${item.name}&teamname=${list[0].teamname}`)} className=" border-[1px] border-zinc-600 px-2 text-start cursor-pointer underline text-blue-400">{item.initial}</td>
                          <td></td>

                        </tr>
                    )}
                  </tbody>

                  {/* project */}
                  <tbody>
                     {list.map((graphItem, graphIndex) =>
                                        graphItem.members
                                        .sort((a, b) => {
                                          const roleOrder = ["Engr.", "Engr. Revr.", "Drft.", "Drft. Revr."];

                                          const clean = (role: string) => role.trim().toLowerCase();

                                          const indexA = roleOrder.findIndex(r => clean(r) === clean(a.role));
                                          const indexB = roleOrder.findIndex(r => clean(r) === clean(b.role));

                                          return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
                                        })
                                        .map((member, memberIndex) => {

                                          
                                          // Sum all hours for the member
                                           const totalHours = member.dates?.reduce((sum, date) => {
                                            // Skip hours if the status array includes 'Leave'
                                            if (date.status?.includes('Leave')) {
                                              return sum;
                                            }
                                            return sum + date.hours;
                                          }, 0) || 0;
                    
                                          return (
                                            <tr 
                                              key={`${graphItem._id}-${memberIndex}`}
                                                data-invoice-id={graphItem._id}
                                               ref={el => {
                                                  if (memberIndex === 0) {
                                                    console.log('Setting ref for', graphItem._id, el);
                                                    rowRefs.current[graphItem._id] = el;
                                                  }
                                                }}

                                              className={`text-left text-[.55rem] py-2 h-[30px] border-[1px] border-zinc-600 border-collapse ${graphItem.isVariation ? 'text-red-600' : 'text-black'} ${clientColor(graphItem.clientname.priority)}`}
                                            >
                                              <td className="text-center text-white h-[30px] flex items-center justify-center gap-1">
                                                {memberIndex === 0 && (
                                                  <input
                                                    type="checkbox"
                                                    checked={componentid === graphItem._id}
                                                    onChange={() => {
                                                      handleCheckboxChange(graphItem._id);
                                                      setProjectname(graphItem.projectname.projectid);
                                                      setJobmanager(graphItem.jobmanager.employeeid);
                                                      setJobno(graphItem.jobno);
                                                      findMember(graphItem.members);
                                                      setNotes(graphItem.members[0]?.notes || "");
                                                      setNotes2(graphItem.members[1]?.notes || "");
                                                      setNotes3(graphItem.members[2]?.notes || "");
                                                      setNotes4(graphItem.members[3]?.notes || "");
                                                      setIsmanager(graphItem.jobmanager.isManager);
                                                      setIsjobmanager(graphItem.jobmanager.isJobManager);

                                                      setTimeout(() => {
                                                        rowRefs.current[graphItem._id]?.scrollIntoView({ behavior: "smooth", block: "center" });
                                                      }, 100); 
                                                    }}
                                                  />
                                                )}
                                              </td>
                    
                                              <td className="text-wrap whitespace-normal break-all border-[1px] border-zinc-600 px-2">
                                                <TooltipProvider delayDuration={.1}>
                                                  <Tooltip>
                                                    <TooltipTrigger>{memberIndex === 0 && truncateText(graphItem.jobno, 20)}</TooltipTrigger>
                                                    <TooltipContent className=' text-[.6rem]'>
                                                      <p>{memberIndex === 0 && graphItem.jobno}</p>
                                                    </TooltipContent>
                                                  </Tooltip>
                                                </TooltipProvider>
  
                                                
                                              </td>
                                              <td className="text-wrap whitespace-normal break-all border-[1px] border-zinc-600 px-2">
                                                
                                                <TooltipProvider delayDuration={.1}>
                                                  <Tooltip>
                                                    <TooltipTrigger>{memberIndex === 0 && truncateText(graphItem.clientname.name, 10)}</TooltipTrigger>
                                                    <TooltipContent className=' text-[.6rem]'>
                                                      <p>{memberIndex === 0 && graphItem.clientname.name}</p>
                                                    </TooltipContent>
                                                  </Tooltip>
                                                </TooltipProvider>
                                              </td>
                                              <td className="text-wrap whitespace-normal break-all border-[1px] border-zinc-600 px-2">
                                                
                                                <TooltipProvider delayDuration={.1}>
                                                  <Tooltip>
                                                    <TooltipTrigger>{memberIndex === 0 && truncateText(graphItem.projectname.name, 10)}</TooltipTrigger>
                                                    <TooltipContent className=' text-[.6rem]'>
                                                      <p>{memberIndex === 0 && graphItem.projectname.name}</p>
                                                    </TooltipContent>
                                                  </Tooltip>
                                                </TooltipProvider>
                                              </td>
                                              <td className="text-wrap whitespace-normal break-all border-[1px] border-zinc-600 px-2">
                                                {memberIndex === 0 && graphItem.jobmanager.initials}
                                              </td>

                                               <td className="text-wrap whitespace-normal break-all border-[1px] border-zinc-600 px-2">
                                                  {memberIndex === 0 && `$ ${graphItem.estimatedbudget.toLocaleString()}`}
                                                  {/* $ {graphItem.estimatedbudget.toLocaleString()} */}
                                                </td>

                                                <td className="text-wrap whitespace-normal break-all border-[1px] border-zinc-600 px-2">
                                                  {memberIndex === 0 && graphItem.budgettype !== 'rates' && `${graphItem.invoice.percentage}%`}
                                                  {/* {graphItem.budgettype !== 'rates' && `${graphItem.invoice.percentage}%`} */}
                                                </td>
                                              <td className="text-wrap whitespace-normal break-all border-[1px] border-zinc-600 px-2">
                                                
                                                <TooltipProvider delayDuration={.1}>
                                                  <Tooltip>
                                                    <TooltipTrigger>{memberIndex === 0 && truncateText(graphItem.jobcomponent, 15)}</TooltipTrigger>
                                                    <TooltipContent className=' text-[.6rem]'>
                                                      <p>{memberIndex === 0 && graphItem.jobcomponent}</p>
                                                    </TooltipContent>
                                                  </Tooltip>
                                                </TooltipProvider>
                                              </td>
                                              <td className="text-wrap whitespace-normal break-all border-[1px] border-zinc-600 px-2">
                                                <Editnotes note={member.notes} role={member.role} userid={member._id} componentid={graphItem.componentid}>
                                                  <td>
                                                    {member.notes ? <p className="text-[.55rem]">{truncateText(member.notes, 18)}</p> : <p className="text-[.5rem] h-full w-full text-center"></p>}
                                                  </td>
                                                </Editnotes>
                                                </td>
                                              
                                              <td className="text-wrap whitespace-normal break-all border-[1px] border-zinc-600 px-2 text-[.5rem]">
                                                {member.role}
                                              </td>
                                             
                                              <td className="text-wrap whitespace-normal break-all border-[1px] border-zinc-600 px-2">
                                               
                                                <EditMember membername={member.employee.fullname} memberid={member._id} role={member.role} memberlist={employee} userid={member.employee._id} componentid={graphItem.componentid}>
                                                  {member.employee.initials}
                                                </EditMember>
                                               
                                              </td>
                                              <td className="text-wrap whitespace-normal break-all border-[1px] border-zinc-600 px-2">{totalHours.toLocaleString()}</td>
                                            </tr>
                                          );
                                        })
                                      )}
                  </tbody>
                    
                </table>

              
              </div>

              <div 
              ref={containerRef2}
              onMouseDown={(e) => handleMouseDown(e, containerRef1)}
              onMouseLeave={handleMouseLeaveOrUp}
              onMouseUp={handleMouseLeaveOrUp}
              onMouseMove={(e) => handleMouseMove(e, containerRef1)}
              onScroll={() => syncScroll(containerRef2, containerRef1)}
              className=' w-full flex flex-col max-w-[1920px] overflow-x-auto cursor-pointer hide-scrollbar'>
                <table className="table-auto border-collapse min-w-full ">
                <thead className="bg-secondary h-[60px]"
                  style={{ visibility: 'collapse' }}
                >
                  <tr className="bg-secondary text-[0.5rem] text-black font-normal h-[60px]">
                    {longestAlldates?.allDates.map((dateObj, index) => {
                    const date = new Date(dateObj);
                    date.setHours(0, 0, 0, 0);

                    const today = new Date();
                    today.setHours(0, 0, 0, 0);

                    const startOfWeek = new Date(today);
                    startOfWeek.setDate(today.getDate() - (today.getDay() - 1));

                    const endOfWeek = new Date(startOfWeek);
                    endOfWeek.setDate(startOfWeek.getDate() + 4);

                    let bgColor = "bg-white";
                    if (date >= startOfWeek && date <= endOfWeek) {
                      const prevDay = new Date(today);
                      prevDay.setDate(today.getDate() - 1);

                      const nextDay = new Date(today);
                      nextDay.setDate(today.getDate() + 1);

                      if (date.getTime() < today.getTime()) {
                        bgColor = "bg-gray-300"; 
                      } else if (date.getTime() === today.getTime()) {
                        bgColor = "bg-pink-500";
                      } else if (date.getTime() >= nextDay.getTime()) {
                        bgColor = "bg-white";
                      }
                    }


                      const shouldInsertTotal = (index + 1) % 5 === 0; // Insert "Total Hours" after every 5 dates

                      return (
                        <React.Fragment key={index}>
                          {/* Date Cell */}
                          <th
                            data-id={formatAustralianDate(dateObj)}
                            className={`relative w-[20px] font-normal border-[1px] border-zinc-700 ${bgColor}`}
                          >
                            <div className="whitespace-nowrap w-[20px] transform -rotate-[90deg]">
                              <p className="mt-3 font-semibold">{formatAustralianDate(dateObj)}</p>
                            </div>
                          </th>

                          {/* Add "Total Hours" **AFTER EVERY 5th DATE** */}
                          {shouldInsertTotal && (
                            <th
                              key={`total-${index}`}
                              className="font-normal w-[20px] px-1 border-[1px] border-zinc-700 bg-primary text-white"
                            >
                              <div className="transform w-[20px] -rotate-[90deg] font-semibold">
                                <p>Total Hours</p>
                              </div>
                            </th>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </tr>
                </thead>

                {/* request */}
                <tbody>
                      {listRequest.map((graphItem, graphIndex) =>
                        graphItem.members.map((member, memberIndex) => {
                          // Precompute weekly totals
                          const totalHoursForWeek: number[] = [];
                          let currentWeekTotal = 0;
                          let weekCounter = 0;
                        
                          return (
                            <tr
                              key={`${graphIndex}-${memberIndex}`}
                              className="bg-primary text-[.6rem] py-2 h-[30px] border-[1px] border-zinc-600"
                            >
                              {longestAlldates?.allDates.map((dateObj, index) => {
                                const date = new Date(dateObj);
                                const isFriday = date.getDay() === 5;
                                const weekIndex = Math.floor(index / 5); // Ensure correct indexing
    
                                const shouldInsertTotal = (index + 1) % 5 === 0;
                                
                                const memberDate = member.dates?.find(
                                  (date) => formatDate(date.date) === formatDate(dateObj)
                                );
    
                                return (
                                  <React.Fragment key={index}>
                                    <td
                                      className="relative text-center overflow-hidden bg-white cursor-pointer border-[1px] border-zinc-400"
                                    >
                                      <div className="w-full h-[50px] absolute flex top-0">
                                      {statusColorRequest( dateObj, member.event, member.leave, member.wellness, member.wfh).map((item, index) => (
                                      <div key={index} className={`w-full h-full ${item}`}></div>
                                        ))}
                                      </div>
                                      <p className="relative text-black font-bold text-[.45rem] z-30">
                                          {
                                        member.leave?.some(leave =>
                                          isDateInRange(formatDate(dateObj), leave.leavestart, leave.leaveend)
                                        )
                                          ? Math.max(memberDate?.totalhoursofjobcomponents ?? 0, 0).toLocaleString() // ensures result is never negative
                                          : '-'
                                           }
                                      </p>
                                    </td>
    
                                    {shouldInsertTotal && (
                                      <td className="text-center font-normal w-[40px] bg-primary border-[1px] border-zinc-700">
                                        <p className="text-white">
                                          {Number.isInteger(totalHoursForWeek[weekIndex])
                                            ? totalHoursForWeek[weekIndex]
                                            : totalHoursForWeek[weekIndex]?.toFixed(2)}
                                        </p>
                                      </td>
                                    )}
                                  </React.Fragment>
                                );
                              })}
                            </tr>
                          );
                        })
                      )}
    
                </tbody>

                {/* prject */}
                <tbody className=' translate-y-[.5px] '>
                      {list.map((graphItem, graphIndex) =>
                        graphItem.members.sort((a, b) => {
                                          const roleOrder = ["Engr.", "Engr. Revr.", "Drft.", "Drft. Revr."];

                                          const clean = (role: string) => role.trim().toLowerCase();

                                          const indexA = roleOrder.findIndex(r => clean(r) === clean(a.role));
                                          const indexB = roleOrder.findIndex(r => clean(r) === clean(b.role));

                                          return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
                                        }).map((member, memberIndex) => {
                          // Precompute weekly totals
                          const totalHoursForWeek: number[] = [];
                          let currentWeekTotal = 0;
                          let weekCounter = 0;
    
    
    
                       longestAlldates.allDates.forEach((dateObj, index) => {
                        const formattedDate = formatDate(dateObj);

                        const isOnLeave = member.leaveDates?.some(leave =>
                          isDateInRange(formattedDate, leave.leavestart, leave.leaveend)
                        );

                        const memberDate = member.dates?.find(
                          (date) => formatDate(date.date) === formattedDate
                        );

                        // Skip computation if memberDate.status includes 'Leave'
                        if (memberDate?.status?.includes('Leave')) {
                          return; // Skip this date
                        }

                        let hoursToAdd = 0;

                        if (isOnLeave) {
                          if (typeof memberDate?.workinghoursduringleave !== 'undefined') {
                            hoursToAdd = memberDate.workinghoursduringleave || 0;
                          } else {
                            hoursToAdd = memberDate?.hours || 0;
                          }
                        } else {
                          hoursToAdd = memberDate?.hours || 0;
                        }

                        currentWeekTotal += hoursToAdd;

                        const isLastDate = index === longestAlldates.allDates.length - 1;
                        if (new Date(dateObj).getDay() === 5 || isLastDate) {
                          totalHoursForWeek.push(currentWeekTotal);
                              currentWeekTotal = 0;
                              weekCounter++;
                            }
                          });

                          
    
                          return (
                            <tr
                              key={`${graphIndex}-${memberIndex}`}
                              className="bg-primary text-[.6rem] py-2 h-[31px] border-[1px] border-zinc-600"
                            >
                              {longestAlldates.allDates.map((dateObj, index) => {
                                const date = new Date(dateObj);
                                const isFriday = date.getDay() === 5;
                                const weekIndex = Math.floor(index / 5); // Ensure correct indexing
                                
                                const memberDate = member.dates?.find(
                                  (date) => formatDate(date.date) === formatDate(dateObj)
                                );
    
                                const shouldInsertTotal = (index + 1) % 5 === 0;
    
                                
    
    
    
                                // Handle Click
                                const handleClick = () => {
                                  setDialog(true);
                                  setDate(dateObj);
                                  setProjectid(graphItem._id);
                                  setName(member.employee.fullname);
                                  setEmployeeid(member.employee._id);
                                  setHours(memberDate?.hours || 0);
                                  setAddstatus(memberDate?.status || []);
                                  setSelectedRows(memberDate?.status || []);
                                  setSelected(memberDate?.status || []);
                                  setLeavestatus(
                                    isDateInRange(
                                      dateObj,
                                      member.leaveDates[0]?.leavestart,
                                      member.leaveDates[0]?.leaveend
                                    )
                                  );
                                  setEvent(
                                    isDateInRange(
                                      dateObj,
                                      member.eventDates[0]?.startdate,
                                      member.eventDates[0]?.enddate
                                    )
                                  );
                                  wdStatusChecker(member.wellnessDates, dateObj, member.eventDates);
                                  setIsjobmanager(graphItem.jobmanager.isJobManager);
                                  setLeave(
                                    isDateInRange(
                                      dateObj,
                                      member.leaveDates[0]?.leavestart,
                                      member.leaveDates[0]?.leaveend
                                    )
                                  );
                                  setRole(member.role);
                                };
    
    
                                return (
                                  <React.Fragment key={index}>
                                    <td
                                      className="relative text-center overflow-hidden bg-white cursor-pointer border-[1px]"
                                      onClick={handleClick}
                                    >
    
                                      
                                      <div className="w-full h-[50px] absolute flex top-0">
                                        {statusColor(
                                          memberDate?.status || [],
                                          dateObj,
                                          member.leaveDates[0]?.leavestart || "",
                                          member.leaveDates[0]?.leaveend || "",
                                          member.eventDates[0]?.startdate || "",
                                          member.eventDates[0]?.enddate || "",
                                          member.wellnessDates[0],
                                          memberDate?.hours || 0,
                                          member.eventDates,
                                          member.leaveDates,
                                          member.wellnessDates,
                                          member.wfhDates
                                        ).map((item, index) => (
                                          <div key={index} className={`w-full h-[50px] ${item}`}></div>
                                        ))}
                                      </div>
                                      <p className="relative text-black font-bold text-[.5rem] z-30">
                                        {/* {memberDate ? memberDate.hours : "-"} */}
                                        {/* {memberDate ? memberDate.hours : "-"} */}

                                        {/* {
                                          member.leaveDates?.some(leave =>
                                            isDateInRange(formatDate(dateObj), leave.leavestart, leave.leaveend)
                                          )
                                            ? (
                                                typeof memberDate?.workinghoursduringleave !== 'undefined'
                                                  ? (memberDate.workinghoursduringleave > 0
                                                      ? memberDate.workinghoursduringleave.toLocaleString()
                                                      : '-')
                                                  : (memberDate?.hours && memberDate.hours > 0
                                                      ? memberDate.hours.toLocaleString()
                                                      : '-')
                                              )
                                            : (
                                                memberDate?.hours && memberDate.hours > 0
                                                  ? memberDate.hours.toLocaleString()
                                                  : '-'
                                              )
                                        } */}

                                        {memberDate?.status?.includes('Leave') ? '-' : memberDate?.hours.toLocaleString() ?? '-'}

                                        {/* { memberDate?.hours.toLocaleString()} */}
                                      </p>
                                    </td>
    
                                    {shouldInsertTotal && (
                                      <td className="text-center font-normal w-[40px] bg-primary border-[1px] border-zinc-700">
                                        <p className="text-white text-[.5rem] font-semibold"
                                        >
                                          {Number.isInteger(totalHoursForWeek[weekIndex])
                                            ? totalHoursForWeek[weekIndex]
                                            : totalHoursForWeek[weekIndex]?.toLocaleString()}
                                        </p>
                                      </td>
                                    )}
                                  </React.Fragment>
                                );
                              })}
                            </tr>
                          );
                        })
                      )}
    
                </tbody>
                </table>
              </div>

            </div>
    
            <Dialog open={dialog} onOpenChange={setDialog}>
                                  <DialogContent className=' p-8 bg-secondary border-none text-white max-h-[80%] w-full overflow-y-auto'>
                                    {/* {todaysDate} {formatGetDate(date)} */}
                                    {canEdit(date) ? (
                                      <Tabs defaultValue="account" className=" w-full">
                                       <TabsList className=' text-xs bg-zinc-800'>
                                         <TabsTrigger value="single">Single</TabsTrigger>
                                         <TabsTrigger value="multiple">Multiple</TabsTrigger>
                                       </TabsList>
                                       <TabsContent value="single">
                                         <DialogHeader>
                                           <DialogTitle>Update workload ({name} <span className=' text-xs text-red-500'>({role})</span> at {formatDate(date)})</DialogTitle>
                                           <DialogDescription>
                                             Note, you can only update the hours rendered if the employee is not on leave.
                                           </DialogDescription>
                                         </DialogHeader>
                                         <div className=' w-full flex flex-col gap-2'>              
                                         <label htmlFor="" className=' text-xs mt-4'>Select Status</label>
             
                                           <div className='w-full flex items-center gap-6'>
                                             {statusData.map((item) => (
                                               <div key={item.id} className='flex items-center gap-1 text-xs'>
                                                 <input
                                                //  disabled={wdStatus || event || leave}
                                                   value={item.id}
                                                   type="checkbox"
                                                   checked={selected.includes(item.id)}
                                                 onChange={() => handleChangeCheckbox(item.id as any)}
                                                 />
                                                 <p className=' p-1'>{item.name}</p>
                                               </div>
                                             ))}
                                           </div>
                                         </div>
             
                                         <div className=' flex flex-col gap-2 text-xs'>
                                           <label htmlFor="">Hours Rendered</label>
                                           <input type="number" value={hours} onChange={(e) => setHours(e.target.valueAsNumber)} placeholder='Hours' id="" className=' bg-primary p-2 rounded-md text-xs' />
                                           
                                         </div>
             
                                     
                               
                                         <div className=' w-full flex items-end justify-end mt-4 gap-2'>
                                           <button 
                                          //  disabled={wdStatus || event || leave} 
                                           onClick={() => removeWorkload()} className=' px-4 py-2 bg-zinc-600 text-xs text-white rounded-md'>Remove</button>
             
                                           <button 
                                          //  disabled={wdStatus || event || leave} 
                                           onClick={() => updateWorkload()} className=' px-4 py-2 bg-red-600 text-xs text-white rounded-md'>Save</button>
             
                                         </div>
                                      
                                         {/* {(wdStatus === true || event === true || leave === true) && (
                                           <p className=' text-xs text-red-500 flex items-center gap-2'><OctagonAlert size={15}/> Employee is in on wellness or event day, you can't update this selected workload</p>
                                         )} */}
                                       </TabsContent>
                                       <TabsContent value="multiple">
             
                                         <DialogHeader>
                                           <DialogTitle>Update workload ({name} <span className=' text-xs text-red-500'>({role})</span>)</DialogTitle>
                                           <DialogDescription>
                                             Note, you can only update the hours rendered if the employee is not on leave.
                                           </DialogDescription>
                                         </DialogHeader>
                                         {forms.map((form, index) => (
                                         <div key={index} className=" w-full mb-6 p-4 border border-zinc-700 rounded-lg text-xs">
                                           {/* <h2 className="text-sm font-semibold mb-2">Form {index + 1}</h2> */}
                                           <div className="space-y-4">
                                             <div className=' flex items-center gap-4'>
                                               <label className="block text-sm font-medium">Start Date</label>
                                             
             
                                                 <DatePicker
                                                    selected={form.startdate ? new Date(form.startdate) : new Date()} // Use today's date if no startdate
                                                    onChange={(date) =>
                                                      handleChange(index, "startdate", date ? date.toISOString() : "")
                                                    }
                                                    startDate={new Date(startReq)}
                                                    maxDate={new Date(endReq)}
                                                    selectsEnd
                                                    minDate={new Date(startReq)}
                                                    dateFormat="dd/MM/yyyy"
                                                    placeholderText="DD/MM/YYYY"
                                                    className="bg-primary text-xs p-2 w-fit relative"
                                                    onKeyDown={(e) => e.preventDefault()}
                                                  />
             
                                               <label className="block text-sm font-medium">End Date</label>
             
             
                                                 <DatePicker
                                                   selected={form.enddate ? new Date(form.enddate) : null} // Ensure a valid Date object
                                                   onChange={(date) =>
                                                     handleChange(index, "enddate", date ? date.toISOString() : "")
                                                   }
                                                   startDate={new Date(startReq)}
                                                   maxDate={new Date(endReq)}
                                                   selectsEnd 
                                                   minDate={new Date(startReq)} 
                                                   dateFormat="dd/MM/yyyy"
                                                   placeholderText="DD/MM/YYYY"
                                                   className="bg-primary text-xs p-2 w-fit relative"
                                                   onKeyDown={(e) => e.preventDefault()}
             
                                                 />
             
                                             
                                             </div>
             
                                             <div>
                                             <label className="block text-sm font-medium">Hours Rendered</label>
                                             <input  type="number"
                                               value={form.hours}
                                               onChange={(e) => handleChange(index, 'hours', e.target.valueAsNumber)}
                                             placeholder='Hours' id="" className=' bg-primary p-2 rounded-md text-xs' />
                                             
                                             </div>
             
                                             <div>
                                               <label className="block text-sm font-medium">Status</label>
                                               <div className="flex space-x-4">
                                                 {statusDataMultiple.map((option) => (
                                                   <label key={option.id} className="flex items-center">
                                                     <input
                                                       type="checkbox"
                                                       value={option.id}
                                                       checked={form.status.includes(option.id)}
                                                       onChange={() => handleCheckbox(index, option.id)}
                                                       className="mr-2"
                                                     />
                                                     {option.name}
                                                   </label>
                                                 ))}
                                               </div>
                                             </div>
             
                                             {index !== 0 && (
                                               <button
                                               onClick={() => deleteForm(index)}
                                               className="px-4 py-2 bg-red-500 text-white rounded-md text-[.6rem]"
                                             >
                                               Delete Form
                                             </button>
                                             )}
                                             
                                           </div>
                                         </div>
                                         ))}
             
                                         {/* <button
                                           onClick={addForm}
                                           className=" w-fit text-xs px-4 py-2 bg-blue-500 text-white rounded-md mr-2"
                                         >
                                           Add Form
                                         </button> */}
             
                                         <button
                                           onClick={updateMultipleWorkload}
                                           className=" w-fit text-xs px-4 py-2 bg-green-500 text-white rounded-md"
                                         >
                                           Save All
                                         </button>
             
                                       </TabsContent>
                                      </Tabs>
                                    ) : (
                                      <div className=' w-full h-full flex items-center'>
                                        <p className=' text-xs text-zinc-500'>Not allowed.</p>
                                      </div>
                                    )}
                                   
                                    
            
                                
                                  </DialogContent>
            </Dialog>
         </div>
        )}
        </>
       
      )}
      

      {/* <Individualrequest ref={individualRequestRef} alldates={longestAlldates?.allDates} data={list} /> */}   

        {list.length === 0 && (
          <div className=' w-full h-full flex items-center justify-center'>
            <p className=' text-xs text-zinc-400'>No job component's yet under this project, please create one to see the workload!</p>
          </div>
        )}
  

    </div>
  )
}
