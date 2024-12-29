import { useState, useEffect } from 'react'
import { FileText } from 'lucide-react'
import GoBackButton from '../../components/GoBackButton'
import { useAuth } from '../../contexts/AuthContext'
import { participantService } from '../../services/api'
import Loader from '../../components/Loader'

export default function ProblemStatement() {
  const { logout } = useAuth()
  const [problemStatements, setProblemStatements] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProblemStatements = async () => {
      try {
        const response = await participantService.viewPS()
        setProblemStatements(response.data)
      } catch (err) {
        setError('Failed to fetch problem statements')
      } finally {
        setLoading(false)
      }
    }

    fetchProblemStatements()
  }, [])

  if (loading) {
    return <Loader />
  }

  return (
    <div className="min-h-screen p-4 md:p-8 bg-[#191E29] relative">
      <div className="flex justify-between items-center mb-8">
        <GoBackButton />
        <button
          onClick={logout}
          className="text-white hover:text-[#01C38D] transition-colors"
        >
          Logout
        </button>
      </div>
      <div className="max-w-4xl mx-auto border-2 border-[#01C38D] rounded-lg p-4 sm:p-8 bg-[#132D46]">
        <h1 className="text-4xl font-bold text-white mb-8 flex items-center font-tt-commons">
          <FileText className="mr-4 h-10 w-10 text-[#01C38D]" />
          Problem Statements
        </h1>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="space-y-6">
            {problemStatements.map((ps, index) => (
              <div key={ps._id} className="bg-[#191E29] p-4 sm:p-6 rounded-lg border-2 border-[#01C38D]">
                <h2 className="text-xl font-semibold text-white mb-2">{ps.title}</h2>
                <p className="text-[#696E79] mb-2">{ps.description}</p>
                <p className="text-[#01C38D]">Domain: {ps.domain}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

