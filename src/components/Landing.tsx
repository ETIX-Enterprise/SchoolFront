import React, { useEffect, useState } from 'react'
import Login from '../Auth/Login';


function Landing() {
  const [isActive , setIsActive] = useState(true);
  useEffect(()=>{
    const activeIndex = setInterval(()=> {
      setIsActive(false)
    }, 1000)

    return ()=>{
      clearInterval(activeIndex)
    }
  } ,[])
  return (
    <>
    { isActive ?
    (
    <div className='w-full h-screen bg-gradient-to-r  from-[#003DD099] to-[#003DD099] flex p-5 justify-center'>
      {/* Decoration elements */}
      <div className="flex">
        <div className="bg-[#003DD02E] w-[26px] h-[23px] absolute top-[14px] left-[1247px]"></div>
        <div className="bg-[#003DD02E] w-[26px] h-[23px] absolute top-[37px] left-[1169px]"></div>
        <div className="bg-[#003DD02E] w-[39px] h-[34px] absolute top-[82px] left-[1156px]"></div>
        <div className="bg-[#003DD02E] w-[26px] h-[23px] absolute top-[82px] left-[1207px]"></div>
        <div className="bg-[#003DD02E] w-[26px] h-[23px] absolute top-[48px] left-[1213px]"></div>
      </div>
      <div className="flex justify-center items-center sm:h-[350px]">
        <div className="">
         <p className='text-white text-center  text-[20px] font-bold'>Vuduka School Management</p>
         <p className='text-blue-100 text-center mt-1  text-[15px]  font-medium  '>We handle journeis that you can focus on studies </p>
         </div>
         </div>
    </div>)
    : <Login />
    }
  </>)
}

export default Landing