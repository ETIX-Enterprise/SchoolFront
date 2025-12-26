import { Users, CheckCircle, Clock } from "lucide-react";

/* -------------------- Types -------------------- */

interface StudentsStatusCardProps {
  activeYearStudents: number;
  arrivedStudents: number;
  pendingStudents?: number;
}

/* -------------------- Component -------------------- */

export function StudentsStatusCard({
  activeYearStudents,
  arrivedStudents,
  pendingStudents,
}: StudentsStatusCardProps) {
  // Calculate pending students if not provided
  const pending = pendingStudents || (activeYearStudents - arrivedStudents);
  const arrivalRate = activeYearStudents > 0 
    ? Math.round((arrivedStudents / activeYearStudents) * 100) 
    : 0;

  return (
    <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-white sm:w-[300px] h-[240px] overflow-hidden group transition-all duration-300 hover:scale-[1.01]">
      
      {/* Glow effect */}
      <div className="absolute inset-0 bg-slate-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Header */}
      <div className="flex items-center gap-4 mb-6 relative z-10">
        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-md">
          <Users className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm text-slate-200 font-medium">Current Year Status</p>
          <h2 className="text-2xl font-bold mt-1">
            {activeYearStudents.toLocaleString()}
          </h2>
          <p className="text-xs text-slate-300 mt-0.5">Total Current Year</p>
        </div>
      </div>

      {/* Status Breakdown */}
      <div className="grid grid-cols-2 gap-6 relative z-10">
        
        {/* Arrived */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <p className="text-xs text-slate-200 font-medium">Arrived</p>
            <p className="text-lg font-semibold mt-0.5">
              {arrivedStudents.toLocaleString()}
            </p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <p className="text-xs text-slate-300">
                {arrivalRate}% completed
              </p>
            </div>
          </div>
        </div>

        {/* Pending */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center">
            <Clock className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <p className="text-xs text-slate-200 font-medium">Pending</p>
            <p className="text-lg font-semibold mt-0.5">
              {pending.toLocaleString()}
            </p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
              <p className="text-xs text-slate-300">
                {100 - arrivalRate}% remaining
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Arrival Progress Bar */}
      <div className="mt-8 relative z-10">
        <div className="flex justify-between text-xs text-slate-200 mb-2">
          <span className="font-medium">Arrival Progress</span>
          <span>{arrivalRate}%</span>
        </div>
        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all duration-700"
            style={{ width: `${arrivalRate}%` }}
          />
        </div>
      </div>
    </div>
  );
}