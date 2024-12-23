import { useEffect, useState } from 'react'
import { User, QrCode } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import GoBackButton from '../../components/GoBackButton'
import { participantService } from '../../services/api'

export default function CheckIn() {
  const { user, logout } = useAuth()
  const [qrCode, setQrCode] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchQRCode = async () => {
      try {
        const qrCodeData = await participantService.getParticipantInfoQR()
        setQrCode(qrCodeData)
      } catch (error) {
        console.error('Error fetching QR code:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchQRCode()
  }, [])

  const checkInMessage = user?.message?.checkIn
    ? "You are checked in."
    : "You are not checked in yet."

  return (
    <div className="min-h-screen h-screen flex flex-col bg-[#191E29]">
      <div className="flex justify-between items-center p-4 md:p-8">
        <GoBackButton />
        <button
          onClick={logout}
          className="text-white hover:text-[#01C38D] transition-colors"
        >
          Logout
        </button>
      </div>

      <div className="flex-grow flex items-center justify-center px-4 md:px-8 pb-4 md:pb-8">
        <div className="w-full max-w-4xl border-2 border-[#01C38D] rounded-lg p-4 sm:p-8 bg-[#132D46] space-y-6 sm:space-y-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white flex items-center font-tt-commons">
            <QrCode className="mr-4 h-8 w-8 sm:h-10 sm:w-10 text-[#01C38D]" />
            Check-in
          </h1>

          <p className="text-lg sm:text-xl text-white text-center">{checkInMessage}</p>

          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
            <div className="bg-[#191E29] p-4 sm:p-6 rounded-lg text-center border-2 border-[#01C38D]">
              {loading ? (
                <div className="flex items-center justify-center h-48 sm:h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#01C38D]"></div>
                </div>
              ) : (
                <img
                  src={qrCode}
                  alt="Participant QR Code"
                  className="mx-auto w-48 h-48 sm:w-64 sm:h-64"
                />
              )}
              <p className="mt-4 text-sm sm:text-base text-[#696E79]">
                Your Check-in QR Code
              </p>
            </div>

            <div className="bg-[#191E29] p-4 sm:p-6 rounded-lg border-2 border-[#01C38D]">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center font-tt-commons">
                <User className="mr-2 h-5 w-5 sm:h-6 sm:w-6 text-[#01C38D]" />
                User Profile
              </h2>
              <div className="space-y-2 sm:space-y-4 text-left">
                <ProfileItem label="Name" value={user?.message?.name} />
                <ProfileItem label="Email" value={user?.message?.email} />
                <ProfileItem label="Role" value={user?.message?.role} />
                <ProfileItem label="Workplace" value={user?.message?.food?.work} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProfileItem({ label, value }) {
  return (
    <p className="text-sm sm:text-base text-[#696E79]">
      <strong className="text-white">{label}:</strong> {value || 'N/A'}
    </p>
  )
}

