import { useState } from 'react'
import logo from "/Icona/logo.png"
import axios from 'axios'
import { BsApple, BsEye , BsEyeSlash } from 'react-icons/bs'
import { FaFacebook } from 'react-icons/fa'
import Google from "/Icona/google.png"
import landing from '/images/landing.png'
import { useNavigate} from 'react-router-dom'


function Signup() {
   
   //form data
   const [email , setEmail] = useState<string>("")
   const [name , setName] = useState<string>("")
   const [phoneNumber , setPhoneNumber] = useState<string>()
   const [password , setPassowrd] = useState<string>("")
   const [confirmPassword  , setConfirmPassword] = useState<string>()
   const [rememberMe , setRememberMe] = useState<boolean>(false)
   //track the password
   const [isPasswordShown , setIsPasswordShown] = useState<boolean>(false)

   //social logins
   const socialLogins = [
    {"id":1 , "name":"facebook" , "icon":<FaFacebook className='w-5 h-5 text-blue-600' />},
    {"id":2  , "name" : "google" , "icon":<img  src={Google}  className='w-5 h-5'/>},
    {"id":3 , "name":"apple" , "icon":<BsApple  className='w-5 h-5 text-black'/>}
   ]

   
   const navigate = useNavigate()


  
  // function to handle form submmission
  const handleSubmit = async()=>{
    try {
       const res = await axios.post("" ,{
        header :{},
        body:{}
       })
    } catch (error) {
      
    }
  }



  return (
    <div className='w-full sm:flex h-screen'>
      {/* login form  */}
      <div className="sm:w-1/2 w-full flex-1 overflow-auto space-y-2 h-full py-5 px-10">
             <header className='p-2'>
            <span className='flex'>
                <img src={logo} className='w-7 mr-1 h-7' />
            <h2 className='text-[#003DD0] font-bold  mt-[5px] text-[13px] font-montserrat'>VUDUKA</h2>
       </span>
       <div className="flex-1 space-y-1">
        <h1 className='text-[#000000] text-[30px] font-medium'>Sign up</h1>
        <p className='text-[16px] text-[#2F2B3DB2] '>
          Let’s get you all st up so you can access your personal account.
        </p>
       </div>
        </header>
        <div className="mt-7 ">
          <form action="" onSubmit={handleSubmit} method="post">

            {/** name input */}
           <div className="flex-1 space-y-5">

                            <div className="relative w-full max-w-md">
      <input
        type="text"
        value={name}
        onChange={(e)=> setName(e.target.value)}
        className="peer sm:w-[512px] sm:h-[45px] w-full border border-gray-600 text-zinc-600 text-[14px] font-medium rounded-md p-4 pt-6 focus:outline-none focus:ring-1 focus:ring-gray-500"
        placeholder=" "
      />
      <label
        htmlFor="email"
        className="absolute text-gray-700 text-sm top-2 left-4 bg-white px-1 transition-all duration-200
                   peer-placeholder-shown:top-[-10px]  peer-placeholder-shown:text-[15px] peer-placeholder-shown:text-zinc-500
                   peer-focus:top-[-10px] peer-focus:text-sm peer-focus:text-gray-700"
      >
       Name
      </label>
    </div>

<div className="flex justify-between space-x-2 max-w-[512px]">
  {/** email input */}
    <div className="relative w-full max-w-md">
      <input
        type="text"
        value={email}
        onChange={(e)=> setEmail(e.target.value)}
        className="peer  sm:h-[45px] w-full border border-gray-600 text-zinc-600 text-[14px] font-medium rounded-md p-4 pt-6 focus:outline-none focus:ring-1 focus:ring-gray-500"
        placeholder=" "
      />
      <label
        htmlFor="email"
        className="absolute text-gray-700 text-sm top-2 left-4 bg-white px-1 transition-all duration-200
                   peer-placeholder-shown:top-[-10px]  peer-placeholder-shown:text-[15px] peer-placeholder-shown:text-zinc-500
                   peer-focus:top-[-10px] peer-focus:text-sm peer-focus:text-gray-700"
      >
       Email
      </label>
    </div>
    {/** phone number input */}
                    <div className="relative w-full max-w-md">
      <input
        type='number'
        value={phoneNumber}
        onChange={(e)=> setPhoneNumber(e.target.value)}
        className="peer  sm:h-[45px] w-full border border-gray-600 text-zinc-600 text-[14px] font-medium rounded-md p-4 pt-6 focus:outline-none focus:ring-1 focus:ring-gray-500"
        placeholder=" "
      />
      <label
        htmlFor="email"
        className="absolute text-gray-700 text-sm top-2 left-4 bg-white px-1 transition-all duration-200
                   peer-placeholder-shown:top-[-10px]  peer-placeholder-shown:text-[15px] peer-placeholder-shown:text-zinc-500
                   peer-focus:top-[-10px] peer-focus:text-sm peer-focus:text-gray-700"
      >
       Phone number
      </label>
    </div>
</div>

    {/** password input */}

                    <div className="relative w-full max-w-md">
      <input
        type={isPasswordShown ? "text" : "password"}
        value={password}
        onChange={(e)=> setPassowrd(e.target.value)}
        className="peer sm:w-[512px] sm:h-[45px] w-full border border-gray-600 text-zinc-600 text-[14px] font-medium rounded-md p-4 pt-6 focus:outline-none focus:ring-1 focus:ring-gray-500"
        placeholder=" "
      />
      <label
        htmlFor="password"
        className="absolute   w-28 h-5   text-gray-700 text-[13px] top-2 left-4 bg-white px-1 transition-all duration-200
                   peer-placeholder-shown:top-[-10px] peer-placeholder-shown:text-[15px] peer-placeholder-shown:text-zinc-500
                   peer-focus:top-[-10px] peer-focus:text-sm peer-focus:text-gray-700"
      >
      <p className='w-32'>Password</p> 

      </label>
            <span onClick={()=> setIsPasswordShown(prev => !prev)} className=" transition-all duration-700 cursor-pointer p-2 hover:bg-gray-200 rounded-full sm:absolute left-[450px] top-[9px]">
        {isPasswordShown ? <BsEye  className='text-black w-4 h-4'/> : 
        <BsEyeSlash  className='text-black w-4 h-4'/>}
      </span>

    </div>
    
    {/** confirm password input */}

                    <div className="relative w-full max-w-md">
      <input
        type={isPasswordShown ? "text" : "password"}
        value={confirmPassword}
        onChange={(e)=> setConfirmPassword(e.target.value)}
        className="peer sm:w-[512px] sm:h-[45px] w-full border border-gray-600 text-zinc-600 text-[14px] font-medium rounded-md p-4 pt-6 focus:outline-none focus:ring-1 focus:ring-gray-500"
        placeholder=" "
      />
      <label
        htmlFor="password"
        className="absolute   w-28 h-5   text-gray-700 text-[13px] top-2 left-4 bg-white px-1 transition-all duration-200
                   peer-placeholder-shown:top-[-10px] peer-placeholder-shown:text-[15px] peer-placeholder-shown:text-zinc-500
                   peer-focus:top-[-10px] peer-focus:text-sm peer-focus:text-gray-700"
      >
      <p className='w-32'>Confirm password</p> 

      </label>
            <span onClick={()=> setIsPasswordShown(prev => !prev)} className=" transition-all duration-700 cursor-pointer p-2 hover:bg-gray-200 rounded-full sm:absolute left-[450px] top-[9px]">
        {isPasswordShown ? <BsEye  className='text-black w-4 h-4'/> : 
        <BsEyeSlash  className='text-black w-4 h-4'/>}
      </span>

    </div>
    <div className="flex justify-center max-w-[512px]">
      <div className="">
        <input type="checkbox"  name='Remember me' onChange={()=> setRememberMe(true)} className='w-[20px] h-[20px] transition-all duration-700 rounded-[5px] cursor-pointer appearance-none  border border-gray-400 checked:bg-blue-700 checked:border-2 checked:border-blue-700 ' id="" />
      </div>
      <div className="  ml-2  ">
        <p className='text-[14px] text-gray-400 font-medium'>I agree to all the <span className='text-[#FF8682] font-medium'> Terms</span> and <span className='text-[#FF8682] font-medium'>Privacy Policies</span></p>
      </div>
    </div>
    {/* submission button*/ }
    <div className="flex-1  space-y-3">
       <button className='bg-[#699BFE] cursor-pointer text-[14px] font-semibold text-white hover:bg-[#528bfe] hover:scale-105 transition-all duration-700 sm:w-[512px] w-full h-[48px] rounded-[4px]'>
        Sign up
       </button>
       <p className='font-medium text-center text-[14px] text-black'>
        Already have an account? <span onClick={()=> navigate("/" ,{viewTransition:true})} className='text-[#FF8682] cursor-pointer hover:bg-[#FF8682]/10 rounded transition-colors duration-500'>Login</span>
       </p>
    </div>
    {/** social logins */}
    <div className="flex justify-between max-w-[512px]">
    {socialLogins.map((item)=>(
      <div className="w-[160px] h-[56px] rounded-[4px] border border-[#699BFE] hover:bg-[#699BFE] hover:scale-105 transition-all duration-700 cursor-pointer flex items-center justify-center p-2 " key={item.id}>
      {item.icon}
      </div>
    ))}
    </div>
           </div>
          </form>
        </div>
      </div>
      {/* aside description */}
<div className="w-1/2 sm:block hidden h-full p-8 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 relative overflow-hidden">
  {/* Modern Decorative Elements */}
  <div className="absolute inset-0">
    <div className="absolute top-8 right-12 w-6 h-6 border-2 border-white/20 rounded-lg transform rotate-45"></div>
    <div className="absolute top-16 right-24 w-4 h-4 border border-white/15 rounded-full"></div>
    <div className="absolute bottom-32 left-10 w-8 h-8 border-2 border-white/20 rounded-lg transform -rotate-12"></div>
    <div className="absolute bottom-20 right-16 w-3 h-3 bg-white/10 rounded-full"></div>
    <div className="absolute top-1/4 left-1/4 w-12 h-12 border-2 border-white/10 rounded-full"></div>
  </div>

  {/* Content Container */}
  <div className="relative z-10 h-full flex flex-col">
    {/* Header Section */}
    <div className="text-left mb-12">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-3 h-8 bg-blue-300 rounded-full"></div>
        <h1 className="text-2xl font-bold text-white">Vuduka</h1>
      </div>
      <p className="text-white text-lg font-semibold mb-2">
        School Management System
      </p>
      <div className="w-12 h-1 bg-blue-300 rounded-full mb-4"></div>
      <p className="text-blue-100 text-sm leading-relaxed max-w-xs">
        Streamlining educational journeys so institutions can focus 
        on what truly matters - student learning and growth.
      </p>
    </div>

    {/* Image Section */}
    <div className="flex-1 flex items-end justify-center">
      <div className="relative">
        <div className="absolute -inset-4 bg-white/5 rounded-2xl transform rotate-3"></div>
        <img 
          src={landing} 
          alt="School Management Dashboard Preview" 
          className="relative w-full max-w-sm sm:h-[300px] h-auto rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
        />
      </div>
    </div>

    {/* Feature Highlights */}
    <div className="mt-1 flex justify-center">
      <div className="flex items-center space-x-6 text-white/80">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
          <span className="text-[12px] font-medium">Smart Transport</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
          <span className="text-[12px] font-medium">Secure</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
          <span className="text-[12px] font-medium">Efficient</span>
        </div>
      </div>
    </div>
  </div>

  {/* Bottom Gradient Overlay */}
  <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-blue-600/50 to-transparent"></div>
</div>
    </div>
  )
}

export default Signup