"use client"
import React, { cache, useEffect, useState } from 'react'
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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Plus, Delete, Trash, Eye } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import ButtonSecondary from '@/components/common/ButtonSecondary'
import Button from '@/components/common/Button'
import { Textarea } from '@/components/ui/textarea'
import axios from 'axios'

type Message = {
  _id: string
  title: string
  content: string
  senderfullname: string
  receiverfullname: string
}
export default function Emailtable() {
  const [dialog, setDialog] = useState(false)
  const [loading, setLoading] = useState(false)
  const [totalpage, setTotalpage] = useState(0)
  const [currentpage, setCurrentpage] = useState(0)
  const [list, setList] = useState<Message[]>([])


  //messages
  useEffect(() => {
    const fetchLeaveData = cache(async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/email/listemail?page=${currentpage}&limit=10`,
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        setTotalpage(response.data.data.totalpage)
        setList(response.data.data.emaillist)
        setLoading(false);
  
      
      } catch (error) {
        setLoading(false);
  
       
      }
    });
  
    fetchLeaveData();
  }, [ currentpage]);

  return (
    <div className=' w-full h-full flex justify-center bg-secondary p-6 text-zinc-100'>

      <div className=' w-full flex flex-col max-w-[1520px]'>
        <div className=' flex md:flex-row flex-col items-center justify-between gap-4'>
            <div className=' flex  items-center gap-4'>
                <Dialog open={dialog} onOpenChange={setDialog}>
                <DialogTrigger>
                  <button className=' bg-red-700 text-xs px-6 py-2 rounded-sm flex items-center gap-1'><Plus size={15}/>Create</button>
                </DialogTrigger>
                <DialogContent className=' bg-secondary border-none text-zinc-100 grid grid-cols-1 lg:grid-cols-[250px,1fr]'>
                  <div className=' bg-blue-400 lg:block hidden'
                  style={{backgroundImage: `url('/bg2.png')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat:"no-repeat"}}
                  
                  >
                    <p className=' p-2 uppercase text-sm font-semibold mt-8 bg-gradient-to-r from-zinc-950 to-zinc-950/10'>Create Mail</p>
                  </div>

                  <div className=' flex flex-col gap-2 p-4'>
                    <DialogHeader>
                    <DialogDescription>
                    </DialogDescription>
                    </DialogHeader>
                  <form action="" className=' flex flex-col '>
                    <h2 className=' uppercase font-semibold text-sm'>Mail</h2>
                    <div className=' grid grid-cols-1 gap-4'>
                      <div className=' flex flex-col gap-1'>
                        <label htmlFor="" className=' mt-2 text-xs'>Subject</label>
                        <Input placeholder='Subject' type='text' className=' bg-primary text-xs h-[35px]'/>

                        <label htmlFor="" className=' mt-2 text-xs'>Content</label>
                        <Textarea placeholder='Content' className=' bg-primary border-none text-xs'/>
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

            </div>
            
        </div>

        <Table className=' mt-4'>
        <TableHeader>
            <TableRow>
            {/* <TableHead className="w-[100px]">Select</TableHead> */}
            <TableHead>Sender</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Message</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
          {list.map((item, index) => (
            <TableRow key={index}>
            {/* <TableCell className="font-medium"><Checkbox/></TableCell> */}
            <TableCell>{item.senderfullname}</TableCell>
            <TableCell>{item.title}</TableCell>
            <TableCell>
              <p className=' line-clamp-3'>{item.content}</p>
            </TableCell>

            </TableRow>
          ))}
            
        </TableBody>
        </Table>

      
      </div>
        
    </div>
  )
}
