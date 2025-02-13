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



interface Data {
  children?: React.ReactNode;
  name: any
  manager: any
  type: any
  id: any
  pname: string
  client: string
  start: string
  end: string
  estbudget: number
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


export default function DuplicateJobComponent( prop: Data) {
  const [dialog, setDialog] = useState(false)
  const [jobno, setJobno] = useState('')
  const [client, setClient] = useState('')
  const [pm, setPm] = useState('')
  const [count, setCount] = useState(1)
  const router = useRouter()
  const [employee, setEmployee] = useState<Employee[]>([])
  const [manager, setManager] = useState<Manager[]>([])
  const params = useSearchParams()
  const id = params.get('projectid')
  const [isValidated, setIsvalidated] = useState(false)

  const [formData, setFormData] = useState<FormData[]>([{ jobmanager: prop.manager,jobno: '123', budgettype: prop.type, estimatedbudget:` ${prop.estbudget}`, jobcomponent: prop.name, members: [
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
          role: "Engnr."
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
  
  
  useEffect(() => {
    function generateJobNumber() {
      const prefix = "TX";
      const randomNumber = Math.floor(1000000 + Math.random() * 9000000); // Generates a random 7-digit number
      const jobNumber = `${prefix}${randomNumber}`;
      setJobno(jobNumber)
      return jobNumber;
    }
    generateJobNumber()

  },[dialog])

  console.log(formData)


  //create job component
  const createProjectcomponent = async () => {
    const filteredFormData = formData.map(({ jobno, ...rest }) => rest);

    // const isFormDataComplete = (form: FormData) => {
    //   // Check if all main fields are filled
    //   const mainFieldsFilled = 
    //     form.jobmanager.trim() !== '' &&
    //     form.budgettype.trim() !== '' &&
    //     form.estimatedbudget.trim() !== '' &&
    //     form.jobcomponent.trim() !== '' &&
    //     form.jobno.trim() !== '';
    
    //   // Return true if all conditions are met
    //   return mainFieldsFilled
    // };

    // const isEveryFormComplete = () => {
    //   return formData.every((form) => isFormDataComplete(form));
    // };

    // if (!isEveryFormComplete()) {
    //   toast.error("Please fill in all form fields.");
    //   return; 
    // }

      try {
        const request = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/jobcomponent/createjobcomponent`,{
          projectid: prop.id,
          jobcomponentvalue: filteredFormData
        }, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
            }
        })
  
        const response = await toast.promise(request, {
          loading: 'Creating job component....',
          success: `Successfully created`,
          error: 'Error while creating the job component',
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

  // useEffect(() => {
  //   if(id === '' || id === undefined || id === null){
  //     router.push('/pm/projects')
  //   }
  // },[id])


  const remove = () => {
    setFormData([{ jobmanager: prop.manager,jobno: '123', budgettype: prop.type, estimatedbudget: '', jobcomponent: prop.name, members: [
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
]}]);
  }

  console.log(prop.estbudget)

  



  
  return (
    <Dialog open={dialog} onOpenChange={setDialog} >
    <DialogTrigger>
       {prop.children}
    </DialogTrigger>
    <DialogContent className=' max-h-[90%] overflow-y-auto'>
      <div className=' w-full p-4 flex flex-col gap-4'>
        <p className=' text-sm uppercase font-semibold text-red-700 flex items-center gap-2'><span className=' bg-red-700 px-4 py-1 text-zinc-100 text-xs'>Duplicate</span>Job Component</p>
        <div className=' w-full flex flex-col gap-4'>

          <p className=' text-xs'>Project Details</p>
          
                        
          <div className=' flex flex-col'>
           <Label className=" text-zinc-500">Job Number</Label>
           <Input type='text' value={jobno} onChange={(e) => setJobno(e.target.value)} className=' text-xs bg-zinc-200' placeholder='Job no'/>

          </div>
                                              
                                                                      
                                                                      
              <div className=' bg-zinc-200 rounded-sm flex flex-col p-2'>
                                                                                   
                    <div className=' flex items-start gap-4 '>
                                                                                          
                                                                      
                      <div className=' w-full'>
                        <Label className=' text-zinc-500'>Project Name <span className=' text-red-700'>*</span></Label>
                        <Input type='text' value={prop.pname}  className=' text-xs h-[35px] bg-white' placeholder='Project name'/>
                                                                      
                                                                      
                      </div>
                                                                      
                                                                                         
                        <div className=' w-full'>
                          <Label className=' text-zinc-500'>Client<span className=' text-red-700'>*</span></Label>
                        <Input type='text' value={prop.client}  className=' text-xs h-[35px] bg-white' placeholder='Project name'/>

                        
                                                                      
                        </div>
                                                                      
                    </div>
                                                                      
                    <div className=' flex items-start gap-4 '>
                                                                                          
                                                                      
                      <div className=' w-full'>
                        <Label className=' text-zinc-500'>Start Date <span className=' text-red-700'>*</span></Label>
                        <Input type='text' value={prop.start.split('T')[0]}  className=' text-xs h-[35px] bg-white' placeholder='Project name' />
                                                                      
                                                                      
                      </div>
                                                                      
                                                                                         
                        <div className=' w-full'>
                          <Label className=' text-zinc-500'>End date<span className=' text-red-700'>*</span></Label>
                          <Input type='text' value={prop.end.split('T')[0]}  className=' text-xs h-[35px] bg-white' placeholder='Project name'/>
                                                                      
                        </div>
                                                                      
                    </div>
                                      
                                                                                        
             </div>

            {formData.map((item, index) => (
                <div key={index} className="flex flex-col gap-2 bg-zinc-100 rounded-md p-4">
                {index !== 0 && (
                    <div className="w-full flex items-end justify-end">
                    <div className=' w-full flex items-end justify-end'>
                        <button onClick={() => handleRemoveForm(index)} className=' px-2 py-2 bg-red-600 rounded-md text-[.5rem] text-white flex items-center gap-1'><Trash size={12}/>Remove</button>
                    </div>
                    </div>
                )}

                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                    <AccordionTrigger className="text-xs p-2 bg-zinc-300 rounded-sm font-semibold">Component Details</AccordionTrigger>
                    <AccordionContent>
                        <div className="bg-zinc-200 flex flex-col gap-1 p-2">

                        <Label className="mt-2 text-zinc-500">Job Component Name</Label>
                        <Input
                            type="text"
                            className="text-xs h-[35px] bg-white"
                            placeholder="Job Component Name"
                            value={item.jobcomponent}
                            onChange={(e) => handleChange(index, 'jobcomponent', e.target.value)}
                        />

                        {/* <Label className="mt-2 text-zinc-500">Job no.</Label>
                        <Input
                            type="text"
                            className="text-xs h-[35px] bg-white"
                            placeholder="Job no."
                            value={item.jobno}
                            onChange={(e) => handleChange(index, 'jobno', e.target.value)}
                        /> */}
                        <Label className="mt-2 text-zinc-500">Job Manager</Label>
                        <Select
                            value={item.jobmanager}
                            onValueChange={(value) => handleChange(index, 'jobmanager', value)}
                        >
                            <SelectTrigger className="text-xs h-[35px] bg-white">
                            <SelectValue placeholder="Select Job Manager" className="text-black" />
                            </SelectTrigger>
                            <SelectContent className="text-xs">
                              {employee.map((item, index) => (
                                <SelectItem key={index} value={item.employeeid}>{item.name}</SelectItem>
                              ))}
                            </SelectContent>
                        </Select>


                        <Label className="font-semibold mt-4">Job Component</Label>
                        <Label className="mt-2 text-zinc-500">Budget Type</Label>
                        <Select
                            value={item.budgettype}
                            onValueChange={(value) => handleChange(index, 'budgettype', value)}
                        >
                            <SelectTrigger className="text-xs h-[35px] bg-white mt-2">
                            <SelectValue placeholder="Type" className="text-black" />
                            </SelectTrigger>
                            <SelectContent className="text-xs">
                            <SelectItem value="rates">Rates</SelectItem>
                            <SelectItem value="lumpsum">Lump sum</SelectItem>
                            </SelectContent>
                        </Select>

                        {/* <Label className="mt-2 text-zinc-500">Estimated Budget $</Label>
                        <Input
                            type="number"
                            className="text-xs h-[35px] bg-white"
                            placeholder="0"
                            value={item.estimatedbudget}
                            onChange={(e) => handleChange(index, 'estimatedbudget', e.target.value)}
                        /> */}

                        <Label className="mt-2 text-zinc-500">Component Budget</Label>
                        <Input
                            type="text"
                            className="text-xs h-[35px] bg-white"
                            value={item.estimatedbudget}
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

            <div className=' w-full flex items-end justify-end'>
              <button onClick={remove} className='  bg-red-700 text-zinc-100 px-4 py-2 text-xs rounded-sm w-auto'>Remove Members</button>
            </div>
           
         
          

          <p className=' text-xs text-zinc-500 mt-4'>Note: <span className=' text-red-500'>*</span><span className=' italic'>- Required</span></p>

          <div className=' flex items-center gap-4 mt-4'>
            <button onClick={createProjectcomponent} className=' bg-red-700 text-zinc-100 px-4 py-2 text-xs rounded-sm mt-4 w-auto'>Submit</button>

          </div>


         
        </div>

    
      </div>
    </DialogContent>
    </Dialog>

  )
}
