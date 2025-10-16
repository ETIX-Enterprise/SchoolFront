import React, { useEffect, useState } from 'react'
import search from '/Icona/search.png'
import settings from '/Icona/settings.png'
import download from '/Icona/download.png'
import arrowDown from '/Icona/arrowDown.png'
import { BiUser } from 'react-icons/bi'
import typing from "../assets/lottie/typing.json"
import UseIsSmallScreen from '../Hooks/UseIsSmallScreen'
import Typin from './typin'
    type HeaderProps = {
        isNavOpen ? : boolean
    }
const Header = React.memo (({ isNavOpen } : HeaderProps ) => {
const [ isTyping , setIsTyping] = useState(false)



//check for small screens and respond
const isSmallScreen =  UseIsSmallScreen()

useEffect(()=>{
 setTimeout(()=> setIsTyping(false) , 500)
} , [isTyping])
    
  return (
    <>
    <header className={`fixed ${isNavOpen ? "left-[243px]" : "left-[60px]"}  top-[15.98px] w-full h-[55.030616760253906px] p-3 border-b border-[#D0D0D0]`}>
      {/* Search bar*/}
        <div className={`flex justify-between  ${isNavOpen  == false ? "w-[1170px]" : "sm:max-w-[1000px]"}`}>
        <div className="flex">
          <img src={search} className='w-5 h-5 mr-4 mt-1' />
          <input type="text" onChange={()=> {
             setTimeout(()=> setIsTyping(true), 100),
             setIsTyping(false)}} className='bg-transparent w-full text-[14px] font-normal text-[#D0D0D0] placeholder:text-[#D0D0D0]  focus:outline-none focus:ring-0' placeholder='Search any thing here...|' />
          {isTyping ? 
          <div className="ml-5 absolute top-[-75px] left-[300px]">
            <Typin data={typing} width={100} height={50} />
          </div>
        : ''}
        </div>
        <div className="flex justify-between space-x-5 ">
            <div className="flex justify-around">
          <span className='cursor-pointer p-1 flex mr-2 rounded-2xl hover:bg-gray-100'>
            <img src={settings} className='w-5 h-5  text-[#0000001A]'  />
          </span>
          <span className='cursor-pointer p-1  flex rounded-2xl hover:bg-zinc-100'>
            <img src={download} className='w-5 h-5 '  />
          </span>
        </div>
        <div className="h-7 w-[1px] bg-[#0000001A]"></div>
        <div className="flex">
          <span className='cursor-pointer p-1 flex mr-2 rounded-2xl hover:bg-gray-100'>
            <BiUser className='w-5 h-5 '  />
          </span>
          <span className='cursor-pointer p-1  flex rounded-2xl hover:bg-zinc-100'>
            <img src={arrowDown} className='w-2 h-[6px] mt-[9px] '  />
          </span>
        </div>
        </div>
        </div>
        
    </header>
    </>
  )
})

export default Header