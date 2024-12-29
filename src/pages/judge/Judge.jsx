import { Link } from 'react-router-dom'
import { ClipboardList } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import GoBackButton from '../../components/GoBackButton'

export default function Judge() {
  const { user, logout, loading } = useAuth()

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen bg-[#191E29]">Loading...</div> 
  }

  if (!user) {
    return <div className="flex items-center justify-center min-h-screen bg-[#191E29] text-white">User not logged in</div>
  }

  const sections = [
    { name: 'See Assigned Teams', icon: ClipboardList, path: '/judge/assigned-teams' },
  ]

  return (
    <div className="min-h-screen p-4 sm:p-8 bg-[#191E29] relative">
      <div className="flex justify-between items-center mb-8">
        <GoBackButton />
        <button
          onClick={logout}
          className="text-white hover:text-[#01C38D] transition-colors"
        >
          Logout
        </button>
      </div>
      <div className="max-w-6xl mx-auto space-y-8 sm:space-y-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center mb-8 sm:mb-12 font-tt-commons">
          Welcome, {user?.message.name}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {sections.map((section) => (
            <Link
              key={section.name}
              to={section.path}
              className="bg-[#132D46] border-2 border-[#01C38D] rounded-lg p-4 sm:p-6 lg:p-8 text-white hover:bg-[#132D46]/80 transition-all transform hover:scale-105 group"
            >
              <div className="flex items-center justify-center mb-4">
                <section.icon className="h-12 w-12 sm:h-16 sm:w-16 text-[#01C38D]" />
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-center font-tt-commons group-hover:text-[#01C38D]">
                {section.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

