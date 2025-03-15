"use client"
import React, { useEffect, useState } from 'react'
import Link from "next/link"
import {
  Bell,
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,FolderKanban,Component,User,ListCheck,
  List,
  UserRoundPlus,
  Box,
  Mail,
  CalendarCheck,
  ListChecks
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import axios from 'axios'
import toast from 'react-hot-toast'
import { superadmin } from '@/types/routes'
import Authcheck from '@/utils/Authcheck'
import refreshStore from '@/zustand/refresh'

type Data = {
  contactno: string
firstname: string
id: string
initial: string
lastname: string
}

export default function SuperadminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const path = usePathname()
  const params = useSearchParams()
  const getTeam = params.get('team')
  const [menu, setMenu] = useState(false)
  const router = useRouter()
  const [data, setData] = useState<Data>()
  const [unread, setUnread] = useState(0)
  const {refresh} = refreshStore()

  

   const toggleMenu = () => {
    setMenu(!menu);
  };

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
        animate={menu ?  { opacity: 0, width: 0 } : { opacity: 1, width: "300px" }}      
        exit={{ opacity: 0, width: 0 }}           
        transition={{ duration: .3 }}  
        className={`hidden md:block w-[280px]`}>
          <div className="flex h-full max-h-screen flex-col gap-2 bg-primary border-r-2 border-zinc-700">
             <div className=' flex items-center gap-2 text-white p-4'>
                  <img src="/logo.webp" alt="" width={50} />
                  <div className=' flex flex-col'>
                      <h2 className=' text-lg font-bold uppercase tracking-widest'>Triaxial</h2>
                      <h2 className=' text-sm font-bold uppercase'>Consulting</h2>
                  </div>
              </div>
            <div className="flex-1 mt-4 overflow-y-auto">
              <nav className=" flex flex-col px-2 text-sm font-medium lg:px-4">
                {superadmin.map((item, index) => (
                 <>
                 {item.subpath.length === 0 ? (
                   <Link
                   key={index}
                     href={item.path}
                     className={` group ${(path.includes(item.path) && path !== '/superadmin/noaccess/') ? ' text-red-700' : 'text-zinc-100'}  text-sm flex items-center gap-3 rounded-lg px-3  py-2 transition-all hover:text-red-700`}
                   >
                     {item.icon}
                     {item.name}
                     {(item.path.includes('superadmin/messages') && unread !== 0) && (
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
                       <div className={` px-3 flex items-center w-full gap-2 hover:text-red-700 ${(path.includes(item.path) && path !== '/superadmin/noaccess/') ? ' text-red-700' : 'text-zinc-100'}`}>
                         {item.icon}
                         <AccordionTrigger className=' w-[200px] text-sm'>{item.name}</AccordionTrigger>
                       </div>
                       
                       <AccordionContent className=' pl-8'>
                         {item.subpath.map((item, index) => (
                          <>
                          {item.subpath.length === 0 ? (
                             <Link
                             key={index}
                             href={item.path}
                             className={` group ${(path.includes(item.path) && path !== '/superadmin/noaccess/') ? ' text-red-700' : 'text-zinc-100'} text-muted-foreground text-sm flex items-center gap-3 rounded-lg px-3  py-2 transition-all hover:text-red-700`}
                           >
                             
                            {item.name}

                            {item.path.includes('noaccess') && (
                              <p className=' text-[.5rem] px-2 py-1 h-4 bg-red-600 flex items-center justify-center rounded-full group-hover:text-white'>Forbidden</p>
                              )}
                           </Link>
                          ): (
                            <Accordion type="single" collapsible>
                            <AccordionItem value="item-1">
                              <div className={` px-3 flex items-center w-full gap-2 ${path.includes(item.path) ? ' text-zinc-100' : 'text-zinc-100'}`}>
                                <AccordionTrigger className=' w-[200px] text-sm'>{item.name}</AccordionTrigger>
                              </div>
                              
                              <AccordionContent className=' pl-8'>
                                {/* {item.subpath.map((item, index) => (
                                  <>
                                
                                    <Link
                                    key={index}
                                    href={item.path}
                                    className={` group ${(path.includes(item.path) && path !== '/superadmin/noaccess/') ? ' text-red-700' : 'text-zinc-100'} text-muted-foreground text-sm flex items-center gap-3 rounded-lg px-3  py-2 transition-all hover:text-red-700`}
                                  >
                                    
                                    {item.name}

                                    {item.path.includes('noaccess') && (
                                    <p className=' text-[.5rem] px-2 py-1 h-4 bg-red-600 flex items-center justify-center rounded-full group-hover:text-white'>Forbidden</p>
                                    )}
                                  </Link>
                           
                                  </>
                                  
                                ))} */}
                                
                              </AccordionContent>
                            </AccordionItem>
                            </Accordion>
                          )}
                          
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
    
        
        <div className=" w-screen relative h-screen flex flex-col overflow-y-auto">
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
                {superadmin.map((item, index) => (
                  <>
                  {item.subpath.length === 0 ? (
                    <Link
                      href={item.path}
                      className={` ${path.includes(item.path) ? ' text-red-700' : 'text-zinc-100'}  text-sm flex items-center gap-3 rounded-lg px-3  py-2 transition-all hover:text-red-700`}
                    >
                      {item.icon}
                      {item.name}
                    </Link>
                  ) : (
                    <Accordion type="single" collapsible>
                      <AccordionItem value="item-1">
                        <div className={` px-3 flex items-center w-full gap-2 hover:text-red-700 ${path.includes(item.path) ? ' text-red-700' : 'text-zinc-100'}`}>
                          {item.icon}
                          <AccordionTrigger className=' w-[200px] text-sm'>{item.name}</AccordionTrigger>
                        </div>
                        
                        <AccordionContent className=' pl-8'>
                          {item.subpath.map((item, index) => (
                             <Link
                             key={index}
                             href={item.path}
                             className={` ${path.includes(item.path) ? ' text-red-700' : 'text-zinc-100'} text-muted-foreground text-sm flex items-center gap-3 rounded-lg px-3  py-2 transition-all hover:text-red-700`}
                           >
                             
                            {item.name}
                           </Link>
                          ))}
                         
                        </AccordionContent>
                      </AccordionItem>
                      </Accordion>
                  )}
                  
                  </>
                ))}
                 
                </nav>
               
              </SheetContent>
            </Sheet>
            {menu === false ? (
            <Menu className="h-5 w-5 text-zinc-100 lg:block hidden" onClick={toggleMenu} />
            ): (
            <Menu className="h-5 w-5 text-zinc-100 lg:block hidden" onClick={toggleMenu} />

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
                <DropdownMenuLabel>Superadmin</DropdownMenuLabel>
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
