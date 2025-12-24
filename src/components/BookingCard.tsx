import { Calendar, MapPin, Users, DollarSign, Check, Wallet, Clock, CreditCard, Shield, ChevronRight, Phone, Mail, User } from 'lucide-react';
import { Booking } from './BookingDashboard';
import { useState } from 'react';

interface BookingCardProps {
  booking: Booking;
  onPayClick: (booking: Booking) => void;
  onViewDetails?: (booking: Booking) => void;
}

export function BookingCard({ booking, onPayClick, onViewDetails }: BookingCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'confirmed': return { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' };
      case 'pending': return { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' };
      case 'cancelled': return { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' };
      default: return { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200' };
    }
  };

  const statusColors = getStatusColor(booking.status || 'confirmed');

  return (
    <div 
      className={`bg-white rounded-xl border ${statusColors.border} shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden relative group ${
        isHovered ? 'border-blue-200' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top status bar */}
      <div className={`px-6 py-3 ${statusColors.bg} border-b ${statusColors.border} flex items-center justify-between`}>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${booking.isPaid ? 'bg-green-500' : 'bg-amber-500'}`}></div>
          <span className={`text-sm font-medium ${statusColors.text}`}>
            {booking.isPaid ? 'Confirmed & Paid' : 'Payment Pending'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Booking ID:</span>
          <span className="text-sm font-mono font-medium text-gray-700">#{booking.id}</span>
        </div>
      </div>

      {/* Main content */}
      <div className="p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left column - Booking info */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{booking.agency}</h3>
                </div>
                <p className="text-sm text-gray-500 mt-1">Booked on {formatDate(booking.bookingDate || new Date().toISOString())}</p>
              </div>

              {booking.isPaid && (
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-100 border border-green-200">
                  <Check className="w-4 h-4 text-green-700" />
                  <span className="text-sm font-medium text-green-800">Paid</span>
                </div>
              )}
            </div>

            {/* Journey details */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-blue-50/50 rounded-lg border border-blue-100">
                <MapPin className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="text-sm text-gray-500">Destination</div>
                  <div className="font-medium text-gray-900">{booking.destination}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50/50 rounded-lg border border-gray-100">
                  <Calendar className="w-4 h-4 text-gray-600" />
                  <div>
                    <div className="text-sm text-gray-500">Check-in</div>
                    <div className="font-medium text-gray-900">{formatDate(booking.checkIn)}</div>
                  </div>
                </div>

                {booking.checkOut && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50/50 rounded-lg border border-gray-100">
                    <Calendar className="w-4 h-4 text-gray-600" />
                    <div>
                      <div className="text-sm text-gray-500">Check-out</div>
                      <div className="font-medium text-gray-900">{formatDate(booking.checkOut)}</div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-700">{booking.passengers} {booking.passengers === 1 ? 'Person' : 'People'}</span>
                </div>
                
                {booking.roomType && (
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-700">{booking.roomType}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right column - Payment & Actions */}
          <div className="lg:w-72 border-l lg:border-l lg:border-gray-200 lg:pl-6">
            <div className="space-y-4">
              {/* Amount */}
              <div className="text-center lg:text-right">
                <div className="text-sm text-gray-500 mb-1">Total Amount</div>
                <div className="text-2xl font-bold text-gray-900 mb-2">
                  {booking.amount.toLocaleString('en-US')} RFW
                </div>
                <div className="text-xs text-gray-400">Including taxes & fees</div>
              </div>

              {/* Payment status */}
              {!booking.isPaid ? (
                <div className="space-y-4">
                  <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-amber-600" />
                        <span className="text-sm font-medium text-amber-700">Payment Due</span>
                      </div>
                      {booking.dueDate && (
                        <span className="text-xs text-amber-600">{formatDate(booking.dueDate)}</span>
                      )}
                    </div>
                    <p className="text-xs text-amber-600">Complete payment to confirm your booking</p>
                  </div>

                  <button
                    onClick={() => onPayClick(booking)}
                    className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow group"
                  >
                    <Wallet className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span>Pay Now</span>
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-700">Payment Confirmed</span>
                    </div>
                    <p className="text-xs text-green-600">
                      Paid on {formatDate(booking.paymentDate || new Date().toISOString())}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => onViewDetails?.(booking)}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-sm"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => window.print()}
                      className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                      title="Print Receipt"
                    >
                      <CreditCard className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Quick actions */}
              <div className="pt-4 border-t border-gray-200">
                <div className="text-xs text-gray-500 mb-2">Quick Actions</div>
                <div className="flex gap-2">
                  <button
                    onClick={() => window.location.href = `tel:${booking.agencyPhone || ''}`}
                    className="flex-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1"
                  >
                    <Phone className="w-3 h-3" />
                    Call
                  </button>
                  <button
                    onClick={() => window.location.href = `mailto:${booking.agencyEmail || ''}`}
                    className="flex-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1"
                  >
                    <Mail className="w-3 h-3" />
                    Email
                  </button>
                  {onViewDetails && (
                    <button
                      onClick={() => onViewDetails(booking)}
                      className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors"
                      title="More options"
                    >
                      ···
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress indicator for pending bookings */}
      {!booking.isPaid && (
        <div className="px-6 pb-4">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span>Payment progress</span>
            <span>0% complete</span>
          </div>
          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full w-0 group-hover:w-1/3 transition-all duration-1000"
            ></div>
          </div>
        </div>
      )}

      {/* Hover effect indicator */}
      <div className={`absolute top-0 right-0 w-1 h-full bg-blue-500 transform transition-transform duration-300 ${
        isHovered ? 'translate-x-0' : 'translate-x-full'
      }`}></div>
    </div>
  );
}