'use client';

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { judgeService } from "../../services/api"
import { useAuth } from "../../contexts/AuthContext"
import Loader from "../../components/Loader"
import { toast } from "react-hot-toast"
import { PenSquare, Edit3 } from 'lucide-react'

export default function Judge() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const { logout } = useAuth()
  const navigate = useNavigate()
  const round = "round 2"
  useEffect(() => {
    const fetchTeams = async () => {
      setLoading(true)
      try {
        const response = await judgeService.getAssignedTeams(`${round}`)
        console.log(response)
        if (response.statusCode === 200) {
          setTeams(response.data.length > 0 ? response.data[0].teamAssgined : [])
        } else {
          setTeams([])
        }
      } catch (error) {
        console.error("Error fetching teams:", error)
        toast.error("Failed to fetch assigned teams")
        setTeams([])
      } finally {
        setLoading(false)
      }
    }

    fetchTeams()
  }, [])

  if (loading) {
    return <Loader />
  }
  return (
    <div className="min-h-screen bg-[#191E29] text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Assigned Teams</h1>
      {teams?.length > 0 ? (
        <ul className="space-y-4">
          {teams.map((team) => (
            <li key={team.teamId} className="bg-[#132D46] p-4 rounded">
              <h2 className="text-xl font-semibold mb-2">{team.teamName}</h2>
              <p className="mb-4">Round: round 1</p>
              <div className="flex space-x-4">
                <button
                  onClick={() => navigate(`/judge/give-marks/${team.teamName}/${team.teamId}`, { state: { round: "round 1" } })}
                  className="flex items-center justify-center space-x-2 px-4 py-2 bg-[#01C38D] text-[#191E29] rounded-md hover:bg-[#01C38D]/90 transition-colors"
                >
                  <PenSquare className="h-4 w-4" />
                  <span>Give Marks</span>
                </button>
                <button
                  onClick={() => navigate(`/judge/edit-marks/${team.teamName}/${team.teamId}`, { state: { round: "round 1" } })}
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
        <p>No teams assigned for {round}.</p>
      )}
    </div>
  )
}
