import { Image, ExternalLink } from 'lucide-react'

export default function Photos() {
  return (
    <div className="min-h-screen p-4 md:p-8 bg-white">
      <div className="max-w-4xl mx-auto border-2 border-black rounded-lg p-4 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-black mb-6 sm:mb-8 flex items-center font-orbitron">
          <Image className="mr-2 sm:mr-4 h-8 w-8 sm:h-10 sm:w-10" />
          Photos
        </h1>
        <div className="bg-gray-100 p-4 sm:p-8 rounded-lg text-center border-2 border-black">
          <p className="text-black mb-4 sm:mb-6 font-poppins">
            Access photos from the hackathon event through the link below:
          </p>
          <a
            href="#"
            className="inline-flex items-center bg-black hover:bg-gray-800 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded font-poppins transition-colors"
          >
            View Photos
            <ExternalLink className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
          </a>
        </div>
      </div>
    </div>
  )
}

