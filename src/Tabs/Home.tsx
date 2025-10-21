import React from 'react'
import filter from "/Icona/filter.png"
import upload from "/Icona/upload.png"
function Home() {
  return (
    <div className='w-full h-full'>
     <header className='w-full px-5 py-2 flex justify-between'>
        <h1 className='text-[24px] text-black font-semibold '>Overview</h1>
        <div className="flex w-[200px] justify-around">
            <button className="bg-[#D9D9D9] p-1 cursor-pointer hover:bg-[#c6c4c4] hover:scale-105 transition-all duration-700  text-[14px] text-[#2F2B3DB2] font-normal w-[84px] flex justify-center items-center h-[32px] rounded-[8px]">
                
            <img src={filter} className='w-3 h-3' alt="" />
                
             Filter
            </button>
            <button className="bg-[#D9D9D9] cursor-pointer p-1 text-[14px] hover:bg-[#c6c4c4] hover:scale-105 transition-all duration-700 text-[#2F2B3DB2] font-normal justify-center items-center w-[84px] flex h-[32px] rounded-[8px]">
                
            <img src={upload} className='w-3 h-3' alt="" />
                
             Upload
            </button>
        </div>
     </header>
    </div>
  )
}

export default Home