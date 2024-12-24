import { useState } from 'react'
import { Users } from 'lucide-react'
import { superAdminService } from '../../services/api'

export default function AddTeam() {
  const [formData, setFormData] = useState({
    teamName: '',
    members: ['', '', '', ''],
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleChange = (e, index) => {
    if (e.target.name === 'teamName') {
      setFormData({ ...formData, teamName: e.target.value })
    } else {
      const newMembers = [...formData.members]
      newMembers[index] = e.target.value
      setFormData({ ...formData, members: newMembers })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    try {
      const teamData = {
        ...formData,
        members: formData.members.filter(member => member.trim() !== '')
      }
      await superAdminService.addTeam(teamData)
      setSuccess('Team added successfully')
      setFormData({ teamName: '', members: ['', '', '', ''] })
    } catch (err) {
      setError(err.message || 'Failed to add team')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Users className="h-6 w-6 text-[#01C38D]" />
        <h1 className="text-2xl font-bold text-white">Add Team</h1>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <label htmlFor="teamName" className="block text-sm font-medium text-white">Team Name</label>
          <input
            type="text"
            id="teamName"
            name="teamName"
            value={formData.teamName}
            onChange={(e) => handleChange(e)}
            required
                        className="mt-1 block w-full rounded-md bg-[#132D46] border-[#01C38D] text-white shadow-sm focus:border-[#01C38D] focus:ring focus:ring-[#01C38D] focus:ring-opacity-50 px-4 py-2"

          />
        </div>
        {formData.members.map((member, index) => (
          <div key={index}>
            <label htmlFor={`member${index + 1}`} className="block text-sm font-medium text-white">Member {index + 1} Email</label>
            <input
              type="email"
              id={`member${index + 1}`}
              name={`member${index + 1}`}
              value={member}
              onChange={(e) => handleChange(e, index)}
                          className="mt-1 block w-full rounded-md bg-[#132D46] border-[#01C38D] text-white shadow-sm focus:border-[#01C38D] focus:ring focus:ring-[#01C38D] focus:ring-opacity-50 px-4 py-2"

            />
          </div>
        ))}
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-[#191E29] bg-[#01C38D] hover:bg-[#01C38D]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#01C38D]"
        >
          Add Team
        </button>
      </form>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      {success && <p className="mt-2 text-sm text-green-600">{success}</p>}
    </div>
  )
}

