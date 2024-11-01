"use client"
import React, { useEffect, useState } from 'react'
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
import axios from 'axios'
import Spinner from '@/components/common/Spinner'
import PaginitionComponent from '@/components/common/Pagination'

type Welnnessday = {
  firstdayofwellnessdaycycle: string
  manager: string
  requestdate: string
  requestid: string
  user: string
}


export default function Requesttable() {
  const [dialog, setDialog] = useState(false)
  const [list, setList] = useState<Welnnessday[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [totalpage, setTotalpage] = useState(0)
  const [currentpage, setCurrentpage] = useState(0)

  //wellness day list
  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      const getList = async () => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/wellnessday/managerwellnessdaylistrequestbyemployee?page=${currentpage}&limit=10&fullnamefilter=${search}`,{
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
            }
        })
  
        console.log('Wellness day',response.data)
        setList(response.data.data.requestlist)
        setTotalpage(response.data.data.totalpages)
        setLoading(false)

        if(search !== ''){
          setCurrentpage(0)
        }
       
      }
      getList()
    }, 500)
    return () => clearTimeout(timer)
    
  },[search, currentpage])

  //paginition
  const handlePageChange = (page: number) => {
    setCurrentpage(page)
  }

  return (
    <div className=' w-full h-full flex justify-center bg-secondary p-6 text-zinc-100'>

      <div className=' w-full flex flex-col max-w-[1520px]'>
        <div className=' flex md:flex-row flex-col items-center justify-end gap-4'>

            {/* <div className=' flex items-center gap-2'>
                <Input value={search} onChange={(e) => setSearch(e.target.value)} type='text' className=' bg-primary h-[35px] text-zinc-100'/>
                <button className=' bg-red-700 px-8 py-2 rounded-sm text-xs'>Search</button>
            </div> */}

            <div className=' flex flex-col gap-1'>
                <label htmlFor="" className=' text-xs'>Search</label>
                <Input value={search} placeholder='Search name (clear the input to reset)' onChange={(e) => setSearch(e.target.value)} type='text' className=' w-[300px] bg-primary text-zinc-100 text-xs h-[35px]'/>
                {/* <button className='px-8 py-2 rounded-sm text-xs bg-red-700'>Search</button> */}
            </div>
            
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
            <TableHead >Manager</TableHead>
            {/* <TableHead>Time Stamp</TableHead> */}
            <TableHead>Name</TableHead>
            <TableHead>First Day of Wellness Day Cycle</TableHead>
            <TableHead>Wellness Day</TableHead>
            <TableHead>Total Number of Working Days</TableHead>
            <TableHead>Total Working Hours During Wellness Day Cycle</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
          {list.map((item, index) => (
            <TableRow key={item.requestid}>
            <TableCell>{item.manager}</TableCell>
            {/* <TableCell className="">00/00/00</TableCell> */}
            <TableCell>{item.user}</TableCell>
            <TableCell>{item.firstdayofwellnessdaycycle}</TableCell>
            <TableCell>{item.requestdate}</TableCell>
            <TableCell>1</TableCell>
            <TableCell>1</TableCell>
            {/* <TableCell className="">
              <Dialog open={dialog} onOpenChange={setDialog}>
                  <DialogTrigger>
                    <button className=' p-2 rounded-sm bg-primary'><Eye size={20}/></button>
                  </DialogTrigger>
                  <DialogContent className=' bg-secondary border-none text-zinc-100 grid grid-cols-1 lg:grid-cols-[250px,1fr]'>
                    <div className=' bg-blue-400 lg:block hidden'
                    style={{backgroundImage: `url('/bg2.png')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat:"no-repeat"}}
                    
                    >
                      <p className=' p-2 uppercase text-lg font-semibold mt-8 bg-gradient-to-r from-zinc-950 to-zinc-950/10'>Wellness Day Request</p>
                    </div>

                    <div className=' flex flex-col gap-2 p-4'>
                      <DialogHeader>
                      <DialogDescription>
                      </DialogDescription>
                      </DialogHeader>
                    <div className=' flex flex-col '>
                      <h2 className=' uppercase font-semibold text-sm'>Details</h2>
                      <div className=' flex flex-col gap-2 mt-4 text-lg'>
                        <p className=' text-zinc-400'>Request by: <span className=' text-zinc-100'>Test Test</span></p>
                        <p className=' text-zinc-400'>Start date: <span className=' text-zinc-100'>00/00/00</span></p>
                        <p className=' text-zinc-400'>End date: <span className=' text-zinc-100'>00/00/00</span></p>
                      </div>

                    </div>
                    
                      <div className=' w-full flex items-end justify-end gap-2 mt-8'>
                        <ButtonSecondary onClick={() => setDialog(false)}  name={'Close'}/>
                        <ButtonDanger onClick={() => setDialog(false)} name='Deny'/>
                        <Button onClick={() => setDialog(false)} name={'Approve'}/>
                      </div>

                    </div>
                    
                  </DialogContent>
                </Dialog>
            </TableCell> */}

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
