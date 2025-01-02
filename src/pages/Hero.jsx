import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useAuth } from './../contexts/AuthContext'

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
    <div className="min-h-screen flex items-center justify-center bg-[#191E29] relative px-4 sm:px-6 lg:px-8">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center opacity-10 z-0"></div>
      
      <div className="container mx-auto py-12 sm:py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left content */}
          <div className="space-y-6 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-white font-tt-commons">
              Hackathon
              <span className="block text-[#01C38D]">Manager</span>
            </h1>
            <p className="max-w-[600px] text-base sm:text-lg md:text-xl text-[#696E79] mx-auto lg:mx-0">
              Streamline your hackathon experience with our comprehensive platform. 
              Track attendance, manage teams, and access important resources all in one place.
            </p>
            <button
              onClick={handleGetStarted}
              className="inline-flex items-center px-6 py-3 text-lg font-medium text-[#191E29] bg-[#01C38D] rounded-md hover:bg-[#01C38D]/90 transition-colors group"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right content - Image */}
          <div className="relative">
            <div className="relative w-full h-[400px] transform hover:scale-105 transition-transform duration-500">
              <img
                src="/trex.png"
                alt="T-Rex Innovation"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>

        {/* Stats section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="bg-[#132D46] border-2 border-[#01C38D]/20 rounded-lg p-6 text-center transform hover:scale-105 transition-all"
            >
              <div className="text-3xl sm:text-4xl font-bold text-[#01C38D] font-tt-commons">
                {stat.number}
              </div>
              <p className="mt-2 text-sm sm:text-base text-[#696E79]">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

