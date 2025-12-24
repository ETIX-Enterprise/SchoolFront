// JourneyMap.tsx
import Map, { Marker, Source, Layer, Popup, NavigationControl, ScaleControl, FullscreenControl } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import type { Journey } from "./app";
import { 
  Navigation, 
  AlertCircle, 
  Battery, 
  Thermometer, 
  Wifi, 
  Users, 
  Clock, 
  ChevronRight,
  MapPin,
  Car,
  LucideIcon
} from "lucide-react";
import Lottie from "lottie-react";
import busAnimation from "../assets/lottie/bus.json";
import { useEffect, useState, useRef, useMemo } from "react";

interface Props {
  journeys: Journey[];
  selectedJourney?: Journey | null;
  onSelect: (journey: Journey) => void;
  interactive?: boolean;
  showControls?: boolean;
  viewMode?: "standard" | "traffic" | "satellite";
}

export function JourneyMap({ 
  journeys, 
  selectedJourney, 
  onSelect, 
  interactive = true,
  showControls = true,
  viewMode = "standard"
}: Props) {
  const [popupInfo, setPopupInfo] = useState<Journey | null>(null);
  const [viewState, setViewState] = useState({
    longitude: 30.0619,
    latitude: -1.9441,
    zoom: 10,
    pitch: 45,
    bearing: 0
  });
  const [is3D, setIs3D] = useState(false);
  const [autoRotate, setAutoRotate] = useState(false);
  const mapRef = useRef<any>();

  // Calculate center based on selected journey or all journeys
  const centerCoords = useMemo(() => {
    if (selectedJourney?.currentCoords) {
      return selectedJourney.currentCoords;
    }
    
    const allCoords = journeys.flatMap(j => [j.fromCoords, j.destinationCoords, ...(j.currentCoords ? [j.currentCoords] : [])]);
    if (allCoords.length === 0) return [30.0619, -1.9441];
    
    const avgLng = allCoords.reduce((sum, coord) => sum + coord[0], 0) / allCoords.length;
    const avgLat = allCoords.reduce((sum, coord) => sum + coord[1], 0) / allCoords.length;
    return [avgLng, avgLat];
  }, [journeys, selectedJourney]);

  // Map style based on view mode
  const mapStyles = {
    standard: "https://tiles.stadiamaps.com/styles/alidade_smooth.json",
    traffic: "https://tiles.stadiamaps.com/styles/alidade_smooth_dark.json",
    satellite: "https://tiles.stadiamaps.com/styles/alidade_satellite.json"
  };

  // Calculate route lines for selected journey (with progress)
  const getRouteGeometry = (journey: Journey) => {
    const from = journey.fromCoords;
    const to = journey.destinationCoords;
    const progress = journey.progress || 0;
    
    // Calculate current position along the route
    const currentLng = from[0] + ((to[0] - from[0]) * progress) / 100;
    const currentLat = from[1] + ((to[1] - from[1]) * progress) / 100;
    
    return {
      fullRoute: {
        type: "LineString" as const,
        coordinates: [from, to]
      },
      traveledRoute: {
        type: "LineString" as const,
        coordinates: [from, [currentLng, currentLat]]
      }
    };
  };

  // Route Feature Collections
  const allRoutesFeature = useMemo(() => ({
    type: "FeatureCollection" as const,
    features: journeys.map((j) => ({
      type: "Feature" as const,
      properties: { 
        id: j.id,
        status: j.status,
        progress: j.progress,
        isSelected: selectedJourney?.id === j.id
      },
      geometry: {
        type: "LineString" as const,
        coordinates: [j.fromCoords, j.destinationCoords],
      },
    })),
  }), [journeys, selectedJourney]);

  const selectedRouteFeature = useMemo(() => {
    if (!selectedJourney) return null;
    
    const geometry = getRouteGeometry(selectedJourney);
    
    return {
      type: "FeatureCollection" as const,
      features: [
        {
          type: "Feature" as const,
          properties: { type: "full", progress: selectedJourney.progress },
          geometry: geometry.fullRoute
        },
        {
          type: "Feature" as const,
          properties: { type: "traveled" },
          geometry: geometry.traveledRoute
        }
      ]
    };
  }, [selectedJourney]);

  // Calculate bounds for fit view
  const fitBounds = () => {
    if (!mapRef.current) return;
    
    if (selectedJourney) {
      const bounds = new (window as any).maplibregl.LngLatBounds();
      bounds.extend(selectedJourney.fromCoords);
      bounds.extend(selectedJourney.destinationCoords);
      if (selectedJourney.currentCoords) {
        bounds.extend(selectedJourney.currentCoords);
      }
      mapRef.current.fitBounds(bounds, { padding: 100, duration: 1000 });
    } else if (journeys.length > 0) {
      const bounds = new (window as any).maplibregl.LngLatBounds();
      journeys.forEach(j => {
        bounds.extend(j.fromCoords);
        bounds.extend(j.destinationCoords);
        if (j.currentCoords) bounds.extend(j.currentCoords);
      });
      mapRef.current.fitBounds(bounds, { padding: 100, duration: 1000 });
    }
  };

  // Bus Icon Component
  const BusIcon = ({ journey, isSelected }: { journey: Journey, isSelected: boolean }) => {
    const rotation = journey.bus?.speed && journey.bus.speed > 0 ? 
      (journey.fromCoords[0] < journey.destinationCoords[0] ? 0 : 180) : 0;
    
    return (
      <div className="relative">
        {/* Pulsing effect for selected bus */}
        {isSelected && (
          <div className="absolute inset-0 animate-ping">
            <div className="w-16 h-16 rounded-full bg-blue-500/30" />
          </div>
        )}
        
        {/* Speed indicator */}
        {journey.bus?.speed && journey.bus.speed > 0 && (
          <div className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-full font-bold z-10">
            {Math.round(journey.bus.speed)}
          </div>
        )}
        
        {/* Connectivity indicator */}
        {journey.bus && (
          <div className={`absolute -bottom-1 -left-1 w-3 h-3 rounded-full border-2 border-white ${
            journey.bus.connectivity ? 'bg-green-500' : 'bg-red-500'
          }`} />
        )}
        
        {/* Alert indicator */}
        {journey.alerts && journey.alerts.length > 0 && (
          <div className="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center">
            <AlertCircle className="w-3 h-3" />
          </div>
        )}
        
        {/* Bus animation */}
        <div 
          className="relative transform transition-transform duration-300 hover:scale-110"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          <Lottie
            animationData={busAnimation}
            className={`w-12 h-12 ${journey.status === 'completed' ? 'opacity-50' : ''}`}
            loop={journey.status === 'pending'}
          />
          
          {/* Status indicator */}
          <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
            journey.status === 'pending' ? 'bg-blue-500 animate-pulse' :
            journey.status === 'completed' ? 'bg-green-500' :
            'bg-red-500'
          }`} />
        </div>
      </div>
    );
  };

  // Destination Icon Component
  const DestinationIcon = ({ journey, isSelected }: { journey: Journey, isSelected: boolean }) => {
    return (
      <div className="relative">
        {isSelected && (
          <div className="absolute -inset-2 bg-blue-500/20 rounded-full animate-pulse" />
        )}
        
        <div className="relative p-1.5 bg-white rounded-full shadow-lg">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          
          {/* ETA indicator */}
          {journey.status === 'pending' && journey.progress && (
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
              {Math.round(100 - (journey.progress || 0))}% to go
            </div>
          )}
        </div>
      </div>
    );
  };

  // Station Icon Component
  const StationIcon = ({ type = "start" }: { type?: "start" | "intermediate" | "end" }) => {
    const colors = {
      start: "from-green-500 to-emerald-600",
      intermediate: "from-blue-500 to-blue-600",
      end: "from-purple-500 to-purple-600"
    };
    
    const icons = {
      start: <div className="w-3 h-3 bg-white rounded-full" />,
      intermediate: <div className="w-2 h-2 bg-white rounded-full" />,
      end: <div className="w-3 h-3 bg-white rounded-full" />
    };
    
    return (
      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${colors[type]} shadow-lg flex items-center justify-center`}>
        {icons[type]}
      </div>
    );
  };

  // Metric Badge Component
  const MetricBadge = ({ icon: Icon, value, unit, color }: { 
    icon: LucideIcon; 
    value: string | number; 
    unit?: string; 
    color: string; 
  }) => (
    <div className="flex items-center gap-1.5 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-lg border border-gray-200 shadow-sm">
      <Icon className={`w-4 h-4 ${color}`} />
      <span className="text-sm font-semibold text-gray-900">{value}</span>
      {unit && <span className="text-xs text-gray-500">{unit}</span>}
    </div>
  );

  return (
    <div className="relative w-full h-full">
      <Map
        ref={mapRef}
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        style={{ width: "100%", height: "100%" }}
        mapStyle={mapStyles[viewMode]}
        terrain={is3D ? { source: 'terrain', exaggeration: 1.5 } : undefined}
        interactive={interactive}
        maxPitch={85}
      >
        {/* Map Controls */}
        {showControls && (
          <>
            <NavigationControl position="top-right" />
            <ScaleControl position="bottom-left" />
            <FullscreenControl position="top-right" />
          </>
        )}

        {/* Terrain Source for 3D */}
        {is3D && (
          <Source
            id="terrain"
            type="raster-dem"
            url="https://demotiles.maplibre.org/terrain-tiles/tiles.json"
            tileSize={256}
          />
        )}

        {/* All Routes Layer (faded) */}
        <Source type="geojson" data={allRoutesFeature}>
          <Layer
            id="all-routes-line"
            type="line"
            paint={{
              "line-color": [
                "case",
                ["boolean", ["get", "isSelected"], false], "#3B82F6",
                ["==", ["get", "status"], "pending"], "#60A5FA",
                ["==", ["get", "status"], "completed"], "#10B981",
                "#EF4444"
              ],
              "line-width": ["case", ["boolean", ["get", "isSelected"], false], 4, 2],
              "line-opacity": ["case", ["boolean", ["get", "isSelected"], false], 0.8, 0.3],
              "line-dasharray": [2, 1],
              "line-blur": 1
            }}
          />
        </Source>

        {/* Selected Route Layers */}
        {selectedRouteFeature && (
          <Source type="geojson" data={selectedRouteFeature}>
            {/* Traveled route */}
            <Layer
              id="traveled-route"
              type="line"
              filter={["==", ["get", "type"], "traveled"]}
              paint={{
                "line-color": "#3B82F6",
                "line-width": 6,
                "line-opacity": 0.9,
                "line-gradient": [
                  "interpolate",
                  ["linear"],
                  ["line-progress"],
                  0, "#3B82F6",
                  1, "#8B5CF6"
                ]
              }}
            />
            
            {/* Full route outline */}
            <Layer
              id="full-route-outline"
              type="line"
              filter={["==", ["get", "type"], "full"]}
              paint={{
                "line-color": "#9CA3AF",
                "line-width": 8,
                "line-opacity": 0.2
              }}
            />
            
            {/* Full route */}
            <Layer
              id="full-route"
              type="line"
              filter={["==", ["get", "type"], "full"]}
              paint={{
                "line-color": "#6B7280",
                "line-width": 2,
                "line-opacity": 0.5,
                "line-dasharray": [2, 2]
              }}
            />
          </Source>
        )}

        {/* Markers */}
        {journeys.map((journey) => (
          <div key={journey.id}>
            {/* Bus Marker */}
            <Marker
              longitude={(journey.currentCoords ?? journey.fromCoords)[0]}
              latitude={(journey.currentCoords ?? journey.fromCoords)[1]}
              anchor="center"
              onClick={(ev) => {
                ev.originalEvent.stopPropagation();
                onSelect(journey);
                setPopupInfo(journey);
              }}
              onMouseEnter={() => setPopupInfo(journey)}
              onMouseLeave={() => {
                if (popupInfo?.id === journey.id && !selectedJourney) {
                  setPopupInfo(null);
                }
              }}
            >
              <BusIcon journey={journey} isSelected={selectedJourney?.id === journey.id} />
            </Marker>

            {/* Start Station */}
            <Marker
              longitude={journey.fromCoords[0]}
              latitude={journey.fromCoords[1]}
              anchor="center"
            >
              <StationIcon type="start" />
            </Marker>

            {/* Destination Marker */}
            <Marker
              longitude={journey.destinationCoords[0]}
              latitude={journey.destinationCoords[1]}
              anchor="center"
              onClick={(ev) => {
                ev.originalEvent.stopPropagation();
                onSelect(journey);
              }}
            >
              <DestinationIcon journey={journey} isSelected={selectedJourney?.id === journey.id} />
            </Marker>
          </div>
        ))}

        {/* Popup for bus details */}
        {popupInfo && (
          <Popup
            longitude={(popupInfo.currentCoords ?? popupInfo.fromCoords)[0]}
            latitude={(popupInfo.currentCoords ?? popupInfo.fromCoords)[1]}
            anchor="bottom"
            onClose={() => setPopupInfo(null)}
            closeButton={false}
            closeOnClick={false}
            className="rounded-xl shadow-xl border border-gray-200"
            maxWidth="300px"
          >
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-gray-900">{popupInfo.busPlate}</h3>
                  <p className="text-sm text-gray-600">{popupInfo.from} → {popupInfo.destination}</p>
                </div>
                <button
                  onClick={() => onSelect(popupInfo)}
                  className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                </button>
              </div>
              
              {/* Progress */}
              <div className="mb-3">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Progress</span>
                  <span className="font-semibold">{popupInfo.progress || 0}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      popupInfo.status === 'pending' ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                      popupInfo.status === 'completed' ? 'bg-gradient-to-r from-green-500 to-green-600' :
                      'bg-gradient-to-r from-red-500 to-red-600'
                    }`}
                    style={{ width: `${popupInfo.progress || 0}%` }}
                  />
                </div>
              </div>
              
              {/* Quick Metrics */}
              <div className="flex flex-wrap gap-2 mb-3">
                {popupInfo.bus?.speed !== undefined && (
                  <MetricBadge 
                    icon={Navigation} 
                    value={popupInfo.bus.speed} 
                    unit="km/h" 
                    color="text-blue-600" 
                  />
                )}
                {popupInfo.bus?.temperature !== undefined && (
                  <MetricBadge 
                    icon={Thermometer} 
                    value={popupInfo.bus.temperature} 
                    unit="°C" 
                    color="text-red-600" 
                  />
                )}
                {popupInfo.bus?.battery !== undefined && (
                  <MetricBadge 
                    icon={Battery} 
                    value={popupInfo.bus.battery} 
                    unit="%" 
                    color="text-green-600" 
                  />
                )}
                <MetricBadge 
                  icon={Users} 
                  value={popupInfo.passengers} 
                  color="text-purple-600" 
                />
              </div>
              
              {/* Status */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    popupInfo.status === 'pending' ? 'bg-blue-500 animate-pulse' :
                    popupInfo.status === 'completed' ? 'bg-green-500' :
                    'bg-red-500'
                  }`} />
                  <span className="font-medium capitalize">{popupInfo.status}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-500">
                  <Clock className="w-3 h-3" />
                  <span className="text-xs">{popupInfo.lastUpdate || 'N/A'}</span>
                </div>
              </div>
            </div>
          </Popup>
        )}

        {/* Selected Journey Info Panel */}
        {selectedJourney && (
          <div className="absolute bottom-6 left-6 right-6 max-w-md">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-2xl p-5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-gray-900">{selectedJourney.busPlate}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      selectedJourney.status === 'pending' ? 'bg-blue-100 text-blue-700' :
                      selectedJourney.status === 'completed' ? 'bg-green-100 text-green-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {selectedJourney.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{selectedJourney.from} → {selectedJourney.destination}</p>
                </div>
                <button
                  onClick={() => onSelect(selectedJourney)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Navigation className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              
              {/* Route Visualization */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span>{selectedJourney.from}</span>
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="h-0.5 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500" />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-500" />
                    <span>{selectedJourney.destination}</span>
                  </div>
                </div>
                
                {/* Current Position */}
                {selectedJourney.currentCoords && selectedJourney.progress && (
                  <div className="relative h-6">
                    <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 h-1 bg-gray-200 rounded-full" />
                    <div 
                      className="absolute top-1/2 transform -translate-y-1/2 h-3 w-3 rounded-full bg-blue-600 border-2 border-white shadow-lg"
                      style={{ left: `${selectedJourney.progress}%` }}
                    />
                  </div>
                )}
              </div>
              
              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Navigation className="w-4 h-4 text-gray-500" />
                    <span className="text-xs text-gray-500">Speed</span>
                  </div>
                  <div className="text-xl font-bold text-gray-900">{selectedJourney.bus?.speed || 0} km/h</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Battery className="w-4 h-4 text-gray-500" />
                    <span className="text-xs text-gray-500">Battery</span>
                  </div>
                  <div className="text-xl font-bold text-gray-900">{selectedJourney.bus?.battery || 0}%</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Thermometer className="w-4 h-4 text-gray-500" />
                    <span className="text-xs text-gray-500">Temperature</span>
                  </div>
                  <div className="text-xl font-bold text-gray-900">{selectedJourney.bus?.temperature || 0}°C</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="text-xs text-gray-500">Passengers</span>
                  </div>
                  <div className="text-xl font-bold text-gray-900">{selectedJourney.passengers}</div>
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    const url = `https://www.google.com/maps?q=${selectedJourney.currentCoords?.[1]},${selectedJourney.currentCoords?.[0]}`;
                    window.open(url, '_blank');
                  }}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  Open in Maps
                </button>
                <button
                  onClick={() => {
                    if (selectedJourney.driver?.phone) {
                      window.location.href = `tel:${selectedJourney.driver.phone}`;
                    }
                  }}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                >
                  Call Driver
                </button>
              </div>
            </div>
          </div>
        )}
      </Map>

      {/* Map Controls Overlay */}
      <div className="absolute top-6 right-6 flex flex-col gap-2">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <button
            onClick={() => setIs3D(!is3D)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              is3D ? 'bg-blue-600 text-white' : 'hover:bg-gray-50'
            }`}
          >
            {is3D ? '2D View' : '3D View'}
          </button>
          <div className="h-px bg-gray-200" />
          <button
            onClick={fitBounds}
            className="px-4 py-2 text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Fit All Buses
          </button>
        </div>
        
        {/* View Mode Selector */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          {Object.entries(mapStyles).map(([mode, _]) => (
            <button
              key={mode}
              onClick={() => {}}
              className={`px-4 py-2 text-sm font-medium transition-colors w-full text-left ${
                viewMode === mode ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
              }`}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg p-4">
        <h4 className="text-sm font-semibold text-gray-900 mb-2">Legend</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4">
              <Lottie animationData={busAnimation} className="w-full h-full" loop={true} />
            </div>
            <span className="text-xs text-gray-600">Active Bus</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-xs text-gray-600">Start Station</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center">
              <MapPin className="w-3 h-3 text-white" />
            </div>
            <span className="text-xs text-gray-600">Destination</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500" />
            <span className="text-xs text-gray-600">Active Route</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 bg-gray-300" />
            <span className="text-xs text-gray-600">Inactive Route</span>
          </div>
        </div>
      </div>

      {/* Stats Overlay */}
      <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg p-4">
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{journeys.length}</div>
            <div className="text-xs text-gray-500">Total Buses</div>
          </div>
          <div className="h-8 w-px bg-gray-300" />
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {journeys.filter(j => j.status === 'pending').length}
            </div>
            <div className="text-xs text-gray-500">Active</div>
          </div>
          <div className="h-8 w-px bg-gray-300" />
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-600">
              {journeys.reduce((sum, j) => sum + j.passengers, 0)}
            </div>
            <div className="text-xs text-gray-500">Passengers</div>
          </div>
        </div>
      </div>

      {/* Traffic Overlay Toggle */}
      <div className="absolute top-24 left-6">
        <button
          onClick={() => {}}
          className="bg-white/95 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg px-4 py-2 text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          Show Traffic
        </button>
      </div>

      {/* ETA Display */}
      {selectedJourney && selectedJourney.progress && selectedJourney.progress < 100 && (
        <div className="absolute top-40 left-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg p-4">
          <div className="text-sm font-medium mb-1">Estimated Arrival</div>
          <div className="text-2xl font-bold">
            {new Date(Date.now() + (100 - (selectedJourney.progress || 0)) * 60000).toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
          <div className="text-xs opacity-80">
            {Math.round((100 - (selectedJourney.progress || 0)) * 0.6)} minutes remaining
          </div>
        </div>
      )}
    </div>
  );
}