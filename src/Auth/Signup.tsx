import { useState } from 'react'
import { BsApple, BsEye, BsEyeSlash, BsShieldCheck } from 'react-icons/bs'
import { FaFacebook } from 'react-icons/fa'
import { FiUser, FiMail, FiLock, FiSmartphone, FiCheck } from 'react-icons/fi'
import logo from "/Icona/logo.png"
import Google  from "/Icona/google.png"
import landing from "/images/landing.png"

interface FormData {
    email: string
    name: string
    phoneNumber: string
    password: string
    confirmPassword: string
}

function Signup() {
    const [formData, setFormData] = useState<FormData>({
        email: "",
        name: "",
        phoneNumber: "",
        password: "",
        confirmPassword: ""
    })
    const [agreedToTerms, setAgreedToTerms] = useState<boolean>(false)
    const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false)
    const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [passwordStrength, setPasswordStrength] = useState<number>(0)

    const socialLogins = [
        { "id": 1, "name": "facebook", "icon": <FaFacebook className='w-4 h-4 text-white' />, color: "bg-[#1877F2] hover:bg-[#166FE5]" },
        { "id": 2, "name": "google", "icon": <img src={Google} className="w-4 h-4" alt="Google" />, color: "bg-white text-gray-800 hover:bg-gray-50 border border-gray-200" },
        { "id": 3, "name": "apple", "icon": <BsApple className='w-4 h-4' />, color: "bg-black hover:bg-gray-900 text-white" }
    ]

    const passwordRequirements = [
        { id: 1, text: "At least 8 characters", met: formData.password.length >= 8 },
        { id: 2, text: "Contains uppercase letter", met: /[A-Z]/.test(formData.password) },
        { id: 3, text: "Contains number", met: /[0-9]/.test(formData.password) }
    ]

    const handleChange = (field: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
        
        if (field === 'password') {
            calculatePasswordStrength(value)
        }
    }

    const calculatePasswordStrength = (password: string) => {
        let strength = 0
        if (password.length >= 8) strength += 33
        if (/[A-Z]/.test(password)) strength += 33
        if (/[0-9]/.test(password)) strength += 34
        setPasswordStrength(strength)
    }

    const getStrengthColor = () => {
        if (passwordStrength < 40) return "bg-red-500"
        if (passwordStrength < 80) return "bg-yellow-500"
        return "bg-green-500"
    }

    const handleSubmit = async () => {
        if (!agreedToTerms) {
            alert("Please agree to the terms and conditions")
            return
        }
        
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords don't match")
            return
        }

        setIsLoading(true)
        try {
            await new Promise(resolve => setTimeout(resolve, 1500))
            setIsLoading(false)
            console.log("Signup successful")
        } catch (error) {
            setIsLoading(false)
            console.error(error)
        }
    }

    return (
        <div className='w-full h-screen overflow-hidden'>
            <div className="w-full h-full flex flex-col lg:flex-row bg-white">
                
                {/* Left Panel - Signup Form */}
                <div className="lg:w-1/2 w-full py-6  overflow-y-auto">
                    <div className=" mx-14 px-6">
                        
                        {/* Header */}
                        <header className='mb-5'>
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
                                    Create Account
                                </h1>
                                <p className='text-gray-600 text-[14px]'>
                                    Join Vuduka and transform your institution
                                </p>
                            </div>
                        </header>

                        {/* Form */}
                        <div className="space-y-3">
                            {/* Name Input */}
                            <div className="group">
                                <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => handleChange('name', e.target.value)}
                                        className="w-full px-3 py-3 pl-10 bg-gray-50 border border-gray-200 rounded-lg 
                                                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                                                   transition-all duration-200 text-[14px] text-gray-900 placeholder-gray-400
                                                   group-hover:border-gray-300"
                                        placeholder="Enter your full name"
                                    />
                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                        <FiUser className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>

                            {/* Email & Phone */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {/* Email */}
                                <div className="group">
                                    <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => handleChange('email', e.target.value)}
                                            className="w-full px-3 py-3 pl-10 bg-gray-50 border border-gray-200 rounded-lg 
                                                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                                                       transition-all duration-200 text-[14px] text-gray-900 placeholder-gray-400
                                                       group-hover:border-gray-300"
                                            placeholder="you@example.com"
                                        />
                                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                            <FiMail className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="group">
                                    <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">
                                        Phone Number
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="tel"
                                            value={formData.phoneNumber}
                                            onChange={(e) => handleChange('phoneNumber', e.target.value)}
                                            className="w-full px-3 py-3 pl-10 bg-gray-50 border border-gray-200 rounded-lg 
                                                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                                                       transition-all duration-200 text-[14px] text-gray-900 placeholder-gray-400
                                                       group-hover:border-gray-300"
                                            placeholder="+1234567890"
                                        />
                                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                            <FiSmartphone className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Password */}
                            <div className="group">
                                <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={isPasswordShown ? "text" : "password"}
                                        value={formData.password}
                                        onChange={(e) => handleChange('password', e.target.value)}
                                        className="w-full px-3 py-3 pl-10 pr-10 bg-gray-50 border border-gray-200 rounded-lg 
                                                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                                                   transition-all duration-200 text-[14px] text-gray-900 placeholder-gray-400
                                                   group-hover:border-gray-300"
                                        placeholder="Create a strong password"
                                    />
                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                        <FiLock className="w-4 h-4" />
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
                                
                                {/* Password Strength & Requirements */}
                                {formData.password && (
                                    <div className="mt-2 space-y-2">
                                        <div className="flex items-center gap-2">
                                            <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                                <div 
                                                    className={`h-full transition-all duration-300 ${getStrengthColor()}`}
                                                    style={{ width: `${passwordStrength}%` }}
                                                ></div>
                                            </div>
                                            <span className={`text-[11px] font-medium ${
                                                passwordStrength < 40 ? 'text-red-600' :
                                                passwordStrength < 80 ? 'text-yellow-600' : 'text-green-600'
                                            }`}>
                                                {passwordStrength < 40 ? 'Weak' : passwordStrength < 80 ? 'Fair' : 'Strong'}
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {passwordRequirements.map(req => (
                                                <div key={req.id} className="flex items-center gap-1">
                                                    <div className={`w-3 h-3 rounded-full flex items-center justify-center ${
                                                        req.met ? 'bg-green-500' : 'bg-gray-300'
                                                    }`}>
                                                        {req.met && <FiCheck className="w-2 h-2 text-white" />}
                                                    </div>
                                                    <span className={`text-[11px] ${req.met ? 'text-green-600' : 'text-gray-500'}`}>
                                                        {req.text}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div className="group">
                                <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={isConfirmPasswordShown ? "text" : "password"}
                                        value={formData.confirmPassword}
                                        onChange={(e) => handleChange('confirmPassword', e.target.value)}
                                        className={`w-full px-3 py-3 pl-10 pr-10 bg-gray-50 border rounded-lg 
                                                   focus:outline-none focus:ring-2 focus:border-transparent 
                                                   transition-all duration-200 text-[14px] text-gray-900 placeholder-gray-400
                                                   group-hover:border-gray-300
                                                   ${formData.confirmPassword && formData.password !== formData.confirmPassword 
                                                       ? 'border-red-300 focus:ring-red-500' 
                                                       : 'border-gray-200 focus:ring-blue-500'}`}
                                        placeholder="Confirm your password"
                                    />
                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                        <FiLock className="w-4 h-4" />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setIsConfirmPasswordShown(!isConfirmPasswordShown)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {isConfirmPasswordShown ? 
                                            <BsEyeSlash className="w-4 h-4" /> : 
                                            <BsEye className="w-4 h-4" />
                                        }
                                    </button>
                                </div>
                                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                                    <p className="mt-1 text-[11px] text-red-600">Passwords don't match</p>
                                )}
                            </div>

                            {/* Terms & Conditions */}
                            <div className="flex items-start gap-2 py-2">
                                <div className="relative mt-0.5">
                                    <input
                                        type="checkbox"
                                        id="terms"
                                        checked={agreedToTerms}
                                        onChange={(e) => setAgreedToTerms(e.target.checked)}
                                        className="sr-only"
                                    />
                                    <label htmlFor="terms" className="cursor-pointer">
                                        <div className={`w-4 h-4 rounded border-2 transition-all duration-200 flex items-center justify-center
                                                        ${agreedToTerms ? 'bg-blue-600 border-blue-600' : 'border-gray-300 hover:border-blue-400'}`}>
                                            {agreedToTerms && <FiCheck className="w-2.5 h-2.5 text-white" />}
                                        </div>
                                    </label>
                                </div>
                                <label htmlFor="terms" className="text-[13px] text-gray-700 cursor-pointer">
                                    I agree to the{' '}
                                    <button type="button" className="text-blue-600 hover:text-blue-700 font-medium">
                                        Terms & Conditions
                                    </button>{' '}
                                    and{' '}
                                    <button type="button" className="text-blue-600 hover:text-blue-700 font-medium">
                                        Privacy Policy
                                    </button>
                                </label>
                            </div>

                            {/* Submit Button */}
                            <button
                                onClick={handleSubmit}
                                disabled={isLoading || !agreedToTerms}
                                className={`w-full py-3 px-4 rounded-lg font-semibold text-[14px] text-white transition-all duration-200
                                            ${isLoading || !agreedToTerms ? 'bg-blue-400' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'} 
                                            transform hover:-translate-y-0.5 shadow-md hover:shadow-lg disabled:hover:translate-y-0 disabled:cursor-not-allowed`}
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                        Creating Account...
                                    </div>
                                ) : (
                                    'Create Account'
                                )}
                            </button>

                            {/* Divider */}
                            <div className="relative my-4">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-200"></div>
                                </div>
                                <div className="relative flex justify-center text-[13px]">
                                    <span className="px-3 bg-white text-gray-500">Or sign up with</span>
                                </div>
                            </div>

                            {/* Social Logins */}
                            <div className="grid grid-cols-3 gap-2.5">
                                {socialLogins.map((item) => (
                                    <button
                                        key={item.id}
                                        type="button"
                                        onClick={() => console.log(`${item.name} signup`)}
                                        className={`${item.color} py-2.5 rounded-lg flex items-center justify-center 
                                                    transition-all duration-200 transform hover:-translate-y-0.5 
                                                    shadow-sm hover:shadow-md`}
                                    >
                                        {item.icon}
                                    </button>
                                ))}
                            </div>

                            {/* Login Link */}
                            <p className="text-center text-gray-600 text-[14px] pt-2">
                                Already have an account?{' '}
                                <button
                                    type="button"
                                    onClick={() => console.log("Navigate to login")}
                                    className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                                >
                                    Sign in
                                </button>
                            </p>
                        </div>

                        {/* Security Note */}
                        <div className="mt-4 pt-3 border-t border-gray-100">
                            <div className="flex items-center justify-center text-[11px] text-gray-500">
                                <BsShieldCheck className="w-3.5 h-3.5 mr-1.5 text-green-500" />
                                Protected by enterprise-grade security
                            </div>
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

            {/* Add animations */}
            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-15px); }
                }
                
                @keyframes blob {
                    0%, 100% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                }
                
                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }
                
                .animate-blob {
                    animation: blob 7s ease-in-out infinite;
                }
                
                .animation-delay-1000 {
                    animation-delay: 1s;
                }
                
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}</style>
        </div>
    )
}

export default Signup