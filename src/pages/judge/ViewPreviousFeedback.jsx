import React, { useState, useEffect } from 'react'
import { useParams} from 'react-router-dom'
import { useAuth } from "../../contexts/AuthContext"
import { judgeService } from '../../services/api'
import GoBackButton from '../../components/GoBackButton'
import Loader from '../../components/Loader'
import { PenSquare } from 'lucide-react'

export default function ViewPreviousFeedback() {
  const { teamId, teamName } = useParams()
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState({})
  const [selectedRound, setSelectedRound] = useState('round 1')
  const rounds = ['round 1', 'round 2', 'final']
  const { logout, logoutLoading } = useAuth()

  useEffect(() => {
    const fetchFeedback = async () => {
      setLoading(true)
      try {
        const response = await judgeService.viewPreviousRoundFeedback(teamId, selectedRound)
        if (response.statusCode === 200) {
          setFeedback(response.data.previousFeedback)
        } else {
          setFeedback(null)
        }
      } catch (error) {
        console.error('Error fetching feedback:', error)
        setFeedback(null)
      } finally {
        setLoading(false)
      }
    }

    fetchFeedback()
  }, [teamId, selectedRound])

  if (loading) {
    return <Loader />
  }

  return (
    <div className="min-h-screen p-4 sm:p-8 bg-[#191E29] relative">
      <div className="flex justify-between items-center mb-8">
        <GoBackButton />
        <button onClick={logout} className="text-white hover:text-[#01C38D] transition-colors" disabled={logoutLoading}>
          {logoutLoading ? "Logging out..." : "Logout"}
        </button>
      </div>

      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-white flex items-center font-tt-commons">
          <PenSquare className="mr-4 h-8 w-8 sm:h-10 sm:w-10 text-[#01C38D]" />
          Previous Feedback
        </h1>

        <div className="bg-[#132D46] rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Team: {teamName}</h2>
          
          <div className="mb-6">
            <label htmlFor="roundSelect" className="block text-sm font-medium mb-2">Select Round:</label>
            <select
              id="roundSelect"
              value={selectedRound}
              onChange={(e) => setSelectedRound(e.target.value)}
              className="w-full p-2 bg-[#191E29] border border-[#01C38D] rounded-md focus:outline-none focus:ring-2 focus:ring-[#01C38D]"
            >
              {rounds.map((round) => (
                <option key={round} value={round}>{round}</option>
              ))}
            </select>
          </div>

          {feedback ? (
            <div>
              <h3 className="text-xl font-semibold mb-2 text-[#01C38D]">Feedback:</h3>
              <div className="bg-[#191E29] p-4 rounded-md" dangerouslySetInnerHTML={{ __html: feedback }} />
            </div>
          ) : (
            <p className="text-center text-gray-400">No feedback available for this round.</p>
          )}
        </div>
      </div>
    </div>
  )
}
