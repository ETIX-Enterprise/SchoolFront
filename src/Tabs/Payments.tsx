import React, { useState, useMemo } from 'react';
import { 
  CreditCard, 
  CheckCircle, 
  Filter, 
  Download,
  Search,
  MapPin,
  Calendar,
  Users,
  X,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  TrendingUp,
  Clock,
  ArrowRight
} from 'lucide-react';
import { BsCash, BsCashStack } from 'react-icons/bs';

interface Booking {
  id: string;
  destination: string;
  checkIn: string;
  amount: number;
  agency: string;
  passengers: number;
  isPaid: boolean;
  status: string;
}

const mockBookings: Booking[] = [
  {
    id: 'BK-2024-001',
    destination: 'Kigali',
    checkIn: '2025-12-01',
    amount: 1200,
    agency: 'Volcano Express',
    passengers: 2,
    isPaid: false,
    status: 'pending'
  },
  {
    id: 'BK-2024-002',
    destination: 'Huye',
    checkIn: '2025-12-10',
    amount: 2400,
    agency: 'Horizon',
    passengers: 1,
    isPaid: false,
    status: 'pending'
  },
  {
    id: 'BK-2024-003',
    destination: 'Rusizi',
    checkIn: '2025-11-28',
    amount: 1800,
    agency: 'Horizon',
    passengers: 3,
    isPaid: false,
    status: 'pending'
  },
  {
    id: 'BK-2024-004',
    destination: 'Karongi',
    checkIn: '2025-12-15',
    amount: 1500,
    agency: 'Volcano Express',
    passengers: 2,
    isPaid: false,
    status: 'pending'
  },
  {
    id: 'BK-2024-005',
    destination: 'Huye',
    checkIn: '2025-12-08',
    amount: 1600,
    agency: 'Horizon',
    passengers: 2,
    isPaid: false,
    status: 'pending'
  },
  {
    id: 'BK-2024-006',
    destination: 'Nyamagabe',
    checkIn: '2025-11-25',
    amount: 2200,
    agency: 'Horizon',
    passengers: 2,
    isPaid: true,
    status: 'completed'
  },
  {
    id: 'BK-2024-007',
    destination: 'Nyanza',
    checkIn: '2025-11-20',
    amount: 1400,
    agency: 'Volcano Express',
    passengers: 1,
    isPaid: true,
    status: 'completed'
  },
];

function PaymentsDashboard() {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [activeTab, setActiveTab] = useState<'unpaid' | 'paid'>('unpaid');
  const [selectedDestination, setSelectedDestination] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [cardIndex, setCardIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');

  const tabs = [
    { id: 'unpaid', label: 'Unpaid', count: bookings.filter(b => !b.isPaid).length },
    { id: 'paid', label: 'Paid', count: bookings.filter(b => b.isPaid).length }
  ];

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

  const totalRevenue = unpaidTotal + paidTotal;
  const paymentRate = Math.round((paidTotal / totalRevenue) * 100);

  const stats = [
    { title: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'from-orange-600 to-orange-800', desc: 'All time payments' },
    { title: 'Unpaid Amount', value: `$${unpaidTotal.toLocaleString()}`, icon: Clock, color: 'from-red-600 to-red-700', desc: 'Pending payments' },
    { title: 'Paid Amount', value: `$${paidTotal.toLocaleString()}`, icon: CheckCircle, color: 'from-green-600 to-green-700', desc: 'Completed payments' },
    { title: 'Payment Rate', value: `${paymentRate}%`, icon: TrendingUp, color: 'from-purple-600 to-purple-700', desc: 'Collection efficiency' }
  ];

  const destinations = useMemo(() => {
    const unique = new Set(bookings.map(b => b.destination));
    return Array.from(unique);
  }, [bookings]);

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

    if (searchQuery) {
      filtered = filtered.filter(booking =>
        booking.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.agency.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [bookings, activeTab, selectedDestination, dateFilter, searchQuery]);

  const handlePayClick = (booking: Booking) => {
    setSelectedBooking(booking);
    setShowPaymentModal(true);
    setPhoneNumber('');
  };

  const handleConfirmPayment = () => {
    if (!selectedBooking || !phoneNumber) return;

    setBookings(prev =>
      prev.map(b =>
        b.id === selectedBooking.id ? { ...b, isPaid: true, status: 'completed' } : b
      )
    );

    setShowPaymentModal(false);
    setSelectedBooking(null);
    setPhoneNumber('');
  };

  const nextCard = () => {
    if (cardIndex < stats.length - 1) {
      setSlideDirection('left');
      setIsSliding(true);
      setTimeout(() => {
        setCardIndex(cardIndex + 1);
        setIsSliding(false);
      }, 300);
    }
  };

  const prevCard = () => {
    if (cardIndex > 0) {
      setSlideDirection('right');
      setIsSliding(true);
      setTimeout(() => {
        setCardIndex(cardIndex - 1);
        setIsSliding(false);
      }, 300);
    }
  };

  const CurrentIcon = stats[cardIndex].icon;

  const clearFilters = () => {
    setSelectedDestination('all');
    setDateFilter('');
    setSearchQuery('');
  };

  const hasActiveFilters = selectedDestination !== 'all' || dateFilter !== '' || searchQuery !== '';

  return (
    <div className='w-full flex-1 space-y-6 h-full'>
      {/* Header */}
      <header className="w-full px-6 py-4 bg-white border-b border-gray-200 flex justify-between items-center">
        <div>
          <h1 className="text-[17px] font-semibold  tracking-tight bg-gradient-to-r from-blue-700 to-orange-800 bg-clip-text text-transparent">Payment Management</h1>
          <p className="text-gray-600 text-[14px]">Track and manage transportation payments</p>
        </div>

        <div className="flex gap-3">
          <button className="px-4 py-2 text-[14px] font-medium rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-200 flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </header>

      {/* Stats Carousel Card */}
      <div className="px-6 flex justify-between">
        <div className={`bg-gradient-to-r h-[200px] ${stats[cardIndex].color} w-full max-w-md rounded-xl p-5 text-white shadow-lg relative overflow-hidden`}>
          <div className={`transition-all duration-300 ${isSliding ? `opacity-0 ${slideDirection === 'left' ? '-translate-x-8' : 'translate-x-8'}` : 'opacity-100 translate-x-0'}`}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[12px] text-white/80">{stats[cardIndex].title}</p>
                <p className="text-3xl font-bold mt-2">{stats[cardIndex].value}</p>
              </div>
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <CurrentIcon className="w-7 h-7 text-white" />
              </div>
            </div>

            <div className="pt-3 border-t border-white/20">
              <p className="text-[13px] text-white/80">{stats[cardIndex].desc}</p>
            </div>
          </div>

          {/* Navigation */}
          {stats.length > 1 && (
            <>
              <div className="absolute bottom-5 right-5 flex items-center gap-2">
                <button
                  onClick={prevCard}
                  disabled={cardIndex === 0}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                    cardIndex === 0
                      ? 'bg-white/10 text-white/30 cursor-not-allowed'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextCard}
                  disabled={cardIndex === stats.length - 1}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                    cardIndex === stats.length - 1
                      ? 'bg-white/10 text-white/30 cursor-not-allowed'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="absolute bottom-5 left-5 flex items-center gap-1.5">
                {stats.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      if (idx !== cardIndex) {
                        setSlideDirection(idx > cardIndex ? 'left' : 'right');
                        setIsSliding(true);
                        setTimeout(() => {
                          setCardIndex(idx);
                          setIsSliding(false);
                        }, 300);
                      }
                    }}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === cardIndex
                        ? 'w-6 bg-white'
                        : 'w-1.5 bg-white/40 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
                                 <div className="bg-gradient-to-r h-[200px] from-gray-100 to-zinc-100 w-[450px] rounded-xl p-5 text-white shadow-lg relative overflow-hidden">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[12px] text-gray-800">Total unpayed bookings</p>
                <p className="text-3xl text-blue-700 font-bold mt-2">10</p>
              </div>
              <div className="w-14 h-14 bg-black/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <BsCashStack className="w-7 h-7 text-black" />
              </div>
            </div>
            <div className="pt-3 border-t  text-center border-gray-400">
              <p className="text-[15px] text-gray-600">
                Pay for unpayed bookings to confirm  
              </p>
              <span className='text-gray-600 text-[15px] text-center'>reservations</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-2">
        <div className="bg-white rounded-lg overflow-hidden">
          {/* Toolbar */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
              {/* Search Bar */}
              <div className="relative w-full lg:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by ID, destination, or agency..."
                  className="w-full pl-9 pr-3 py-2.5 text-[14px] border border-gray-300 rounded-lg focus:border-blue-800 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                />
              </div>

              <div className="flex gap-3">
                <select
                  value={selectedDestination}
                  onChange={(e) => setSelectedDestination(e.target.value)}
                  className="px-4 py-2.5 text-[14px] border border-gray-300 rounded-lg focus:border-blue-800 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                >
                  <option value="all">All Destinations</option>
                  {destinations.map((dest) => (
                    <option key={dest} value={dest}>{dest}</option>
                  ))}
                </select>

                <input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="px-4 py-2.5 text-[14px] border border-gray-300 rounded-lg focus:border-blue-800 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                />

                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2.5 text-[14px] font-medium rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-200 flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Status Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'unpaid' | 'paid')}
                  className={`px-4 py-2 rounded-lg text-[14px] font-medium whitespace-nowrap transition-all duration-200 flex items-center gap-2 ${
                    tab.id === activeTab 
                      ? tab.id === 'unpaid'
                        ? 'bg-gradient-to-r from-orange-600 to-orange-700 text-white shadow-md'
                        : 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tab.id === 'unpaid' ? <Clock className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                  {tab.label}
                  <span className={`ml-1 px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                    tab.id === activeTab ? 'bg-white/20' : 'bg-gray-300'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Payments Table */}
          <div className="overflow-x-auto pb-5">
            {filteredBookings.length > 0 ? (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th className="py-5 px-6 text-left">
                      <span className="text-[14px] font-semibold text-black">Destination</span>
                    </th>
                    <th className="py-5 px-6 text-left">
                      <span className="text-[14px] font-semibold text-black">Check-in Date</span>
                    </th>
                    <th className="py-5 px-6 text-left">
                      <span className="text-[14px] font-semibold text-black">Passengers</span>
                    </th>
                    <th className="py-5 px-6 text-left">
                      <span className="text-[14px] font-semibold text-black">Agency</span>
                    </th>
                    <th className="py-5 px-6 text-left">
                      <span className="text-[14px] font-semibold text-black">Amount</span>
                    </th>
                    <th className="py-5 px-6 text-left">
                      <span className="text-[14px] font-semibold text-black">Status</span>
                    </th>
                    <th className="py-5 px-6 text-left">
                      <span className="text-[14px] font-semibold text-black">Action</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((booking) => (
                    <tr key={booking.id} className="border-b border-gray-100 hover:bg-blue-50/30 transition-colors">
                      <td className="py-5 px-6">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="font-medium text-[14px] text-gray-900">{booking.destination}</span>
                        </div>
                      </td>
                      <td className="py-5 px-6">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-[14px] text-gray-900 whitespace-nowrap">
                            {new Date(booking.checkIn).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                      </td>
                      <td className="py-5 px-6">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span className="font-semibold text-[14px] text-gray-900">{booking.passengers}</span>
                        </div>
                      </td>
                      <td className="py-5 px-6">
                        <span className="text-[14px] text-gray-700">{booking.agency}</span>
                      </td>
                      <td className="py-5 px-6">
                        <span className="font-semibold text-[14px] text-gray-900">${booking.amount.toLocaleString()}</span>
                      </td>
                      <td className="py-5 px-6">
                        {booking.isPaid ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-[13px] font-medium bg-green-100 text-green-800 border-green-200">
                            <CheckCircle className="w-3.5 h-3.5" />
                            Paid
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-[13px] font-medium bg-orange-100 text-orange-800 border-orange-200">
                            <Clock className="w-3.5 h-3.5" />
                            Unpaid
                          </span>
                        )}
                      </td>
                      <td className="py-5 px-6">
                        {!booking.isPaid ? (
                          <button
                            onClick={() => handlePayClick(booking)}
                            className="px-4 py-2 text-[13px] font-medium rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-800 hover:to-blue-900 transition-all duration-200 flex items-center gap-2"
                          >
                            <CreditCard className="w-4 h-4" />
                            Pay now
                          </button>
                        ) : (
                          <span className="text-[13px] text-gray-400 italic">Completed</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No payments found</h3>
                <p className="text-gray-600 text-[14px]">
                  {searchQuery || hasActiveFilters ? 'Try adjusting your filters' : 'No payment records available'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && selectedBooking && (
        <div className="fixed inset-0 bg-black/50  z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full overflow-hidden">
            <div className="p-4   flex justify-between items-center">
              <div className="flex items-center gap-3">
              <h2 className="text-[15px] font-semibold text-black">Process Payment</h2>
              </div>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="p-2 hover:bg-white/10 cursor-pointer rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-black" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Booking Details */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[14px] text-gray-600">Booking ID</span>
                  <span className="font-mono text-[14px] font-medium text-gray-900">{selectedBooking.id}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[14px] text-gray-600">Destination</span>
                  <span className="text-[14px] font-medium text-gray-900">{selectedBooking.destination}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[14px] text-gray-600">Passengers</span>
                  <span className="text-[14px] font-medium text-gray-900">{selectedBooking.passengers}</span>
                </div>
                <div className="pt-3 border-t border-gray-200 flex justify-between items-center">
                  <span className="text-[16px] font-semibold text-gray-900">Total Amount</span>
                  <span className="text-[20px] font-bold text-blue-700">${selectedBooking.amount.toLocaleString()}</span>
                </div>
              </div>

              {/* Phone Input */}
              <div>
                <label className="block text-[14px] font-medium text-gray-700 mb-2">
                  Mobile Money Number
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+250 7XX XXX XXX"
                  className="w-full px-4 py-3 text-[14px] border-2 border-gray-300 rounded-lg focus:border-blue-800 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                />
                <p className="mt-2 text-[12px] text-gray-500">Enter your MTN or Airtel Money number</p>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex gap-3">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="flex-1 px-4 py-2.5 text-[14px] font-medium rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmPayment}
                disabled={!phoneNumber}
                className="flex-1 px-4 py-2.5 text-[14px] font-medium rounded-lg bg-gradient-to-r from-blue-700 to-blue-800 text-white hover:from-blue-800 hover:to-blue-900 transition-all disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed"
              >
                Confirm Payment
              </button>
            </div>
          </div>
        </div>
      )}

      
    </div>
  );
}

export default PaymentsDashboard;