import React from 'react'
import logo from "/Icona/logo.png"

function Login() {

  return (
    <div className='w-full sm:flex h-screen'>
      {/* login form  */}
      <div className="w-1/2 flex-1 space-y-2 h-full p-10">
             <header className='p-2'>
            <span className='flex'>
                <img src={logo} className='w-7 mr-1 h-7' />
            <h2 className='text-[#003DD0] font-bold  mt-1 text-[16px] font-montserrat'>VUDUKA</h2>
       </span>
       <div className="flex-1 space"></div>
        </header>
        
      </div>
      {/* aside description */}
      <div className="w-1/2 h-full p-5 bg-[#003DD099] ">
      </div>
    </div>
  )
}

export default Login