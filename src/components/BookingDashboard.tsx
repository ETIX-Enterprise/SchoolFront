import { useState, useMemo } from 'react';
import { BookingCard } from './BookingCard';
import { BookingFilters } from './BookingFilters';
import { CreditCard, CheckCircle } from 'lucide-react';

export interface Booking {
  id: string;
  destination: string;
  checkIn: string;
  amount: number;
  agency: string;
  passengers: number;
  isPaid: boolean;
}

const mockBookings: Booking[] = [
  {
    id: '1',
    destination: 'Kigali',
    checkIn: '2025-12-01',
    amount: 1200,
    agency: 'Volcano',
    passengers: 2,
    isPaid: false,
  },
  {
    id: '2',
    destination: 'Huye',
    checkIn: '2025-12-10',
    amount: 2400,
    agency: 'Horizon',
    passengers: 1,
    isPaid: false,
  },
  {
    id: '3',
    destination: 'Rusizi',
    checkIn: '2025-11-28',
    amount: 1800,
    agency: 'Horizon',
    passengers: 3,
    isPaid: false,
  },
  {
    id: '4',
    destination: 'karongi',
    checkIn: '2025-12-15',
    amount: 1500,
    agency: 'Volcano',
    passengers: 2,
    isPaid: false,
  },
  {
    id: '5',
    destination: 'Huye',
    checkIn: '2025-12-08',
    amount: 1600,
    agency: 'Horizon',
    passengers: 2,
    isPaid: false,
  },
  {
    id: '6',
    destination: 'Nyamagabe',
    checkIn: '2025-11-25',
    amount: 2200,
    agency: 'Horizon',
    passengers: 2,
    isPaid: true,
  },
  {
    id: '7',
    destination: 'Nyanza',
    checkIn: '2025-11-20',
    amount: 1400,
    agency: 'Volcano',
    passengers: 1,
    isPaid: true,
  },
];

export function BookingDashboard() {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [activeTab, setActiveTab] = useState<'unpaid' | 'paid'>('unpaid');
  const [selectedDestination, setSelectedDestination] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('');

  const handleMarkAsPaid = (bookingId: string) => {
    setBookings(prevBookings =>
      prevBookings.map(booking =>
        booking.id === bookingId ? { ...booking, isPaid: true } : booking
      )
    );
  };

  const filteredBookings = useMemo(() => {
    let filtered = bookings.filter(booking => 
      activeTab === 'unpaid' ? !booking.isPaid : booking.isPaid
    );

    if (selectedDestination !== 'all') {
      filtered = filtered.filter(booking => booking.destination === selectedDestination);
    }

    if (dateFilter) {
      filtered = filtered.filter(booking => {
        const checkInDate = new Date(booking.checkIn);
        const filterDate = new Date(dateFilter);
        return checkInDate >= filterDate;
      });
    }

    return filtered;
  }, [bookings, activeTab, selectedDestination, dateFilter]);

  const destinations = useMemo(() => {
    const unique = new Set(bookings.map(b => b.destination));
    return Array.from(unique);
  }, [bookings]);

  const unpaidTotal = useMemo(() => {
    return bookings
      .filter(b => !b.isPaid)
      .reduce((sum, b) => sum + b.amount, 0);
  }, [bookings]);

  const paidTotal = useMemo(() => {
    return bookings
      .filter(b => b.isPaid)
      .reduce((sum, b) => sum + b.amount, 0);
  }, [bookings]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('unpaid')}
          className={`py-2 px-4 bg-zinc-100 border-b  flex justify-center items-center cursor-pointer   text-[14px] ${
            activeTab === 'unpaid'
              ? 'border-blue-800 text-blue-700'
              : 'border-transparent text-black hover:hover:bg-gray-200'
          }`}
        >
          <CreditCard className="w-5 mr-1 h-5" />
          <span>Unpaid ({bookings.filter(b => !b.isPaid).length})</span>
        </button>
        <button
          onClick={() => setActiveTab('paid')}
          className={`py-2 px-4 bg-zinc-100 border-b  flex justify-center items-center cursor-pointer   text-[14px] ${
            activeTab === 'paid'
              ? 'border-green-800 text-green-700'
              : 'border-transparent text-black hover:hover:bg-gray-200'
          }`}
        >
          <CheckCircle className="w-5 mr-2 h-5" />
          <span>Paid ({bookings.filter(b => b.isPaid).length})</span>
        </button>
      </div>

      {/* Summary Card */}
      <div className="flex border-b border-gray-300 mb-2 justify-between">
              {/* Filters */}
      <BookingFilters
        destinations={destinations}
        selectedDestination={selectedDestination}
        onDestinationChange={setSelectedDestination}
        dateFilter={dateFilter}
        onDateFilterChange={setDateFilter}
      />
      <div className=" rounded-lg mb-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className='bg-gray-50 rounded-lg px-8 py-1'>
            <p className="text-black  mb-1">Unpaid</p>
            <p className="text-red-600">${unpaidTotal.toLocaleString()}</p>
          </div>
          <div className='bg-blue-50 rounded-lg px-8 py-1'>
            <p className="text-black mb-1">Paid</p>
            <p className="text-green-700">${paidTotal.toLocaleString()}</p>
          </div>
        </div>
      </div>
      </div>



      {/* Bookings List */}
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-4 space-y-4">
        {filteredBookings.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <p className="text-gray-500">No bookings found matching your filters</p>
          </div>
        ) : (
          filteredBookings.map(booking => (
            <BookingCard
              key={booking.id}
              booking={booking}
              onMarkAsPaid={handleMarkAsPaid}
            />
          ))
        )}
      </div>
    </div>
  );
}
