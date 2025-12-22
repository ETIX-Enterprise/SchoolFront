import React from "react";
import {
  Bus,
  Users,
  Clock,
  Calendar,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import type { Journey } from "./app";

interface JourneyCardProps {
  journey: Journey;
  onViewPassengers: (journey: Journey) => void;
}

export function JourneyCard({
  journey,
  onViewPassengers,
}: JourneyCardProps) {
  const formatTime = (date: string) =>
    new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const isPending = journey.status === "pending";
  const isCompleted = journey.status === "completed";
  const isCancelled = journey.status === "cancelled";

  return (
    <div className="bg-white/50  rounded-lg p-4 hover:shadow-md transition">
      {/* ===== Header ===== */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[16px] font-semibold text-gray-900">
            <Bus className="w-4 h-4 text-blue-700" />
            {journey.from}
            <span className="text-gray-400 font-normal">→</span>
            {journey.destination}
          </div>

          <div className="mt-1 flex items-center gap-2 text-[14px] text-gray-500">
            <Users className="w-4 h-4" />
            {journey.passengers} passengers
          </div>
        </div>

        {/* Status */}
        {isCompleted && (
          <span className="flex items-center gap-1 px-3 py-1 rounded-lg text-[14px] bg-green-50 text-green-800">
            <CheckCircle2 className="w-4 h-4" />
            Completed
          </span>
        )}

        {isPending && (
          <span className="flex items-center gap-1 px-3 py-1 rounded-lg text-[14px] bg-yellow-50 text-yellow-800">
            <AlertCircle className="w-4 h-4" />
            Pending
          </span>
        )}

        {isCancelled && (
          <span className="flex items-center gap-1 px-3 py-1 rounded-lg text-[14px] bg-red-50 text-red-800">
            <AlertCircle className="w-4 h-4" />
            Cancelled
          </span>
        )}
      </div>

      {/* ===== Times ===== */}
      <div className="mt-4 grid grid-cols-2 gap-4">
        {/* Departure */}
        <div>
          <div className="text-[14px] text-gray-500 mb-1">Departure</div>
          <div className="flex items-center gap-2 text-[16px] text-gray-900">
            <Clock className="w-4 h-4" />
            {formatTime(journey.departureTime)}
          </div>
          <div className="flex items-center gap-2 text-[14px] text-gray-500">
            <Calendar className="w-4 h-4" />
            {formatDate(journey.departureTime)}
          </div>
        </div>

        {/* Arrival / Progress */}
        {isCompleted && journey.arrivalTime ? (
          <div>
            <div className="text-[14px] text-gray-500 mb-1">Arrival</div>
            <div className="flex items-center gap-2 text-[16px] text-gray-900">
              <Clock className="w-4 h-4" />
              {formatTime(journey.arrivalTime)}
            </div>
            <div className="flex items-center gap-2 text-[14px] text-gray-500">
              <Calendar className="w-4 h-4" />
              {formatDate(journey.arrivalTime)}
            </div>
          </div>
        ) : (
          <div>
            <div className="text-[14px] text-gray-500 mb-1">Progress</div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-2 bg-blue-800 rounded-full"
                style={{ width: `${journey.progress ?? 0}%` }}
              />
            </div>
            <div className="mt-1 text-[14px] text-gray-500">
              {journey.progress ?? 0}% completed
            </div>
          </div>
        )}
      </div>

      {/* ===== Footer ===== */}
      <div className="mt-5 flex items-center justify-between border-t pt-4">
        <div className="text-[14px] text-gray-500">
          Last update: {journey.lastUpdate ?? "Just now"}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onViewPassengers(journey);
          }}
          className="px-4 py-2 text-[14px] rounded-lg bg-blue-800 cursor-pointer duration-500 text-white hover:bg-blue-900 transition"
        >
          View Passengers
        </button>
      </div>
    </div>
  );
}
