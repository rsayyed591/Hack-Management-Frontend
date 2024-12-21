import { Link } from 'react-router-dom'
import { QrCode, Utensils, FileText, Award, Image } from 'lucide-react'

export default function Participant() {
  const sections = [
    { name: 'Check-in', icon: QrCode, path: '/participant/check-in' },
    { name: 'Food', icon: Utensils, path: '/participant/food' },
    { name: 'Problem Statement', icon: FileText, path: '/participant/problem-statement' },
    { name: 'Certificate', icon: Award, path: '/participant/certificate' },
    { name: 'Photos', icon: Image, path: '/participant/photos' },
  ]

  return (
    <div className="min-h-screen p-4 md:p-8 bg-white">
      <div className="max-w-6xl mx-auto space-y-12">
        <h1 className="text-5xl font-bold text-black text-center mb-12 font-orbitron">Hackathon Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sections.map((section) => (
            <Link
              key={section.name}
              to={section.path}
              className="bg-white border-2 border-black rounded-lg p-8 text-black hover:bg-gray-100 transition-all transform hover:scale-105 group"
            >
              <div className="flex items-center justify-center mb-6">
                <section.icon className="h-16 w-16" />
              </div>
              <h2 className="text-2xl font-semibold text-center font-orbitron group-hover:underline">{section.name}</h2>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

