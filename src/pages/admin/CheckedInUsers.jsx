import { useState, useEffect } from 'react'
import { ClipboardList } from 'lucide-react'
import { adminService } from '../../services/api'
import Loader from '../../components/Loader'

export default function CheckedInUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchCheckedInUsers = async () => {
      setLoading(true)
      try {
        const response = await adminService.getCheckedInUsers()
        setUsers(response.data || [])
      } catch (err) {
        setError('Failed to fetch checked-in users')
      } finally {
        setLoading(false)
      }
    }

    fetchCheckedInUsers()
  }, [])

  if (loading) {
    return <div className="flex items-center justify-center lg:h-[70vh] bg-[#191E29]">
      <Loader />
    </div>
  }

  if (error) {
    return <p className="text-red-600">{error}</p>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <ClipboardList className="h-6 w-6 text-[#01C38D]" />
        <h1 className="text-2xl font-bold text-white">Checked-In Users</h1>
      </div>
      {users.length === 0 ? (
        <p className="text-white">No checked-in users found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#01C38D]">
            <thead className="bg-[#132D46]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#01C38D] uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#01C38D] uppercase tracking-wider">Email</th>
              </tr>
            </thead>
            <tbody className="bg-[#191E29] divide-y divide-[#01C38D]">
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

