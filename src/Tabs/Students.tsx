
import React, { useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { DownloadCloud, UploadCloud, Plus, X, FileUp, CalendarPlus, UserPlus, ChevronDown, ChevronLeft, ChevronRight, List, Calendar, ArrowRight, Bus, BusFront } from 'lucide-react'
import StudentTable from '../components/studentTable'
import { BsCurrencyBitcoin } from 'react-icons/bs'

// ---------------- TYPES ----------------
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

// ---------------- COMPONENT ----------------
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
        {
          id: 2,
          name: 'MUGISHA Jean',
          grade: 'Year 3',
          phone: '+250 788 555 123',
          city: 'Kigali',
          district: 'Gasabo',
          status: 'Pending',
        },
      ],
    },
    {
      year: '2023 / Year 2',
      students: [
        {
          id: 3,
          name: 'UWASE Marie',
          grade: 'Year 2',
          phone: '+250 788 777 888',
          city: 'Southern',
          district: 'Huye',
          status: 'Arrived',
        },
      ],
    },
  ])

  const [activeYear, setActiveYear] = useState(0)
  const [cardYearIndex, setCardYearIndex] = useState(0)
  const [isSliding, setIsSliding] = useState(false)
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right')
  const [search, setSearch] = useState('')
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const RWANDA_CITIES = ['Kigali', 'Southern', 'Northern', 'Eastern', 'Western']

  const RWANDA_DISTRICTS: Record<string, string[]> = {
    Kigali: ['Gasabo', 'Kicukiro', 'Nyarugenge'],
    Southern: [
      'Huye',
      'Nyanza',
      'Gisagara',
      'Nyamagabe',
      'Muhanga',
      'Kamonyi',
      'Ruhango',
      'Nyaruguru',
    ],
    Northern: ['Musanze', 'Gakenke', 'Gicumbi', 'Rulindo', 'Burera'],
    Eastern: [
      'Rwamagana',
      'Kayonza',
      'Ngoma',
      'Kirehe',
      'Bugesera',
      'Gatsibo',
      'Nyagatare',
    ],
    Western: [
      'Rubavu',
      'Rusizi',
      'Rutsiro',
      'Nyamasheke',
      'Karongi',
      'Ngororero',
    ],
  }

  // Modal state
  const [showYearModal, setShowYearModal] = useState(false)
  const [showStudentModal, setShowStudentModal] = useState(false)

  // Form state
  const [newYear, setNewYear] = useState('')
  const [studentForm, setStudentForm] = useState<Omit<Student, 'id'>>({
    name: '',
    grade: '',
    phone: '',
    city: '',
    district: '',
    status: 'Pending',
  })

  // Stats calculation
  const totalStudents = years.reduce((acc, year) => acc + year.students.length, 0)
  const activeYearStudents = years[activeYear]?.students.length || 0
  const cardYearStudents = years[cardYearIndex]?.students.length || 0
  const arrivedStudents = years[cardYearIndex]?.students.filter(s => s.status === 'Arrived').length || 0
  const pendingStudents = years[cardYearIndex]?.students.filter(s => s.status === 'Pending').length || 0

  // Year navigation for card
  const nextYear = () => {
    if (cardYearIndex < years.length - 1) {
      setSlideDirection('left')
      setIsSliding(true)
      setTimeout(() => {
        setCardYearIndex(cardYearIndex + 1)
        setIsSliding(false)
      }, 300)
    }
  }

  const prevYear = () => {
    if (cardYearIndex > 0) {
      setSlideDirection('right')
      setIsSliding(true)
      setTimeout(() => {
        setCardYearIndex(cardYearIndex - 1)
        setIsSliding(false)
      }, 300)
    }
  }

  // ---------------- ACTIONS ----------------
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

  const filteredStudents = years[activeYear]?.students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  ) || []

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

  return (
    <div className="w-full min-h-screen p-4 md:p-6">
      {/* Header Section */}
      <div className="mb-10">
        <div className="flex flex-col border-b border-gray-300 pb-3 sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <div>
            <h1 className="text-[17px] font-semibold  tracking-tight bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent">Students Management</h1>
            <p className="text-gray-600  text-[14px]">
              Manage students across academic years
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setShowYearModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-lg hover:border-blue-800 hover:bg-blue-50 transition-all duration-200 group"
            >
              <CalendarPlus className="w-4 h-4 text-gray-600 group-hover:text-blue-800" />
              <span className="text-[14px] font-medium text-gray-700 group-hover:text-blue-800">Add Year</span>
            </button>
            
            <button 
              onClick={exportYear}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:bg-blue-900 transition-all text-[14px] font-semibold duration-200 shadow-sm hover:shadow-md"
            >
              <DownloadCloud className="w-4 h-4" />
              <span className="text-[14px] font-medium">Download report</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="px-6 flex justify-between">

          {/* Year Carousel Card */}
          <div className="bg-gradient-to-r from-blue-700 to-blue-800 w-[450px] h-[230px] rounded-xl p-4 shadow-lg border border-gray-100 relative overflow-hidden">
            <div className={`transition-all duration-300 ${isSliding ? `opacity-0 ${slideDirection === 'left' ? '-translate-x-8' : 'translate-x-8'}` : 'opacity-100 translate-x-0'}`}>
              <div className="flex border-b border-white/20 pb-7 items-center justify-between mb-3">
                <div className="flex-1">
                  <p className="text-[14px] text-white font-medium">Year Overview</p>
                  <p className="text-[13px] text-gray-300 mt-0.5">{years[cardYearIndex]?.year}</p>
                </div>
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                  <List className="w-5 h-5 text-white" />
                </div>
              </div>

              <div className="space-y-2 mt-5 pr-3">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] text-white">Total Students</span>
                  <span className="text-[16px] font-bold text-white">{cardYearStudents}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[13px] text-white flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Arrived
                  </span>
                  <span className="text-[14px] font-semibold text-white">{arrivedStudents}</span>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            {years.length > 1 && (
              <div className="absolute bottom-4 right-4 flex items-center gap-2">
                <button
                  onClick={prevYear}
                  disabled={cardYearIndex === 0}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                    cardYearIndex === 0
                      ? 'bg-white/20 text-gray-300 cursor-not-allowed'
                      : 'bg-blue-600/20 text-white hover:from-blue-800 hover:to-blue-900 shadow-md hover:shadow-lg'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextYear}
                  disabled={cardYearIndex === years.length - 1}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                    cardYearIndex === years.length - 1
                      ? 'bg-white/20 text-gray-300 cursor-not-allowed'
                      : 'bg-blue-600/20 text-white hover:from-blue-800 hover:to-blue-900 shadow-md hover:shadow-lg'
                  }`}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Year Indicator Dots */}
            {years.length > 1 && (
              <div className="absolute bottom-4 left-4 flex items-center gap-1.5">
                {years.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      if (idx !== cardYearIndex) {
                        setSlideDirection(idx > cardYearIndex ? 'left' : 'right')
                        setIsSliding(true)
                        setTimeout(() => {
                          setCardYearIndex(idx)
                          setIsSliding(false)
                        }, 300)
                      }
                    }}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === cardYearIndex
                        ? 'w-6 bg-white'
                        : 'w-1.5 bg-gray-300/40 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
                         <div className="bg-gradient-to-r h-[200px] from-green-700 to-gray-800 w-[450px] rounded-xl p-5 text-white shadow-lg relative overflow-hidden">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[12px] text-blue-100">Total students active journeys</p>
                <p className="text-3xl font-bold mt-2">6</p>
              </div>
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <BusFront className="w-7 h-7 text-white" />
              </div>
            </div>
            <div className="pt-3 border-t flex justify-between border-white/20">
              <p className="text-[13px] text-blue-100">
                Students on active bus routes <br /> click the button to manage
              </p>
              <div  className="rounded-lg px-4 text-[13px] py-2 cursor-pointer bg-gray-100 flex items-center justify-center text-black hover:bg-gray-300">
                <p>View status</p>
                <ArrowRight className="w-4 h-4 ml-2 mt-[2px]" />
              </div>
            </div>
          </div>
        </div>
       </div>
      </div>

      {/* Main Content */}
      <div className="bg-white   overflow-hidden">
        {/* Toolbar */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              {/* Year Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {years.map((y, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveYear(i)}
                    className={`px-4 py-2 rounded-lg text-[14px] font-medium whitespace-nowrap transition-all duration-200 ${
                      i === activeYear 
                        ? 'bg-gradient-to-r from-blue-700 to-blue-800 text-white shadow-sm' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {y.year}
                    <span className={`ml-2 px-1.5 py-0.5 rounded-full text-[11px] ${
                      i === activeYear ? 'bg-gradient-to-r from-blue-700 to-blue-800' : 'bg-gray-300'
                    }`}>
                      {y.students.length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              {/* Search Bar */}
              <div className="relative w-full sm:w-64">
                <BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search students by name..."
                  className="w-full pl-9 pr-3 py-2.5 text-[14px] border border-gray-300 rounded-lg focus:border-blue-800 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:border-blue-800 hover:bg-blue-50 transition-all duration-200 group"
                >
                  <UploadCloud className="w-4 h-4 text-gray-600 group-hover:text-blue-800" />
                  <span className="text-[14px] font-medium text-gray-700 group-hover:text-blue-800">Upload</span>
                </button>

                <button
                  onClick={() => setShowStudentModal(true)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-700 to-blue-800 text-white rounded-lg hover:bg-blue-900 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <UserPlus className="w-4 h-4" />
                  <span className="text-[14px] font-medium">Add Student</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="">
          <div className="overflow-x-auto rounded-lg ">
            <StudentTable data={filteredStudents} onDelete={deleteStudent} />
          </div>
          
          {filteredStudents.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserPlus className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No students found</h3>
              <p className="text-gray-600 text-[15px] mb-4">
                {search ? 'Try a different search term' : 'Add your first student to get started'}
              </p>
              {!search && (
                <button
                  onClick={() => setShowStudentModal(true)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-700 to-blue-800 text-white rounded-lg hover:bg-blue-900 transition-all duration-200"
                >
                  <Plus className="w-4 h-4" />
                  <span className="text-[14px] font-medium">Add Student</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <Modal title="Upload Student Data" onClose={() => setShowUploadModal(false)}>
          <div className="space-y-6">
            <div>
              <label
                htmlFor="file-upload"
                className={`mt-2 border-2 ${isDragging ? 'bg-gradient-to-r from-blue-700 to-blue-800 bg-blue-50' : 'border-gray-300'} border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-200`}
                onDragOver={(e) => {
                  e.preventDefault()
                  setIsDragging(true)
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault()
                  setIsDragging(false)
                  const file = e.dataTransfer.files[0]
                  if (file && (file.name.endsWith('.csv') || file.name.endsWith('.xlsx'))) {
                    setSelectedFile(file)
                  }
                }}
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                  <FileUp className="w-6 h-6 text-blue-800" />
                </div>
                <p className="text-[15px] text-gray-700 mb-1">
                  <span className="font-medium text-blue-800">Click to upload</span> or drag and drop
                </p>
                <p className="text-[13px] text-gray-500">
                  CSV or Excel files only
                </p>
                
                <input
                  id="file-upload"
                  type="file"
                  accept=".csv,.xlsx"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setSelectedFile(e.target.files[0])
                    }
                  }}
                />
              </label>
            </div>

            {selectedFile && (
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <FileUp className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-[14px] font-medium text-gray-900">{selectedFile.name}</p>
                      <p className="text-[12px] text-gray-500">
                        {(selectedFile.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedFile(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <button
                onClick={() => {
                  setShowUploadModal(false)
                  setSelectedFile(null)
                }}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-[14px] font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!selectedFile) return
                  // TODO: send file to backend
                  console.log('Uploading:', selectedFile)
                  setShowUploadModal(false)
                  setSelectedFile(null)
                }}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-700 to-blue-800 text-white rounded-lg text-[14px] font-medium hover:bg-blue-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!selectedFile}
              >
                Upload & Process
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Add Year Modal */}
      {showYearModal && (
        <Modal title="Add Academic Year" onClose={() => setShowYearModal(false)}>
          <div className="space-y-6">
            <div>
              <label className="block text-[14px] font-medium text-gray-700 mb-2">
                Academic Year
              </label>
              <input
                value={newYear}
                onChange={(e) => setNewYear(e.target.value)}
                placeholder="e.g., 2024 / Year 3"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-800 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-[15px]"
              />
              <p className="text-[12px] text-gray-500 mt-2">
                Format: Year / Academic Year (e.g., 2024 / Year 3)
              </p>
            </div>

            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <button
                onClick={() => setShowYearModal(false)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-[14px] font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={addYear}
                className="flex-1 px-4 py-3 bg-blue-800 text-white rounded-lg text-[14px] font-medium hover:bg-blue-900 transition-colors"
              >
                Create Year
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Add Student Modal */}
      {showStudentModal && (
        <Modal title={`Add Student to ${years[activeYear]?.year}`} onClose={() => setShowStudentModal(false)}>
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[14px] font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  placeholder="Student full name"
                  value={studentForm.name}
                  onChange={(e) =>
                    setStudentForm((p) => ({ ...p, name: e.target.value }))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-800 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-[15px]"
                />
              </div>

              <div>
                <label className="block text-[14px] font-medium text-gray-700 mb-2">
                  Parent Phone *
                </label>
                <input
                  placeholder="+250 788 123 456"
                  value={studentForm.phone}
                  onChange={(e) =>
                    setStudentForm((p) => ({ ...p, phone: e.target.value }))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-800 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-[15px]"
                />
              </div>

              <div>
                <label className="block text-[14px] font-medium text-gray-700 mb-2">
                  City / Province
                </label>
                <div className="relative">
                  <select
                    value={studentForm.city}
                    onChange={(e) =>
                      setStudentForm((p) => ({
                        ...p,
                        city: e.target.value,
                        district: '',
                      }))
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-800 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-[15px] appearance-none bg-white"
                  >
                    <option value="">Select City</option>
                    {RWANDA_CITIES.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-[14px] font-medium text-gray-700 mb-2">
                  District
                </label>
                <div className="relative">
                  <select
                    value={studentForm.district}
                    onChange={(e) =>
                      setStudentForm((p) => ({ ...p, district: e.target.value }))
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-800 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-[15px] appearance-none bg-white"
                    disabled={!studentForm.city}
                  >
                    <option value="">Select District</option>
                    {(RWANDA_DISTRICTS[studentForm.city] || []).map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                </div>
              </div>
            </div>
            <div className="flex gap-3 pt-6 border-t border-gray-200">
              <button
                onClick={() => setShowStudentModal(false)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-[14px] font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={addStudent}
                className="flex-1 px-4 py-3 bg-blue-800 text-white rounded-lg text-[14px] font-medium hover:bg-blue-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!studentForm.name.trim()}
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

// ---------------- MODAL ----------------
function Modal({
  title,
  children,
  onClose,
}: {
  title: string
  children: React.ReactNode
  onClose: () => void
}) {
  return (
    <div className="fixed inset-0 bg-black/50  flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div 
        className="bg-white w-full max-w-md rounded-2xl shadow-2xl animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-[17px] font-semibold text-black">{title}</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Students