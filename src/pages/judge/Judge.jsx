'use client';

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { judgeService } from "../../services/api"
import { useAuth } from "../../contexts/AuthContext"
import Loader from "../../components/Loader"
import { toast } from "react-hot-toast"
import { PenSquare, Edit3 } from 'lucide-react'

export default function AssignedTeams() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [availableRounds, setAvailableRounds] = useState([])
  const [selectedRound, setSelectedRound] = useState("")
  const { logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchRounds = async () => {
      setLoading(true)
      try {
        const rounds = ["round 1", "round 2", "final"]
        const availableRoundsData = []
  
        for (const round of rounds) {
          const response = await judgeService.getAssignedTeams(round)
          if (response.statusCode === 200) {
            availableRoundsData.push(round)
          }
        }
  
        setAvailableRounds(availableRoundsData)
  
        if (!selectedRound && availableRoundsData.length > 0) {
          setSelectedRound(availableRoundsData[0])
          handleRoundChange(availableRoundsData[0])
        }
      } catch (error) {
        console.error("Error fetching available rounds:", error)
        toast.error("Failed to fetch available rounds")
      } finally {
        setLoading(false)
      }
    }
  
    fetchRounds()
  }, [selectedRound]) // Added selectedRound to dependencies
  

  const handleRoundChange = async (round) => {
    setSelectedRound(round)
    setLoading(true)
  
    try {
      const response = await judgeService.getAssignedTeams(round)
      if (response.statusCode === 200) {
        setTeams(response.data.length > 0 ? response.data[0].teamAssgined : [])
      } else {
        setTeams([])
      }
    } catch (error) {
      console.error("Error fetching teams for round:", error)
      toast.error("Failed to fetch teams for selected round")
      setTeams([])
    } finally {
      setLoading(false)
    }
  }
  

  if (loading) {
    return <Loader />
  }

  return (
    <div className="min-h-screen bg-[#191E29] text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Assigned Teams</h1>
      {availableRounds.length > 1 && (
        <div className="mb-6">
          <label className="block mb-2">Select Round:</label>
          <select
            value={selectedRound}
            onChange={(e) => handleRoundChange(e.target.value)}
            className="w-full p-2 bg-[#132D46] rounded"
          >
            {availableRounds.map((round) => (
              <option key={round} value={round}>
                {round.charAt(0).toUpperCase() + round.slice(1)}
              </option>
            ))}
          </select>
        </div>
      )}
      {teams.length > 0 ? (
        <ul className="space-y-4">
          {teams.map((team) => (
            <li key={team.teamId} className="bg-[#132D46] p-4 rounded">
              <h2 className="text-xl font-semibold mb-2">{team.teamName}</h2>
              <p className="mb-4">Round: {team.round}</p>
              <div className="flex space-x-4">
                <button
                  onClick={() => navigate(`/judge/give-marks/${team.teamName}/${team.teamId}`)}
                  className="flex items-center justify-center space-x-2 px-4 py-2 bg-[#01C38D] text-[#191E29] rounded-md hover:bg-[#01C38D]/90 transition-colors"
                >
                  <PenSquare className="h-4 w-4" />
                  <span>Give Marks</span>
                </button>
                <button
                  onClick={() => navigate(`/judge/edit-marks/${team.teamName}/${team.teamId}`)}
                  className="flex items-center justify-center space-x-2 px-4 py-2 bg-[#132D46] text-white border-2 border-[#01C38D] rounded-md hover:bg-[#132D46]/80 transition-colors"
                >
                  <Edit3 className="h-4 w-4" />
                  <span>Edit Marks</span>
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No teams assigned for {selectedRound}.</p>
      )}
    </div>
  )
}
