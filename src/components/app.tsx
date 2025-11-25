import { JSX, useState } from "react";
import { JourneyCard } from "./JourneyCard";
import { Bus } from "lucide-react";

export interface Journey {
  id: string;
  busPlate: string;
  from?: string;            // added to match JourneyCard usage
  passengers: number;
  destination: string;
  departureTime: string;
  arrivalTime?: string;
  status: "pending" | "completed" | "cancelled"; // include cancelled to match card checks
  progress?: number;        // 0-100 optional progress for in-transit visuals
  lastUpdate?: string;      // optional last update string
}

const mockJourneys: Journey[] = [
  {
    id: "1",
    busPlate: "ABC-1234",
    from: "Kigali",
    passengers: 42,
    destination: "Huye",
    departureTime: "2025-11-25T08:00:00",
    arrivalTime: "2025-11-25T12:30:00",
    status: "completed",
    progress: 100,
    lastUpdate: "Nov 25, 2025 12:35",
  },
  {
    id: "2",
    busPlate: "XYZ-5678",
    from: "Kigali",
    passengers: 38,
    destination: "Nyanza",
    departureTime: "2025-11-25T09:15:00",
    status: "pending",
    progress: 48,
    lastUpdate: "Nov 25, 2025 10:10",
  },
  {
    id: "3",
    busPlate: "DEF-9012",
    from: "Kigali",
    passengers: 45,
    destination: "Muhanga",
    departureTime: "2025-11-25T07:30:00",
    arrivalTime: "2025-11-25T10:45:00",
    status: "completed",
    progress: 100,
    lastUpdate: "Nov 25, 2025 10:50",
  },
  {
    id: "4",
    busPlate: "GHI-3456",
    from: "Kigali",
    passengers: 40,
    destination: "Nyagatare",
    departureTime: "2025-11-25T10:00:00",
    status: "pending",
    progress: 33,
    lastUpdate: "Nov 25, 2025 10:30",
  },
  {
    id: "5",
    busPlate: "JKL-7890",
    from: "Kigali",
    passengers: 35,
    destination: "Bugesera",
    departureTime: "2025-11-25T11:30:00",
    status: "pending",
    progress: 0,
    lastUpdate: "Nov 25, 2025 09:45",
  },
  {
    id: "6",
    busPlate: "MNO-2468",
    from: "Kigali",
    passengers: 48,
    destination: "Burera",
    departureTime: "2025-11-24T14:00:00",
    arrivalTime: "2025-11-24T22:15:00",
    status: "completed",
    progress: 100,
    lastUpdate: "Nov 24, 2025 22:20",
  },
];

export default function App(): JSX.Element {
  const [activeTab, setActiveTab] = useState<"all" | "pending" | "completed">(
    "all"
  );

  const filteredJourneys = mockJourneys.filter((journey) => {
    if (activeTab === "all") return true;
    return journey.status === activeTab;
  });

  const stats = {
    total: mockJourneys.length,
    pending: mockJourneys.filter((j) => j.status === "pending").length,
    completed: mockJourneys.filter((j) => j.status === "completed").length,
    totalPassengers: mockJourneys.reduce((acc, j) => acc + j.passengers, 0),
  };

  return (
    <div className="min-h-screen">
      <main className="max-w-full mx-auto px-4 sm:px-6 lg:px-4 py-5">
        <div className=" overflow-hidden mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-6 py-4 border-b-2 text-[14px] transition-colors ${
                  activeTab === "all"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-black hover:text-gray-800 hover:border-gray-300"
                }`}
              >
                All Journeys ({stats.total})
              </button>
              <button
                onClick={() => setActiveTab("pending")}
                className={`px-6 py-4 border-b-2 text-[14px] transition-colors ${
                  activeTab === "pending"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-black hover:text-gray-800 hover:border-gray-300"
                }`}
              >
                Pending ({stats.pending})
              </button>
              <button
                onClick={() => setActiveTab("completed")}
                className={`px-6 py-4 border-b-2 text-[14px] transition-colors ${
                  activeTab === "completed"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-black hover:text-gray-800 hover:border-gray-300"
                }`}
              >
                Completed ({stats.completed})
              </button>
            </nav>
          </div>

          {/* Journey List */}
          <div className="p-6">
            {filteredJourneys.length === 0 ? (
              <div className="text-center py-12">
                <Bus className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">No journeys found</p>
              </div>
            ) : (
              // grid 2 columns on sm+
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredJourneys.map((journey) => (
                  <JourneyCard key={journey.id} journey={journey} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
