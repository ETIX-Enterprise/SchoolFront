import React from 'react'
import { BiAddToQueue, BiEnvelope } from 'react-icons/bi'
import { GiConfirmed } from 'react-icons/gi'


function Bookings() {
  return (
    <div className='p-3'>
      <div className="flex pb-2 justify-between">
        <div className="">
<div className="relative flex bg-transparent shadow-lg">
  <select className="w-full bg-white border border-gray-300 text-gray-700 py-2  pl-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500 appearance-none">
    <option value="option1">Filter bookings</option>
    <option value="option2">Huye - kigali</option>
    <option value="option3">Huye - Rusizi</option>
  </select>
  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
  </div>
</div>
        </div>
            <div className="px-5 shadow-lg hover:shadow-2xl hover:bg-blue-900 hover:scale-105 cursor-pointer transition-all duration-700 py-2 text-[14px] font-medium flex justify-center items-center rounded-lg bg-blue-800 text-white">
    <BiAddToQueue className='text-white w-5 h-5 mr-2'/>  Create booking
    </div>
      </div>
<div className="flex pt-5 justify-between border border-b border-gray-200">
  <div className="py-2 px-4 bg-zinc-100 border-b border-blue-800 flex justify-center items-center cursor-pointer hover:bg-gray-200 text-blue-700 text-[14px]">
    <BiEnvelope className='mr-1'/>
    <p className=''>Pending</p>
    <span className='px-3 py-1  rounded-full ml-2 bg-orange-200 text-black'>4</span>
  </div>
    <div className="py-2 px-4  border-b border-gray-400 flex justify-center items-center cursor-pointer hover:bg-gray-100 transition-all duration-500 text-blue-700 text-[14px]">
    <GiConfirmed className='mr-1'/>
    <p className='text-black'>Confirmed</p>
    <span className='px-3 py-1 rounded-full ml-2 bg-green-200 text-black'>10</span>
  </div>
    <div className="py-2 px-4  border-b border-gray-400 flex justify-center items-center cursor-pointer hover:bg-gray-100 transition-all duration-500 text-blue-700 text-[14px]">
    <BiEnvelope className='mr-1'/>
    <p className='text-black'>Completed</p>
    <span className='px-3 py-1 rounded-full ml-2 bg-blue-200 text-black'>5</span>
  </div>
    <div className="py-2 px-4  border-b border-gray-400 flex justify-center items-center cursor-pointer hover:bg-gray-100 transition-all duration-500 text-blue-700 text-[14px]">
    <BiEnvelope className='mr-1'/>
    <p className='text-black'>Canceled</p>
    <span className='px-3 py-1 rounded-full ml-2 bg-red-200 text-black'>1</span>
  </div>
</div>
<div className="h-full w-full flex justify-center items-center p-10">
  <div className="">
 <p className='text-[17px] text-center font-medium'>No bookings yet</p>
  <p className='text-[14px] font-normal text-gray-400'>tap here to create your first booking</p>
              <div className="px-5 mt-10 shadow-lg hover:shadow-2xl hover:bg-blue-900 hover:scale-105 cursor-pointer transition-all duration-700 py-2 text-[14px] font-medium flex justify-center items-center rounded-lg bg-blue-800 text-white">
    <BiAddToQueue className='text-white w-5 h-5 mr-2'/>  Create booking
    </div>
  </div>
</div>
    </div>
  )
}

export default Bookings