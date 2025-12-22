// App.tsx
import { useMemo, useState , useEffect } from "react";
import { JourneyCard } from "./JourneyCard";
import { JourneyMap } from "./JourneyMap";
import { JSX } from "react/jsx-runtime";
import { ChevronLeft, ChevronRight } from "lucide-react";



export interface Journey {
   id: string;
   busPlate: string;
   from: string; 
   destination: string; 
   passengers: number; 
   departureTime: string; 
   arrivalTime?: string; status: "pending" | "completed" | "cancelled"; 
   progress?: number; 
   lastUpdate?: string; 
   fromCoords: [number, number];  
   destinationCoords: [number, number]; 
   currentCoords?: [number, number];
  }
export interface Passenger {
  id: string;
  student: string;
  grade: string;
  parentPhone: string;
  city: string;
  district: string;
  health: string;
}

export const mockPassengers: Passenger[] = [
  {
    id: "p1",
    student: "Jean Claude",
    grade: "P5",
    parentPhone: "0788123456",
    city: "Kigali",
    district: "Gasabo",
    health: "Good",
  },
  {
    id: "p2",
    student: "Aline Uwase",
    grade: "P6",
    parentPhone: "0722456789",
    city: "Kigali",
    district: "Kicukiro",
    health: "Asthma",
  },
  {
    id: "p3",
    student: "Eric Niyonzima",
    grade: "S1",
    parentPhone: "0733987654",
    city: "Huye",
    district: "Ngoma",
    health: "Good",
  },
];

const mockJourneys: Journey[] = [
  {
    id: "1",
    busPlate: "ABC-1234",
    from: "Kigali",
    destination: "Huye",
    passengers: 42,
    departureTime: "2025-11-25T08:00:00",
    status: "pending",
    progress: 50,
    lastUpdate: "Nov 25, 2025 10:10",
    fromCoords: [30.0619, -1.9441],
    destinationCoords: [29.7411, -2.5967],
    currentCoords: [30.0619, -1.9441],
  },
  {
    id: "2",
    busPlate: "XYZ-5678",
    from: "Kigali",
    destination: "Nyanza",
    passengers: 38,
    departureTime: "2025-11-25T09:15:00",
    status: "pending",
    progress: 48,
    lastUpdate: "Nov 25, 2025 10:07",
    fromCoords: [30.0619, -1.9441],
    destinationCoords: [29.7658, -2.3500],
    currentCoords: [30.0619, -1.9441],
  },
  {
    id: "3",
    busPlate: "DEF-9012",
    from: "Kigali",
    destination: "Muhanga",
    passengers: 45,
    departureTime: "2025-11-25T07:30:00",
    status: "completed",
    progress: 100,
    lastUpdate: "Nov 25, 2025 10:50",
    fromCoords: [30.0619, -1.9441],
    destinationCoords: [29.7400, -2.1083],
    currentCoords: [30.0619, -1.9441],
  },
  {
    id: "4",
    busPlate: "GHI-3456",
    from: "Kigali",
    destination: "Nyagatare",
    passengers: 40,
    departureTime: "2025-11-25T10:00:00",
    status: "pending",
    progress: 33,
    lastUpdate: "Nov 25, 2025 10:30",
    fromCoords: [30.0619, -1.9441],
    destinationCoords: [30.3289, -1.2920],
    currentCoords: [30.0619, -1.9441],
  },
  {
    id: "5",
    busPlate: "JKL-7890",
    from: "Kigali",
    destination: "Bugesera",
    passengers: 35,
    departureTime: "2025-11-25T11:30:00",
    status: "pending",
    progress: 0,
    lastUpdate: "Nov 25, 2025 09:45",
    fromCoords: [30.0619, -1.9441],
    destinationCoords: [30.1880, -2.1830],
    currentCoords: [30.0619, -1.9441],
  },
  {
    id: "6",
    busPlate: "MNO-2468",
    from: "Kigali",
    destination: "Burera",
    passengers: 48,
    departureTime: "2025-11-24T14:00:00",
    arrivalTime: "2025-11-24T22:15:00",
    status: "completed",
    progress: 100,
    lastUpdate: "Nov 24, 2025 22:20",
    fromCoords: [30.0619, -1.9441],
    destinationCoords: [29.7640, -1.5160],
    currentCoords: [30.0619, -1.9441],
  },
];

export default function App(): JSX.Element {
  const [activeTab, setActiveTab] = useState<"all" | "pending" | "completed">(
    "all"
  );
  const [search, setSearch] = useState("");
  const [showJourneyList, setShowJourneyList] = useState(true);
  const [selectedJourney, setSelectedJourney] = useState<Journey | null>(null);
  const [showLargeMap, setShowLargeMap] = useState(false);
  const [journeys, setJourneys] = useState<Journey[]>(mockJourneys);
  const [passengersJourney, setPassengersJourney] = useState<Journey | null>(null);


  const filteredJourneys = useMemo(() => {
  return journeys.filter((j) => {
    if (activeTab !== "all" && j.status !== activeTab) return false;
    const route = `${j.from} ${j.destination}`.toLowerCase();
    return route.includes(search.toLowerCase());
  });
}, [activeTab, search, journeys]);

  useEffect(() => {
  const interval = setInterval(() => {
    setJourneys((prev) =>
      prev.map((j) => {
        if (j.status !== "pending") return j;

        const progress = Math.min((j.progress ?? 0) + 1, 100);

        // interpolate between from → destination
        const lng =
          j.fromCoords[0] +
          ((j.destinationCoords[0] - j.fromCoords[0]) * progress) / 100;

        const lat =
          j.fromCoords[1] +
          ((j.destinationCoords[1] - j.fromCoords[1]) * progress) / 100;

        return {
          ...j,
          progress,
          currentCoords: [lng, lat],
          lastUpdate: new Date().toLocaleTimeString(),
          status: progress >= 100 ? "completed" : j.status,
        };
      })
    );
  }, 2000); // ⏱ every 2 seconds

  return () => clearInterval(interval);
}, []);

  const stats = {
    total: mockJourneys.length,
    pending: mockJourneys.filter((j) => j.status === "pending").length,
    completed: mockJourneys.filter((j) => j.status === "completed").length,
    totalPassengers: mockJourneys.reduce((acc, j) => acc + j.passengers, 0),
  };

  return (
    <div className="min-h-screen">
      <main className="max-w-full mx-auto ">
        {/* Top: search + tabs */}
<div className="overflow-hidden   bg-white ">
  <div className="">
    <nav className="flex -mb-px">
      <button
        onClick={() => setActiveTab("all")}
        className={`px-6 py-4 border-b-2 text-[14px] transition-colors ${
          activeTab === "all"
            ? "border-blue-800  text-blue-800  font-semibold"
            : "border-transparent text-black hover:text-gray-800 hover:border-gray-300"
        }`}
      >
        All Journeys ({stats.total})
      </button>

      <button
        onClick={() => setActiveTab("pending")}
        className={`px-6 py-4 border-b-2 text-[14px] transition-colors ${
          activeTab === "pending"
            ? "border-blue-800  text-blue-800  font-semibold"
            : "border-transparent text-black hover:text-gray-800 hover:border-gray-300"
        }`}
      >
        Pending ({stats.pending})
      </button>

      <button
        onClick={() => setActiveTab("completed")}
        className={`px-6 py-4 border-b-2 text-[14px] transition-colors ${
          activeTab === "completed"
            ? "border-blue-800  text-blue-800  font-semibold"
            : "border-transparent text-black hover:text-gray-800 hover:border-gray-300"
        }`}
      >
        Completed ({stats.completed})
      </button>
    </nav>
  </div>
</div>


        {/* Main area: cards left, map right */}
{/* Fullscreen Map Area */}
<div className="relative h-[calc(100vh-120px)] w-full overflow-hidden ">
  
  {/* MAP (background layer) */}
  <div className="absolute inset-0 z-0">
    <JourneyMap
      journeys={filteredJourneys}
      selectedJourney={selectedJourney}
      onSelect={(j) => {
        setSelectedJourney(j);
        setPassengersJourney(j); // 🔥 auto-open passengers when bus clicked
      }}
    />

{/* LEFT FLOATING JOURNEY LIST */}
    {/* Hide button */}
    <button
      onClick={() => setShowJourneyList(false)}
      className={`absolute ${showJourneyList == true ?  "block" :"hidden"} left-[353px] top-4 z-30 w-7 h-7 rounded-full bg-blue-800 flex items-center justify-center cursor-pointer hover:bg-blue-700 transition`}>
      <ChevronLeft className="text-white" size={16} />
    </button>
<div
  className={`absolute top-4 bottom-4 z-20 w-[360px] transition-all duration-500 ease-in-out
    ${showJourneyList ? "left-4" : "-left-[380px]"}`}
>
  <div
    className="h-full overflow-y-auto space-y-3 pr-2
    bg-transparent backdrop-blur-xl rounded-xl border p-3 border-white/40
    shadow-lg relative"
  >


    {filteredJourneys.length === 0 ? (
      <div className="p-6 text-center text-gray-700 text-sm">
        No journeys found
      </div>
    ) : (
      filteredJourneys.map((journey) => (
        <div
          key={journey.id}
          onClick={() => {
            setSelectedJourney(journey);
          }}
          className={`cursor-pointer transition-all ${
            selectedJourney?.id === journey.id
              ? "border border-blue-800 shadow-lg"
              : ""
          }`}
        >
          <JourneyCard
            onViewPassengers={() => setPassengersJourney(journey)}
            journey={journey}
          />
        </div>
      ))
    )}
  </div>
</div>
{/* Show journey list button */}
{!showJourneyList && (
  <button
    onClick={() => setShowJourneyList(true)}
    className="absolute left-4 top-6 z-30
    w-9 h-9 rounded-full bg-blue-800 shadow-lg
    flex items-center justify-center cursor-pointer
    hover:bg-blue-700 transition-all duration-300"
  >
    <ChevronRight className="text-white" size={18} />
  </button>
)}
  </div>
        </div>
      </main>

      {/* Large map modal */}
{showLargeMap && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6  transition-opacity duration-200">
    <div className="relative bg-white w-full max-w-6xl h-[85vh] rounded-xl shadow-2xl overflow-hidden">


      <div className="flex h-full ">
        {/* Map Container */}
        <div className="flex-1 relative">
          <JourneyMap
            journeys={filteredJourneys}
            selectedJourney={selectedJourney}
            onSelect={(j) => setSelectedJourney(j)}
          />
        </div>

        {/* Redesigned Details Panel */}
        <div className="w-96 bg-white overflow-hidden flex flex-col">
          <div className="p-6 flex justify-between border-b border-gray-200">
            <div className="">
            <h3 className="text-[16px] font-semibold text-black mb-1">Journey Details</h3>
            <p className="text-[14px] text-gray-500">
              {selectedJourney ? "Active journey information" : "Select a bus marker to view details"}
            </p>
            </div>
          <button
          onClick={() => setShowLargeMap(false)}
          className="w-8 h-8 flex items-center justify-center  text-red-600  transition-all duration-500 text-[20px] font-medium cursor-pointer hover:bg-red-100 rounded-full"
        >
           ×
        </button>
          </div>

          {selectedJourney ? (
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Journey Status Badge */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Current Status</span>
<span
  className={`px-3 py-1 rounded-full text-sm font-medium ${
    selectedJourney.status === "pending"
      ? "bg-blue-100 text-blue-700"
      : selectedJourney.status === "completed"
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700"
  }`}
>
  {selectedJourney.status === "pending"
    ? "Active"
    : selectedJourney.status === "completed"
    ? "Completed"
    : "Cancelled"}
</span>

              </div>

              {/* Main Journey Info */}
              <div className="space-y-5">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-md bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-600 text-sm font-bold">B</span>
                    </div>
                    <h4 className="text-sm font-semibold text-gray-700">Bus Information</h4>
                  </div>
                  <div className="pl-8">
                    <div className="text-2xl font-bold text-blue-900 mb-1">
                      {selectedJourney.busPlate}
                    </div>
                    <div className="text-sm text-gray-500">
                      ID: {selectedJourney.id || 'N/A'}
                    </div>
                  </div>
                </div>

                {/* Route Information */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Route</h4>
                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                        <div className="w-0.5 h-8 bg-blue-300 my-1"></div>
                        <div className="w-3 h-3 rounded-full bg-gray-900"></div>
                      </div>
                      <div className="flex-1">
                        <div className="text-base font-semibold text-gray-900 mb-1">
                          {selectedJourney.from}
                        </div>
                        <div className="text-sm text-gray-400 mb-3">Departure</div>
                        <div className="text-base font-semibold text-gray-900">
                          {selectedJourney.destination}
                        </div>
                        <div className="text-sm text-gray-400">Destination</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="text-sm text-gray-500 mb-1">Passengers</div>
                    <div className="text-2xl font-bold text-gray-900">{selectedJourney.passengers}</div>
                    <div className="text-xs text-gray-400 mt-1">On board</div>
                  </div>
                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="text-sm text-gray-500 mb-1">Progress</div>
                    <div className="text-2xl font-bold text-gray-900">{selectedJourney.progress ?? 0}%</div>
                    <div className="text-xs text-gray-400 mt-1">Journey completed</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Route Progress</span>
                    <span className="font-medium">{selectedJourney.progress ?? 0}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-600 to-blue-800 rounded-full"
                      style={{ width: `${selectedJourney.progress ?? 0}%` }}
                    ></div>
                  </div>
                </div>

                {/* Last Update */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="text-sm text-gray-500 mb-2">Last Update</div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <div className="text-base font-medium text-gray-900">
                      {selectedJourney.lastUpdate ?? "No updates"}
                    </div>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    Updated in real-time
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">Select a Journey</h4>
              <p className="text-sm text-gray-500 max-w-xs">
                Click on any bus marker on the map to view detailed journey information here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
)}

{passengersJourney && (
  <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
    <div className="bg-white w-full max-w-5xl rounded-xl shadow-xl overflow-hidden">
      
      {/* Header */}
      <div className="flex justify-between items-center p-5 ">
        <div>
          <h3 className="text-[16px] font-semibold text-gray-900">
            Passengers : {passengersJourney.from} → {passengersJourney.destination}
          </h3>
        <div className="flex">
          <p className="text-[14px] text-gray-700">
            Bus {passengersJourney.busPlate}
          </p>
          <p className="text-[14px] ml-5 text-gray-700">
            Driver phone : +250793216191
          </p>
          </div>
        </div>
        <button
          onClick={() => setPassengersJourney(null)}
          className="text-2xl text-gray-500 hover:text-red-600"
        >
          ×
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto  p-5">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="">
            <tr className="text-left text-[14px] text-black font-normal">
              <th className="px-4 py-3">Student</th>
              <th className="px-4 py-3">Grade</th>
              <th className="px-4 py-3">Parent Phone</th>
              <th className="px-4 py-3">City</th>
              <th className="px-4 py-3">District</th>
              <th className="px-4 py-3">Health</th>
            </tr>
          </thead>
          <tbody>
            {mockPassengers.map((p) => (
              <tr key={p.id} className="border-t text-sm">
                <td className="px-4 py-3 font-medium text-gray-900">{p.student}</td>
                <td className="px-4 py-3">{p.grade}</td>
                <td className="px-4 py-3">{p.parentPhone}</td>
                <td className="px-4 py-3">{p.city}</td>
                <td className="px-4 py-3">{p.district}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">
                    {p.health}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
)}

    </div>
  );
}
