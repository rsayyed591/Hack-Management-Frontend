import { useState, useEffect } from 'react'
import { Combobox } from '@headlessui/react'
import { Users } from 'lucide-react'
import { adminService } from '../../services/api'
import Loader from '../../components/Loader'

export default function Teams() {
  const [teams, setTeams] = useState([])
  const [filteredTeams, setFilteredTeams] = useState([])
  const [selectedTeam, setSelectedTeam] = useState(null)
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchTeams = async () => {
      setLoading(true)
      try {
        const response = await adminService.getTeams()
        setTeams(response.data || [])
        setFilteredTeams(response.data || [])
      } catch (err) {
        setError('Failed to fetch teams')
      } finally {
        setLoading(false)
      }
    }
    fetchTeams()
  }, [])

  useEffect(() => {
    if (selectedTeam) {
      setFilteredTeams([selectedTeam])
    } else if (query === '') {
      setFilteredTeams(teams)
    } else {
      const filtered = teams.filter((team) =>
        team.teamName.toLowerCase().includes(query.toLowerCase()) ||
        team.teamLead.toLowerCase().includes(query.toLowerCase()) ||
        team.teamMembers.some((member) =>
          member.name.toLowerCase().includes(query.toLowerCase()) ||
          member.email.toLowerCase().includes(query.toLowerCase())
        )
      )
      setFilteredTeams(filtered)
    }
  }, [query, teams, selectedTeam])

  const handleSelect = (team) => {
    setSelectedTeam(team)
    setQuery(team ? team.teamName : '')
  }

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
        <Users className="h-6 w-6 text-[#01C38D]" />
        <h1 className="text-2xl font-bold text-white">View Teams</h1>
      </div>

      <Combobox value={selectedTeam} onChange={handleSelect}>
        <div className="relative w-full">
          <Combobox.Input
            className="w-full px-4 py-2 border border-[#01C38D] bg-[#191E29] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#01C38D]"
            placeholder="Search teams..."
            displayValue={(team) => team?.teamName || query}
            onChange={(event) => {
              setQuery(event.target.value)
              setSelectedTeam(null)
            }}
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
                  {team.teamName} - {team.teamLead}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </div>
      </Combobox>

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
            {filteredTeams.map((team) => (
              <tr key={team._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{team.teamName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  <ul>
                    {team.teamMembers.map((member, index) => (
                      <li key={index}>{member.name} ({member.email})</li>
                    ))}
                  </ul>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{team.teamLead}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  {team.editedBy?.name} ({team.editedBy?.email})
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

