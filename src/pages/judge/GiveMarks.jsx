import { useState } from 'react'
import { PenSquare } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { judgeService } from '../../services/api'
import GoBackButton from '../../components/GoBackButton'
import Loader from '../../components/Loader'
import { useParams, useNavigate } from 'react-router-dom'

export default function GiveMarks() {
  const { teamName, teamId } = useParams()
  const navigate = useNavigate()
  const { logout, logoutLoading } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [formData, setFormData] = useState({
    teamId: teamId,
    innovation: 5,
    presentation: 5,
    feasibility: 5,
    teamwork: 5,
    prototype: 5,
    feedback: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    if (['innovation', 'presentation', 'feasibility', 'teamwork', 'prototype'].includes(name)) {
      setFormData(prev => ({ ...prev, [name]: parseFloat(value) }))
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
        teamName: teamId,
        innovation: formData.innovation,
        presentation: formData.presentation,
        feasibility: formData.feasibility,
        teamwork: formData.teamwork,
        prototype: formData.prototype,
        feedback: formData.feedback.trim(),
      }
  
      console.log('Submitting data:', submissionData)
      await judgeService.fillMarks(submissionData)
  
      setSuccess('Marks submitted successfully')
      setTimeout(() => {
        navigate('/judge')
      }, 2000)
    } catch (err) {
      setError(err.message || 'Failed to submit marks')
    } finally {
      setLoading(false)
    }
  }
  
  if (loading || logoutLoading) {
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
          disabled={logoutLoading}
        >
          {logoutLoading ? 'Logging out...' : 'Logout'}
        </button>
      </div>

      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-white flex items-center font-tt-commons">
          <PenSquare className="mr-4 h-8 w-8 sm:h-10 sm:w-10 text-[#01C38D]" />
          Give Marks
        </h1>

        <div className="bg-[#132D46] border-2 border-[#01C38D] rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-6">Team: {teamName}</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {['innovation', 'presentation', 'feasibility', 'teamwork', 'prototype'].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-white capitalize mb-2">
                  {field} ({formData[field]})
                </label>
                <input
                  type="range"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  min="0"
                  max="10"
                  step="0.5"
                  required
                  className="w-full h-2 bg-[#191E29] rounded-lg appearance-none cursor-pointer accent-[#01C38D]"
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
              Submit Marks
            </button>
          </form>

          {error && <p className="mt-4 text-red-500">{error}</p>}
          {success && <p className="mt-4 text-green-500">{success}</p>}
        </div>
      </div>
    </div>
  )
}

