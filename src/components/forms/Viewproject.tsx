" use client"
import React, { useState } from 'react'
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
import { Textarea } from '../ui/textarea'
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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"



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


export default function Viewproject( prop: Data) {
  const [dialog, setDialog] = useState(false)
  return (
    <Dialog >
    <DialogTrigger>
       {prop.children}
    </DialogTrigger>
    <DialogContent className=' max-h-[90%] overflow-y-auto'>
      <form className=' w-full p-4 flex flex-col gap-4'>
        <p className=' text-sm uppercase font-semibold text-red-700 flex items-center gap-2'><span className=' bg-red-700 px-4 py-1 text-zinc-100 text-xs'>View</span>Project Details</p>
        <div className=' w-full flex flex-col gap-1'>
          <label htmlFor="" className=' text-xs text-zinc-700'>Team</label>
          <Input type='text' className=' text-xs h-[35px] bg-zinc-200' placeholder='Team'/>

          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
                <AccordionTrigger className=' text-xs p-2 bg-zinc-300 rounded-sm font-semibold'>Job Details</AccordionTrigger>
                <AccordionContent>
                <div className=' bg-zinc-200 flex flex-col p-2'>
                  {/* <Label className=' font-semibold'>Job Details</Label> */}

                  <div className=' flex items-center gap-4 mt-2'>
                    <div className=' w-full'>
                      <Label className=' mt-2 text-zinc-500'>Job no <span className=' text-red-700'>*</span></Label>
                      <Input type='text' className=' text-xs h-[35px] bg-white' placeholder='Job no.'/>
                    </div>

                    <div className=' w-full'>
                      <Label className=' mt-2 text-zinc-500'>Project Name <span className=' text-red-700'>*</span></Label>
                      <Input type='text' className=' text-xs h-[35px] bg-white' placeholder='Project name'/>
                    </div>

                  </div>

                  <div className=' flex items-center gap-4 mt-2'>
                    <div className=' w-full'>
                      <Label className=' mt-2 text-zinc-500'>Client<span className=' text-red-700'>*</span></Label>
                      <Select>
                      <SelectTrigger className=" text-xs h-[35px] bg-white">
                        <SelectValue placeholder="Select Client" className=' text-black' />
                      </SelectTrigger>
                      <SelectContent className=' text-xs'>
                        <SelectItem value="light">Client</SelectItem>
                        <SelectItem value="dark">Client</SelectItem>
                      </SelectContent>
                    </Select>

                    </div>

                    <div className=' w-full'>
                      <Label className=' mt-2 text-zinc-500'>If other please input the Client Name</Label>
                      <Input type='text' className=' text-xs h-[35px] bg-white' placeholder='Name'/>
                    </div>

                  </div>

                

                
                </div>
                </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
                <AccordionTrigger className=' text-xs p-2 bg-zinc-300 rounded-sm font-semibold'>Component Details</AccordionTrigger>
                <AccordionContent>
                <div className=' bg-zinc-200 flex flex-col p-2'>
                  {/* <Label className=' font-semibold'>Component Details</Label> */}

                  <div className=' flex items-center gap-4 mt-2'>
                    <div className=' w-full'>
                      <Label className=' mt-2 text-zinc-500'>Job Manager<span className=' text-red-700'>*</span></Label>
                      <Select>
                        <SelectTrigger className=" text-xs h-[35px] bg-white">
                          <SelectValue placeholder="Select Job Manager" className=' text-black' />
                        </SelectTrigger>
                        <SelectContent className=' text-xs'>
                          <SelectItem value="light">Manager</SelectItem>
                          <SelectItem value="dark">Manager</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                  </div>

                  <Label className=' font-semibold mt-4'>Job Component Budget</Label>
                  <p className=' bg-red-100 text-xs text-zinc-500 p-2 w-fit mt-2'>Note, you only edit this once!</p>


                  <div className=' flex items-center gap-4 mt-2'>
                    
                    <div className=' w-full'>
                      <Label className=' mt-2 text-zinc-500'>Estimated Budget $ <span className=' text-red-700'>*</span></Label>
                      <Input type='number' className=' text-xs h-[35px] bg-white' placeholder='0'/>
                    </div>

                    <div className=' w-full'>
                      <Label className=' mt-2 text-zinc-500'>Job Component<span className=' text-red-700'>*</span></Label>
                      <Input type='number' className=' text-xs h-[35px] bg-white' placeholder='Please input here'/>
                    </div>

                  </div>

                

                
                </div>
                </AccordionContent>
            </AccordionItem>
            </Accordion>


          <Label className=' mt-2 text-zinc-500'>Admin Notes: </Label>
          <Textarea placeholder='Please input text here' className=' text-xs bg-zinc-200'/>


         

          {/* <div className=' flex items-center gap-4 mt-4'>
            <button className=' bg-red-700 text-zinc-100 px-4 py-2 text-xs rounded-sm mt-4 w-auto'>Submit</button>

          </div> */}


         
        </div>

      </form>
    </DialogContent>
    </Dialog>

  )
}
