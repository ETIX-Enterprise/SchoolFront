import { useState, useEffect } from 'react'
import logo from "/Icona/logo.png"
import axios from 'axios'
import { BsArrowLeft, BsEye, BsEyeSlash, BsShieldCheck, BsCheckCircle } from 'react-icons/bs'
import { FiLock, FiCheck, FiAlertCircle } from 'react-icons/fi'
import { HiOutlineKey } from 'react-icons/hi'
import { MdOutlineSecurity, MdOutlineVerified } from 'react-icons/md'
import landing from '/images/landing.png'
import { useNavigate, useSearchParams } from 'react-router-dom'

function SetPassword() {
    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")
    const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false)
    const [isConfirmShown, setIsConfirmShown] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [passwordStrength, setPasswordStrength] = useState<number>(0)
    const [passwordValidations, setPasswordValidations] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        special: false
    })
    
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const token = searchParams.get('token')

    const securityFeatures = [
        { icon: <BsShieldCheck />, title: "256-bit Encryption", description: "Military-grade security" },
        { icon: <MdOutlineSecurity />, title: "Real-time Validation", description: "Instant feedback on password strength" },
        { icon: <MdOutlineVerified />, title: "One-time Use", description: "Token expires after use" }
    ]

    const passwordRequirements = [
        { id: 1, text: "At least 8 characters", key: "length" },
        { id: 2, text: "Contains uppercase letter", key: "uppercase" },
        { id: 3, text: "Contains lowercase letter", key: "lowercase" },
        { id: 4, text: "Contains number", key: "number" },
        { id: 5, text: "Contains special character", key: "special" }
    ]

    const calculatePasswordStrength = (pass: string) => {
        let strength = 0
        const validations = {
            length: pass.length >= 8,
            uppercase: /[A-Z]/.test(pass),
            lowercase: /[a-z]/.test(pass),
            number: /[0-9]/.test(pass),
            special: /[^A-Za-z0-9]/.test(pass)
        }
        
        setPasswordValidations(validations)
        
        Object.values(validations).forEach(isValid => {
            if (isValid) strength += 20
        })
        
        setPasswordStrength(strength)
    }

    const getStrengthColor = () => {
        if (passwordStrength < 40) return "bg-red-500"
        if (passwordStrength < 80) return "bg-yellow-500"
        return "bg-green-500"
    }

    const getStrengthText = () => {
        if (passwordStrength < 40) return "Weak"
        if (passwordStrength < 80) return "Fair"
        return "Strong"
    }

    const handlePasswordChange = (value: string) => {
        setPassword(value)
        calculatePasswordStrength(value)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (password !== confirmPassword) {
            alert("Passwords don't match")
            return
        }
        
        if (passwordStrength < 80) {
            alert("Please create a stronger password")
            return
        }

        setIsLoading(true)
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500))
            
            // Your actual API call here
            // const res = await axios.post("/api/auth/reset-password", { 
            //     token, 
            //     password 
            // })
            
            setIsLoading(false)
            navigate("/login", { 
                state: { message: "Password reset successful! Please login with your new password." },
                viewTransition: true 
            })
        } catch (error) {
            setIsLoading(false)
            console.error(error)
        }
    }

    useEffect(() => {
        if (!token) {
            navigate("/forgot-password")
        }
    }, [token, navigate])

    const isFormValid = password === confirmPassword && passwordStrength >= 80 && password.length > 0

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
                                <span className="font-medium">Back</span>
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
                            <div className="mb-8">
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                                        <HiOutlineKey className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h1 className='text-3xl lg:text-4xl font-bold text-gray-900 mb-2'>
                                            Set New Password
                                        </h1>
                                        <p className='text-gray-600'>
                                            Create a strong, secure password for your account
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </header>

                        {/* Form */}
                        <div className="flex-1">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* New Password */}
                                <div className="group">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        New Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={isPasswordShown ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => handlePasswordChange(e.target.value)}
                                            className="w-full px-4 py-3.5 pl-12 pr-12 bg-gray-50 border border-gray-200 rounded-xl 
                                                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                                                       transition-all duration-300 text-gray-900 placeholder-gray-400
                                                       group-hover:border-gray-300"
                                            placeholder="Create a strong password"
                                            required
                                            minLength={8}
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
                                    {password && (
                                        <div className="mt-4 space-y-3">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm font-medium text-gray-700">
                                                    Password Strength
                                                </span>
                                                <span className={`text-sm font-semibold ${
                                                    passwordStrength < 40 ? 'text-red-600' :
                                                    passwordStrength < 80 ? 'text-yellow-600' : 'text-green-600'
                                                }`}>
                                                    {getStrengthText()}
                                                </span>
                                            </div>
                                            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                                <div 
                                                    className={`h-full transition-all duration-500 ${getStrengthColor()}`}
                                                    style={{ width: `${passwordStrength}%` }}
                                                ></div>
                                            </div>
                                            
                                            {/* Requirements */}
                                            <div className="space-y-2 mt-3">
                                                {passwordRequirements.map((req) => {
                                                    const isValid = passwordValidations[req.key as keyof typeof passwordValidations]
                                                    return (
                                                        <div key={req.id} className="flex items-center space-x-2">
                                                            <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                                                                isValid ? 'bg-green-100' : 'bg-gray-100'
                                                            }`}>
                                                                {isValid ? (
                                                                    <FiCheck className="w-3 h-3 text-green-600" />
                                                                ) : (
                                                                    <FiAlertCircle className="w-3 h-3 text-gray-400" />
                                                                )}
                                                            </div>
                                                            <span className={`text-sm ${isValid ? 'text-green-600' : 'text-gray-500'}`}>
                                                                {req.text}
                                                            </span>
                                                        </div>
                                                    )
                                                })}
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
                                            type={isConfirmShown ? "text" : "password"}
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className={`w-full px-4 py-3.5 pl-12 pr-12 bg-gray-50 border rounded-xl 
                                                       focus:outline-none focus:ring-2 focus:border-transparent 
                                                       transition-all duration-300 text-gray-900 placeholder-gray-400
                                                       group-hover:border-gray-300
                                                       ${confirmPassword && password !== confirmPassword 
                                                           ? 'border-red-300 focus:ring-red-500' 
                                                           : confirmPassword && password === confirmPassword
                                                           ? 'border-green-300 focus:ring-green-500'
                                                           : 'border-gray-200 focus:ring-blue-500'}`}
                                            placeholder="Confirm your password"
                                            required
                                        />
                                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                                            <FiLock className="w-5 h-5" />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setIsConfirmShown(!isConfirmShown)}
                                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            {isConfirmShown ? 
                                                <BsEyeSlash className="w-5 h-5" /> : 
                                                <BsEye className="w-5 h-5" />
                                            }
                                        </button>
                                    </div>
                                    
                                    {/* Validation Messages */}
                                    {confirmPassword && (
                                        <div className="mt-2">
                                            {password !== confirmPassword ? (
                                                <p className="text-sm text-red-600 flex items-center space-x-1">
                                                    <FiAlertCircle className="w-4 h-4" />
                                                    <span>Passwords don't match</span>
                                                </p>
                                            ) : (
                                                <p className="text-sm text-green-600 flex items-center space-x-1">
                                                    <BsCheckCircle className="w-4 h-4" />
                                                    <span>Passwords match!</span>
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Security Info */}
                                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                                    <div className="flex items-start space-x-3">
                                        <BsShieldCheck className="w-5 h-5 text-blue-600 mt-0.5" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">Security Tip</p>
                                            <p className="text-sm text-gray-600 mt-1">
                                                Use a combination of letters, numbers, and special characters. 
                                                Avoid using personal information or common words.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isLoading || !isFormValid}
                                    className={`w-full py-3.5 px-6 rounded-xl font-semibold text-white transition-all duration-300
                                                ${isLoading || !isFormValid 
                                                    ? 'bg-blue-400 cursor-not-allowed' 
                                                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'} 
                                                transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl disabled:hover:translate-y-0`}
                                >
                                    {isLoading ? (
                                        <div className="flex items-center justify-center">
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                                            Setting Password...
                                        </div>
                                    ) : (
                                        'Reset Password'
                                    )}
                                </button>
                            </form>
                        </div>

                        {/* Footer */}
                        <div className="mt-8 pt-6 border-t border-gray-100">
                            <div className="text-center text-sm text-gray-500">
                                <p>By resetting your password, you agree to our enhanced security protocols.</p>
                                <p className="mt-1">Need help? <button className="text-blue-600 hover:text-blue-700 font-medium">Contact Support</button></p>
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

                    {/* Animated Security Pattern */}
                    <div className="absolute inset-0">
                        {/* Floating Locks */}
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div
                                key={i}
                                className="absolute text-white/10"
                                style={{
                                    fontSize: `${20 + i * 5}px`,
                                    top: `${10 + i * 10}%`,
                                    left: `${5 + i * 12}%`,
                                    animation: `float ${4 + i}s ease-in-out infinite`,
                                    animationDelay: `${i * 0.5}s`
                                }}
                            >
                                🔒
                            </div>
                        ))}
                    </div>

                    <div className="relative z-10 h-full flex flex-col">
                        
                        {/* Hero Content */}
                        <div className="flex-1">
                            <div className="max-w-lg">
                                <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-8">
                                    <span className="text-sm font-medium text-white">Enhanced Security Protocol</span>
                                </div>

                                <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                                    Secure Your Account
                                </h2>
                                
                                <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                                    Your security is our top priority. We enforce strong password policies 
                                    and use advanced encryption to protect your account and data.
                                </p>

                                {/* Security Features Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                                    {securityFeatures.map((feature, index) => (
                                        <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 
                                                                  hover:bg-white/10 transition-all duration-300 group">
                                            <div className="flex flex-col items-center text-center">
                                                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-3
                                                              group-hover:bg-blue-500/30 transition-colors">
                                                    <span className="text-white text-xl">
                                                        {feature.icon}
                                                    </span>
                                                </div>
                                                <h4 className="text-white font-semibold mb-1">{feature.title}</h4>
                                                <p className="text-blue-100 text-xs">{feature.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Security Tips */}
                                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                                    <h3 className="text-white font-bold text-lg mb-3">Best Practices</h3>
                                    <ul className="space-y-2">
                                        <li className="flex items-start space-x-2">
                                            <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5">
                                                <FiCheck className="w-3 h-3 text-green-400" />
                                            </div>
                                            <span className="text-blue-100 text-sm">Use at least 12 characters for maximum security</span>
                                        </li>
                                        <li className="flex items-start space-x-2">
                                            <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5">
                                                <FiCheck className="w-3 h-3 text-green-400" />
                                            </div>
                                            <span className="text-blue-100 text-sm">Include numbers, symbols, and mixed case letters</span>
                                        </li>
                                        <li className="flex items-start space-x-2">
                                            <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5">
                                                <FiCheck className="w-3 h-3 text-green-400" />
                                            </div>
                                            <span className="text-blue-100 text-sm">Avoid dictionary words and personal information</span>
                                        </li>
                                        <li className="flex items-start space-x-2">
                                            <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5">
                                                <FiCheck className="w-3 h-3 text-green-400" />
                                            </div>
                                            <span className="text-blue-100 text-sm">Don't reuse passwords across different accounts</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Dashboard Preview */}
                        <div className="relative mt-8">
                            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl"></div>
                            <div className="relative bg-white/10 backdrop-blur-sm rounded-xl p-2 border border-white/20">
                                <div className="flex items-center gap-2 mb-3 px-2">
                                    <div className="flex gap-1">
                                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                    </div>
                                    <div className="text-xs text-white/70 ml-2">Secure Dashboard Preview</div>
                                </div>
                                <img
                                    src={landing}
                                    alt="Vuduka Secure Dashboard"
                                    className="w-full h-auto rounded-lg shadow-2xl"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Floating Elements */}
                    <div className="absolute top-10 right-16 animate-float">
                        <div className="w-4 h-4 rounded-full bg-blue-300/30"></div>
                    </div>
                    <div className="absolute bottom-32 left-20 animate-float animation-delay-1500">
                        <div className="w-3 h-3 rounded-full bg-green-300/30"></div>
                    </div>
                </div>
            </div>

            {/* Add animations */}
            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-15px) rotate(5deg); }
                }
                .animate-float {
                    animation: float 5s ease-in-out infinite;
                }
                .animation-delay-1500 {
                    animation-delay: 1.5s;
                }
            `}</style>
        </div>
    )
}

export default SetPassword