import React from 'react'

export default function Workload() {
  return (
    <div className=' w-full h-full flex flex-col justify-center bg-secondary p-4 text-zinc-100'>

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
        <div className=' h-[580px] overflow-y-auto flex items-start justify-center bg-zinc-100 w-full max-w-[1720px]'>
        <table className="table-auto w-full border-collapse ">
          <thead className=' bg-secondary h-[100px]'>
            <tr className=' text-[0.6rem] text-zinc-100 font-normal'>
              <th className=' border-[1px] border-zinc-700 w-[80px] font-normal'>Team</th>
              <th className=' border-[1px] border-zinc-700 font-normal w-[80px]'>Client</th>
              <th className=' border-[1px] border-zinc-700 font-normal w-[80px]'>Project Name</th>
              <th className=' border-[1px] border-zinc-700 font-normal w-[80px]'>Job Component</th>
              <th className=' border-[1px] border-zinc-700 font-normal w-[80px]'>Role</th>
              <th className=' border-[1px] border-zinc-700 font-normal w-[80px]'>Members</th>
              <th className=' border-[1px] border-zinc-700 font-normal w-[80px]'>Notes</th>
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

