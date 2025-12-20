import React, { useState } from 'react'
import { BiAddToQueue, BiEnvelope } from 'react-icons/bi'
import { GiConfirmed } from 'react-icons/gi'
import BookingWizardModal from '../components/BookingWizardModal'
import ModernSelect from '../components/ModernSelect';


function Bookings() {
  const [showBookingModal, setShowBookingModal] = useState(false) ;
  const [filter , setFilter] = useState<{ label: string; value: string } | undefined>();
  return (
    <div className='p-3'>
      <div className="flex pb-2 justify-between">
        <div className="">
<div className="relative flex bg-transparent ">
     <ModernSelect
       value={filter}
       options={[
        {label :"Huye - kigali" , value:"Huye - kigali"},
        {label :"Kigali - Rubavu" , value:"Huye - kigali"},
        {label :"Huye - Nyanza" , value:"Huye - kigali"},
        {label :"Huye - Muhanga" , value:"Huye - kigali"}
       ]}
       placeholder="Filter bookings"
       onChange={setFilter}
     />
</div>
        </div>
            <div 
            onClick={() => setShowBookingModal(true)}
            className="px-5 shadow-lg hover:shadow-2xl hover:bg-blue-900 hover:scale-105 cursor-pointer transition-all duration-700 py-2 text-[14px] font-medium flex justify-center items-center rounded-lg bg-blue-800 text-white">
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
              <div
               onClick={() => setShowBookingModal(true)}
               className="px-5 mt-10 shadow-lg hover:shadow-2xl hover:bg-blue-900 hover:scale-105 cursor-pointer transition-all duration-700 py-2 text-[14px] font-medium flex justify-center items-center rounded-lg bg-blue-800 text-white">
    <BiAddToQueue className='text-white w-5 h-5 mr-2'/>  Create booking
    </div>
  </div>
</div>
      {showBookingModal && (
        <BookingWizardModal onClose={() => setShowBookingModal(false)} />
      )}
    </div>
  )
}

export default Bookings