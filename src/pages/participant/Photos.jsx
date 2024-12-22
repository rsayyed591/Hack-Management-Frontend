import { Image, ExternalLink } from 'lucide-react'

export default function Photos() {
  return (
    <div className="min-h-screen p-4 md:p-8 bg-[#191E29]">
      <div className="max-w-4xl mx-auto border-2 border-[#01C38D] rounded-lg p-4 sm:p-8 bg-[#132D46]">
        <h1 className="text-4xl font-bold text-white mb-8 flex items-center font-tt-commons">
          <Image className="mr-4 h-10 w-10 text-[#01C38D]" />
          Photos
        </h1>
        <div className="bg-[#191E29] p-4 sm:p-8 rounded-lg text-center border-2 border-[#01C38D]">
          <p className="text-[#696E79] mb-6">
            Access photos from the hackathon event through the link below:
          </p>
          <a
            href="#"
            className="inline-flex items-center bg-[#01C38D] hover:bg-[#01C38D]/90 text-[#191E29] font-bold py-3 px-6 rounded transition-colors"
          >
            View Photos
            <ExternalLink className="ml-2 h-5 w-5" />
          </a>
        </div>
      </div>
    </div>
  )
}

