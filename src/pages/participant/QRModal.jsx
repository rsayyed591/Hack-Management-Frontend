import { X } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'

export default function QRModal({ isOpen, onClose, title, qrValue }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-4 sm:p-8 rounded-lg max-w-sm w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl sm:text-2xl font-bold font-orbitron">{title}</h2>
          <button onClick={onClose} className="text-black hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="flex justify-center mb-4">
          <QRCodeSVG value={qrValue} size={200} />
        </div>
        <p className="text-center font-poppins">Scan this QR code</p>
      </div>
    </div>
  )
}

