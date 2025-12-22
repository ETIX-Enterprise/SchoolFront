import React, { useMemo, useState } from "react";
import { FiDownload } from "react-icons/fi";

type BookingStatus = "Paid" | "Pending" | "Cancelled";
type JourneyStatus = "completed" | "pending";
type AttendanceStatus = "on road" | "arrived at bus stop";

const years = [2024, 2025];
const months = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

const tabs = [
  "Bookings",
  "Student Attendance",
  "Journey Summary",
  "Incident Reports",
];

/* ---------------- MOCK DATA ---------------- */

const mockBookings = [
  { date: "2025-01-12", status: "Confirmed", payment: "Paid", tickets: 205 },
  { date: "2025-01-20", status: "Confirmed", payment: "Pending", tickets: 130 },
];

const mockStudents = [
  {
    name: "Jean Claude",
    grade: "S3",
    phone: "078xxxxxxx",
    city: "Kigali",
    district: "Gasabo",
    health: "Good",
    arrived: true,
    status: "arrived at bus stop" as AttendanceStatus,
  },
  {
    name: "Aline Uwase",
    grade: "P6",
    phone: "072xxxxxxx",
    city: "Huye",
    district: "Ngoma",
    health: "Good",
    arrived: false,
    status: "on road" as AttendanceStatus,
  },
];

const mockJourneys = [
  {
    id: "J001",
    date:"2025/10/12",
    bus: "RAB 234 A",
    route: "Kigali → Huye",
    passengers: 45,
    departure: "08:00",
    eta: "12:30",
    status: "completed" as JourneyStatus,
  },
    {
    id: "J002",
    date:"2025/11/12",
    bus: "RAB 234 B",
    route: "Kigali → Nyamagabe",
    passengers: 25,
    departure: "07:00",
    eta: "12:30",
    status: "completed" as JourneyStatus,
  },
];

const mockIncidents = [
  {
    date : "2025/10/12",
    bus: "RAB 234 A",
    route : "Kigali → Huye",
    journeyId: "J001",
    hasIncident: true,
    message: "Minor delay due to road construction near Muhanga.",
  },
];

/* ---------------- COMPONENT ---------------- */

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState("Bookings");
  const [year, setYear] = useState(2025);
  const [month, setMonth] = useState("January");
  const [incidentModal, setIncidentModal] = useState<string | null>(null);

  const downloadReport = () => {
    alert(`Downloading ${activeTab} report for ${month} ${year}`);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-xl font-semibold mb-6">Reports</h1>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-6">
        <select value={year} onChange={(e) => setYear(Number(e.target.value))} className="border px-3 py-2 rounded">
          {years.map(y => <option key={y}>{y}</option>)}
        </select>

        <select value={month} onChange={(e) => setMonth(e.target.value)} className="border px-3 py-2 rounded">
          {months.map(m => <option key={m}>{m}</option>)}
        </select>

        <button
          onClick={downloadReport}
          className="ml-auto flex items-center gap-2 px-4 py-2 bg-blue-800 text-[14px] text-white rounded"
        >
          <FiDownload /> Download
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b mb-6">
        {tabs.map(t => (
          <button 
            key={t}
            onClick={() => setActiveTab(t)}
            className={`pb-3 ${
              activeTab === t ? "border-b-2 border-blue-800 text-blue-800 font-medium" : "text-gray-500"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      {activeTab === "Bookings" && (
        <Table
          headers={["Date", "Status", "Payment", "Passengers"]}
          rows={mockBookings.map(b => [b.date, b.status, b.payment, b.tickets])}
        />
      )}

      {activeTab === "Student Attendance" && (
        <Table
          headers={["Name","Grade","Phone","City","District","Health","Arrived at school","Status"]}
          rows={mockStudents.map(s => [
            s.name,
            s.grade,
            s.phone,
            s.city,
            s.district,
            s.health,
            <input type="checkbox" className="w-4 h-4 rounded-lg accent-green-600 checked:cursor-not-allowed cursor-pointer"/>,
            s.status,
          ])}
        />
      )}

      {activeTab === "Journey Summary" && (
        <Table
          headers={["Date","Bus","Route","Passengers","Departure","ETA","Status"]}
          rows={mockJourneys.map(j => [
            j.date,
            j.bus,
            j.route,
            j.passengers,
            j.departure,
            j.eta,
            j.status,
          ])}
        />
      )}

      {activeTab === "Incident Reports" && (
        <Table
          headers={["Date" ,"Bus","Journey","Status","Incident"]}
          rows={mockJourneys.map(j => {
            const incident = mockIncidents.find(i => i.journeyId === j.id);
            return [
              j.date,
              j.bus,
              j.route,
              j.status,
              incident ? (
                <button
                  onClick={() => setIncidentModal(incident.message)}
                  className="text-red-600 animate-pulse"
                >
                  View Incident
                </button>
              ) : (
                "Good condition"
              ),
            ];
          })}
        />
      )}

      {/* INCIDENT MODAL */}
      {incidentModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded max-w-md">
            <h3 className="font-semibold mb-3">Incident Report</h3>
            <p className="text-sm text-gray-700">{incidentModal}</p>
            <button
              onClick={() => setIncidentModal(null)}
              className="mt-4 px-4 py-2 bg-black text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------- REUSABLE TABLE ---------------- */

function Table({ headers, rows }: { headers: string[]; rows: any[][] }) {
  return (
    <div className="overflow-x-auto bg-white rounded shadow">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            {headers.map(h => (
              <th key={h} className="px-4 py-3 text-left">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t">
              {r.map((c, j) => (
                <td key={j} className="px-4 py-3">{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
