import { useState } from 'react'
import { DayPicker } from 'react-day-picker'
import { format } from 'date-fns'
import { Calendar } from 'lucide-react'
import 'react-day-picker/dist/style.css'

type Props = {
  value?: Date
  onChange: (date: Date | undefined) => void
}

export default function ModernDatePicker({ value, onChange }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      {/* Input-like trigger */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between rounded-lg border bg-white px-3 py-2 text-left shadow-sm focus:ring-2 focus:ring-blue-600"
      >
        <span className={value ? 'text-gray-900' : 'text-gray-400'}>
          {value ? format(value, 'PPP') : 'Select a date'}
        </span>
        <Calendar className="h-4 w-4 text-gray-500" />
      </button>

      {open && (
        <div className="absolute  top-[-200px] overflow-auto rounded-lg  bg-blue-50 p-3 shadow-xl">
          <DayPicker
            mode="single"
            selected={value}
            onSelect={(date) => {
              onChange(date)
              setOpen(false)
            }}
            disabled={{ before: new Date() }} // prevent past dates
          />
        </div>
      )}
    </div>
  )
}
