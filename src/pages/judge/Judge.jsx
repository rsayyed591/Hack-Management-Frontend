import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { judgeService } from "../../services/api"
import { useAuth } from "../../contexts/AuthContext"
import Loader from "../../components/Loader"
import { toast } from "react-hot-toast"
import { PenSquare, Edit3, LogOut, Eye } from "lucide-react"

export default function Judge() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const cardsRef = useRef([])

  useEffect(() => {
    const fetchTeams = async () => {
      setLoading(true)
      try {
        const response = await judgeService.getAssignedTeams("round 1")
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

  const handleLogout = async () => {
    try {
      await logout()
      navigate("/login")
    } catch (error) {
      console.error("Logout failed:", error)
      toast.error("Logout failed")
    }
  }

  if (loading) {
    return <Loader />
  }

  return (
    <div className="min-h-screen bg-[#191E29] text-white p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Welcome, {user?.name || "Judge"}</h1>
        <button
          onClick={handleLogout}
          className="flex items-center px-4 py-2 bg-[#01C38D] text-[#191E29] rounded-md hover:bg-[#01C38D]/90 transition-colors"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </button>
      </div>
      <h2 className="text-2xl font-semibold mb-6">Assigned Teams - Round 1</h2>
      {teams.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map((team, index) => (
            <div
              key={team.teamId}
              ref={(el) => (cardsRef.current[index] = el)}
              className="bg-[#132D46] rounded-lg p-6 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <h3 className="text-xl font-semibold mb-4">{team.teamName}</h3>
              <div className="flex flex-col space-y-4">
                <button
                  onClick={() =>
                    navigate(`/judge/give-marks/${team.teamName}/${team.teamId}`, { state: { round: "round 1" } })
                  }
                  className="flex items-center justify-center space-x-2 px-4 py-2 bg-[#01C38D] text-[#191E29] rounded-md hover:bg-[#01C38D]/90 transition-colors"
                >
                  <PenSquare className="h-4 w-4" />
                  <span>Give Marks</span>
                </button>
                <button
                  onClick={() =>
                    navigate(`/judge/edit-marks/${team.teamName}/${team.teamId}`, { state: { round: "round 1" } })
                  }
                  className="flex items-center justify-center space-x-2 px-4 py-2 bg-[#132D46] text-white border-2 border-[#01C38D] rounded-md hover:bg-[#132D46]/80 transition-colors"
                >
                  <Edit3 className="h-4 w-4" />
                  <span>Edit Marks</span>
                </button>
                <button
                  onClick={() => navigate(`/judge/view-previous-feedback/${team.teamName}/${team.teamId}`)}
                  className="flex items-center justify-center space-x-2 px-4 py-2 bg-[#132D46] text-white border-2 border-[#01C38D] rounded-md hover:bg-[#132D46]/80 transition-colors"
                >
                  <Eye className="h-4 w-4" />
                  <span>View Previous Feedback</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-xl">No teams assigned for round 1.</p>
      )}
    </div>
  )
}

