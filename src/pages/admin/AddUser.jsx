import { useState } from 'react'
import { UserPlus } from 'lucide-react'
import { adminService } from '../../services/api'
import Loader from '../../components/Loader'

export default function AddUser() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'participant',
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)
    try {
      const response = await adminService.addUser(formData)
      console.log(response);
      if (response.statusCode >= 200 && response.statusCode < 300) {
        setSuccess('User added successfully')
        setFormData({ name: '', email: '', password: '', role: 'participant' })
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to add user');
      }
    } catch (err) {
      setError(err.message || 'Failed to add user')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <UserPlus className="h-6 w-6 text-[#01C38D]" />
        <h1 className="text-2xl font-bold text-white">Add User</h1>
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      {success && <p className="mt-2 text-sm text-green-600">{success}</p>}

      {loading ? (
        <div className="flex justify-center items-center lg:h-[70vh] py-4">
          <Loader />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-white">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md bg-[#132D46] border-[#01C38D] text-white shadow-sm focus:border-[#01C38D] focus:ring focus:ring-[#01C38D] focus:ring-opacity-50 px-4 py-2"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md bg-[#132D46] border-[#01C38D] text-white shadow-sm focus:border-[#01C38D] focus:ring focus:ring-[#01C38D] focus:ring-opacity-50 px-4 py-2"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md bg-[#132D46] border-[#01C38D] text-white shadow-sm focus:border-[#01C38D] focus:ring focus:ring-[#01C38D] focus:ring-opacity-50 px-4 py-2"
            />
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-white">Role</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md bg-[#132D46] border-[#01C38D] text-white shadow-sm focus:border-[#01C38D] focus:ring focus:ring-[#01C38D] focus:ring-opacity-50 px-4 py-2"
            >
              <option value="participant">Participant</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-[#191E29] bg-[#01C38D] hover:bg-[#01C38D]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#01C38D]"
          >
            Add User
          </button>
        </form>
      )}
    </div>
  )
}