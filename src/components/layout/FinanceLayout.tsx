"use client"
import React, { useState } from 'react'
import Link from "next/link"
import {
  CircleUser,
  Home,
  Menu, ArrowRightLeft, Mail,
  List,
  Calendar,
  ListCheck, Box,
  User,
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
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ToastSuccess } from '../common/Toast'
import { ProjectsFinance } from '@/types/data'
import { motion } from 'framer-motion'
import axios from 'axios'
import toast from 'react-hot-toast'


export default function FinaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const path = usePathname()
  const params = useSearchParams()
  const getTeam = params.get('team')
  const [nav, setNav] = useState(true)
  const router = useRouter()


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

  console.log(path)
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
                  href="/finance/dashboard"
                  className={` ${path === '/finance/dashboard' ? ' text-red-700' : 'text-zinc-100'}  text-sm flex items-center gap-3 rounded-lg px-3  py-2 transition-all hover:text-red-700`}
                >
                  <Home className="h-4 w-4" />
                  Dashboard
                </Link>

                <Link
                  href="/finance/yourworkload"
                  className={` ${path === '/finance/yourworkload' ? ' text-red-700' : 'text-zinc-100'} text-muted-foreground text-sm flex items-center gap-3 rounded-lg px-3  py-2 transition-all hover:text-red-700`}
                >
                  <List className="h-4 w-4" />
                  Your Workload
                </Link>

                 {/* <Link
                    href="/finance/schedule"
                    className={` ${path === '/finance/schedule' ? ' text-red-700' : 'text-zinc-100'}  text-sm flex items-center gap-3 rounded-lg px-3  py-2 transition-all hover:text-red-700`}
                    >
                    <Calendar className="h-4 w-4" />
                    Schedule
                  </Link> */}

                 {/* <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <div className={` px-3 flex items-center w-full gap-2 hover:text-red-700 ${path.includes('/finance/project') ? ' text-red-700' : 'text-zinc-100'}`}>
                    <Box className="h-4 w-4" />
                    <AccordionTrigger className=' w-[200px] text-sm'>Projects</AccordionTrigger>
                  </div>
                  
                  <AccordionContent className=' pl-8'>
                    {ProjectsFinance.map((item, index) => (
                      <Link
                      key={index}
                      href={`${item.route}?team=${item.name}`}
                      className={` ${getTeam === item.name ? ' text-red-700' : 'text-zinc-100'} text-muted-foreground text-sm flex items-center gap-3 rounded-lg px-3  py-2 transition-all hover:text-red-700`}
                    >
                      
                      {item.name}
                    </Link>
                    ))}
                     

                   
                   
                  </AccordionContent>
                </AccordionItem>
                </Accordion> */}

                {/* <Link
                    href="/finance/team"
                    className={` ${path === '/finance/team' ? ' text-red-700' : 'text-zinc-100'}  text-sm flex items-center gap-3 rounded-lg px-3  py-2 transition-all hover:text-red-700`}
                    >
                    <UsersRound className="h-4 w-4" />
                    Team
                </Link> */}

                 {/* <Link
                    href="/finance/wip"
                    className={` ${path === '/finance/wip' ? ' text-red-700' : 'text-zinc-100'}  text-sm flex items-center gap-3 rounded-lg px-3  py-2 transition-all hover:text-red-700`}
                    >
                    <ListCheck className="h-4 w-4" />
                    Wip
                </Link> */}

                 {/* <Link
                  href="/finance/invoice"
                  className={` ${path === '/finance/invoice' ? ' text-red-700' : 'text-zinc-100'}  text-sm flex items-center gap-3 rounded-lg px-3  py-2 transition-all hover:text-red-700`}
                >
                  <List className="h-4 w-4" />
                  Invoice
                </Link> */}

                {/* <Link
                  href="/finance/event"
                  className={` ${path === '/finance/event' ? ' text-red-700' : 'text-zinc-100'}  text-sm flex items-center gap-3 rounded-lg px-3  py-2 transition-all hover:text-red-700`}
                >
                  <CalendarCheck className="h-4 w-4" />
                  Events
                </Link> */}

                 {/* <Link
                  href="/finance/memberlist"
                  className={` ${path === '/finance/memberlist' ? ' text-red-700' : 'text-zinc-100'}  text-sm flex items-center gap-3 rounded-lg px-3  py-2 transition-all hover:text-red-700`}
                >
                  <User className="h-4 w-4" />
                  Member List
                </Link> */}

                 <Link
                  href="/finance/request"
                  className={` ${path === '/finance/request' ? ' text-red-700' : 'text-zinc-100'}  text-sm flex items-center gap-3 rounded-lg px-3  py-2 transition-all hover:text-red-700`}
                >
                  <ArrowRightLeft className="h-4 w-4" />
                  Request
                </Link>

                <Link
                  href="/finance/mail"
                  className={` ${path === '/finance/mail' ? ' text-red-700' : 'text-zinc-100'}  text-sm flex items-center gap-3 rounded-lg px-3  py-2 transition-all hover:text-red-700`}
                >
                  <Mail className="h-4 w-4" />
                  Messages
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
                  href="/finance/dashboard"
                  className={` ${path === '/finance/dashboard' ? ' text-red-700' : 'text-zinc-100'}  text-sm flex items-center gap-3 rounded-lg px-3  py-2 transition-all hover:text-red-700`}
                >
                  <Home className="h-4 w-4" />
                  Dashboard
                </Link>

                 <Link
                    href="/finance/schedule"
                    className={` ${path === '/finance/schedule' ? ' text-red-700' : 'text-zinc-100'}  text-sm flex items-center gap-3 rounded-lg px-3  py-2 transition-all hover:text-red-700`}
                    >
                    <Calendar className="h-4 w-4" />
                    Schedule
                  </Link>

                <Link
                    href="/finance/projectmasterlist"
                    className={` ${path === '/finance/projectmasterlist' ? ' text-red-700' : 'text-zinc-100'}  text-sm flex items-center gap-3 rounded-lg px-3  py-2 transition-all hover:text-red-700`}
                    >
                    <Box className="h-4 w-4" />
                    Project Master List
                </Link>

                 <Link
                    href="/finance/wip"
                    className={` ${path === '/finance/wip' ? ' text-red-700' : 'text-zinc-100'}  text-sm flex items-center gap-3 rounded-lg px-3  py-2 transition-all hover:text-red-700`}
                    >
                    <ListCheck className="h-4 w-4" />
                    Wip
                </Link>

                 <Link
                  href="/finance/invoice"
                  className={` ${path === '/finance/invoice' ? ' text-red-700' : 'text-zinc-100'}  text-sm flex items-center gap-3 rounded-lg px-3  py-2 transition-all hover:text-red-700`}
                >
                  <List className="h-4 w-4" />
                  Invoice
                </Link>

                <Link
                  href="/finance/event"
                  className={` ${path === '/finance/event' ? ' text-red-700' : 'text-zinc-100'}  text-sm flex items-center gap-3 rounded-lg px-3  py-2 transition-all hover:text-red-700`}
                >
                  <List className="h-4 w-4" />
                  Events
                </Link>

                 <Link
                  href="/finance/memberlist"
                  className={` ${path === '/finance/memberlist' ? ' text-red-700' : 'text-zinc-100'}  text-sm flex items-center gap-3 rounded-lg px-3  py-2 transition-all hover:text-red-700`}
                >
                  <User className="h-4 w-4" />
                  Member List
                </Link>

                 <Link
                  href="/finance/request"
                  className={` ${path === '/finance/request' ? ' text-red-700' : 'text-zinc-100'}  text-sm flex items-center gap-3 rounded-lg px-3  py-2 transition-all hover:text-red-700`}
                >
                  <ArrowRightLeft className="h-4 w-4" />
                  Request
                </Link>

                <Link
                  href="/finance/mail"
                  className={` ${path === '/finance/mail' ? ' text-red-700' : 'text-zinc-100'}  text-sm flex items-center gap-3 rounded-lg px-3  py-2 transition-all hover:text-red-700`}
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

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon" className="rounded-full bg-zinc-100">
                  <CircleUser className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Finance Staff</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}><a href="/">Logout</a></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>
          <main className=" relative flex flex-1 flex-col items-center gap-4">
              {children}
          </main>
        </div>
      </div>
  )
}
