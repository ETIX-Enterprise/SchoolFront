import React, { useState } from 'react'
    type HeaderProps = {
        isNavOpen ? : boolean
    }

function Header({ isNavOpen } : HeaderProps ) {
const [ isTyping , setIsTyping] = useState(false)
    
  return (
    <>
    <header className={`fixed ${isNavOpen ? "left-[243px]" : "left-[60px]"}  top-[15.98px] w-full h-[55.030616760253906px] p-4 border-b border-[#D0D0D0]`}>
        <div className=""></div>
    </header>
    </>
  )
}

export default Header