import { FileText } from 'lucide-react'

export default function ProblemStatement() {
  return (
    <div className="min-h-screen p-4 md:p-8 bg-white">
      <div className="max-w-4xl mx-auto border-2 border-black rounded-lg p-4 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-black mb-6 sm:mb-8 flex items-center font-orbitron">
          <FileText className="mr-2 sm:mr-4 h-8 w-8 sm:h-10 sm:w-10" />
          Problem Statement
        </h1>
        <div className="bg-gray-100 p-4 sm:p-8 rounded-lg border-2 border-black">
          <p className="text-black font-poppins">
            The problem statement for the hackathon will be displayed here. It will outline the challenge that participants need to address during the event.
          </p>
        </div>
      </div>
    </div>
  )
}

