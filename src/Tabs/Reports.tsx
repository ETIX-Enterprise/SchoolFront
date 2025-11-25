import React, { useState } from "react";
import { FiMoreVertical } from "react-icons/fi";

export type Booking = {
  id: string;
  ticketNo: string;
  agency: string;
  destination: string;
  time: string;
  date: string;
  status: "Paid" | "Pending" | "Cancelled";
};

const sampleData: Booking[] = Array.from({ length: 10 }).map((_, i) => ({
  id: String(i + 1),
  ticketNo: "001",
  agency: "Virunga",
  destination: "Kigali",
  time: "08:00",
  date: "23/12/2025",
  status: i === 0 ? "Paid" : "Pending",
}));

const tabs = [
  "Bookings",
  "Payments",
  "Student Attendance",
  "Journey Summary",
  "Incident Reports",
];

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState<string>("Payments");

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-5">
          <h1 className="text-[20px] font-semibold text-gray-800">Reports</h1>
        </header>

        {/* Tabs */}
        <nav className="mb-6 border-b border-gray-300">
          <ul className="flex items-end gap-6">
            {tabs.map((t) => (
              <li key={t} className="pb-4">
                <button
                  onClick={() => setActiveTab(t)}
                  className={`text-sm font-medium pb-3 ${
                    activeTab === t
                      ? "text-gray-900 border-b-2 border-black"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {t}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Card / Table container */}
        <section>
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left">
                <thead>
                  <tr className="text-sm font-normal text-gray-800">
                    <th className="py-3 pr-6">Ticket No</th>
                    <th className="py-3 pr-6">Agency</th>
                    <th className="py-3 pr-6">Destination</th>
                    <th className="py-3 pr-6">Time</th>
                    <th className="py-3 pr-6">Date</th>
                    <th className="py-3 pr-6">Status</th>
                    <th className="py-3 pr-6">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {sampleData.map((row) => (
                    <tr key={row.id} className="text-sm text-gray-700">
                      <td className="py-4 pr-6">{row.ticketNo}</td>
                      <td className="py-4 pr-6">{row.agency}</td>
                      <td className="py-4 pr-6">{row.destination}</td>
                      <td className="py-4 pr-6">{row.time}</td>
                      <td className="py-4 pr-6">{row.date}</td>
                      <td className="py-4 pr-6">
                        <StatusPill status={row.status} />
                      </td>
                      <td className="py-4 pr-6">
                        <button
                          aria-label="actions"
                          className="p-2 rounded-full hover:bg-gray-100"
                        >
                          <FiMoreVertical size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Optional: a simple pagination bar to match the visual style */}
            <div className="mt-6 flex items-center justify-between">
              <div className="text-sm text-gray-500">Showing 1–10 of 10</div>
              <div className="flex gap-2">
                <button className="px-3 py-1 rounded-md bg-white border border-gray-200 text-sm hover:shadow-sm">
                  Prev
                </button>
                <button className="px-3 py-1 rounded-md bg-white border border-gray-200 text-sm hover:shadow-sm">
                  Next
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function StatusPill({ status }: { status: Booking["status"] }) {
  const base =
    "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold shadow-sm";

  if (status === "Paid") {
    return <span className={`${base} bg-green-100 text-green-800`}>Paid</span>;
  }
  if (status === "Cancelled") {
    return <span className={`${base} bg-yellow-100 text-yellow-800`}>Cancelled</span>;
  }
  return <span className={`${base} bg-red-100 text-red-700`}>Pending</span>;
}
