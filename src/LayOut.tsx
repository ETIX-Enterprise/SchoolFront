import  { useState } from 'react'
import {  BiMenu, BiUser} from 'react-icons/bi'
import logo from "/Icona/logo.png"
import { NavLink } from 'react-router-dom'
import { MdDashboardCustomize } from 'react-icons/md'
import {  BsArrow90DegRight } from 'react-icons/bs'


function LayOut() {
  const navigations = [
    {'id':1 , 'name':'OVERVIEW' , 'path':'/' , 'icon' : <MdDashboardCustomize className='w-5 h-5' /> },
    {'id':2 , 'name':'Students' , 'path':'/students' , 'icon' :  <BiUser className='w-5 h-5' />},
    {'id':3 , 'name':'Students' , 'path':'/students' ,'icon' : <MdDashboardCustomize className='w-5 h-5' />} ,
    {'id':4 , 'name':'Students' , 'path':'/students' , 'icon' : <MdDashboardCustomize className='w-5 h-5' />} 
  ]

  const [ isNavOpen , setIsNavOpen] = useState(true)
  const handleNav = ()=>{
    if(!isNavOpen){
      setIsNavOpen(true)
    }else{
      setIsNavOpen(false)
    }
  }
  return (
    <div className='w-full h-screen'>
      {isNavOpen ?
     <aside className='w-[243px] p-5 sm:h-screen h-[832px] bg-[#0000000A]'>
        <header className='p-2 w-full flex justify-between'>
            <span className='flex'>
                <img src={logo} className='w-6 h-6' />
            <h2 className='text-blue-700 font-bold mt-[1px] text-[17px]'>VUDUKA</h2>
            </span>
            <span onClick={handleNav} className='cursor-pointer w-8 h-8 rounded-xl items-center text-center flex justify-center hover:bg-gray-200'>
            <BiMenu  className='w-5 h-5 text-gray-600' />
            </span>
        </header>
       
 <div className='flex-1 space-y-3 p-4'>
  <h1 className='text-[14px] font-light text-[#2F2B3DB2]'>Main Menu</h1>
  <div className='flex-1 mt-5 space-y-3'>
{navigations.map((nav)=>(
  <>
  <NavLink
  to={nav.path}
  className={({ isActive }) =>
    `block w-[180px] h-[40px] rounded-[7px] text-[14px] flex items-center justify-center font-normal transition ${
      isActive
        ? 'bg-blue-700 hover:bg-blue-800 text-white'
        : 'text-gray-600 hover:bg-gray-200'
    }`
  }
>
  <span className='mr-1'>
 {nav.icon}
  </span>
  {nav.name}
</NavLink>
  </>
))}
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
    </div>
    
  )
}

export default LayOut