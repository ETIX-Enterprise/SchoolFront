import React, { useState } from 'react'
import {
  Mail,
  Phone,
  MapPin,
  Building2,
  Send,
  CheckCircle,
  X,
  Clock,
  MessageSquare,
  HeadphonesIcon as Headphones,
  Shield,
  Globe,
  User,
  FileText
} from 'lucide-react'

function Support() {
  const [message, setMessage] = useState('')
  const [subject, setSubject] = useState('')
  const [email, setEmail] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim() || !subject.trim() || !email.trim()) return
    
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setShowSuccess(true)
    setMessage('')
    setSubject('')
    setEmail('')
  }

  const supportStats = [
    { icon: Clock, label: 'Response Time', value: 'Within 2 hours' },
    { icon: Shield, label: 'Data Security', value: '100% Encrypted' },
    { icon: Globe, label: 'Availability', value: '24/7 Support' },
    { icon: MessageSquare, label: 'Satisfaction', value: '98% Rate' }
  ]

  const faqItems = [
    { question: 'How do I book transportation?', answer: 'Use the booking wizard to schedule student transportation.' },
    { question: 'Can I modify an existing booking?', answer: 'Yes, bookings can be modified up to 24 hours before departure.' },
    { question: 'How are payments processed?', answer: 'Payments are securely processed via bank transfer or mobile money.' },
    { question: 'What is the cancellation policy?', answer: 'Cancellations made 48+ hours before receive full refund.' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Support Center</h1>
            <p className="text-gray-600 mt-2">Get help with transportation management and student services</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 px-4 py-2.5 text-gray-700 font-medium rounded-lg border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-colors">
              <FileText className="h-4 w-4" />
              Knowledge Base
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {supportStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50">
                  <stat.icon className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-lg font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Company Info & Contact */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Information */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100">
                  <Headphones className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Contact Information</h2>
                  <p className="text-gray-500">Multiple ways to reach our support team</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoItem
                  icon={<Building2 className="h-6 w-6 text-blue-600" />}
                  title="Company Name"
                  value="Rwanda Academy Transport"
                  description="Educational Transportation Services"
                />

                <InfoItem
                  icon={<Mail className="h-6 w-6 text-blue-600" />}
                  title="Email Address"
                  value="support@rwandaacademy.rw"
                  description="Primary support channel"
                />

                <InfoItem
                  icon={<Phone className="h-6 w-6 text-blue-600" />}
                  title="Phone Number"
                  value="+250 788 000 000"
                  description="Mon-Fri, 8AM-6PM"
                />

                <InfoItem
                  icon={<MapPin className="h-6 w-6 text-blue-600" />}
                  title="Office Address"
                  value="Kigali, Rwanda"
                  description="KG 7 Ave, Kigali"
                />
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-green-50 to-emerald-100">
                <MessageSquare className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Frequently Asked Questions</h2>
                <p className="text-gray-500">Quick answers to common questions</p>
              </div>
            </div>

            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-4 hover:border-gray-300 transition-colors">
                  <h3 className="font-medium text-gray-900 mb-2">{item.question}</h3>
                  <p className="text-sm text-gray-600">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Support Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm sticky top-6">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 rounded-xl bg-gradient-to-br from-orange-50 to-amber-100">
                  <Send className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Send Message</h2>
                  <p className="text-gray-500">We'll respond within 2 hours</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Your Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Subject *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Brief description of your issue"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Detailed Message *
                  </label>
                  <textarea
                    rows={6}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Please provide detailed information about your issue..."
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !message.trim() || !subject.trim() || !email.trim()}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:shadow-md disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Send Message
                    </>
                  )}
                </button>

                <div className="text-center">
                  <p className="text-xs text-gray-500">
                    By submitting, you agree to our privacy policy
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowSuccess(false)} />
          <div className="relative flex min-h-full items-center justify-center p-4">
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md">
              <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-50">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Message Sent Successfully</h3>
                    <p className="text-sm text-gray-500">Support ticket created</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowSuccess(false)}
                  className="rounded-lg p-2 text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="p-6">
                <div className="text-center mb-6">
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-50 to-emerald-100">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Thank You!</h4>
                  <p className="text-gray-600 mb-4">
                    Your support request has been received. Our team will review your message and respond within 2 hours.
                  </p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm">
                    <Clock className="h-4 w-4" />
                    Estimated response: 2 hours
                  </div>
                </div>

                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                    <span>You'll receive a confirmation email shortly</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                    <span>Check your ticket status in the dashboard</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-purple-500"></div>
                    <span>You can add additional details anytime</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowSuccess(false)}
                    className="px-4 py-2.5 text-gray-700 font-medium rounded-lg border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      setShowSuccess(false)
                      // Navigate to tickets page or similar
                    }}
                    className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:shadow-md transition-all"
                  >
                    View Support Tickets
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function InfoItem({
  icon,
  title,
  value,
  description
}: {
  icon: React.ReactNode
  title: string
  value: string
  description?: string
}) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors">
      <div className="flex-shrink-0 p-3 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100">
        {icon}
      </div>
      <div>
        <h3 className="font-medium text-gray-900">{title}</h3>
        <p className="text-lg font-semibold text-gray-900 mt-1">{value}</p>
        {description && (
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        )}
      </div>
    </div>
  )
}

export default Support