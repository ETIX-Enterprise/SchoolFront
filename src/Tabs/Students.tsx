import React from 'react'
import sortUp from "/Icona/sortU.png"
import sortDown from "/Icona/sortD.png"
import { GrAdd } from 'react-icons/gr'
import { BiSearch } from 'react-icons/bi'
import StudentTable from '../components/studentTable'
import { useState } from 'react'

function Students() {
    const [students, setStudents] = useState([
    {
      id: 1,
      name: "UMUKURA Olivier",
      grade: "Year 3",
      phone: "+250 788 924 456",
      city: "Kigali",
      district: "Kicukiro",
      status: "Arrived" as const,
    },
        {
      id: 1,
      name: "UMUKURA Olivier",
      grade: "Year 3",
      phone: "+250 788 924 456",
      city: "Kigali",
      district: "Kicukiro",
      status: "Arrived" as const,
    },
        {
      id: 1,
      name: "UMUKURA Olivier",
      grade: "Year 3",
      phone: "+250 788 924 456",
      city: "Kigali",
      district: "Kicukiro",
      status: "Arrived" as const,
    },
        {
      id: 1,
      name: "UMUKURA Olivier",
      grade: "Year 3",
      phone: "+250 788 924 456",
      city: "Kigali",
      district: "Kicukiro",
      status: "Arrived" as const,
    },
            {
      id: 1,
      name: "UMUKURA Olivier",
      grade: "Year 3",
      phone: "+250 788 924 456",
      city: "Kigali",
      district: "Kicukiro",
      status: "Arrived" as const,
    },
            {
      id: 1,
      name: "UMUKURA Olivier",
      grade: "Year 3",
      phone: "+250 788 924 456",
      city: "Kigali",
      district: "Kicukiro",
      status: "Arrived" as const,
    },
            {
      id: 1,
      name: "UMUKURA Olivier",
      grade: "Year 3",
      phone: "+250 788 924 456",
      city: "Kigali",
      district: "Kicukiro",
      status: "Arrived" as const,
    },
            {
      id: 1,
      name: "UMUKURA Olivier",
      grade: "Year 3",
      phone: "+250 788 924 456",
      city: "Kigali",
      district: "Kicukiro",
      status: "Arrived" as const,
    },
            {
      id: 1,
      name: "UMUKURA Olivier",
      grade: "Year 3",
      phone: "+250 788 924 456",
      city: "Kigali",
      district: "Kicukiro",
      status: "Arrived" as const,
    },
  ]);

  const handleDelete = (id: number) => {
    setStudents((prev:any) => prev.filter((s:any) => s.id !== id));
  };
  return (
    <div className='w-full h-full p-4'>
      {/** import and export buttons */}
      <div className="flex justify-end">
        <div className="w-[103px] h-[36px] mr-3 cursor-pointer hover:bg-[#003DD0] text-[#373F51] hover:text-white hover:scale-105 transition-all duration-500 rounded-lg border border-[#848294] flex justify-center items-center p-2">
         <img src={sortDown}  className='w-1 h-2 mr-2' alt="" />
         <p className='text-[14px] font-semibold  '>Import</p>
        </div>
        <div className="w-[103px] h-[36px] rounded-lg cursor-pointer bg-[#003DD0] hover:bg-[#032b8a] hover:text-white hover:scale-105 transition-all duration-500 flex justify-center items-center p-2">
         <img src={sortUp}  className='w-1 h-2 mr-2' alt="" />
         <p className='text-[14px] font-semibold text-white '>Export</p>
        </div>
      
      </div>
       {/** header section*/}
       <div className="flex mt-4 justify-between">
        <div className="flex-1 space-y-[1px]">
          <h1 className='text-[#010102] text-[18px] font-semibold'>Students</h1>
          <p className='text-[14px] text-[#696778] font-medium'>Student Registered On MIT</p>
        </div>
        <div className="flex justify-between">
          <div className="w-[135px] mr-5 h-[40px] text-white bg-blue-800 shodow-lg hover:bg-blue-700 transition-all duration-500 hover:scale-105 rounded-lg flex items-center justify-center p-2 cursor-pointer">
           <GrAdd className='w-3 h-3 mr-1'/>
           <p className='text-[14px] font-medium'>
            Add Student
           </p>
          </div>
          <div className="w-[235px] h-[40px] flex rounded shadow-lg shadow-gray-50 border border-gray-300">
            <input className='w-full h-full  focus:outline-none placeholder:text-[#828282] text-[14px] px-3  font-medium' placeholder='Search Student' type="text" name="" id="" />
            <BiSearch className='w-4 mt-3  mr-1 h-4'/>
          </div>
        </div>
       </div>
      <div className="px-3 mb-10">
        <StudentTable data={students} onDelete={handleDelete}  />
      </div>
    </div>
  )
}

export default Students