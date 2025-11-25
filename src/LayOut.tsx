import { useCallback, useEffect, useState } from 'react'
import {  BiArrowFromLeft, BiMenu, BiUser} from 'react-icons/bi'
import logo from "/Icona/logo.png"
import { NavLink } from 'react-router-dom'
import {  BsArrow90DegRight, BsArrowLeft, BsArrowRight } from 'react-icons/bs'
import dashboard from '/Icona/dashboard.png'
import students from '/Icona/students.png'
import payment from '/Icona/payment.png'
import bookinga from '/Icona/bookinga.png'
import report from '/Icona/reports.png'
import support from '/Icona/support.png'
import tracking from '/Icona/tracking.png'
import notifications from '/Icona/notifications.png'
import Header from './components/header' 
import UseIsSmallScreen from './Hooks/UseIsSmallScreen'
import { Outlet } from 'react-router-dom'

function LayOut() {
  const isSmallScreen = UseIsSmallScreen()
  // track for small screen
  useEffect(() =>{
    if(isSmallScreen == true){
      setIsNavOpen(false);
    }else{
      setIsNavOpen(true)
    }
  } ,[isSmallScreen])
  
  const navigations = [
    {'id':1 , 'name':'OVERVIEW' , 'path':'/Dashboard/overview' , 'icon' : <img src={dashboard} className='w-5 h-5' /> },
    {'id':2 , 'name':'Students' , 'path':'/Dashboard/students' , 'icon' :  <img src={students} className='w-5 h-5' />},
    {'id':3 , 'name':'Bookings' , 'path':'/Dashboard/booking' ,'icon' : <img src={bookinga} className='w-5 h-5' />} ,
    {'id':4 , 'name':'Payments' , 'path':'/Dashboard/payment' , 'icon' : <img src={payment} className='w-5 h-5' />} ,
    {'id':5 , 'name':'Reports' , 'path': '/Dashboard/reports' , 'icon' : <img src={report }  className='w-5 h-5'/>}
  ]
 const navigations2 = [
  {'id':1  , 'name' : 'Tracking' , 'path':'/tracking' , 'icon':<img src={tracking} className='w-5 h-5' /> },
  {'id':2  , 'name' : 'Notifications' , 'path':'/Notifications' , 'icon':<img src={notifications} className='w-5 h-5' /> },
  {'id':3  , 'name' : 'Support' , 'path':'/Support' , 'icon':<img src={support} className='w-5 h-5' /> },
 ]
  const [ isNavOpen , setIsNavOpen] = useState(true)
  const handleNav = useCallback( ()=>{
    if(!isNavOpen){
      setIsNavOpen(true)
    }else{
      setIsNavOpen(false)
    }
  } , [isNavOpen])
  return (
    /* --- MINIMAL CHANGE: make top-level a flex row so sidebar + main sit side-by-side --- */
    <div className='w-full h-screen flex'>
      {isNavOpen ?
     <aside className='w-[243px] p-5 overflow-auto sm:h-screen h-[832px] bg-[#0000000A]'>
        <header className='p-2 w-full flex justify-between'>
            <span className='flex'>
                <img src={logo} className='w-7 mr-1 h-7' />
            <h2 className='text-blue-700 font-bold  mt-1 text-[17px]'>VUDUKA</h2>
            </span>
            <span onClick={handleNav} className='cursor-pointer w-8 h-8 rounded-xl items-center text-center flex justify-center hover:bg-gray-200'>
            <BiMenu  className='w-5 h-5 text-[#B3B3B3]' />
            </span>
        </header>
       
 <div className='flex-1 space-y-2 p-3'>
  <h1 className='text-[14px] font-light text-[#2F2B3DB2]'>Main Menu</h1>
  <div className='flex-1 mt-5 space-y-2'>
{navigations.map((nav)=>(
  
  <NavLink
  key={nav.id}
  to={nav.path}
  className={({ isActive }) =>
    `block w-[180px] h-[37px] rounded-lg text-[13px] flex  p-2 font-normal transition ${
      isActive
        ? 'bg-blue-800 hover:bg-blue-800  text-white'
        : 'text-[#2F2B3DB2] hover:bg-gray-200'
    }`
  }
>
  <span className='mr-2 text-[#2F2B3DB2]/90 '> 
 {nav.icon}
  </span>    
  {nav.name}
</NavLink>
 
))}
<div className="w-[191px] h-[1px] bg-[#B3B3B3]"></div> 
<div className="flex-1 space-y-2 mt-5">
  {navigations2.map((nav)=> (

    <NavLink key={nav.id} to={nav.path} className={({isActive})=> `
    block w-[180px] h-[32px] rounded-[6px] text-[13px] flex  p-2 font-normal transition ${isActive ? 
    'bg-[#003DD0] hover:bg-blue-800  text-white' 
    : ' text-[#2F2B3DB2]  hover:bg-gray-200 ' }`}>
  <span className='mr-2 text-[#2F2B3DB2]/90 '> 
  {nav.icon}
  </span>    
      {nav.name}
    </NavLink>
   
  ))}
</div>
<div className="bg-[#4F4F4F1A] w-[190px] h-[149px] mt-10 p-[26px] gap-[4px]">
  <div className="flex">
  <h1 className='font-semibold text-center text-[14px] text-[#003DD0]'>Contact developer</h1>
  </div>
  <div className="flex justify-center">
  <p className='font-medium text-[14px] text-[#2F2B3DB2]'>
    Found a bug or any problem that you don’t know about ?
  </p>
  </div>
  <div className="flex justify-center p-2">
    <h2 className='font-medium text-[14px] text-[#003DD0]'>
      Hit the dev 
    </h2>
    <BsArrowRight className='w-5 mt-[1px] ml-2 h-5 text-[#003DD0]'/>
  </div>
</div>
  </div>
</div>
     </aside>
      :
           <aside className='w-[50px] p-5 sm:h-screen h-[832px] bg-[#0000000A]'>
        <header className=' w-full flex justify-center'>
            <span onClick={handleNav} className='cursor-pointer p-2 rounded-xl items-center text-center flex justify-center hover:bg-gray-200'>
            <BsArrow90DegRight  className='w-5 h-5 text-gray-600' />
            </span>
        </header>
        
        </aside>
       }

       {/* --- MINIMAL CHANGE: put Header and Outlet into a main column so Outlet becomes the main content --- */}
       <main className="flex-1 flex flex-col">
         <Header  isNavOpen={isNavOpen}/>
         <div className="flex-1 pt-10 mt-5 h-full overflow-auto">
           <Outlet />
         </div>
       </main>
    </div>
    
  )
}

export default LayOut
