import React, { useState } from 'react'
import { 
  Calendar,
  Filter,
  Plus,
  Clock,
  CheckCircle,
  XCircle,
  Download,
  MoreVertical,
  Search,
  Users,
  MapPin,
  Bus,
  Eye,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

// Mock data for demonstration
const mockBookings = [
  {
    id: 'BK-2024-001',
    route: 'Kigali → Huye',
    date: '2024-03-15',
    students: 45,
    status: 'pending',
    agency: 'Volcano Express',
    buses: 2,
    districts: ['Gasabo', 'Kicukiro'],
    studentsList: [
      { id: 1, name: 'Alice Johnson', grade: 'Grade 10', phone: '+250 788 123 456' },
      { id: 2, name: 'Bob Smith', grade: 'Grade 11', phone: '+250 788 234 567' },
    ]
  },
  {
    id: 'BK-2024-002',
    route: 'Kigali → Rubavu',
    date: '2024-03-18',
    students: 32,
    status: 'confirmed',
    agency: 'Ritco',
    buses: 1,
    districts: ['Gasabo', 'Nyabihu'],
    studentsList: [
      { id: 3, name: 'Carol White', grade: 'Grade 9', phone: '+250 788 345 678' },
    ]
  },
  {
    id: 'BK-2024-003',
    route: 'Huye → Nyanza',
    date: '2024-03-20',
    students: 28,
    status: 'completed',
    agency: 'Volcano Express',
    buses: 1,
    districts: ['Huye', 'Nyanza'],
    studentsList: []
  },
  {
    id: 'BK-2024-004',
    route: 'Muhanga → Kigali',
    date: '2024-03-22',
    students: 56,
    status: 'pending',
    agency: 'Virunga Express',
    buses: 2,
    districts: ['Muhanga', 'Kamonyi'],
    studentsList: []
  }
]

function Bookings() {
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [showStudentModal, setShowStudentModal] = useState(false)
  const [selectedStudents, setSelectedStudents] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [cardIndex, setCardIndex] = useState(0)
  const [isSliding, setIsSliding] = useState(false)
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right')

  const tabs = [
    { id: 'all', label: 'All', count: 12 },
    { id: 'pending', label: 'Pending', count: 4 },
    { id: 'confirmed', label: 'Confirmed', count: 6 },
    { id: 'completed', label: 'Completed', count: 5 },
    { id: 'canceled', label: 'Canceled', count: 1 }
  ]

  const stats = [
    { title: 'Total Bookings', value: 12, icon: Calendar, color: 'from-blue-700 to-blue-800' },
    { title: 'Pending Actions', value: 4, icon: Clock, color: 'from-orange-600 to-orange-700' },
    { title: 'Total Students', value: 234, icon: Users, color: 'from-green-600 to-green-700' },
    { title: 'Active Routes', value: 8, icon: MapPin, color: 'from-purple-600 to-purple-700' }
  ]

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'pending': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-200'
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200'
      default: return 'bg-red-100 text-red-800 border-red-200'
    }
  }

  const filteredBookings = mockBookings.filter(booking => {
    if (activeTab !== 'all' && booking.status !== activeTab) return false
    if (searchQuery && !booking.id.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !booking.route.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const handleViewStudents = (students: any[]) => {
    setSelectedStudents(students)
    setShowStudentModal(true)
  }

  const nextCard = () => {
    if (cardIndex < stats.length - 1) {
      setSlideDirection('left')
      setIsSliding(true)
      setTimeout(() => {
        setCardIndex(cardIndex + 1)
        setIsSliding(false)
      }, 300)
    }
  }

  const prevCard = () => {
    if (cardIndex > 0) {
      setSlideDirection('right')
      setIsSliding(true)
      setTimeout(() => {
        setCardIndex(cardIndex - 1)
        setIsSliding(false)
      }, 300)
    }
  }

  const CurrentIcon = stats[cardIndex].icon

  return (
    <div className='w-full flex-1 space-y-6 h-full'>
      {/* Header */}
      <header className="w-full px-6 py-4 bg-white border-b border-gray-200 flex justify-between items-center">
        <div>
          <h1 className="text-[16px] font-semibold text-gray-900">Transport Bookings</h1>
          <p className="text-gray-600 text-[14px]">Manage and track student transportation schedules</p>
        </div>

        <div className="flex gap-3">
          <button className="px-4 py-2 text-[14px] font-medium rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-200 flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </button>

          <button 
            onClick={() => setShowBookingModal(true)}
            className="px-4 py-2 text-[14px] font-medium rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-800 hover:to-blue-900 transition-all duration-200 flex items-center gap-2 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            New Booking
          </button>
        </div>
      </header>

      {/* Stats Carousel Card */}
      <div className="px-6">
        <div className="bg-gradient-to-r h-[200px] from-blue-700 to-blue-800 w-full max-w-md rounded-xl p-5 text-white shadow-lg relative overflow-hidden">
          <div className={`transition-all duration-300 ${isSliding ? `opacity-0 ${slideDirection === 'left' ? '-translate-x-8' : 'translate-x-8'}` : 'opacity-100 translate-x-0'}`}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[12px] text-blue-100">{stats[cardIndex].title}</p>
                <p className="text-3xl font-bold mt-2">{stats[cardIndex].value}</p>
              </div>
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <CurrentIcon className="w-7 h-7 text-white" />
              </div>
            </div>

            <div className="pt-3 border-t border-white/20">
              <p className="text-[13px] text-blue-100">
                {cardIndex === 0 && `${tabs.reduce((acc, tab) => acc + tab.count, 0)} total bookings across all statuses`}
                {cardIndex === 1 && 'Requires immediate attention'}
                {cardIndex === 2 && 'Students traveling this period'}
                {cardIndex === 3 && 'Currently active routes'}
              </p>
            </div>
          </div>

          {/* Navigation */}
          {stats.length > 1 && (
            <>
              <div className="absolute bottom-5 right-5 flex items-center gap-2">
                <button
                  onClick={prevCard}
                  disabled={cardIndex === 0}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                    cardIndex === 0
                      ? 'bg-white/10 text-white/30 cursor-not-allowed'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextCard}
                  disabled={cardIndex === stats.length - 1}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                    cardIndex === stats.length - 1
                      ? 'bg-white/10 text-white/30 cursor-not-allowed'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="absolute bottom-5 left-5 flex items-center gap-1.5">
                {stats.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      if (idx !== cardIndex) {
                        setSlideDirection(idx > cardIndex ? 'left' : 'right')
                        setIsSliding(true)
                        setTimeout(() => {
                          setCardIndex(idx)
                          setIsSliding(false)
                        }, 300)
                      }
                    }}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === cardIndex
                        ? 'w-6 bg-white'
                        : 'w-1.5 bg-white/40 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="px-2">
        <div className="bg-white rounded-lg overflow-hidden">
          {/* Toolbar */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
              {/* Search Bar */}
              <div className="relative w-full lg:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search bookings by ID or route..."
                  className="w-full pl-9 pr-3 py-2.5 text-[14px] border border-gray-300 rounded-lg focus:border-blue-800 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                />
              </div>

              <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:border-blue-800 hover:bg-blue-50 transition-all duration-200 group">
                <Filter className="w-4 h-4 text-gray-600 group-hover:text-blue-800" />
                <span className="text-[14px] font-medium text-gray-700 group-hover:text-blue-800">Filter Routes</span>
              </button>
            </div>

            {/* Status Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg text-[14px] font-medium whitespace-nowrap transition-all duration-200 ${
                    tab.id === activeTab 
                      ? 'bg-gradient-to-r from-blue-700 to-blue-800 text-white shadow-md' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tab.label}
                  <span className={`ml-2 px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                    tab.id === activeTab ? 'bg-white/20' : 'bg-gray-300'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Bookings Table */}
          <div className="overflow-x-auto">
            {filteredBookings.length > 0 ? (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-300 ">
                    <th className="py-5 px-6 text-left">
                      <span className="text-[14px] font-semibold text-black">Booking ID</span>
                    </th>
                    <th className="py-5 px-6 text-left">
                      <span className="text-[14px] font-semibold text-black">Route</span>
                    </th>
                    <th className="py-5 px-6 text-left">
                      <span className="text-[14px] font-semibold text-black">Date</span>
                    </th>
                    <th className="py-5 px-6 text-left">
                      <span className="text-[14px] font-semibold text-black">Students</span>
                    </th>
                    <th className="py-5 px-6 text-left">
                      <span className="text-[14px] font-semibold text-black">Agency</span>
                    </th>
                    <th className="py-5 px-6 text-left">
                      <span className="text-[14px] font-semibold text-black">Status</span>
                    </th>
                    <th className="py-5 px-6 text-left">
                      <span className="text-[14px] font-semibold text-black">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((booking) => (
                    <tr key={booking.id} className="border-b border-gray-100 hover:bg-blue-50/30 transition-colors">
                      <td className="py-5 px-6">
                        <div className="font-mono text-[14px] font-medium text-gray-900">{booking.id}</div>
                      </td>
                      <td className="py-5 px-6">
                        <div className="flex items-center gap-3">
                          <div>
                            <div className="font-medium text-[14px] text-gray-900">{booking.route}</div>
                            <div className="text-[14px] text-gray-500">{booking.districts.join(' → ')}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-5 px-6">
                        <div className="text-[14px] text-gray-900 whitespace-nowrap">
                          {new Date(booking.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </div>
                      </td>
                      <td className="py-5 px-6">
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-gray-400" />
                            <span className="font-semibold text-[14px] text-gray-900">{booking.students}</span>
                          </div>
                          <button
                            onClick={() => handleViewStudents(booking.studentsList)}
                            className="inline-flex items-center gap-1 px-3 py-1 text-[12px] font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors w-fit"
                          >
                            <Eye className="w-3 h-3" />
                            View
                          </button>
                        </div>
                      </td>
                      <td className="py-5 px-6">
                        <span className="text-[14px] text-gray-700">{booking.agency}</span>
                      </td>
                      <td className="py-5 px-6">
                        <span className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[14px] font-medium  ${getStatusColor(booking.status)}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            booking.status === 'pending' ? 'bg-orange-100' :
                            booking.status === 'confirmed' ? 'bg-green-100' :
                            booking.status === 'completed' ? 'bg-blue-100' : 'bg-red-100'
                          }`}></span>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-5 px-6">
                        <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
                <p className="text-gray-600 text-[14px] mb-4">
                  {searchQuery ? 'Try a different search term' : 'Add your first booking to get started'}
                </p>
                {!searchQuery && (
                  <button
                    onClick={() => setShowBookingModal(true)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-700 to-blue-800 text-white rounded-lg hover:from-blue-800 hover:to-blue-900 transition-all duration-200"
                  >
                    <Plus className="w-4 h-4" />
                    <span className="text-[14px] font-medium">New Booking</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Student List Modal */}
      {showStudentModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-[16px] font-semibold text-gray-900">Student List</h3>
              <button
                onClick={() => setShowStudentModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
              {selectedStudents.length > 0 ? (
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-[14px] font-semibold text-gray-700">Student Name</th>
                      <th className="text-left py-3 px-4 text-[14px] font-semibold text-gray-700">Grade</th>
                      <th className="text-left py-3 px-4 text-[14px] font-semibold text-gray-700">Parent Phone</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedStudents.map((student) => (
                      <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-[14px] text-gray-900">{student.name}</td>
                        <td className="py-3 px-4 text-[14px] text-gray-600">{student.grade}</td>
                        <td className="py-3 px-4 text-[14px] text-gray-600">{student.phone}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 text-[14px]">No student details available</p>
                </div>
              )}
            </div>

            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => setShowStudentModal(false)}
                className="px-4 py-2 text-[14px] font-medium rounded-lg bg-gradient-to-r from-blue-700 to-blue-800 text-white hover:from-blue-800 hover:to-blue-900 transition-all w-full"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="p-5"></div>
    </div>
  )
}

export default Bookings