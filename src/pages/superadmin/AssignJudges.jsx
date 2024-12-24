import { useState, useEffect } from 'react'
import { UserCog } from 'lucide-react'
import { superAdminService } from '../../services/api'

export default function AssignJudges() {
  const [judges, setJudges] = useState([])
  const [teams, setTeams] = useState([])
  const [assignments, setAssignments] = useState({})
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [judgesData, teamsData] = await Promise.all([
          superAdminService.getParticipants(),
          superAdminService.getTeams()
        ])
        setJudges(judgesData.data.filter(user => user.role === 'judge'))
        setTeams(teamsData.data)
      } catch (err) {
        setError('Failed to fetch data')
      }
    }
    fetchData()
  }, [])

  const handleAssignment = (teamId, judgeId) => {
    setAssignments({ ...assignments, [teamId]: judgeId })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    try {
      await superAdminService.assignTeamsJudge(assignments)
      setSuccess('Judges assigned successfully')
    } catch (err) {
      setError(err.message || 'Failed to assign judges')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <UserCog className="h-6 w-6 text-[#01C38D]" />
        <h1 className="text-2xl font-bold text-white">Assign Judges</h1>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#01C38D]">
            <thead className="bg-[#132D46]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#01C38D] uppercase tracking-wider">Team</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#01C38D] uppercase tracking-wider">Assign Judge</th>
              </tr>
            </thead>
            <tbody className="bg-[#191E29] divide-y divide-[#01C38D]">
              {teams.map((team) => (
                <tr key={team._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{team.teamName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={assignments[team._id] || ''}
                      onChange={(e) => handleAssignment(team._id, e.target.value)}
                      className="mt-1 block w-full rounded-md bg-[#132D46] border-[#01C38D] text-white shadow-sm focus:border-[#01C38D] focus:ring focus:ring-[#01C38D] focus:ring-opacity-50"
                    >
                      <option value="">Select a judge</option>
                      {judges.map((judge) => (
                        <option key={judge._id} value={judge._id}>{judge.name}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          type="submit"
          className="w-full sm:w-auto flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-[#191E29] bg-[#01C38D] hover:bg-[#01C38D]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#01C38D]"
        >
          Assign Judges
        </button>
      </form>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      {success && <p className="mt-2 text-sm text-green-600">{success}</p>}
    </div>
  )
}

