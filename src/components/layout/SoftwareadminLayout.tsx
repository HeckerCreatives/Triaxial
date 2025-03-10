"use client"
import React, { useState } from 'react'
import Link from "next/link"
import {
  CircleUser,
  Home,
  Users,FolderKanban,Component,User,ListCheck, ListTodo, Menu, Calendar,
  CalendarCheck,
  List,
  Box
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
import { usePathname, useSearchParams } from 'next/navigation'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ToastSuccess, ToastError } from '../common/Toast'
import { motion } from 'framer-motion'


export default function SoftwareadminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const path = usePathname()
  const params = useSearchParams()
  const getTeam = params.get('team')

  const [nav, setNav] = useState(true)

  const toggleNav = () => {
    setNav(!nav)
  }

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
            <div className="flex-1 mt-4 overflow-y-auto">
              <nav className="grid items-start px-2 text-sm font-medium lg:px-4">

                <Link
                  href="/softwareadmin/dashboard"
                  className={` ${path === '/softwareadmin/dashboard' ? ' text-red-700' : 'text-zinc-100'} text-muted-foreground text-sm flex items-center gap-3 rounded-lg px-3  py-2 transition-all hover:text-red-700`}
                >
                  <Home className="h-4 w-4" />
                  Dashboard
                </Link>

            
                 <Link
                  href="/softwareadmin/yourworkload"
                  className={` ${path === '/softwareadmin/yourworkload' ? ' text-red-700' : 'text-zinc-100'} text-muted-foreground text-sm flex items-center gap-3 rounded-lg px-3  py-2 transition-all hover:text-red-700`}
                >
                  <List className="h-4 w-4" />
                  Your Workload
                </Link>

              


                <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <div className={` px-3 flex items-center w-full gap-2 hover:text-red-700 ${path.includes('/softwareadmin/user') ? ' text-red-700' : 'text-zinc-100'}`}>
                    <User className="h-4 w-4" />
                    <AccordionTrigger className=' w-[200px] text-sm'>Manage User</AccordionTrigger>
                  </div>
                  
                  <AccordionContent className=' pl-8'>
                     <Link
                      href="/softwareadmin/user/employee"
                      className={` ${path === '/softwareadmin/user/employee' ? ' text-red-700' : 'text-zinc-100'} text-muted-foreground text-sm flex items-center gap-3 rounded-lg px-3  py-2 transition-all hover:text-red-700`}
                    >
                      
                      Employees
                    </Link>

                    <Link
                      href="/softwareadmin/user/pm"
                      className={` ${path === '/softwareadmin/user/pm' ? ' text-red-700' : 'text-zinc-100'} text-muted-foreground text-sm flex items-center gap-3 rounded-lg px-3  py-2 transition-all hover:text-red-700`}
                    >
                      
                      Project Managers
                    </Link>

                   
                  </AccordionContent>
                </AccordionItem>
                </Accordion>

                <Link
                  href="/softwareadmin/wip"
                  className={` ${path === '/softwareadmin/wip' ? ' text-red-700' : 'text-zinc-100'} text-muted-foreground text-sm flex items-center gap-3 rounded-lg px-3  py-2 transition-all hover:text-red-700`}
                >
                  <ListTodo className="h-4 w-4" />
                  WIP
                </Link>

                <Link
                  href="/softwareadmin/schedule"
                  className={` ${path === '/softwareadmin/schedule' ? ' text-red-700' : 'text-zinc-100'} text-muted-foreground text-sm flex items-center gap-3 rounded-lg px-3  py-2 transition-all hover:text-red-700`}
                >
                  <Calendar className="h-4 w-4" />
                  Schedule
                </Link>

                <Link
                  href="/softwareadmin/events"
                  className={` ${path === '/softwareadmin/events' ? ' text-red-700' : 'text-zinc-100'} text-muted-foreground text-sm flex items-center gap-3 rounded-lg px-3  py-2 transition-all hover:text-red-700`}
                >
                  <CalendarCheck className="h-4 w-4" />
                  Events
                </Link>
               
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
                  href="/softwareadmin/user"
                  className={` ${path === '/softwareadmin/user' ? ' text-red-700' : 'text-zinc-100'} text-muted-foreground text-sm flex items-center gap-3 rounded-lg px-3  py-2 transition-all hover:text-red-700`}
                >
                  <Users className="h-4 w-4" />
                  User
                </Link>

                <Link
                  href="/softwareadmin/wip"
                  className={` ${path === '/softwareadmin/wip' ? ' text-red-700' : 'text-zinc-100'} text-muted-foreground text-sm flex items-center gap-3 rounded-lg px-3  py-2 transition-all hover:text-red-700`}
                >
                  <ListTodo className="h-4 w-4" />
                  WIP
                </Link>

                <Link
                  href="/softwareadmin/schedule"
                  className={` ${path === '/softwareadmin/schedule' ? ' text-red-700' : 'text-zinc-100'} text-muted-foreground text-sm flex items-center gap-3 rounded-lg px-3  py-2 transition-all hover:text-red-700`}
                >
                  <Calendar className="h-4 w-4" />
                  Schedule
                </Link>

                <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <div className={` px-3 flex items-center w-full gap-2 hover:text-red-700 ${path.includes('/superadmin/manageuser') ? ' text-red-700' : 'text-zinc-100'}`}>
                    <User className="h-4 w-4" />
                    <AccordionTrigger className=' w-[200px] text-sm uppercase'>Manage User</AccordionTrigger>
                  </div>
                  
                  <AccordionContent className=' pl-8'>
                     <Link
                      href="/superadmin/manageuser/employee"
                      className={` ${path === '/superadmin/manageuser/employee' ? ' text-red-700' : 'text-zinc-100'} uppercase text-muted-foreground text-sm flex items-center gap-3 rounded-lg px-3  py-2 transition-all hover:text-red-700`}
                    >
                      
                      Employee
                    </Link>

                    <Link
                      href="/superadmin/manageuser/pm"
                      className={` ${path === '/superadmin/manageuser/pm' ? ' text-red-700' : 'text-zinc-100'} uppercase text-muted-foreground text-sm flex items-center gap-3 rounded-lg px-3  py-2 transition-all hover:text-red-700`}
                    >
                      
                      Project Manager
                    </Link>

                    <Link
                      href="/superadmin/manageuser/hr"
                      className={` ${path === '/superadmin/manageuser/hr' ? ' text-red-700' : 'text-zinc-100'} uppercase text-muted-foreground text-sm flex items-center gap-3 rounded-lg px-3  py-2 transition-all hover:text-red-700`}
                    >
                      
                      Human Resources
                    </Link>

                    <Link
                      href="/superadmin/manageuser/finance"
                      className={` ${path === '/superadmin/manageuser/finance' ? ' text-red-700' : 'text-zinc-100'} uppercase text-muted-foreground text-sm flex items-center gap-3 rounded-lg px-3  py-2 transition-all hover:text-red-700`}
                    >
                      
                      Finance Staff
                    </Link>
                   
                  </AccordionContent>
                </AccordionItem>
                </Accordion>

                <Accordion type="single" collapsible>
                <AccordionItem value="item-1" className=' w-full'>
                  <div className={` ${path.includes('/superadmin/request') ? ' text-red-700' : 'text-zinc-100'} px-3 flex items-center w-full gap-2 hover:text-red-700`}>
                    <ListCheck className="h-4 w-4" />
                    <AccordionTrigger className=' w-[200px] text-sm uppercase'>Request</AccordionTrigger>
                  </div>
                  
                  <AccordionContent className=' pl-8'>
                     <Link
                      href="/superadmin/request/wellnessday"
                      className={` ${path === '/superadmin/request/wellnessday' ? ' text-red-700' : 'text-zinc-100'} uppercase text-muted-foreground text-sm flex items-center gap-3 rounded-lg px-3  py-2 transition-all hover:text-red-700`}
                    >
                      
                      Wellness Day
                    </Link>

                    <Link
                      href="/superadmin/request/sickleave"
                      className={` ${path === '/superadmin/request/sickleave' ? ' text-red-700' : 'text-zinc-100'} uppercase text-muted-foreground text-sm flex items-center gap-3 rounded-lg px-3  py-2 transition-all hover:text-red-700`}
                    >
                      
                      Sick Leave
                    </Link>

                    <Link
                      href="/superadmin/request/wfh"
                      className={` ${path === '/superadmin/request/wfh' ? ' text-red-700' : 'text-zinc-100'} uppercase text-muted-foreground text-sm flex items-center gap-3 rounded-lg px-3  py-2 transition-all hover:text-red-700`}
                    >
                      
                      Work From Home
                    </Link>

                    <Link
                      href="/superadmin/request/invoice"
                      className={` ${path === '/superadmin/request/invoice' ? ' text-red-700' : 'text-zinc-100'} uppercase text-muted-foreground text-sm flex items-center gap-3 rounded-lg px-3  py-2 transition-all hover:text-red-700`}
                    >
                      
                      Invoice
                    </Link>

                    <Link
                      href="/superadmin/request/emails"
                      className={` ${path === '/superadmin/request/emails' ? ' text-red-700' : 'text-zinc-100'} uppercase text-muted-foreground text-sm flex items-center gap-3 rounded-lg px-3  py-2 transition-all hover:text-red-700`}
                    >
                      Emails
                      <Badge className=' rounded-none bg-neutral'>99</Badge>
                    </Link>

                    <Link
                      href="/superadmin/request/events"
                      className={` ${path === '/superadmin/request/events' ? ' text-red-700' : 'text-zinc-100'} uppercase text-muted-foreground text-sm flex items-center gap-3 rounded-lg px-3  py-2 transition-all hover:text-red-700`}
                    >
                      
                      Events
                    </Link>
                   
                  </AccordionContent>
                </AccordionItem>
                </Accordion>
                 
                </nav>
               
              </SheetContent>
            </Sheet>

            
            {!nav ? (
            <Menu className="h-5 w-5 text-zinc-100 lg:block hidden" onClick={toggleNav} />
            ): (
            <Menu className="h-5 w-5 text-zinc-100 lg:block hidden" onClick={toggleNav} />

            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild className=' hover:bg-zinc-100'>
                <Button variant="secondary" size="icon" className="rounded-full bg-zinc-100">
                  <CircleUser className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Software Admin</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => ToastSuccess('Loging out...')}><a href="/">Logout</a></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>
          <main className=" relative flex flex-1 flex-col items-center gap-4 ">
              {children}
          </main>
        </div>
      </div>
  )
}
