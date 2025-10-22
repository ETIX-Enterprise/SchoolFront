import React from 'react'
import filter from "/Icona/filter.png"
import upload from "/Icona/upload.png"
import vector from "/Icona/Vector.png"
import upVector from "/Icona/upArrow.png"
import LineCharts from '../components/Charts'
import Dots from "/Icona/dots.png"
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
     <header className='w-full px-5 border-b border-[#D0D0D0] py-2 flex justify-between'>
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
     {/** overview cards */}
     <div className="flex px-3 justify-between">
      {OverViewCards.map((card)=>(
       <div key={card.id} className="w-[240px] h-[100px] rounded-sm  space-y-[2px] p-2 border border-[#D0D0D0]">
        <p className='text-[14px] font-normal text-[#2F2B3DB2]'>{card.subTite}</p>
        <div className="flex justify-around">
        <h2 className='font-semibold text-[16px] text-black'>{card.value} {card.name}</h2>
        <img src={vector} className='w-5 h-5 shadow-xl' />
        </div>
        <div className="flex  justify-around">
          <div className={`p-1 mt-1 flex rounded-sm ${card.name == "Bookings"  ? "bg-[#003DD02E]" : card.name == "Payments" ? "bg-[#F51E1E2E]" : card.name == "Students" ? "bg-[#00D6272E]" : "bg-[#00D6272E]"}`}>
            <img src={upVector} className='w-2 h-2 mt-[7px]' alt="" />
            <p className='text-[#003DD0] text-[13px] font-normal '>{card.comparision}%</p>
          </div>
          <p className='text-[12px] mt-2'>compared to last Term</p>
        </div>
       </div>
      ))}
     </div>
 {/* overview charts */}
 <div className=" w-full p-3 h-[289px] flex grid-cols-2 gap-5 ">
  <div className="w-full flex-1 space-y-3 border border-[#B3B3B3] p-2 h-full rounded-[8px]">
    <p className='text-[15px] text-black font-bold'> Journey Overview</p>
    <div className="w-full h-[200px] rounded-[16px] p-2 px-3 bg-[#F7F9FB]">
      <div className="flex justify-around">
        <p className='text-black font-semibold text-[14px]'>Students</p>
        <p className='text-[#1C1C1C66] font-semibold text-[14px]'>Transport status |</p>
        <p className='text-black font-normal text-[14px] relative top-[-2px]'><span className='text-[16px] relative top-[-3px] font-extrabold'>.</span>This year</p>
        <p className='text-black font-normal text-[14px] relative top-[-2px]'><span className='text-[16px] text-[#A8C5DA] relative top-[-3px] font-extrabold'>.</span>Last year</p>
      </div>
      <div className="">
        <LineCharts data={data}/>
      </div>
    </div>
  </div>
  <div className="w-1/3 border border-[#B3B3B3] pt-2  rounded-[8px]">
  <div className="flex px-5 justify-between">
    <div className="flex-1 space-y-[2px]">
      <h1 className='text-black font-bold text-[15px]'>Students by Status</h1>
      <p className='text-[#2F2B3DB2] text-[12px]'>Showing data for Students</p>
    </div>
    <div className="">
     <img src={Dots} className='w-[15px] h-[3px]'/>
    </div>
  </div>
  </div>
 </div>
    </div>
  )
}

export default Home