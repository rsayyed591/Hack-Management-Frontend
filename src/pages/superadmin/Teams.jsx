import { useState, useEffect } from 'react'
import { Combobox } from '@headlessui/react'
import { Users } from 'lucide-react'
import { superAdminService } from '../../services/api'
import Loader from '../../components/Loader'

export default function Teams() {
  const [teams, setTeams] = useState([])
  const [filteredTeams, setFilteredTeams] = useState([])
  const [selectedTeam, setSelectedTeam] = useState('')
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Fetch teams
  useEffect(() => {
    const fetchTeams = async () => {
      setLoading(true)
      try {
        const response = await superAdminService.getTeams()
        setTeams(response.data || [])
        setFilteredTeams(response.data || []) // Initialize filtered teams
      } catch (err) {
        setError('Failed to fetch teams')
      } finally {
        setLoading(false)
      }
    }
    fetchTeams()
  }, [])

  // Filter teams based on query
  useEffect(() => {
    const filtered = query === ''
      ? teams
      : teams.filter((team) =>
          team.teamName.toLowerCase().includes(query.toLowerCase()) ||
          team.teamLead.toLowerCase().includes(query.toLowerCase()) ||
          team.teamMembers.some((member) =>
            member.name.toLowerCase().includes(query.toLowerCase())
          )
        )
    setFilteredTeams(filtered)
  }, [query, teams])

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center lg:h-[70vh] bg-[#191E29]">
        <Loader />
      </div>
    )
  }

  // Error state
  if (error) {
    return <p className="text-red-600">{error}</p>
  }

  // Render teams
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Users className="h-6 w-6 text-[#01C38D]" />
        <h1 className="text-2xl font-bold text-white">View Teams</h1>
      </div>

      {/* Search Box */}
      <Combobox value={selectedTeam} onChange={setSelectedTeam}>
        <div className="relative w-full mb-4">
          <Combobox.Input
            className="w-full px-4 py-2 border border-[#01C38D] bg-[#191E29] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#01C38D]"
            placeholder="Search teams..."
            onChange={(event) => setQuery(event.target.value)}
          />
          <Combobox.Options className="absolute mt-2 w-full bg-[#132D46] border border-[#01C38D] rounded-md shadow-lg max-h-60 overflow-auto z-50">
            {filteredTeams.length === 0 && query !== '' ? (
              <div className="p-2 text-white">No teams found.</div>
            ) : (
              filteredTeams.map((team) => (
                <Combobox.Option
                  key={team._id}
                  value={team}
                  className={({ active }) =>
                    `p-2 cursor-pointer ${active ? 'bg-[#01C38D] text-[#191E29]' : 'text-white'}`
                  }
                >
                  {team.teamName}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </div>
      </Combobox>

      {filteredTeams.length === 0 ? (
        <p className="text-white">No teams found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#01C38D]">
            <thead className="bg-[#132D46]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#01C38D] uppercase tracking-wider">
                  Team Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#01C38D] uppercase tracking-wider">
                  Team Members
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#01C38D] uppercase tracking-wider">
                  Team Lead
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#01C38D] uppercase tracking-wider">
                  Edited By
                </th>
              </tr>
            </thead>
            <tbody className="bg-[#191E29] divide-y divide-[#01C38D]">
              {filteredTeams.map((team) => (
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
