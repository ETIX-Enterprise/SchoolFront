import { useState, useRef, useEffect } from 'react'
import { DayPicker } from 'react-day-picker'
import { format } from 'date-fns'
import { Calendar, ChevronDown } from 'lucide-react'
import 'react-day-picker/dist/style.css'

type Props = {
  value?: Date
  onChange: (date: Date | undefined) => void
}

export default function ModernDatePicker({ value, onChange }: Props) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={containerRef} className="relative w-64">
      {/* Input-like trigger */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="group w-full flex items-center justify-between rounded-xl border-2 border-gray-300 bg-white px-4 py-3 text-left transition-all duration-200 hover:border-blue-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      >
        <div className="flex items-center gap-3">
          <Calendar className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
          <span className={`text-sm font-medium ${value ? 'text-gray-900' : 'text-gray-500'}`}>
            {value ? format(value, 'PPP') : 'Select a date'}
          </span>
        </div>
        <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {/* Calendar dropdown */}
      {open && (
        <div className="absolute z-50 mt-2 origin-top rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-black ring-opacity-5 animate-in fade-in-0 zoom-in-95">
          <DayPicker
            mode="single"
            selected={value}
            onSelect={(date) => {
              onChange(date)
              setOpen(false)
            }}
            disabled={{ before: new Date() }}
            className="p-0"
            classNames={{
              months: "flex",
              month: "space-y-4",
              caption: "flex justify-center pt-1 relative items-center",
              caption_label: "text-sm font-semibold text-gray-900",
              nav: "flex items-center",
              nav_button: "h-6 w-6 bg-transparent p-0 opacity-50 hover:opacity-100 absolute top-2",
              nav_button_previous: "left-1",
              nav_button_next: "right-1",
              table: "w-full border-collapse space-y-1",
              head_row: "flex",
              head_cell: "text-gray-500 rounded-md w-9 font-normal text-[0.8rem]",
              row: "flex w-full mt-2",
              cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected])]:bg-blue-50",
              day: "h-9 w-9 p-0 font-medium aria-selected:opacity-100 hover:bg-blue-100 hover:text-blue-900 rounded-lg transition-colors",
              day_selected: "bg-blue-600 text-white hover:bg-blue-700 hover:text-white focus:bg-blue-600 focus:text-white",
              day_today: "bg-gray-100 text-gray-900",
              day_outside: "text-gray-400 opacity-50",
              day_disabled: "text-gray-400 cursor-not-allowed opacity-50",
              day_hidden: "invisible",
            }}
          />
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Today: {format(new Date(), 'MMM d')}</span>
              {value && (
                <button
                  type="button"
                  onClick={() => {
                    onChange(undefined)
                    setOpen(false)
                  }}
                  className="px-3 py-1.5 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}