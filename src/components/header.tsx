import React, { useEffect, useState } from 'react'
import {
  Search,
  Settings,
  Download,
  ChevronDown,
  User,
  Bell,
  X,
} from 'lucide-react'
import UseIsSmallScreen from '../Hooks/UseIsSmallScreen'

type HeaderProps = {
  isNavOpen?: boolean
}

const Header = React.memo(({ isNavOpen }: HeaderProps) => {
  const isSmallScreen = UseIsSmallScreen()
  const [isTyping, setIsTyping] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [showNotifications, setShowNotifications] = useState(false)

  useEffect(() => {
    if (!isTyping) return
    const timer = setTimeout(() => setIsTyping(false), 600)
    return () => clearTimeout(timer)
  }, [isTyping])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
    setIsTyping(true)
  }

  const clearSearch = () => {
    setSearchValue('')
  }

  return (
    <header
      className={`
        sticky top-0 z-40
        bg-white  border-b border-gray-200
        transition-all duration-300
        
      `}
    >
      <div className="h-16 px-6 flex items-center justify-between gap-4">
        {/* LEFT: SEARCH */}
        <div className="flex-1 max-w-xl">
          <div
            className={`
              relative flex items-center gap-3 px-4 py-2.5 
              rounded-xl border-2 transition-all duration-200
              ${
                searchFocused
                  ? 'bg-white border-blue-700 shadow-lg shadow-blue-100/50'
                  : ' border-gray-100 hover:border-gray-300 hover:bg-blue-50/20'
              }
            `}
          >
            <Search
              className={`w-4 h-4 transition-colors duration-200 ${
                searchFocused ? 'text-blue-800' : 'text-gray-400'
              }`}
            />
            <input
              type="text"
              placeholder="Search anything…"
              value={searchValue}
              onChange={handleSearchChange}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="bg-transparent text-sm w-full outline-none placeholder:text-gray-400 text-gray-700"
            />
            {searchValue && (
              <button
                onClick={clearSearch}
                className="p-1 rounded-full hover:bg-gray-200 transition-colors"
              >
                <X className="w-3.5 h-3.5 text-gray-500" />
              </button>
            )}
            
            {/* Search loading indicator */}
            {isTyping && (
              <div className="absolute right-4 flex gap-1">
                <div className="w-1 h-1 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1 h-1 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1 h-1 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: ACTIONS */}
        <div className="flex items-center gap-2">
          {!isSmallScreen && (
            <>
              <IconButton 
                icon={<Download className="w-5 h-5 text-black" />} 
                tooltip="Download"
              />
              <IconButton 
                icon={<Settings className="w-5 h-5 text-black" />} 
                tooltip="Settings"
              />
              
              {/* Notifications with badge */}
              <div className="relative">
                <IconButton
                  icon={<Bell className="w-5 h-5 text-black" />}
                  tooltip="Notifications"
                  onClick={() => setShowNotifications(!showNotifications)}
                  active={showNotifications}
                />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
              </div>

              <div className="h-6 w-px bg-gray-200 mx-1" />
            </>
          )}

          {/* USER PROFILE */}
          <button className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl hover:bg-gray-100 transition-all duration-200 group">
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-700 to-blue-800 flex items-center justify-center text-white shadow-sm group-hover:shadow-md transition-shadow">
                <User className="w-4 h-4" />
              </div>
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-700 border-2 border-white rounded-full" />
            </div>
            {!isSmallScreen && (
              <>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-semibold text-black">
                    Admin User
                  </span>
                  <span className="text-xs text-gray-600">
                    Administrator
                  </span>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-600 group-hover:text-gray-600 transition-colors" />
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  )
})

function IconButton({ 
  icon, 
  tooltip, 
  onClick,
  active = false 
}: { 
  icon: React.ReactNode
  tooltip?: string
  onClick?: () => void
  active?: boolean
}) {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={onClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`
          w-10 h-10 rounded-xl flex items-center justify-center 
          transition-all duration-200
          ${active 
            ? 'bg-blue-50 text-blue-600' 
            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
          }
        `}
      >
        {icon}
      </button>
      
      {/* Tooltip */}
      {tooltip && showTooltip && (
        <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded-md whitespace-nowrap z-50 shadow-lg">
          {tooltip}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-gray-900" />
        </div>
      )}
    </div>
  )
}

export default Header