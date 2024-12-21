import { Award } from 'lucide-react'

export default function Certificate() {
  return (
    <div className="min-h-screen p-4 md:p-8 bg-white">
      <div className="max-w-4xl mx-auto border-2 border-black rounded-lg p-4 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-black mb-6 sm:mb-8 flex items-center font-orbitron">
          <Award className="mr-2 sm:mr-4 h-8 w-8 sm:h-10 sm:w-10" />
          Certificate
        </h1>
        <div className="bg-gray-100 p-4 sm:p-8 rounded-lg text-center border-2 border-black">
          <p className="text-black mb-4 sm:mb-6 font-poppins">
            Your certificate of participation will be available here after the hackathon concludes and the admin uploads it.
          </p>
          <button className="bg-black hover:bg-gray-800 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded font-poppins disabled:opacity-50 disabled:cursor-not-allowed" disabled>
            Download Certificate
          </button>
        </div>
      </div>
    </div>
  )
}
