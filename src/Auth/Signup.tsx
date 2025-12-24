import { useState } from 'react'
import logo from "/Icona/logo.png"
import axios from 'axios'
import { BsApple, BsEye, BsEyeSlash, BsCheckCircle, BsShieldCheck, BsGraphUp } from 'react-icons/bs'
import { FaFacebook } from 'react-icons/fa'
import { FiUser, FiMail, FiLock, FiSmartphone, FiCheck } from 'react-icons/fi'
import { HiOutlineAcademicCap, HiOutlineChartBar } from 'react-icons/hi'
import Google from "/Icona/google.png"
import landing from '/images/landing.png'
import { useNavigate } from 'react-router-dom'

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
        { "id": 1, "name": "facebook", "icon": <FaFacebook className='w-5 h-5 text-white' />, color: "bg-[#1877F2] hover:bg-[#166FE5]" },
        { "id": 2, "name": "google", "icon": <img src={Google} className="w-5 h-5" />, color: "bg-white text-gray-800 hover:bg-gray-50 border border-gray-200" },
        { "id": 3, "name": "apple", "icon": <BsApple className='w-5 h-5' />, color: "bg-black hover:bg-gray-900 text-white" }
    ]


    const passwordRequirements = [
        { id: 1, text: "At least 8 characters", met: formData.password.length >= 8 },
        { id: 2, text: "Contains uppercase letter", met: /[A-Z]/.test(formData.password) },
        { id: 3, text: "Contains lowercase letter", met: /[a-z]/.test(formData.password) },
        { id: 4, text: "Contains number", met: /[0-9]/.test(formData.password) },
        { id: 5, text: "Contains special character", met: /[^A-Za-z0-9]/.test(formData.password) }
    ]

    const navigate = useNavigate()

    const handleChange = (field: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
        
        if (field === 'password') {
            calculatePasswordStrength(value)
        }
    }

    const calculatePasswordStrength = (password: string) => {
        let strength = 0
        if (password.length >= 8) strength += 20
        if (/[A-Z]/.test(password)) strength += 20
        if (/[a-z]/.test(password)) strength += 20
        if (/[0-9]/.test(password)) strength += 20
        if (/[^A-Za-z0-9]/.test(password)) strength += 20
        setPasswordStrength(strength)
    }

    const getStrengthColor = () => {
        if (passwordStrength < 40) return "bg-red-500"
        if (passwordStrength < 80) return "bg-yellow-500"
        return "bg-green-500"
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
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
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500))
            // Your actual API call here
            // const res = await axios.post("", formData)
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
                
                {/* Left Panel - Hero Section */}
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
                    </div>

                    <div className="relative z-10 h-full flex flex-col">
                        
                        {/* Header */}
                        <div className='flex items-center gap-3 mb-8'>
                            <div className="p-2 bg-white/10 backdrop-blur-sm rounded-xl">
                                <img src={logo} className='w-8 h-8' alt="Vuduka Logo" />
                            </div>
                            <div>
                                <h2 className='text-2xl font-bold text-white'>
                                    VUDUKA
                                </h2>
                                <p className='text-xs text-blue-200 font-medium'>Enterprise Edition</p>
                            </div>
                        </div>

                        {/* Hero Content */}
                        <div className="flex-1">
                            <div className="max-w-lg">
                                <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-8">
                                    <span className="text-sm font-medium text-white">Join 500+ Institutions</span>
                                </div>

                                <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                                    Start Your Digital Transformation Journey
                                </h2>
                                
                                <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                                    Join thousands of educational institutions that have revolutionized their 
                                    management systems with Vuduka's comprehensive platform.
                                </p>

                               
                            </div>
                        </div>

                        {/* Stats & Preview */}
                        <div className="relative mt-auto">
                            <div className="grid grid-cols-3 gap-6 mb-6 text-white">
                                <div className="text-center">
                                    <div className="text-3xl font-bold">24/7</div>
                                    <div className="text-sm text-blue-200">Support</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold">99.9%</div>
                                    <div className="text-sm text-blue-200">Uptime</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold">30-Day</div>
                                    <div className="text-sm text-blue-200">Free Trial</div>
                                </div>
                            </div>

                            {/* Dashboard Preview */}
                            <div className="relative">
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
                                        className="w-full h-auto rounded-lg shadow-2xl"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel - Signup Form */}
                <div className="lg:w-1/2 w-full p-8 lg:p-12 xl:p-16">
                    <div className="max-w-md mx-auto h-full flex flex-col">
                        
                        {/* Header */}
                        <header className='mb-8'>
                            <h1 className='text-3xl lg:text-4xl font-bold text-gray-900 mb-3'>
                                Create Account
                            </h1>
                            <p className='text-gray-600 text-lg'>
                                Join Vuduka and transform your institution's management
                            </p>
                        </header>

                        {/* Form */}
                        <div className="flex-1">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                
                                {/* Name Input */}
                                <div className="group">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => handleChange('name', e.target.value)}
                                            className="w-full px-4 py-3.5 pl-12 bg-gray-50 border border-gray-200 rounded-xl 
                                                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                                                       transition-all duration-300 text-gray-900 placeholder-gray-400
                                                       group-hover:border-gray-300"
                                            placeholder="Enter your full name"
                                            required
                                        />
                                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                                            <FiUser className="w-5 h-5" />
                                        </div>
                                    </div>
                                </div>

                                {/* Email & Phone */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Email */}
                                    <div className="group">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Email Address
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => handleChange('email', e.target.value)}
                                                className="w-full px-4 py-3.5 pl-12 bg-gray-50 border border-gray-200 rounded-xl 
                                                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                                                           transition-all duration-300 text-gray-900 placeholder-gray-400
                                                           group-hover:border-gray-300"
                                                placeholder="you@example.com"
                                                required
                                            />
                                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                                                <FiMail className="w-5 h-5" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div className="group">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Phone Number
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="tel"
                                                value={formData.phoneNumber}
                                                onChange={(e) => handleChange('phoneNumber', e.target.value)}
                                                className="w-full px-4 py-3.5 pl-12 bg-gray-50 border border-gray-200 rounded-xl 
                                                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                                                           transition-all duration-300 text-gray-900 placeholder-gray-400
                                                           group-hover:border-gray-300"
                                                placeholder="+1234567890"
                                                required
                                            />
                                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                                                <FiSmartphone className="w-5 h-5" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Password */}
                                <div className="group">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={isPasswordShown ? "text" : "password"}
                                            value={formData.password}
                                            onChange={(e) => handleChange('password', e.target.value)}
                                            className="w-full px-4 py-3.5 pl-12 pr-12 bg-gray-50 border border-gray-200 rounded-xl 
                                                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                                                       transition-all duration-300 text-gray-900 placeholder-gray-400
                                                       group-hover:border-gray-300"
                                            placeholder="Create a strong password"
                                            required
                                        />
                                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                                            <FiLock className="w-5 h-5" />
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
                                    
                                    {/* Password Strength */}
                                    {formData.password && (
                                        <div className="mt-3 space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">Password strength</span>
                                                <span className={`font-semibold ${
                                                    passwordStrength < 40 ? 'text-red-600' :
                                                    passwordStrength < 80 ? 'text-yellow-600' : 'text-green-600'
                                                }`}>
                                                    {passwordStrength < 40 ? 'Weak' : passwordStrength < 80 ? 'Fair' : 'Strong'}
                                                </span>
                                            </div>
                                            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                                <div 
                                                    className={`h-full transition-all duration-500 ${getStrengthColor()}`}
                                                    style={{ width: `${passwordStrength}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    )}
                                    
                                    {/* Password Requirements */}
                                    {formData.password && (
                                        <div className="mt-3 space-y-2">
                                            <p className="text-sm text-gray-600 font-medium">Requirements:</p>
                                            <div className="space-y-1">
                                                {passwordRequirements.map(req => (
                                                    <div key={req.id} className="flex items-center space-x-2">
                                                        <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                                                            req.met ? 'bg-green-500' : 'bg-gray-300'
                                                        }`}>
                                                            {req.met && <FiCheck className="w-3 h-3 text-white" />}
                                                        </div>
                                                        <span className={`text-sm ${req.met ? 'text-green-600' : 'text-gray-500'}`}>
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
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={isConfirmPasswordShown ? "text" : "password"}
                                            value={formData.confirmPassword}
                                            onChange={(e) => handleChange('confirmPassword', e.target.value)}
                                            className={`w-full px-4 py-3.5 pl-12 pr-12 bg-gray-50 border rounded-xl 
                                                       focus:outline-none focus:ring-2 focus:border-transparent 
                                                       transition-all duration-300 text-gray-900 placeholder-gray-400
                                                       group-hover:border-gray-300
                                                       ${formData.confirmPassword && formData.password !== formData.confirmPassword 
                                                           ? 'border-red-300 focus:ring-red-500' 
                                                           : 'border-gray-200 focus:ring-blue-500'}`}
                                            placeholder="Confirm your password"
                                            required
                                        />
                                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                                            <FiLock className="w-5 h-5" />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setIsConfirmPasswordShown(!isConfirmPasswordShown)}
                                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            {isConfirmPasswordShown ? 
                                                <BsEyeSlash className="w-5 h-5" /> : 
                                                <BsEye className="w-5 h-5" />
                                            }
                                        </button>
                                    </div>
                                    {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                                        <p className="mt-2 text-sm text-red-600">Passwords don't match</p>
                                    )}
                                </div>

                                {/* Terms & Conditions */}
                                <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-xl">
                                    <div className="relative mt-1">
                                        <input
                                            type="checkbox"
                                            id="terms"
                                            checked={agreedToTerms}
                                            onChange={(e) => setAgreedToTerms(e.target.checked)}
                                            className="sr-only"
                                        />
                                        <label htmlFor="terms" className="flex items-center cursor-pointer">
                                            <div className={`w-5 h-5 rounded border-2 transition-all duration-300 flex items-center justify-center
                                                            ${agreedToTerms ? 'bg-blue-600 border-blue-600' : 'border-gray-300 hover:border-blue-400'}`}>
                                                {agreedToTerms && <FiCheck className="w-3 h-3 text-white" />}
                                            </div>
                                            <span className="ml-3 text-sm text-gray-700">
                                                I agree to all the{' '}
                                                <button type="button" className="text-blue-600 hover:text-blue-700 font-medium">
                                                    Terms & Conditions
                                                </button>{' '}
                                                and{' '}
                                                <button type="button" className="text-blue-600 hover:text-blue-700 font-medium">
                                                    Privacy Policies
                                                </button>
                                            </span>
                                        </label>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isLoading || !agreedToTerms}
                                    className={`w-full py-3.5 px-6 rounded-xl font-semibold text-white transition-all duration-300
                                                ${isLoading || !agreedToTerms ? 'bg-blue-400' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'} 
                                                transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl disabled:hover:translate-y-0 disabled:cursor-not-allowed`}
                                >
                                    {isLoading ? (
                                        <div className="flex items-center justify-center">
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                                            Creating Account...
                                        </div>
                                    ) : (
                                        'Create Account'
                                    )}
                                </button>

                                {/* Divider */}
                                <div className="relative my-6">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-200"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-4 bg-white text-gray-500">Or sign up with</span>
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

                                {/* Login Link */}
                                <p className="text-center text-gray-600 pt-4">
                                    Already have an account?{' '}
                                    <button
                                        type="button"
                                        onClick={() => navigate("/login", { viewTransition: true })}
                                        className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                                    >
                                        Sign in
                                    </button>
                                </p>
                            </form>
                        </div>

                        {/* Security Footer */}
                        <div className="mt-8 pt-6 border-t border-gray-100">
                            <div className="flex items-center justify-center text-xs text-gray-500">
                                <BsCheckCircle className="w-4 h-4 mr-2 text-green-500" />
                                Your data is protected with enterprise-grade encryption
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup