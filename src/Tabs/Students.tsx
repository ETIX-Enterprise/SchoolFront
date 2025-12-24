import React, { useState } from 'react'
import { Search, DownloadCloud, UploadCloud, Plus, Calendar, Users, Filter, X, UserPlus, GraduationCap } from 'lucide-react'
import StudentTable from '../components/studentTable'

type Student = {
  id: number
  name: string
  grade: string
  phone: string
  city: string
  district: string
  status: 'Arrived' | 'Pending'
}

type YearGroup = {
  year: string
  students: Student[]
}

const RWANDA_CITIES = ['Kigali', 'Southern', 'Northern', 'Eastern', 'Western']
const RWANDA_DISTRICTS: Record<string, string[]> = {
  Kigali: ['Gasabo', 'Kicukiro', 'Nyarugenge'],
  Southern: ['Huye', 'Nyanza', 'Gisagara', 'Nyamagabe', 'Muhanga', 'Kamonyi', 'Ruhango', 'Nyaruguru'],
  Northern: ['Musanze', 'Gakenke', 'Gicumbi', 'Rulindo', 'Burera'],
  Eastern: ['Rwamagana', 'Kayonza', 'Ngoma', 'Kirehe', 'Bugesera', 'Gatsibo', 'Nyagatare'],
  Western: ['Rubavu', 'Rusizi', 'Rutsiro', 'Nyamasheke', 'Karongi', 'Ngororero'],
}

function Students() {
  const [years, setYears] = useState<YearGroup[]>([
    {
      year: '2024 / Year 3',
      students: [
        {
          id: 1,
          name: 'UMUKURA Olivier',
          grade: 'Year 3',
          phone: '+250 788 924 456',
          city: 'Kigali',
          district: 'Kicukiro',
          status: 'Arrived',
        },
      ],
    },
  ])

  const [activeYear, setActiveYear] = useState(0)
  const [search, setSearch] = useState('')
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [showYearModal, setShowYearModal] = useState(false)
  const [showStudentModal, setShowStudentModal] = useState(false)
  const [newYear, setNewYear] = useState('')
  
  const [studentForm, setStudentForm] = useState<Omit<Student, 'id'>>({
    name: '',
    grade: '',
    phone: '',
    city: '',
    district: '',
    status: 'Pending',
  })

  const addYear = () => {
    if (!newYear.trim()) return
    setYears((prev) => [...prev, { year: newYear, students: [] }])
    setActiveYear(years.length)
    setNewYear('')
    setShowYearModal(false)
  }

  const addStudent = () => {
    if (!studentForm.name.trim()) return
    const newStudent: Student = {
      id: Date.now(),
      ...studentForm,
      grade: years[activeYear].year,
    }
    setYears((prev) =>
      prev.map((y, i) =>
        i === activeYear
          ? { ...y, students: [...y.students, newStudent] }
          : y
      )
    )
    setStudentForm({
      name: '',
      grade: '',
      phone: '',
      city: '',
      district: '',
      status: 'Pending',
    })
    setShowStudentModal(false)
  }

  const deleteStudent = (id: number) => {
    setYears((prev) =>
      prev.map((y, i) =>
        i === activeYear
          ? { ...y, students: y.students.filter((s) => s.id !== id) }
          : y
      )
    )
  }

  const filteredStudents = years[activeYear].students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  )

  const exportYear = () => {
    const rows = years[activeYear].students
    const csv = [
      'Name,Grade,Phone,City,District,Status',
      ...rows.map(
        (s) =>
          `${s.name},${s.grade},${s.phone},${s.city},${s.district},${s.status}`
      ),
    ].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `${years[activeYear].year}-students.csv`
    link.click()
  }

  const totalStudents = years.reduce((sum, year) => sum + year.students.length, 0)
  const activeYearStudents = years[activeYear].students.length
  const arrivedStudents = years[activeYear].students.filter(s => s.status === 'Arrived').length

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 shadow-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Student Management</h1>
                <p className="text-gray-600 mt-1">Organize and track students across academic years</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setShowYearModal(true)}
              className="inline-flex items-center gap-2 px-5 py-3 text-gray-700 font-medium rounded-xl border border-gray-300 hover:border-gray-400 hover:bg-white transition-all duration-200 shadow-sm"
            >
              <Plus className="h-5 w-5" />
              Add Year
            </button>
            <button
              onClick={exportYear}
              className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200"
            >
              <DownloadCloud className="h-5 w-5" />
              Export Report
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{totalStudents}</p>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full w-full bg-blue-600 rounded-full"></div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Current Year</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{activeYearStudents}</p>
                <p className="text-sm text-gray-500 mt-1">in {years[activeYear].year}</p>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-600">{arrivedStudents} arrived</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                <span className="text-sm text-gray-600">{activeYearStudents - arrivedStudents} pending</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Academic Years</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{years.length}</p>
                <p className="text-sm text-gray-500 mt-1">Manage student groups</p>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-br from-amber-50 to-amber-100">
                <GraduationCap className="h-6 w-6 text-amber-600" />
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <div className="flex-1 h-2 bg-gray-200 rounded-full">
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"
                  style={{ width: `${((activeYear + 1) / years.length) * 100}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium text-gray-700">{activeYear + 1} of {years.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Header with Year Tabs */}
        <div className="border-b border-gray-200 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
            {/* Year Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0">
              {years.map((y, i) => (
                <button
                  key={i}
                  onClick={() => setActiveYear(i)}
                  className={`relative flex-shrink-0 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ${
                    i === activeYear
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {y.year}
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      i === activeYear ? 'bg-white/20' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {y.students.length}
                    </span>
                  </div>
                  {i === activeYear && (
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 w-8 bg-blue-600 rounded-t-full" />
                  )}
                </button>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowUploadModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-gray-700 font-medium rounded-lg border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-colors"
              >
                <UploadCloud className="h-4 w-4" />
                Upload CSV
              </button>
              <button
                onClick={() => setShowStudentModal(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all"
              >
                <UserPlus className="h-5 w-5" />
                Add Student
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search students by name, phone, or district..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* Table Section */}
        <div className="p-6">
          <StudentTable data={filteredStudents} onDelete={deleteStudent} />
          
          {/* Empty State */}
          {filteredStudents.length === 0 && (
            <div className="text-center py-12">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-gray-50 to-gray-100">
                <Users className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {search ? 'No matching students found' : 'No students in this year'}
              </h3>
              <p className="text-gray-500 mb-6">
                {search ? 'Try adjusting your search terms' : 'Start by adding students to this academic year'}
              </p>
              <button
                onClick={() => setShowStudentModal(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all"
              >
                <UserPlus className="h-5 w-5" />
                Add First Student
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <Modal title="Upload Student Data" onClose={() => setShowUploadModal(false)}>
          <div className="space-y-6">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-50 to-indigo-50">
                <UploadCloud className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Upload CSV File</h3>
              <p className="text-gray-500">Upload a CSV file containing student information</p>
            </div>

            <div
              className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all ${
                selectedFile
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50/50'
              }`}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault()
                const file = e.dataTransfer.files[0]
                if (file) setSelectedFile(file)
              }}
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              <UploadCloud className={`h-12 w-12 mb-4 ${
                selectedFile ? 'text-green-600' : 'text-gray-400'
              }`} />
              
              {selectedFile ? (
                <div className="text-center">
                  <p className="font-medium text-gray-900">{selectedFile.name}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {(selectedFile.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600">
                    Drag & drop or <span className="text-blue-600">click to browse</span>
                  </p>
                  <p className="text-xs text-gray-400 mt-1">CSV files only (max 10MB)</p>
                </div>
              )}
              
              <input
                id="file-upload"
                type="file"
                accept=".csv"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setSelectedFile(e.target.files[0])
                  }
                }}
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                onClick={() => {
                  setShowUploadModal(false)
                  setSelectedFile(null)
                }}
                className="px-4 py-2.5 text-gray-700 font-medium rounded-lg border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!selectedFile) return
                  console.log('Uploading:', selectedFile)
                  setShowUploadModal(false)
                  setSelectedFile(null)
                }}
                disabled={!selectedFile}
                className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg shadow-sm hover:shadow-md disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all"
              >
                Upload File
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Add Year Modal */}
      {showYearModal && (
        <Modal title="Add Academic Year" onClose={() => setShowYearModal(false)}>
          <div className="space-y-6">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-50 to-violet-50">
                <Calendar className="h-8 w-8 text-purple-600" />
              </div>
              <p className="text-gray-500">Create a new academic year for student grouping</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Academic Year
              </label>
              <input
                type="text"
                value={newYear}
                onChange={(e) => setNewYear(e.target.value)}
                placeholder="e.g., 2024 / Year 3"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
              <p className="mt-2 text-sm text-gray-500">
                Use format: "Year / Grade" (e.g., "2024 / Year 3")
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                onClick={() => setShowYearModal(false)}
                className="px-4 py-2.5 text-gray-700 font-medium rounded-lg border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={addYear}
                disabled={!newYear.trim()}
                className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg shadow-sm hover:shadow-md disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all"
              >
                Create Year
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Add Student Modal */}
      {showStudentModal && (
        <Modal title="Add New Student" onClose={() => setShowStudentModal(false)}>
          <div className="space-y-6">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-50 to-emerald-50">
                <UserPlus className="h-8 w-8 text-green-600" />
              </div>
              <p className="text-gray-500">Fill in student details for {years[activeYear].year}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Student Name *
                </label>
                <input
                  type="text"
                  value={studentForm.name}
                  onChange={(e) => setStudentForm(p => ({ ...p, name: e.target.value }))}
                  placeholder="Full name"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Parent Phone *
                </label>
                <input
                  type="tel"
                  value={studentForm.phone}
                  onChange={(e) => setStudentForm(p => ({ ...p, phone: e.target.value }))}
                  placeholder="+250 788 123 456"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  City / Province *
                </label>
                <select
                  value={studentForm.city}
                  onChange={(e) => setStudentForm(p => ({ 
                    ...p, 
                    city: e.target.value,
                    district: ''
                  }))}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="">Select city</option>
                  {RWANDA_CITIES.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  District *
                </label>
                <select
                  value={studentForm.district}
                  onChange={(e) => setStudentForm(p => ({ ...p, district: e.target.value }))}
                  disabled={!studentForm.city}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors disabled:bg-gray-50 disabled:text-gray-500"
                >
                  <option value="">Select district</option>
                  {(RWANDA_DISTRICTS[studentForm.city] || []).map(district => (
                    <option key={district} value={district}>{district}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Health Status
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="health"
                      checked={studentForm.status === 'Pending'}
                      onChange={() => setStudentForm(p => ({ ...p, status: 'Pending' }))}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Healthy</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="health"
                      checked={studentForm.status === 'Arrived'}
                      onChange={() => setStudentForm(p => ({ ...p, status: 'Arrived' }))}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Sick</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
              <button
                onClick={() => setShowStudentModal(false)}
                className="px-4 py-2.5 text-gray-700 font-medium rounded-lg border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={addStudent}
                disabled={!studentForm.name.trim() || !studentForm.phone.trim() || !studentForm.city || !studentForm.district}
                className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg shadow-sm hover:shadow-md disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all"
              >
                Add Student
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}

function Modal({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl">
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Students