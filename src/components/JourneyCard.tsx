import React from "react";
import {
  Bus,
  Users,
  MapPin,
  Clock,
  Calendar,
  CheckCircle2,
  AlertCircle,
  BusFront,
} from "lucide-react";
import type { Journey } from "./app";

interface JourneyCardProps {
  journey: Journey;
}

// Grid wrapper: 2 items per row on sm+ screens
export function JourneyGrid({ journeys }: { journeys: Journey[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {journeys.map((j) => (
        <JourneyCard key={j.id} journey={j} />
      ))}
    </div>
  );
}

export function JourneyCard({ journey }: JourneyCardProps) {
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // status helpers
  const isPending = journey.status === "pending";
  const isCompleted = journey.status === "completed";
  const isCancelled = journey.status === "cancelled";

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <div className="flex-1">
          {/* Heading row: route + status badge */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-gray-800 text-[14px] font-medium">
                <Bus className="w-4 h-4 text-blue-600" />
                <span>
                  {journey.from} → <span className="text-gray-600">{journey.destination}</span>
                </span>
              </div>
              <div className="mt-1 text-sm text-gray-500">
                <span className="inline-flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  {journey.passengers} passengers
                </span>
              </div>
            </div>

            {/* Status badge */}
            <div>
              {isCompleted && (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-800 text-xs font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  Completed
                </div>
              )}

              {isCancelled && (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-semibold">
                  <AlertCircle className="w-4 h-4" />
                  Cancelled
                </div>
              )}

              {isPending && (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-50 text-yellow-800 text-xs font-semibold">
                  <AlertCircle className="w-4 h-4" />
                  Pending
                </div>
              )}
            </div>
          </div>

          {/* route & times */}
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-700">
                <Users className="w-4 h-4 text-blue-600" />
                <span className="text-sm">{journey.passengers} Passengers</span>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              {/* Departure */}
              <div className="space-y-1">
                <div className="text-xs text-gray-500 uppercase tracking-wide">Departure</div>
                <div className="flex items-center gap-2 text-gray-900">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span>{formatTime(journey.departureTime)}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                  <span>{formatDate(journey.departureTime)}</span>
                </div>
              </div>

              {/* Arrival or pending indicator */}
              {isCompleted && journey.arrivalTime && (
                <>
                  <div className="hidden sm:flex items-center justify-center">
                    <div className="w-px h-12 bg-gray-200"></div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-xs text-green-600 uppercase tracking-wide">Arrival</div>
                    <div className="flex items-center gap-2 text-gray-900">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span>{formatTime(journey.arrivalTime)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      <span>{formatDate(journey.arrivalTime)}</span>
                    </div>
                  </div>
                </>
              )}

              {isPending && (
                <div className="space-y-2 min-w-[140px]">
                  <div className="text-xs text-gray-500 uppercase tracking-wide">Estimated Arrival</div>

                  {/* in-transit line + pulse */}
                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        {/* subtle progress bar - could be driven by data */}
                        <div className="h-2 rounded-full bg-red-700" style={{ width: `${journey.progress ?? 40}%` }} />
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-sm text-orange-800 font-semibold">
                      <span className="w-2 h-2 bg-red-700 rounded-full animate-pulse inline-block" />
                      In transit
                    </div>
                  </div>

                  <div className="text-xs text-gray-500">Last update: {journey.lastUpdate ?? "just now"}</div>
                </div>
              )}

              {isCancelled && (
                <div className="space-y-1">
                  <div className="text-xs text-gray-500 uppercase tracking-wide">Status</div>
                  <div className="text-sm text-red-700 font-semibold">Cancelled</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
