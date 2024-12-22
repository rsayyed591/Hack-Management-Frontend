import { useState } from 'react'
import { QrCode, User } from 'lucide-react'
import QRModal from './QRModal'
import { useAuth } from '../../contexts/AuthContext'

export default function CheckIn() {
  const [isQRModalOpen, setIsQRModalOpen] = useState(false)
  const { user } = useAuth() // Get user data from AuthContext

  const checkInMessage = user?.message.checkIn
    ? "You are checked in."
    : "You are not checked in yet.";

  return (
    <div className="min-h-screen p-4 md:p-8 bg-[#191E29]">
      <div className="max-w-4xl mx-auto border-2 border-[#01C38D] rounded-lg p-4 sm:p-8 bg-[#132D46]">
        <h1 className="text-4xl font-bold text-white mb-8 flex items-center font-tt-commons">
          <QrCode className="mr-4 h-10 w-10 text-[#01C38D]" />
          Check-in
        </h1>
        
        {/* Display check-in status */}
        <p className="text-lg text-white text-center mb-8 sm:mb-12">{checkInMessage}</p>

        <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
          <div className="bg-[#191E29] p-4 sm:p-8 rounded-lg text-center border-2 border-[#01C38D]">
            <div 
              className="w-48 h-48 sm:w-64 sm:h-64 mx-auto bg-[#132D46] border-2 border-[#01C38D] rounded-lg flex items-center justify-center cursor-pointer hover:bg-[#132D46]/80"
              onClick={() => setIsQRModalOpen(true)}
            >
              <span className="text-white">QR Code</span>
            </div>
            <p className="mt-4 sm:mt-6 text-[#696E79]">Click the QR code to enlarge</p>
          </div>
          <div className="bg-[#191E29] p-4 sm:p-8 rounded-lg border-2 border-[#01C38D]">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center font-tt-commons">
              <User className="mr-2 h-5 w-5 sm:h-6 sm:w-6 text-[#01C38D]" />
              User Profile
            </h2>
            <div className="space-y-2 sm:space-y-4 text-left">
              <p className="text-[#696E79]"><strong className="text-white">Name:</strong> {user?.message.name}</p>
              <p className="text-[#696E79]"><strong className="text-white">Email:</strong> {user?.message.email}</p>
              <p className="text-[#696E79]"><strong className="text-white">Role:</strong> {user?.message.role}</p>
              <p className="text-[#696E79]"><strong className="text-white">Workplace:</strong>{user?.message.food.work}</p>
            </div>
          </div>
        </div>
      </div>

      <QRModal 
        isOpen={isQRModalOpen} 
        onClose={() => setIsQRModalOpen(false)} 
        title="Check-in QR Code"
        qrValue="check-in-qr-code"
      />
    </div>
  )
}
