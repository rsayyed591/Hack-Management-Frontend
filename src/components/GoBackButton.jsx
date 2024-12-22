import { useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function GoBackButton() {
  const navigate = useNavigate()
  const location = useLocation()

  const goBack = () => {
    if (location.key !== "default") {
      navigate(-1)
    } else {
      navigate('/')
    }
  }

  return (
    <button
      onClick={goBack}
      className="absolute top-4 left-4 text-white hover:text-[#01C38D] transition-colors flex items-center text-sm sm:text-base"
    >
      <ArrowLeft className="mr-1 h-4 w-4 sm:h-5 sm:w-5" />
      Go Back
    </button>
  )
}

