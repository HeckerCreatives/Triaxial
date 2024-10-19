"use client"
import React, { use, useState } from 'react'
import Link from "next/link"
import {
  CircleUser,
  Home,
  Menu,ArrowRightLeft, Mail, List, FileArchive, Users, Component, Calendar,
  CalendarCheck,
  User,
  UsersRound,
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
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ToastSuccess } from '../common/Toast'
import { ProjectsPm, ProjectsSection } from '@/types/data'
import { motion } from 'framer-motion'
import axios from 'axios'
import toast from 'react-hot-toast'


export default function PmLayout({
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
                  href="/pm/dashboard"
                  className={` ${path === '/pm/dashboard' ? ' text-red-700' : 'text-zinc-100'}  text-sm flex items-center gap-3 rounded-lg px-3  py-2 transition-all hover:text-red-700`}
                >
                  <Home className="h-4 w-4" />
                  Dashboard
                </Link>

                <Link
                  href="/pm/yourworkload"
                  className={` ${path === '/pm/yourworkload' ? ' text-red-700' : 'text-zinc-100'} text-muted-foreground text-sm flex items-center gap-3 rounded-lg px-3  py-2 transition-all hover:text-red-700`}
                >
                  <List className="h-4 w-4" />
                  Your Workload
                </Link>

                {/* <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <div className={` px-3 flex items-center w-full gap-2 hover:text-red-700 ${path.includes('/pm/project') ? ' text-red-700' : 'text-zinc-100'}`}>
                    <Box className="h-4 w-4" />
                    <AccordionTrigger className=' w-[200px] text-sm'>Projects</AccordionTrigger>
                  </div>
                  
                  <AccordionContent className=' pl-8'>
                    {ProjectsPm.map((item, index) => (
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

                <Link
                  href="/pm/teams"
                  className={` ${path === '/pm/teams' ? ' text-red-700' : 'text-zinc-100'} text-muted-foreground text-sm flex items-center gap-3 rounded-lg px-3  py-2 transition-all hover:text-red-700`}
                >
                  <Users className="h-4 w-4" />
                  Teams
                </Link>


                <Link
                  href="/pm/event"
                  className={` ${path === '/pm/event' ? ' text-red-700' : 'text-zinc-100'}  text-sm flex items-center gap-3 rounded-lg px-3  py-2 transition-all hover:text-red-700`}
                >
                  <CalendarCheck className="h-4 w-4" />
                  Events
                </Link>


                <Link
                  href="/pm/request"
                  className={` ${path === '/pm/request' ? ' text-red-700' : 'text-zinc-100'}  text-sm flex items-center gap-3 rounded-lg px-3  py-2 transition-all hover:text-red-700`}
                >
                  <ArrowRightLeft className="h-4 w-4" />
                  Request
                </Link>

                <Link
                  href="/pm/mail"
                  className={` ${path === '/pm/mail' ? ' text-red-700' : 'text-zinc-100'}  text-sm flex items-center gap-3 rounded-lg px-3  py-2 transition-all hover:text-red-700`}
                >
                  <Mail className="h-4 w-4" />
                  Mail
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
                  href="/pm/dashboard"
                  className={` ${path === '/pm/dashboard' ? ' text-red-700' : 'text-zinc-100'}  text-sm flex items-center gap-3 rounded-lg px-3  py-2 transition-all hover:text-red-700`}
                >
                  <Home className="h-4 w-4" />
                  Dashboard
                </Link>

                <Link
                  href="/pm/projectcomponent"
                  className={` ${path === '/pm/projectcomponent' ? ' text-red-700' : 'text-zinc-100'}  text-sm flex items-center gap-3 rounded-lg px-3  py-2 transition-all hover:text-red-700`}
                >
                  <Component className="h-4 w-4" />
                  Project Components
                </Link>

                 <Link
                  href="/pm/schedule"
                  className={` ${path === '/pm/schedule' ? ' text-red-700' : 'text-zinc-100'}  text-sm flex items-center gap-3 rounded-lg px-3  py-2 transition-all hover:text-red-700`}
                >
                  <Calendar className="h-4 w-4" />
                  Schedules
                </Link>


                <Link
                  href="/pm/project"
                  className={` ${path === '/pm/project' ? ' text-red-700' : 'text-zinc-100'}  text-sm flex items-center gap-3 rounded-lg px-3  py-2 transition-all hover:text-red-700`}
                >
                  <FileArchive className="h-4 w-4" />
                  Project Master List
                </Link>

                 {/* <Link
                  href="/pm/invoice"
                  className={` ${path === '/pm/invoice' ? ' text-red-700' : 'text-zinc-100'} uppercase  text-sm flex items-center gap-3 rounded-lg px-3  py-2 transition-all hover:text-red-700`}
                >
                  <List className="h-4 w-4" />
                  Invoice
                </Link> */}

                <Link
                  href="/pm/team"
                  className={` ${path === '/pm/team' ? ' text-red-700' : 'text-zinc-100'}  text-sm flex items-center gap-3 rounded-lg px-3  py-2 transition-all hover:text-red-700`}
                >
                  <Users className="h-4 w-4" />
                  Member List
                </Link>

                <Link
                  href="/pm/request"
                  className={` ${path === '/pm/request' ? ' text-red-700' : 'text-zinc-100'}  text-sm flex items-center gap-3 rounded-lg px-3  py-2 transition-all hover:text-red-700`}
                >
                  <ArrowRightLeft className="h-4 w-4" />
                  Request
                </Link>

                <Link
                  href="/pm/mail"
                  className={` ${path === '/pm/mail' ? ' text-red-700' : 'text-zinc-100'}  text-sm flex items-center gap-3 rounded-lg px-3  py-2 transition-all hover:text-red-700`}
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
              <DropdownMenuTrigger asChild className=' hover:bg-zinc-100'>
                <Button variant="secondary" size="icon" className="rounded-full bg-zinc-100">
                  <CircleUser className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Project Manager</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <a href="/">
                 <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                </a>
               
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
