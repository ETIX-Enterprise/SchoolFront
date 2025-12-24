// PaymentModal.tsx
import { X, Phone, DollarSign } from "lucide-react";
import { useState } from "react";
interface PaymentModalProps {
  isOpen: boolean;
  amount: number;
  onClose: () => void;
  onConfirm: (phone: string) => void;
}

export function PaymentModal({
  isOpen,
  amount,
  onClose,
  onConfirm,
}: PaymentModalProps) {
  const [phone, setPhone] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-full max-w-md rounded-lg p-6 shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[16px] font-semibold text-gray-800">Make Payment </h2>
          <button className="cursor-pointer hover:bg-red-100 transition-all duration-500 p-1 rounded-full" onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Amount */}
        <div className="flex items-center text-[15px] justify-center gap-2 mb-4 bg-green-50 p-3 rounded-lg">
          Amount :
          <span className=" text-blue-800 font-medium">
            {amount.toLocaleString()} RWF
          </span>
        </div>

        {/* Phone Input */}
        <div className="mb-4">
          <label className="text-sm text-gray-600 mb-1 block">
            Mobile Money Phone Number
          </label>
          <div className="flex items-center gap-2 border rounded px-3 py-2">
            <Phone className="w-4 h-4 text-gray-800" />
            <input
              type="tel"
              placeholder="07XXXXXXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full outline-none"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-[14px] bg-red-50 text-red-600 hover:bg-red-100 transition-all duration-500 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(phone)}
            disabled={!phone}
            className="px-4 py-2 rounded-lg text-[14px] cursor-pointer transition-all duration-500 bg-blue-800 text-white hover:bg-blue-900 disabled:bg-gray-300"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
}
