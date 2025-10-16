import { useState } from 'react'
import logo from "/Icona/logo.png"
import axios from 'axios'
import { BsApple, BsEye , BsEyeSlash } from 'react-icons/bs'
import { FaFacebook } from 'react-icons/fa'
import { GrGoogle } from 'react-icons/gr'
import landing from '/images/landing.png'

interface UserLoginInfo {
    email : string ,
    password : string
}
interface User extends UserLoginInfo {
    name : string
}




function Login() {
   
   const [email , setEmail] = useState<string>("")
   const [password , setPassowrd] = useState<string>("")
   const [rememberMe , setRememberMe] = useState<boolean>(false)
   //track the password
   const [isPasswordShown , setIsPasswordShown] = useState<boolean>(false)

   //social logins
   const socialLogins = [
    {"id":1 , "name":"facebook" , "icon":<FaFacebook className='w-5 h-5 text-blue-600' />},
    {"id":2  , "name" : "google" , "icon":<GrGoogle className='w-5 h-5 text-red-500' />},
    {"id":3 , "name":"apple" , "icon":<BsApple  className='w-5 h-5 text-black'/>}
   ]
  
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
      <div className="sm:w-1/2 w-full flex-1 space-y-2 h-full py-5 px-10">
             <header className='p-2'>
            <span className='flex'>
                <img src={logo} className='w-7 mr-1 h-7' />
            <h2 className='text-[#003DD0] font-bold  mt-1 text-[16px] font-montserrat'>VUDUKA</h2>
       </span>
       <div className="flex-1 space-y-1">
        <h1 className='text-[#000000] text-[40px] font-normal font-Quicksand'>Login</h1>
        <p className='text-[16px] text-[#2F2B3DB2] '>Login to access your Golobe account</p>
       </div>
        </header>
        <div className="mt-7">
          <form action="" onSubmit={handleSubmit} method="post">

            {/** email input */}
           <div className="flex-1 space-y-5">
                <div className="relative w-full max-w-md">
      <input
        type="text"
        value={email}
        onChange={(e)=> setEmail(e.target.value)}
        className="peer sm:w-[512px] sm:h-[52px] w-full border border-gray-400 text-zinc-600 text-[14px] font-medium rounded-md p-4 pt-6 focus:outline-none focus:ring-1 focus:ring-gray-500"
        placeholder=" "
      />
      <label
        htmlFor="email"
        className="absolute text-gray-500 text-sm top-2 left-4 bg-white px-1 transition-all duration-200
                   peer-placeholder-shown:top-[-10px]  peer-placeholder-shown:text-[15px] peer-placeholder-shown:text-zinc-400
                   peer-focus:top-[-10px] peer-focus:text-sm peer-focus:text-gray-700"
      >
       Enter your email
      </label>
    </div>

    {/** password input */}

                    <div className="relative w-full max-w-md">
      <input
        type={isPasswordShown ? "text" : "password"}
        value={password}
        onChange={(e)=> setPassowrd(e.target.value)}
        className="peer sm:w-[512px] sm:h-[52px] w-full border border-gray-400 text-zinc-600 text-[14px] font-medium rounded-md p-4 pt-6 focus:outline-none focus:ring-1 focus:ring-gray-500"
        placeholder=" "
      />
      <label
        htmlFor="password"
        className="absolute   w-28 h-5   text-gray-500 text-[13px] top-2 left-4 bg-white px-1 transition-all duration-200
                   peer-placeholder-shown:top-[-10px] peer-placeholder-shown:text-[15px] peer-placeholder-shown:text-zinc-400
                   peer-focus:top-[-10px] peer-focus:text-sm peer-focus:text-gray-700"
      >
      <p className='w-32'>Enter password</p> 

      </label>
            <span onClick={()=> setIsPasswordShown(prev => !prev)} className=" transition-all duration-700 cursor-pointer p-2 hover:bg-gray-200 rounded-full sm:absolute left-[450px] top-[9px]">
        {isPasswordShown ? <BsEye  className='text-black w-4 h-4'/> : 
        <BsEyeSlash  className='text-black w-4 h-4'/>}
      </span>

    </div>
    <div className="flex justify-between max-w-[512px]">
      <div className="flex space-x-2">
        <input type="checkbox"  name='Remember me' onChange={()=> setRememberMe(true)} className='w-[20px] h-[20px] transition-all duration-700 rounded-[5px] cursor-pointer appearance-none  border border-gray-400 checked:bg-blue-700 checked:border-2 checked:border-blue-700 ' id="" />
        <p className='text-[14px] text-[#000000] font-medium'>Remember me</p>
      </div>
      <div className="cursor-pointer hover:bg-gray-100  transition-all duration-500 rounded">
        <p className='text-[14px] text-[#FF8682] font-medium'>Forgot Password</p>
      </div>
    </div>
    {/* submission button*/ }
    <div className="flex-1  space-y-3">
       <button className='bg-[#699BFE] cursor-pointer text-[14px] font-semibold text-white hover:bg-[#528bfe] hover:scale-105 transition-all duration-700 sm:w-[512px] w-full h-[48px] rounded-[4px]'>
        Login
       </button>
       <p className='font-medium text-center text-[14px] text-black'>
        Don’t have an account? <span className='text-[#FF8682] cursor-pointer hover:bg-[#FF8682]/10 rounded transition-colors duration-500'>Sign up</span>
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
      <div className="w-1/2 sm:block hidden h-full p-5 bg-[#003DD099] ">
            <div className="flex">
        <div className="bg-[#003DD02E] w-[26px] h-[23px] absolute top-[14px] left-[1247px]"></div>
        <div className="bg-[#003DD02E] w-[26px] h-[23px] absolute top-[37px] left-[1169px]"></div>
        <div className="bg-[#003DD02E] w-[39px] h-[34px] absolute top-[82px] left-[1156px]"></div>
        <div className="bg-[#003DD02E] w-[26px] h-[23px] absolute top-[82px] left-[1207px]"></div>
        <div className="bg-[#003DD02E] w-[26px] h-[23px] absolute top-[48px] left-[1213px]"></div>
      </div>
      <div className="">
        <img src={landing} alt="landing" className='absolute top-[-4px] left-[630px] w-[300px] h-[400px]' />
      </div>
      </div>
    </div>
  )
}

export default Login