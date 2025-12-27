import React, { useState } from 'react'
import { 
  Filter, 
  FileText, 
  Upload, 
  Users, 
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Bus,
  FileUp,
  X,
  Eye,
  School
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

type Notification = {
  id: number
  type: 'booking' | 'journey' | 'incident'
  title: string
  description: string
  time: string
}

type Student = {
  id: number
  name: string
  grade: string
  parentPhone: string
}

type Schedule = {
  id: number
  date: string
  route: string
  pickupTime: string
  studentCount: number
  students: Student[]
}

function Home() {
  const navigate = useNavigate()
  const [uploadYear, setUploadYear] = useState(new Date().getFullYear().toString())
  const [isDragging, setIsDragging] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [showStudentModal, setShowStudentModal] = useState(false)
  const [selectedStudents, setSelectedStudents] = useState<Student[]>([])

  // Notifications data
  const notifications: Notification[] = [
    {
      id: 1,
      type: 'booking',
      title: 'New Booking Confirmed',
      description: 'John Doe - Morning Route A has been confirmed',
      time: '5 min ago'
    },
    {
      id: 2,
      type: 'journey',
      title: 'Journey Started',
      description: 'Bus #12 has started Route B - 25 students onboard',
      time: '12 min ago'
    },
    {
      id: 3,
      type: 'incident',
      title: 'Incident Report',
      description: 'Minor delay on Route C due to traffic',
      time: '1 hour ago'
    },
    {
      id: 4,
      type: 'booking',
      title: 'Booking Confirmed',
      description: 'Sarah Smith - Evening Route D confirmed',
      time: '2 hours ago'
    }
  ]

  // Pickup Schedule data
  const pickupSchedule: Schedule[] = [
    { 
      id: 1, 
      date: 'Mon, Dec 23', 
      route: 'Route A - Kicukiro', 
      pickupTime: '07:00 AM', 
      studentCount: 25,
      students: [
        { id: 1, name: 'Alice Johnson', grade: 'Grade 10', parentPhone: '+250 788 123 456' },
        { id: 2, name: 'Bob Smith', grade: 'Grade 10', parentPhone: '+250 788 234 567' },
        { id: 3, name: 'Carol White', grade: 'Grade 11', parentPhone: '+250 788 345 678' },
        { id: 4, name: 'David Brown', grade: 'Grade 9', parentPhone: '+250 788 456 789' },
        { id: 5, name: 'Emma Davis', grade: 'Grade 10', parentPhone: '+250 788 567 890' }
      ]
    },
    { 
      id: 2, 
      date: 'Mon, Dec 23', 
      route: 'Route B - Remera', 
      pickupTime: '07:15 AM', 
      studentCount: 18,
      students: [
        { id: 6, name: 'Frank Wilson', grade: 'Grade 12', parentPhone: '+250 788 678 901' },
        { id: 7, name: 'Grace Taylor', grade: 'Grade 11', parentPhone: '+250 788 789 012' },
        { id: 8, name: 'Henry Moore', grade: 'Grade 10', parentPhone: '+250 788 890 123' }
      ]
    },
    { 
      id: 3, 
      date: 'Mon, Dec 23', 
      route: 'Route C - Kimironko', 
      pickupTime: '07:30 AM', 
      studentCount: 32,
      students: [
        { id: 9, name: 'Iris Anderson', grade: 'Grade 9', parentPhone: '+250 788 901 234' },
        { id: 10, name: 'Jack Thomas', grade: 'Grade 11', parentPhone: '+250 788 012 345' },
        { id: 11, name: 'Kate Martinez', grade: 'Grade 10', parentPhone: '+250 788 123 456' }
      ]
    },
    { 
      id: 4, 
      date: 'Mon, Dec 23', 
      route: 'Route D - Nyarutarama', 
      pickupTime: '07:45 AM', 
      studentCount: 21,
      students: [
        { id: 12, name: 'Liam Garcia', grade: 'Grade 12', parentPhone: '+250 788 234 567' },
        { id: 13, name: 'Mia Rodriguez', grade: 'Grade 11', parentPhone: '+250 788 345 678' }
      ]
    }
  ]

  const currentYear = new Date().getFullYear()
  const registeredStudents = 10500

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
        return <CheckCircle2 className="w-5 h-5 text-green-600" />
      case 'journey':
        return <Bus className="w-5 h-5 text-blue-600" />
      case 'incident':
        return <AlertCircle className="w-5 h-5 text-orange-600" />
      default:
        return <CheckCircle2 className="w-5 h-5 text-gray-600" />
    }
  }

  return (
    <div className='w-full flex-1 space-y-6 mb-10 h-full'>
      {/* Header */}
      <header className="w-full px-6 py-4 bg-white border-b border-gray-200 flex justify-between items-center">
          <div>
            <h1 className="text-[17px] font-semibold  tracking-tight bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent">Mubiligi Catholic School</h1>
            <p className="text-gray-600  text-[14px]">
              Manage students across academic years
            </p>
          </div>

        <div className="flex gap-3">
          <button className="px-4 py-2 text-[14px] font-semibold rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-200 flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </button>

          <button className="px-4 py-2 text-[14px] font-semibold rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 text-white hover:bg-green-800 transition-all duration-200 flex items-center gap-2 shadow-sm">
            <FileText className="w-4 h-4" />
            View Reports
          </button>
        </div>
      </header>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* Right Column - Pickup Schedule */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-[16px] font-semibold text-gray-900">Pickup Schedule</h3>
                <p className="text-[14px] text-gray-600 mt-1">Today's transportation schedule</p>
              </div>
              <button
                onClick={() => navigate('/Dashboard/booking')}
                className="px-4 py-2 text-[14px] font-medium rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all flex items-center gap-2"
              >
                View Details
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-[14px] font-semibold text-gray-700">Date</th>
                    <th className="text-left py-3 px-4 text-[14px] font-semibold text-gray-700">Route</th>
                    <th className="text-left py-3 px-4 text-[14px] font-semibold text-gray-700">Pickup Time</th>
                    <th className="text-left py-3 px-4 text-[14px] font-semibold text-gray-700">Students</th>
                  </tr>
                </thead>
                <tbody>
                  {pickupSchedule.map((schedule) => (
                    <tr
                      key={schedule.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-3 px-4 text-[14px] text-gray-900">{schedule.date}</td>
                      <td className="py-3 px-4 text-[14px] text-gray-600">{schedule.route}</td>
                      <td className="py-3 px-4 text-[14px] text-gray-600">{schedule.pickupTime}</td>
                      <td className="py-3 px-4">
                        <div className="flex  gap-2">
                          <span className="text-[14px] font-semibold text-gray-900">
                            {schedule.studentCount}
                          </span>
                          <button
                            onClick={() => handleViewStudents(schedule.students)}
                            className="inline-flex items-center gap-1 px-3 py-1 text-[12px] font-medium text-blue-800 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors w-fit"
                          >
                            <Eye className="w-3 h-3" />
                            View
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* Left Column - Overview + Upload */}
        <div className="space-y-6">
          {/* Registered Students Card - Compact */}
          <div className="bg-gradient-to-br from-blue-700 to-blue-800 rounded-lg p-5 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[12px] text-blue-100">Registered Students this year</p>
                <h2 className="text-2xl font-bold">{registeredStudents.toLocaleString()}</h2>
              </div>
            </div>

            {/* Status Overview - Compact Grid */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/20">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <div>
                  <p className="text-[10px] text-blue-200">Active students</p>
                  <p className="text-[14px] font-semibold">9,850</p>
                </div>
              </div>
              

              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <div>
                  <p className="text-[10px] text-blue-200">Pending Bookings</p>
                  <p className="text-[14px] font-semibold">12</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                <div>
                  <p className="text-[10px] text-blue-200">Pending Payments</p>
                  <p className="text-[14px] font-semibold">8</p>
                </div>
              </div>
            </div>

            {/* View Button */}
            <button 
              onClick={() => navigate('/Dashboard/students')}
              className="mt-4 w-full px-3 py-2 text-[13px] font-medium rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all duration-200 flex items-center justify-center gap-2 border border-white/20"
            >
              View All Details
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Upload Student List */}
          <div className="bg-white shadow-sm h-[220px] rounded-lg p-5">
            
            {/* Year Input */}
            <div className="mb-3">
              <label className="block text-[12px] font-medium text-gray-700 mb-2">
                Academic Year
              </label>
              <input
                type="text"
                value={uploadYear}
                onChange={(e) => setUploadYear(e.target.value)}
                placeholder="2024"
                className="w-full px-3 py-2 text-[14px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-transparent outline-none transition-all"
              />
            </div>

            {/* Drop Zone - Compact */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`
                relative border-2 h-[110px] border-dashed rounded-lg p-2  text-center transition-all duration-200
                ${isDragging 
                  ? 'border-blue-800 bg-blue-50' 
                  : 'border-gray-300 hover:border-gray-400 bg-gray-50'
                }
              `}
            >
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileSelect}
              />
              
              {uploadedFile ? (
                <div className="space-y-2">
                  <div className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <FileUp className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <p className="text-[12px] font-medium text-gray-900 truncate max-w-[120px]">
                      {uploadedFile.name}
                    </p>
                    <button
                      onClick={() => setUploadedFile(null)}
                      className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                    >
                      <X className="w-3 h-3 text-gray-500" />
                    </button>
                  </div>
                  <button className="w-full px-3 py-2 text-[13px] font-medium rounded-lg bg-blue-800 text-white hover:bg-blue-900 transition-all">
                    Upload File
                  </button>
                </div>
              ) : (
                <div className="space-y-1">
                  <div className="w-7 h-7 bg-gray-200 rounded-full flex items-center justify-center mx-auto">
                    <Upload className="w-3 h-3 text-gray-500" />
                  </div>
                  <div>
                    <p className="text-[12px] font-medium text-gray-900">
                      Drop file here
                    </p>
                    <p className="text-[12px] text-gray-500">
                      or{' '}
                      <label htmlFor="file-upload" className="text-blue-800 hover:text-blue-900 cursor-pointer font-medium">
                        browse
                      </label>
                    </p>
                  </div>
                  <p className="text-[11px] text-gray-400">
                    CSV, XLSX, XLS
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Notifications - Last Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-[16px] font-semibold text-gray-900">Recent Notifications</h3>
          <button className="text-[14px] text-blue-800 hover:text-blue-900 font-medium">
            View All
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="flex flex-col gap-2 p-4 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer border border-gray-100"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-[13px] font-semibold text-gray-900 mb-1">
                    {notification.title}
                  </h4>
                  <p className="text-[12px] text-gray-600 line-clamp-2">
                    {notification.description}
                  </p>
                  <p className="text-[11px] text-gray-400 mt-2">{notification.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Student List Modal */}
      {showStudentModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-[16px] font-semibold text-gray-900">Student List</h3>
              <button
                onClick={() => setShowStudentModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
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
                    <tr
                      key={student.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-3 px-4 text-[14px] text-gray-900">{student.name}</td>
                      <td className="py-3 px-4 text-[14px] text-gray-600">{student.grade}</td>
                      <td className="py-3 px-4 text-[14px] text-gray-600">{student.parentPhone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => setShowStudentModal(false)}
                className="px-4 py-2 text-[14px] font-medium rounded-lg bg-blue-800 text-white hover:bg-blue-900 transition-all w-full"
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

export default Home