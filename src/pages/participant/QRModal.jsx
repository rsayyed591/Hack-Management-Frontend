import { X } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'

export default function QRModal({ isOpen, onClose, title, qrValue }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-[#191E29]/90 flex items-center justify-center z-50 p-4">
      <div className="bg-[#132D46] p-4 sm:p-8 rounded-lg max-w-sm w-full border-2 border-[#01C38D]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white font-tt-commons">
            {title}
          </h2>
          <button 
            onClick={onClose} 
            className="text-white hover:text-[#01C38D] transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="flex justify-center mb-4 bg-white p-4 rounded-lg">
          <QRCodeSVG 
            value={qrValue} 
            size={200}
            level="H"
            fgColor="#191E29"
          />
        </div>
        <p className="text-center text-[#696E79]">
          Scan this QR code
        </p>
      </div>
    </div>
  )
}

