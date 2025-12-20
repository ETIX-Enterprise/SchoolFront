import React, { useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import StudentTable from '../components/studentTable'
import { DownloadCloud } from 'lucide-react'


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
      ],
    },
  ])

  const [activeYear, setActiveYear] = useState(0)
  const [search, setSearch] = useState('')

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

  return (
    <div className="w-full h-full p-4">
      {/* Header */}
      <div className="flex mt-4 justify-between items-center">
        <div>
          <h1 className="text-[18px] font-semibold">Students</h1>
          <p className="text-sm text-gray-500">
            Manage students by academic year
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setShowYearModal(true)}
            className="btn-outline border text-[14px] border-gray-400 rounded-lg cursor-pointer hover:text-white transition-colors duration-500 hover:bg-blue-800"
          >
            + Add Year
          </button>
        <button onClick={exportYear} className=" text-[14px] flex font-medium bg-green-800 cursor-pointer hover:bg-blue-900 transition-colors duration-500 btn-primary">
         <DownloadCloud  className='w-5 h-5 mr-1'/> Download Report
        </button>
        </div>
      </div>

      {/* Year Tabs */}
      <div className="flex gap-2 mt-5 justify-between overflow-x-auto">
        <div className="flex gap-2">      

        {years.map((y, i) => (
          <button
            key={i}
            onClick={() => setActiveYear(i)}
            className={`px-4 py-2 rounded-lg text-sm transition ${
              i === activeYear ? 'bg-blue-800 text-white' : 'bg-gray-100 cursor-pointer'
            }`}
          >
            {y.year}
          </button>
        ))}
      </div>
      <div className="flex justify-end ">
                  <button
            onClick={() => setShowStudentModal(true)}
            className="btn-primary bg-blue-800 text-[14px] cursor-pointer hover:bg-blue-900 transition-all duration-500"
          >
            + Add Student
          </button>
      </div>
      </div>

      {/* Search */}
      <div className="mt-4 w-[260px] flex border rounded-lg overflow-hidden">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search student"
          className="w-full px-3 text-sm outline-none"
        />
        <BiSearch className="m-3" />
      </div>

      {/* Table */}
      <div className="mt-6">
        <StudentTable data={filteredStudents} onDelete={deleteStudent} />
      </div>

      {/* Add Year Modal */}
      {showYearModal && (
        <Modal title="Add Academic Year" onClose={() => setShowYearModal(false)}>
          <input
            value={newYear}
            onChange={(e) => setNewYear(e.target.value)}
            placeholder="e.g. 2025"
            className="modal-input focus:outline-none "
          />
          <button
            onClick={addYear}
            className="btn-primary bg-blue-800 cursor-pointer hover:bg-blue-900 transition-colors duration-500 text-[14px] w-full mt-4"
          >
            Create Year
          </button>
        </Modal>
      )}

      {/* Add Student Modal */}
      {showStudentModal && (
        <Modal title={`Add student to ${activeYear} year list`} onClose={() => setShowStudentModal(false)}>
    <div className="grid grid-cols-2 gap-3">
      {/* Name */}
      <input
        placeholder="Student name"
        value={studentForm.name}
        onChange={(e) =>
          setStudentForm((p) => ({ ...p, name: e.target.value }))
        }
        className="modal-input focus:outline-none"
      />

      {/* Parent Phone */}
      <input
        placeholder="Parent phone"
        value={studentForm.phone}
        onChange={(e) =>
          setStudentForm((p) => ({ ...p, phone: e.target.value }))
        }
        className="modal-input focus:outline-none"
      />

      {/* City (autocomplete) */}
      <input
        list="rwanda-cities"
        placeholder="City / Province"
        value={studentForm.city}
        onChange={(e) =>
          setStudentForm((p) => ({
            ...p,
            city: e.target.value,
            district: '', // reset district when city changes
          }))
        }
        className="modal-input focus:outline-none"
      />
      <datalist id="rwanda-cities">
        {RWANDA_CITIES.map((city) => (
          <option key={city} value={city} />
        ))}
      </datalist>

      {/* District (depends on city) */}
      <input
        list="rwanda-districts"
        placeholder="District"
        value={studentForm.district}
        onChange={(e) =>
          setStudentForm((p) => ({ ...p, district: e.target.value }))
        }
        className="modal-input focus:outline-none"
        disabled={!studentForm.city}
      />
      <datalist id="rwanda-districts">
        {(RWANDA_DISTRICTS[studentForm.city] || []).map((d) => (
          <option key={d} value={d} />
        ))}
      </datalist>

      {/* Status (full width) */}
      <select
        value={studentForm.status}
        onChange={(e) =>
          setStudentForm((p) => ({
            ...p,
            status: e.target.value as Student['status'],
          }))
        }
        className="modal-input col-span-2 focus:outline-none"
      >
        <option value="Pending">Pending</option>
        <option value="Arrived">Arrived</option>
      </select>
    </div>

    <button
      onClick={addStudent}
      className="btn-primary bg-blue-800 cursor-pointer hover:bg-blue-900 transition-colors duration-500 text-[14px] w-full mt-5"
    >
      Add Student
    </button>
        </Modal>
      )}

      {/* Styles */}
      <style>{`
        .btn-primary {
          color:white;
          padding:7px 14px;
          border-radius:8px;
        }
        .btn-outline {
          padding:8px 14px;
        }
        .modal-input {
          width:100%;
          border:1px solid #ddd;
          padding:8px;
          border-radius:6px;
          margin-top:10px;
        }
      `}</style>
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
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[400px] rounded-xl p-6">
        <h2 className="text-lg font-semibold text-[16px] mb-4">{title}</h2>
        {children}
        <button
          onClick={onClose}
          className="text-sm text-red-500 bg-gray-50 rounded-lg cursor-pointer hover:bg-red-100 transition-colors duration-500 px-4 py-2 mt-4"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export default Students
