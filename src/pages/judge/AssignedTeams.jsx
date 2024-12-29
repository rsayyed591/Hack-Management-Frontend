import { useState, useEffect } from 'react'
import { ClipboardList, PenSquare, Edit3 } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { judgeService } from '../../services/api'
import GoBackButton from '../../components/GoBackButton'
import Loader from '../../components/Loader'
import { useNavigate } from 'react-router-dom'

export default function AssignedTeams() {
  const { logout } = useAuth()
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await judgeService.getAssignedTeams()
        setTeams(response.data)
      } catch (err) {
        setError('Failed to fetch assigned teams')
      } finally {
        setLoading(false)
      }
    }

    fetchTeams()
  }, [])

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

      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-white flex items-center font-tt-commons">
          <ClipboardList className="mr-4 h-8 w-8 sm:h-10 sm:w-10 text-[#01C38D]" />
          Assigned Teams
        </h1>

        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {teams.map((team, index) => (
              team.teamAssigned.map((t, tIndex) => (
                <div 
                  key={`${index}-${tIndex}`}
                  className="bg-[#132D46] border-2 border-[#01C38D] rounded-lg p-6 space-y-4"
                >
                  <h2 className="text-xl font-bold text-white text-center mb-4">{t.teamName}</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      onClick={() => navigate(`/judge/give-marks/${t.teamName}/${t.teamId}`)}
                      className="flex items-center justify-center space-x-2 px-4 py-2 bg-[#01C38D] text-[#191E29] rounded-md hover:bg-[#01C38D]/90 transition-colors"
                    >
                      <PenSquare className="h-4 w-4" />
                      <span>Give Marks</span>
                    </button>
                    <button
                      onClick={() => navigate(`/judge/edit-marks/${t.teamName}/${t.teamId}`)}
                      className="flex items-center justify-center space-x-2 px-4 py-2 bg-[#132D46] text-white border-2 border-[#01C38D] rounded-md hover:bg-[#132D46]/80 transition-colors"
                    >
                      <Edit3 className="h-4 w-4" />
                      <span>Edit Marks</span>
                    </button>
                  </div>
                </div>
              ))
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

