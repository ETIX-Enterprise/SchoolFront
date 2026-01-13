import { useCallback, useEffect, useState } from 'react'
import { BiMenu } from 'react-icons/bi'
import logo from "/Icona/logo.png"
import { NavLink } from 'react-router-dom'
import { BsArrow90DegRight, BsArrowRight, BsCashCoin } from 'react-icons/bs'
import Header from './components/header' 
import UseIsSmallScreen from './Hooks/UseIsSmallScreen'
import { Outlet } from 'react-router-dom'
import { AppWindow, Bell, BusFront, Signal, Ticket, TicketCheck, TicketCheckIcon, UserCircle, Wallet } from 'lucide-react'
import { PiStudent } from 'react-icons/pi'

function LayOut() {
  const isSmallScreen = UseIsSmallScreen()
  
  useEffect(() =>{
    if(isSmallScreen == true){
      setIsNavOpen(false);
    }else{
      return;
    }
  } ,[isSmallScreen])
  
  const navigations = [
    {'id':1 , 'name':'OVERVIEW' , 'path':'/Dashboard/overview' , 'icon' : <AppWindow className='w-5 h-5' /> },
    {'id':2 , 'name':'Students' , 'path':'/Dashboard/students' , 'icon' :  <PiStudent className='w-5 h-5' />},
    {'id':3 , 'name':'Ticekts payments' , 'path':'/Dashboard/tickets' , 'icon' : <BsCashCoin className='w-5  h-5' />} ,
    {'id':4 , 'name':'Bookings' , 'path':'/Dashboard/booking' ,'icon' : <Ticket className='w-5 h-5' />} ,
    {'id':5 , 'name':'Payments' , 'path':'/Dashboard/payment' , 'icon' : <Wallet className='w-5 h-5' />} ,
    {'id':6 , 'name':'Reports' , 'path': '/Dashboard/reports' , 'icon' : <Signal className='w-5 h-5'/>}
  ]
  
  const navigations2 = [
    {'id':1  , 'name' : 'Tracking' , 'path':'/Dashboard/tracking' , 'icon':<BusFront className='w-5 h-5' /> },
    {'id':2  , 'name' : 'Notifications' , 'path':'/Dashboard/notifications' , 'icon':<Bell className='w-5 h-5' /> },
    {'id':3  , 'name' : 'Support' , 'path':'/Dashboard/support' , 'icon':<UserCircle className='w-5 h-5' /> },
  ]
  
  const [isNavOpen, setIsNavOpen] = useState(false);
  
  const handleNav = useCallback(() => {
    setIsNavOpen(!isNavOpen)
  }, [isNavOpen])
  
  return (
    <div className='w-full h-screen flex '>
      {isNavOpen ? (
        <aside className='w-[243px] p-5 overflow-auto sm:h-screen h-[832px] bg-gradient-to-b from-zinc-50 to-zinc-100  transition-all duration-300'>
          <header className='p-2 w-full flex justify-between items-center mb-6'>
            <span className='flex items-center'>
              <img src={logo} className='w-7 mr-2 h-7 drop-shadow-sm' alt="Logo" />
              <h2 className=' font-bold text-[17px] tracking-tight bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent'>
                VUDUKA
              </h2>
            </span>
            <span 
              onClick={handleNav} 
              className='cursor-pointer w-8 h-8 rounded-xl flex items-center justify-center hover:bg-gray-100 transition-all duration-200 active:scale-95'
            >
              <BiMenu className='w-5 h-5 text-gray-600' />
            </span>
          </header>
          
          <div className='flex-1 space-y-2 p-3'>
            <h1 className='text-[12px] font-semibold text-gray-500 uppercase tracking-wider mb-4'>
              Main Menu
            </h1>
            <div className='flex-1 space-y-1'>
              {navigations.map((nav) => (
                <NavLink
                  key={nav.id}
                  to={nav.path}
                  className={({ isActive }) =>
                    `block w-full h-[40px] rounded-lg text-[13px] flex items-center p-3 font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-700 to-blue-800 text-white shadow-md shadow-blue-200'
                        : 'text-gray-700 hover:bg-gray-50 hover:shadow-sm hover:translate-x-1'
                    }`
                  }
                >
                  <span className={`mr-3 ${nav.id === 1 ? 'text-white' : ''}`}>
                    {nav.icon}
                  </span>    
                  {nav.name}
                </NavLink>
              ))}
              
              <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-4"></div>
              
              <div className="flex-1 space-y-1">
                {navigations2.map((nav) => (
                  <NavLink 
                    key={nav.id} 
                    to={nav.path} 
                    className={({isActive}) => `
                      block w-full h-[36px] rounded-lg text-[13px] flex items-center p-3 font-medium transition-all duration-200 ${
                        isActive 
                        ? 'bg-gradient-to-r from-blue-700 to-blue-800 text-white shadow-md shadow-blue-200' 
                        : 'text-gray-700 hover:bg-gray-50 hover:shadow-sm hover:translate-x-1'
                      }`
                    }
                  >
                    <span className='mr-3 '>
                      {nav.icon}
                    </span>    
                    {nav.name}
                  </NavLink>
                ))}
              </div>
              
              <div className="bg-gradient-to-br from-gray-50 to-white w-full rounded-xl border border-gray-200 mt-8 p-5 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex justify-center">
                  <h1 className='font-semibold text-center text-[14px] text-gray-800 mb-1'>
                    Contact developer
                  </h1>
                </div>
                <div className="flex justify-center">
                  <p className='font-normal text-[12px] text-gray-600 text-center leading-relaxed'>
                    Found a bug or any issue you don't know how to solve?
                  </p>
                </div>
                <div className="flex justify-center items-center mt-3 p-2 cursor-pointer group">
                  <h2 className='font-medium text-[13px] text-blue-700 group-hover:text-blue-800 transition-colors'>
                    Contact support
                  </h2>
                  <BsArrowRight className='w-4 mt-[1px] ml-2 h-4 text-blue-700 group-hover:text-blue-800 group-hover:translate-x-1 transition-all duration-200'/>
                </div>
              </div>
            </div>
          </div>
        </aside>
) : (
  <aside className='w-[60px] p-5 sm:h-screen h-[832px] bg-gradient-to-b from-zinc-50 to-zinc-100  flex flex-col items-center'>
    
    {/* Toggle button */}
    <header className='w-full flex justify-center mb-6'>
      <span 
        onClick={handleNav} 
        className='cursor-pointer p-2 rounded-xl flex items-center justify-center hover:bg-blue-50 transition-all duration-200 active:scale-95'
      >
        <BsArrow90DegRight className='w-5 h-5 text-gray-500 hover:text-blue-700 transition-colors' />
      </span>
    </header>

    {/* ICON NAV */}
    <div className="flex flex-col items-center space-y-3 mt-4">
      {navigations.map((nav) => (
        <NavLink
          key={nav.id + nav.path}
          to={nav.path}
          title={nav.name}
          className={({ isActive }) =>
            `w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-200 ${
              isActive
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`
          }
        >
          {nav.icon}
        </NavLink>
      ))}
    </div>
        <div className="flex flex-col items-center space-y-3 mt-20">
      {navigations2.map((nav) => (
        <NavLink
          key={nav.id + nav.path}
          to={nav.path}
          title={nav.name}
          className={({ isActive }) =>
            `w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-200 ${
              isActive
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`
          }
        >
          {nav.icon}
        </NavLink>
      ))}
    </div>
  </aside>
)}

       <main className="flex-1 flex flex-col overflow-hidden">
         <Header isNavOpen={isNavOpen} />
         <div className="flex-1 px-4 py-1 h-full overflow-auto">
           <Outlet />
         </div>
       </main>
    </div>
  )
}

export default LayOut