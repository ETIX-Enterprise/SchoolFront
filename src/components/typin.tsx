import React from 'react'
import Lottie from 'lottie-react'

type propsTypes = {
  data : {} ,
  width : number ,
  height : number
}

function Typin({data , width , height} : propsTypes) {
  return (
    <>
    <Lottie  animationData={data} className={`w-[200px] h-[200px]`}  loop={true} />
    </>
  )
}

export default Typin