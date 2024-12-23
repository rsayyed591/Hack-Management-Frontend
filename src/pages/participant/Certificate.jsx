import { Award } from 'lucide-react'
import GoBackButton from '../../components/GoBackButton'
import { useAuth } from '../../contexts/AuthContext'

export default function Certificate() {
  const { logout } = useAuth()

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
          <Award className="mr-4 h-10 w-10 text-[#01C38D]" />
          Certificate
        </h1>
        <div className="bg-[#191E29] p-4 sm:p-8 rounded-lg text-center border-2 border-[#01C38D]">
          <p className="text-[#696E79] mb-6">
            Your certificate of participation will be available here after the hackathon concludes and the admin uploads it.
          </p>
          <button className="bg-[#01C38D] hover:bg-[#01C38D]/90 text-[#191E29] font-bold py-3 px-6 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors" disabled>
            Download Certificate
          </button>
        </div>
      </div>
    </div>
  )
}

