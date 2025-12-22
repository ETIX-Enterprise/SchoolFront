import React, { useState } from 'react'
import {
  Mail,
  Phone,
  MapPin,
  Building2,
  Send,
  CheckCircle2,
  X
} from 'lucide-react'

function Support() {
  const [message, setMessage] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return
    setShowSuccess(true)
    setMessage('')
  }

  return (
    <div className="w-full flex-1 px-6 py-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-[16px] font-semibold text-gray-900">Support</h1>
        <p className="text-[14px] text-gray-600 mt-1">
          Need help? Reach out to us and we’ll get back to you shortly.
        </p>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Company Info */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-5">
          <h2 className="text-[16px] font-semibold text-gray-900">
            Company Information
          </h2>

          <div className="space-y-4">
            <InfoItem
              icon={<Building2 className="w-5 h-5 text-blue-800" />}
              title="Company Name"
              value="Rwanda Academy Transport"
            />

            <InfoItem
              icon={<Mail className="w-5 h-5 text-blue-800" />}
              title="Email"
              value="support@rwandaacademy.rw"
            />

            <InfoItem
              icon={<Phone className="w-5 h-5 text-blue-800" />}
              title="Phone"
              value="+250 788 000 000"
            />

            <InfoItem
              icon={<MapPin className="w-5 h-5 text-blue-800" />}
              title="Address"
              value="Kigali, Rwanda"
            />
          </div>
        </div>

        {/* Support Form */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-[16px] font-semibold text-gray-900 mb-4">
            Send us a message
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[14px] font-medium text-gray-700 mb-2">
                Describe your problem
              </label>
              <textarea
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your issue here..."
                className="w-full px-4 py-3 text-[14px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-transparent outline-none resize-none transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 text-[14px] font-medium rounded-lg bg-blue-800 text-white hover:bg-blue-900 transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-[16px] font-semibold text-gray-900">
                Message Sent
              </h3>
              <button
                onClick={() => setShowSuccess(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 text-center space-y-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-[14px] text-gray-700">
                Your problem has been received.
              </p>
              <p className="text-[13px] text-gray-500">
                We will reach out to you soon.
              </p>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => setShowSuccess(false)}
                className="w-full px-4 py-2 text-[14px] font-medium rounded-lg bg-blue-800 text-white hover:bg-blue-900 transition-all"
              >
                Close
              </button>
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
  value
}: {
  icon: React.ReactNode
  title: string
  value: string
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="text-[13px] text-gray-500">{title}</p>
        <p className="text-[14px] font-medium text-gray-900">{value}</p>
      </div>
    </div>
  )
}

export default Support
