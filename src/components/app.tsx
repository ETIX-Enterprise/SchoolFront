// App.tsx
import { useMemo, useState, useEffect, useRef } from "react";
import { JourneyMap } from "./JourneyMap";
import { JSX } from "react/jsx-runtime";
import { 
  Search, 
  Filter, 
  Download, 
  Bell, 
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Clock,
  Users,
  MapPin,
  BarChart3,
  Settings,
  X,
  Maximize2,
  Minimize2,
  Eye,
  Printer,
  Mail,
  MessageSquare,
  Share2,
  Calendar,
  Navigation,
  Battery,
  Thermometer,
  Wifi
} from "lucide-react";

export interface Journey {
  id: string;
  busPlate: string;
  from: string;
  destination: string;
  passengers: number;
  departureTime: string;
  arrivalTime?: string;
  status: "pending" | "completed" | "cancelled";
  progress?: number;
  lastUpdate?: string;
  fromCoords: [number, number];
  destinationCoords: [number, number];
  currentCoords?: [number, number];
  driver?: {
    name: string;
    phone: string;
    license: string;
    experience: string;
  };
  bus?: {
    type: string;
    capacity: number;
    year: number;
    fuel: string;
    speed: number;
    temperature: number;
    battery: number;
    connectivity: boolean;
  };
  alerts?: Alert[];
}

export interface Alert {
  id: string;
  type: "warning" | "error" | "info" | "success";
  message: string;
  timestamp: string;
  priority: "low" | "medium" | "high";
}

export interface Passenger {
  id: string;
  student: string;
  grade: string;
  parentPhone: string;
  city: string;
  district: string;
  health: string;
  boardingStatus: "waiting" | "onboard" | "disembarked";
  seatNumber: string;
  emergencyContact?: string;
}

const mockAlerts: Alert[] = [
  { id: "a1", type: "warning", message: "Heavy traffic on Kigali-Huye route", timestamp: "10:15 AM", priority: "medium" },
  { id: "a2", type: "info", message: "Weather alert: Light rain expected", timestamp: "09:45 AM", priority: "low" },
  { id: "a3", type: "success", message: "All passengers boarded successfully", timestamp: "08:30 AM", priority: "low" },
  { id: "a4", type: "error", message: "Route deviation detected", timestamp: "11:20 AM", priority: "high" },
];

export const mockPassengers: Passenger[] = [
  {
    id: "p1",
    student: "Jean Claude",
    grade: "P5",
    parentPhone: "0788123456",
    city: "Kigali",
    district: "Gasabo",
    health: "Good",
    boardingStatus: "onboard",
    seatNumber: "A12",
    emergencyContact: "0788123457"
  },
  {
    id: "p2",
    student: "Aline Uwase",
    grade: "P6",
    parentPhone: "0722456789",
    city: "Kigali",
    district: "Kicukiro",
    health: "Asthma",
    boardingStatus: "onboard",
    seatNumber: "B07",
    emergencyContact: "0722456780"
  },
  {
    id: "p3",
    student: "Eric Niyonzima",
    grade: "S1",
    parentPhone: "0733987654",
    city: "Huye",
    district: "Ngoma",
    health: "Good",
    boardingStatus: "disembarked",
    seatNumber: "C15",
    emergencyContact: "0733987655"
  },
];

const mockJourneys: Journey[] = [
  {
    id: "1",
    busPlate: "ABC-1234",
    from: "Kigali City Center",
    destination: "Huye Campus",
    passengers: 42,
    departureTime: "2025-11-25T08:00:00",
    status: "pending",
    progress: 50,
    lastUpdate: "Nov 25, 2025 10:10",
    fromCoords: [30.0619, -1.9441],
    destinationCoords: [29.7411, -2.5967],
    currentCoords: [29.9015, -2.2704],
    driver: {
      name: "James Uwimana",
      phone: "+250783216191",
      license: "DL-2020-8456",
      experience: "5 years"
    },
    bus: {
      type: "School Bus 2022",
      capacity: 50,
      year: 2022,
      fuel: "Diesel",
      speed: 65,
      temperature: 22,
      battery: 85,
      connectivity: true
    },
    alerts: [mockAlerts[0]]
  },
  {
    id: "2",
    busPlate: "XYZ-5678",
    from: "Kigali International Airport",
    destination: "Nyanza District",
    passengers: 38,
    departureTime: "2025-11-25T09:15:00",
    status: "pending",
    progress: 48,
    lastUpdate: "Nov 25, 2025 10:07",
    fromCoords: [30.1394, -1.9686],
    destinationCoords: [29.7658, -2.3500],
    currentCoords: [29.9526, -2.1593],
    driver: {
      name: "Marie Claire",
      phone: "+250788765432",
      license: "DL-2021-1234",
      experience: "3 years"
    },
    bus: {
      type: "Executive Coach",
      capacity: 40,
      year: 2021,
      fuel: "Electric",
      speed: 70,
      temperature: 24,
      battery: 92,
      connectivity: true
    },
    alerts: [mockAlerts[1]]
  },
  {
    id: "3",
    busPlate: "DEF-9012",
    from: "Kigali Central",
    destination: "Muhanga Town",
    passengers: 45,
    departureTime: "2025-11-25T07:30:00",
    status: "completed",
    progress: 100,
    lastUpdate: "Nov 25, 2025 10:50",
    fromCoords: [30.0619, -1.9441],
    destinationCoords: [29.7400, -2.1083],
    currentCoords: [29.7400, -2.1083],
    driver: {
      name: "Robert Nziza",
      phone: "+250723456789",
      license: "DL-2019-5678",
      experience: "7 years"
    },
    bus: {
      type: "Standard Bus",
      capacity: 50,
      year: 2020,
      fuel: "Petrol",
      speed: 0,
      temperature: 20,
      battery: 78,
      connectivity: true
    }
  },
  {
    id: "4",
    busPlate: "GHI-3456",
    from: "Kigali North",
    destination: "Nyagatare City",
    passengers: 40,
    departureTime: "2025-11-25T10:00:00",
    status: "pending",
    progress: 33,
    lastUpdate: "Nov 25, 2025 10:30",
    fromCoords: [30.0619, -1.9441],
    destinationCoords: [30.3289, -1.2920],
    currentCoords: [30.1954, -1.6180],
    driver: {
      name: "David Kabera",
      phone: "+250784567890",
      license: "DL-2022-3456",
      experience: "2 years"
    },
    bus: {
      type: "Long Distance Bus",
      capacity: 45,
      year: 2023,
      fuel: "Diesel",
      speed: 75,
      temperature: 25,
      battery: 95,
      connectivity: false
    },
    alerts: [mockAlerts[3]]
  },
];

export default function App(): JSX.Element {
  const [activeTab, setActiveTab] = useState<"all" | "pending" | "completed">("all");
  const [search, setSearch] = useState("");
  const [showJourneyList, setShowJourneyList] = useState(true);
  const [selectedJourney, setSelectedJourney] = useState<Journey | null>(mockJourneys[0]);
  const [showLargeMap, setShowLargeMap] = useState(false);
  const [journeys, setJourneys] = useState<Journey[]>(mockJourneys);
  const [passengersJourney, setPassengersJourney] = useState<Journey | null>(null);
  const [showAlerts, setShowAlerts] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string[]>(["pending", "completed"]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [viewMode, setViewMode] = useState<"map" | "list" | "split">("split");
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);

  const filteredJourneys = useMemo(() => {
    return journeys.filter((j) => {
      if (activeTab !== "all" && j.status !== activeTab) return false;
      if (!filterStatus.includes(j.status)) return false;
      
      const searchLower = search.toLowerCase();
      return (
        j.busPlate.toLowerCase().includes(searchLower) ||
        j.from.toLowerCase().includes(searchLower) ||
        j.destination.toLowerCase().includes(searchLower) ||
        j.driver?.name.toLowerCase().includes(searchLower) ||
        false
      );
    });
  }, [activeTab, search, journeys, filterStatus]);

  const stats = useMemo(() => ({
    total: journeys.length,
    pending: journeys.filter((j) => j.status === "pending").length,
    completed: journeys.filter((j) => j.status === "completed").length,
    cancelled: journeys.filter((j) => j.status === "cancelled").length,
    totalPassengers: journeys.reduce((acc, j) => acc + j.passengers, 0),
    averageProgress: Math.round(journeys.reduce((acc, j) => acc + (j.progress || 0), 0) / journeys.length),
    activeAlerts: mockAlerts.length,
  }), [journeys]);

  useEffect(() => {
    const interval = setInterval(() => {
      setJourneys((prev) =>
        prev.map((j) => {
          if (j.status !== "pending") return j;

          const increment = Math.random() * 3 + 1; // Random progress between 1-4%
          const progress = Math.min((j.progress ?? 0) + increment, 100);

          // interpolate between from → destination
          const lng = j.fromCoords[0] + ((j.destinationCoords[0] - j.fromCoords[0]) * progress) / 100;
          const lat = j.fromCoords[1] + ((j.destinationCoords[1] - j.fromCoords[1]) * progress) / 100;

          // Randomly update bus metrics
          const speed = progress < 100 ? Math.floor(Math.random() * 30) + 50 : 0;
          const temperature = 20 + Math.floor(Math.random() * 8);
          const battery = Math.max(30, (j.bus?.battery || 100) - Math.random() * 0.5);

          return {
            ...j,
            progress: parseFloat(progress.toFixed(1)),
            currentCoords: [lng, lat],
            lastUpdate: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: progress >= 100 ? "completed" : j.status,
            bus: j.bus ? {
              ...j.bus,
              speed,
              temperature,
              battery: parseFloat(battery.toFixed(1)),
              connectivity: Math.random() > 0.1 // 90% chance of connectivity
            } : j.bus
          };
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const handleExportData = () => {
    // Export functionality
    console.log("Exporting data...");
  };

  const handleSendNotification = () => {
    // Notification functionality
    console.log("Sending notification...");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                <Navigation className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">BusTrack Pro</h1>
                <p className="text-sm text-gray-500">Real-time School Bus Monitoring System</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-6 ml-8">
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowAnalytics(!showAnalytics)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              title="Analytics"
            >
              <BarChart3 className="w-5 h-5 text-gray-600" />
            </button>
            
            <button 
              onClick={handleRefresh}
              className={`p-2 rounded-lg hover:bg-gray-100 transition-colors ${isRefreshing ? 'animate-spin' : ''}`}
              title="Refresh Data"
            >
              <RefreshCw className="w-5 h-5 text-gray-600" />
            </button>
            
            <button 
              onClick={() => setShowAlerts(!showAlerts)}
              className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
              title="Alerts"
            >
              <Bell className="w-5 h-5 text-gray-600" />
              {stats.activeAlerts > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {stats.activeAlerts}
                </span>
              )}
            </button>
            
            <button 
              onClick={handleExportData}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              title="Export Data"
            >
              <Download className="w-5 h-5 text-gray-600" />
            </button>
            
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
            
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center text-white font-semibold">
              OP
            </div>
          </div>
        </div>
      </header>

      {/* Analytics Dashboard */}
      {showAnalytics && (
        <div className="px-6 py-4 bg-white border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-700 font-medium">Active Journeys</p>
                  <p className="text-2xl font-bold text-blue-900">{stats.pending}</p>
                </div>
                <Navigation className="w-8 h-8 text-blue-600 opacity-50" />
              </div>
              <div className="mt-2">
                <div className="h-2 bg-blue-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-600 rounded-full"
                    style={{ width: `${(stats.pending / stats.total) * 100}%` }}
                  />
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-700 font-medium">Passengers Today</p>
                  <p className="text-2xl font-bold text-green-900">{stats.totalPassengers}</p>
                </div>
                <Users className="w-8 h-8 text-green-600 opacity-50" />
              </div>
              <div className="mt-2 text-xs text-green-600">+12% from yesterday</div>
            </div>
            
            <div className="bg-gradient-to-r from-amber-50 to-amber-100 p-4 rounded-xl border border-amber-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-amber-700 font-medium">Avg. Progress</p>
                  <p className="text-2xl font-bold text-amber-900">{stats.averageProgress}%</p>
                </div>
                <BarChart3 className="w-8 h-8 text-amber-600 opacity-50" />
              </div>
              <div className="mt-2 text-xs text-amber-600">On schedule</div>
            </div>
            
            <div className="bg-gradient-to-r from-red-50 to-red-100 p-4 rounded-xl border border-red-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-red-700 font-medium">Active Alerts</p>
                  <p className="text-2xl font-bold text-red-900">{stats.activeAlerts}</p>
                </div>
                <AlertCircle className="w-8 h-8 text-red-600 opacity-50" />
              </div>
              <div className="mt-2 text-xs text-red-600">1 high priority</div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1">
        {/* Control Bar */}
        <div className="px-6 py-4 bg-white/80 backdrop-blur-sm border-b border-gray-200">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex items-center gap-4 w-full lg:w-auto">
              {/* Search */}
              <div className="relative flex-1 lg:flex-initial lg:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by bus plate, route, driver..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>

              {/* Filter Button */}
              <div className="relative">
                <button 
                  onClick={() => {/* Implement filter modal */}}
                  className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Filter className="w-5 h-5 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">Filter</span>
                </button>
              </div>

              {/* View Mode Selector */}
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                {[
                  { key: 'map', icon: MapPin, label: 'Map' },
                  { key: 'split', icon: BarChart3, label: 'Split' },
                  { key: 'list', icon: List, label: 'List' }
                ].map((mode) => (
                  <button
                    key={mode.key}
                    onClick={() => setViewMode(mode.key as any)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                      viewMode === mode.key 
                        ? 'bg-white shadow-sm text-blue-600' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <mode.icon className="w-4 h-4" />
                    <span>{mode.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Status Filters */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 font-medium">Status:</span>
              {['pending', 'completed', 'cancelled'].map((status) => (
                <button
                  key={status}
                  onClick={() => {
                    if (filterStatus.includes(status)) {
                      setFilterStatus(filterStatus.filter(s => s !== status));
                    } else {
                      setFilterStatus([...filterStatus, status]);
                    }
                  }}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    filterStatus.includes(status)
                      ? status === 'pending' 
                        ? 'bg-blue-100 text-blue-700 border border-blue-300'
                        : status === 'completed'
                        ? 'bg-green-100 text-green-700 border border-green-300'
                        : 'bg-red-100 text-red-700 border border-red-300'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border-b border-gray-200 px-6">
          <nav className="flex space-x-8">
            {[
              { key: 'all', label: 'All Journeys', count: stats.total },
              { key: 'pending', label: 'Active', count: stats.pending },
              { key: 'completed', label: 'Completed', count: stats.completed }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`py-4 px-1 border-b-2 text-sm font-medium transition-colors relative ${
                  activeTab === tab.key
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${
                  activeTab === tab.key
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {tab.count}
                </span>
                {activeTab === tab.key && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full" />
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="relative h-[calc(100vh-220px)]">
          {/* Alerts Panel */}
          {showAlerts && (
            <div className="absolute top-4 right-4 z-40 w-96 max-h-[calc(100vh-250px)] bg-white/95 backdrop-blur-sm rounded-xl border border-gray-200 shadow-xl overflow-hidden">
              <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    <h3 className="font-semibold text-gray-900">Active Alerts</h3>
                  </div>
                  <button
                    onClick={() => setShowAlerts(false)}
                    className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>
              <div className="overflow-y-auto max-h-[calc(100vh-300px)]">
                {mockAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                      alert.priority === 'high' ? 'bg-red-50/50' : ''
                    }`}
                    onClick={() => setSelectedAlert(alert)}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`mt-0.5 ${
                        alert.type === 'error' ? 'text-red-500' :
                        alert.type === 'warning' ? 'text-amber-500' :
                        alert.type === 'success' ? 'text-green-500' : 'text-blue-500'
                      }`}>
                        {alert.type === 'error' ? <AlertCircle className="w-5 h-5" /> :
                         alert.type === 'warning' ? <AlertCircle className="w-5 h-5" /> :
                         <CheckCircle className="w-5 h-5" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500">{alert.timestamp}</span>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            alert.priority === 'high' ? 'bg-red-100 text-red-700' :
                            alert.priority === 'medium' ? 'bg-amber-100 text-amber-700' :
                            'bg-blue-100 text-blue-700'
                          }`}>
                            {alert.priority} priority
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Journey List Panel */}
          <div className={`absolute top-0 bottom-0 z-30 transition-all duration-500 ease-in-out ${
            viewMode === 'map' ? '-left-full' :
            viewMode === 'split' ? 'left-0 w-96' :
            'left-0 right-0'
          }`}>
            <div className="h-full bg-white border-r border-gray-200 shadow-lg">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Journeys</h2>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleRefresh}
                      className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <RefreshCw className={`w-4 h-4 text-gray-600 ${isRefreshing ? 'animate-spin' : ''}`} />
                    </button>
                    <button
                      onClick={handleExportData}
                      className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Download className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="h-[calc(100%-73px)] overflow-y-auto">
                {filteredJourneys.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full p-8">
                    <Search className="w-12 h-12 text-gray-300 mb-4" />
                    <p className="text-gray-500 text-center">No journeys found</p>
                    <p className="text-sm text-gray-400 mt-1">Try adjusting your filters or search</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {filteredJourneys.map((journey) => (
                      <div
                        key={journey.id}
                        onClick={() => setSelectedJourney(journey)}
                        className={`p-4 cursor-pointer transition-all hover:bg-gray-50 ${
                          selectedJourney?.id === journey.id ? 'bg-blue-50 border-r-2 border-blue-600' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-lg font-bold text-gray-900">{journey.busPlate}</span>
                              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                journey.status === 'pending' ? 'bg-blue-100 text-blue-700' :
                                journey.status === 'completed' ? 'bg-green-100 text-green-700' :
                                'bg-red-100 text-red-700'
                              }`}>
                                {journey.status}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{journey.from} → {journey.destination}</p>
                          </div>
                          {journey.alerts && journey.alerts.length > 0 && (
                            <AlertCircle className="w-5 h-5 text-red-500" />
                          )}
                        </div>
                        
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-600">{journey.passengers} passengers</span>
                            </div>
                            {journey.bus && (
                              <div className="flex items-center gap-1">
                                <Battery className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-600">{journey.bus.battery}%</span>
                              </div>
                            )}
                          </div>
                          
                          <div className="text-right">
                            <div className="text-xs text-gray-500">Last update</div>
                            <div className="text-sm font-medium text-gray-700">{journey.lastUpdate}</div>
                          </div>
                        </div>
                        
                        <div className="mt-3">
                          <div className="flex justify-between text-xs text-gray-500 mb-1">
                            <span>Progress</span>
                            <span>{journey.progress}%</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${
                                journey.status === 'pending' ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                                journey.status === 'completed' ? 'bg-gradient-to-r from-green-500 to-green-600' :
                                'bg-gradient-to-r from-red-500 to-red-600'
                              }`}
                              style={{ width: `${journey.progress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Map Area */}
          <div className={`absolute top-0 bottom-0 transition-all duration-500 ease-in-out ${
            viewMode === 'list' ? 'left-full' :
            viewMode === 'split' ? 'left-96 right-0' :
            'left-0 right-0'
          }`}>
            <div className="relative h-full bg-gray-100">
              <JourneyMap
                journeys={filteredJourneys}
                selectedJourney={selectedJourney}
                onSelect={(j) => {
                  setSelectedJourney(j);
                  setPassengersJourney(j);
                }}
              />
              
              {/* Map Controls */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <button
                  onClick={() => setShowLargeMap(!showLargeMap)}
                  className="p-2 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
                  title="Fullscreen"
                >
                  {showLargeMap ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
                </button>
                <button
                  onClick={() => window.open(`https://www.google.com/maps?q=${selectedJourney?.currentCoords?.[1]},${selectedJourney?.currentCoords?.[0]}`, '_blank')}
                  className="p-2 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
                  title="Open in Google Maps"
                >
                  <Navigation className="w-5 h-5" />
                </button>
              </div>
              
              {/* Selected Journey Info Overlay */}
              {selectedJourney && (
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl border border-gray-200 shadow-xl p-4 max-w-md">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-gray-900">{selectedJourney.busPlate}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          selectedJourney.status === 'pending' ? 'bg-blue-100 text-blue-700' :
                          selectedJourney.status === 'completed' ? 'bg-green-100 text-green-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {selectedJourney.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{selectedJourney.from} → {selectedJourney.destination}</p>
                    </div>
                    <button
                      onClick={() => setSelectedJourney(null)}
                      className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="bg-gray-50 p-2 rounded-lg">
                      <div className="text-xs text-gray-500">Driver</div>
                      <div className="text-sm font-medium text-gray-900">{selectedJourney.driver?.name}</div>
                    </div>
                    <div className="bg-gray-50 p-2 rounded-lg">
                      <div className="text-xs text-gray-500">Speed</div>
                      <div className="text-sm font-medium text-gray-900">{selectedJourney.bus?.speed || 0} km/h</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPassengersJourney(selectedJourney)}
                      className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      View Passengers
                    </button>
                    <button
                      onClick={() => window.location.href = `tel:${selectedJourney.driver?.phone}`}
                      className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                    >
                      Call Driver
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      {/* Large Map Modal */}
      {showLargeMap && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6 transition-opacity duration-200">
          <div className="relative bg-white w-full max-w-7xl h-[90vh] rounded-2xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 z-10 bg-white/95 backdrop-blur-sm border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Navigation className="w-6 h-6 text-blue-600" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Fullscreen Map View</h3>
                    <p className="text-sm text-gray-500">Real-time bus tracking visualization</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Printer className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Share2 className="w-5 h-5 text-gray-600" />
                  </button>
                  <button
                    onClick={() => setShowLargeMap(false)}
                    className="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex h-full pt-16">
              {/* Map Container */}
              <div className="flex-1 relative">
                <JourneyMap
                  journeys={filteredJourneys}
                  selectedJourney={selectedJourney}
                  onSelect={(j) => setSelectedJourney(j)}
                />
              </div>

              {/* Side Panel */}
              <div className="w-96 bg-white border-l border-gray-200 overflow-hidden flex flex-col">
                {selectedJourney ? (
                  <>
                    <div className="p-6 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">Bus Details</h3>
                          <p className="text-sm text-gray-500">ID: {selectedJourney.id}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          selectedJourney.status === 'pending' ? 'bg-blue-100 text-blue-700' :
                          selectedJourney.status === 'completed' ? 'bg-green-100 text-green-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {selectedJourney.status}
                        </span>
                      </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6">
                      {/* Bus Metrics */}
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-gray-700 mb-4">Bus Metrics</h4>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="flex items-center gap-2 mb-1">
                              <Battery className="w-4 h-4 text-gray-500" />
                              <span className="text-xs text-gray-500">Battery</span>
                            </div>
                            <div className="text-lg font-bold text-gray-900">{selectedJourney.bus?.battery}%</div>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="flex items-center gap-2 mb-1">
                              <Thermometer className="w-4 h-4 text-gray-500" />
                              <span className="text-xs text-gray-500">Temperature</span>
                            </div>
                            <div className="text-lg font-bold text-gray-900">{selectedJourney.bus?.temperature}°C</div>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="flex items-center gap-2 mb-1">
                              <Navigation className="w-4 h-4 text-gray-500" />
                              <span className="text-xs text-gray-500">Speed</span>
                            </div>
                            <div className="text-lg font-bold text-gray-900">{selectedJourney.bus?.speed} km/h</div>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="flex items-center gap-2 mb-1">
                              <Wifi className="w-4 h-4 text-gray-500" />
                              <span className="text-xs text-gray-500">Connectivity</span>
                            </div>
                            <div className={`text-lg font-bold ${
                              selectedJourney.bus?.connectivity ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {selectedJourney.bus?.connectivity ? 'Online' : 'Offline'}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Progress */}
                      <div className="mb-6">
                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                          <span>Route Progress</span>
                          <span className="font-medium">{selectedJourney.progress ?? 0}%</span>
                        </div>
                        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 rounded-full"
                            style={{ width: `${selectedJourney.progress ?? 0}%` }}
                          />
                        </div>
                      </div>

                      {/* Driver Info */}
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-gray-700 mb-3">Driver Information</h4>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <span className="text-blue-600 font-bold">DU</span>
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{selectedJourney.driver?.name}</div>
                              <div className="text-sm text-gray-500">{selectedJourney.driver?.phone}</div>
                              <div className="text-xs text-gray-400 mt-1">License: {selectedJourney.driver?.license}</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="space-y-3">
                        <button
                          onClick={() => {
                            setPassengersJourney(selectedJourney);
                            setShowLargeMap(false);
                          }}
                          className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        >
                          View All Passengers
                        </button>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            onClick={() => window.location.href = `tel:${selectedJourney.driver?.phone}`}
                            className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                          >
                            Call Driver
                          </button>
                          <button
                            onClick={() => window.location.href = `sms:${selectedJourney.driver?.phone}`}
                            className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                          >
                            Send SMS
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                    <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mb-6">
                      <Navigation className="w-10 h-10 text-blue-400" />
                    </div>
                    <h4 className="text-xl font-medium text-gray-900 mb-2">Select a Bus</h4>
                    <p className="text-sm text-gray-500 max-w-xs">
                      Click on any bus marker on the map to view detailed information here.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Passengers Modal */}
      {passengersJourney && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-6xl rounded-2xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-1">Passenger Manifest</h3>
                  <div className="flex items-center gap-4 text-blue-100">
                    <span>Route: {passengersJourney.from} → {passengersJourney.destination}</span>
                    <span>•</span>
                    <span>Bus: {passengersJourney.busPlate}</span>
                    <span>•</span>
                    <span>Driver: {passengersJourney.driver?.name}</span>
                  </div>
                </div>
                <button
                  onClick={() => setPassengersJourney(null)}
                  className="p-2 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Stats Bar */}
            <div className="bg-white border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div>
                    <div className="text-sm text-gray-500">Total Passengers</div>
                    <div className="text-2xl font-bold text-gray-900">{passengersJourney.passengers}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">On Board</div>
                    <div className="text-2xl font-bold text-green-600">
                      {mockPassengers.filter(p => p.boardingStatus === 'onboard').length}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Disembarked</div>
                    <div className="text-2xl font-bold text-blue-600">
                      {mockPassengers.filter(p => p.boardingStatus === 'disembarked').length}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium flex items-center gap-2">
                    <Printer className="w-4 h-4" />
                    Print
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Export
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Notify Parents
                  </button>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto p-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-left text-sm text-gray-700 font-semibold">
                    <th className="p-3 border-b">Student</th>
                    <th className="p-3 border-b">Grade</th>
                    <th className="p-3 border-b">Contact</th>
                    <th className="p-3 border-b">Location</th>
                    <th className="p-3 border-b">Health Status</th>
                    <th className="p-3 border-b">Boarding</th>
                    <th className="p-3 border-b">Seat</th>
                    <th className="p-3 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockPassengers.map((p) => (
                    <tr key={p.id} className="border-b hover:bg-gray-50 transition-colors">
                      <td className="p-3">
                        <div className="font-medium text-gray-900">{p.student}</div>
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">{p.grade}</span>
                      </td>
                      <td className="p-3">
                        <div className="space-y-1">
                          <div className="text-sm">{p.parentPhone}</div>
                          <div className="text-xs text-gray-500">{p.emergencyContact}</div>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="text-sm">
                          <div>{p.city}</div>
                          <div className="text-gray-500">{p.district}</div>
                        </div>
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          p.health === 'Good' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {p.health}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          p.boardingStatus === 'onboard' ? 'bg-green-100 text-green-700' :
                          p.boardingStatus === 'waiting' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {p.boardingStatus}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-sm font-medium">{p.seatNumber}</span>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => window.location.href = `tel:${p.parentPhone}`}
                            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Call Parent"
                          >
                            <MessageSquare className="w-4 h-4 text-gray-600" />
                          </button>
                          <button
                            onClick={() => window.location.href = `mailto:parent@school.com`}
                            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Email"
                          >
                            <Mail className="w-4 h-4 text-gray-600" />
                          </button>
                          <button
                            onClick={() => setSelectedJourney(null)}
                            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Alert Detail Modal */}
      {selectedAlert && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden">
            <div className={`p-6 ${
              selectedAlert.type === 'error' ? 'bg-red-50 border-b border-red-200' :
              selectedAlert.type === 'warning' ? 'bg-amber-50 border-b border-amber-200' :
              selectedAlert.type === 'success' ? 'bg-green-50 border-b border-green-200' :
              'bg-blue-50 border-b border-blue-200'
            }`}>
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  selectedAlert.type === 'error' ? 'bg-red-100 text-red-600' :
                  selectedAlert.type === 'warning' ? 'bg-amber-100 text-amber-600' :
                  selectedAlert.type === 'success' ? 'bg-green-100 text-green-600' :
                  'bg-blue-100 text-blue-600'
                }`}>
                  <AlertCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Alert Details</h3>
                  <p className="text-sm text-gray-600">Priority: {selectedAlert.priority}</p>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Message</h4>
                <p className="text-gray-900">{selectedAlert.message}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Type</h4>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    selectedAlert.type === 'error' ? 'bg-red-100 text-red-700' :
                    selectedAlert.type === 'warning' ? 'bg-amber-100 text-amber-700' :
                    selectedAlert.type === 'success' ? 'bg-green-100 text-green-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {selectedAlert.type}
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Time</h4>
                  <p className="text-gray-900">{selectedAlert.timestamp}</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedAlert(null)}
                  className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Dismiss
                </button>
                <button className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Take Action
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper component for list view icon
function List(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  );
}