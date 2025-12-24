import { Listbox } from '@headlessui/react'
import { Check, ChevronDown } from 'lucide-react'

type Option = {
  label: string
  value: string
}

type Props = {
  value: Option | undefined
  options: Option[]
  placeholder: string
  onChange: (option: Option) => void
}

export default function ModernSelect({
  value,
  options,
  placeholder,
  onChange,
}: Props) {
  return (
    <Listbox value={value} onChange={onChange}>
      <div className="relative">
        <Listbox.Button className="group relative w-full cursor-pointer rounded-xl border-2 border-gray-300 bg-white py-3 pl-4 pr-12 text-left transition-all duration-200 hover:border-blue-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
          <span className={`block truncate text-sm font-medium ${value ? 'text-gray-900' : 'text-gray-500'}`}>
            {value ? value.label : placeholder}
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ChevronDown className="h-4 w-4 text-gray-400 transition-transform duration-200 group-hover:text-blue-500 ui-open:rotate-180" />
          </span>
        </Listbox.Button>

        <Listbox.Options className="absolute z-50 mt-2 w-full origin-top overflow-hidden rounded-2xl bg-white py-2 shadow-2xl ring-1 ring-black/5 animate-in fade-in-0 zoom-in-95">
          {options.map((option) => (
            <Listbox.Option
              key={option.value}
              value={option}
              className={({ active, selected }) =>
                `relative cursor-pointer select-none py-3 pl-10 pr-4 transition-colors duration-150 ${
                  selected 
                    ? 'bg-blue-50 text-blue-700' 
                    : active 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`
              }
            >
              {({ selected }) => (
                <>
                  <span className={`block truncate text-sm ${selected ? 'font-semibold' : 'font-medium'}`}>
                    {option.label}
                  </span>
                  {selected && (
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <Check className="h-4 w-4 text-blue-600" />
                    </span>
                  )}
                </>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  )
}