import { useState, useEffect } from 'react'
import { Users } from 'lucide-react'
import { adminService } from '../../services/api'
import Loader from '../../components/Loader'
import Autocomplete from '../../components/AutoComplete'

export default function AddTeam() {
  const [formData, setFormData] = useState({
    teamName: '',
    teamLead: '',
    teamMembers: ['', '', '', ''] // 4 additional members (5 total including team lead)
  })
  const [selectedMembers, setSelectedMembers] = useState([])
  const [participants, setParticipants] = useState([])
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchParticipants = async () => {
      setLoading(true)
      try {
        const response = await adminService.getParticipants()
        setParticipants(response.data)
      } catch (err) {
        setError('Failed to fetch participants')
      } finally {
        setLoading(false)
      }
    }
    fetchParticipants()
  }, [])

  const handleChange = (e) => {
    if (e.target.name === 'teamName') {
      setFormData({ ...formData, teamName: e.target.value })
    } else if (e.target.name === 'teamLead') {
      const teamLead = e.target.value
      setFormData(prev => ({
        ...prev,
        teamLead
      }))
      setSelectedMembers([teamLead])
    }
  }

  const handleMemberSelect = (option, index) => {
    const newMembers = [...formData.teamMembers]
    newMembers[index] = option.value
    setFormData({ ...formData, teamMembers: newMembers })
    setSelectedMembers(prev => [...new Set([...prev, option.value])])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setIsSubmitting(true)

    if (!formData.teamName.trim()) {
      setError('Team name is required')
      setIsSubmitting(false)
      return
    }

    if (!formData.teamLead.trim()) {
      setError('Team lead is required')
      setIsSubmitting(false)
      return
    }

    const validMembers = [formData.teamLead, ...formData.teamMembers.filter(member => member.trim() !== '')]
    if (validMembers.length < 1) {
      setError('At least one team member (the team lead) is required')
      setIsSubmitting(false)
      return
    }

    try {
      const teamLeadParticipant = participants.find(p => p._id === formData.teamLead)
      if (!teamLeadParticipant) {
        throw new Error('Team lead not found')
      }

      const teamData = {
        teamName: formData.teamName,
        teamLead: teamLeadParticipant.name,
        teamMembers: validMembers
      }

      const response = await adminService.addTeam(teamData)
      setSuccess(response.message || 'Team added successfully')
      setFormData({
        teamName: '',
        teamLead: '',
        teamMembers: ['', '', '', '']
      })
      setSelectedMembers([])
    } catch (err) {
      console.error('Error adding team:', err)
      setError(err.message || 'Failed to add team. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center lg:h-[70vh] bg-[#191E29]">
      <Loader />
    </div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Users className="h-6 w-6 text-[#01C38D]" />
        <h1 className="text-2xl font-bold text-white">Add Team</h1>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <label htmlFor="teamName" className="block text-sm font-medium text-white">
            Team Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="teamName"
            name="teamName"
            value={formData.teamName}
            onChange={(e) => handleChange(e)}
            required
            className="mt-1 block w-full rounded-md bg-[#132D46] border-[#01C38D] text-white shadow-sm focus:border-[#01C38D] focus:ring focus:ring-[#01C38D] focus:ring-opacity-50 px-4 py-2"
            placeholder="Enter team name"
          />
        </div>
        <div>
          <label htmlFor="teamLead" className="block text-sm font-medium text-white">
            Team Lead (Member 1) <span className="text-red-500">*</span>
          </label>
          <Autocomplete
            options={participants.map(p => ({ label: `${p.name} (${p.email})`, value: p._id }))}
            onSelect={(option) => handleChange({ target: { name: 'teamLead', value: option.value } })}
            placeholder="Search for team lead"
          />
        </div>
        {formData.teamMembers.map((member, index) => (
          <div key={index}>
            <label htmlFor={`member${index + 2}`} className="block text-sm font-medium text-white">
              Team Member {index + 2}
            </label>
            <Autocomplete
              options={participants
                .filter(p => !selectedMembers.includes(p._id) || p._id === member)
                .map(p => ({ label: `${p.name} (${p.email})`, value: p._id }))}
              onSelect={(option) => handleMemberSelect(option, index)}
              placeholder={`Search for team member ${index + 2}`}
            />
          </div>
        ))}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-[#191E29] bg-[#01C38D] hover:bg-[#01C38D]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#01C38D] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? 'Adding Team...' : 'Add Team'}
        </button>
      </form>
      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-md text-red-500">
          {error}
        </div>
      )}
      {success && (
        <div className="p-3 bg-green-500/10 border border-green-500/50 rounded-md text-green-500">
          {success}
        </div>
      )}
    </div>
  )
}

