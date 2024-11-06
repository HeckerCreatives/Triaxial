"use client"
import React, { useState } from 'react'


export default function Projecttable() {


  return (
   <div className=' w-full h-full flex flex-col justify-center bg-secondary p-4 text-zinc-100 mt-[170px]'>

      <div className=' w-full flex items-end gap-8 h-auto bg-primary mb-2 p-4 text-xs'>
        <div className=' w-auto flex flex-col gap-1'>
          <p className=' text-zinc-400'>Name: <span className=' text-zinc-100 underline'>Name</span></p>
          <p className=' text-zinc-400'>Initial: <span className=' text-zinc-100 underline'>ABC</span></p>
          <p className=' text-zinc-400'>Email: <span className=' text-zinc-100 underline'>test@gmail.com</span></p>

        </div>

        <div className=' h-full flex items-end gap-2'>
            <p className=' text-[.8em]'>Status Legend:</p>

              <div className=' w-fit flex items-center gap-2'>

                <div className=' flex items-center gap-2'>
                  <div className=' bg-red-500'>
                    <p className=' text-[.7em] text-black font-semibold px-1'>Due On</p>
                  </div>
                  


                </div>
                 <div className=' flex items-center gap-2'>
                  <div className=' bg-orange-400'>
                    <p className=' text-[.7em] text-black font-semibold px-1'>25%</p>
                  </div>
                  


                </div>

                 <div className=' flex items-center gap-2'>
                  <div className=' bg-yellow-300'>
                  <p className=' text-[.7em] text-black font-semibold px-1'>50%</p>

                  </div>


                </div>

                <div className=' flex items-center gap-2'>
                  <div className=' bg-green-500'>
                  <p className=' text-[.7em] text-black font-semibold px-1'>75%</p>

                  </div>


                </div>

                <div className=' flex items-center gap-2'>
                  <div className=' bg-blue-500'>
                  <p className=' text-[.7em] text-black font-semibold px-1'>100%</p>

                  </div>


                </div>

                <div className=' flex items-center gap-2'>
                  <div className=' bg-cyan-400'>
                  <p className=' text-[.7em] text-black font-semibold px-1'>CNST PH.</p>

                  </div>


                </div>
              </div>

             


        </div>

        <div className=' h-full flex items-end gap-2'>
            <p className=' text-[.8em]'>Total Hours Legend:</p>

              <div className=' w-fit flex items-center gap-2'>

                <div className=' flex items-center gap-2'>
                  <div className=' bg-pink-500'>
                    <p className=' text-[.7em] text-black font-semibold px-1'>Greater than 8 hours/ day or  40 hours / week</p>
                  </div>
                  


                </div>
                 <div className=' flex items-center gap-2'>
                  <div className=' bg-violet-300'>
                    <p className=' text-[.7em] text-black font-semibold px-1'>Leave</p>
                  </div>
                  


                </div>

                 <div className=' flex items-center gap-2'>
                  <div className=' bg-fuchsia-400'>
                  <p className=' text-[.7em] text-black font-semibold px-1'>Wellness Day</p>

                  </div>


                </div>


              </div>

             


        </div>

       
      </div>

      <div className=' w-full flex flex-col max-w-[1720px]'>
        <div className=' h-[580px] overflow-y-auto flex items-start justify-center bg-zinc-100 w-full'>
        <table className="table-auto w-auto border-collapse ">
          <thead className=' bg-secondary h-[63px]'>
            <tr className=' text-[0.6rem] text-zinc-100 font-normal'>
              <th className=' w-[80px] font-normal'>Team</th>
              <th className=' font-normal w-[80px]'>Client</th>
              <th className=' font-normal w-[80px]'>Project Name</th>
              <th className=' font-normal w-[80px]'>Job Component</th>
              <th className=' font-normal w-[80px]'>Role</th>
              <th className=' font-normal w-[80px]'>Members</th>
              <th className=' font-normal w-[80px]'>Notes</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 35 }).map((_, index) => (
              <tr key={index} className={index % 2 === 0 ? '' : ' bg-red-100'}>
                <td className=" h-[20px] "></td>
                <td className=" h-[20px] "></td>
                <td className=" h-[20px] "></td>
                <td className=" h-[20px] "></td>
                <td className=" h-[20px] "></td>
                <td className=" h-[20px] "></td>
                <td className=" h-[20px] "></td>
              
              </tr>
            ))}
          
        </tbody>
        </table>

       <div className=' flex flex-col w-full'>
          <table className="table-auto border-collapse border border-slate-500">
          
          <thead className=' bg-secondary'>
            <tr className=' text-[0.6rem] text-zinc-100 font-normal'>
                <th className=' font-normal border border-slate-500 py-2'>M</th>
                <th className=' font-normal border border-slate-500 py-2'>T</th>
                <th className=' font-normal border border-slate-500 py-2'>W</th>
                <th className=' font-normal border border-slate-500 py-2'>T</th>
                <th className=' font-normal border border-slate-500 py-2'>F</th>
                <th className=' font-normal border border-slate-500 py-2'></th>
              </tr>
            <tr className=' text-[0.6rem] text-zinc-100 font-normal'>
              <th className=' font-normal border border-slate-500 py-2'>00/00/00</th>
              <th className=' font-normal border border-slate-500 py-2'>00/00/00</th>
              <th className=' font-normal border border-slate-500 py-2'>00/00/00</th>
              <th className=' font-normal border border-slate-500 py-2'>00/00/00</th>
              <th className=' font-normal border border-slate-500 py-2'>00/00/00</th>
              <th className=' font-normal border border-slate-500 py-2 text-red-300'>Total</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 35 }).map((_, index) => (
              <tr key={index} className={index % 2 === 0 ? '' : ' bg-red-100'}>
                <td className="border border-slate-700 h-[20px]"></td>
                <td className="border border-slate-700 h-[20px]"></td>
                <td className="border border-slate-700 h-[20px]"></td>
                <td className="border border-slate-700 h-[20px]"></td>
                <td className="border border-slate-700 h-[20px]"></td>
                <td className="border border-slate-700 h-[20px]"></td>
              </tr>
            ))}
          
        </tbody>
        </table>

       </div>

       <div className=' flex flex-col w-full'>
          <table className="table-auto border-collapse border border-slate-500">
          
          <thead className=' bg-secondary'>
            <tr className=' text-[0.6rem] text-zinc-100 font-normal'>
                <th className=' font-normal border border-slate-500 py-2'>M</th>
                <th className=' font-normal border border-slate-500 py-2'>T</th>
                <th className=' font-normal border border-slate-500 py-2'>W</th>
                <th className=' font-normal border border-slate-500 py-2'>T</th>
                <th className=' font-normal border border-slate-500 py-2'>F</th>
                <th className=' font-normal border border-slate-500 py-2'></th>
              </tr>
            <tr className=' text-[0.6rem] text-zinc-100 font-normal'>
              <th className=' font-normal border border-slate-500 py-2'>00/00/00</th>
              <th className=' font-normal border border-slate-500 py-2'>00/00/00</th>
              <th className=' font-normal border border-slate-500 py-2'>00/00/00</th>
              <th className=' font-normal border border-slate-500 py-2'>00/00/00</th>
              <th className=' font-normal border border-slate-500 py-2'>00/00/00</th>
              <th className=' font-normal border border-slate-500 py-2 text-red-300'>Total</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 35 }).map((_, index) => (
              <tr key={index} className={index % 2 === 0 ? '' : ' bg-red-100'}>
                <td className="border border-slate-700 h-[20px]"></td>
                <td className="border border-slate-700 h-[20px]"></td>
                <td className="border border-slate-700 h-[20px]"></td>
                <td className="border border-slate-700 h-[20px]"></td>
                <td className="border border-slate-700 h-[20px]"></td>
                <td className="border border-slate-700 h-[20px]"></td>
              </tr>
            ))}
          
        </tbody>
        </table>

       </div>

       <div className=' flex flex-col w-full'>
          <table className="table-auto border-collapse border border-slate-500">
          
          <thead className=' bg-secondary'>
            <tr className=' text-[0.6rem] text-zinc-100 font-normal'>
                <th className=' font-normal border border-slate-500 py-2'>M</th>
                <th className=' font-normal border border-slate-500 py-2'>T</th>
                <th className=' font-normal border border-slate-500 py-2'>W</th>
                <th className=' font-normal border border-slate-500 py-2'>T</th>
                <th className=' font-normal border border-slate-500 py-2'>F</th>
                <th className=' font-normal border border-slate-500 py-2'></th>
              </tr>
            <tr className=' text-[0.6rem] text-zinc-100 font-normal'>
              <th className=' font-normal border border-slate-500 py-2'>00/00/00</th>
              <th className=' font-normal border border-slate-500 py-2'>00/00/00</th>
              <th className=' font-normal border border-slate-500 py-2'>00/00/00</th>
              <th className=' font-normal border border-slate-500 py-2'>00/00/00</th>
              <th className=' font-normal border border-slate-500 py-2'>00/00/00</th>
              <th className=' font-normal border border-slate-500 py-2 text-red-300'>Total</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 35 }).map((_, index) => (
              <tr key={index} className={index % 2 === 0 ? '' : ' bg-red-100'}>
                <td className="border border-slate-700 h-[20px]"></td>
                <td className="border border-slate-700 h-[20px]"></td>
                <td className="border border-slate-700 h-[20px]"></td>
                <td className="border border-slate-700 h-[20px]"></td>
                <td className="border border-slate-700 h-[20px]"></td>
                <td className="border border-slate-700 h-[20px]"></td>
              </tr>
            ))}
          
        </tbody>
        </table>

       </div>

       <div className=' flex flex-col w-full'>
          <table className="table-auto border-collapse border border-slate-500">
          
          <thead className=' bg-secondary'>
            <tr className=' text-[0.6rem] text-zinc-100 font-normal'>
                <th className=' font-normal border border-slate-500 py-2'>M</th>
                <th className=' font-normal border border-slate-500 py-2'>T</th>
                <th className=' font-normal border border-slate-500 py-2'>W</th>
                <th className=' font-normal border border-slate-500 py-2'>T</th>
                <th className=' font-normal border border-slate-500 py-2'>F</th>
                <th className=' font-normal border border-slate-500 py-2'></th>
              </tr>
            <tr className=' text-[0.6rem] text-zinc-100 font-normal'>
              <th className=' font-normal border border-slate-500 py-2'>00/00/00</th>
              <th className=' font-normal border border-slate-500 py-2'>00/00/00</th>
              <th className=' font-normal border border-slate-500 py-2'>00/00/00</th>
              <th className=' font-normal border border-slate-500 py-2'>00/00/00</th>
              <th className=' font-normal border border-slate-500 py-2'>00/00/00</th>
              <th className=' font-normal border border-slate-500 py-2 text-red-300'>Total</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 35 }).map((_, index) => (
              <tr key={index} className={index % 2 === 0 ? '' : ' bg-red-100'}>
                <td className="border border-slate-700 h-[20px]"></td>
                <td className="border border-slate-700 h-[20px]"></td>
                <td className="border border-slate-700 h-[20px]"></td>
                <td className="border border-slate-700 h-[20px]"></td>
                <td className="border border-slate-700 h-[20px]"></td>
                <td className="border border-slate-700 h-[20px]"></td>
              </tr>
            ))}
          
        </tbody>
        </table>

       </div>

      
      

      </div>
       
        
      </div>

      
        
    </div>
  )
}
