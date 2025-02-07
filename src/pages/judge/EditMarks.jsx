"use client"

import { useState, useEffect } from "react"
import { Edit3 } from "lucide-react"
import { useAuth } from "../../contexts/AuthContext"
import { judgeService } from "../../services/api"
import GoBackButton from "../../components/GoBackButton"
import Loader from "../../components/Loader"
import { useParams, useNavigate, useLocation } from "react-router-dom"
import JoditEditor from "jodit-react"

export default function EditMarks() {
  const { teamName, teamId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const round = location.state?.round || "round 1"
  const { logout, logoutLoading } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const [formData, setFormData] = useState({
    teamName: teamId,
    innovation: 5,
    presentation: 5,
    feasibility: 5,
    teamwork: 5,
    prototype: 5,
    feedback: "",
    round: round,
  })

  useEffect(() => {
    const fetchMarks = async () => {
      setLoading(true)
      try {
        const response = await judgeService.getMarks(teamId)
        if (response.statusCode === 200 && response.data) {
          const roundData = response.data.criteria.find((c) => c.round === round) || {}
          setFormData((prev) => ({
            ...prev,
            ...roundData,
            teamName: teamId,
            feedback: response.data.feedback.find((f) => f.round === round)?.text || "",
            round: round,
          }))
        } else {
          throw new Error("Failed to fetch marks")
        }
      } catch (err) {
        setError("Failed to fetch existing marks: " + (err.message || "Unknown error"))
      } finally {
        setLoading(false)
      }
    }

    fetchMarks()
  }, [teamId, round])

  const handleChange = (e) => {
    const { name, value } = e.target
    if (["innovation", "presentation", "feasibility", "teamwork", "prototype"].includes(name)) {
      const intValue = Math.round(Number.parseFloat(value))
      if (!isNaN(intValue) && intValue >= 0 && intValue <= 10) {
        setFormData((prev) => ({ ...prev, [name]: intValue }))
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleFeedbackChange = (newFeedback) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      feedback: newFeedback,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      const response = await judgeService.editMarks(formData)
      if (response.statusCode === 200) {
        setSuccess("Marks updated successfully")
        setTimeout(() => {
          navigate("/judge")
        }, 2000)
      } else {
        throw new Error(response.message || "Failed to update marks")
      }
    } catch (err) {
      setError(err.message || "Failed to update marks")
    } finally {
      setLoading(false)
    }
  }

  if (loading || logoutLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#191E29]">
        <Loader />
      </div>
    )
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
          <Edit3 className="mr-4 h-8 w-8 sm:h-10 sm:w-10 text-[#01C38D]" />
          Edit Marks
        </h1>

        <div className="bg-[#132D46] border-2 border-[#01C38D] rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-6">Team: {teamName}</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {["innovation", "presentation", "feasibility", "teamwork", "prototype"].map((field) => (
              <div key={field} className="space-y-2">
                <label className="block text-sm font-medium text-white capitalize">{field}</label>
                <div className="flex items-center space-x-4">
                  <span className="w-8 text-center text-white font-medium">{formData[field]}</span>
                  <div className="flex-grow relative">
                    <input
                      type="range"
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      min="0"
                      max="10"
                      step="1"
                      required
                      className="w-full appearance-none bg-[#01C38D] h-1 rounded outline-none opacity-70 transition-opacity duration-200 ease-in-out hover:opacity-100 focus:opacity-100"
                      style={{
                        background: `linear-gradient(to right, #01C38D 0%, #01C38D ${formData[field] * 10}%, #191E29 ${formData[field] * 10}%, #191E29 100%)`,
                      }}
                    />
                    <div className="absolute top-5 left-0 w-full flex justify-between">
                      {[0, 2, 4, 6, 8, 10].map((num) => (
                        <span key={num} className="text-xs text-white" style={{ transform: "translateX(-50%)" }}>
                          {num}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium text-white mb-2">Feedback</label>
              <JoditEditor
                value={formData.feedback}
                onChange={handleFeedbackChange}
                config={{
                  theme: "dark",
                  height: 300,
                  placeholder: "Enter your feedback here...",
                  buttons: [
                    "bold",
                    "italic",
                    "underline",
                    "|",
                    "ul",
                    "ol",
                    "|",
                    "font",
                    "fontsize",
                    "brush",
                    "paragraph",
                    "|",
                    "align",
                    "|",
                    "undo",
                    "redo",
                    "|",
                    "hr",
                    "eraser",
                    "fullsize",
                  ],
                  colors: {
                    greyscale: [
                      "#000000",
                      "#434343",
                      "#666666",
                      "#999999",
                      "#B7B7B7",
                      "#CCCCCC",
                      "#D9D9D9",
                      "#EFEFEF",
                      "#F3F3F3",
                      "#FFFFFF",
                    ],
                    palette: [
                      "#980000",
                      "#FF0000",
                      "#FF9900",
                      "#FFFF00",
                      "#00F0F0",
                      "#00FFFF",
                      "#4A86E8",
                      "#0000FF",
                      "#9900FF",
                      "#FF00FF",
                    ],
                    full: [
                      "#E6B8AF",
                      "#F4CCCC",
                      "#FCE5CD",
                      "#FFF2CC",
                      "#D9EAD3",
                      "#D0E0E3",
                      "#C9DAF8",
                      "#CFE2F3",
                      "#D9D2E9",
                      "#EAD1DC",
                      "#DD7E6B",
                      "#EA9999",
                      "#F9CB9C",
                      "#FFE599",
                      "#B6D7A8",
                      "#A2C4C9",
                      "#A4C2F4",
                      "#9FC5E8",
                      "#B4A7D6",
                      "#D5A6BD",
                      "#CC4125",
                      "#E06666",
                      "#F6B26B",
                      "#FFD966",
                      "#93C47D",
                      "#76A5AF",
                      "#6D9EEB",
                      "#6FA8DC",
                      "#8E7CC3",
                      "#C27BA0",
                      "#A61C00",
                      "#CC0000",
                      "#E69138",
                      "#F1C232",
                      "#6AA84F",
                      "#45818E",
                      "#3C78D8",
                      "#3D85C6",
                      "#674EA7",
                      "#A64D79",
                      "#85200C",
                      "#990000",
                      "#B45F06",
                      "#BF9000",
                      "#38761D",
                      "#134F5C",
                      "#1155CC",
                      "#073763",
                      "#20124D",
                      "#4C1130",
                      "#5B0F00",
                      "#660000",
                      "#783F04",
                      "#7F6000",
                      "#274E13",
                      "#0C343D",
                      "#1C4587",
                      "#073763",
                      "#20124D",
                      "#4C1130",
                    ],
                  },
                  colorPickerDefaultTab: "background",
                  toolbarButtonSize: "middle",
                  toolbarAdaptive: false,
                  style: {
                    background: "#132D46",
                    color: "#ffffff",
                  },
                }}
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-[#01C38D] text-[#191E29] rounded-md hover:bg-[#01C38D]/90 transition-colors"
            >
              Update Marks
            </button>
          </form>

          {error && <p className="mt-4 text-red-500">{error}</p>}
          {success && <p className="mt-4 text-green-500">{success}</p>}
        </div>
      </div>
    </div>
  )
}

