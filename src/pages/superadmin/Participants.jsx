import { useState, useEffect } from 'react'
import { ClipboardList } from 'lucide-react'
import { superAdminService } from '../../services/api'

export default function Participants() {
  const [participants, setParticipants] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Fetch participants
  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await superAdminService.getParticipants()
        setParticipants(response.data || []) // Adjusted response handling
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

  // Loading state
  if (loading) {
    return <div className="text-white">Loading participants...</div>
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
      {participants.length === 0 ? (
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
              {participants.map((participant) => (
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
