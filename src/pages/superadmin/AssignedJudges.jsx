import { useState, useEffect } from 'react'
import { UserCog } from 'lucide-react'
import { superAdminService } from '../../services/api'
import Loader from '../../components/Loader'
import { Combobox } from '@headlessui/react'

export default function AssignedJudges() {
  const [assignedJudges, setAssignedJudges] = useState([])
  const [selectedJudge, setSelectedJudge] = useState('')
  const [query, setQuery] = useState('')
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

  const filteredJudges =
    query === ''
      ? assignedJudges
      : assignedJudges.filter((assignment) =>
          assignment.judge.name.toLowerCase().includes(query.toLowerCase()) ||
          assignment.judge.email.toLowerCase().includes(query.toLowerCase())
        )

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

      {/* Combobox Search Functionality */}
      <Combobox value={selectedJudge} onChange={setSelectedJudge}>
        <div className="relative w-full">
          <Combobox.Input
            className="w-full px-4 py-2 border border-[#01C38D] bg-[#191E29] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#01C38D]"
            placeholder="Search judges..."
            onChange={(event) => setQuery(event.target.value)}
          />
          <Combobox.Options className="absolute mt-2 w-full bg-[#132D46] border border-[#01C38D] rounded-md shadow-lg max-h-60 overflow-auto z-50">
            {filteredJudges.length === 0 && query !== '' ? (
              <div className="p-2 text-white">No judges found.</div>
            ) : (
              filteredJudges.map((assignment) => (
                <Combobox.Option
                  key={assignment._id}
                  value={assignment}
                  className={({ active }) =>
                    `p-2 cursor-pointer ${active ? 'bg-[#01C38D] text-[#191E29]' : 'text-white'}`
                  }
                >
                  {assignment.judge.name} ({assignment.judge.email})
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </div>
      </Combobox>

      {/* Displaying Assigned Judges Table */}
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
            {filteredJudges.map((assignment) => (
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
