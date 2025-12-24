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
  Bus
} from 'lucide-react'
import BookingWizardModal from '../components/BookingWizardModal'
import ModernSelect from '../components/ModernSelect'

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
    districts: ['Gasabo', 'Kicukiro']
  },
  {
    id: 'BK-2024-002',
    route: 'Kigali → Rubavu',
    date: '2024-03-18',
    students: 32,
    status: 'confirmed',
    agency: 'Ritco',
    buses: 1,
    districts: ['Gasabo', 'Nyabihu']
  },
  {
    id: 'BK-2024-003',
    route: 'Huye → Nyanza',
    date: '2024-03-20',
    students: 28,
    status: 'completed',
    agency: 'Volcano Express',
    buses: 1,
    districts: ['Huye', 'Nyanza']
  },
  {
    id: 'BK-2024-004',
    route: 'Muhanga → Kigali',
    date: '2024-03-22',
    students: 56,
    status: 'pending',
    agency: 'Virunga Express',
    buses: 2,
    districts: ['Muhanga', 'Kamonyi']
  }
]

function Bookings() {
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [filter, setFilter] = useState<{ label: string; value: string } | undefined>()
  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filterOptions = [
    { label: 'All Routes', value: 'all' },
    { label: 'Kigali → Huye', value: 'Kigali-Huye' },
    { label: 'Kigali → Rubavu', value: 'Kigali-Rubavu' },
    { label: 'Huye → Nyanza', value: 'Huye-Nyanza' },
    { label: 'Muhanga → Kigali', value: 'Muhanga-Kigali' }
  ]

  const tabs = [
    { id: 'all', label: 'All', count: 12, color: 'bg-gray-100 text-gray-700' },
    { id: 'pending', label: 'Pending', count: 4, color: 'bg-orange-100 text-orange-700', icon: Clock },
    { id: 'confirmed', label: 'Confirmed', count: 6, color: 'bg-green-100 text-green-700', icon: CheckCircle },
    { id: 'completed', label: 'Completed', count: 5, color: 'bg-blue-100 text-blue-700', icon: CheckCircle },
    { id: 'canceled', label: 'Canceled', count: 1, color: 'bg-red-100 text-red-700', icon: XCircle }
  ]

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'pending': return <Clock className="w-4 h-4 text-orange-500" />
      case 'confirmed': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'completed': return <CheckCircle className="w-4 h-4 text-blue-500" />
      default: return <XCircle className="w-4 h-4 text-red-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'pending': return 'bg-orange-50 text-orange-700 border-orange-200'
      case 'confirmed': return 'bg-green-50 text-green-700 border-green-200'
      case 'completed': return 'bg-blue-50 text-blue-700 border-blue-200'
      default: return 'bg-red-50 text-red-700 border-red-200'
    }
  }

  const filteredBookings = mockBookings.filter(booking => {
    if (activeTab !== 'all' && booking.status !== activeTab) return false
    if (filter && filter.value !== 'all' && !booking.route.includes(filter.label.split(' → ')[1] || '')) return false
    if (searchQuery && !booking.id.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !booking.route.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const stats = {
    total: 12,
    pending: 4,
    confirmed: 6,
    completed: 5,
    canceled: 1,
    totalStudents: 234,
    activeRoutes: 8
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Transport Bookings</h1>
            <p className="text-gray-500 mt-2">Manage and track student transportation schedules</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 px-4 py-2.5 text-gray-700 font-medium rounded-lg border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button
              onClick={() => setShowBookingModal(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg shadow-sm hover:shadow-md hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
            >
              <Plus className="w-5 h-5" />
              New Booking
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-5 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-50">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.totalStudents}</p>
              </div>
              <div className="p-3 rounded-lg bg-green-50">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Routes</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.activeRoutes}</p>
              </div>
              <div className="p-3 rounded-lg bg-purple-50">
                <MapPin className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Actions</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.pending}</p>
              </div>
              <div className="p-3 rounded-lg bg-orange-50">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Tabs */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search bookings by ID or route..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Filter */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filter:</span>
            </div>
            <div className="w-48">
              <ModernSelect
                value={filter}
                options={filterOptions}
                placeholder="Filter by route"
                onChange={setFilter}
              />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map(tab => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative inline-flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {Icon && <Icon className="w-4 h-4" />}
                <span>{tab.label}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                  activeTab === tab.id ? 'bg-white/20' : tab.color
                }`}>
                  {tab.count}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {filteredBookings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Booking ID</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Route</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Date</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Students</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Agency</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Status</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-mono text-sm font-medium text-gray-900">{booking.id}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-blue-50">
                          <Bus className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{booking.route}</div>
                          <div className="text-xs text-gray-500">{booking.districts.join(' → ')}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm text-gray-900">
                        {new Date(booking.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="font-medium text-gray-900">{booking.students}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-700">{booking.agency}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
                        {getStatusIcon(booking.status)}
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <button className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          // Empty State
          <div className="p-12 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-50 to-indigo-50">
              <Calendar className="h-10 w-10 text-blue-600" />
            </div>
            
            <h3 className="mb-2 text-xl font-semibold text-gray-900">No bookings found</h3>
            <p className="mb-8 text-gray-500 max-w-md mx-auto">
              {searchQuery || filter ? 
                'Try adjusting your search or filter criteria' :
                'Get started by creating your first transportation booking'
              }
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => setShowBookingModal(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:shadow-md transition-all"
              >
                <Plus className="w-5 h-5" />
                Create Booking
              </button>
              
              {(searchQuery || filter) && (
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setFilter(undefined)
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-gray-700 font-medium rounded-lg border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {showBookingModal && (
        <BookingWizardModal onClose={() => setShowBookingModal(false)} />
      )}
    </div>
  )
}

export default Bookings