import { useState } from 'react'
import { Mail } from 'lucide-react'
import { adminService } from '../../services/api'
import Loader from '../../components/Loader';

export default function CheckIn() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)


  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      await adminService.checkInByEmail(email)
      setSuccess('Participant checked in successfully')
      setEmail('')
    } catch (err) {
      setError(err.message || 'Failed to check in participant')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Mail className="h-6 w-6 text-[#01C38D]" />
        <h1 className="text-2xl font-bold text-white">Check In by Email</h1>
      </div>

      {loading ? (
        <div className="flex justify-center items-center lg:h-[70vh] py-4">
          <Loader />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white">Participant Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full rounded-md bg-[#132D46] border-[#01C38D] text-white shadow-sm focus:border-[#01C38D] focus:ring focus:ring-[#01C38D] focus:ring-opacity-50 px-4 py-2"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-[#191E29] bg-[#01C38D] hover:bg-[#01C38D]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#01C38D]"
          >
            Check In
          </button>
        </form>
      )}
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      {success && <p className="mt-2 text-sm text-green-600">{success}</p>}
    </div>
  )
}
