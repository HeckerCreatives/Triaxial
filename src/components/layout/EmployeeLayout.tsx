"use client"
import React, { useEffect, useState } from 'react'
import Link from "next/link"
import {
  CircleUser,
  Home,
  Menu,ArrowRightLeft, Mail, List, LayoutList, Calendar, Box, Users,
  CalendarCheck,
  UsersRound
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { usePathname, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import axios from 'axios'
import toast from 'react-hot-toast'
import { employee } from '@/types/routes'
import Authcheck from '@/utils/Authcheck'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import refreshStore from '@/zustand/refresh'


type Data = {
  contactno: string
  firstname: string
  id: string
  initial: string
  lastname: string
}

export default function EmployeeLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const router = useRouter()
  const [data, setData] = useState<Data>()
  const {refresh} = refreshStore()
  const [unread, setUnread] = useState(0)
  


  const path = usePathname()
    const [nav, setNav] = useState(true)

  const toggleNav = () => {
    setNav(!nav)
  }

  const logout = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,{
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
          }
      })

      if(response.data.message === 'success'){
        toast.success(`Logging out...`)
        router.push('/') 
      }
    } catch (error) {
      
    }
  }

  //auth checker
  Authcheck()

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/getuserdetails`,
        {withCredentials: true}
      )

      setData(response.data.data)
    }
    getData()
  },[])


    //get unread messages
    useEffect(() => {
      const getData = async () => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/email/unreademail`,
          {withCredentials: true}
        )
  
        setUnread(response.data.unreademails)
      }
      getData()
    },[refresh])

  return (
      <div className="flex min-h-screen w-full overflow-hidden">
        <motion.div 
        initial={{ opacity: 1, width: '280px' }}          
        animate={nav ?  { opacity: 1, width: "280px" } : { opacity: 0, width: 0 } }      
        exit={{ opacity: 0, width: 0 }}           
        transition={{ duration: .3 }} 
        className=" hidden md:block">
          <div className="flex h-full max-h-screen flex-col gap-2 bg-primary border-r-2 border-zinc-700">
             <div className=' flex items-center gap-2 text-white p-4'>
                  <img src="/logo.webp" alt="" width={50} />
                  <div className=' flex flex-col'>
                      <h2 className=' text-lg font-bold uppercase tracking-widest'>Triaxial</h2>
                      <h2 className=' text-sm font-bold uppercase'>Consulting</h2>
                  </div>
              </div>
            <div className="flex-1 mt-4">
              <nav className="grid items-start px-2 text-sm font-medium lg:px-4">

                {employee.map((item, index) => (
                  <>
                  {item.subpath.length === 0 ? (
                    <Link
                    key={index}
                      href={item.path}
                      className={` group ${(path.includes(item.path) && path !== '/employee/noaccess/') ? ' text-red-700' : 'text-zinc-100'}  text-sm flex items-center gap-3 rounded-lg px-3  py-2 transition-all hover:text-red-700`}
                    >
                      {item.icon}
                      {item.name}
                      {(item.path.includes('/employee/messages') && unread !== 0) && (
                        <div className=' w-4 h-4 bg-red-600 rounded-full -translate-y-1 flex items-center justify-center'>
                          <p className=' text-[.7rem] text-white'>{unread}</p>

                        </div>
                       )}
                      {item.path.includes('noaccess') && (
                      <p className=' text-[.5rem] px-2 py-1 h-4 bg-red-600 flex items-center justify-center rounded-full group-hover:text-white'>Forbidden</p>
                      )}
                    </Link>
                  ) : (
                    <Accordion type="single" collapsible>
                      <AccordionItem value="item-1">
                        <div className={` px-3 flex items-center w-full gap-2 hover:text-red-700 ${(path.includes(item.path) && path !== '/employee/noaccess/') ? ' text-red-700' : 'text-zinc-100'}`}>
                          {item.icon}
                          <AccordionTrigger className=' w-[200px] text-sm'>{item.name}</AccordionTrigger>
                        </div>
                        
                        <AccordionContent className=' pl-8'>
                          {item.subpath.map((item, index) => (
                           <>
                          
                           
                           </>
                            
                          ))}
                         
                        </AccordionContent>
                      </AccordionItem>
                      </Accordion>
                  )}
                  
                  </>
                ))}
                  

                  

                
              
              </nav>
            </div>
           
          </div>
        </motion.div>
        <div className=" w-full relative h-screen flex flex-col overflow-y-auto">
          <header className=" sticky top-0 z-50 flex h-14 items-center justify-between gap-4 bg-secondary p-4 lg:h-[60px] lg:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  size="icon"
                  className="shrink-0 md:hidden bg-zinc-800"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col bg-primary border-none">
                <div className=' flex items-center gap-2 text-white p-4'>
                  <img src="/logo.webp" alt="" width={50} />
                  <div className=' flex flex-col'>
                      <h2 className=' text-lg font-bold uppercase tracking-widest'>Triaxial</h2>
                      <h2 className=' text-sm font-bold uppercase'>Consulting</h2>
                  </div>
                </div>
                <nav className="grid gap-2 text-lg font-medium">
                  <Link
                  href="/employee/dashboard"
                  className={` ${path === '/employee/dashboard' ? ' text-red-700' : 'text-zinc-100'}  text-sm flex items-center gap-3 rounded-lg px-3  py-2 transition-all hover:text-red-700`}
                >
                  <Home className="h-4 w-4" />
                  Dashboard
                  </Link>

                   <Link
                    href="/employee/view"
                    className={` ${path === '/employee/view' ? ' text-red-700' : 'text-zinc-100'}  text-sm flex items-center gap-3 rounded-lg px-3  py-2 transition-all hover:text-red-700`}
                  >
                    <Calendar className="h-4 w-4" />
                    Workload
                  </Link>

                  <Link
                    href="/employee/schedule"
                    className={` ${path === '/employee/schedule' ? ' text-red-700' : 'text-zinc-100'}  text-sm flex items-center gap-3 rounded-lg px-3  py-2 transition-all hover:text-red-700`}
                  >
                    <Calendar className="h-4 w-4" />
                    Schedules
                  </Link>

                   <Link
                    href="/employee/projectmasterlist"
                    className={` ${path === '/employee/projectmasterlist' ? ' text-red-700' : 'text-zinc-100'}  text-sm flex items-center gap-3 rounded-lg px-3  py-2 transition-all hover:text-red-700`}
                  >
                    <Box className="h-4 w-4" />
                    Project Master List
                  </Link>

                   <Link
                    href="/employee/memberlist"
                    className={` ${path === '/employee/memberlist' ? ' text-red-700' : 'text-zinc-100'}  text-sm flex items-center gap-3 rounded-lg px-3  py-2 transition-all hover:text-red-700`}
                  >
                  <Users className="h-4 w-4" />
                    Member List
                  </Link>

                  <Link
                    href="/employee/request"
                    className={` ${path === '/employee/request' ? ' text-red-700' : 'text-zinc-100'}  text-sm flex items-center gap-3 rounded-lg px-3  py-2 transition-all hover:text-red-700`}
                  >
                    <ArrowRightLeft className="h-4 w-4" />
                    Request
                  </Link>


                  <Link
                    href="/employee/mail"
                    className={` ${path === '/employee/mail' ? ' text-red-700' : 'text-zinc-100'}  text-sm flex items-center gap-3 rounded-lg px-3  py-2 transition-all hover:text-red-700`}
                  >
                    <Mail className="h-4 w-4" />
                    Mail
                  </Link>

                </nav>
               
              </SheetContent>
            </Sheet>

            {!nav ? (
            <Menu className="h-5 w-5 text-zinc-100 lg:block hidden" onClick={toggleNav} />
            ): (
            <Menu className="h-5 w-5 text-zinc-100 lg:block hidden" onClick={toggleNav} />

            )}
            <div className=' flex items-center gap-2'>
                                                              <p className=' text-white text-xs'>{data?.firstname} {data?.lastname}</p>
                                                            <DropdownMenu>
                                                              <DropdownMenuTrigger asChild className=' hover:bg-zinc-100'>
                                                                <Button variant="secondary" size="icon" className="rounded-full bg-zinc-100">
                                                                  <CircleUser className="h-5 w-5" />
                                                                </Button>
                                                              </DropdownMenuTrigger>
                                                              <DropdownMenuContent align="end">
                                                                <DropdownMenuLabel>Employee</DropdownMenuLabel>
                                                                <DropdownMenuSeparator />
                                                                <DropdownMenuItem onClick={logout}><a href="/">Logout</a></DropdownMenuItem>
                                                              </DropdownMenuContent>
                                                            </DropdownMenu>
                                                            </div>
          </header>
          <main className=" relative flex flex-1 flex-col items-center gap-4 ">
              {children}
          </main>
        </div>
      </div>
  )
}
