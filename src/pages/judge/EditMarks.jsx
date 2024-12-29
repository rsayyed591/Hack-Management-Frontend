import { useState, useEffect } from 'react'
import { Edit3 } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { judgeService } from '../../services/api'
import GoBackButton from '../../components/GoBackButton'
import Loader from '../../components/Loader'
import { useParams, useNavigate } from 'react-router-dom'

export default function EditMarks() {
  const { teamName, teamId } = useParams()
  const navigate = useNavigate()
  const { logout } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [formData, setFormData] = useState({
    teamId: teamId,
    innovation: '',
    presentation: '',
    feasibility: '',
    teamwork: '',
    prototype: '',
    feedback: ''
  })

  useEffect(() => {
    // Here you would typically fetch the existing marks
    // For now, we'll just use the form as is
    setFormData(prev => ({
      ...prev,
      teamId: teamId
    }))
  }, [teamId])

  const handleChange = (e) => {
    const { name, value } = e.target
    // For numerical fields, ensure the value is between 0 and 10
    if (['innovation', 'presentation', 'feasibility', 'teamwork', 'prototype'].includes(name)) {
      const numValue = parseFloat(value)
      if (isNaN(numValue) || numValue < 0 || numValue > 10) return
      setFormData(prev => ({ ...prev, [name]: numValue }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const submissionData = {
        ...formData,
        innovation: parseFloat(formData.innovation),
        presentation: parseFloat(formData.presentation),
        feasibility: parseFloat(formData.feasibility),
        teamwork: parseFloat(formData.teamwork),
        prototype: parseFloat(formData.prototype),
      }
      await judgeService.editMarks(submissionData)
      setSuccess('Marks updated successfully')
      setTimeout(() => {
        navigate('/judge/assigned-teams')
      }, 2000)
    } catch (err) {
      setError(err.message || 'Failed to update marks')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen bg-[#191E29]">
      <Loader />
    </div>
  }

  return (
    <div className="min-h-screen p-4 sm:p-8 bg-[#191E29] relative">
      <div className="flex justify-between items-center mb-8">
        <GoBackButton />
        <button
          onClick={logout}
          className="text-white hover:text-[#01C38D] transition-colors"
        >
          Logout
        </button>
      </div>

      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-white flex items-center font-tt-commons">
          <Edit3 className="mr-4 h-8 w-8 sm:h-10 sm:w-10 text-[#01C38D]" />
          Edit Marks
        </h1>

        <div className="bg-[#132D46] border-2 border-[#01C38D] rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-6">Team: {teamName}</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {['innovation', 'presentation', 'feasibility', 'teamwork', 'prototype'].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-white capitalize mb-2">
                  {field} (0-10)
                </label>
                <input
                  type="number"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  step="0.5"
                  min="0"
                  max="10"
                  required
                  className="w-full px-3 py-2 bg-[#191E29] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#01C38D] border border-[#01C38D]"
                />
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Feedback
              </label>
              <textarea
                name="feedback"
                value={formData.feedback}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-3 py-2 bg-[#191E29] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#01C38D] border border-[#01C38D]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-[#01C38D] text-[#191E29] rounded-md hover:bg-[#01C38D]/90 transition-colors"
            >
              Update Marks
            </button>
          </form>

          {error && <p className="mt-4 text-red-500">{error}</p>}
          {success && <p className="mt-4 text-green-500">{success}</p>}
        </div>
      </div>
    </div>
  )
}

