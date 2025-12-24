import { Filter, X } from 'lucide-react';

interface BookingFiltersProps {
  destinations: string[];
  selectedDestination: string;
  onDestinationChange: (destination: string) => void;
  dateFilter: string;
  onDateFilterChange: (date: string) => void;
}

export function BookingFilters({
  destinations,
  selectedDestination,
  onDestinationChange,
  dateFilter,
  onDateFilterChange,
}: BookingFiltersProps) {
  const hasActiveFilters = selectedDestination !== 'all' || dateFilter !== '';

  const clearFilters = () => {
    onDestinationChange('all');
    onDateFilterChange('');
  };

  return (
    <div className="py-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
            <Filter className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Filters</h3>
            <p className="text-xs text-gray-500">Refine your search results</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="flex-1 min-w-0">
            <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1.5">
              Destination
            </label>
            <div className="relative">
              <select
                id="destination"
                value={selectedDestination}
                onChange={(e) => onDestinationChange(e.target.value)}
                className="w-full px-4 py-3 pl-10 border-2 border-gray-300 rounded-xl bg-white text-sm font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 appearance-none cursor-pointer hover:border-gray-400"
              >
                <option value="all">All Destinations</option>
                {destinations.map((dest) => (
                  <option key={dest} value={dest} className="py-2">
                    {dest}
                  </option>
                ))}
              </select>
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1.5">
              Check-in Date
            </label>
            <div className="relative">
              <input
                id="date"
                type="date"
                value={dateFilter}
                onChange={(e) => onDateFilterChange(e.target.value)}
                className="w-full px-4 py-3 pl-10 border-2 border-gray-300 rounded-xl bg-white text-sm font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 cursor-pointer hover:border-gray-400"
                placeholder="Select date..."
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {hasActiveFilters && (
          <div className="self-end sm:self-center pt-2 sm:pt-0">
            <button
              onClick={clearFilters}
              className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-xl border-2 border-gray-300 transition-all duration-200 hover:border-gray-400 active:scale-95"
            >
              <X className="w-4 h-4" />
              Clear All
            </button>
          </div>
        )}
      </div>

      {hasActiveFilters && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-sm font-medium text-gray-600">Active filters:</span>
            {selectedDestination !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 text-sm font-medium rounded-lg border border-blue-200">
                {selectedDestination}
                <button
                  onClick={() => onDestinationChange('all')}
                  className="ml-1 p-0.5 hover:bg-blue-100 rounded transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {dateFilter && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 text-sm font-medium rounded-lg border border-green-200">
                From {new Date(dateFilter).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                <button
                  onClick={() => onDateFilterChange('')}
                  className="ml-1 p-0.5 hover:bg-green-100 rounded transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Helper component for ChevronDown icon
function ChevronDown({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}