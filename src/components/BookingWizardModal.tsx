import React, { useState } from 'react'
import ModernSelect from './ModernSelect'
import ModernDatePicker from './ModernDatePicker'
import { Calendar, Users, MapPin, Bus, Check, ChevronRight, X, ArrowLeft, Send } from 'lucide-react'

type Props = {
  onClose: () => void
}

type RoutePlan = {
  id: string
  route: string
  studentsCount: number
  districts: string[]
  agency: string
  buses: number
  capacityUsed: number
  capacityTotal: number
}

const mockPlan: RoutePlan[] = [
  {
    id: '1',
    route: 'Kigali → Huye',
    studentsCount: 98,
    districts: ['Gasabo', 'Kicukiro', 'Nyarugenge'],
    agency: 'Volcano Express',
    buses: 2,
    capacityUsed: 98,
    capacityTotal: 100,
  },
  {
    id: '2',
    route: 'Kigali → Rusizi',
    studentsCount: 64,
    districts: ['Gasabo', 'Kicukiro'],
    agency: 'Ritco',
    buses: 2,
    capacityUsed: 64,
    capacityTotal: 65,
  },
]

const yearOptions = [
  { label: '2023', value: '2023' },
  { label: '2024', value: '2024' },
  { label: '2025', value: '2025' },
]

const agencyOptions = [
  { label: 'Volcano Express', value: 'Volcano' },
  { label: 'Ritco', value: 'Ritco' },
  { label: 'Virunga Express', value: 'Virunga' }
]

export default function BookingWizardModal({ onClose }: Props) {
  const [step, setStep] = useState(1)
  const [travelDate, setTravelDate] = useState<Date | undefined>(undefined)
  const [year, setYear] = useState<{ label: string; value: string } | undefined>()
  const [agency, setAgency] = useState<{ label: string; value: string } | undefined>(agencyOptions[0])
  const [selectedRoutes, setSelectedRoutes] = useState<string[]>([])

  const toggleRouteSelection = (routeId: string) => {
    setSelectedRoutes(prev =>
      prev.includes(routeId)
        ? prev.filter(id => id !== routeId)
        : [...prev, routeId]
    )
  }

  const steps = [
    { number: 1, title: 'Academic Year', description: 'Select academic period' },
    { number: 2, title: 'Travel Date', description: 'Choose departure date' },
    { number: 3, title: 'Review & Confirm', description: 'Verify details and submit' }
  ]

  const totalStudents = mockPlan.reduce((sum, route) => sum + route.studentsCount, 0)
  const uniqueAgencies = new Set(mockPlan.map(r => r.agency)).size

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative flex  items-center justify-center p-4">
        <div className="relative w-full min-h-full max-w-2xl rounded-2xl bg-white shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-100 px-8 py-6">
            <div>
              <h2 className="text-[23px] font-semibold text-gray-800">Book Transportation</h2>
              <p className="mt-1 text-sm text-gray-500">Complete the wizard to request student transport</p>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="border-b border-gray-100 px-8 py-4">
            <div className="flex items-center justify-between">
              {steps.map((s, index) => (
                <React.Fragment key={s.number}>
                  <div className="flex items-center">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full border-2 font-semibold
                      ${step > s.number ? 'border-blue-600 bg-blue-600 text-white' :
                        step === s.number ? 'border-blue-600 bg-white text-blue-600' :
                        'border-gray-300 bg-white text-gray-400'}`}
                    >
                      {step > s.number ? <Check className="h-4 w-4" /> : s.number}
                    </div>
                    <div className="ml-3">
                      <div className={`text-sm font-medium ${step >= s.number ? 'text-gray-900' : 'text-gray-500'}`}>
                        {s.title}
                      </div>
                      <div className="text-xs text-gray-400">{s.description}</div>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`h-0.5 flex-1 mx-6 ${step > s.number ? 'bg-blue-600' : 'bg-gray-200'}`} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Step 1: Year Selection */}
            {step === 1 && (
              <div className="space-y-8">
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100">
                    <Calendar className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Select Academic Year</h3>
                  <p className="mt-2 text-gray-500">Choose the academic year for transportation planning</p>
                </div>

                <div className="mx-auto max-w-md">
                  <ModernSelect
                    value={year}
                    options={yearOptions}
                    placeholder="Select academic year"
                    onChange={setYear}
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => setStep(2)}
                    disabled={!year}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 font-medium text-white shadow-lg hover:shadow-xl disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    Continue
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Date Selection */}
            {step === 2 && (
              <div className="space-y-8">
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-50 to-emerald-100">
                    <Calendar className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Select Travel Date</h3>
                  <p className="mt-2 text-gray-500">Choose the departure date for student transportation</p>
                </div>

                <div className="mx-auto max-w-md">
                  <ModernDatePicker
                    value={travelDate}
                    onChange={setTravelDate}
                  />
                </div>

                <div className="flex items-center justify-between border-t border-gray-100 pt-6">
                  <button
                    onClick={() => setStep(1)}
                    className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-5 py-2.5 font-medium text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    disabled={!travelDate}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 font-medium text-white shadow-lg hover:shadow-xl disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    Review Plan
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Review & Confirm */}
            {step === 3 && (
              <div className="space-y-8">
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-50 to-violet-100">
                    <Check className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Review & Confirm</h3>
                  <p className="mt-2 text-gray-500">Verify transportation details before submission</p>
                </div>

                {/* Summary Card */}
                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
                  <div className="grid grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                        <Calendar className="h-4 w-4" />
                        Academic Year
                      </div>
                      <div className="text-lg font-semibold text-gray-900">{year?.label}</div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                        <Calendar className="h-4 w-4" />
                        Travel Date
                      </div>
                      <div className="text-lg font-semibold text-gray-900">
                        {travelDate?.toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                        <Users className="h-4 w-4" />
                        Total Students
                      </div>
                      <div className="text-lg font-semibold text-gray-900">{totalStudents}</div>
                    </div>
                  </div>
                </div>

                {/* Routes List */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-gray-900">Transportation Routes</h4>
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
                      {mockPlan.length} routes
                    </span>
                  </div>

                  <div className="space-y-3">
                    {mockPlan.map(route => {
                      const capacityPercentage = Math.round((route.capacityUsed / route.capacityTotal) * 100)
                      const isSelected = selectedRoutes.includes(route.id)

                      return (
                        <div
                          key={route.id}
                          className={`rounded-xl border-2 p-4 transition-all duration-200 cursor-pointer hover:border-blue-300 ${
                            isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'
                          }`}
                          onClick={() => toggleRouteSelection(route.id)}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3">
                                <div className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                                  isSelected ? 'border-blue-500 bg-blue-500' : 'border-gray-300 bg-white'
                                }`}>
                                  {isSelected && <Check className="h-3 w-3 text-white" />}
                                </div>
                                <div>
                                  <h5 className="font-semibold text-gray-900">{route.route}</h5>
                                  <p className="mt-1 text-sm text-gray-600">
                                    {route.districts.join(', ')} • {route.agency}
                                  </p>
                                </div>
                              </div>

                              <div className="ml-9 mt-4 grid grid-cols-3 gap-4">
                                <div>
                                  <p className="text-sm font-medium text-gray-600">Students</p>
                                  <p className="text-lg font-semibold text-gray-900">{route.capacityUsed}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-600">Capacity</p>
                                  <div className="flex items-center gap-2">
                                    <div className="h-2 w-24 rounded-full bg-gray-200">
                                      <div 
                                        className={`h-full rounded-full ${
                                          capacityPercentage > 90 ? 'bg-red-500' : 'bg-green-500'
                                        }`}
                                        style={{ width: `${capacityPercentage}%` }}
                                      />
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">{capacityPercentage}%</span>
                                  </div>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-600">Agency</p>
                                  <div className="mt-1">
                                    <ModernSelect
                                      value={agency}
                                      options={agencyOptions}
                                      placeholder="Select agency"
                                      onChange={setAgency}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between border-t border-gray-100 pt-6">
                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep(2)}
                      className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-5 py-2.5 font-medium text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-colors"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Back
                    </button>
                    <button
                      onClick={onClose}
                      className="rounded-xl border border-gray-300 px-5 py-2.5 font-medium text-gray-700 hover:border-red-300 hover:bg-red-50 hover:text-red-700 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      console.log('Booking submitted:', { year, travelDate, selectedRoutes })
                      onClose()
                    }}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-700 px-6 py-3 font-medium text-white shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <Send className="h-4 w-4" />
                    Submit Booking Request
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}