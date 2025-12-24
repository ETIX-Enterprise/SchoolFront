import React, { useState } from 'react'
import { 
  Filter, 
  FileText, 
  Upload, 
  Users, 
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Bus,
  FileUp,
  X,
  Eye,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  TrendingUp,
  ShieldCheck,
  Download
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

type Notification = {
  id: number
  type: 'booking' | 'journey' | 'incident'
  title: string
  description: string
  time: string
  unread: boolean
}

type Student = {
  id: number
  name: string
  grade: string
  parentPhone: string
  parentEmail: string
  pickupLocation: string
}

type Schedule = {
  id: number
  date: string
  route: string
  pickupTime: string
  studentCount: number
  busNumber: string
  driver: string
  students: Student[]
}

function Home() {
  const navigate = useNavigate()
  const currentYear = new Date().getFullYear()
  const [uploadYear, setUploadYear] = useState(currentYear.toString())
  const [isDragging, setIsDragging] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [showStudentModal, setShowStudentModal] = useState(false)
  const [selectedStudents, setSelectedStudents] = useState<Student[]>([])
  const [activeScheduleFilter, setActiveScheduleFilter] = useState('today')

  // Student statistics
  const studentStats = {
    total: 10500,
    active: 9850,
    inactive: 650,
    pendingBookings: 12,
    pendingPayments: 8,
    averageAttendance: '98.2%',
    thisMonth: 342
  }

  // Notifications data
  const notifications: Notification[] = [
    {
      id: 1,
      type: 'booking',
      title: 'New Booking Confirmed',
      description: 'John Doe - Morning Route A has been confirmed',
      time: '5 min ago',
      unread: true
    },
    {
      id: 2,
      type: 'journey',
      title: 'Journey Started',
      description: 'Bus #12 has started Route B with 25 students',
      time: '12 min ago',
      unread: true
    },
    {
      id: 3,
      type: 'incident',
      title: 'Incident Report',
      description: 'Minor delay on Route C due to traffic',
      time: '1 hour ago',
      unread: false
    },
    {
      id: 4,
      type: 'booking',
      title: 'Booking Confirmed',
      description: 'Sarah Smith - Evening Route D confirmed',
      time: '2 hours ago',
      unread: false
    }
  ]

  // Pickup Schedule data
  const pickupSchedule: Schedule[] = [
    { 
      id: 1, 
      date: 'Today, Dec 23', 
      route: 'Route A - Kicukiro', 
      pickupTime: '07:00 AM', 
      studentCount: 25,
      busNumber: 'BUS-12',
      driver: 'John Kamali',
      students: [
        { 
          id: 1, 
          name: 'Alice Johnson', 
          grade: 'Grade 10', 
          parentPhone: '+250 788 123 456',
          parentEmail: 'parent.alice@email.com',
          pickupLocation: 'Kicukiro Center'
        },
        { 
          id: 2, 
          name: 'Bob Smith', 
          grade: 'Grade 10', 
          parentPhone: '+250 788 234 567',
          parentEmail: 'parent.bob@email.com',
          pickupLocation: 'Kicukiro Market'
        }
      ]
    },
    { 
      id: 2, 
      date: 'Today, Dec 23', 
      route: 'Route B - Remera', 
      pickupTime: '07:15 AM', 
      studentCount: 18,
      busNumber: 'BUS-08',
      driver: 'Marie Uwase',
      students: [
        { 
          id: 3, 
          name: 'Carol White', 
          grade: 'Grade 11', 
          parentPhone: '+250 788 345 678',
          parentEmail: 'parent.carol@email.com',
          pickupLocation: 'Remera Stadium'
        }
      ]
    },
    { 
      id: 3, 
      date: 'Today, Dec 23', 
      route: 'Route C - Kimironko', 
      pickupTime: '07:30 AM', 
      studentCount: 32,
      busNumber: 'BUS-15',
      driver: 'Peter Habimana',
      students: [
        { 
          id: 4, 
          name: 'David Brown', 
          grade: 'Grade 9', 
          parentPhone: '+250 788 456 789',
          parentEmail: 'parent.david@email.com',
          pickupLocation: 'Kimironko Market'
        }
      ]
    }
  ]

  // Today's schedule summary
  const todaysSummary = {
    totalTrips: pickupSchedule.length,
    totalStudents: pickupSchedule.reduce((sum, route) => sum + route.studentCount, 0),
    activeBuses: new Set(pickupSchedule.map(route => route.busNumber)).size,
    drivers: new Set(pickupSchedule.map(route => route.driver)).size
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = e.dataTransfer.files
    if (files.length > 0) {
      setUploadedFile(files[0])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      setUploadedFile(files[0])
    }
  }

  const handleViewStudents = (students: Student[]) => {
    setSelectedStudents(students)
    setShowStudentModal(true)
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'booking':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'journey':
        return <Bus className="w-5 h-5 text-blue-600" />
      case 'incident':
        return <AlertCircle className="w-5 h-5 text-orange-600" />
      default:
        return <CheckCircle className="w-5 h-5 text-gray-600" />
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'booking':
        return 'bg-green-50 border-green-100'
      case 'journey':
        return 'bg-blue-50 border-blue-100'
      case 'incident':
        return 'bg-orange-50 border-orange-100'
      default:
        return 'bg-gray-50 border-gray-100'
    }
  }

  const scheduleFilters = [
    { id: 'today', label: 'Today', count: 3 },
    { id: 'tomorrow', label: 'Tomorrow', count: 4 },
    { id: 'thisWeek', label: 'This Week', count: 12 }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Dashboard Overview</h1>
            <p className="text-gray-600 mt-2">Welcome back! Here's what's happening today.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 px-4 py-2.5 text-gray-700 font-medium rounded-lg border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-colors">
              <Filter className="h-4 w-4" />
              Filter
            </button>
            <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all">
              <FileText className="h-5 w-5" />
              Generate Report
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Left Column - Stats & Upload */}
        <div className="space-y-6">
          {/* Student Overview Card */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Student Overview</h3>
                  <p className="text-sm text-gray-500">Current academic year</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">{studentStats.total.toLocaleString()}</div>
                <div className="text-sm text-gray-500">Total Students</div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span className="text-sm font-medium text-gray-700">Active</span>
                </div>
                <div className="text-xl font-bold text-gray-900">{studentStats.active.toLocaleString()}</div>
                <div className="text-xs text-gray-500">Currently enrolled</div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                  <span className="text-sm font-medium text-gray-700">Inactive</span>
                </div>
                <div className="text-xl font-bold text-gray-900">{studentStats.inactive}</div>
                <div className="text-xs text-gray-500">Not currently enrolled</div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                  <span className="text-sm font-medium text-gray-700">Attendance</span>
                </div>
                <div className="text-xl font-bold text-gray-900">{studentStats.averageAttendance}</div>
                <div className="text-xs text-gray-500">Average rate</div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                  <span className="text-sm font-medium text-gray-700">This Month</span>
                </div>
                <div className="text-xl font-bold text-gray-900">+{studentStats.thisMonth}</div>
                <div className="text-xs text-gray-500">New registrations</div>
              </div>
            </div>

            <button 
              onClick={() => navigate('/Dashboard/students')}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:shadow-md transition-all"
            >
              View All Students
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Upload Card */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-green-50 to-green-100">
                <Upload className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Upload Student List</h3>
                <p className="text-sm text-gray-500">Import new student data</p>
              </div>
            </div>

            {/* Year Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Academic Year
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={uploadYear}
                  onChange={(e) => setUploadYear(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter academic year"
                />
              </div>
            </div>

            {/* Upload Area */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`
                border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 mb-4
                ${isDragging 
                  ? 'border-blue-500 bg-blue-50' 
                  : uploadedFile 
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                }
              `}
              onClick={() => !uploadedFile && document.getElementById('file-upload')?.click()}
            >
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileSelect}
              />
              
              {uploadedFile ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-3">
                    <div className="p-3 rounded-full bg-green-100">
                      <FileUp className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-gray-900">{uploadedFile.name}</p>
                      <p className="text-sm text-gray-500">
                        {(uploadedFile.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setUploadedFile(null)
                      }}
                      className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                    >
                      <X className="h-4 w-4 text-gray-500" />
                    </button>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation()
                      console.log('Uploading:', uploadedFile)
                      setUploadedFile(null)
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white font-medium rounded-lg hover:shadow-md transition-all"
                  >
                    <Upload className="h-4 w-4" />
                    Upload Now
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <div className="p-4 rounded-full bg-gray-100">
                      <Upload className="h-8 w-8 text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 mb-2">
                      Drag & drop or <span className="text-blue-600">browse files</span>
                    </p>
                    <p className="text-sm text-gray-500 mb-1">
                      Supports CSV, Excel files
                    </p>
                    <p className="text-xs text-gray-400">
                      Max file size: 10MB
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <ShieldCheck className="h-4 w-4 text-green-500" />
              <span>Your data is secure and encrypted</span>
            </div>
          </div>
        </div>

        {/* Right Column - Schedule & Notifications */}
        <div className="lg:col-span-2 space-y-6">
          {/* Today's Schedule */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100">
                    <Calendar className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Today's Schedule</h3>
                    <p className="text-sm text-gray-500">{pickupSchedule.length} trips scheduled</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  {/* Schedule Filters */}
                  <div className="flex items-center gap-2">
                    {scheduleFilters.map(filter => (
                      <button
                        key={filter.id}
                        onClick={() => setActiveScheduleFilter(filter.id)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                          activeScheduleFilter === filter.id
                            ? 'bg-blue-100 text-blue-700'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                        }`}
                      >
                        {filter.label}
                        {filter.count > 0 && (
                          <span className="ml-1.5 px-1.5 py-0.5 text-xs rounded-full bg-gray-200">
                            {filter.count}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => navigate('/Dashboard/booking')}
                    className="inline-flex items-center gap-2 px-4 py-2 text-gray-700 font-medium rounded-lg border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-colors"
                  >
                    View All
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Schedule Summary */}
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-white rounded-lg border border-gray-200">
                  <div className="text-lg font-bold text-gray-900">{todaysSummary.totalTrips}</div>
                  <div className="text-sm text-gray-500">Total Trips</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg border border-gray-200">
                  <div className="text-lg font-bold text-gray-900">{todaysSummary.totalStudents}</div>
                  <div className="text-sm text-gray-500">Students</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg border border-gray-200">
                  <div className="text-lg font-bold text-gray-900">{todaysSummary.activeBuses}</div>
                  <div className="text-sm text-gray-500">Active Buses</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg border border-gray-200">
                  <div className="text-lg font-bold text-gray-900">{todaysSummary.drivers}</div>
                  <div className="text-sm text-gray-500">Drivers</div>
                </div>
              </div>
            </div>

            {/* Schedule Table */}
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Time</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Route</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Driver</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Students</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pickupSchedule.map((schedule) => (
                      <tr
                        key={schedule.id}
                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span className="font-medium text-gray-900">{schedule.pickupTime}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div>
                            <div className="font-medium text-gray-900">{schedule.route}</div>
                            <div className="text-sm text-gray-500 flex items-center gap-1">
                              <Bus className="h-3 w-3" />
                              {schedule.busNumber}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-gray-700">{schedule.driver}</div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4 text-gray-400" />
                              <span className="font-medium text-gray-900">{schedule.studentCount}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <button
                            onClick={() => handleViewStudents(schedule.students)}
                            className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                          >
                            <Eye className="h-4 w-4" />
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100">
                  <AlertCircle className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Recent Notifications</h3>
                  <p className="text-sm text-gray-500">Latest updates and alerts</p>
                </div>
              </div>
              <button className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
                Mark all as read
              </button>
            </div>
            
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-start gap-4 p-4 rounded-xl border transition-all hover:shadow-sm cursor-pointer ${
                    getNotificationColor(notification.type)
                  } ${notification.unread ? 'border-l-4 border-l-blue-500' : ''}`}
                >
                  <div className="flex-shrink-0 mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="font-medium text-gray-900">{notification.title}</h4>
                      {notification.unread && (
                        <span className="inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{notification.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{notification.time}</span>
                      <button className="text-xs font-medium text-blue-600 hover:text-blue-700">
                        View details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Student List Modal */}
      {showStudentModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowStudentModal(false)} />
          <div className="relative flex min-h-full items-center justify-center p-4">
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl">
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-50">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Student List</h3>
                    <p className="text-sm text-gray-500">{selectedStudents.length} students</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowStudentModal(false)}
                  className="rounded-lg p-2 text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 max-h-[60vh] overflow-y-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Student</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Grade</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Contact</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Pickup</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedStudents.map((student) => (
                      <tr
                        key={student.id}
                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-4 px-4">
                          <div className="font-medium text-gray-900">{student.name}</div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {student.grade}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-1 text-sm text-gray-700">
                              <Phone className="h-3 w-3" />
                              {student.parentPhone}
                            </div>
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                              <Mail className="h-3 w-3" />
                              {student.parentEmail}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-1 text-sm text-gray-700">
                            <MapPin className="h-3 w-3" />
                            {student.pickupLocation}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Modal Footer */}
              <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    Showing {selectedStudents.length} students
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowStudentModal(false)}
                      className="px-4 py-2 text-gray-700 font-medium rounded-lg border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-colors"
                    >
                      Close
                    </button>
                    <button className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:shadow-md transition-all">
                      <Download className="h-4 w-4" />
                      Export List
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home