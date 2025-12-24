import { useState } from 'react'
import { BsApple, BsEye, BsEyeSlash, BsShieldCheck } from 'react-icons/bs'
import { FaFacebook } from 'react-icons/fa'
import { FiCheckCircle } from 'react-icons/fi'
import logo from "/Icona/logo.png"
import Google  from "/Icona/google.png"
import landing from "/images/landing.png"

function Login() {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [rememberMe, setRememberMe] = useState<boolean>(false)
    const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const socialLogins = [
        { "id": 1, "name": "facebook", "icon": <FaFacebook className='w-4 h-4 text-white' />, color: "bg-[#1877F2] hover:bg-[#166FE5]" },
        { "id": 2, "name": "google", "icon": <img src={Google} className="w-4 h-4" alt="Google" />, color: "bg-white text-gray-800 hover:bg-gray-50 border border-gray-200" },
        { "id": 3, "name": "apple", "icon": <BsApple className='w-4 h-4' />, color: "bg-black hover:bg-gray-900 text-white" }
    ]

    const handleSubmit = async () => {
        setIsLoading(true)
        try {
            await new Promise(resolve => setTimeout(resolve, 1500))
            setIsLoading(false)
            console.log("Login successful")
        } catch (error) {
            setIsLoading(false)
            console.error(error)
        }
    }

    return (
        <div className='w-full h-screen overflow-hidden'>
            <div className="w-full h-full flex flex-col lg:flex-row bg-white">
                
                {/* Left Panel - Login Form */}
                <div className="lg:w-1/2 w-full  py-6 lg:py-7 overflow-y-auto">
                    <div className="max-w-md mx-18">
                        
                        {/* Header */}
                        <header className='mb-6'>
                            <div className='flex items-center gap-2 mb-1'>
                                <img src={logo} className='w-5 h-5' alt="Vuduka Logo" />
                                <div>
                                    <h2 className='text-[18px] font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
                                        VUDUKA
                                    </h2>
                                    <p className='text-[10px] text-gray-500 font-medium'>Enterprise Edition</p>
                                </div>
                            </div>
                            
                            <div>
                                <h1 className='text-[25px] font-bold text-gray-900 mb-1'>
                                    Welcome Back
                                </h1>
                                <p className='text-gray-600 text-[14px]'>
                                    Sign in to your school management portal
                                </p>
                            </div>
                        </header>

                        {/* Form */}
                        <div className="space-y-3">
                            {/* Email Input */}
                            <div className="group">
                                <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-4 py-3 pl-10 bg-gray-50 border border-gray-200 rounded-lg 
                                                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                                                   transition-all duration-200 text-[14px] text-gray-900 placeholder-gray-400
                                                   group-hover:border-gray-300"
                                        placeholder="Enter your email"
                                    />
                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Password Input */}
                            <div className="group">
                                <div className="flex justify-between items-center mb-1.5">
                                    <label className="block text-[13px] font-semibold text-gray-700">
                                        Password
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() => console.log("Forgot password")}
                                        className="text-[13px] font-medium text-blue-600 hover:text-blue-700 transition-colors"
                                    >
                                        Forgot password?
                                    </button>
                                </div>
                                <div className="relative">
                                    <input
                                        type={isPasswordShown ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-3 py-3 pl-10 pr-10 bg-gray-50 border border-gray-200 rounded-lg 
                                                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                                                   transition-all duration-200 text-[14px] text-gray-900 placeholder-gray-400
                                                   group-hover:border-gray-300"
                                        placeholder="Enter your password"
                                    />
                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setIsPasswordShown(!isPasswordShown)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {isPasswordShown ? 
                                            <BsEyeSlash className="w-4 h-4" /> : 
                                            <BsEye className="w-4 h-4" />
                                        }
                                    </button>
                                </div>
                            </div>

                            {/* Remember Me */}
                            <div className="flex items-center justify-between">
                                <label className="flex items-center space-x-2 cursor-pointer group">
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            checked={rememberMe}
                                            onChange={(e) => setRememberMe(e.target.checked)}
                                            className="sr-only"
                                        />
                                        <div className={`w-4 h-4 rounded border-2 transition-all duration-200 
                                            ${rememberMe ? 'bg-blue-600 border-blue-600' : 'border-gray-300 group-hover:border-blue-400'}`}>
                                            {rememberMe && (
                                                <FiCheckCircle className="w-3 h-3 text-white absolute top-0.5 left-0.5" />
                                            )}
                                        </div>
                                    </div>
                                    <span className="text-gray-700 text-[14px] font-medium">Remember me</span>
                                </label>
                            </div>

                            {/* Submit Button */}
                            <button
                                onClick={handleSubmit}
                                disabled={isLoading}
                                className={`w-full py-3 px-4 rounded-lg font-semibold text-[14px] text-white transition-all duration-200
                                            ${isLoading ? 'bg-blue-400' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'} 
                                            transform hover:-translate-y-0.5 shadow-md hover:shadow-lg`}
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                        Signing in...
                                    </div>
                                ) : (
                                    'Sign In'
                                )}
                            </button>

                            {/* Divider */}
                            <div className="relative my-5">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-200"></div>
                                </div>
                                <div className="relative flex justify-center text-[13px]">
                                    <span className="px-3 bg-white text-gray-500">Or continue with</span>
                                </div>
                            </div>

                            {/* Social Logins */}
                            <div className="grid grid-cols-3 gap-2.5">
                                {socialLogins.map((item) => (
                                    <button
                                        key={item.id}
                                        type="button"
                                        onClick={() => console.log(`${item.name} login`)}
                                        className={`${item.color} py-2.5 rounded-lg flex items-center justify-center 
                                                    transition-all duration-200 transform hover:-translate-y-0.5 
                                                    shadow-sm hover:shadow-md`}
                                    >
                                        {item.icon}
                                    </button>
                                ))}
                            </div>

                            {/* Sign Up Link */}
                            <p className="text-center text-gray-600 text-[14px] pt-3">
                                Don't have an account?{' '}
                                <button
                                    type="button"
                                    onClick={() => console.log("Navigate to signup")}
                                    className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                                >
                                    Create account
                                </button>
                            </p>
                        </div>


                    </div>
                </div>

                {/* Right Panel - Hero Section */}
                <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 p-8 relative overflow-hidden">
                    
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-400 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400 rounded-full blur-3xl"></div>
                    </div>

                    {/* Animated Grid */}
                    <div className="absolute inset-0 opacity-5">
                        {Array.from({ length: 20 }).map((_, i) => (
                            <div
                                key={i}
                                className="absolute w-px h-full bg-white"
                                style={{ left: `${(i + 1) * 5}%` }}
                            ></div>
                        ))}
                        {Array.from({ length: 20 }).map((_, i) => (
                            <div
                                key={i + 20}
                                className="absolute h-px w-full bg-white"
                                style={{ top: `${(i + 1) * 5}%` }}
                            ></div>
                        ))}
                    </div>

                    <div className="relative z-10 w-full flex flex-col justify-between">
                        
                        {/* Hero Content */}
                        <div>
                            <h2 className="text-[17px] font-semibold text-blue-500 mb-1 leading-tight">
                               School <span className='text-white'> Management</span>
                            </h2>
                            <h2 className="text-[26px] font-bold text-white mb-2 leading-tight">
                               GERAYO AMAHORO TODAY
                            </h2>
                            
                            <p className="text-[14px] text-blue-100 font-normal mb-6 leading-relaxed max-w-lg">
                                Manage , Monitor , coordinate and ensure eash student journey until arrival.
                            </p>
                        </div>

                        {/* Dashboard Preview */}
                        <div className="relative flex justify-center">
                            <div className="">
                            <div className="relative h-[300px] w-[300px] flex justify-center items-center rounded-lg  bg-black/30 rotate-12">

                                <img
                                    src={landing}
                                    alt="Vuduka Dashboard"
                                    className=" h-[290px] w-[290px] rounded  transform hover:scale-[1.02] transition-transform duration-500"
                                />
                            </div>

      
                        </div>
                        
                        </div>
                                              {/* Stats */}
                            <div className="flex items-center justify-around mt-5 text-white/80">
                                <div className="text-center">
                                    <div className="text-[17px] text-green-500 font-semibold">98%</div>
                                    <div className="text-[12px]">User Satisfaction</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-[17px] text-orange-400 font-semibold">24/7</div>
                                    <div className="text-[12px]">Support Available</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-[17px] text-black font-semibold">99.9%</div>
                                    <div className="text-[12px]">Uptime SLA</div>
                                </div>
                            </div>
                    </div>

                    {/* Floating Elements */}
                    <div className="absolute top-1/4 right-8 animate-float">
                        <div className="w-3 h-3 rounded-full bg-blue-300/30"></div>
                    </div>
                    <div className="absolute bottom-1/3 left-12 animate-float animation-delay-1000">
                        <div className="w-2.5 h-2.5 rounded-full bg-indigo-300/30"></div>
                    </div>
                </div>
            </div>

            {/* Add floating animation */}
            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }
                .animation-delay-1000 {
                    animation-delay: 1s;
                }
            `}</style>
        </div>
    )
}

export default Login