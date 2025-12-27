import React, { useEffect, useState } from 'react'
import {
  Search,
  Settings,
  ChevronDown,
  User,
  Bell,
  X,
  LogOut,
  Menu
} from 'lucide-react'
import UseIsSmallScreen from '../Hooks/UseIsSmallScreen'

type HeaderProps = {
  isNavOpen?: boolean
  onMenuToggle?: () => void
}

const Header = React.memo(({ isNavOpen, onMenuToggle }: HeaderProps) => {
  const isSmallScreen = UseIsSmallScreen()
  const [isTyping, setIsTyping] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)

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

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications)
    setShowProfileMenu(false)
  }

  const handleProfileClick = () => {
    setShowProfileMenu(!showProfileMenu)
    setShowNotifications(false)
  }

  const notifications = [
    { id: 1, title: 'New booking confirmed', time: '5 min ago', read: false },
    { id: 2, title: 'Route A delayed by 15 minutes', time: '15 min ago', read: false },
    { id: 3, title: 'Monthly report is ready', time: '2 hours ago', read: true },
    { id: 4, title: 'System maintenance completed', time: '1 day ago', read: true }
  ]

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <header
      className={`
        sticky top-0 z-50
        bg-zinc-50  backdrop-blur-sm
        transition-all duration-300
        
      `}
    >
      <div className="h-16 px-4 md:px-6 flex items-center justify-between gap-3">
        {/* Mobile Menu Button */}
        {isSmallScreen && (
          <button
            onClick={onMenuToggle}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-100/50 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        {/* Search Bar */}
        <div className="flex-1 max-w-xl mx-2 md:mx-4">
          <div
            className={`
              relative flex items-center gap-3 px-4 py-2.5 
              rounded-xl border transition-all duration-300
              ${searchFocused
                ? 'bg-white border-blue-600 shadow-lg shadow-blue-500/10'
                : 'border-blue-400 hover:border-blue-500 hover:bg-blue-50/50'
              }
            `}
          >
            <Search
              className={`w-4 h-4 transition-colors duration-200 ${
                searchFocused ? 'text-blue-600' : 'text-gray-400'
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
            
            {searchValue ? (
              <button
                onClick={clearSearch}
                className="p-1.5 rounded-lg hover:bg-blue-200/80 transition-colors"
              >
                <X className="w-3.5 h-3.5 text-blue-500" />
              </button>
            ) : (
              <div className="hidden sm:flex items-center gap-1.5 text-xs text-white">
                <kbd className="px-1.5 py-0.5 bg-blue-700 rounded border border-gray-300">⌘</kbd>
                <kbd className="px-1.5 py-0.5 bg-blue-700 rounded border border-gray-300">K</kbd>
              </div>
            )}
            
            {isTyping && (
              <div className="absolute right-12 flex gap-1">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1 md:gap-2">
          <div className="flex items-center gap-1">
            {!isSmallScreen && (
              <>
                {/* Notifications Dropdown */}
                <div className="relative">
                  <IconButton
                    icon={<Bell className="w-4 h-4 text-blue-700" />}
                    tooltip="Notifications"
                    onClick={handleNotificationClick}
                    active={showNotifications}
                    badge={unreadCount}
                  />
                  
                  {/* Notifications Panel */}
                  {showNotifications && (
                    <>
                      <div 
                        className="fixed inset-0 z-40" 
                        onClick={() => setShowNotifications(false)}
                      />
                      <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 z-50 animate-in fade-in-0 zoom-in-95">
                        <div className="p-4 border-b border-gray-200">
                          <h3 className="font-semibold text-gray-900">Notifications</h3>
                          <p className="text-sm text-gray-500 mt-1">You have {unreadCount} unread messages</p>
                        </div>
                        
                        <div className="max-h-80 overflow-y-auto">
                          {notifications.map((notification) => (
                            <div
                              key={notification.id}
                              className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${!notification.read ? 'bg-blue-50/50' : ''}`}
                            >
                              <div className="flex items-start gap-3">
                                <div className={`p-2 rounded-lg ${!notification.read ? 'bg-blue-100' : 'bg-gray-100'}`}>
                                  <Bell className={`w-4 h-4 ${!notification.read ? 'text-blue-600' : 'text-gray-500'}`} />
                                </div>
                                <div>
                                  <p className="font-medium text-gray-900">{notification.title}</p>
                                  <p className="text-sm text-gray-500 mt-1">{notification.time}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="p-4 border-t border-gray-200">
                          <button className="w-full text-sm text-blue-600 hover:text-blue-700 font-medium text-center">
                            View all notifications
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <IconButton 
                  icon={<Settings className="w-4 h-4 text-blue-700" />} 
                  tooltip="Settings"
                />

                <div className="h-6 w-px bg-gray-200/60 mx-1" />
              </>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button 
              onClick={handleProfileClick}
              className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-100/50 transition-all duration-200 group"
            >
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-sm">
                  <User className="w-4.5 h-4.5 text-white" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              
              {!isSmallScreen && (
                <>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-900">Admin User</p>
                    <p className="text-xs text-gray-500">Administrator</p>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${showProfileMenu ? 'rotate-180' : ''}`} />
                </>
              )}
            </button>

            {/* Profile Menu Dropdown */}
            {showProfileMenu && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setShowProfileMenu(false)}
                />
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 z-50 animate-in fade-in-0 zoom-in-95">
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Admin User</p>
                        <p className="text-sm text-gray-500">admin@school.edu</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-2">
                    <DropdownItem icon={<User className="w-4 h-4" />} label="My Profile" />
                    <DropdownItem icon={<Settings className="w-4 h-4" />} label="Settings" />
                    
                    <div className="h-px bg-gray-200 my-2"></div>
                    
                    <DropdownItem 
                      icon={<LogOut className="w-4 h-4" />} 
                      label="Sign Out" 
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
})

function IconButton({ 
  icon, 
  tooltip, 
  onClick,
  active = false,
  badge = 0
}: { 
  icon: React.ReactNode
  tooltip?: string
  onClick?: () => void
  active?: boolean
  badge?: number
}) {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={onClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`
          relative w-9 h-9 rounded-lg flex items-center justify-center 
          transition-all duration-200
          ${active 
            ? 'bg-blue-50 text-blue-600' 
            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
          }
        `}
      >
        {icon}
        
        {badge > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1.5 rounded-full bg-red-500 text-white text-[10px] font-medium flex items-center justify-center border-2 border-white">
            {badge > 9 ? '9+' : badge}
          </span>
        )}
      </button>
      
      {tooltip && showTooltip && (
        <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-lg whitespace-nowrap z-50 shadow-lg">
          {tooltip}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-gray-900" />
        </div>
      )}
    </div>
  )
}

function DropdownItem({ 
  icon, 
  label, 
  onClick,
  className = ''
}: { 
  icon: React.ReactNode
  label: string
  onClick?: () => void
  className?: string
}) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
        text-gray-700 hover:bg-gray-100 hover:text-gray-900
        transition-colors duration-200 text-sm font-medium
        ${className}
      `}
    >
      <div className="text-gray-500">
        {icon}
      </div>
      {label}
    </button>
  )
}

export default Header