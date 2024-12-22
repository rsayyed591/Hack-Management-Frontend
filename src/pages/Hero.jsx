import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useAuth } from './../contexts/AuthContext'

export default function Hero() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleGetStarted = () => {
    if (user) {
      navigate('/participant')  
    } else {
      navigate('/login')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#191E29] relative px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center opacity-10 z-0"></div>
      <div className="container mx-auto py-12 sm:py-24 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-6 sm:space-y-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-white font-tt-commons">
            Hackathon Manager
          </h1>
          <p className="max-w-[700px] text-base sm:text-lg md:text-xl text-[#696E79]">
            Manage your hackathon experience with our comprehensive platform. Track attendance, meals, and access important resources all in one place.
          </p>
          <button
            onClick={handleGetStarted}  // Call the function to handle the redirection
            className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 text-base sm:text-lg font-medium text-[#191E29] bg-[#01C38D] rounded-md hover:bg-[#01C38D]/90 transition-colors group"
          >
            Get Started
            <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  )
}
