"use client"

import { useState, useEffect } from "react"
import { superAdminService } from "../../services/api"
import Loader from "../../components/Loader"
import { toast } from "react-hot-toast"
import { Download } from "lucide-react"
import jsPDF from "jspdf"
import "jspdf-autotable"

export default function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await superAdminService.getLeaderboard()
        setLeaderboardData(response.data)
      } catch (error) {
        console.error("Error fetching leaderboard:", error)
        toast.error("Failed to fetch leaderboard data")
      } finally {
        setLoading(false)
      }
    }

    fetchLeaderboard()
  }, [])

  const downloadPDF = () => {
    const doc = new jsPDF()
    doc.autoTable({
      head: [["Rank", "Team", "Round 1", "Round 2", "Final", "Grand Total"]],
      body: leaderboardData.map((team, index) => [
        index + 1,
        team._id,
        team.rounds.find((r) => r.round === "round 1")?.score || "-",
        team.rounds.find((r) => r.round === "round 2")?.score || "-",
        team.rounds.find((r) => r.round === "final")?.score || "-",
        team.grandTotal,
      ]),
      styles: { fontSize: 8, cellPadding: 2 },
      headStyles: { fillColor: [1, 195, 141], textColor: [25, 30, 41] },
      alternateRowStyles: { fillColor: [30, 53, 78] },
      theme: "grid",
    })
    doc.save("leaderboard.pdf")
  }

  if (loading) {
    return <Loader />
  }

  return (
    <div className="min-h-screen bg-[#191E29] text-white p-4 sm:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold mb-4 sm:mb-0">Leaderboard</h1>
        <button
          onClick={downloadPDF}
          className="flex items-center px-4 py-2 bg-[#01C38D] text-[#191E29] rounded-md hover:bg-[#01C38D]/90 transition-colors"
        >
          <Download className="mr-2 h-4 w-4" />
          Download PDF
        </button>
      </div>
      <div className="w-full overflow-x-auto">
        <table className="w-full bg-[#132D46] rounded-lg overflow-hidden border border-[#01C38D]/50 shadow-lg">
          <thead className="bg-[#01C38D] text-[#191E29]">
            <tr>
              <th className="p-4 text-left border-r border-[#191E29]/20">Rank</th>
              <th className="p-4 text-left border-r border-[#191E29]/20">Team</th>
              <th className="p-4 text-left border-r border-[#191E29]/20">Round 1</th>
              <th className="p-4 text-left border-r border-[#191E29]/20">Round 2</th>
              <th className="p-4 text-left border-r border-[#191E29]/20">Final</th>
              <th className="p-4 text-left">Grand Total</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((team, index) => (
              <tr
                key={team._id}
                className={`border-b border-[#01C38D]/20 ${index % 2 === 0 ? "bg-[#1E354E]" : "bg-[#162C44]"} hover:bg-[#254060] transition-all`}
              >
                <td className="p-4 border-r border-[#01C38D]/20">{index + 1}</td>
                <td className="p-4 border-r border-[#01C38D]/20 font-semibold">{team._id}</td>
                {["round 1", "round 2", "final"].map((round) => (
                  <td key={round} className="p-4 border-r border-[#01C38D]/20 text-center">
                    {team.rounds.find((r) => r.round === round)?.score || "-"}
                  </td>
                ))}
                <td className="p-4 font-bold text-[#01C38D] text-center">{team.grandTotal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

