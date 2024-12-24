import { useState, useEffect } from 'react'
import { Trophy } from 'lucide-react'
import { superAdminService } from '../../services/api'

export default function LeaderBoard() {
  const [leaderboard, setLeaderboard] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await superAdminService.getLeaderboard()
        setLeaderboard(response.data)
      } catch (err) {
        setError('Failed to fetch leaderboard')
      }
    }
    fetchLeaderboard()
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Trophy className="h-6 w-6 text-[#01C38D]" />
        <h1 className="text-2xl font-bold text-white">Leaderboard</h1>
      </div>
      {error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#01C38D]">
            <thead className="bg-[#132D46]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#01C38D] uppercase tracking-wider">Rank</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#01C38D] uppercase tracking-wider">Team Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#01C38D] uppercase tracking-wider">Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#01C38D] uppercase tracking-wider">Judge</th>
              </tr>
            </thead>
            <tbody className="bg-[#191E29] divide-y divide-[#01C38D]">
              {leaderboard.map((team, index) => (
                <tr key={team._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{team.teamName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{team.total}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{team.judgeName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

