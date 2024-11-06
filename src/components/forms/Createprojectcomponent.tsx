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
import { Input } from '../ui/input'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from '../ui/textarea'
import { Checkbox } from '../ui/checkbox'
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
import { useForm } from 'react-hook-form'
import { createProjectComponenent, CreateProjectComponentSchema, createProjectSchema, CreateProjectSchema } from '@/schema/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { number } from 'zod'
import toast from 'react-hot-toast'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'



interface Data {
     children?: React.ReactNode;

}


interface FormData {
    jobManager: string;
    budgetType: string;
    estBudget: string;
    adminNotes: string;
  }

export default function Createprojectcomponent( prop: Data) {
  const [dialog, setDialog] = useState(false)
  const [jobno, setJobno] = useState('')
  const [client, setClient] = useState('')
  const [pm, setPm] = useState('')
  const [count, setCount] = useState(1)
  const router = useRouter()

  const [formData, setFormData] = useState<FormData[]>([{ jobManager: '', budgetType: '', estBudget: '', adminNotes: '' }]);

  const handleAddForm = () => {
    const lastForm = formData[formData.length - 1];
  
    // Check if any field in the last form is empty
    const isFormComplete = Object.values(lastForm).every(value => value !== '');
  
    if (!isFormComplete) {
      toast.error("Please fill in all fields before adding a new form.");
      return; // Prevent adding a new form if validation fails
    }
  
    // Add a new form if validation passes
    setFormData([...formData, { jobManager: '', budgetType: '', estBudget: '', adminNotes: '' }]);
  };
  

  const handleRemoveForm = (index: number) => {
    setFormData(formData.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, field: keyof FormData, value: string) => {
    const newFormData = [...formData];
    newFormData[index][field] = value;
    setFormData(newFormData);
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


  //create job component
  const createProjectcomponent = async () => {
    try {
      const request = axios.post(`${process.env.NEXT_PUBLIC_API_URL}`,{

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

  

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    trigger,
    formState: { errors },
  } = useForm<CreateProjectComponentSchema>({
    resolver: zodResolver(createProjectComponenent),
  });

  const onSubmit = (data: CreateProjectComponentSchema) => {
    console.log(data); // Handle form submission
  };

  useEffect(() => {
    reset()
  },[dialog])

  console.log(errors)

  const handleSelectPm = (value: string) => {
    setPm(value);
    setValue('jobmanager', value);
    trigger('jobmanager')

  };

  console.log(formData)


  
  return (
    <Dialog open={dialog} onOpenChange={setDialog} >
    <DialogTrigger>
       {prop.children}
    </DialogTrigger>
    <DialogContent className=' max-h-[90%] overflow-y-auto'>
      <form className=' w-full p-4 flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
        <p className=' text-sm uppercase font-semibold text-red-700 flex items-center gap-2'><span className=' bg-red-700 px-4 py-1 text-zinc-100 text-xs'>Create</span>Job Components</p>
        <div className=' w-full flex flex-col gap-4'>

            <div className=' w-full flex items-end justify-end'>
                <button onClick={handleAddForm} className=' px-4 py-2 bg-red-600 rounded-md text-[.6rem] text-white'>Add more</button>
            </div>


            {/* {Array.from({ length: count }).map((item,index) => (
                 <div className=' flex flex-col gap-2 bg-zinc-100 rounded-md p-4'>
                    {index !== 0 && (
                        <div className=' w-full flex items-end justify-end'>
                            <button onClick={() => setCount(count - 1)} className=' px-2 py-2 bg-red-600 rounded-md text-[.5rem] text-white flex items-center gap-1'><Trash size={12}/>Remove</button>
                        </div>
                    )}
                    
                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                            <AccordionTrigger className=' text-xs p-2 bg-zinc-300 rounded-sm font-semibold'>Component Details</AccordionTrigger>
                            <AccordionContent>
                            <div className=' bg-zinc-200 flex flex-col p-2'>
                        
            
                            <div className=' flex items-center gap-4 mt-2'>
                                <div className=' w-full'>
                                <Label className=' mt-2 text-zinc-500'>Job Manager<span className=' text-red-700'>*</span></Label>
                                <Select value={pm} onValueChange={handleSelectPm}>
                                    <SelectTrigger className=" text-xs h-[35px] bg-white">
                                    <SelectValue placeholder="Select Job Manager" className=' text-black' />
                                    </SelectTrigger>
                                    <SelectContent className=' text-xs' >
                                    <SelectItem value="light">Manager</SelectItem>
                                    <SelectItem value="dark">Manager</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.jobmanager && <p className=' text-[.6em] text-red-500'>{errors.jobmanager.message}</p>}
            
                                </div>
            
                            </div>
            
                            <Label className=' font-semibold mt-4'>Job Component Budget</Label>
                            <p className=' bg-red-100 text-xs text-zinc-500 p-2 w-fit mt-2'>Note, you can only edit this once!</p>
            
                            <Select >
                                    <SelectTrigger className=" text-xs h-[35px] bg-white mt-2">
                                    <SelectValue placeholder="Type" className=' text-black' />
                                    </SelectTrigger>
                                    <SelectContent className=' text-xs' >
                                    <SelectItem value="light">Rates</SelectItem>
                                    <SelectItem value="dark">Lump sum</SelectItem>
                                    </SelectContent>
                                </Select>
                            <div className=' flex items-start gap-4 mt-2'>
                                
                                <div className=' w-full'>
                                <Label className=' mt-2 text-zinc-500'>Estimated Budget $ <span className=' text-red-700'>*</span></Label>
                                <Input type='number' className=' text-xs h-[35px] bg-white' placeholder='0' {...register('estbudget')}/>
                                {errors.estbudget && <p className=' text-[.6em] text-red-500'>{errors.estbudget.message}</p>}
            
                                </div>
            
                            
            
                            </div>
            
                            
            
                            
                            </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
    
                    <Label className=' mt-2 text-zinc-500'>Admin Notes: </Label>
                    <Textarea placeholder='Please input text here' className=' text-xs bg-zinc-200' {...register('adminnotes')}/>
                </div>
            ))} */}


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
                        <div className="bg-zinc-200 flex flex-col p-2">
                        <Label className="mt-2 text-zinc-500">Job Manager</Label>
                        <Select
                            value={item.jobManager}
                            onValueChange={(value) => handleChange(index, 'jobManager', value)}
                        >
                            <SelectTrigger className="text-xs h-[35px] bg-white">
                            <SelectValue placeholder="Select Job Manager" className="text-black" />
                            </SelectTrigger>
                            <SelectContent className="text-xs">
                            <SelectItem value="manager1">Manager 1</SelectItem>
                            <SelectItem value="manager2">Manager 2</SelectItem>
                            </SelectContent>
                        </Select>


                        <Label className="font-semibold mt-4">Job Component Budget</Label>
                        <Select
                            value={item.budgetType}
                            onValueChange={(value) => handleChange(index, 'budgetType', value)}
                        >
                            <SelectTrigger className="text-xs h-[35px] bg-white mt-2">
                            <SelectValue placeholder="Type" className="text-black" />
                            </SelectTrigger>
                            <SelectContent className="text-xs">
                            <SelectItem value="rates">Rates</SelectItem>
                            <SelectItem value="lumpsum">Lump sum</SelectItem>
                            </SelectContent>
                        </Select>

                        <Label className="mt-2 text-zinc-500">Estimated Budget $</Label>
                        <Input
                            type="number"
                            className="text-xs h-[35px] bg-white"
                            placeholder="0"
                            value={item.estBudget}
                            onChange={(e) => handleChange(index, 'estBudget', e.target.value)}
                        />

                        </div>

                    </AccordionContent>
                    </AccordionItem>
                </Accordion>

                <Label className="mt-2 text-zinc-500">Admin Notes: </Label>
                <Textarea
                    placeholder="Please input text here"
                    className="text-xs bg-zinc-200"
                    value={item.adminNotes}
                    onChange={(e) => handleChange(index, 'adminNotes', e.target.value)}
                />
                </div>
            ))}
           
         
          

          <p className=' text-xs text-zinc-500 mt-4'>Note: <span className=' text-red-500'>*</span><span className=' italic'>- Required</span></p>

          <div className=' flex items-center gap-4 mt-4'>
            <button className=' bg-red-700 text-zinc-100 px-4 py-2 text-xs rounded-sm mt-4 w-auto'>Submit</button>

          </div>


         
        </div>

       

      </form>
    </DialogContent>
    </Dialog>

  )
}
