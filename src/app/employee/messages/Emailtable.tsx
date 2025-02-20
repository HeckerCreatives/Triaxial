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
import refreshStore from '@/zustand/refresh'

type Message = {
  _id: string
  title: string
  content: string
  senderfullname: string
  receiverfullname: string
  createdAt: string
  isRead: boolean
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
  const { refresh, setRefresh, clearRefresh} = refreshStore()


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
  }, [ currentpage, refresh]);

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

  const readmessages = async (id: string) => {
    setRefresh('true')
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/email/reademail?emailId=${id}`,{
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if(response.data.message === 'success'){
        clearRefresh()
      }
    } catch (error) {
      
    }
  }



  return (
    <div className=' w-full h-full flex justify-center bg-secondary p-6 text-zinc-100'>

      <div className=' w-full flex flex-col max-w-[1520px]'>
        <div className=' flex md:flex-row flex-col items-center justify-between gap-4'>
            {/* <div className=' flex  items-center gap-4'>
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

            </div> */}
            
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
       
            <TableHead>Sender</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Message</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
          {list.map((item, index) => (
            <TableRow onClick={() => {openMessage(item.title,item.content, item.createdAt, item.senderfullname); readmessages(item._id)}} key={index} className=' w-full cursor-pointer'>
            {/* <TableCell className="font-medium"><Checkbox/></TableCell> */}
              <TableCell className=' relative'>{item.senderfullname}
                {item.isRead === false && (
                  <p className=' absolute px-2 rounded-full text-[.55rem] bg-red-600 text-white top-0 left-0'>New</p>
                )}
              </TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell className=' w-[700px] flex'>
                <p className=' line-clamp-3'>{item.content.slice(0,150)}...
                </p>
              </TableCell>

            <Dialog open={message} >
            <DialogTrigger className=' w-full'>
             
            </DialogTrigger>
              <DialogContent className=' max-w-[600px] p-6 bg-secondary border-none text-white'>
                <DialogHeader>
                  <DialogTitle></DialogTitle>
                  <DialogDescription>
                  </DialogDescription>
                </DialogHeader>

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
                  {/* <p className=' mt-4 whitespace-pre-wrap'>{content}</p> */}
                  <pre className=' text-xs'>{content}</pre>

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
