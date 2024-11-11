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
import Yourworkload from './Yourworkload'
import Dashboardlegends from '@/components/common/Dashboardlegends'

type Events = {
  title: string
 start: string
 end:  string
 teams: Subdata[]
 
 }
 
 type Subdata = {
   teamname: string
 _id: string
 }

export default function Pmcards() {

  const [list, setList] = useState<Events[]>([])
  const [upcoming, setUpcoming] = useState<Events[]>([])


  //event list
  useEffect(() => {
    const timer = setTimeout(() => {
      const getList = async () => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/events/geteventsusers`,{
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
    <div className=' relative z-50 w-full h-full flex flex-col gap-2 items-center bg-secondary justify-start'>
      <div className=' h-full overflow-y-auto overflow-x-auto flex items-start justify-center bg-secondary w-full max-w-[1920px]'>

        <div className=' w-full'>
         <Yourworkload/>
        </div>

      </div>
       

         <div className=' bg-primary absolute z-30 bottom-0 text-zinc-100 h-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-[1920px] p-4'>
          <Dashboardlegends/>

          <div className=' w-full h-full'>
            <Carousel className=' w-fit'
              opts={{loop: false, align: 'start'}}
              // plugins={[
              //    Autoplay({
              //    delay: 2000,
              //    }),]
              
              //   }
              >
              <CarouselContent className=' w-full'>

                {Object.values(list).map((item, index) => (
                  <CarouselItem key={index} className="basis-1/2">
                    <div className=' flex md:flex-row flex-col gap-6 w-[400px]  h-[210px] bg-secondary p-4'>
                      <div className=' flex flex-col gap-2 w-full'>
                        <h2 className=' uppercase font-semibold text-sm text-red-700'>CURRENT EVENT!</h2>
                        <h2 className=' uppercase font-semibold text-sm'>{item.title}</h2>
                        <p className=' text-sm text-zinc-400'>{new Date(item.start).toLocaleString()} - {new Date(item.end).toLocaleString()}</p>
                        <p className=' text-zinc-300 text-xs'>Teams:</p>

                        <div className=' flex flex-wrap gap-2'>
                          {item.teams.map((item, index) => (
                            <p key={index} className=' p-2 text-xs bg-zinc-900 rounded-sm'>{item.teamname}</p>

                          ))}

                        </div>
                      </div>
        
                      <div className=' flex items-start'>
                        <div className='  p-6 bg-primary'>
                        <CalendarCheck size={30}/>
        
                        </div>
                      </div>
                      
                    </div>
                  </CarouselItem>
                ))}

                {Object.values(upcoming).map((item, index) => (
                  <CarouselItem key={index} className="basis-1/2 ">
                    <div className=' flex md:flex-row flex-col gap-6 w-[400px]  h-[210px] bg-secondary p-4'>
                      <div className=' w-full flex flex-col gap-2'>
                        <h2 className=' uppercase font-semibold text-sm text-red-700'>UPCOMING EVENT!</h2>
                        <h2 className=' uppercase font-semibold text-sm'>{item.title}</h2>
                        <p className=' text-sm text-zinc-400'>{new Date(item.start).toLocaleString()} - {new Date(item.end).toLocaleString()}</p>
                        <p className=' text-zinc-300 text-xs'>Teams:</p>

                        <div className=' flex flex-wrap gap-2'>
                          {item.teams.map((item, index) => (
                            <p key={index} className=' p-2 text-xs bg-zinc-900 rounded-sm'>{item.teamname}</p>

                          ))}

                        </div>
                      </div>
        
                      <div className=' flex items-start'>
                        <div className='  p-6 bg-primary'>
                        <CalendarCheck size={30}/>
        
                        </div>
                      </div>
                      
                    </div>
                  </CarouselItem>
                ))}
              
              
                
              </CarouselContent>
            </Carousel>

            {(Object.keys(upcoming).length === 0 && Object.keys(list).length === 0) && (
              <div className=' w-full flex items-center justify-center h-full'>
                <p className=' text-sm text-zinc-300'>No events yet!</p>
              </div>
            )}
          </div>

       

          
            
        </div>
    </div>
  )
}
