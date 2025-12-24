import { useState } from 'react'
import logo from "/Icona/logo.png"
import axios from 'axios'
import { BsApple, BsEye, BsEyeSlash, BsShieldCheck, BsRocket } from 'react-icons/bs'
import { FaFacebook } from 'react-icons/fa'
import { FiCheckCircle } from 'react-icons/fi'
import { HiOutlineAcademicCap, HiOutlineUserGroup } from 'react-icons/hi'
import { MdOutlineSchool } from 'react-icons/md'
import landing from '/images/landing.png'
import { useNavigate } from 'react-router-dom'
import Google from "/Icona/google.png"

interface UserLoginInfo {
    email: string,
    password: string
}

function Login() {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [rememberMe, setRememberMe] = useState<boolean>(false)
    const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const navigate = useNavigate()

    const socialLogins = [
        { "id": 1, "name": "facebook", "icon": <FaFacebook className='w-5 h-5 text-white' />, color: "bg-[#1877F2] hover:bg-[#166FE5]" },
        { "id": 2, "name": "google", "icon": <img src={Google} className="w-5 h-5" />, color: "bg-white text-gray-800 hover:bg-gray-50 border border-gray-200" },
        { "id": 3, "name": "apple", "icon": <BsApple className='w-5 h-5' />, color: "bg-black hover:bg-gray-900 text-white" }
    ]

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500))
            // Your actual API call here
            // const res = await axios.post("", { email, password })
            setIsLoading(false)
            navigate("/dashboard", { viewTransition: true })
        } catch (error) {
            setIsLoading(false)
            console.error(error)
        }
    }

    return (
        <div className='w-full min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4'>
            <div className="w-full max-w-7xl flex flex-col lg:flex-row rounded-2xl overflow-hidden shadow-2xl bg-white">
                
                {/* Left Panel - Login Form */}
                <div className="lg:w-1/2 w-full p-8 lg:p-12 xl:p-16">
                    <div className="max-w-md mx-auto h-full flex flex-col">
                        
                        {/* Header */}
                        <header className='mb-8'>
                            <div className='flex items-center gap-2 mb-6'>
                                <div className="p-2 bg-blue-100 rounded-xl">
                                    <img src={logo} className='w-8 h-8' alt="Vuduka Logo" />
                                </div>
                                <div>
                                    <h2 className='text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
                                        VUDUKA
                                    </h2>
                                    <p className='text-xs text-gray-500 font-medium'>Enterprise Edition</p>
                                </div>
                            </div>
                            
                            <div className="mb-2">
                                <h1 className='text-3xl lg:text-4xl font-bold text-gray-900 mb-3'>
                                    Welcome Back
                                </h1>
                                <p className='text-gray-600 text-lg'>
                                    Sign in to your school management portal
                                </p>
                            </div>
                        </header>

                        {/* Form */}
                        <div className="flex-1">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Email Input */}
                                <div className="group">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full px-4 py-3.5 pl-12 bg-gray-50 border border-gray-200 rounded-xl 
                                                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                                                       transition-all duration-300 text-gray-900 placeholder-gray-400
                                                       group-hover:border-gray-300"
                                            placeholder="Enter your email"
                                            required
                                        />
                                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Password Input */}
                                <div className="group">
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="block text-sm font-semibold text-gray-700">
                                            Password
                                        </label>
                                        <button
                                            type="button"
                                            onClick={() => navigate("/forgot-password", { viewTransition: true })}
                                            className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                                        >
                                            Forgot password?
                                        </button>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type={isPasswordShown ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full px-4 py-3.5 pl-12 pr-12 bg-gray-50 border border-gray-200 rounded-xl 
                                                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                                                       transition-all duration-300 text-gray-900 placeholder-gray-400
                                                       group-hover:border-gray-300"
                                            placeholder="Enter your password"
                                            required
                                        />
                                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setIsPasswordShown(!isPasswordShown)}
                                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            {isPasswordShown ? 
                                                <BsEyeSlash className="w-5 h-5" /> : 
                                                <BsEye className="w-5 h-5" />
                                            }
                                        </button>
                                    </div>
                                </div>

                                {/* Remember Me & Submit */}
                                <div className="flex items-center justify-between">
                                    <label className="flex items-center space-x-3 cursor-pointer group">
                                        <div className="relative">
                                            <input
                                                type="checkbox"
                                                checked={rememberMe}
                                                onChange={(e) => setRememberMe(e.target.checked)}
                                                className="sr-only"
                                            />
                                            <div className={`w-5 h-5 rounded border-2 transition-all duration-300 
                                                ${rememberMe ? 'bg-blue-600 border-blue-600' : 'border-gray-300 group-hover:border-blue-400'}`}>
                                                {rememberMe && (
                                                    <FiCheckCircle className="w-4 h-4 text-white absolute top-0.5 left-0.5" />
                                                )}
                                            </div>
                                        </div>
                                        <span className="text-gray-700 font-medium">Remember me</span>
                                    </label>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className={`w-full py-3.5 px-6 rounded-xl font-semibold text-white transition-all duration-300
                                                ${isLoading ? 'bg-blue-400' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'} 
                                                transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl`}
                                >
                                    {isLoading ? (
                                        <div className="flex items-center justify-center">
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                                            Signing in...
                                        </div>
                                    ) : (
                                        'Sign In'
                                    )}
                                </button>

                                {/* Divider */}
                                <div className="relative my-8">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-200"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-4 bg-white text-gray-500">Or continue with</span>
                                    </div>
                                </div>

                                {/* Social Logins */}
                                <div className="grid grid-cols-3 gap-3">
                                    {socialLogins.map((item) => (
                                        <button
                                            key={item.id}
                                            type="button"
                                            className={`${item.color} py-3 rounded-xl flex items-center justify-center 
                                                        transition-all duration-300 transform hover:-translate-y-0.5 
                                                        shadow-md hover:shadow-lg`}
                                        >
                                            {item.icon}
                                        </button>
                                    ))}
                                </div>

                                {/* Sign Up Link */}
                                <p className="text-center text-gray-600 pt-4">
                                    Don't have an account?{' '}
                                    <button
                                        type="button"
                                        onClick={() => navigate("/signup", { viewTransition: true })}
                                        className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                                    >
                                        Create account
                                    </button>
                                </p>
                            </form>
                        </div>

                        {/* Security Note */}
                        <div className="mt-8 pt-6 border-t border-gray-100">
                            <div className="flex items-center justify-center text-xs text-gray-500">
                                <BsShieldCheck className="w-4 h-4 mr-2 text-green-500" />
                                Protected by enterprise-grade security & encryption
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel - Hero Section */}
                <div className="lg:w-1/2 w-full bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 p-8 lg:p-12 xl:p-16 relative overflow-hidden">
                    
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-400 rounded-full blur-3xl"></div>
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

                    <div className="relative z-10 h-full flex flex-col">
                        
                        {/* Hero Content */}
                        <div className="flex-1">
                            <div className="max-w-lg">
                                <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-8">
                                    <span className="text-sm font-medium text-white">Trusted by 500+ Institutions</span>
                                </div>

                                <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                                    Transform Your Educational Institution
                                </h2>
                                
                                <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                                    The most comprehensive school management system designed for modern educational institutions.
                                    Streamline operations, enhance learning, and connect communities.
                                </p>

                              
                            </div>
                        </div>

                        {/* Dashboard Preview */}
                        <div className="relative mt-auto">
                            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl"></div>
                            <div className="relative bg-white/10 backdrop-blur-sm rounded-xl p-2 border border-white/20">
                                <div className="flex items-center gap-2 mb-3 px-2">
                                    <div className="flex gap-1">
                                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                    </div>
                                    <div className="text-xs text-white/70 ml-2">Vuduka Dashboard Preview</div>
                                </div>
                                <img
                                    src={landing}
                                    alt="Vuduka Dashboard"
                                    className="w-full h-auto rounded-lg shadow-2xl transform hover:scale-[1.02] transition-transform duration-500"
                                />
                            </div>

                            {/* Stats */}
                            <div className="flex items-center justify-between mt-6 text-white/80">
                                <div className="text-center">
                                    <div className="text-2xl font-bold">98%</div>
                                    <div className="text-sm">User Satisfaction</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold">24/7</div>
                                    <div className="text-sm">Support Available</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold">99.9%</div>
                                    <div className="text-sm">Uptime SLA</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Floating Elements */}
                    <div className="absolute top-1/4 right-8 animate-float">
                        <div className="w-4 h-4 rounded-full bg-blue-300/30"></div>
                    </div>
                    <div className="absolute bottom-1/3 left-12 animate-float animation-delay-1000">
                        <div className="w-3 h-3 rounded-full bg-indigo-300/30"></div>
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