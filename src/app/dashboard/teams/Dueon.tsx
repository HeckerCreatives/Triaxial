"use client"
import React, { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'




export default function Dueon() {
  const [dialog, setDialog] = useState(false)
  const [dialog2, setDialog2] = useState(false)
  const router = useRouter()
  const search = useSearchParams()
  const tab = search.get('active')

  return (
    <div className=' w-full h-full flex justify-center bg-secondary text-zinc-100'>
     
      <div className=' w-full flex flex-col max-w-[1920px]'>
        <div className=' flex items-center gap-2 p-4'>
          <div className=' w-4 aspect-square bg-red-700'>

          </div>
          <p className=' text-[.6em] text-zinc-400'>- Due Dates</p>

        </div>
        <div className=' h-full overflow-y-auto flex items-start justify-center bg-zinc-100 w-full max-w-[1920px]'>
        <table className="table-auto w-full border-collapse ">
          <thead className=' bg-secondary h-[100px]'>
            <tr className=' text-[0.6rem] text-zinc-100 font-normal'>
              <th className=' border-[1px] border-zinc-700 w-[80px] font-normal'>Job no</th>
              <th className=' border-[1px] border-zinc-700 font-normal w-[80px]'>Client</th>
              <th className=' border-[1px] border-zinc-700 font-normal w-[80px]'>Project Name</th>
              <th className=' border-[1px] border-zinc-700 font-normal w-[80px]'>Job Manager</th>
              <th className=' border-[1px] border-zinc-700 font-normal w-[80px]'>Job Component</th>
   
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 40 }).map((_, index) => (
              <tr key={index} className={index % 2 === 0 ? '' : ' bg-red-100'}>
                <td className=" h-[20px] "></td>
                <td className=" h-[20px] "></td>
                <td className=" h-[20px] "></td>
                <td className=" h-[20px] "></td>
                <td className=" h-[20px] "></td>
                
              </tr>
            ))}
          
        </tbody>
        </table>

          <div className=' flex w-full'>
              {Array.from({ length: 8 }).map((_, index) => (
                <div className=' flex flex-col bg-secondary text-[.6rem] text-white'>
                <div className=' flex items-center'>
                    <div className=' border-[1px] border-zinc-600 h-[30px] w-[23px] flex items-center justify-center'>
                      <p className=''>M</p>
                    </div>
                    <div className=' border-[1px] border-zinc-600 h-[30px] w-[23px] flex items-center justify-center'>
                      <p className=''>T</p>
                    </div>
                    <div className=' border-[1px] border-zinc-600 h-[30px] w-[23px] flex items-center justify-center'>
                      <p className=''>W</p>
                    </div>

                    <div className=' border-[1px] border-zinc-600 h-[30px] w-[23px] flex items-center justify-center'>
                      <p className=''>T</p>
                    </div>

                    <div className=' border-[1px] border-zinc-600 h-[30px] w-[23px] flex items-center justify-center'>
                      <p className=''>F</p>
                    </div>

                    <div className=' border-[1px] border-zinc-600 h-[30px] w-[23px] flex items-center justify-center'>
                    </div>
                  </div>
                  <div className=' flex items-center'>
                    <div className=' border-[1px] border-zinc-600 h-[70px] w-[23px] flex items-center justify-center'>
                      <p className=' rotate-90'>00/00/00</p>
                    </div>
                    <div className=' border-[1px] border-zinc-600 h-[70px] w-[23px] flex items-center justify-center'>
                      <p className=' rotate-90'>00/00/00</p>
                    </div>
                    <div className=' border-[1px] border-zinc-600 h-[70px] w-[23px] flex items-center justify-center'>
                      <p className=' rotate-90'>00/00/00</p>
                    </div>

                    <div className=' border-[1px] border-zinc-600 h-[70px] w-[23px] flex items-center justify-center'>
                      <p className=' rotate-90'>00/00/00</p>
                    </div>

                    <div className=' border-[1px] border-zinc-600 h-[70px] w-[23px] flex items-center justify-center'>
                      <p className=' rotate-90'>00/00/00</p>
                    </div>

                    <div className=' border-[1px] border-zinc-600 h-[70px] w-[23px] flex items-center justify-center'>
                      <p className=' rotate-90 text-red-300'>Total</p>
                    </div>
                  </div>
                  {Array.from({ length: 40 }).map((_, index) => (
                      <div className=' flex items-center bg-white'>
                        
                        <button className=' hover:bg-zinc-300 border-[1px] border-zinc-600 h-[20px] w-[23px] flex items-center justify-center'>
                        </button>
                        <button className=' hover:bg-zinc-300 border-[1px] border-zinc-600 h-[20px] w-[23px] flex items-center justify-center'>
                        </button>
                        <button className=' hover:bg-zinc-300 border-[1px] border-zinc-600 h-[20px] w-[23px] flex items-center justify-center'>
                        </button>

                        <button className=' hover:bg-zinc-300 border-[1px] border-zinc-600 h-[20px] w-[23px] flex items-center justify-center'>
                        </button>

                        <button className=' hover:bg-zinc-300 border-[1px] border-zinc-600 h-[20px] w-[23px] flex items-center justify-center'>
                        </button>

                        <div className=' border-[1px] border-zinc-600 h-[20px] w-[23px] flex items-center justify-center'>
                        </div>
                      </div>
                    ))}
                </div>   
              ))}
          </div>

     

        </div>
       
        
      </div>
        
    </div>
  )
}
