" use client"
import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Plus, Trash } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import toast from 'react-hot-toast'
import axios, { AxiosError } from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { formatAustralianDate } from '@/utils/helpers'
import { Textarea } from '@/components/ui/textarea'

type Project = {
  createdAt: string
deadlinedate: string
invoiced: number
managerName: string
projectname: string
startdate: string
status: string
teamname: string
updatedAt: string
client: string
_id: string
}

type Client = {
  clientname: string
clientid: string
}



interface Data {
  children?: React.ReactNode;
  teamid: string
}

type Member = {
  employeeid: string;
  role: string;
};

interface FormData {
    jobmanager: string;
    budgettype: string;
    estimatedbudget: string;
    jobcomponent: string
    jobno: string
    members: Member[]
}

type Employee = {
  employeeid: string,
  name: string
}

type Manager = {
  employeeid: string,
  name: string
}

type TeamMembers = {
  employeeid: string
  fullname: string
  resources: string
  role: string
}

export default function Createprojectcomponent( prop: Data) {
  const [dialog, setDialog] = useState(false)
  const [clientid, setClientid] = useState('')
  const router = useRouter()
  const [employee, setEmployee] = useState<Employee[]>([])
  const [manager, setManager] = useState<Manager[]>([])
  const params = useSearchParams()
  const id = params.get('teamid')
  const [isValidated, setIsvalidated] = useState(false)
  const [jobno, setJobno] = useState('')
  const [projectname, setProjectname] = useState('')
  const [client, setClient] = useState('')
  const today = new Date()
  const [adminotes, setAdminnotes] = useState('')
  const [description, setDescription] = useState('')
  const [members, setMembers] = useState<TeamMembers[]>([])




  const [formData, setFormData] = useState<FormData[]>([{ jobmanager: '',jobno: '123', budgettype: '', estimatedbudget: '0', jobcomponent: '', members: [
                {
                    employeeid: "",
                    role: "Engr."
                },
                {
                    employeeid: "",
                    role: "Engr. Revr."
                },
                {
                    employeeid: "",
                    role: "Drft."
                },
                {
                    employeeid: "",
                    role: "Drft. Revr."
                }
  ]}]);

  const handleAddForm = () => {
    const lastForm = formData[formData.length - 1];
  
    // Check if any field in the last form is empty
    const isFormComplete = Object.values(lastForm).every(value => value !== '');

    setIsvalidated(isFormComplete)
  
    if (!isFormComplete) {
      toast.error("Please fill in all fields before adding a new form.");
      return; // Prevent adding a new form if validation fails
    }
  
    // Add a new form if validation passes
    setFormData([...formData, { jobmanager: '',jobno: '123', budgettype: '', estimatedbudget: '', jobcomponent: '' , members: [
      {
          employeeid: "6723819e92ce23277a217af9",
          role: "Engr."
      },
      {
          employeeid: "672c2984da9422943054dbe4",
          role: "Engr. Revr."
      },
      {
          employeeid: "672c3200f02dcae26f2a4ea4",
          role: "Drft."
      },
      {
          employeeid: "67237fe8f9602eca6297b940",
          role: "Drft. Revr."
      }
  ] }]);
  };
  

  const handleRemoveForm = (index: number) => {
    setFormData(formData.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, field: keyof FormData, value: string | Member[]) => {
    setFormData((prevFormData) => {
      const newFormData = [...prevFormData];
      if (field === 'members' && Array.isArray(value)) {
        newFormData[index].members = value;
      } else if (typeof value === 'string') {
        (newFormData[index][field] as string) = value;
      }
      return newFormData;
    });
  };

  const handleMemberChange = (
    formIndex: number,
    memberIndex: number,
    field: keyof Member,
    value: string
  ) => {
    setFormData((prevFormData) => {
      const updatedFormData = [...prevFormData];
      const selectedForm = { ...updatedFormData[formIndex] };
      const updatedMembers = [...selectedForm.members];
  
      // Check for duplicate employee ID in the members array
      if (field === 'employeeid') {
        const isDuplicate = updatedMembers.some(
          (member, idx) => member.employeeid === value && idx !== memberIndex
        );
  
        if (isDuplicate) {
          toast.error("This employee is already assigned to a role.");
          return prevFormData; // Prevent update if validation fails
        }
      }
  
      // Proceed with updating the member data
      updatedMembers[memberIndex] = { ...updatedMembers[memberIndex], [field]: value };
      selectedForm.members = updatedMembers;
      updatedFormData[formIndex] = selectedForm;
      return updatedFormData;
    });
  };
  


  //create job component
  const createProjectcomponent = async () => {
    const filteredFormData = formData.map(({ jobno, ...rest }) => rest);

    const isFormDataComplete = (form: FormData) => {
      // Check if all main fields are filled
      const mainFieldsFilled = 
        form.jobmanager.trim() !== '' &&
        form.budgettype.trim() !== '' &&
        form.estimatedbudget.trim() !== '' &&
        form.jobcomponent.trim() !== '' &&
        form.jobno.trim() !== '';
    
      // Return true if all conditions are met
      return mainFieldsFilled
    };

    const isEveryFormComplete = () => {
      return formData.every((form) => isFormDataComplete(form));
    };

    if (!isEveryFormComplete()) {
      toast.error("Please fill in all form fields.");
      return; // Prevent further action if any form is incomplete
    }

    if (filteredFormData[0].budgettype === 'lumpsum' && filteredFormData[0].estimatedbudget === '0'){
      toast.error("Estimated budget should not be zero.");
      return; // Prevent further action if any form is incomplete
    }

      try {
        const request = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/jobcomponent/createjobcomponent`,{
          teamid: id,
          projectname:  projectname,
          clientid: clientid === 'Other' ? client : clientid,
          jobno: jobno,
          start: (today.toLocaleString()).split(',')[0],
          adminnotes: adminotes,
          description: description,
          jobcomponentvalue: filteredFormData //jobcomponentvalue, clientid, projectname, start, teamid, jobno, priority 
        }, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
            }
        })
  
        const response = await toast.promise(request, {
          loading: 'Creating job component....',
          success: `Successfully created`,
          error: 'Error while creating job component',
      });

      if(response.data.message === 'success'){
        setFormData([{ jobmanager: '',jobno: '12345', budgettype: '', estimatedbudget: '', jobcomponent: '', members: [
          {
              employeeid: "",
              role: "Engnr."
          },
          {
              employeeid: "",
              role: "Engr. Revr."
          },
          {
              employeeid: "",
              role: "Drft."
          },
          {
              employeeid: "",
              role: "Drft. Revr."
          }
        ] }])
        setDialog(false)
        window.location.reload()

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
  
  };

  //employee list
  useEffect(() => {
    try {
      const timer = setTimeout(() => {
        const getList = async () => {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/employeesearchlistmanager`,{
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

  //managerlist
  useEffect(() => {
    try {
      const timer = setTimeout(() => {
        const getList = async () => {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/managerlistmanager?fullname`,{
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json'
              }
          })
      
          setManager(response.data.data.managerlist)
          
        
        
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

  //teamemberlist
   useEffect(() => {
    try {
      const timer = setTimeout(() => {
        const getList = async () => {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/teams/listteammembers?teamid=${prop.teamid}`,{
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json'
              }
          })
      
          setMembers(response.data.data.teammembers[0].members)
        
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



  const [list, setList] = useState<Project[]>([])
  useEffect(() => {
    const timer = setTimeout(() => {
      const getList = async () => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/projects/saprojectlist?searchproject&page=0&limit=99999`,{
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
            }
        })
        setList(response.data.data.projectlist)
       
     
      }
      getList()
    },500)
    return () => clearTimeout(timer)
    
  },[])

  
  const [clients, setClients] = useState<Client[]>([])


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
    
          setClients(response.data.data.clients)
      
        }
        getList()
      },500)
      return () => clearTimeout(timer)
      
      
    },[])
  


  



  
  return (
    <Dialog open={dialog} onOpenChange={setDialog} >
    <DialogTrigger>
       {prop.children}
    </DialogTrigger>
    <DialogContent className=' max-h-[90%] overflow-y-auto'>
      <div className=' w-full p-4 flex flex-col gap-4'>
        <p className=' text-sm uppercase font-semibold text-red-700 flex items-center gap-2'><span className=' bg-red-700 px-4 py-1 text-zinc-100 text-xs'>Create</span>Project</p>
        <div className=' w-full flex flex-col gap-4'>

            

            <p className=' text-xs'>Project Details</p>

               {/* <Label className="mt-2 text-zinc-500">Select Project</Label>
                                    <Select
                                     value={projectid} 
                                     onValueChange={setProjectId}
                                    >
                                        <SelectTrigger className="text-xs h-[35px] bg-zinc-100">
                                        <SelectValue placeholder="Select Project" className="text-black" />
                                        </SelectTrigger>
                                        <SelectContent className="text-xs">
                                          {list.map((item, index) => (
                                            <SelectItem key={index} value={item._id}>{item.projectname}</SelectItem>
                                          ))}
                                        </SelectContent>
                                    </Select> */}

                                    <div className=' flex flex-col'>
                                      <label htmlFor="" className=' text-xs'>Job Number<span className=' text-red-500 text-lg'>*</span></label>
                                      <Input type='text' maxLength={15} value={jobno} onChange={(e) => setJobno(e.target.value)} className=' text-xs h-[35px] bg-zinc-200' placeholder='Job Number'/>
                                    </div>

                                    
                                                          
                                                            
                                                            
                                                                       <div className=' bg-zinc-200 rounded-sm flex flex-col p-2'>
                                                                         
                                                                              <div className=' flex items-start gap-4 '>
                                                                                
                                                            
                                                                                <div className=' w-full'>
                                                                                  <Label className=' text-zinc-500'>Project Name <span className=' text-red-500 text-lg'>*</span></Label>
                                                                                  <Input type='text' value={projectname} onChange={(e) => setProjectname(e.target.value)} className=' text-xs h-[35px] bg-white' placeholder='Project name'/>
                                                            
                                                            
                                                                                </div>
                                                            
                                                                               
                                                                                <div className="w-full">
                                                                                    <Label className="text-zinc-500">
                                                                                      Client Name<span className="text-red-500 text-lg">*</span>
                                                                                    </Label>
                                                                                    <Select value={clientid} onValueChange={setClientid} disabled={client.trim() !== ''} >
                                                                                      <SelectTrigger className="text-xs h-[35px] bg-white">
                                                                                        <SelectValue placeholder="Select Client" className="text-black" />
                                                                                      </SelectTrigger>
                                                                                      <SelectContent className="text-xs">
                                                                                       {clients
                                                                                        .slice() // create a shallow copy to avoid mutating original array
                                                                                        .sort((a, b) => a.clientname.localeCompare(b.clientname))
                                                                                        .map((item) => (
                                                                                          <SelectItem key={item.clientid} value={item.clientid}>
                                                                                            {item.clientname}
                                                                                          </SelectItem>
                                                                                        ))}
                                                                                        {/* <SelectItem value='Other'>
                                                                                            Other
                                                                                          </SelectItem> */}
                                                                                      </SelectContent>
                                                                                    </Select>
                                                                                  </div>

                                                                                  
                                                            
                                                                              </div>
                                                            
                                                                             
                                                                              <div className="w-full">
                                                                                    <Label className="text-zinc-500">
                                                                                      If other, please input the client name.
                                                                                    </Label>
                                                                                    <Input
                                                                                      type="text"
                                                                                      value={client}
                                                                                      onChange={(e) => setClient(e.target.value)}
                                                                                      className="text-xs h-[35px] bg-white"
                                                                                      placeholder="Client name"
                                                                                       disabled={clientid !== ''} // Disable if a client is selected
                                                                                    />
                                                                                  </div>

                                                            
                                                                              
          

            {formData.map((item, index) => (
                <div key={index} className="flex flex-col gap-2 bg-zinc-100 rounded-md p-4 mt-4">
                {index !== 0 && (
                    <div className="w-full flex items-end justify-end">
                    <div className=' w-full flex items-end justify-end'>
                        <button onClick={() => handleRemoveForm(index)} className=' px-2 py-2 bg-red-600 rounded-md text-[.5rem] text-white flex items-center gap-1'><Trash size={12}/>Remove</button>
                    </div>
                    </div>
                )}

                <Accordion type="single" collapsible className=''>
                    <AccordionItem value="item-1">
                    <AccordionTrigger className="text-xs p-2 bg-zinc-300 rounded-sm font-semibold">Component Details</AccordionTrigger>
                    <AccordionContent>
                        <div className="bg-zinc-200 flex flex-col gap-1 p-2">

                        <Label className="mt-2 text-zinc-500">Job Component Name<span className=' text-red-500 text-lg'>*</span></Label>
                        <Input
                            type="text"
                            className="text-xs h-[35px] bg-white"
                            placeholder="Job Component Name"
                            value={item.jobcomponent}
                            onChange={(e) => handleChange(index, 'jobcomponent', e.target.value)}
                        />

                        {/* <Label className="mt-2 text-zinc-500">Description</Label>
                        <Textarea
                          
                            className="text-xs h-[35px] bg-white"
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        /> */}

                      <Label className="mt-2 text-zinc-500">Admin Notes</Label>
                        <Textarea
                          
                            className="text-xs h-[35px] bg-white"
                            placeholder="Admin Notes"
                            value={adminotes}
                            onChange={(e) => setAdminnotes(e.target.value)}
                        />

                        <Label className="mt-2 text-zinc-500">Job Manager<span className=' text-lg text-red-500'>*</span></Label>
                        <Select
                            value={item.jobmanager}
                            onValueChange={(value) => handleChange(index, 'jobmanager', value)}
                        >
                            <SelectTrigger className="text-xs h-[35px] bg-white">
                            <SelectValue placeholder="Select Job Manager" className="text-black" />
                            </SelectTrigger>
                            <SelectContent className="text-xs">
                              {members.map((item, index) => (
                                <SelectItem key={index} value={item.employeeid}>{item.fullname}</SelectItem>
                              ))}
                            </SelectContent>
                        </Select>


                        {/* <Label className="font-semibold mt-4">Job Component Budget</Label> */}
                        <Label className="mt-2 text-zinc-500">
                            Budget Type<span className="text-lg text-red-500">*</span>
                          </Label>
                          <Select
                            value={item.budgettype}
                            onValueChange={(value) => handleChange(index, "budgettype", value)}
                          >
                            <SelectTrigger className="text-xs h-[35px] bg-white mt-2">
                              <SelectValue placeholder="Type" className="text-black" />
                            </SelectTrigger>
                            <SelectContent className="text-xs">
                              <SelectItem value="rates">Rates</SelectItem>
                              <SelectItem value="lumpsum">Lump sum</SelectItem>
                            </SelectContent>
                          </Select>

                          <Label className="mt-2 text-zinc-500">Job Component Budget $</Label>
                          <Input
                            type="number"
                            className="text-xs h-[35px] bg-white"
                            placeholder="0"
                            value={item.estimatedbudget}
                            onChange={(e) => handleChange(index, "estimatedbudget", e.target.value)}
                            disabled={item.budgettype === "rates"} // ✅ Disable when 'rates' is selected
                          />

                        <Label className="font-semibold mt-4">Members</Label>
                        <Label className="font-semibold mt-4">Engineer</Label>
                        <Select
                            value={item.members[0].employeeid}
                            onValueChange={(value) => handleMemberChange(index, 0, 'employeeid', value)}
                        >
                            <SelectTrigger className="text-xs h-[35px] bg-white mt-2">
                            <SelectValue placeholder="Select Employee" className="text-black" />
                            </SelectTrigger>
                            <SelectContent className="text-xs">
                              {employee.map((item, index) => (
                              <SelectItem key={index} value={item.employeeid}>{item.name}</SelectItem>

                              ))}
                            
                            </SelectContent>
                        </Select>

                        <Label className="font-semibold mt-4">Engineer Reviewer.</Label>
                        <Select
                             value={item.members[1].employeeid}
                             onValueChange={(value) => handleMemberChange(index, 1, 'employeeid', value)}
                        >
                            <SelectTrigger className="text-xs h-[35px] bg-white mt-2">
                            <SelectValue placeholder="Select Employee" className="text-black" />
                            </SelectTrigger>
                            <SelectContent className="text-xs">
                              {employee.map((item, index) => (
                                <SelectItem key={index} value={item.employeeid}>{item.name}</SelectItem>

                                ))}
                            </SelectContent>
                        </Select>

                        <Label className="font-semibold mt-4">Drafter</Label>
                        <Select
                            value={item.members[2].employeeid}
                            onValueChange={(value) => handleMemberChange(index, 2, 'employeeid', value)}
                        >
                            <SelectTrigger className="text-xs h-[35px] bg-white mt-2">
                            <SelectValue placeholder="Select Employee" className="text-black" />
                            </SelectTrigger>
                            <SelectContent className="text-xs">
                              {employee.map((item, index) => (
                              <SelectItem key={index} value={item.employeeid}>{item.name}</SelectItem>

                              ))}
                            </SelectContent>
                        </Select>

                        <Label className="font-semibold mt-4">Drafter Reviewer.</Label>
                        <Select
                             value={item.members[3].employeeid}
                             onValueChange={(value) => handleMemberChange(index, 3, 'employeeid', value)}
                        >
                            <SelectTrigger className="text-xs h-[35px] bg-white mt-2">
                            <SelectValue placeholder="Select employee" className="text-black" />
                            </SelectTrigger>
                            <SelectContent className="text-xs">
                              {employee.map((item, index) => (
                              <SelectItem key={index} value={item.employeeid}>{item.name}</SelectItem>

                              ))}
                            </SelectContent>
                        </Select>

                        

                        </div>

                    </AccordionContent>
                    </AccordionItem>
                </Accordion>

                {/* <Label className="mt-2 text-zinc-500">Admin Notes: </Label>
                <Textarea
                    placeholder="Please input text here"
                    className="text-xs bg-zinc-200"
                    value={item.adminNotes}
                    onChange={(e) => handleChange(index, 'adminNotes', e.target.value)}
                /> */}
                </div>
            ))}
           
         
          

          <p className=' text-xs text-zinc-500 mt-4'>Note: <span className=' text-red-500'>*</span><span className=' italic'>- Required</span></p>

          <div className=' flex items-center gap-4 mt-4'>
            <button onClick={createProjectcomponent} className=' bg-red-700 text-zinc-100 px-4 py-2 text-xs rounded-sm mt-4 w-auto'>Submit</button>

          </div>


         
        </div>

    
        </div>
      </div>
    </DialogContent>
    </Dialog>

  )
}