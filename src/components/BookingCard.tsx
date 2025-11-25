import { Calendar, MapPin, Users, DollarSign, Check, Wallet } from 'lucide-react';
import { Booking } from './BookingDashboard';

interface BookingCardProps {
  booking: Booking;
  onMarkAsPaid: (bookingId: string) => void;
}

export function BookingCard({ booking, onMarkAsPaid }: BookingCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-100 shadow-sm shadow-gray-50 p-6 h-[200px]   transition-shadow">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-black -ml-[3px] bg-zinc-50 p-1 rounded mb-1">Booking Confirmed</h3>
              <p className="text-gray-600">{booking.agency}</p>
            </div>
            
            {booking.isPaid && (
              <span className="inline-flex items-center gap-1 px-8 py-1 rounded-lg bg-green-100 text-green-800">
                <Check className="w-4 h-4" />
                Paid
              </span>
            )}
           
          </div>
          
          <div className="">
            <div className="flex items-center gap-2 text-gray-700">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span>{formatDate(booking.checkIn)} </span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-center gap-2 text-black">
              <MapPin className="w-4 h-4 text-blue-700" />
              <span>{booking.destination}</span>
            </div>
            <div className="flex items-center gap-2 text-black">
              <Users className="w-4 h-4 text-blue-700" />
              <span>{booking.passengers} {booking.passengers === 1 ? 'Passenger' : 'Passengers'}</span>
            </div>
          </div>
        </div>

        <div className="mt-15">
          <div className="flex items-center gap-2">
            <span className="text-blue-800 mb-1">{booking.amount.toLocaleString()}RFW</span>
          </div>
          {!booking.isPaid && (
            <button
              onClick={() => onMarkAsPaid(booking.id)}
              className="px-4 py-2 bg-blue-50 cursor-pointer flex text-black font-medium text-[14px] rounded-md hover:bg-red-800 transition-colors duration-500 "
            >
                <Wallet className='w-4 mt-[2px] mr-2 h-4'/>
              Pay
            </button>
          )}
        </div>
      </div>
    </div>
  );
}