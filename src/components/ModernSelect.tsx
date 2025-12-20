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
      <div className="relative mt-1">
        <Listbox.Button className="relative w-full cursor-pointer rounded-lg border border-gray-400 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600">
          <span className="block truncate">
            {value ? value.label : placeholder}
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </span>
        </Listbox.Button>

        <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 shadow-lg ring-1 ring-black/5">
          {options.map((option) => (
            <Listbox.Option
              key={option.value}
              value={option}
              className={({ active }) =>
                `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                  active ? 'bg-blue-800 text-white' : 'text-gray-900'
                }`
              }
            >
              {({ selected }) => (
                <>
                  <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                    {option.label}
                  </span>
                  {selected && (
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-orange-400">
                      <Check className="h-4 w-4" />
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
