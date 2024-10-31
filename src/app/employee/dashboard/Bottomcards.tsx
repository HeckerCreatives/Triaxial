"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { CalendarCheck } from 'lucide-react'
import { Events } from '@/types/types'



export default function Bottomcards() {

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
  
        console.log('Event list',response.data)
        setList(response.data.data.current)
        setUpcoming(response.data.data.upcoming)
     
       
      }
      getList()
    }, 500)
    return () => clearTimeout(timer)
  },[])


  
  return (
    <div className=' w-full h-full flex flex-col gap-2 items-center justify-start bg-secondary p-4'>
      <div className=' flex flex-col items-center justify-center gap-2 bg-primary w-full h-[300px] text-zinc-100'>
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
                    <p className=' text-sm text-zinc-400'>{item.start} - {item.end}</p>
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
                    <p className=' text-sm text-zinc-400'>{item.start} - {item.end}</p>
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
          <p className=' text-sm text-zinc-300'>No events yet!</p>
        )}
      </div>
    </div>
  )
}
