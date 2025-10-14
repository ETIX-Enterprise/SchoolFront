import React from 'react'
import Lottie from 'lottie-react'
import typin from '../assets/lottie/typing.json'

function Typin() {
  return (
    <>
    <Lottie  animationData={typin} className='w-[200px] h-[200px]'  loop={true} />
    </>
  )
}

export default Typin