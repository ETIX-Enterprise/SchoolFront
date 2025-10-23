import React from 'react'
import sortUp from "/Icona/sortU.png"
import sortDown from "/Icona/sortD.png"
import { GrAdd } from 'react-icons/gr'
import { BiSearch } from 'react-icons/bi'

function Students() {
  return (
    <div className='w-full h-full p-4'>
      {/** import and export buttons */}
      <div className="flex justify-end">
        <div className="w-[103px] h-[36px] mr-3 cursor-pointer hover:bg-[#003DD0] text-[#373F51] hover:text-white hover:scale-105 transition-all duration-500 rounded border border-[#848294] flex justify-center items-center p-2">
         <img src={sortDown}  className='w-1 h-2 mr-2' alt="" />
         <p className='text-[14px] font-semibold  '>Import</p>
        </div>
        <div className="w-[103px] h-[36px] rounded cursor-pointer bg-[#003DD0] hover:bg-[#032b8a] hover:text-white hover:scale-105 transition-all duration-500 flex justify-center items-center p-2">
         <img src={sortUp}  className='w-1 h-2 mr-2' alt="" />
         <p className='text-[14px] font-semibold text-white '>Export</p>
        </div>
      
      </div>
       {/** header section*/}
       <div className="flex mt-5 justify-between">
        <div className="flex-1 space-y-[3px]">
          <h1 className='text-[#010102] text-[18px] font-semibold'>Students</h1>
          <p className='text-[14px] text-[#696778] font-medium'>Student Registered On MIT</p>
        </div>
        <div className="flex justify-between">
          <div className="w-[135px] mr-5 h-[45px] text-[#4327F4] bg-[#4F279B0D] rounded-[56px] flex items-center justify-center p-2 cursor-pointer">
           <GrAdd className='w-2 h-2 mr-1'/>
           <p className='text-[14px] font-medium'>
            Add Student
           </p>
          </div>
          <div className="w-[235px] h-[46px] flex  border border-[#F5F6F7]">
            <input className='w-full h-full  focus:outline-none placeholder:text-[#828282] text-[14px] px-3  font-medium' placeholder='Search Student' type="text" name="" id="" />
            <BiSearch className='w-4 mt-4 mr-1 h-4'/>
          </div>
        </div>
       </div>

    </div>
  )
}

export default Students