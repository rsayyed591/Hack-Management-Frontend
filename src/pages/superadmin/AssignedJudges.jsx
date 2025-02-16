"use client"

import { useState, useEffect, useRef } from "react"
import { superAdminService } from "../../services/api"
import Loader from "../../components/Loader"
import { toast } from "react-hot-toast"
import { User, Users, Filter } from "lucide-react"

export default function AssignedJudges() {
  const [assignedJudges, setAssignedJudges] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedRound, setSelectedRound] = useState("all")
  const cardsRef = useRef([])

  useEffect(() => {
    const fetchAssignedJudges = async () => {
      try {
        const response = await superAdminService.getAssignedJudges()
        if (response.statusCode === 200) {
          setAssignedJudges(response.data)
        } else {
          throw new Error(response.message || "Failed to fetch assigned judges")
        }
      } catch (error) {
        console.error("Error fetching assigned judges:", error)
        toast.error("Failed to fetch assigned judges")
      } finally {
        setLoading(false)
      }
    }

    fetchAssignedJudges()
  }, [])


  const filteredJudges = assignedJudges
    .map((judge) => ({
      ...judge,
      teamAssigned: judge.teamAssigned.filter((team) => selectedRound === "all" || team.round === selectedRound),
    }))
    .filter((judge) => judge.teamAssigned.length > 0)

  if (loading) {
    return <Loader />
  }

  return (
    <div className="min-h-screen bg-[#191E29] text-white p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold flex items-center">
          <Users className="mr-4 h-8 w-8 text-[#01C38D]" />
          Assigned Judges
        </h1>
        <div className="flex items-center">
          <Filter className="mr-2 h-5 w-5 text-[#01C38D]" />
          <select
            value={selectedRound}
            onChange={(e) => setSelectedRound(e.target.value)}
            className="bg-[#132D46] text-white border border-[#01C38D] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#01C38D]"
          >
            <option value="all">All Rounds</option>
            <option value="round 1">Round 1</option>
            <option value="round 2">Round 2</option>
            <option value="final">Final</option>
          </select>
        </div>
      </div>
      {filteredJudges.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredJudges.map((judge, index) => (
            <div
              key={judge._id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="bg-[#132D46] rounded-lg p-6 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <User className="mr-2 h-6 w-6 text-[#01C38D]" />
                {judge.judgeName}
              </h2>
              <h3 className="text-xl font-medium mb-2">Assigned Teams:</h3>
              <ul className="space-y-2">
                {judge.teamAssigned.map((team, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-2 h-2 bg-[#01C38D] rounded-full mr-2"></span>
                    <span>
                      {team.teamName} - {team.round}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-xl">No judges have been assigned teams for the selected round.</p>
      )}
    </div>
  )
}

