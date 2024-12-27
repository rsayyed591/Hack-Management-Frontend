import { useState, useEffect } from 'react'
import { UserCog } from 'lucide-react'
import { superAdminService } from '../../services/api'
import Loader from '../../components/Loader'
import Autocomplete from '../../components/Autocomplete'

export default function AssignJudges() {
  const [judges, setJudges] = useState([])
  const [teams, setTeams] = useState([])
  const [selectedJudge, setSelectedJudge] = useState('')
  const [selectedTeams, setSelectedTeams] = useState([])
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const [judgesData, teamsData] = await Promise.all([
          superAdminService.getJudges(),
          superAdminService.getTeams()
        ])
        setJudges(judgesData.data)
        setTeams(teamsData.data)
      } catch (err) {
        setError('Failed to fetch data')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleJudgeSelect = (option) => {
    setSelectedJudge(option.value)
  }

  const handleTeamSelect = (option) => {
    setSelectedTeams(prev => {
      if (prev.some(team => team.value === option.value)) {
        return prev.filter(team => team.value !== option.value)
      } else {
        return [...prev, option]
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    try {
      await Promise.all(selectedTeams.map(team => 
        superAdminService.assignTeamsJudge({ judgeId: selectedJudge, teamId: team.value })
      ))
      setSuccess('Teams assigned successfully')
      setSelectedJudge('')
      setSelectedTeams([])
    } catch (err) {
      setError(err.message || 'Failed to assign teams')
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
        <UserCog className="h-6 w-6 text-[#01C38D]" />
        <h1 className="text-2xl font-bold text-white">Assign Judges</h1>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="judge" className="block text-sm font-medium text-white">Select Judge</label>
          <Autocomplete
            options={judges.map(judge => ({ label: `${judge.name} (${judge.email})`, value: judge._id }))}
            onSelect={handleJudgeSelect}
            placeholder="Search for a judge"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white">Select Teams</label>
          <Autocomplete
            options={teams.map(team => ({ label: team.teamName, value: team._id }))}
            onSelect={handleTeamSelect}
            placeholder="Search for teams"
          />
        </div>
        <div className="mt-2">
          <h3 className="text-sm font-medium text-white mb-2">Selected Teams:</h3>
          <ul className="space-y-1">
            {selectedTeams.map(team => (
              <li key={team.value} className="flex items-center">
                <span className="text-white">{team.label}</span>
                <button
                  type="button"
                  onClick={() => handleTeamSelect(team)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
        <button
          type="submit"
          disabled={!selectedJudge || selectedTeams.length === 0}
          className="w-full sm:w-auto flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-[#191E29] bg-[#01C38D] hover:bg-[#01C38D]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#01C38D] disabled:opacity-50"
        >
          Assign Teams
        </button>
      </form>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      {success && <p className="mt-2 text-sm text-green-600">{success}</p>}
    </div>
  )
}

