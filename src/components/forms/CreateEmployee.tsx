'use client'
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from '../ui/input'
import { Teams } from '@/types/data'
import ButtonSecondary from '../common/ButtonSecondary'
import { Button } from 'react-day-picker'

interface Data {
    children?: React.ReactNode;

}

export default function CreateEmployee(prop: Data) {
  const [dialog, setDialog] = useState(false)

  return (
    <Dialog open={dialog} onOpenChange={setDialog}>
                <DialogTrigger>
                   <button className=' bg-red-700 px-6 py-2 rounded-sm flex items-center gap-1 text-xs'><Plus size={15}/>Create</button>
                </DialogTrigger>
                <DialogContent className=' bg-secondary border-none text-zinc-100 grid grid-cols-1 lg:grid-cols-[250px,1fr]'>
                  <div className=' bg-blue-400 lg:block hidden'
                  style={{backgroundImage: `url('/bg2.png')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat:"no-repeat"}}
                  
                  >
                    <p className=' p-2 uppercase text-sm font-semibold mt-8 bg-gradient-to-r from-zinc-950 to-zinc-950/10'>Create Employee</p>
                  </div>

                  <div className=' flex flex-col gap-2 p-4'>
                    <DialogHeader>
                    <DialogDescription>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt, reprehenderit sequi. Quisquam, libero quam placeat molestias cum est.
                    </DialogDescription>
                    </DialogHeader>
                  <form action="" className=' flex flex-col '>
                    <h2 className=' uppercase font-semibold text-sm'>Employee Details</h2>
                    <div className=' grid grid-cols-2 gap-4'>
                      <div className=' flex flex-col gap-1'>
                        <label htmlFor="" className=' mt-2 text-xs'>First name</label>
                        <Input placeholder='First name' type='text' className=' bg-primary text-xs h-[35px]'/>
                      
                        <label htmlFor="" className=' mt-2 text-xs'>Last name</label>
                        <Input placeholder='Last name' type='text' className=' bg-primary text-xs h-[35px]'/>

                        <label htmlFor="" className=' mt-2 text-xs'>Initial*</label>
                        <Input placeholder='Initial' type='text' className=' bg-primary text-xs h-[35px]'/>

                        <label htmlFor="" className=' mt-2 text-xs'>Contact no</label>
                        <Input placeholder='Contact no' type='text' className=' bg-primary text-xs h-[35px]'/>

                        <label htmlFor="" className=' mt-2 text-xs'>Reporting to *</label>
                        <Select>
                          <SelectTrigger className="w-full text-xs h-[35px]">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent className=' text-xs'>
                            {Teams.map((item, index) => (
                            <SelectItem key={index} value={item.name}>{item.name}</SelectItem>

                            ))}
                           
                          </SelectContent>
                        </Select>
                      </div>

                      <div className=' flex flex-col gap-1'>
                        <label htmlFor="" className=' mt-2 text-xs'>Email *</label>
                        <Input placeholder='Email' type='email' className=' bg-primary text-xs h-[35px]'/>

                        <label htmlFor="" className=' mt-2 text-xs'>Team *</label>
                        <Select>
                          <SelectTrigger className="w-full text-xs h-[35px]">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent className=' text-xs'>
                            {Teams.map((item, index) => (
                            <SelectItem key={index} value={item.name}>{item.name}</SelectItem>

                            ))}
                           
                          </SelectContent>
                        </Select>

                        <label htmlFor="" className=' mt-2 text-xs'>Position *</label>
                        <Input placeholder='Position' type='text' className=' bg-primary text-xs h-[35px]'/>

                        <div className=' w-full bg-primary flex flex-col items-center mt-2 p-2'>
                          <div className=' w-20 aspect-square bg-secondary'>

                          </div>
                          <input type="file" className=' text-[.5em] mt-2 bg-secondary' placeholder='Select Image' />
                        </div>
                       
                      </div>
                    </div>
                      

                  </form>
                  
                    <div className=' w-full flex items-end justify-end gap-2 mt-8'>
                      <ButtonSecondary onClick={() => setDialog(false)}  name={'Cancel'}/>
                      <Button onClick={() => setDialog(false)} name={'Save'}/>
                    </div>

                  </div>
                  
                </DialogContent>
              </Dialog>
  )
}
