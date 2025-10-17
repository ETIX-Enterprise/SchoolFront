import React from 'react'
import Lottie from 'lottie-react'

type propsTypes = {
  data : {} ,
  width : number ,
  height : number,
}

function Typin({data , width , height} : propsTypes) {
  return (
    <>
    <Lottie  animationData={data} className={`w-[${width}px] h-[${height}px]`}  loop={true} />
    </>
  )
}

export default Typin