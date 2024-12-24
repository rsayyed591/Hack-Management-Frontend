import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { authService } from '../../services/api' // Import the authService

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      // Step 1: Perform login
      await login(email, password)

      // Step 2: Fetch user info
      const response = await authService.getInfo()

      // Step 3: Navigate based on role
      const role = response?.message?.role

      switch (role) {
        case 'superAdmin':
          navigate('/superadmin')
          break
        case 'admin':
          navigate('/admin')
          break
        case 'judge':
          navigate('/judge')
          break
        default:
          navigate('/participant')
      }
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
