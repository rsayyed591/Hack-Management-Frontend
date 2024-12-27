import { useState, useEffect } from 'react'
import { UserCog } from 'lucide-react'
import { superAdminService } from '../../services/api'
import Loader from '../../components/Loader'

export default function AssignedJudges() {
  const [assignedJudges, setAssignedJudges] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchAssignedJudges = async () => {
      try {
        const response = await superAdminService.getAssignedJudges()

        // Sort data alphabetically by judge name (A to Z)
        const sortedJudges = response.data.sort((a, b) =>
          a.judge.name.localeCompare(b.judge.name)
        )

        setAssignedJudges(sortedJudges)
      } catch (err) {
        setError('Failed to fetch assigned judges')
      } finally {
        setLoading(false)
      }
    }

    fetchAssignedJudges()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center lg:h-[70vh] bg-[#191E29]">
        <Loader />
      </div>
    )
  }

  if (error) {
    return <p className="text-red-600">{error}</p>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <UserCog className="h-6 w-6 text-[#01C38D]" />
        <h1 className="text-2xl font-bold text-white">Assigned Judges</h1>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-[#01C38D]">
          <thead className="bg-[#132D46]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#01C38D] uppercase tracking-wider">
                Judge
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#01C38D] uppercase tracking-wider">
                Assigned Teams
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#01C38D] uppercase tracking-wider">
                Edited By
              </th>
            </tr>
          </thead>
          <tbody className="bg-[#191E29] divide-y divide-[#01C38D]">
            {assignedJudges.map((assignment) => (
              <tr key={assignment._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  {assignment.judge.name} ({assignment.judge.email})
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  <ul>
                    {assignment.teamAssgined.map((team) => (
                      <li key={team._id}>{team.teamName}</li>
                    ))}
                  </ul>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  {assignment.editedBy.name} ({assignment.editedBy.email})
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
