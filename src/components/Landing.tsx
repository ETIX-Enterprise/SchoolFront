import React, { useEffect, useState } from 'react'
import Typin from './typin'
import LayOut from '../LayOut';

function Landing() {
  const [isActive , setIsActive] = useState(true);
  useEffect(()=>{
    const activeIndex = setInterval(()=> {
      setIsActive(false)
    }, 2000)

    return ()=>{
      clearInterval(activeIndex)
    }
  } ,[])
  return (
    <>
    { isActive ?
    (
    <div className='w-full h-screen bg-[#003DD099] flex items-center justify-center'>
        <div className="">
         <p className='text-white text-center text-xl font-semibold'>Vuduka school management</p>
        </div>
        
    </div>)
    : <LayOut />
    }
  </>)
}

export default Landing