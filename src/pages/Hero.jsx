import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useAuth } from './../contexts/AuthContext'
import './../App.css'

export default function Hero() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleGetStarted = () => {
    if (user) {
      const role = user?.message?.role
      switch (role) {
        case 'superAdmin':
          navigate('/superadmin')
          break
        case 'admin':
          navigate('/admin')
          break
        case 'judge':
          navigate('/judge')
          break
        default:
          navigate('/participant')
      }
    } else {
      navigate('/login')
    }
  }

  const stats = [
    {
      number: "300+",
      description: "Active Participants Ready to Innovate"
    },
    {
      number: "15+",
      description: "Expert Judges from Industry"
    },
    {
      number: "36h",
      description: "Hours of Intense Innovation"
    }
  ]

  return (
    <div className="min-h-screen bg-[#191E29] relative overflow-hidden flex items-center">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-[#01C38D]/20 to-transparent blur-3xl animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] rounded-full bg-gradient-to-l from-[#01C38D]/10 to-transparent blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-t from-[#01C38D]/15 to-transparent blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(#01C38D 1px, transparent 1px), linear-gradient(to right, #01C38D 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      ></div>

      {/* Main content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mt-12 sm:mt-0">
        <div className="max-w-4xl mx-auto space-y-8 sm:space-y-12">
          {/* Hero content */}
          <div className="text-center space-y-6 sm:space-y-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white font-tt-commons animate-fade-in-up">
              Hackathon <span className="text-[#01C38D]">Manager</span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-white/70 max-w-3xl mx-auto animate-fade-in-up animation-delay-1000 px-4 sm:px-0">
              Streamline your hackathon experience with our comprehensive platform. 
              Track attendance, manage teams, and access important resources all in one place.
            </p>

            <button
              onClick={handleGetStarted}
              className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium text-[#191E29] bg-[#01C38D] rounded-full hover:bg-[#01C38D]/90 transition-all hover:scale-105 animate-fade-in-up animation-delay-1500 shadow-lg shadow-[#01C38D]/20"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5 animate-bounce-x" />
            </button>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 animate-fade-in-up animation-delay-2000">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 text-center transform hover:scale-105 transition-all duration-300 hover:bg-white/10"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#01C38D]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10">
                  <div className="text-3xl sm:text-4xl font-bold text-[#01C38D] font-tt-commons mb-2">
                    {stat.number}
                  </div>
                  <p className="text-xs sm:text-sm text-white/60 group-hover:text-white/80 transition-colors">
                    {stat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
