import { useState, useEffect } from 'react'
import { Users } from 'lucide-react'
import { adminService } from '../../services/api'
import Loader from '../../components/Loader'

export default function Teams() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchTeams = async () => {
      setLoading(true)
      try {
        const response = await adminService.getTeams()
        setTeams(response.data || [])
      } catch (err) {
        setError('Failed to fetch teams')
      } finally {
        setLoading(false)
      }
    }
    fetchTeams()
  }, [])

  if (loading) {
    return <div className="flex items-center justify-center lg:h-[70vh] bg-[#191E29]">
      <Loader />
    </div>
  }

  if (error) {
    return <p className="text-red-600">{error}</p>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Users className="h-6 w-6 text-[#01C38D]" />
        <h1 className="text-2xl font-bold text-white">View Teams</h1>
      </div>
      {teams.length === 0 ? (
        <p className="text-white">No teams found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#01C38D]">
            <thead className="bg-[#132D46]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#01C38D] uppercase tracking-wider">Team Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#01C38D] uppercase tracking-wider">Team Members</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#01C38D] uppercase tracking-wider">Team Lead</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#01C38D] uppercase tracking-wider">Edited By</th>
              </tr>
            </thead>
            <tbody className="bg-[#191E29] divide-y divide-[#01C38D]">
              {teams.map((team) => (
                <tr key={team._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{team.teamName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    <ul>
                      {team.teamMembers.map((member, index) => (
                        <li key={index}>
                          {member.name} ({member.email})
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{team.teamLead}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {team.editedBy.name} ({team.editedBy.email})
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

