import React, { useState } from 'react';
import { 
  Download,
  Calendar,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Users,
  Clock,
  MapPin,
  X,
  ChevronLeft,
  DollarSign,
  Bus,
  Eye,
  Activity,
  FileText,
  AlertTriangle
} from 'lucide-react';

type BookingStatus = "Paid" | "Pending" | "Cancelled";
type JourneyStatus = "completed" | "pending";
type AttendanceStatus = "on road" | "arrived at bus stop";

const years = [2023, 2024, 2025];
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const tabs = [
  { id: "bookings", label: "Bookings", icon: Calendar },
  { id: "attendance", label: "Student Attendance", icon: Users },
  { id: "journey", label: "Journey Summary", icon: MapPin },
  { id: "incidents", label: "Incident Reports", icon: AlertCircle },
];

const mockBookings = [
  { date: "2025-01-12", status: "Confirmed", payment: "Paid", tickets: 205, revenue: 51250 },
  { date: "2025-01-20", status: "Confirmed", payment: "Pending", tickets: 130, revenue: 32500 },
  { date: "2025-01-25", status: "Cancelled", payment: "Cancelled", tickets: 45, revenue: 11250 },
  { date: "2025-02-01", status: "Confirmed", payment: "Paid", tickets: 180, revenue: 45000 },
];

const mockStudents = [
  {
    name: "Jean Claude",
    grade: "S3",
    phone: "078-123-4567",
    city: "Kigali",
    district: "Gasabo",
    health: "Good",
    arrived: true,
    status: "arrived at bus stop" as AttendanceStatus,
    checkInTime: "07:45 AM",
  },
  {
    name: "Aline Uwase",
    grade: "P6",
    phone: "072-987-6543",
    city: "Huye",
    district: "Ngoma",
    health: "Good",
    arrived: false,
    status: "on road" as AttendanceStatus,
    checkInTime: "Expected: 08:30 AM",
  },
  {
    name: "David Niyonshuti",
    grade: "S5",
    phone: "079-456-7890",
    city: "Rubavu",
    district: "Rubavu",
    health: "Needs attention",
    arrived: true,
    status: "arrived at bus stop" as AttendanceStatus,
    checkInTime: "07:30 AM",
  },
];

const mockJourneys = [
  {
    id: "J001",
    date: "2025/10/12",
    bus: "RAB 234 A",
    route: "Kigali → Huye",
    passengers: 45,
    capacity: 50,
    departure: "08:00",
    arrival: "12:30",
    status: "completed" as JourneyStatus,
    driver: "John Doe",
    delay: 0,
  },
  {
    id: "J002",
    date: "2025/11/12",
    bus: "RAB 234 B",
    route: "Kigali → Nyamagabe",
    passengers: 25,
    capacity: 50,
    departure: "07:00",
    arrival: "12:30",
    status: "completed" as JourneyStatus,
    driver: "Jane Smith",
    delay: 15,
  },
];

const mockIncidents = [
  {
    date: "2025/10/12",
    bus: "RAB 234 A",
    route: "Kigali → Huye",
    journeyId: "J001",
    type: "Minor Delay",
    severity: "low",
    message: "Minor delay due to road construction near Muhanga. Expected additional 15 minutes.",
    resolved: true,
  },
  {
    date: "2025/11/12",
    bus: "RAB 234 B",
    route: "Kigali → Nyamagabe",
    journeyId: "J002",
    type: "Mechanical Issue",
    severity: "medium",
    message: "Minor tire pressure issue. Resolved within 20 minutes.",
    resolved: true,
  },
];

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState("bookings");
  const [year, setYear] = useState(2025);
  const [month, setMonth] = useState("January");
  const [incidentModal, setIncidentModal] = useState<any>(null);
  const [cardIndex, setCardIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');

  const totalRevenue = mockBookings.reduce((sum, b) => sum + b.revenue, 0);
  const totalTickets = mockBookings.reduce((sum, b) => sum + b.tickets, 0);
  const confirmedBookings = mockBookings.filter(b => b.status === "Confirmed").length;
  const pendingPayments = mockBookings.filter(b => b.payment === "Pending").length;

  const stats = [
    { title: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'from-blue-700 to-blue-800', desc: `${confirmedBookings} confirmed bookings` },
    { title: 'Total Tickets', value: totalTickets.toString(), icon: FileText, color: 'from-green-600 to-green-700', desc: 'Tickets sold this period' },
    { title: 'Active Journeys', value: mockJourneys.length.toString(), icon: Bus, color: 'from-purple-600 to-purple-700', desc: 'Currently tracked routes' },
    { title: 'Pending Actions', value: pendingPayments.toString(), icon: Clock, color: 'from-orange-600 to-orange-700', desc: 'Requires attention' }
  ];

  const downloadReport = () => {
    alert(`Downloading ${activeTab} report for ${month} ${year}`);
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      "Paid": "bg-green-100 text-green-800 border-green-200",
      "Pending": "bg-orange-100 text-orange-800 border-orange-200",
      "Cancelled": "bg-red-100 text-red-800 border-red-200",
      "Confirmed": "bg-blue-100 text-blue-800 border-blue-200",
      "completed": "bg-green-100 text-green-800 border-green-200",
      "pending": "bg-orange-100 text-orange-800 border-orange-200",
      "arrived at bus stop": "bg-green-100 text-green-800 border-green-200",
      "on road": "bg-blue-100 text-blue-800 border-blue-200",
      "low": "bg-green-100 text-green-800 border-green-200",
      "medium": "bg-orange-100 text-orange-800 border-orange-200",
      "high": "bg-red-100 text-red-800 border-red-200",
    };
    return colors[status] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const nextCard = () => {
    if (cardIndex < stats.length - 1) {
      setSlideDirection('left');
      setIsSliding(true);
      setTimeout(() => {
        setCardIndex(cardIndex + 1);
        setIsSliding(false);
      }, 300);
    }
  };

  const prevCard = () => {
    if (cardIndex > 0) {
      setSlideDirection('right');
      setIsSliding(true);
      setTimeout(() => {
        setCardIndex(cardIndex - 1);
        setIsSliding(false);
      }, 300);
    }
  };

  const CurrentIcon = stats[cardIndex].icon;

  return (
    <div className='w-full flex-1 space-y-6 h-full'>
      {/* Header */}
      <header className="w-full px-6 py-4 bg-white border-b border-gray-200 flex justify-between items-center">
        <div>
          <h1 className="text-[16px] font-semibold text-gray-900">Reports Dashboard</h1>
          <p className="text-gray-600 text-[14px]">Comprehensive analytics and insights</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={downloadReport}
            className="px-4 py-2 text-[14px] font-medium rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-800 hover:to-blue-900 transition-all duration-200 flex items-center gap-2 shadow-sm"
          >
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </header>

      {/* Stats Carousel Card */}
      <div className="px-6">
        <div className={`bg-gradient-to-r h-[200px] ${stats[cardIndex].color} w-full max-w-md rounded-xl p-5 text-white shadow-lg relative overflow-hidden`}>
          <div className={`transition-all duration-300 ${isSliding ? `opacity-0 ${slideDirection === 'left' ? '-translate-x-8' : 'translate-x-8'}` : 'opacity-100 translate-x-0'}`}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[12px] text-white/80">{stats[cardIndex].title}</p>
                <p className="text-3xl font-bold mt-2">{stats[cardIndex].value}</p>
              </div>
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <CurrentIcon className="w-7 h-7 text-white" />
              </div>
            </div>

            <div className="pt-3 border-t border-white/20">
              <p className="text-[13px] text-white/80">{stats[cardIndex].desc}</p>
            </div>
          </div>

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
                        setSlideDirection(idx > cardIndex ? 'left' : 'right');
                        setIsSliding(true);
                        setTimeout(() => {
                          setCardIndex(idx);
                          setIsSliding(false);
                        }, 300);
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
          {/* Filters */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-4">
              <div className="flex gap-3 flex-1">
                <div className="flex-1">
                  <label className="block text-[14px] font-medium text-gray-700 mb-2">Year</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <select 
                      value={year} 
                      onChange={(e) => setYear(Number(e.target.value))} 
                      className="w-full pl-9 pr-3 py-2.5 text-[14px] border border-gray-300 rounded-lg focus:border-blue-800 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                    >
                      {years.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                </div>
                
                <div className="flex-1">
                  <label className="block text-[14px] font-medium text-gray-700 mb-2">Month</label>
                  <select 
                    value={month} 
                    onChange={(e) => setMonth(e.target.value)} 
                    className="w-full px-3 py-2.5 text-[14px] border border-gray-300 rounded-lg focus:border-blue-800 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  >
                    {months.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 mt-6 rounded-lg px-4 py-2.5">
                <p className="text-[12px] text-blue-600 font-medium">Showing data for</p>
                <p className="text-[14px] text-blue-800 font-semibold">{month} {year}</p>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 rounded-lg text-[14px] font-medium whitespace-nowrap transition-all duration-200 flex items-center gap-2 ${
                      tab.id === activeTab 
                        ? 'bg-gradient-to-r from-blue-700 to-blue-800 text-white shadow-md' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                    {activeTab === tab.id && (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {activeTab === "bookings" && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-300">
                      {["Date", "Status", "Payment", "Tickets", "Revenue", "Actions"].map(header => (
                        <th key={header} className="py-5 px-6 text-left">
                          <span className="text-[14px] font-semibold text-black">{header}</span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {mockBookings.map((booking, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-blue-50/30 transition-colors">
                        <td className="py-5 px-6">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span className="text-[14px] font-medium text-gray-900">
                              {new Date(booking.date).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </span>
                          </div>
                        </td>
                        <td className="py-5 px-6">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-[13px] font-medium ${getStatusColor(booking.status)}`}>
                            {booking.status === "Confirmed" && <CheckCircle className="w-3.5 h-3.5" />}
                            {booking.status === "Cancelled" && <X className="w-3.5 h-3.5" />}
                            {booking.status}
                          </span>
                        </td>
                        <td className="py-5 px-6">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-[13px] font-medium ${getStatusColor(booking.payment)}`}>
                            {booking.payment === "Paid" && <CheckCircle className="w-3.5 h-3.5" />}
                            {booking.payment === "Pending" && <Clock className="w-3.5 h-3.5" />}
                            {booking.payment}
                          </span>
                        </td>
                        <td className="py-5 px-6">
                          <div className="flex items-center gap-3">
                            <span className="text-[14px] font-semibold text-gray-900">{booking.tickets}</span>
                          </div>
                        </td>
                        <td className="py-5 px-6">
                          <span className="text-[14px] font-semibold text-gray-900">${booking.revenue.toLocaleString()}</span>
                        </td>
                        <td className="py-5 px-6">
                          <button className="inline-flex items-center gap-1 px-3 py-1.5 text-[12px] font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors">
                            <Eye className="w-3 h-3" />
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "attendance" && (
              <div>
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                  <div>
                    <h3 className="text-[16px] font-semibold text-gray-900">Student Attendance Tracking</h3>
                    <p className="text-[14px] text-gray-600 mt-1">Real-time monitoring of student arrivals</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-[14px] text-gray-600">Arrived (2)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <span className="text-[14px] text-gray-600">On Road (1)</span>
                    </div>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-300">
                        {["Student", "Grade",  "Location", "Health Status", "Check-in Time" ,"Bus","Driver", "Status", "Confirm attendence"].map(header => (
                          <th key={header} className="py-5 px-6 text-left">
                            <span className="text-[14px] font-semibold text-black">{header}</span>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {mockStudents.map((student, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-blue-50/30 transition-colors">
                          <td className="py-5 px-6">
                            <div>
                              <div className="text-[13px] font-medium text-gray-900">{student.name}</div>
                              <div className="text-[11px] text-gray-500">{student.district} District</div>
                            </div>
                          </td>
                          <td className="py-5 px-6">
                            <span className="px-3 py-1.5 bg-gray-100 text-gray-800 rounded-lg text-[13px] font-medium">
                              {student.grade}
                            </span>
                          </td>
                          <td className="py-5 px-6">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-gray-400" />
                              <span className="text-[13px] text-gray-900">{student.city}</span>
                            </div>
                          </td>
                          <td className="py-5 px-6">
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${student.health === "Good" ? "bg-green-500" : "bg-orange-500"}`}></div>
                              <span className="text-[13px] text-gray-900">{student.health}</span>
                            </div>
                          </td>
                          <td className="py-5 px-6">
                            <span className="text-[13px] text-gray-900">{student.checkInTime}</span>
                          </td>
                          
                          <td className="py-5 px-6">
                            <span className="text-[13px] text-gray-900">RAB-123</span>
                          </td>
                          <td className="py-5 px-6">
                            <span className="text-[13px] text-gray-900">0793216191</span>
                          </td>
                          <td className="py-5 px-6">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-[12px] font-medium ${getStatusColor(student.status)}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${
                                student.status === 'arrived at bus stop' ? 'bg-green-500' : 'bg-blue-500'
                              }`}></span>
                              {student.status === 'arrived at bus stop' ? 'Arrived' : 'On Road'}
                            </span>
                          </td>
                          <td className="py-5 px-6">
                            <input 
                              type="checkbox" 
                              
                              className="w-5 h-5 rounded-lg accent-green-600 cursor-pointer"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "journey" && (
              <div className="space-y-6">
                {mockJourneys.map((journey) => (
                  <div key={journey.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all duration-200">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center">
                          <Bus className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-[16px] font-semibold text-gray-900">{journey.route}</h3>
                          <p className="text-[14px] text-gray-600">Journey ID: {journey.id} • {journey.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[14px] font-medium ${getStatusColor(journey.status)}`}>
                          {journey.status === 'completed' && <CheckCircle className="w-3.5 h-3.5" />}
                          {journey.status.charAt(0).toUpperCase() + journey.status.slice(1)}
                        </span>
                        <div className="text-right">
                          <div className="text-[20px] font-bold text-gray-900">
                            {journey.passengers}
                            <span className="text-[14px] font-normal text-gray-600">/{journey.capacity}</span>
                          </div>
                          <div className="text-[12px] text-gray-500">Passengers</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center gap-2 text-gray-600 mb-1">
                          <Bus className="w-4 h-4" />
                          <span className="text-[14px]">Bus Number</span>
                        </div>
                        <div className="font-semibold text-gray-900">{journey.bus}</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center gap-2 text-gray-600 mb-1">
                          <Users className="w-4 h-4" />
                          <span className="text-[14px]">Driver</span>
                        </div>
                        <div className="font-semibold text-gray-900">{journey.driver}</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center gap-2 text-gray-600 mb-1">
                          <Clock className="w-4 h-4" />
                          <span className="text-[14px]">Schedule</span>
                        </div>
                        <div className="font-semibold text-gray-900">{journey.departure} → {journey.arrival}</div>
                      </div>
                      <div className={`rounded-lg p-4 ${journey.delay > 0 ? "bg-orange-50 border border-orange-200" : "bg-green-50 border border-green-200"}`}>
                        <div className="flex items-center gap-2 mb-1">
                          <Activity className={`w-4 h-4 ${journey.delay > 0 ? "text-orange-600" : "text-green-600"}`} />
                          <span className={`text-[14px] ${journey.delay > 0 ? "text-orange-600" : "text-green-600"}`}>Delay Status</span>
                        </div>
                        <div className={`font-semibold ${journey.delay > 0 ? "text-orange-700" : "text-green-700"}`}>
                          {journey.delay > 0 ? `+${journey.delay} min` : "On Time"}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "incidents" && (
              <div className="space-y-6">
                {mockJourneys.map((journey) => {
                  const incident = mockIncidents.find(i => i.journeyId === journey.id);
                  return (
                    <div key={journey.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all duration-200">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                            incident ? 
                              incident.severity === "high" ? "bg-red-50 border border-red-200" :
                              incident.severity === "medium" ? "bg-orange-50 border border-orange-200" :
                              "bg-green-50 border border-green-200"
                            : "bg-blue-50 border border-blue-200"
                          }`}>
                            {incident ? <AlertTriangle className={`w-6 h-6 ${
                              incident.severity === "high" ? "text-red-600" :
                              incident.severity === "medium" ? "text-orange-600" :
                              "text-green-600"
                            }`} /> : <CheckCircle className="w-6 h-6 text-blue-600" />}
                          </div>
                          <div>
                            <h3 className="text-[16px] font-semibold text-gray-900">{journey.route}</h3>
                            <p className="text-[14px] text-gray-600">{journey.date} • Bus {journey.bus}</p>
                          </div>
                        </div>
                        {incident ? (
                          <span className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[14px] font-medium ${getStatusColor(incident.severity)}`}>
                            {incident.type}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[14px] font-medium bg-green-100 text-green-800 border-green-200">
                            <CheckCircle className="w-3.5 h-3.5" />
                            No Incidents
                          </span>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="bg-gray-50 rounded-lg p-3">
                          <div className="text-[12px] text-gray-600 mb-1">Journey ID</div>
                          <div className="font-semibold text-gray-900">{journey.id}</div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <div className="text-[12px] text-gray-600 mb-1">Status</div>
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[12px] font-medium ${getStatusColor(journey.status)}`}>
                            {journey.status.charAt(0).toUpperCase() + journey.status.slice(1)}
                          </span>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <div className="text-[12px] text-gray-600 mb-1">Passengers</div>
                          <div className="font-semibold text-gray-900">{journey.passengers}/{journey.capacity}</div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <div className="text-[12px] text-gray-600 mb-1">Driver</div>
                          <div className="font-semibold text-gray-900">{journey.driver}</div>
                        </div>
                      </div>

                      {incident && (
                        <div className={`rounded-lg p-4 border ${
                          incident.severity === "high" ? "bg-red-50 border-red-200" :
                          incident.severity === "medium" ? "bg-orange-50 border-orange-200" :
                          "bg-green-50 border-green-200"
                        }`}>
                          <div className="flex items-center gap-2 mb-3">
                            <AlertCircle className={`w-5 h-5 ${
                              incident.severity === "high" ? "text-red-600" :
                              incident.severity === "medium" ? "text-orange-600" :
                              "text-green-600"
                            }`} />
                            <span className="font-semibold text-gray-900">Incident Details</span>
                          </div>
                          <p className="text-[14px] text-gray-700 mb-3">{incident.message}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${incident.resolved ? "bg-green-500" : "bg-orange-500"}`}></div>
                              <span className="text-[14px] text-gray-600">
                                Status: <span className="font-medium">{incident.resolved ? "Resolved" : "Under Investigation"}</span>
                              </span>
                            </div>
                            <button
                              onClick={() => setIncidentModal(incident)}
                              className="inline-flex items-center gap-1 px-3 py-1.5 text-[12px] font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
                            >
                              <Eye className="w-3 h-3" />
                              View Report
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Incident Modal */}
      {incidentModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden">
            <div className={`px-6 py-4 flex justify-between items-center ${
              incidentModal.severity === "high" ? "bg-gradient-to-r from-red-600 to-red-700" :
              incidentModal.severity === "medium" ? "bg-gradient-to-r from-orange-600 to-orange-700" :
              "bg-gradient-to-r from-green-600 to-green-700"
            }`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-[16px] font-semibold text-white">Incident Report</h3>
                  <p className="text-[12px] text-white/80">{incidentModal.date} • {incidentModal.route}</p>
                </div>
              </div>
              <button
                onClick={() => setIncidentModal(null)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-[14px] text-gray-600 mb-1">Bus Number</div>
                <div className="font-semibold text-[16px] text-gray-900">{incidentModal.bus}</div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-[14px] text-gray-600 mb-1">Incident Type</div>
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[14px] font-medium ${getStatusColor(incidentModal.severity)}`}>
                    {incidentModal.type}
                  </span>
                </div>
              </div>
              
              <div>
                <div className="text-[14px] text-gray-600 mb-2">Description</div>
                <p className="text-[14px] text-gray-700 bg-gray-50 p-4 rounded-lg border border-gray-200">
                  {incidentModal.message}
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${incidentModal.resolved ? "bg-green-500" : "bg-orange-500"}`}></div>
                <span className="text-[14px] font-medium text-gray-900">
                  Status: {incidentModal.resolved ? "Resolved" : "Under Investigation"}
                </span>
              </div>
            </div>
            
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex gap-3">
              <button
                onClick={() => setIncidentModal(null)}
                className="flex-1 px-4 py-2.5 text-[14px] font-medium rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-all"
              >
                Close
              </button>
              <button
                onClick={() => {
                  alert("Report downloaded");
                  setIncidentModal(null);
                }}
                className="flex-1 px-4 py-2.5 text-[14px] font-medium rounded-lg bg-gradient-to-r from-blue-700 to-blue-800 text-white hover:from-blue-800 hover:to-blue-900 transition-all"
              >
                <Download className="w-4 h-4 inline mr-2" />
                Download
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="p-5"></div>
    </div>
  );
} 