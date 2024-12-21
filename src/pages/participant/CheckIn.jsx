import { useState } from 'react'
import { QrCode, User } from 'lucide-react'
import QRModal from './QRModal'

export default function CheckIn() {
  const [isQRModalOpen, setIsQRModalOpen] = useState(false)
  const userProfile = {
    name: "Rehan Shah",
    email: "rehan@gmail.com",
    college: "Saboo",
    teamName: "Noname.json"
  }

  return (
    <div className="min-h-screen p-4 md:p-8 bg-white">
      <div className="max-w-4xl mx-auto border-2 border-black rounded-lg p-4 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-black mb-6 sm:mb-8 flex items-center font-orbitron">
          <QrCode className="mr-2 sm:mr-4 h-8 w-8 sm:h-10 sm:w-10" />
          Check-in
        </h1>
        <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
          <div className="bg-gray-100 p-4 sm:p-8 rounded-lg text-center border-2 border-black">
            <div 
              className="w-48 h-48 sm:w-64 sm:h-64 mx-auto bg-white border-2 border-black rounded-lg flex items-center justify-center cursor-pointer"
              onClick={() => setIsQRModalOpen(true)}
            >
              <span className="text-gray-800 font-poppins">QR Code</span>
            </div>
            <p className="mt-4 sm:mt-6 text-black font-poppins">Click the QR code to enlarge</p>
          </div>
          <div className="bg-gray-100 p-4 sm:p-8 rounded-lg border-2 border-black">
            <h2 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6 flex items-center font-orbitron">
              <User className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
              User Profile
            </h2>
            <div className="space-y-2 sm:space-y-4 text-left">
              <p className="font-poppins"><strong>Name:</strong> {userProfile.name}</p>
              <p className="font-poppins"><strong>Email:</strong> {userProfile.email}</p>
              <p className="font-poppins"><strong>College:</strong> {userProfile.college}</p>
              <p className="font-poppins"><strong>Team Name:</strong> {userProfile.teamName}</p>
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

