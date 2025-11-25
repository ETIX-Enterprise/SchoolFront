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
    <div className="py-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex items-center gap-2 text-black">
          <Filter className="w-5 text-blue-700 h-5" />
          <span>Filters:</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          <div className="flex-1">
            <label htmlFor="destination" className="sr-only">
              Destination
            </label>
            <select
              id="destination"
              value={selectedDestination}
              onChange={(e) => onDestinationChange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Destinations</option>
              {destinations.map((dest) => (
                <option key={dest} value={dest}>
                  {dest}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label htmlFor="date" className="sr-only">
              Check-in Date From
            </label>
            <input
              id="date"
              type="date"
              value={dateFilter}
              onChange={(e) => onDateFilterChange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Check-in from..."
            />
          </div>
        </div>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors whitespace-nowrap"
          >
            <X className="w-4 h-4" />
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
