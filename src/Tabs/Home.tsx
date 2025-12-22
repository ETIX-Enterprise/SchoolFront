import React from 'react'

import upVector from "/Icona/upArrow.png"
import { LineCharts } from '../components/Charts'
import Dots from "/Icona/dots.png"
import arrowDown from "/Icona/arrowDown.png"
import ExampleUsage from '../components/PieComponent'
import { Filter, Upload } from 'lucide-react'
type cardData = [
  {id:number , name:string ,subTite:string , value:number , comparision : number},
  {id:number , name:string ,subTite:string , value:number , comparision : number},
  {id:number , name:string ,subTite:string , value:number , comparision : number},
  {id:number , name:string ,subTite:string , value:number , comparision : number}
]


function Home() {
  const OverViewCards: cardData = [
    {id:1 , name:"Students" , subTite :"Total Students", value:10500 , comparision:12.08},
    {id:2 , name:"Bookings" , subTite :"Active Bookings", value:12 , comparision:12.08},
    {id:3 , name:"Payments" , subTite :"Pending payments", value:3 , comparision:12.08},
    {id:4 , name:"Journeys" , subTite :"Journeys Completed", value:10, comparision:12.08},
  ]

//dummy data for testing line charts

const data = [
  {
    name: 'Page A',
    uv: 40,
    pv: 24,
    amt: 24,
  },
  {
    name: 'Page B',
    uv: 30,
    pv: 13,
    amt: 22,
  },
  {
    name: 'Page C',
    uv: 20,
    pv: 98,
    amt: 22,
  },
  {
    name: 'Page D',
    uv: 27,
    pv: 39,
    amt: 20,
  },
  {
    name: 'Page E',
    uv: 18,
    pv: 48,
    amt: 21,
  },
  {
    name: 'Page F',
    uv: 23,
    pv: 38,
    amt: 25,
  },

];

  return (
    <div className='w-full flex-1 space-y-3 h-full'>
<header className="w-full px-5 py-3 border-b border-gray-200 flex justify-between items-center">
  <h1 className="text-[18px] font-semibold text-gray-900">
    Rwanda Academy
  </h1>

  <div className="flex gap-2">
    <button className="px-4 py-2 text-[14px] font-medium rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-100 transition">
      <Filter className="w-4 h-4 inline mr-2" />
      Filter
    </button>

    <button className="px-4 py-2 text-[14px] font-medium rounded-lg bg-blue-800 text-white hover:bg-blue-900 transition">
      <Upload className="w-4 h-4 inline mr-2" />
      Upload
    </button>
  </div>
</header>

     {/** overview cards */}
     <div className="flex px-5 justify-between">
      {OverViewCards.map((card)=>(
       <div key={card.id} className="w-[240px] h-[100px] rounded-sm  space-y-[2px] p-2 border border-gray-200">
        <p className='text-[14px] font-normal text-gray-700'>{card.subTite}</p>
        <div className="flex justify-start">
        <h2 className='font-semibold text-[16px] text-black'>{card.value} {card.name}</h2>
        </div>
        <div className="flex  justify-start">
          <div className="flex  justify-start">
          <div className={`p-1 mt-1 flex rounded-sm ${card.name == "Bookings"  ? "bg-[#003DD02E]" : card.name == "Payments" ? "bg-[#F51E1E2E]" : card.name == "Students" ? "bg-[#00D6272E]" : "bg-[#00D6272E]"}`}>
            <img src={upVector} className='w-2 h-2 mt-[7px]' alt="" />
            <p className='text-[#003DD0] text-[13px] font-normal '>{card.comparision}%</p>
          </div>
          
          <p className='text-[12px] ml-10 mt-2'>compared to last Term</p>
          </div>
        </div>
       </div>
      ))}
     </div>
 {/* overview charts */}
 <div className=" w-full p-3 h-[289px] flex grid-cols-2 gap-5 ">
  <div className="w-full flex-1 space-y-3 border border-gray-200 p-2 h-full rounded-[8px]">
    <p className='text-[15px] text-black font-medium'> Journey Overview</p>
    <div className="w-full h-[200px] rounded-[16px] p-2 px-3 bg-gray-100">
      <div className="flex justify-around">
        <p className='text-black font-medium text-[14px]'>Students</p>
        <p className='text-[#1C1C1C66] font-medium text-[14px]'>Transport status |</p>
        <p className='text-black font-normal text-[14px] relative top-[-2px]'><span className='text-[16px] relative top-[-3px] font-extrabold'>.</span>This year</p>
        <p className='text-black font-normal text-[14px] relative top-[-2px]'><span className='text-[16px] text-[#A8C5DA] relative top-[-3px] font-extrabold'>.</span>Last year</p>
      </div>
      <div className="">
        <LineCharts data={data}/>
      </div>
    </div>
  </div>
  <div className="w-1/3 border border-gray-200 pt-2  rounded-[8px]">
  <div className="flex px-5 justify-between">
    <div className="flex-1 space-y-[2px]">
      <h1 className='text-black font-medium text-[15px]'>Students by Status</h1>
      <p className='text-gray-700 text-[12px]'>Showing data for Students</p>
    </div>
    <div className="mt-3 cursor-pointer">
     <img src={Dots} className='w-[15px] h-[3px]'/>
    </div>
  </div>
  <div className="flex p-2 justify-between">
    <div className="">
      <p className='text-black text-[15px] font-semibold'>Status</p>
    </div>
    <div className="flex cursor-pointer">
      <p className='text-[10px] font-semibold text-black'>Active</p>
      <img src={arrowDown} className='w-[9px] mt-1 ml-1 h-2'/>
    </div>
    
  </div>
      {/** status bar for indication */}
      <div className="px-5 mt-2 w-full flex">
      <div className="h-3 w-[70%] bg-blue-200 rounded-l-[3px]"></div>
      <div className="h-3 w-[20%] bg-red-200 "></div>
      <div className="h-3 w-[10%] bg-blue-200 rounded-r-[3px] "></div>
    </div>

<div className="px-5 mt-5">
      <div className="flex justify-between">
  <p className='flex text-[10px]  font-semibold'>
    <span className='w-2 h-2 mt-[4px] rounded-[1px] mr-1 bg-[#373F51]'></span>
    Healthy
  </p>
  <p className='text-[10px] font-semibold text-[#696778]'>88%</p>
  </div>
        <div className="flex mt-8 justify-between">
  <p className='flex text-[10px]  font-semibold'>
    <span className='w-2 h-2 mt-[4px] rounded-[1px] mr-1 bg-[#B01E1E]'></span>
    Sick 
  </p>
  <p className='text-[10px] font-semibold text-[#696778]'>8%</p>
  </div>
          <div className="flex mt-8 justify-between">
  <p className='flex text-[10px]  font-semibold'>
    <span className='w-2 h-2 mt-[4px] rounded-[1px] mr-1 bg-blue-800'></span>
    Not Arrived 
  </p>
  <p className='text-[10px] font-semibold text-blue-800'>4%</p>
  </div>
  </div>
  </div>

  
 </div>
 <div className="">
  <ExampleUsage />
 </div>
    </div>
  )
}

export default Home