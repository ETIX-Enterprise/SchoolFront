import React, { useEffect, useState, useRef, useMemo } from "react";
import Map, {
  Marker,
  Source,
  Layer,
  Popup,
  NavigationControl,
  MapRef
} from "react-map-gl/mapbox";
import type { ViewState } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import {
  Navigation,
  Users,
  X,
  Layers,
  Maximize2,
  Clock,
  Bus,
  BusFront,
  BarChart3,
  Search,
  AlertCircle,
  TrendingUp,
  Activity
} from "lucide-react";

interface BusInfo {
  speed: number;
  temperature: number;
  battery: number;
  connectivity: boolean;
}

interface DriverInfo {
  name: string;
  phone: string;
}

interface Journey {
  id: string;
  label: string;
  busPlate: string;
  from: string;
  destination: string;
  fromCoords: [number, number];
  destinationCoords: [number, number];
  currentCoords: [number, number];
  status: "pending" | "completed" | "cancelled";
  progress: number;
  passengers: number;
  passengersList?: string[];
  lastUpdate: string;
  bus: BusInfo;
  driver: DriverInfo;
  alerts: string[];
  startedAt?: string;
  expectedArrival?: string;
  school?: string;
  isDelayed?: boolean;
}

const toRad = (deg: number) => (deg * Math.PI) / 180;
const haversineKm = (lng1: number, lat1: number, lng2: number, lat2: number) => {
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const interpCoord = (from: [number, number], to: [number, number], t: number): [number, number] => [
  lerp(from[0], to[0], t),
  lerp(from[1], to[1], t)
];

const getBearing = (from: [number, number], to: [number, number]) => {
  const y = Math.sin(toRad(to[0] - from[0])) * Math.cos(toRad(to[1]));
  const x =
    Math.cos(toRad(from[1])) * Math.sin(toRad(to[1])) -
    Math.sin(toRad(from[1])) * Math.cos(toRad(to[1])) * Math.cos(toRad(to[0] - from[0]));
  const brng = (Math.atan2(y, x) * 180) / Math.PI;
  return (brng + 360) % 360;
};

const schools = ["Green Valley School", "Mountain View Academy", "Lake Side College", "Central High School"];

const seedJourneys = (): Journey[] => {
  const raw: Journey[] = [
    {
      id: "J-04",
      label: "4 - Huye → Butare (Huye Town)",
      busPlate: "RAB 104 D",
      from: "Huye",
      destination: "Cyangugu (via Rusizi)",
      fromCoords: [29.7429, -2.5967],
      destinationCoords: [29.0639, -2.4906],
      currentCoords: [29.4, -2.55],
      status: "pending",
      progress: 22,
      passengers: 51,
      lastUpdate: "5 min ago",
      bus: { speed: 55, temperature: 27, battery: 60, connectivity: true },
      driver: { name: "Jean", phone: "+250788100004" },
      alerts: ["Long distance route"],
      school: schools[0]
    },
    {
      id: "J-05",
      label: "5 - Rubavu → Musanze",
      busPlate: "RAB 105 E",
      from: "Rubavu (Gisenyi)",
      destination: "Musanze",
      fromCoords: [29.2567, -1.7033],
      destinationCoords: [29.6344, -1.5033],
      currentCoords: [29.45, -1.62],
      status: "pending",
      progress: 34,
      passengers: 26,
      lastUpdate: "7 min ago",
      bus: { speed: 48, temperature: 22, battery: 70, connectivity: true },
      driver: { name: "Denise", phone: "+250788100005" },
      alerts: [],
      school: schools[1],
      isDelayed: true
    },
    {
      id: "J-06",
      label: "6 - Nyagatare → Rwamagana",
      busPlate: "RAB 106 F",
      from: "Nyagatare",
      destination: "Rwamagana",
      fromCoords: [30.3261, -1.2854],
      destinationCoords: [30.4340, -1.9500],
      currentCoords: [30.38, -1.6],
      status: "pending",
      progress: 12,
      passengers: 19,
      lastUpdate: "10 min ago",
      bus: { speed: 38, temperature: 26, battery: 65, connectivity: true },
      driver: { name: "Herve", phone: "+250788100006" },
      alerts: [],
      school: schools[2]
    },
    {
      id: "J-07",
      label: "7 - Rusizi → Cyangugu",
      busPlate: "RAB 107 G",
      from: "Rusizi",
      destination: "Cyangugu",
      fromCoords: [29.0639, -2.4906],
      destinationCoords: [29.08, -2.48],
      currentCoords: [29.07, -2.485],
      status: "pending",
      progress: 80,
      passengers: 22,
      lastUpdate: "Now",
      bus: { speed: 60, temperature: 24, battery: 88, connectivity: true },
      driver: { name: "Immaculee", phone: "+250788100007" },
      alerts: [],
      school: schools[3]
    },
    {
      id: "J-08",
      label: "8 - Gicumbi → Byumba",
      busPlate: "RAB 108 H",
      from: "Gicumbi",
      destination: "Byumba",
      fromCoords: [30.024, -1.545],
      destinationCoords: [30.052, -1.470],
      currentCoords: [30.04, -1.51],
      status: "pending",
      progress: 50,
      passengers: 16,
      lastUpdate: "3 min ago",
      bus: { speed: 33, temperature: 23, battery: 82, connectivity: true },
      driver: { name: "Olivier", phone: "+250788100008" },
      alerts: [],
      school: schools[0]
    },
    {
      id: "J-09",
      label: "9 - Ruhango → Nyanza",
      busPlate: "RAB 109 I",
      from: "Ruhango",
      destination: "Nyanza",
      fromCoords: [29.756, -2.178],
      destinationCoords: [29.761, -2.349],
      currentCoords: [29.758, -2.26],
      status: "pending",
      progress: 68,
      passengers: 29,
      lastUpdate: "4 min ago",
      bus: { speed: 42, temperature: 24, battery: 77, connectivity: true },
      driver: { name: "Sandra", phone: "+250788100009" },
      alerts: [],
      school: schools[1]
    },
    {
      id: "J-10",
      label: "10 - Kibuye → Karongi",
      busPlate: "RAB 110 J",
      from: "Kibuye",
      destination: "Karongi",
      fromCoords: [29.164, -2.066],
      destinationCoords: [29.148, -1.993],
      currentCoords: [29.155, -2.03],
      status: "pending",
      progress: 55,
      passengers: 31,
      lastUpdate: "2 min ago",
      bus: { speed: 44, temperature: 25, battery: 15, connectivity: true },
      driver: { name: "Fabrice", phone: "+250788100010" },
      alerts: ["Low battery"],
      school: schools[2]
    }
  ];

  return raw.map((j) => {
    const pl: string[] = [];
    for (let i = 1; i <= Math.min(j.passengers, 10); i++) {
      pl.push(`P-${j.id}-${i} (seat ${i})`);
    }

    const distKm = haversineKm(
      j.fromCoords[0],
      j.fromCoords[1],
      j.destinationCoords[0],
      j.destinationCoords[1]
    );

    const speed = Math.max(j.bus.speed || 40, 30);
    const hoursTotal = Math.max(distKm / speed, 0.5);
    const now = Date.now();

    const elapsedMs = (j.progress / 100) * hoursTotal * 3600 * 1000;
    const startedAtTs = now - elapsedMs;
    const expectedArrivalTs = startedAtTs + hoursTotal * 3600 * 1000;

    return {
      ...j,
      passengersList: pl,
      startedAt: new Date(startedAtTs).toISOString(),
      expectedArrival: new Date(expectedArrivalTs).toISOString()
    } as Journey;
  });
};

const schoolColors: Record<string, string> = {
  "Green Valley School": "#10b981",
  "Mountain View Academy": "#3b82f6",
  "Lake Side College": "#8b5cf6",
  "Central High School": "#f59e0b"
};

export default function ModernJourneyMap() {
  const [journeys, setJourneys] = useState<Journey[]>(() => seedJourneys());
  const [selectedJourney, setSelectedJourney] = useState<Journey | null>(null);
  const [popupInfo, setPopupInfo] = useState<Journey | null>(null);
  const [passengerViewFor, setPassengerViewFor] = useState<Journey | null>(null);
  const [sortBy, setSortBy] = useState<"progress" | "passengers" | "eta">("progress");
  const [viewState, setViewState] = useState<ViewState>({
    longitude: 30.0619,
    latitude: -1.9441,
    zoom: 8.2,
    pitch: 30,
    bearing: 0,
    padding: { top: 0, bottom: 0, left: 0, right: 0 }
  });
  const [showSidebar, setShowSidebar] = useState<boolean>(true);
  const [notification, setNotification] = useState<string | null>(null);
  const mapRef = useRef<MapRef | null>(null);

  const MAPBOX_TOKEN = "pk.eyJ1IjoiYWxwZS0wMSIsImEiOiJjbWU1eXJsMG0wYjJ0MmxyMXozdGh2ZDQ4In0.zMIyCFmNk8F8JhGx4G9jSA";

  const stats = useMemo(() => {
    const active = journeys.filter(j => j.status === "pending").length;
    const completed = journeys.filter(j => j.status === "completed").length;
    const avgSpeed = journeys.reduce((sum, j) => sum + j.bus.speed, 0) / journeys.length;
    const delayed = journeys.filter(j => j.isDelayed).length;
    return { active, completed, avgSpeed: Math.round(avgSpeed), delayed };
  }, [journeys]);

  const routeFeatures = useMemo(
    () => ({
      type: "FeatureCollection" as const,
      features: journeys.map((j) => ({
        type: "Feature" as const,
        properties: {
          id: j.id,
          isSelected: selectedJourney?.id === j.id,
          label: j.label,
          progress: j.progress,
          school: j.school || "default",
          isDelayed: j.isDelayed || false
        },
        geometry: {
          type: "LineString" as const,
          coordinates: [j.fromCoords, j.destinationCoords]
        }
      }))
    }),
    [journeys, selectedJourney]
  );

  const fitBounds = (): void => {
    if (!mapRef.current) return;
    try {
      const bounds = new (window as any).mapboxgl.LngLatBounds();
      journeys.forEach((j) => {
        bounds.extend(j.fromCoords as any);
        bounds.extend(j.destinationCoords as any);
        bounds.extend(j.currentCoords as any);
      });
      mapRef.current.fitBounds(bounds, { padding: 120, duration: 1000, maxZoom: 8 });
    } catch (e) {
      console.error("Fit bounds error:", e);
    }
  };

  useEffect(() => {
    const TICK_SEC = 2;
    const interval = setInterval(() => {
      setJourneys((prev) =>
        prev.map((j) => {
          if (j.status !== "pending") return j;

          const totalDist = haversineKm(j.fromCoords[0], j.fromCoords[1], j.destinationCoords[0], j.destinationCoords[1]);
          if (totalDist <= 0.01) {
            return { ...j, progress: 100, currentCoords: j.destinationCoords, status: "completed", lastUpdate: "arrived" };
          }

          const remainingKm = haversineKm(j.currentCoords[0], j.currentCoords[1], j.destinationCoords[0], j.destinationCoords[1]);
          const kmPerTick = Math.max(j.bus.speed, 30) * (TICK_SEC / 3600);
          const traveledFromStart = haversineKm(j.fromCoords[0], j.fromCoords[1], j.currentCoords[0], j.currentCoords[1]);
          const newTraveled = Math.min(traveledFromStart + kmPerTick, totalDist);
          const t = totalDist > 0 ? newTraveled / totalDist : 1;
          const newCoords = interpCoord(j.fromCoords, j.destinationCoords, t);

          const newProgress = Math.min(100, Math.round(t * 100));
          const updated: Journey = {
            ...j,
            currentCoords: newCoords,
            progress: newProgress,
            lastUpdate: `${TICK_SEC}s ago`
          };

          if (remainingKm <= 0.05 || newProgress >= 100) {
            updated.progress = 100;
            updated.status = "completed";
            updated.lastUpdate = "arrived";
            updated.currentCoords = j.destinationCoords;
            setNotification(`🎉 ${j.busPlate} has arrived at ${j.destination}`);
            setTimeout(() => setNotification(null), 5000);
          } else {
            const distRemainingKm = haversineKm(newCoords[0], newCoords[1], j.destinationCoords[0], j.destinationCoords[1]);
            const etaMs = (distRemainingKm / Math.max(j.bus.speed, 30)) * 3600 * 1000;
            updated.expectedArrival = new Date(Date.now() + etaMs).toISOString();
            
            if (j.bus.battery < 20 && !notification) {
              setNotification(`⚠️ ${j.busPlate} has low battery (${j.bus.battery}%)`);
              setTimeout(() => setNotification(null), 5000);
            }
          }
          return updated;
        })
      );
    }, TICK_SEC * 1000);

    return () => clearInterval(interval);
  }, [notification]);

  const fmtTime = (iso?: string) => {
    if (!iso) return "-";
    const d = new Date(iso);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const sortedJourneys = useMemo(() => {
    return [...journeys].sort((a, b) => {
      if (sortBy === "progress") return b.progress - a.progress;
      if (sortBy === "passengers") return b.passengers - a.passengers;
      if (sortBy === "eta") {
        const aEta = a.expectedArrival ? new Date(a.expectedArrival).getTime() : 0;
        const bEta = b.expectedArrival ? new Date(b.expectedArrival).getTime() : 0;
        return aEta - bEta;
      }
      return 0;
    });
  }, [journeys, sortBy]);

  const BusMarker: React.FC<{ journey: Journey }> = ({ journey }) => {
    const bearing = getBearing(journey.fromCoords, journey.destinationCoords);
    const statusColor = journey.status === "pending" ? "#22C55E" : journey.status === "completed" ? "#9CA3AF" : "#EF4444";
    const isLowBattery = journey.bus.battery < 20;
    const schoolColor = schoolColors[journey.school || ""] || "#3b82f6";

    return (
      <div
        onClick={(e) => {
          e.stopPropagation();
          setPopupInfo(journey);
        }}
        className="relative w-14 h-14 cursor-pointer transition-transform hover:scale-110"
        style={{
          transform: `rotate(${bearing}deg)`,
          transition: 'transform 2s linear'
        }}
      >
        {journey.isDelayed && (
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center z-10 animate-pulse"
               style={{ transform: `rotate(-${bearing}deg)` }}>
            <AlertCircle className="w-4 h-4 text-white" />
          </div>
        )}
        
        {isLowBattery && (
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full animate-pulse z-10"
               style={{ transform: `rotate(-${bearing}deg)` }} />
        )}

        <div 
          className="absolute inset-0 rounded-full"
          style={{ 
            boxShadow: journey.isDelayed 
              ? `0 0 0 3px #ef4444, 0 0 20px 6px rgba(239, 68, 68, 0.4)`
              : `0 0 0 3px ${schoolColor}`,
            transition: 'box-shadow 0.3s ease'
          }}
        >
          {journey.status === "pending" && (
            <span 
              className="absolute w-full h-full rounded-full animate-ping opacity-30" 
              style={{ background: schoolColor }} 
            />
          )}
        </div>

        <div className="relative w-full h-full rounded-full flex items-center justify-center bg-white shadow-lg">
          <BusFront className="w-6 h-6" style={{ color: schoolColor }} />
        </div>
      </div>
    );
  };

  const StationMarker: React.FC<{ type: "start" | "end"; label: string }> = ({ type, label }) => {
    const fill = type === "start" ? { a: "#34D399", b: "#059669" } : { a: "#FB923C", b: "#F97316" };

    return (
      <div title={label} className="w-9 h-12 flex items-start justify-center -mt-2 select-none">
        <svg viewBox="0 0 32 48" width="36" height="48">
          <defs>
            <linearGradient id={`pin_${type}_${label.replace(/\s/g, '_')}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={fill.a} />
              <stop offset="1" stopColor={fill.b} />
            </linearGradient>
            <filter id={`shadow_${label.replace(/\s/g, '_')}`}>
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.25" />
            </filter>
          </defs>
          <g filter={`url(#shadow_${label.replace(/\s/g, '_')})`}>
            <path d="M16 0 C10 0 4 6 4 12 C4 22 16 36 16 36 C16 36 28 22 28 12 C28 6 22 0 16 0 Z" 
                  fill={`url(#pin_${type}_${label.replace(/\s/g, '_')})`} />
            <circle cx="16" cy="12" r="5.2" fill="#ffffff" />
          </g>
        </svg>
      </div>
    );
  };

  return (
    <div className="w-full h-screen bg-gray-50 relative overflow-hidden">
      <Map
        ref={(r) => { mapRef.current = r; }}
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        mapboxAccessToken={MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/light-v11"
        style={{ width: "100%", height: "100%" }}
        maxPitch={65}
        minZoom={6}
        maxZoom={16}
      >
        <NavigationControl position="bottom-right" />

        <Source type="geojson" data={routeFeatures}>
          <Layer
            id="routes-glow"
            type="line"
            paint={{
              "line-color": [
                "case",
                ["get", "isDelayed"], "#ef4444",
                ["get", "isSelected"], "#ff7a18",
                ["match", ["get", "school"],
                  "Green Valley School", schoolColors["Green Valley School"],
                  "Mountain View Academy", schoolColors["Mountain View Academy"],
                  "Lake Side College", schoolColors["Lake Side College"],
                  "Central High School", schoolColors["Central High School"],
                  "#9ca3af"
                ]
              ],
              "line-width": ["case", ["get", "isSelected"], 14, 6],
              "line-opacity": 0.3,
              "line-blur": 8
            }}
          />
          <Layer
            id="routes"
            type="line"
            paint={{
              "line-color": [
                "case",
                ["get", "isDelayed"], "#ef4444",
                ["get", "isSelected"], "#ff7a18",
                ["match", ["get", "school"],
                  "Green Valley School", schoolColors["Green Valley School"],
                  "Mountain View Academy", schoolColors["Mountain View Academy"],
                  "Lake Side College", schoolColors["Lake Side College"],
                  "Central High School", schoolColors["Central High School"],
                  "#6b7280"
                ]
              ],
              "line-width": ["case", ["get", "isSelected"], 5, 3],
              "line-opacity": 0.9
            }}
          />
        </Source>

        {journeys.map((j) => (
          <React.Fragment key={j.id}>
            <Marker longitude={j.fromCoords[0]} latitude={j.fromCoords[1]} anchor="center">
              <StationMarker type="start" label={j.from} />
            </Marker>
            <Marker longitude={j.destinationCoords[0]} latitude={j.destinationCoords[1]} anchor="center">
              <StationMarker type="end" label={j.destination} />
            </Marker>
            <Marker longitude={j.currentCoords[0]} latitude={j.currentCoords[1]} anchor="center">
              <BusMarker journey={j} />
            </Marker>
          </React.Fragment>
        ))}

        {popupInfo && (
          <Popup
            longitude={popupInfo.currentCoords[0]}
            latitude={popupInfo.currentCoords[1]}
            anchor="bottom"
            onClose={() => setPopupInfo(null)}
            closeButton={false}
            offset={25}
          >
            <div className="bg-white text-gray-900 p-4 rounded-xl shadow-xl min-w-[240px]">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="font-bold text-base">{popupInfo.busPlate}</div>
                  <div className="text-xs text-gray-600">{popupInfo.from} → {popupInfo.destination}</div>
                  <div className="text-xs text-gray-500 mt-1">{popupInfo.school}</div>
                </div>
                <button onClick={() => setPopupInfo(null)} className="text-gray-400 hover:text-gray-700">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="mb-3">
                <div className="text-xs text-gray-500 mb-1 flex justify-between">
                  <span>Progress</span>
                  <span className="font-semibold">{popupInfo.progress}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500" 
                    style={{ 
                      width: `${popupInfo.progress}%`, 
                      background: schoolColors[popupInfo.school || ""] || "#3b82f6"
                    }} 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3 text-gray-500" />
                  <span className="text-gray-700">{popupInfo.passengers} pass.</span>
                </div>
                <div className="flex items-center gap-1">
                  <Activity className="w-3 h-3 text-gray-500" />
                  <span className="text-gray-700">{popupInfo.bus.speed} km/h</span>
                </div>
                <div className="col-span-2 text-gray-600">
                  Driver: <span className="font-medium text-gray-800">{popupInfo.driver.name}</span>
                </div>
              </div>

              {(popupInfo.isDelayed || popupInfo.bus.battery < 20) && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  {popupInfo.isDelayed && (
                    <div className="text-xs text-red-600 flex items-center gap-1 mb-1">
                      <AlertCircle className="w-3 h-3" />
                      Delayed
                    </div>
                  )}
                  {popupInfo.bus.battery < 20 && (
                    <div className="text-xs text-yellow-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      Low battery ({popupInfo.bus.battery}%)
                    </div>
                  )}
                </div>
              )}
            </div>
          </Popup>
        )}
      </Map>

      {notification && (
        <div className="absolute top-24 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none">
          <div className="bg-white rounded-lg shadow-2xl px-6 py-3 border-l-4 border-orange-500 animate-bounce">
            <div className="text-sm font-medium text-gray-900">{notification}</div>
          </div>
        </div>
      )}

      <div className="absolute top-6 left-6 right-6 z-20 pointer-events-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 pointer-events-auto">
          <div className="w-[520px] bg-white rounded-xl shadow-lg border border-gray-200 px-3 py-2 flex items-center gap-2">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by plate, route or driver…"
              className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
              onChange={(e) => {
                const q = e.target.value.toLowerCase().trim();
                if (!q) {
                  setJourneys(seedJourneys());
                  return;
                }
                setJourneys(
                  seedJourneys().filter((j) =>
                    `${j.busPlate} ${j.from} ${j.destination} ${j.driver.name} ${j.school}`
                      .toLowerCase()
                      .includes(q)
                  )
                );
              }}
            />
            <select
              className="text-sm bg-gray-50 border border-gray-200 rounded-md px-2 py-1 focus:outline-none"
              onChange={(e) => {
                const v = e.target.value;
                setJourneys(
                  v === "all"
                    ? seedJourneys()
                    : seedJourneys().filter((j) => j.status === v)
                );
              }}
            >
              <option value="all">All</option>
              <option value="pending">Active</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <button
              onClick={() => setJourneys(seedJourneys())}
              className="p-1 rounded-md hover:bg-gray-100"
              title="Clear search"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => alert("Report feature coming soon!")}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white
                         bg-gradient-to-r from-orange-500 to-orange-600
                         hover:from-orange-600 hover:to-orange-700
                         shadow-md transition"
            >
              <BarChart3 className="w-4 h-4" />
              Today's Report
            </button>

            <button
              onClick={fitBounds}
              className="p-3 bg-white rounded-xl hover:bg-gray-100 shadow"
              title="Fit all routes"
            >
              <Maximize2 className="w-5 h-5 text-orange-600" />
            </button>

            <button
              onClick={() => {
                const map = (mapRef.current as any)?.getMap?.();
                if (!map) return;
                const current = map.getStyle?.()?.name ?? "";
                const next =
                  current.toLowerCase().includes("light")
                    ? "mapbox://styles/mapbox/streets-v12"
                    : "mapbox://styles/mapbox/light-v11";
                map.setStyle(next);
              }}
              className="p-3 bg-white rounded-xl hover:bg-gray-100 shadow"
              title="Toggle map style"
            >
              <Layers className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>
      </div>

      {showSidebar && (
        <div className="absolute left-6 top-20 h-[calc(100vh-180px)] w-96 bg-white rounded-xl shadow-2xl z-30 pointer-events-auto overflow-hidden flex flex-col">
          <div className="px-4 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-base font-bold text-gray-900">Live Fleet Status</div>
                <div className="text-xs text-gray-500">Real-time bus monitoring</div>
              </div>
              <button onClick={() => setShowSidebar(false)} className="text-gray-400 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="bg-green-50 rounded-lg p-3">
                <div className="text-2xl font-bold text-green-600">{stats.active}</div>
                <div className="text-xs text-gray-600">Active</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-2xl font-bold text-gray-600">{stats.completed}</div>
                <div className="text-xs text-gray-600">Completed</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-3">
                <div className="text-2xl font-bold text-blue-600">{stats.avgSpeed}</div>
                <div className="text-xs text-gray-600">Avg km/h</div>
              </div>
            </div>

            {stats.delayed > 0 && (
              <div className="mt-3 bg-red-50 border border-red-200 rounded-lg px-3 py-2 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <span className="text-xs text-red-700 font-medium">{stats.delayed} bus(es) delayed</span>
              </div>
            )}

            <div className="mt-3 flex items-center gap-2">
              <span className="text-xs text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-xs bg-gray-50 border border-gray-200 rounded-md px-2 py-1 focus:outline-none flex-1"
              >
                <option value="progress">Progress</option>
                <option value="passengers">Passengers</option>
                <option value="eta">ETA</option>
              </select>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {sortedJourneys.map((j, i) => {
              const schoolColor = schoolColors[j.school || ""] || "#3b82f6";
              return (
                <div
                  key={j.id}
                  onClick={() => {
                    setSelectedJourney(j);
                    setViewState({ 
                      ...viewState, 
                      longitude: j.currentCoords[0], 
                      latitude: j.currentCoords[1], 
                      zoom: 11,
                      pitch: 45
                    });
                  }}
                  className={`p-3 rounded-xl cursor-pointer transition-all ${
                    selectedJourney?.id === j.id 
                      ? "bg-gradient-to-r from-orange-50 to-orange-100 border-2 border-orange-400 shadow-lg scale-[1.02]" 
                      : "bg-gray-50 border border-gray-200 hover:shadow-md hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div 
                        className="w-10 h-10 rounded-lg text-white flex items-center justify-center font-bold text-sm shadow-md flex-shrink-0"
                        style={{ backgroundColor: schoolColor }}
                      >
                        {i + 1}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-bold text-gray-900 truncate">{j.busPlate}</div>
                        <div className="text-xs text-gray-600 truncate">{j.from} → {j.destination}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{j.school}</div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <div className={`px-2 py-1 rounded-md text-xs font-medium ${
                        j.status === "pending" ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-700"
                      }`}>
                        {j.status}
                      </div>
                      {j.isDelayed && (
                        <div className="flex items-center gap-1 text-red-600">
                          <AlertCircle className="w-3 h-3" />
                          <span className="text-xs font-medium">Delayed</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>Progress</span>
                        <span className="font-semibold">{j.progress}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all duration-500" 
                          style={{ 
                            width: `${j.progress}%`,
                            backgroundColor: schoolColor
                          }} 
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="flex items-center gap-1 text-gray-600">
                        <Users className="w-3 h-3" />
                        <span className="font-medium">{j.passengers}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Activity className="w-3 h-3" />
                        <span className="font-medium">{j.bus.speed} km/h</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Clock className="w-3 h-3" />
                        <span className="font-medium">{fmtTime(j.expectedArrival)}</span>
                      </div>
                    </div>

                    {j.alerts.length > 0 && (
                      <div className="flex items-center gap-1 text-xs text-yellow-700 bg-yellow-50 px-2 py-1 rounded">
                        <AlertCircle className="w-3 h-3" />
                        <span>{j.alerts[0]}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {!showSidebar && (
        <button 
          onClick={() => setShowSidebar(true)} 
          className="absolute left-6 top-32 p-3 bg-white rounded-xl shadow-lg z-30 hover:bg-gray-50 transition"
        >
          <Layers className="w-5 h-5 text-gray-700" />
        </button>
      )}

{selectedJourney && (
  <div className="absolute left-0 right-0 bottom-20 flex items-center justify-center z-40 pointer-events-none">
    <div
      className="pointer-events-auto w-[calc(100%-32px)] max-w-5xl bg-white/95 backdrop-blur-sm border border-gray-200 rounded-xl shadow-lg px-4 py-2 flex items-center gap-4"
      role="region"
      aria-label="Selected journey summary"
    >
      {/* Left: bus badge */}
      <div className="flex items-center gap-3 min-w-[160px]">
        <div className="w-10 h-10 rounded-md bg-gradient-to-br from-orange-600 to-orange-800 text-white flex items-center justify-center shadow">
          <Bus className="w-5 h-5" />
        </div>
        <div className="min-w-0">
          <div className="text-sm font-semibold text-gray-900 truncate">
            {selectedJourney.busPlate} — {selectedJourney.label}
          </div>
          <div className="text-xs text-gray-500 truncate">
            {selectedJourney.from} <span className="mx-1">→</span> {selectedJourney.destination}
          </div>
        </div>
      </div>

      {/* Center: progress + small stats */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-4">
          {/* tiny progress bar */}
          <div className="min-w-0 mr-4">
            <div className="text-xs text-gray-500">Progress <span className="ml-2 font-semibold text-blue-600">{selectedJourney.progress}%</span></div>
          </div>

          {/* small meta stack */}
          <div className="flex items-center  gap-4 text-xs text-gray-600 whitespace-nowrap">
            <div className="flex flex-col">
              <span className="text-[11px] text-gray-400">Started</span>
              <span className="text-[12px] font-medium">{fmtTime(selectedJourney.startedAt)}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] text-gray-400">ETA</span>
              <span className="text-[12px] font-medium">{fmtTime(selectedJourney.expectedArrival)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-gray-500" />
              <span className="text-[12px] font-medium">{selectedJourney.passengers}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right: actions (compact) */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setPassengerViewFor(selectedJourney)}
          className="px-3 py-1 rounded-md bg-gray-50 border border-gray-200 text-sm text-gray-700 hover:bg-gray-100 transition"
          title="View passengers"
        >
          View passengers
        </button>

        <button
          onClick={() => (window.location.href = `tel:${selectedJourney.driver.phone}`)}
          className="px-3 py-1 rounded-md bg-white border border-gray-200 text-sm text-gray-700 hover:bg-gray-50 transition"
          title={`Call ${selectedJourney.driver.name}`}
        >
          Call
        </button>

        <button
          onClick={() => {
            const lat = selectedJourney.currentCoords[1];
            const lng = selectedJourney.currentCoords[0];
            window.open(`https://www.google.com/maps?q=${lat},${lng}`, "_blank");
          }}
          className="px-3 py-1 rounded-md bg-gradient-to-r from-orange-600 to-orange-800 text-white text-sm shadow-sm hover:from-blue-700 hover:to-blue-800 transition"
          title="Open in Maps"
        >
          Open
        </button>

        {/* close */}
        <button
          onClick={() => setSelectedJourney(null)}
          className="ml-1 p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition"
          title="Close"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
)}


      {/* Passenger list modal (small) */}
      {passengerViewFor && (
        <div className="absolute left-24 bottom-36 w-80 bg-white  rounded-xl shadow-2xl p-4 z-40 pointer-events-auto">
          <div className="flex items-center justify-between border-b border-orange-600  pb-3 mb-2">
            <div className="font-semibold text-orange-600">Passengers — {passengerViewFor.busPlate}</div>
            <button onClick={() => setPassengerViewFor(null)} className="text-orange-600 hover:text-gray-100"><X className="w-4 h-4" /></button>
          </div>
          <div className="text-xs text-black mb-2">Showing up to 10 sample passengers</div>
          <div className="space-y-2 max-h-56 overflow-auto">
            {(passengerViewFor.passengersList ?? []).map((p, idx) => (
              <div key={idx} className="text-sm p-2 bg-white border-b border-gray-200 pb-2 text-gray-600 rounded">{p}</div>
            ))}
            {passengerViewFor.passengers > (passengerViewFor.passengersList?.length ?? 0) && (
              <div className="text-xs text-black ">+ {passengerViewFor.passengers - (passengerViewFor.passengersList?.length ?? 0)} more</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}