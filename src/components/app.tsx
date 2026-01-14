import { useState, useEffect } from "react";
import ModernJourneyMap from "./JourneyMap";

export interface ModernJourneyMapProps {
  journeys: Journey[];
  selectedJourney: Journey | null;
  onSelectJourney: (journey: Journey | null) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  alerts: Alert[];
  showAlerts: boolean;
  onToggleAlerts: () => void;
}

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

const mockAlerts: Alert[] = [
  { id: "a1", type: "warning", message: "Heavy traffic on Kigali-Huye route", timestamp: "10:15 AM", priority: "medium" },
  { id: "a2", type: "info", message: "Weather alert: Light rain expected", timestamp: "09:45 AM", priority: "low" },
  { id: "a3", type: "success", message: "All passengers boarded successfully", timestamp: "08:30 AM", priority: "low" },
  { id: "a4", type: "error", message: "Route deviation detected", timestamp: "11:20 AM", priority: "high" },
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

export default function App() {
  const [searchPlate, setSearchPlate] = useState("");
  const [journeys, setJourneys] = useState(mockJourneys);
  const [selectedJourney, setSelectedJourney] = useState<Journey | null>(null);
  const [showAlerts, setShowAlerts] = useState(false);

  /** ⏱️ Simulated live updates */
  useEffect(() => {
    const interval = setInterval(() => {
      setJourneys(prev =>
        prev.map(j => {
          if (j.status !== "pending") return j;
          const progress = Math.min((j.progress ?? 0) + Math.random() * 3, 100);
          
          // Update current coords based on progress
          const newLng = j.fromCoords[0] + ((j.destinationCoords[0] - j.fromCoords[0]) * progress) / 100;
          const newLat = j.fromCoords[1] + ((j.destinationCoords[1] - j.fromCoords[1]) * progress) / 100;
          
          return {
            ...j,
            progress,
            currentCoords: [newLng, newLat] as [number, number],
            status: progress >= 100 ? "completed" : "pending",
            lastUpdate: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit"
            }),
            bus: j.bus ? {
              ...j.bus,
              speed: progress >= 100 ? 0 : Math.max(40, Math.min(80, j.bus.speed + (Math.random() - 0.5) * 10))
            } : undefined
          };
        })
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full w-full overflow-hidden">
      <ModernJourneyMap />
    </div>
  );
}