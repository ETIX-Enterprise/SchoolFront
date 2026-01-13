import React, { useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { DownloadCloud, Plus, X, ChevronDown, ChevronLeft, ChevronRight, DollarSign, TrendingUp, AlertCircle, CheckCircle2, Clock } from 'lucide-react'

// ---------------- TYPES ----------------
type PaymentStatus = 'Paid' | 'Pending' | 'Not Paid'
type Term = 'Term I' | 'Term II' | 'Term III'

type PaymentRecord = {
  id: number
  studentName: string
  grade: string
  term: Term
  city: string
  district: string
  ticketFee: number
  status: PaymentStatus
}

type YearPayments = {
  year: string
  isCurrent: boolean
  terms: {
    [key in Term]: PaymentRecord[]
  }
}

// ---------------- COMPONENT ----------------
 function PaymentTracking() {
  const [years, setYears] = useState<YearPayments[]>([
    {
      year: '2024',
      isCurrent: true,
      terms: {
        'Term I': [
          {
            id: 1,
            studentName: 'UMUKURA Olivier',
            grade: 'Year 3',
            term: 'Term I',
            city: 'Kigali',
            district: 'Kicukiro',
            ticketFee: 150000,
            status: 'Paid',
          },
          {
            id: 2,
            studentName: 'MUGISHA Jean',
            grade: 'Year 3',
            term: 'Term I',
            city: 'Kigali',
            district: 'Gasabo',
            ticketFee: 150000,
            status: 'Pending',
          },
        ],
        'Term II': [
          {
            id: 3,
            studentName: 'UMUKURA Olivier',
            grade: 'Year 3',
            term: 'Term II',
            city: 'Kigali',
            district: 'Kicukiro',
            ticketFee: 150000,
            status: 'Not Paid',
          },
        ],
        'Term III': [],
      },
    },
    {
      year: '2023',
      isCurrent: false,
      terms: {
        'Term I': [
          {
            id: 4,
            studentName: 'UWASE Marie',
            grade: 'Year 2',
            term: 'Term I',
            city: 'Southern',
            district: 'Huye',
            ticketFee: 140000,
            status: 'Paid',
          },
        ],
        'Term II': [
          {
            id: 5,
            studentName: 'UWASE Marie',
            grade: 'Year 2',
            term: 'Term II',
            city: 'Southern',
            district: 'Huye',
            ticketFee: 140000,
            status: 'Paid',
          },
        ],
        'Term III': [
          {
            id: 6,
            studentName: 'UWASE Marie',
            grade: 'Year 2',
            term: 'Term III',
            city: 'Southern',
            district: 'Huye',
            ticketFee: 140000,
            status: 'Paid',
          },
        ],
      },
    },
  ])

  const [activeYear, setActiveYear] = useState(0)
  const [activeTerm, setActiveTerm] = useState<Term>('Term I')
  const [cardYearIndex, setCardYearIndex] = useState(0)
  const [isSliding, setIsSliding] = useState(false)
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right')
  const [search, setSearch] = useState('')
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [paymentForm, setPaymentForm] = useState<Omit<PaymentRecord, 'id'>>({
    studentName: '',
    grade: '',
    term: 'Term I',
    city: '',
    district: '',
    ticketFee: 0,
    status: 'Pending',
  })

  const RWANDA_CITIES = ['Kigali', 'Southern', 'Northern', 'Eastern', 'Western']
  const RWANDA_DISTRICTS: Record<string, string[]> = {
    Kigali: ['Gasabo', 'Kicukiro', 'Nyarugenge'],
    Southern: ['Huye', 'Nyanza', 'Gisagara', 'Nyamagabe', 'Muhanga', 'Kamonyi', 'Ruhango', 'Nyaruguru'],
    Northern: ['Musanze', 'Gakenke', 'Gicumbi', 'Rulindo', 'Burera'],
    Eastern: ['Rwamagana', 'Kayonza', 'Ngoma', 'Kirehe', 'Bugesera', 'Gatsibo', 'Nyagatare'],
    Western: ['Rubavu', 'Rusizi', 'Rutsiro', 'Nyamasheke', 'Karongi', 'Ngororero'],
  }

  const TERMS: Term[] = ['Term I', 'Term II', 'Term III']

  // Calculate stats for current term and year
  const currentRecords = years[cardYearIndex]?.terms[activeTerm] || []
  const allYearRecords = Object.values(years[cardYearIndex]?.terms || {}).flat()
  
  const paidStudents = currentRecords.filter(r => r.status === 'Paid').length
  const pendingStudents = currentRecords.filter(r => r.status === 'Pending').length
  const notPaidStudents = currentRecords.filter(r => r.status === 'Not Paid').length
  const totalRevenue = currentRecords.filter(r => r.status === 'Paid').reduce((sum, r) => sum + r.ticketFee, 0)
  const totalRequired = currentRecords.reduce((sum, r) => sum + r.ticketFee, 0)
  const totalRemaining = totalRequired - totalRevenue

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

  // Toggle payment status
  const togglePayment = (id: number) => {
    if (!years[activeYear].isCurrent) return

    setYears(prev =>
      prev.map((y, yi) =>
        yi === activeYear
          ? {
              ...y,
              terms: {
                ...y.terms,
                [activeTerm]: y.terms[activeTerm].map(r =>
                  r.id === id
                    ? { ...r, status: r.status === 'Paid' ? 'Pending' : 'Paid' }
                    : r
                ),
              },
            }
          : y
      )
    )
  }

  const addPayment = () => {
    if (!paymentForm.studentName.trim()) return

    const newPayment: PaymentRecord = {
      id: Date.now(),
      ...paymentForm,
    }

    setYears(prev =>
      prev.map((y, i) =>
        i === activeYear
          ? {
              ...y,
              terms: {
                ...y.terms,
                [activeTerm]: [...y.terms[activeTerm], newPayment],
              },
            }
          : y
      )
    )

    setPaymentForm({
      studentName: '',
      grade: '',
      term: activeTerm,
      city: '',
      district: '',
      ticketFee: 0,
      status: 'Pending',
    })
    setShowPaymentModal(false)
  }

  const filteredRecords = years[activeYear]?.terms[activeTerm].filter(r =>
    r.studentName.toLowerCase().includes(search.toLowerCase())
  ) || []

  const exportPayments = () => {
    const records = years[activeYear].terms[activeTerm]
    const csv = [
      'Student Name,Grade,Term,City,District,Ticket Fee,Status',
      ...records.map(r =>
        `${r.studentName},${r.grade},${r.term},${r.city},${r.district},${r.ticketFee},${r.status}`
      ),
    ].join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `${years[activeYear].year}-${activeTerm}-payments.csv`
    link.click()
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-RW', {
      style: 'currency',
      currency: 'RWF',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="w-full min-h-screen p-4 md:p-6">
      {/* Header */}
      <div className="mb-10">
        <div className="flex flex-col border-b border-gray-300 pb-3 sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <div>
            <h1 className="text-[17px] font-semibold tracking-tight bg-gradient-to-r from-emerald-700 to-green-900 bg-clip-text text-transparent">
              Payment Tracking
            </h1>
            <p className="text-gray-600 text-[14px]">
              Monitor student payments across terms and years
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={exportPayments}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-lg hover:from-emerald-700 hover:to-emerald-800 transition-all text-[14px] font-semibold duration-200 shadow-sm hover:shadow-md"
            >
              <DownloadCloud className="w-4 h-4" />
              <span className="text-[14px] font-medium">Export Report</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Revenue Overview Card with Year Carousel */}
          <div className="bg-gradient-to-r from-emerald-700 to-emerald-800 rounded-xl p-5 shadow-lg relative overflow-hidden">
            <div className={`transition-all duration-300 ${isSliding ? `opacity-0 ${slideDirection === 'left' ? '-translate-x-8' : 'translate-x-8'}` : 'opacity-100 translate-x-0'}`}>
              <div className="flex items-center justify-between mb-4 border-b border-white/20 pb-4">
                <div>
                  <p className="text-[14px] text-white font-medium">Revenue Overview</p>
                  <p className="text-[13px] text-gray-200 mt-0.5">{years[cardYearIndex]?.year} - {activeTerm}</p>
                </div>
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-[12px] text-gray-200">Total Revenue</p>
                  <p className="text-2xl font-bold text-white">{formatCurrency(totalRevenue)}</p>
                </div>
                <div className="flex items-center justify-between pb-7 border-t border-white/10">
                  <span className="text-[13px] text-gray-200">Remaining</span>
                  <span className="text-[15px] font-semibold text-white">{formatCurrency(totalRemaining)}</span>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            {years.length > 1 && (
              <div className="absolute bottom-2 right-4 flex items-center gap-2">
                <button
                  onClick={prevYear}
                  disabled={cardYearIndex === 0}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                    cardYearIndex === 0
                      ? 'bg-white/20 text-gray-300 cursor-not-allowed'
                      : 'bg-emerald-600/20 text-white hover:bg-emerald-600/30'
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
                      : 'bg-emerald-600/20 text-white hover:bg-emerald-600/30'
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
                      idx === cardYearIndex ? 'w-6 bg-white' : 'w-1.5 bg-gray-300/40 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Payment Status Card */}
          <div className="bg-white rounded-xl p-5 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[14px] text-gray-700 font-medium">Payment Status</p>
                <p className="text-[13px] text-gray-500 mt-0.5">Current Term</p>
              </div>
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-blue-700" />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-gray-600 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Paid
                </span>
                <span className="text-[15px] font-semibold text-gray-900">{paidStudents}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-gray-600 flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                  Pending
                </span>
                <span className="text-[15px] font-semibold text-gray-900">{pendingStudents}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-gray-600 flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  Not Paid
                </span>
                <span className="text-[15px] font-semibold text-gray-900">{notPaidStudents}</span>
              </div>
            </div>
          </div>

          {/* Total Required Card */}
          <div className="bg-gradient-to-r from-blue-700 to-blue-800 rounded-xl p-5 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[14px] text-white font-medium">Total Required</p>
                <p className="text-[13px] text-gray-200 mt-0.5">{activeTerm}</p>
              </div>
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-white" />
              </div>
            </div>

            <div>
              <p className="text-3xl font-bold text-white mb-3">{formatCurrency(totalRequired)}</p>
              <div className=" rounded-lg p-3">
                <div className="flex justify-between items-center text-[12px] text-gray-200 mb-1">
                  <span>Collection Progress</span>
                  <span className="font-medium">{totalRequired > 0 ? Math.round((totalRevenue / totalRequired) * 100) : 0}%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div
                    className="bg-white rounded-full h-2 transition-all duration-500"
                    style={{ width: `${totalRequired > 0 ? (totalRevenue / totalRequired) * 100 : 0}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
        {/* Toolbar */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex flex-col gap-4">
              {/* Year Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {years.map((y, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveYear(i)}
                    className={`px-4 py-2 rounded-lg text-[14px] font-medium whitespace-nowrap transition-all duration-200 ${
                      i === activeYear
                        ? 'bg-gradient-to-r from-emerald-700 to-emerald-800 text-white shadow-sm'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {y.year}
                    {!y.isCurrent && (
                      <span className="ml-2 text-[10px] px-1.5 py-0.5 bg-white/20 rounded">
                        Past
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Term Tabs */}
              <div className="flex items-center gap-2">
                {TERMS.map((term) => (
                  <button
                    key={term}
                    onClick={() => setActiveTerm(term)}
                    className={`px-4 py-2 rounded-lg text-[13px] font-medium whitespace-nowrap transition-all duration-200 ${
                      term === activeTerm
                        ? 'bg-blue-100 text-blue-700 border border-blue-300'
                        : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {term}
                    <span className={`ml-2 px-1.5 py-0.5 rounded-full text-[11px] ${
                      term === activeTerm ? 'bg-blue-200' : 'bg-gray-200'
                    }`}>
                      {years[activeYear]?.terms[term].length || 0}
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
                  placeholder="Search by student name..."
                  className="w-full pl-9 pr-3 py-2.5 text-[14px] border border-gray-300 rounded-lg focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100 outline-none transition-all"
                />
              </div>

              <button
                onClick={() => setShowPaymentModal(true)}
                className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-700 to-emerald-800 text-white rounded-lg hover:from-emerald-800 hover:to-emerald-900 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span className="text-[14px] font-medium">Add Payment</span>
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-[13px] font-semibold text-gray-700">Paid</th>
                <th className="px-6 py-4 text-left text-[13px] font-semibold text-gray-700">Student Name</th>
                <th className="px-6 py-4 text-left text-[13px] font-semibold text-gray-700">Grade</th>
                <th className="px-6 py-4 text-left text-[13px] font-semibold text-gray-700">Term</th>
                <th className="px-6 py-4 text-left text-[13px] font-semibold text-gray-700">City</th>
                <th className="px-6 py-4 text-left text-[13px] font-semibold text-gray-700">District</th>
                <th className="px-6 py-4 text-left text-[13px] font-semibold text-gray-700">Ticket Fee</th>
                <th className="px-6 py-4 text-left text-[13px] font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <AnimatedCheckbox
                      checked={record.status === 'Paid'}
                      onChange={() => togglePayment(record.id)}
                      disabled={!years[activeYear].isCurrent}
                    />
                  </td>
                  <td className="px-6 py-4 text-[14px] font-medium text-gray-900">
                    {record.studentName}
                  </td>
                  <td className="px-6 py-4 text-[14px] text-gray-600">{record.grade}</td>
                  <td className="px-6 py-4 text-[14px] text-gray-600">{record.term}</td>
                  <td className="px-6 py-4 text-[14px] text-gray-600">{record.city}</td>
                  <td className="px-6 py-4 text-[14px] text-gray-600">{record.district}</td>
                  <td className="px-6 py-4 text-[14px] font-medium text-gray-900">
                    {formatCurrency(record.ticketFee)}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={record.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredRecords.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No payment records found</h3>
              <p className="text-gray-600 text-[15px] mb-4">
                {search ? 'Try a different search term' : 'Add your first payment record to get started'}
              </p>
              {!search && (
                <button
                  onClick={() => setShowPaymentModal(true)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-700 to-emerald-800 text-white rounded-lg hover:from-emerald-800 hover:to-emerald-900 transition-all duration-200"
                >
                  <Plus className="w-4 h-4" />
                  <span className="text-[14px] font-medium">Add Payment</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Add Payment Modal */}
      {showPaymentModal && (
        <Modal title={`Add Payment - ${years[activeYear]?.year} / ${activeTerm}`} onClose={() => setShowPaymentModal(false)}>
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[14px] font-medium text-gray-700 mb-2">
                  Student Name *
                </label>
                <input
                  placeholder="Full name"
                  value={paymentForm.studentName}
                  onChange={(e) =>
                    setPaymentForm((p) => ({ ...p, studentName: e.target.value }))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100 outline-none transition-all text-[15px]"
                />
              </div>

              <div>
                <label className="block text-[14px] font-medium text-gray-700 mb-2">
                  Grade *
                </label>
                <input
                  placeholder="e.g., Year 3"
                  value={paymentForm.grade}
                  onChange={(e) =>
                    setPaymentForm((p) => ({ ...p, grade: e.target.value }))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100 outline-none transition-all text-[15px]"
                />
              </div>

              <div>
                <label className="block text-[14px] font-medium text-gray-700 mb-2">
                  City / Province
                </label>
                <div className="relative">
                  <select
                    value={paymentForm.city}
                    onChange={(e) =>
                      setPaymentForm((p) => ({
                        ...p,
                        city: e.target.value,
                        district: '',
                      }))
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100 outline-none transition-all text-[15px] appearance-none bg-white"
                    disabled={!paymentForm.city}
                  >
                    <option value="">Select District</option>
                    {(RWANDA_DISTRICTS[paymentForm.city] || []).map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-[14px] font-medium text-gray-700 mb-2">
                  Ticket Fee (RWF) *
                </label>
                <input
                  type="number"
                  placeholder="150000"
                  value={paymentForm.ticketFee || ''}
                  onChange={(e) =>
                    setPaymentForm((p) => ({ ...p, ticketFee: Number(e.target.value) }))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100 outline-none transition-all text-[15px]"
                />
              </div>

              <div>
                <label className="block text-[14px] font-medium text-gray-700 mb-2">
                  Payment Status
                </label>
                <div className="relative">
                  <select
                    value={paymentForm.status}
                    onChange={(e) =>
                      setPaymentForm((p) => ({ ...p, status: e.target.value as PaymentStatus }))
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100 outline-none transition-all text-[15px] appearance-none bg-white"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                    <option value="Not Paid">Not Paid</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-6 border-t border-gray-200">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-[14px] font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={addPayment}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-emerald-700 to-emerald-800 text-white rounded-lg text-[14px] font-medium hover:from-emerald-800 hover:to-emerald-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!paymentForm.studentName.trim() || !paymentForm.ticketFee}
              >
                Add Payment Record
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}

// ---------------- ANIMATED CHECKBOX ----------------
function AnimatedCheckbox({
  checked,
  onChange,
  disabled,
}: {
  checked: boolean
  onChange: () => void
  disabled: boolean
}) {
  return (
    <button
      onClick={onChange}
      disabled={disabled}
      className={`relative w-6 h-6 rounded-md border-2 transition-all duration-300 ${
        disabled
          ? 'border-gray-300 bg-gray-100 cursor-not-allowed opacity-50'
          : checked
          ? 'border-emerald-600 bg-emerald-600 shadow-sm'
          : 'border-gray-300 bg-white hover:border-emerald-500'
      }`}
    >
      {/* Checkmark with animation */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
          checked ? 'scale-100 opacity-100 rotate-0' : 'scale-0 opacity-0 rotate-90'
        }`}
      >
        <svg
          className="w-4 h-4 text-white"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            d="M5 13l4 4L19 7"
            className={`${checked ? 'animate-checkmark' : ''}`}
          />
        </svg>
      </div>

      {/* Ripple effect */}
      {checked && !disabled && (
        <div className="absolute inset-0 rounded-md bg-emerald-400 animate-ping opacity-20" />
      )}
    </button>
  )
}

// ---------------- STATUS BADGE ----------------
function StatusBadge({ status }: { status: PaymentStatus }) {
  const styles = {
    Paid: 'bg-green-100 text-green-700 border-green-200',
    Pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    'Not Paid': 'bg-red-100 text-red-700 border-red-200',
  }

  const icons = {
    Paid: <CheckCircle2 className="w-3.5 h-3.5" />,
    Pending: <Clock className="w-3.5 h-3.5" />,
    'Not Paid': <AlertCircle className="w-3.5 h-3.5" />,
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[13px] font-medium border ${styles[status]}`}
    >
      {icons[status]}
      {status}
    </span>
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl animate-slideUp"
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
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}

export default PaymentTracking
