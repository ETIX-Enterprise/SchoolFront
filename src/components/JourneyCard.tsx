import React, { useState } from "react";
import {
  Bus,
  Users,
  Clock,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Navigation,
  MapPin,
  Battery,
  Wifi,
  ChevronRight,
  Phone,
  Download,
  MoreVertical,
  User,
  Eye,
  ExternalLink,
  BarChart3,
  TrendingUp,
  AlertTriangle,
  Route,
} from "lucide-react";
import type { Journey } from "./app";

interface JourneyCardProps {
  journey: Journey;
  onViewPassengers: (journey: Journey) => void;
  onViewDetails?: (journey: Journey) => void;
  onCallDriver?: (journey: Journey) => void;
  onTrackLocation?: (journey: Journey) => void;
  compact?: boolean;
  selected?: boolean;
}

export function JourneyCard({ 
  journey, 
  onViewPassengers, 
  onViewDetails,
  onCallDriver,
  onTrackLocation,
  compact = false,
  selected = false
}: JourneyCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showMoreActions, setShowMoreActions] = useState(false);

  const formatTime = (date: string) =>
    new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

  const getETA = () => {
    if (journey.status !== "pending" || !journey.progress) return null;
    const remainingProgress = 100 - (journey.progress || 0);
    const estimatedMinutes = Math.round(remainingProgress * 0.6); // Assuming 0.6 minutes per percent
    const eta = new Date(Date.now() + estimatedMinutes * 60000);
    return eta.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getStatusConfig = () => {
    switch (journey.status) {
      case "pending":
        return {
          icon: <AlertCircle className="w-3.5 h-3.5" />,
          bgColor: "bg-blue-50",
          textColor: "text-blue-700",
          borderColor: "border-blue-200",
          label: "In Transit",
          gradient: "from-blue-500 to-blue-600",
          progressColor: "bg-gradient-to-r from-blue-500 to-blue-600"
        };
      case "completed":
        return {
          icon: <CheckCircle2 className="w-3.5 h-3.5" />,
          bgColor: "bg-emerald-50",
          textColor: "text-emerald-700",
          borderColor: "border-emerald-200",
          label: "Completed",
          gradient: "from-emerald-500 to-emerald-600",
          progressColor: "bg-gradient-to-r from-emerald-500 to-emerald-600"
        };
      case "cancelled":
        return {
          icon: <AlertTriangle className="w-3.5 h-3.5" />,
          bgColor: "bg-red-50",
          textColor: "text-red-700",
          borderColor: "border-red-200",
          label: "Cancelled",
          gradient: "from-red-500 to-red-600",
          progressColor: "bg-gradient-to-r from-red-500 to-red-600"
        };
      default:
        return {
          icon: <AlertCircle className="w-3.5 h-3.5" />,
          bgColor: "bg-gray-50",
          textColor: "text-gray-700",
          borderColor: "border-gray-200",
          label: "Unknown",
          gradient: "from-gray-500 to-gray-600",
          progressColor: "bg-gradient-to-r from-gray-500 to-gray-600"
        };
    }
  };

  const status = getStatusConfig();

  if (compact) {
    return (
      <div 
        className={`relative bg-white rounded-xl border-2 transition-all duration-300 hover:shadow-lg hover:border-blue-300 cursor-pointer group ${
          selected 
            ? 'border-blue-500 shadow-lg bg-blue-50/30' 
            : 'border-gray-200 hover:border-blue-300'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => onViewDetails?.(journey)}
      >
        <div className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${status.bgColor} ${status.textColor}`}>
                <Bus className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-900">{journey.busPlate}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${status.bgColor} ${status.textColor} border ${status.borderColor}`}>
                    {status.label}
                  </span>
                </div>
                <div className="text-sm text-gray-500 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {journey.from} → {journey.destination}
                </div>
              </div>
            </div>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setShowMoreActions(!showMoreActions);
              }}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <MoreVertical className="w-4 h-4 text-gray-500" />
            </button>
          </div>

          {/* Progress */}
          <div className="mb-3">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Progress</span>
              <span className="font-semibold">{journey.progress ?? 0}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${status.progressColor}`}
                style={{ width: `${journey.progress ?? 0}%` }}
              />
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-gray-500" />
                <span className="text-gray-700 font-medium">{journey.passengers}</span>
              </div>
              {journey.bus?.speed && (
                <div className="flex items-center gap-1">
                  <Speedometer className="w-3.5 h-3.5 text-gray-500" />
                  <span className="text-gray-700 font-medium">{journey.bus.speed}km/h</span>
                </div>
              )}
            </div>
            <div className="text-xs text-gray-500">
              {journey.lastUpdate || 'Just now'}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`relative bg-gradient-to-br from-white to-gray-50/50 rounded-2xl border transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] cursor-pointer overflow-hidden group ${
        selected 
          ? 'border-blue-500 shadow-xl ring-2 ring-blue-500/20' 
          : 'border-gray-200 hover:border-blue-300'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowMoreActions(false);
      }}
      onClick={() => onViewDetails?.(journey)}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:20px_20px]" />
      </div>

      {/* Status Indicator Bar */}
      <div className={`absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b ${status.gradient}`} />

      {/* Alert Indicator */}
      {journey.alerts && journey.alerts.length > 0 && (
        <div className="absolute top-4 right-4 z-10">
          <div className="relative">
            <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75" />
            <div className="relative w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
              <AlertCircle className="w-3 h-3 text-white" />
            </div>
          </div>
        </div>
      )}

      <div className="relative p-5">
        {/* Header Section */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              {/* Bus Icon with Animation */}
              <div className="relative">
                <div className={`absolute inset-0 rounded-full ${status.bgColor} opacity-50 animate-pulse`} />
                <div className={`relative p-3 rounded-xl ${status.bgColor} border ${status.borderColor}`}>
                  <Bus className={`w-5 h-5 ${status.textColor}`} />
                </div>
              </div>

              <div>
                {/* Bus Plate with Route */}
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    {journey.busPlate}
                  </span>
                  <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full ${status.bgColor} border ${status.borderColor}`}>
                    {status.icon}
                    <span className={`text-sm font-medium ${status.textColor}`}>
                      {status.label}
                    </span>
                  </div>
                </div>

                {/* Route with Icons */}
                <div className="flex items-center gap-3 text-gray-600">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="font-medium">{journey.from}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-16 h-px bg-gradient-to-r from-green-500 via-blue-500 to-purple-500" />
                    <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
                    <div className="w-16 h-px bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-purple-500" />
                    <span className="font-medium">{journey.destination}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Driver Info */}
            {journey.driver && (
              <div className="flex items-center gap-2 mt-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                  <User className="w-3 h-3 text-blue-600" />
                </div>
                <div className="text-sm">
                  <span className="font-medium text-gray-900">{journey.driver.name}</span>
                  <span className="text-gray-500 ml-2">• {journey.driver.experience}</span>
                </div>
              </div>
            )}
          </div>

          {/* More Actions Button */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setShowMoreActions(!showMoreActions);
            }}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
          >
            <MoreVertical className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-3 hover:border-blue-300 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-blue-600" />
              <span className="text-xs text-gray-500">Passengers</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{journey.passengers}</div>
            <div className="text-xs text-gray-400 mt-1">On board</div>
          </div>

          {journey.bus?.speed !== undefined && (
            <div className="bg-white rounded-xl border border-gray-200 p-3 hover:border-blue-300 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <Speedometer className="w-4 h-4 text-emerald-600" />
                <span className="text-xs text-gray-500">Speed</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{journey.bus.speed}</div>
              <div className="text-xs text-gray-400 mt-1">km/h</div>
            </div>
          )}

          {journey.bus?.battery !== undefined && (
            <div className="bg-white rounded-xl border border-gray-200 p-3 hover:border-blue-300 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <Battery className={`w-4 h-4 ${
                  journey.bus.battery > 70 ? 'text-green-600' :
                  journey.bus.battery > 30 ? 'text-yellow-600' : 'text-red-600'
                }`} />
                <span className="text-xs text-gray-500">Battery</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{journey.bus.battery}%</div>
              <div className="text-xs text-gray-400 mt-1">
                {journey.bus.battery > 70 ? 'Optimal' : journey.bus.battery > 30 ? 'Moderate' : 'Low'}
              </div>
            </div>
          )}

          <div className="bg-white rounded-xl border border-gray-200 p-3 hover:border-blue-300 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-purple-600" />
              <span className="text-xs text-gray-500">ETA</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {getETA() || journey.arrivalTime ? formatTime(journey.arrivalTime!) : '--:--'}
            </div>
            <div className="text-xs text-gray-400 mt-1">Estimated arrival</div>
          </div>
        </div>

        {/* Progress Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Journey Progress</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-gray-900">{journey.progress ?? 0}%</span>
              {journey.progress && journey.progress > 0 && journey.progress < 100 && (
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <TrendingUp className="w-3 h-3" />
                  <span>+2.5%</span>
                </div>
              )}
            </div>
          </div>

          {/* Enhanced Progress Bar */}
          <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="h-full w-full bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%)] bg-[length:20px_20px]" />
            </div>
            
            {/* Progress Fill */}
            <div 
              className={`absolute inset-y-0 left-0 rounded-full ${status.progressColor} transition-all duration-1000 ease-out`}
              style={{ width: `${journey.progress ?? 0}%` }}
            >
              {/* Animated Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            </div>
            
            {/* Progress Markers */}
            <div className="absolute inset-0 flex justify-between px-2">
              {[0, 25, 50, 75, 100].map((marker) => (
                <div 
                  key={marker}
                  className={`w-1 h-3 rounded-full ${
                    (journey.progress || 0) >= marker ? 'bg-white' : 'bg-gray-400/50'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Route Points */}
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span className="font-medium">{journey.from}</span>
            <span className="font-medium">{journey.destination}</span>
          </div>
        </div>

        {/* Time Information */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-4 border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                <Clock className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Departure</div>
                <div className="text-lg font-bold text-gray-900">
                  {formatTime(journey.departureTime)}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Calendar className="w-3 h-3" />
              {formatDate(journey.departureTime)}
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl p-4 border border-purple-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                {journey.status === "completed" ? (
                  <CheckCircle2 className="w-4 h-4 text-purple-600" />
                ) : (
                  <Clock className="w-4 h-4 text-purple-600" />
                )}
              </div>
              <div>
                <div className="text-sm text-gray-500">
                  {journey.status === "completed" ? "Arrival" : "Estimated Arrival"}
                </div>
                <div className="text-lg font-bold text-gray-900">
                  {journey.arrivalTime ? formatTime(journey.arrivalTime) : getETA() || '--:--'}
                </div>
              </div>
            </div>
            {journey.arrivalTime && (
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <Calendar className="w-3 h-3" />
                {formatDate(journey.arrivalTime)}
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-5 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-3.5 h-3.5" />
              <span>Updated: {journey.lastUpdate || 'Just now'}</span>
            </div>
            
            {journey.bus?.connectivity !== undefined && (
              <div className="flex items-center gap-1">
                <Wifi className={`w-3.5 h-3.5 ${
                  journey.bus.connectivity ? 'text-green-600' : 'text-red-600'
                }`} />
                <span className="text-xs">
                  {journey.bus.connectivity ? 'Connected' : 'Offline'}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Actions */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onViewPassengers(journey);
              }}
              className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 group"
            >
              <Users className="w-4 h-4" />
              <span className="font-medium">Passengers</span>
              <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onTrackLocation?.(journey);
              }}
              className="p-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors hover:border-blue-300"
              title="Track Location"
            >
              <Navigation className="w-4 h-4" />
            </button>

            {journey.driver?.phone && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onCallDriver?.(journey);
                }}
                className="p-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors hover:border-blue-300"
                title="Call Driver"
              >
                <Phone className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* More Actions Dropdown */}
      {showMoreActions && (
        <div className="absolute right-4 top-16 z-20 w-48 bg-white rounded-xl border border-gray-200 shadow-2xl py-2 animate-in fade-in-50">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails?.(journey);
              setShowMoreActions(false);
            }}
            className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Eye className="w-4 h-4" />
            View Details
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onViewPassengers(journey);
              setShowMoreActions(false);
            }}
            className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Users className="w-4 h-4" />
            Passenger List
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              // Handle route view
              setShowMoreActions(false);
            }}
            className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Route className="w-4 h-4" />
            View Route
          </button>
          <div className="h-px bg-gray-200 my-1" />
          <button 
            onClick={(e) => {
              e.stopPropagation();
              // Handle export
              setShowMoreActions(false);
            }}
            className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export Data
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              // Handle share
              setShowMoreActions(false);
            }}
            className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Share Status
          </button>
        </div>
      )}

      {/* Hover Overlay */}
      {isHovered && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 pointer-events-none" />
      )}

      {/* CSS for shimmer animation */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
}