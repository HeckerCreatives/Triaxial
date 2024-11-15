import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Pen } from 'lucide-react'
import { Input } from '../ui/input'

type Props = {
isJobmanager: boolean
isManager: boolean
teamindex: number
children?: React.ReactNode;
}
export default function Editprojectjobmanager( prop: Props) {

  return (
    <>
  
        <Dialog>
        <DialogTrigger>
            {prop.children}
        </DialogTrigger>
        <DialogContent className=' max-w-[600px] bg-secondary border-none p-6 text-white'>
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
            <DialogDescription className={` ${prop.isJobmanager === true ? 'text-white' : ' text-red-500'}`}>
              {prop.isJobmanager === true ? 'Your the project manager of this project, you are allowed to edit this project' : ' Your are not the project manager of this project, you are not allowed to edit this project'}
              
            </DialogDescription>
          </DialogHeader>

          {prop.isManager === true && (
            <div className=' flex flex-col w-full gap-2 text-xs'>
            <label htmlFor="">Client</label>
            <Select>
              <SelectTrigger className="w-full bg-primary">
                <SelectValue placeholder="Client" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>

            <label htmlFor="">Project Name</label>
            <Input type='text' className=' text-xs h-[35px] bg-primary' placeholder='Project Name' />

            <label htmlFor="">Job Manager</label>
            <Select>
              <SelectTrigger className="w-full bg-primary">
                <SelectValue placeholder="Job Manager" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>

            <div className=' w-full flex items-end justify-end mt-4'>
              <button className=' bg-red-600 px-4 py-2 rounded-md w-fit'>Save</button>
            </div>

          </div>
          )}
          
        </DialogContent>
      </Dialog>


 
    
    </>
  )
}
