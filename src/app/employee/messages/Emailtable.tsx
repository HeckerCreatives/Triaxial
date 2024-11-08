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
import PaginitionComponent from '@/components/common/Pagination'
import Spinner from '@/components/common/Spinner'

type Message = {
  _id: string
  title: string
  content: string
  senderfullname: string
  receiverfullname: string
  createdAt: string
}


export default function Emailtable() {
  const [dialog, setDialog] = useState(false)
  const [message, setMessage] = useState(false)
  const [loading, setLoading] = useState(false)
  const [totalpage, setTotalpage] = useState(0)
  const [currentpage, setCurrentpage] = useState(0)
  const [list, setList] = useState<Message[]>([])
  const [open, setOpen] = useState<Message>()
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [name, setName] = useState('')
  const [content, setContent] = useState('')


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

  //paginition
  const handlePageChange = (page: number) => {
    setCurrentpage(page)
  }

  const openMessage = (title: string, content: string, date: string, name: string) => {
    setMessage(!message)
    setTitle(title)
    setContent(content)
    setName(name)
    setDate(date)
  }



  return (
    <div className=' w-full h-full flex justify-center bg-secondary p-6 text-zinc-100'>

      <div className=' w-full flex flex-col max-w-[1520px]'>
        <div className=' flex md:flex-row flex-col items-center justify-between gap-4'>
           
            
        </div>

        <Table className=' mt-4'>
        {list.length === 0 &&
          <TableCaption className=' text-xs text-zinc-500'>No data</TableCaption>
          }

        {loading === true && (
            <TableCaption className=' '>
              <Spinner/>
            </TableCaption>
          )}
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
            <TableRow onClick={() => openMessage(item.title,item.content, item.createdAt, item.senderfullname)} key={index} className=' w-full cursor-pointer'>
            {/* <TableCell className="font-medium"><Checkbox/></TableCell> */}
              <TableCell>{item.senderfullname}</TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell className=' w-[700px] flex'>
                <p className=' line-clamp-3'>{item.content.slice(0,150)}...
                </p>
              </TableCell>

            <Dialog open={message} >
            <DialogTrigger className=' w-full'>
             
            </DialogTrigger>
              <DialogContent className=' max-w-[600px] p-6 bg-secondary border-none text-white'>
                {/* <DialogHeader>
                  <DialogTitle></DialogTitle>
                  <DialogDescription>
                  </DialogDescription>
                </DialogHeader> */}

                <div className=' flex flex-col gap-4 w-full'>
                  <p className=' text-lg font-semibold'>{title}</p>
                  <div className=' flex items-center gap-2'>
                    <div className=' flex items-center justify-center w-8 h-8 rounded-full bg-primary'>
                      <p className=' uppercase text-lg text-red-600'>{name.slice(0,1)}</p>
                    </div>

                    <div className=' flex flex-col'>
                      <p className=' text-sm font-medium flex gap-2'>{name} <span className=' text-[.7em] text-zinc-400'>{new Date(date).toLocaleString()}</span></p>
                      <p className=' text-xs text-zinc-400'>to me</p>
                    </div>

                  </div>
                  <p className=' mt-4 whitespace-pre-wrap'>{content}</p>
                </div>
              </DialogContent>
            </Dialog>

        
            </TableRow>
            
            
          ))}
            
        </TableBody>
        </Table>

        {list.length !== 0 && (
          <PaginitionComponent currentPage={currentpage} total={totalpage} onPageChange={handlePageChange}/>
        )}

      
      </div>
        
    </div>
  )
}
