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
import { Plus } from 'lucide-react'
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
import { projectVariationSchema, VariationSchema } from '@/schema/schema'
import { zodResolver } from '@hookform/resolvers/zod'




interface Data {
    // open: boolean
    // onOpenChange: boolean
    onClick: () => void
    // name: string
    // type: string
    // start: Date
    // end: Date
    // details: string
    // wd
     children?: React.ReactNode;

}


export default function Variationprojectform( prop: Data) {
  const [dialog, setDialog] = useState(false)
  const [jobno, setJobno] = useState('')
  const [client, setClient] = useState('')
  const [pm, setPm] = useState('')

   const {
    register,
    handleSubmit,
    setValue,
    reset,
    trigger,
    formState: { errors },
  } = useForm<VariationSchema>({
    resolver: zodResolver(projectVariationSchema),
  });

  const onSubmit = (data: VariationSchema) => {
  };

  useEffect(() => {
    reset()
  },[dialog])

  const handleSelectClient = (value: string) => {
    setClient(value);
    setValue('client', value);
    trigger('client')
  };

  const handleSelectPm = (value: string) => {
    setPm(value);
    setValue('jobmanager', value);
    trigger('jobmanager')

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


  
  return (
    <Dialog open={dialog} onOpenChange={setDialog}>
    <DialogTrigger>
       {prop.children}
    </DialogTrigger>
    <DialogContent className=' max-h-[90%] overflow-y-auto'>
      <form className=' w-full p-4 flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
        <p className=' text-sm uppercase font-semibold text-red-700 flex items-center gap-2'><span className=' bg-red-700 px-4 py-1 text-zinc-100 text-xs'>Variation</span>Project Details</p>
        <div className=' w-full flex flex-col gap-2'>
          <label htmlFor="" className=' text-xs text-zinc-700'>Team</label>
          <Input type='text' className=' text-xs h-[35px] bg-zinc-200' placeholder='Team' {...register('team')}/>
           {errors.team && <p className=' text-[.6em] text-red-500'>{errors.team.message}</p>}


            <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
                <AccordionTrigger className=' text-xs p-2 bg-zinc-300 rounded-sm'>Job Details</AccordionTrigger>
                <AccordionContent>
                <div className=' bg-zinc-200 flex flex-col p-2'>
                    {/* <Label className=' font-semibold'>Job Details</Label> */}

                    <div className=' flex items-start gap-4 mt-2'>
                    <div className=' w-full'>
                        <Label className=' mt-2 text-zinc-500'>Job no <span className=' text-red-700'>*</span></Label>
                        <Input type='text' maxLength={15} value={jobno} className=' text-xs h-[35px] bg-white' placeholder='Job no.' {...register("jobno")}/>
                        {errors.jobno && <p className=' text-[.6em] text-red-500'>{errors.jobno.message}</p>}

                    </div>

                    <div className=' w-full'>
                        <Label className=' mt-2 text-zinc-500'>Project Name <span className=' text-red-700'>*</span></Label>
                        <Input type='text' className=' text-xs h-[35px] bg-white' placeholder='Project name' {...register('projectname')}/>
                         {errors.projectname && <p className=' text-[.6em] text-red-500'>{errors.projectname.message}</p>}

                    </div>

                    </div>

                    <div className=' flex items-start gap-4 mt-2'>
                    <div className=' w-full'>
                        <Label className=' mt-2 text-zinc-500'>Client<span className=' text-red-700'>*</span></Label>
                        <Select value={client} onValueChange={handleSelectClient}>
                          <SelectTrigger className=" text-xs h-[35px] bg-white">
                          <SelectValue placeholder="Select Client" className=' text-black' />
                          </SelectTrigger>
                          <SelectContent className=' text-xs'>
                          <SelectItem value="light">Client</SelectItem>
                          <SelectItem value="dark">Client</SelectItem>
                          </SelectContent>
                      </Select>
                      {errors.client && <p className=' text-[.6em] text-red-500'>{errors.client.message}</p>}


                    </div>

                    <div className=' w-full'>
                        <Label className=' mt-2 text-zinc-500'>If other please input the Client Name</Label>
                        <Input type='text' className=' text-xs h-[35px] bg-white' placeholder='Name' {...register('others')}/>
                    </div>

                    </div>

                

                
                </div>
                </AccordionContent>
            </AccordionItem>
            </Accordion>

            <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
                <AccordionTrigger className=' text-xs p-2 bg-zinc-300 rounded-sm'>Component Details</AccordionTrigger>
                <AccordionContent>
                    <div className=' bg-zinc-200 flex flex-col p-2'>
                    {/* <Label className=' font-semibold'>Component Details</Label> */}

                    <div className=' flex items-start gap-4 mt-2'>
                    <div className=' w-full'>
                        <Label className=' mt-2 text-zinc-500'>Job Manager<span className=' text-red-700'>*</span></Label>
                        <Select value={pm} onValueChange={handleSelectPm}>
                        <SelectTrigger className=" text-xs h-[35px] bg-white">
                            <SelectValue placeholder="Select Job Manager" className=' text-black' />
                        </SelectTrigger>
                        <SelectContent className=' text-xs'>
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
                          {  errors.estbudget && <p className=' text-[.6em] text-red-500'>{errors.estbudget.message}</p>}

                        </div>

                        <div className=' w-full'>
                            <Label className=' mt-2 text-zinc-500'>Variation no.<span className=' text-red-700'>*</span></Label>
                            <Input type='number' className=' text-xs h-[35px] bg-white' placeholder='Variation' {...register('variationno')}/>
                            {errors.variationno && <p className=' text-[.6em] text-red-500'>{errors.variationno.message}</p>}

                        </div>

                    </div>

                    <div className=' flex items-start gap-4 mt-2'>
                    
                        <div className=' w-full'>
                            <Label className=' mt-2 text-zinc-500'>Variation Name <span className=' text-red-700'>*</span></Label>
                            <Input type='text' className=' text-xs h-[35px] bg-white' placeholder='0' {...register('variationname')}/>
                            {errors.variationname && <p className=' text-[.6em] text-red-500'>{errors.variationname.message}</p>}

                        </div>

                        <div className=' w-full'>
                            <Label className=' mt-2 text-zinc-500'>Description<span className=' text-red-700'>*</span></Label>
                            <Textarea className=' text-xs h-[35px] bg-white' placeholder='Description' {...register('description')}/>
                            {errors.description && <p className=' text-[.6em] text-red-500'>{errors.description.message}</p>}

                        </div>

                    </div>
                
                </div>
                </AccordionContent>
            </AccordionItem>
            </Accordion>


          <Label className=' mt-2 text-zinc-500'>Admin Notes: </Label>
          <Textarea placeholder='Please input text here' className=' text-xs bg-zinc-200' {...register('adminnotes')}/>
          {errors.adminnotes && <p className=' text-[.6em] text-red-500'>{errors.adminnotes.message}</p>}



         

          <div className=' flex items-center gap-4 mt-4'>
            <button className=' bg-red-700 text-zinc-100 px-4 py-2 text-xs rounded-sm mt-4 w-auto'>Submit</button>

          </div>


         
        </div>

      </form>
    </DialogContent>
    </Dialog>

  )
}
