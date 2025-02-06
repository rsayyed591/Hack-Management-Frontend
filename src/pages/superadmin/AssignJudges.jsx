"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { superAdminService } from "../../services/api"
import { useAuth } from "../../contexts/AuthContext"
import Loader from "../../components/Loader"
import { toast } from "react-hot-toast"

export default function AssignJudges() {
  const [judges, setJudges] = useState([])
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedJudge, setSelectedJudge] = useState("")
  const [selectedTeams, setSelectedTeams] = useState([])
  const [selectedRound, setSelectedRound] = useState("round 1")
  const { logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [judgesResponse, teamsResponse] = await Promise.all([
          superAdminService.getJudges(),
          superAdminService.getTeams(),
        ])
        setJudges(judgesResponse.data)
        setTeams(teamsResponse.data)
      } catch (error) {
        console.error("Error fetching data:", error)
        toast.error("Failed to fetch judges and teams")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleTeamSelection = (teamId) => {
    setSelectedTeams((prevSelected) =>
      prevSelected.includes(teamId)
        ? prevSelected.filter((id) => id !== teamId) // Remove if already selected
        : [...prevSelected, teamId] // Add if not selected
    )
  }

  const handleAssign = async (e) => {
    e.preventDefault()
    if (!selectedJudge || selectedTeams.length === 0 || !selectedRound) {
      toast.error("Please select a judge, at least one team, and a round")
      return
    }

    try {
      setLoading(true)
      await superAdminService.assignTeamsJudge({
        judgeId: selectedJudge,
        teamId: selectedTeams,
        round: selectedRound,
      })
      toast.success("Teams assigned successfully")
      // Reset form
      setSelectedJudge("")
      setSelectedTeams([])
      setSelectedRound("round 1")
    } catch (error) {
      console.error("Error assigning teams:", error)
      toast.error("Failed to assign teams")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <Loader />
  }

  return (
    <div className="min-h-screen bg-[#191E29] text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Assign Judges to Teams</h1>
      <form onSubmit={handleAssign} className="space-y-6">
        {/* Select Judge */}
        <div>
          <label className="block mb-2">Select Judge:</label>
          <select
            value={selectedJudge}
            onChange={(e) => setSelectedJudge(e.target.value)}
            className="w-full p-2 bg-[#132D46] rounded"
          >
            <option value="">Select a judge</option>
            {judges.map((judge) => (
              <option key={judge._id} value={judge._id}>
                {judge.name}
              </option>
            ))}
          </select>
        </div>

        {/* Select Teams (Checkbox List) */}
        <div>
          <label className="block mb-2">Select Teams:</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 bg-[#132D46] p-3 rounded">
            {teams.map((team) => (
              <label key={team._id} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedTeams.includes(team._id)}
                  onChange={() => handleTeamSelection(team._id)}
                  className="accent-[#01C38D]"
                />
                <span>{team.teamName}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Select Round */}
        <div>
          <label className="block mb-2">Select Round:</label>
          <select
            value={selectedRound}
            onChange={(e) => setSelectedRound(e.target.value)}
            className="w-full p-2 bg-[#132D46] rounded"
          >
            <option value="round 1">Round 1</option>
            <option value="round 2">Round 2</option>
            <option value="final">Final</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-[#01C38D] text-[#191E29] px-4 py-2 rounded hover:bg-[#01C38D]/90 transition"
        >
          Assign Teams
        </button>
      </form>
    </div>
  )
}
