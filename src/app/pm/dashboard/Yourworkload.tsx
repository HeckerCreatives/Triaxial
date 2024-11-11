"use client"
import React, { useEffect, useMemo, useState } from 'react'
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { useRouter, useSearchParams } from 'next/navigation'
import { RefreshCcw } from 'lucide-react'

type Dates = {
  date: string
  eventDay: boolean
  leave: boolean
  status: string[]
  totalhoursofjobcomponents: number
  wellnessDay: boolean
}


type Workload = {
initial: string
name: string
resource: string
dates: Dates[]


}

export default function Yourworkload() {
  const [memberIndex, setMemberIndex] = useState(0)
  const [list, setList] = useState<Workload[]>([])
  const [dates, setDates] = useState<string[]>([])
  const [filter, setFilter] = useState('')
  const router = useRouter()
  const params = useSearchParams()
  const getTeamid = params.get('team')


  useEffect(() => {
    const getList = async () => {
      if (getTeamid !== '' || undefined || null){
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/jobcomponent/getjobcomponentdashboardmanager?teamid=${getTeamid}&filterDate=${filter}`,{
            withCredentials: true
          })
  
          setDates(response.data.data.alldates)
          setList(response.data.data.yourworkload)
        } catch (error) {
          
        }
      }
     
    }
    getList()
  },[filter, getTeamid])

  const statusData = ( hours: any, wd: boolean, event: boolean) => {
    const data = []

    if(hours <= 2){
      data.push('bg-red-500')
    }

    if(hours <= 4 && hours >= 4){
      data.push('bg-orange-500')
    }

    if(hours <= 6 && hours >= 4){
      data.push('bg-yellow-500')
    }

    if(hours <= 8 && hours >= 6){
      data.push('bg-green-500')
    }

    if(hours > 8){
      data.push('bg-teal-500')
    }

    if(wd === true){
      data.push('bg-indigo-500')
    }

    return data
  }


  return (
    <div className=' w-full h-full flex flex-col justify-center bg-secondary p-4 text-zinc-100'>

    
      <div className=' h-full w-full flex flex-col gap-2 max-w-[1920px]'>
      <div className=' w-full flex items-center gap-2 justify-end'>
        <label htmlFor="" className=' text-xs'>Filter by date:</label>
        <input value={filter} onChange={(e) => setFilter(e.target.value)} type="date" name="" id="" className=' p-2 bg-primary text-xs rounded-sm' />
        <button onClick={() => setFilter('')} className=' p-2 bg-red-600 text-white rounded-sm'><RefreshCcw size={15}/></button>


      </div>
      {list.length !== 0 ? (
        <div className=' h-full overflow-y-auto flex items-start justify-center bg-secondary w-full max-w-[1920px]'>
          <table className="table-auto w-[300px] border-collapse ">
            <thead className=' bg-secondary h-[100px]'>

              <tr className=' text-[0.6rem] text-zinc-100 font-normal'>
                <th className=' w-[20px] font-normal'>Name</th>
                <th className=' w-[50px] font-normal'>Initial</th>
                <th className=' font-normal w-[50px]'>Resource</th>
            
              </tr>
            </thead>
            <tbody>
            {list.map((graphItem, graphIndex) =>
            
                <tr key={`${graphIndex}-${memberIndex}`} className="bg-primary text-[.6rem] py-2 h-[42px] border-[1px] border-zinc-600">
                          
                    <td className="text-center text-red-600">{graphItem.initial}</td>
                    <td className="text-center">{graphItem.name}</td>
                    <td className="text-center">{graphItem.resource}</td>
                  
        
                </tr>

            )}
          </tbody>
          </table>

          <div className=' overflow-x-auto w-full h-full'>
        
            <table className="table-auto w-full border-collapse ">
              <thead className=' w-full bg-secondary h-[100px]'>
                <tr className=' text-[0.6rem] text-zinc-100 font-normal'>
                
                  {dates.map((dateObj, index) => (
                    <>
                      <th key={index} className=' relative font-normal w-[30px] border-[1px] border-zinc-700'>
                        <p className=' w-[50px] -translate-x-4 absolute rotate-90 top-10'>{dateObj}</p>
                      </th>
                      {(index + 1) % 5 === 0 && (
                        <th key={`total-${index}`} className='font-normal w-[30px] border-[1px] border-zinc-700'>
                          <p className='rotate-90 w-[50px]'>Total Hours</p>
                        </th>
                      )}
                    </>
                  ))}
                
                  
                </tr>
              </thead>
              <tbody>
              {list.map((workItem, workIndex) => (
                <tr key={workIndex} className="bg-primary text-[.6rem] py-2 h-[42px] border-[1px] border-zinc-600">
                  {dates.map((date, dateIndex) => {
                    // Find data for the current date
                    const dateData = workItem.dates.find(d => d.date === date);
                    const hours = dateData ? dateData.totalhoursofjobcomponents : '-';
                    const isEventDay = dateData ? dateData.eventDay : false;
                    const isWd = dateData ? dateData.wellnessDay : false;

                    // Calculate sum every 5 days
                    const startIndex = Math.floor(dateIndex / 5) * 5;
                    const endIndex = startIndex + 5;
                    const totalHours = workItem.dates
                      .filter(d => dates.slice(startIndex, endIndex).includes(d.date))
                      .reduce((acc, d) => acc + d.totalhoursofjobcomponents, 0);

                    return (
                      <>
                        <td 
                          key={dateIndex} 
                          className="relative text-center overflow-hidden bg-white border-[1px]"
                        >
                          <div className='flex absolute top-0 w-full h-[40px] text-center'>
                            {statusData(hours, isWd, isEventDay).map((item, index) => (
                              <div key={index} className={`w-full h-full ${item}`}>

                              </div>
                            ))}
                            {/* Insert your status handling code here if necessary */}
                          </div>
                          <p className='relative text-black font-bold text-xs z-30'>{!isEventDay && hours}</p>
                        </td>
                        {(dateIndex + 1) % 5 === 0 && (
                          <th key={`total-${dateIndex}`} className='font-normal w-[40px] bg-primary border-[1px] border-zinc-700'>
                            <p className={` ${totalHours < 40 ? ' text-cyan-500' : 'text-indigo-500'}`}>{totalHours}</p> {/* Display the sum of hours for every 5 days */}
                          </th>
                        )}
                      </>
                    );
                  })}
                </tr>
              ))}
            </tbody>
            </table>
          
            
          </div>


        </div>
          ): (
        
            <div className=' w-full h-[300px] flex items-center justify-center'>
              <p className=' text-sm text-zinc-400'>No data.</p>
            </div>
          
        )}
     
      
    </div>
   
      

    
        
    </div>
  )
}
