import { useState, useEffect } from 'react'
import { Users } from 'lucide-react'
import { adminService } from '../../services/api'
import Loader from '../../components/Loader'

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalParticipants: 0,
    totalTeams: 0,
    totalCheckedIn: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchDashboardStats = async () => {
      setLoading(true)
      try {
        const data = await adminService.getDashboardStats()
        setStats(data)
      } catch (err) {
        setError(err.message || 'Failed to fetch dashboard stats')
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardStats()
  }, [])

  if (loading) {
    return <div className="flex items-center justify-center lg:h-[70vh] bg-[#191E29]">
      <Loader />
    </div>
  }

  if (error) {
    return (
      <div className="bg-red-500/10 text-red-500 p-4 rounded-lg">
        {error}
      </div>
    )
  }

  const remainingParticipants = stats.totalParticipants - stats.totalCheckedIn

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="bg-[#132D46] border-2 border-[#01C38D] rounded-lg p-4 sm:p-6">
        <div className="flex items-center space-x-4">
          <div className="bg-[#01C38D]/10 p-2 sm:p-3 rounded-lg">
            <Users className="w-5 h-5 sm:w-6 sm:h-6 text-[#01C38D]" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-medium text-[#696E79]">Total Participants</h3>
            <p className="text-xl sm:text-2xl font-bold text-white">{stats.totalParticipants}</p>
          </div>
        </div>
      </div>

      <div className="bg-[#132D46] border-2 border-[#01C38D] rounded-lg p-4 sm:p-6">
        <div className="flex items-center space-x-4">
          <div className="bg-[#01C38D]/10 p-2 sm:p-3 rounded-lg">
            <Users className="w-5 h-5 sm:w-6 sm:h-6 text-[#01C38D]" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-medium text-[#696E79]">Total Teams</h3>
            <p className="text-xl sm:text-2xl font-bold text-white">{stats.totalTeams}</p>
          </div>
        </div>
      </div>

      <div className="bg-[#132D46] border-2 border-[#01C38D] rounded-lg p-4 sm:p-6">
        <div className="flex items-center space-x-4">
          <div className="bg-[#01C38D]/10 p-2 sm:p-3 rounded-lg">
            <Users className="w-5 h-5 sm:w-6 sm:h-6 text-[#01C38D]" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-medium text-[#696E79]">Total Check In Participants</h3>
            <p className="text-xl sm:text-2xl font-bold text-white">{stats.totalCheckedIn}</p>
          </div>
        </div>
      </div>

      <div className="bg-[#132D46] border-2 border-[#01C38D] rounded-lg p-4 sm:p-6">
        <div className="flex items-center space-x-4">
          <div className="bg-[#01C38D]/10 p-2 sm:p-3 rounded-lg">
            <Users className="w-5 h-5 sm:w-6 sm:h-6 text-[#01C38D]" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-medium text-[#696E79]">Remaining Participants</h3>
            <p className="text-xl sm:text-2xl font-bold text-white">{remainingParticipants}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

