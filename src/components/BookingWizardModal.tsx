import React, { useState } from 'react'
import ModernSelect from './ModernSelect'
import { ArrowBigRight, ArrowLeft, ArrowRight, SendIcon } from 'lucide-react'
import ModernDatePicker from './ModernDatePicker'

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

function BookingWizardModal({ onClose }: Props) {
  const [step, setStep] = useState(1)
  const [travelDate, setTravelDate] = useState<Date | undefined>(undefined)
  const [year, setYear] = useState<{ label: string; value: string } | undefined>();
  const [agency , setAgency] = useState<{ label: string; value: string } | undefined>();
 

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-xl p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[16px] font-semibold">
            Create Booking – Step {step} of 3
          </h2>
          <button onClick={onClose} className="text-gray-800">✕</button>
        </div>

        {/* STEP 1 – Select Year */}
        {step === 1 && (
          <div>
            <p className="mb-2 text-[14px] text-gray-600">Select academic year</p>

    <ModernSelect
      value={year}
      options={yearOptions}
      placeholder="Choose year"
      onChange={setYear}
    />

            <button
              disabled={!year}
              onClick={() => setStep(2)}
              className="mt-6 w-full flex justify-center cursor-pointer hover:bg-blue-900 transition-colors duration-500 items-center bg-blue-800 text-white py-2 rounded-lg disabled:bg-gray-400"
            >
              Next <ArrowRight className='w-3 h-3 ml-7 mt-[3px]'/>
            </button>
          </div>
        )}

        {/* STEP 2 – Travel Date */}
        {step === 2 && (
          <div>
            <p className="mb-2 text-sm text-gray-600">Select travel date</p>
    <ModernDatePicker
      value={travelDate}
      onChange={setTravelDate}
    />

            <div className="flex justify-between mt-6">
              <button
                onClick={() => setStep(1)}
                className="px-4 flex justify-center cursor-pointer hover:bg-blue-800 transition-colors duration-500 items-center text-[14px] py-2 border rounded"
              >
                <ArrowLeft className='w-3 h-3 mt-[1.5px] mr-4'/> Back
              </button>
              <button
                disabled={!travelDate}
                onClick={() => setStep(3)}
                className="px-4 py-2 text-[14px] bg-blue-800 text-white rounded-lg disabled:bg-gray-400"
              >
                Review
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 – Review */}
{/* STEP 3 – Review Transport Plan */}
{step === 3 && (
  <div className="space-y-4">

    {/* SUMMARY */}
    <div className="rounded-lg bg-blue-100 shadow-lg p-4 text-[14px]">
      <div className="flex justify-between">
        <span><span className='font-semibold'>Year:</span> {year?.value}</span>
        <span>
          <span className='font-semibold'>Date:</span>{' '}
          {travelDate ? travelDate.toDateString() : ''}
        </span>
      </div>

      <div className="mt-2 grid grid-cols-3 gap-2 text-center">
        <div>
          <p className="font-semibold ">Students</p>
          <p className='text-blue-800'> {mockPlan.reduce((a, b) => a + b.studentsCount, 0)}</p>
        </div>
        <div>
          <p className="font-semibold ">Routes</p>
          <p className='text-blue-800'>{mockPlan.length}</p>
        </div>
        <div>
          <p className="font-semibold ">Agencies</p>
          <p className='text-blue-800'>{new Set(mockPlan.map(r => r.agency)).size}</p>
        </div>
      </div>
    </div>

    {/* ROUTE CARDS */}
    <div className="space-y-3 max-h-[230px] overflow-y-auto pr-1">
      {mockPlan.map(route => {
        const capacityOk = route.capacityUsed <= route.capacityTotal

        return (
          <div
            key={route.id}
            className="rounded-lg  p-4 text-sm shadow-sm"
          >
            <div className="flex justify-between items-center">
              <h4 className="font-semibold">{route.route}</h4>
              <span
                className={`text-[13px] font-semibold px-2 py-1 rounded-lg ${
                  capacityOk
                    ? 'bg-blue-50 text-blue-800'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {route.capacityUsed} students
              </span>
            </div>
            <p className="text-black">
              <span className='font-semibold'>Districts:</span> {route.districts.join(', ')}
            </p>

            <div className="mt-1 flex justify-between items-center">
              <div>
                <p className="text-black font-semibold">Agency:</p>
                   <ModernSelect
      value={agency}
      options={
              [
        {label:"Volcano Express" , value:"Volcano"},
        {label:"Ritco" , value:"Ritco"},
        {label:"Virunga Express" , value:"Virunga"}
      ]
      }
      placeholder="Choose an agency"
      onChange={setAgency}
    />
              </div>

              <button className="text-white cursor-pointer p-2 rounded-md bg-blue-800 text-[13px] mt-5 hover:underline">
                View students
              </button>
            </div>
          </div>
        )
      })}
    </div>

    {/* ACTIONS */}
    <div className="flex justify-between pt-7 border-t border-gray-300">
              <button
                onClick={() => setStep(2)}
                className="px-4 flex justify-center cursor-pointer hover:bg-blue-800 transition-colors duration-500 items-center text-[14px] py-2 border rounded"
              >
                <ArrowLeft className='w-3 h-3 mt-[1.5px] mr-4'/> Back
              </button>

      <div className="flex gap-2">
        <button
          onClick={onClose}
          className="px-4 py-1 bg-gray-100 cursor-pointer hover:bg-red-100 transition-colors duration-500 text-[14px] text-red-800 rounded-lg"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            console.log('Final plan:', mockPlan)
            onClose()
          }}
          className="px-4 py-1 flex justify-center items-center cursor-pointer hover:bg-blue-900 transition-colors duration-500 bg-blue-800 text-[14px] text-white rounded-lg"
        >
           Request Booking <SendIcon className='w-4 h-4 mt-1 ml-3'/>
        </button>
      </div>
    </div>
  </div>
)}


      </div>
    </div>
  )
}

export default BookingWizardModal
