import { useEffect, useState } from 'react' 
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export default function Login() {
  const navigate = useNavigate()
  const { user, login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (user) {
      navigate('/participant',{replace:true})  
    }
  }, [user, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await login(email, password)
      navigate('/participant', { replace: true })
    } catch (error) {
      setError(error.message || 'Invalid email or password. Please try again.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#191E29] px-4 sm:px-6 lg:px-8">
      <div className="bg-[#132D46] p-6 sm:p-8 rounded-lg border-2 border-[#01C38D] max-w-md w-full">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center font-tt-commons">
          Login
        </h1>
        {error && (
          <div className="bg-red-500 text-white p-3 rounded-md mb-4 text-sm">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-white mb-1 text-sm sm:text-base">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-[#191E29] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#01C38D] text-sm sm:text-base"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-white mb-1 text-sm sm:text-base">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-[#191E29] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#01C38D] text-sm sm:text-base"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#01C38D] text-[#191E29] rounded-md font-bold hover:bg-[#01C38D]/90 transition-colors text-sm sm:text-base"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}