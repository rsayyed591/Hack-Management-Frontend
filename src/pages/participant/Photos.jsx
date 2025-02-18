import { Camera, ExternalLink } from 'lucide-react'
import GoBackButton from '../../components/GoBackButton'
import { useAuth } from '../../contexts/AuthContext'

export default function Photos() {
  const photoLinks = [
    {
      day: "Day 1",
      link: "https://drive.google.com/drive/folders/10a6MvJzB-Yot7OictPhDoE8VJf9vyCH3?usp=drive_link",
      description: "Inauguration, Fun Activities, and Mentoring Sessions",
    },
    {
      day: "Day 2",
      link: "https://drive.google.com/drive/folders/10urzmdyNAyMWRyV40_t2clu3t6LAYup4?usp=drive_link",
      description: "Project Presentations and Closing Ceremony",
    },
  ]
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
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 flex items-center">
        <Camera className="mr-4 h-8 w-8 text-[#01C38D]" />
        Event Photos
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {photoLinks.map((item, index) => (
          <div
            key={index}
            className="bg-[#132D46] rounded-lg p-6 border-2 border-[#01C38D]/20 hover:border-[#01C38D] transition-colors"
          >
            <h2 className="text-2xl font-bold text-[#01C38D] mb-3">{item.day}</h2>
            <p className="text-gray-300 mb-4">{item.description}</p>
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-[#01C38D] text-[#191E29] rounded-md hover:bg-[#01C38D]/90 transition-colors"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              View Photos
            </a>
          </div>
        ))}
      </div>

      <p className="mt-8 text-gray-400 text-sm">
        Note: Photos will open in Google Drive. Make sure you&apos;re logged in to your Google account to access them.
      </p>
    </div>
  )
}

