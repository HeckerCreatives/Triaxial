"use client"
import React, { useEffect, useState } from 'react'
import { CalendarCheck, TrendingUp } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import axios from 'axios'
import { Events } from '@/types/types'
import Yourworkload from './Yourworkload'
import { formatDate, formatDateTime } from '@/utils/functions'
import Dashboardlegends from '@/components/common/Dashboardlegends'


export default function Bottomcards() {

  const date = '00/00/00'
  const [list, setList] = useState<Events[]>([])
  const [upcoming, setUpcoming] = useState<Events[]>([])


  //event list
  useEffect(() => {

    const timer = setTimeout(() => {
      const getList = async () => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/events/getevents`,{
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
            }
        })
  
        setList(response.data.data.current)
        setUpcoming(response.data.data.upcoming)
     
       
      }
      getList()
    }, 500)
    return () => clearTimeout(timer)
    
  },[])

  return (
    <div className=' relative w-full h-auto  flex flex-col gap-2 items-center bg-secondary justify-start'>
      <div className=' h-[74dvh] overflow-y-auto overflow-x-auto flex items-start justify-center bg-secondary w-full max-w-[1920px]'>

        <div className=' w-full'>
         <Yourworkload/>
        </div>
      </div>
       

         <div className=' bg-primary z-30 bottom-0 text-zinc-100 w-full grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-[1920px] p-2 h-auto '>
          <Dashboardlegends/>

          <Carousel
          opts={{loop: false, align: 'start'}}
          // plugins={[
          //    Autoplay({
          //    delay: 2000,
          //    }),]
          
          //   }
          >
          <CarouselContent className=' w-full h-fit'>

            {Object.values(list).map((item, index) => (
               <CarouselItem key={index} className="basis-1/2">
                <div className=' flex md:flex-row flex-col justify-between gap-6 w-full h-[90px] bg-secondary p-4 overflow-y-auto' >
                  <div className=' flex flex-col gap-2'>
                    <h2 className=' uppercase font-semibold text-[.6rem] text-red-700'>CURRENT EVENT!</h2>
                    <h2 className=' uppercase font-semibold text-[.6rem]'>{item.title}</h2>
                    <p className=' text-sm text-zinc-400'>{formatDate(item.start)} to {formatDate(item.end)}</p>
                    <p className=' text-zinc-300 text-xs'>Teams:</p>

                    <div className=' flex flex-wrap gap-2'>
                      {item.teams.map((item, index) => (
                        <p key={index} className=' p-2 text-xs bg-zinc-900 rounded-sm'>{item.teamname}</p>

                      ))}

                    </div>
                  </div>
    
                  <div className=' flex items-center justify-center'>
                    <div className=' w-full h-full p-6'>
                    <CalendarCheck size={30}/>
    
                    </div>
                  </div>
                  
                </div>
               </CarouselItem>
            ))}

            {Object.values(upcoming).map((item, index) => (
               <CarouselItem key={index} className="basis-1/2 ">
                <div className=' flex md:flex-row flex-col justify-between gap-6 w-full h-[90px] bg-secondary p-4 overflow-y-auto'>
                  <div className=' flex flex-col gap-0'>
                    <h2 className=' uppercase font-semibold text-[.7rem] text-red-700'>UPCOMING EVENT!</h2>
                    <h2 className=' uppercase font-semibold text-[.7rem]'>{item.title}</h2>
                    <p className=' text-[.6rem] text-zinc-400'>{formatDate(item.start)} to {formatDate(item.end)}</p>

                    <div className=' flex items-center gap-1'>
                      <p className=' text-zinc-300 text-[.6rem]'>Teams:</p>
                      <div className=' flex flex-wrap gap-2'>
                        {item.teams.map((item, index) => (
                          <p key={index} className=' text-[.6rem] rounded-sm'>{item.teamname}</p>

                        ))}

                      </div>
                    </div>
                   
                  </div>
    
                  <div className=' flex items-center justify-center'>
                    <div className=' w-full h-full p-6 bg-secondary'>
                    <CalendarCheck size={30}/>
    
                    </div>
                  </div>
                  
                </div>
               </CarouselItem>
            ))}
           
          
            
          </CarouselContent>
        </Carousel>
            
        </div>
    </div>
  )
}
