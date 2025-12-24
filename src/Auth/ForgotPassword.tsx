import { useState } from 'react'
import logo from "/Icona/logo.png"
import axios from 'axios'
import { BsArrowLeft, BsCheckCircle, BsEnvelope, BsShieldLock, BsClock } from 'react-icons/bs'
import { FiMail, FiArrowRight, FiKey } from 'react-icons/fi'
import { HiOutlineMailOpen } from 'react-icons/hi'
import { MdOutlineVerified } from 'react-icons/md'
import landing from '/images/landing.png'
import { useNavigate } from 'react-router-dom'

function ForgotPassword() {
    const [email, setEmail] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
    const [countdown, setCountdown] = useState<number>(0)
    const navigate = useNavigate()

    const steps = [
        { id: 1, title: "Enter Email", description: "Provide your account email", icon: <FiMail /> },
        { id: 2, title: "Check Inbox", description: "Open the reset link", icon: <BsEnvelope /> },
        { id: 3, title: "Reset Password", description: "Create new password", icon: <FiKey /> },
        { id: 4, title: "Access Account", description: "Login with new credentials", icon: <MdOutlineVerified /> }
    ]

    const securityFeatures = [
        { icon: <BsShieldLock />, title: "Secure Link", description: "One-time use reset link" },
        { icon: <BsClock />, title: "Time Limited", description: "Expires in 15 minutes" },
        { icon: <BsCheckCircle />, title: "Verified", description: "Identity verification" }
    ]

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email) return
        
        setIsLoading(true)
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500))
            
            setIsSubmitted(true)
            setIsLoading(false)
            
            // Start countdown for resend option
            setCountdown(60)
            const interval = setInterval(() => {
                setCountdown(prev => {
                    if (prev <= 1) {
                        clearInterval(interval)
                        return 0
                    }
                    return prev - 1
                })
            }, 1000)
            
            // Your actual API call here
            // const res = await axios.post("/api/auth/forgot-password", { email })
            
        } catch (error) {
            setIsLoading(false)
            console.error(error)
        }
    }

    const handleResend = () => {
        if (countdown > 0) return
        handleSubmit(new Event('submit') as any)
    }

    return (
        <div className='w-full min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4'>
            <div className="w-full max-w-7xl flex flex-col lg:flex-row rounded-2xl overflow-hidden shadow-2xl bg-white">
                
                {/* Left Panel - Form */}
                <div className="lg:w-1/2 w-full p-8 lg:p-12 xl:p-16">
                    <div className="max-w-md mx-auto h-full flex flex-col">
                        
                        {/* Header */}
                        <header className='mb-8'>
                            {/* Back Button */}
                            <button
                                onClick={() => navigate(-1)}
                                className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 mb-6 transition-colors group"
                            >
                                <BsArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                                <span className="font-medium">Back to login</span>
                            </button>

                            {/* Logo */}
                            <div className='flex items-center gap-3 mb-6'>
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

                            {/* Title */}
                            <div className="mb-2">
                                <h1 className='text-3xl lg:text-4xl font-bold text-gray-900 mb-3'>
                                    Reset Your Password
                                </h1>
                                <p className='text-gray-600 text-lg'>
                                    Enter your email to receive a password reset link
                                </p>
                            </div>
                        </header>

                        {/* Progress Steps */}
                        <div className="mb-8">
                            <div className="flex items-center justify-between relative">
                                {/* Progress Line */}
                                <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 -z-10"></div>
                                <div 
                                    className="absolute top-4 left-0 h-0.5 bg-blue-600 -z-10 transition-all duration-500"
                                    style={{ width: isSubmitted ? '100%' : '25%' }}
                                ></div>
                                
                                {/* Steps */}
                                {steps.map((step, index) => (
                                    <div key={step.id} className="flex flex-col items-center">
                                        <div className={`
                                            w-8 h-8 rounded-full flex items-center justify-center
                                            transition-all duration-500
                                            ${isSubmitted || index === 0 
                                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25' 
                                                : 'bg-gray-100 text-gray-400 border border-gray-200'
                                            }
                                            ${index === 0 ? 'animate-pulse' : ''}
                                        `}>
                                            {step.icon}
                                        </div>
                                        <div className="mt-2 text-center">
                                            <p className={`text-xs font-semibold ${
                                                isSubmitted || index === 0 ? 'text-gray-900' : 'text-gray-500'
                                            }`}>
                                                {step.title}
                                            </p>
                                            <p className="text-xs text-gray-400 mt-1 hidden sm:block">
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Form */}
                        <div className="flex-1">
                            {!isSubmitted ? (
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
                                                placeholder="Enter your account email"
                                                required
                                            />
                                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                                                <FiMail className="w-5 h-5" />
                                            </div>
                                        </div>
                                        <p className="mt-2 text-sm text-gray-500">
                                            Enter the email address associated with your account
                                        </p>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={isLoading || !email}
                                        className={`w-full py-3.5 px-6 rounded-xl font-semibold text-white transition-all duration-300
                                                    ${isLoading || !email ? 'bg-blue-400' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'} 
                                                    transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl disabled:hover:translate-y-0 disabled:cursor-not-allowed`}
                                    >
                                        {isLoading ? (
                                            <div className="flex items-center justify-center">
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                                                Sending Reset Link...
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-center">
                                                Send Reset Link
                                                <FiArrowRight className="ml-2 w-5 h-5" />
                                            </div>
                                        )}
                                    </button>
                                </form>
                            ) : (
                                /* Success State */
                                <div className="space-y-6 animate-fadeIn">
                                    {/* Success Icon */}
                                    <div className="flex justify-center mb-6">
                                        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center animate-bounce">
                                            <HiOutlineMailOpen className="w-10 h-10 text-green-600" />
                                        </div>
                                    </div>

                                    {/* Success Message */}
                                    <div className="text-center space-y-3">
                                        <h3 className="text-2xl font-bold text-gray-900">
                                            Check Your Email
                                        </h3>
                                        <p className="text-gray-600">
                                            We've sent a password reset link to:
                                        </p>
                                        <p className="font-semibold text-blue-600 text-lg">
                                            {email}
                                        </p>
                                        <p className="text-gray-500 text-sm">
                                            The link will expire in 15 minutes for security reasons.
                                        </p>
                                    </div>

                                    {/* Security Features */}
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                                        {securityFeatures.map((feature, index) => (
                                            <div key={index} className="bg-gray-50 rounded-xl p-4 border border-gray-100 text-center">
                                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-2">
                                                    <span className="text-blue-600 text-xl">
                                                        {feature.icon}
                                                    </span>
                                                </div>
                                                <h4 className="font-semibold text-gray-900 text-sm">
                                                    {feature.title}
                                                </h4>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    {feature.description}
                                                </p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="space-y-3 mt-8">
                                        <button
                                            onClick={handleResend}
                                            disabled={countdown > 0}
                                            className={`w-full py-3.5 px-6 rounded-xl font-semibold transition-all duration-300
                                                        ${countdown > 0 
                                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                                            : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                                                        }`}
                                        >
                                            {countdown > 0 
                                                ? `Resend in ${countdown}s` 
                                                : 'Didn\'t receive email? Resend'
                                            }
                                        </button>
                                        
                                        <button
                                            onClick={() => navigate("/login")}
                                            className="w-full py-3.5 px-6 rounded-xl font-semibold text-gray-700 
                                                       hover:text-gray-900 hover:bg-gray-50 transition-all duration-300"
                                        >
                                            Return to login
                                        </button>
                                    </div>

                                    {/* Help Text */}
                                    <div className="text-center text-sm text-gray-500 mt-4">
                                        <p>
                                            If you still need help, contact our{' '}
                                            <button className="text-blue-600 hover:text-blue-700 font-medium">
                                                support team
                                            </button>
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="mt-8 pt-6 border-t border-gray-100">
                            <div className="flex items-center justify-center text-xs text-gray-500">
                                <BsShieldLock className="w-4 h-4 mr-2 text-green-500" />
                                Your security is our priority. We never share your data.
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

                    {/* Animated Circles */}
                    <div className="absolute inset-0">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div
                                key={i}
                                className="absolute rounded-full border border-white/10"
                                style={{
                                    width: `${(i + 1) * 100}px`,
                                    height: `${(i + 1) * 100}px`,
                                    top: `${20 + i * 15}%`,
                                    left: `${10 + i * 10}%`,
                                    animation: `float ${3 + i}s ease-in-out infinite`,
                                    animationDelay: `${i * 0.5}s`
                                }}
                            ></div>
                        ))}
                    </div>

                    <div className="relative z-10 h-full flex flex-col">
                        
                        {/* Hero Content */}
                        <div className="flex-1">
                            <div className="max-w-lg">
                                <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-8">
                                    <span className="text-sm font-medium text-white">Secure Password Recovery</span>
                                </div>

                                <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                                    Secure Account Recovery
                                </h2>
                                
                                <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                                    We use military-grade encryption and security protocols to ensure 
                                    your account recovery process is completely secure and private.
                                </p>

                                {/* Security Stats */}
                                <div className="grid grid-cols-2 gap-6 mb-10">
                                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                                        <div className="text-3xl font-bold text-white mb-1">99.9%</div>
                                        <div className="text-sm text-blue-200">Recovery Success Rate</div>
                                    </div>
                                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                                        <div className="text-3xl font-bold text-white mb-1">5 Min</div>
                                        <div className="text-sm text-blue-200">Average Recovery Time</div>
                                    </div>
                                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                                        <div className="text-3xl font-bold text-white mb-1">256-bit</div>
                                        <div className="text-sm text-blue-200">Encryption Standard</div>
                                    </div>
                                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                                        <div className="text-3xl font-bold text-white mb-1">24/7</div>
                                        <div className="text-sm text-blue-200">Security Monitoring</div>
                                    </div>
                                </div>
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
                                    <div className="text-xs text-white/70 ml-2">Vuduka Security Dashboard</div>
                                </div>
                                <img
                                    src={landing}
                                    alt="Vuduka Security Dashboard"
                                    className="w-full h-auto rounded-lg shadow-2xl transform hover:scale-[1.02] transition-transform duration-500"
                                />
                            </div>

                            {/* Security Features */}
                            <div className="flex items-center justify-center space-x-6 mt-6 text-white/80">
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                    <span className="text-sm">End-to-End Encrypted</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                                    <span className="text-sm">GDPR Compliant</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Floating Elements */}
                    <div className="absolute top-1/4 right-12 animate-float">
                        <div className="w-3 h-3 rounded-full bg-green-300/30"></div>
                    </div>
                    <div className="absolute bottom-1/3 left-16 animate-float animation-delay-1000">
                        <div className="w-2 h-2 rounded-full bg-blue-300/30"></div>
                    </div>
                </div>
            </div>

            {/* Add animations */}
            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) translateX(0px); }
                    50% { transform: translateY(-10px) translateX(10px); }
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-float {
                    animation: float 4s ease-in-out infinite;
                }
                .animate-fadeIn {
                    animation: fadeIn 0.5s ease-out;
                }
                .animation-delay-1000 {
                    animation-delay: 1s;
                }
            `}</style>
        </div>
    )
}

export default ForgotPassword