import { useState, useEffect } from 'react'
import { Combobox } from '@headlessui/react'
import { ClipboardList } from 'lucide-react'
import { superAdminService } from '../../services/api'
import Loader from '../../components/Loader'

export default function Participants() {
  const [participants, setParticipants] = useState([])
  const [filteredParticipants, setFilteredParticipants] = useState([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Fetch participants
  useEffect(() => {
    const fetchParticipants = async () => {
      setLoading(true)
      try {
        const response = await superAdminService.getParticipants()
        setParticipants(response.data || []) // Adjusted response handling
        setFilteredParticipants(response.data || []) // Set initially
      } catch (err) {
        setError('Failed to fetch participants')
      } finally {
        setLoading(false)
      }
    }

    fetchParticipants()
    const interval = setInterval(fetchParticipants, 30000) // Refresh every 30 seconds

    return () => clearInterval(interval)
  }, [])

  // Filter participants based on query
  useEffect(() => {
    setFilteredParticipants(
      query === ''
        ? participants
        : participants.filter((participant) =>
            participant.name.toLowerCase().includes(query.toLowerCase()) ||
            participant.email.toLowerCase().includes(query.toLowerCase())
          )
    )
  }, [query, participants])

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

  // Render participants
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <ClipboardList className="h-6 w-6 text-[#01C38D]" />
        <h1 className="text-2xl font-bold text-white">View Participants</h1>
      </div>
      <Combobox value={query} onChange={setQuery}>
        <div className="relative w-full">
          <Combobox.Input
            className="w-full px-4 py-2 border border-[#01C38D] bg-[#191E29] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#01C38D]"
            placeholder="Search participants..."
            onChange={(event) => setQuery(event.target.value)}
          />
          <Combobox.Options className="absolute mt-2 w-full bg-[#132D46] border border-[#01C38D] rounded-md shadow-lg max-h-60 overflow-auto z-50">
            {filteredParticipants.length === 0 && query !== '' ? (
              <div className="p-2 text-white">No participants found.</div>
            ) : (
              filteredParticipants.map((participant) => (
                <Combobox.Option
                  key={participant._id}
                  value={participant.name}
                  className={({ active }) =>
                    `p-2 cursor-pointer ${active ? 'bg-[#01C38D] text-[#191E29]' : 'text-white'}`
                  }
                >
                  {participant.name} - {participant.email}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </div>
      </Combobox>
      {filteredParticipants.length === 0 ? (
        <p className="text-white">No participants found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#01C38D]">
            <thead className="bg-[#132D46]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#01C38D] uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#01C38D] uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#01C38D] uppercase tracking-wider">Breakfast</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#01C38D] uppercase tracking-wider">Lunch</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#01C38D] uppercase tracking-wider">Dinner</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#01C38D] uppercase tracking-wider">Snacks</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#01C38D] uppercase tracking-wider">Edited By</th>
              </tr>
            </thead>
            <tbody className="bg-[#191E29] divide-y divide-[#01C38D]">
              {filteredParticipants.map((participant) => (
                <tr key={participant._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{participant.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{participant.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{participant.food.breakfast}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{participant.food.lunch}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{participant.food.dinner}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{participant.food.snacks}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {participant.editedBy.name} ({participant.editedBy.email})
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
