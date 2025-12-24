import React, { useState } from "react";
import { 
  FiDownload, 
  FiCalendar, 
  FiChevronRight, 
  FiCheckCircle, 
  FiAlertCircle,
  FiTrendingUp,
  FiUsers,
  FiClock,
  FiMapPin
} from "react-icons/fi";
import { 
  HiOutlineArrowSmUp, 
  HiOutlineArrowSmDown 
} from "react-icons/hi";

type BookingStatus = "Paid" | "Pending" | "Cancelled";
type JourneyStatus = "completed" | "pending";
type AttendanceStatus = "on road" | "arrived at bus stop";

const years = [2023, 2024, 2025];
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const tabs = [
  { id: "bookings", label: "Bookings", icon: FiCalendar },
  { id: "attendance", label: "Student Attendance", icon: FiUsers },
  { id: "journey", label: "Journey Summary", icon: FiMapPin },
  { id: "incidents", label: "Incident Reports", icon: FiAlertCircle },
];

/* ---------------- MOCK DATA ---------------- */
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


/* ---------------- COMPONENT ---------------- */
export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState("bookings");
  const [year, setYear] = useState(2025);
  const [month, setMonth] = useState("January");
  const [incidentModal, setIncidentModal] = useState<any>(null);

  const downloadReport = () => {
    alert(`Downloading ${activeTab} report for ${month} ${year}`);
  };

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      "Paid": "bg-green-100 text-green-800",
      "Pending": "bg-yellow-100 text-yellow-800",
      "Cancelled": "bg-red-100 text-red-800",
      "Confirmed": "bg-blue-100 text-blue-800",
      "completed": "bg-green-100 text-green-800",
      "pending": "bg-yellow-100 text-yellow-800",
      "arrived at bus stop": "bg-green-100 text-green-800",
      "on road": "bg-blue-100 text-blue-800",
      "low": "bg-green-100 text-green-800",
      "medium": "bg-yellow-100 text-yellow-800",
      "high": "bg-red-100 text-red-800",
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status] || "bg-gray-100 text-gray-800"}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports Dashboard</h1>
          <p className="text-gray-600 mt-1">Comprehensive overview and analytics</p>
        </div>
        <button
          onClick={downloadReport}
          className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg hover:from-blue-700 hover:to-blue-900 transition-all shadow-md hover:shadow-lg"
        >
          <FiDownload className="text-lg" />
          <span className="font-medium">Export Report</span>
        </button>
      </div>


      {/* Filters and Tabs Container */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        {/* Filters */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-8">
          <div className="flex-1 flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Year</label>
              <div className="relative">
                <select 
                  value={year} 
                  onChange={(e) => setYear(Number(e.target.value))} 
                  className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none bg-white"
                >
                  {years.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
                <FiCalendar className="absolute left-3 top-3.5 text-gray-400" />
              </div>
            </div>
            
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Month</label>
              <select 
                value={month} 
                onChange={(e) => setMonth(e.target.value)} 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
              >
                {months.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
          </div>
          
          <div className="hidden lg:block">
            <div className="text-sm text-gray-600 bg-blue-50 px-4 py-3 rounded-lg border border-blue-100">
              <p className="font-medium">Showing data for:</p>
              <p className="text-blue-700">{month} {year}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all ${activeTab === tab.id 
                  ? "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border border-blue-200 shadow-sm" 
                  : "text-gray-600 hover:bg-gray-50"}`}
              >
                <Icon className="text-lg" />
                <span className="font-medium">{tab.label}</span>
                {activeTab === tab.id && (
                  <FiChevronRight className="text-blue-600" />
                )}
              </button>
            );
          })}
        </div>

        {/* CONTENT */}
        <div className="mt-8">
          {activeTab === "bookings" && (
            <div className="overflow-hidden rounded-xl border border-gray-200">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">Booking Summary</h3>
                <p className="text-sm text-gray-600 mt-1">Total bookings and revenue for selected period</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      {["Date", "Status", "Payment", "Tickets", "Revenue", "Actions"].map(header => (
                        <th key={header} className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {mockBookings.map((booking, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{booking.date}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(booking.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(booking.payment)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="text-sm font-medium text-gray-900">{booking.tickets}</span>
                            <div className="ml-2 w-24 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ width: `${(booking.tickets / 250) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">${booking.revenue.toLocaleString()}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "attendance" && (
            <div className="overflow-hidden rounded-xl border border-gray-200">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">Student Attendance</h3>
                    <p className="text-sm text-gray-600 mt-1">Real-time tracking of student arrivals</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-sm text-gray-600">Arrived (2)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <span className="text-sm text-gray-600">On Road (1)</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      {["Student", "Grade", "Contact", "Location", "Health Status", "Check-in Time", "Status", "Actions"].map(header => (
                        <th key={header} className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {mockStudents.map((student, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{student.name}</div>
                            <div className="text-xs text-gray-500">{student.district} District</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                            {student.grade}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {student.phone}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <FiMapPin className="text-gray-400" />
                            <span className="text-sm text-gray-900">{student.city}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${student.health === "Good" ? "bg-green-500" : "bg-yellow-500"}`}></div>
                            <span className="text-sm text-gray-900">{student.health}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {student.checkInTime}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(student.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input 
                            type="checkbox" 
                            checked={student.arrived}
                            readOnly
                            className="w-5 h-5 rounded-lg accent-green-600 cursor-pointer hover:accent-green-700"
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
            <div className="grid gap-6">
              {mockJourneys.map((journey) => (
                <div key={journey.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-gray-900">{journey.route}</h3>
                        {getStatusBadge(journey.status)}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Journey ID: {journey.id} • Date: {journey.date}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">{journey.passengers}<span className="text-sm font-normal text-gray-600">/{journey.capacity}</span></div>
                        <div className="text-xs text-gray-500">Passengers</div>
                      </div>
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${(journey.passengers / journey.capacity) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-600">Bus Number</div>
                      <div className="font-medium mt-1">{journey.bus}</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-600">Driver</div>
                      <div className="font-medium mt-1">{journey.driver}</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-600">Schedule</div>
                      <div className="font-medium mt-1">{journey.departure} → {journey.arrival}</div>
                    </div>
                    <div className={`p-4 rounded-lg ${journey.delay > 0 ? "bg-yellow-50" : "bg-green-50"}`}>
                      <div className="text-sm text-gray-600">Delay Status</div>
                      <div className={`font-medium mt-1 ${journey.delay > 0 ? "text-yellow-700" : "text-green-700"}`}>
                        {journey.delay > 0 ? `${journey.delay} min delay` : "On Time"}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "incidents" && (
            <div className="grid gap-4">
              {mockJourneys.map((journey) => {
                const incident = mockIncidents.find(i => i.journeyId === journey.id);
                return (
                  <div key={journey.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-lg font-semibold text-gray-900">{journey.route}</h3>
                          {incident ? (
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              incident.severity === "high" ? "bg-red-100 text-red-800" :
                              incident.severity === "medium" ? "bg-yellow-100 text-yellow-800" :
                              "bg-green-100 text-green-800"
                            }`}>
                              {incident.type}
                            </span>
                          ) : (
                            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                              No Incidents
                            </span>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                          <div>
                            <div className="text-sm text-gray-600">Date</div>
                            <div className="font-medium">{journey.date}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-600">Bus</div>
                            <div className="font-medium">{journey.bus}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-600">Status</div>
                            <div className="font-medium">{getStatusBadge(journey.status)}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-600">Passengers</div>
                            <div className="font-medium">{journey.passengers}</div>
                          </div>
                        </div>

                        {incident && (
                          <div className="mt-6">
                            <div className="flex items-center gap-2 mb-2">
                              <FiAlertCircle className="text-yellow-600" />
                              <span className="font-medium text-gray-900">Incident Details</span>
                            </div>
                            <p className="text-sm text-gray-700 bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                              {incident.message}
                            </p>
                            <div className="flex items-center gap-4 mt-4">
                              <span className="text-sm text-gray-600">
                                Resolved: {incident.resolved ? (
                                  <span className="text-green-600 font-medium">Yes</span>
                                ) : (
                                  <span className="text-red-600 font-medium">No</span>
                                )}
                              </span>
                              <button
                                onClick={() => setIncidentModal(incident)}
                                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                              >
                                View Full Report →
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* INCIDENT MODAL */}
      {incidentModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl transform transition-all">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Incident Report</h3>
                <p className="text-sm text-gray-600 mt-1">{incidentModal.date} • {incidentModal.route}</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                incidentModal.severity === "high" ? "bg-red-100 text-red-800" :
                incidentModal.severity === "medium" ? "bg-yellow-100 text-yellow-800" :
                "bg-green-100 text-green-800"
              }`}>
                {incidentModal.severity.toUpperCase()} SEVERITY
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Bus Number</div>
                <div className="font-medium text-lg">{incidentModal.bus}</div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Incident Type</div>
                <div className="font-medium text-lg">{incidentModal.type}</div>
              </div>
              
              <div>
                <div className="text-sm text-gray-600 mb-2">Description</div>
                <p className="text-gray-700 bg-gray-50 p-4 rounded-lg border border-gray-200">
                  {incidentModal.message}
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${incidentModal.resolved ? "bg-green-500" : "bg-yellow-500"}`}></div>
                <span className="text-sm font-medium">
                  Status: {incidentModal.resolved ? "Resolved" : "Under Investigation"}
                </span>
              </div>
            </div>
            
            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setIncidentModal(null)}
                className="flex-1 px-4 py-3 bg-gray-100 text-gray-800 font-medium rounded-lg hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  alert("Report downloaded");
                  setIncidentModal(null);
                }}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-900 transition-all"
              >
                Download Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}