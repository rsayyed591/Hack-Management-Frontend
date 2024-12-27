import { useState, useEffect } from 'react'
import { Users, Trophy } from 'lucide-react'
import { superAdminService } from '../../services/api'
import Loader from '../../components/Loader'

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalParticipants: 0,
    totalTeams: 0,
    topTeams: []
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchDashboardStats = async () => {
      setLoading(true)
      try {
        const data = await superAdminService.getDashboardStats()
        setStats({
          totalParticipants: data.totalParticipants,
          totalTeams: data.totalTeams,
          topTeams: data.topTeams.map(team => ({
            id: team._id,
            name: team.teamName,
            score: team.total,
            judge: team.judgeName
          }))
        })
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

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
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
      </div>

      {/* Top 5 Teams */}
      <div className="bg-[#132D46] border-2 border-[#01C38D] rounded-lg p-4 sm:p-6">
        <div className="flex items-center space-x-3 mb-4 sm:mb-6">
          <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-[#01C38D]" />
          <h2 className="text-lg sm:text-xl font-bold text-white">Top 5</h2>
        </div>
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="inline-block min-w-full align-middle">
            <table className="min-w-full">
              <thead>
                <tr className="text-left border-b border-[#01C38D]/20">
                  <th className="pb-3 px-4 sm:px-6 text-xs sm:text-sm font-medium text-[#696E79]">Rank</th>
                  <th className="pb-3 px-4 sm:px-6 text-xs sm:text-sm font-medium text-[#696E79]">Team Name</th>
                  <th className="pb-3 px-4 sm:px-6 text-xs sm:text-sm font-medium text-[#696E79]">Score</th>
                  <th className="pb-3 px-4 sm:px-6 text-xs sm:text-sm font-medium text-[#696E79]">Judge</th>
                </tr>
              </thead>
              <tbody className="text-white">
                {stats.topTeams.map((team, index) => (
                  <tr key={team.id} className="border-b border-[#01C38D]/10">
                    <td className="py-3 px-4 sm:px-6 text-sm">{index + 1}</td>
                    <td className="py-3 px-4 sm:px-6 text-sm">{team.name}</td>
                    <td className="py-3 px-4 sm:px-6 text-sm">{team.score}</td>
                    <td className="py-3 px-4 sm:px-6 text-sm">{team.judge}</td>
                  </tr>
                ))}
                {stats.topTeams.length === 0 && (
                  <tr>
                    <td colSpan="4" className="py-4 text-center text-[#696E79] text-sm">
                      No teams available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}