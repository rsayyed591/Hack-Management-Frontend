import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white relative">
      <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center opacity-20 z-0"></div>
      <div className="container mx-auto px-4 md:px-6 py-24 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-black font-orbitron">
            Hackathon Manager
          </h1>
          <p className="max-w-[700px] text-lg md:text-xl text-gray-700 font-poppins">
            Manage your hackathon experience with our comprehensive platform. Track attendance, meals, and access important resources all in one place.
          </p>
          <Link
            to="/participant"
            className="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-black rounded-md hover:bg-gray-800 transition-colors font-poppins group"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  )
}

