import { useState, useEffect } from 'react'
import { Combobox } from '@headlessui/react'
import { ClipboardList } from 'lucide-react'
import { adminService } from '../../services/api'
import Loader from '../../components/Loader'

export default function NotCheckedInUsers() {
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState('')
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Fetch checked-in users
  useEffect(() => {
    const fetchNotCheckedInUsers = async () => {
      setLoading(true)
      try {
        const response = await adminService.getNotCheckedInUsers()
        setUsers(response.data || [])
        setFilteredUsers(response.data || [])
      } catch (err) {
        setError('Failed to fetch checked-in users')
      } finally {
        setLoading(false)
      }
    }

    fetchNotCheckedInUsers()
  }, [])

  // Handle Search Filtering
  useEffect(() => {
    const filtered = query === ''
      ? users
      : users.filter((user) =>
          user.name.toLowerCase().includes(query.toLowerCase()) ||
          user.email.toLowerCase().includes(query.toLowerCase())
        )
    setFilteredUsers(filtered)
  }, [query, users])

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center lg:h-[70vh] bg-[#191E29]">
        <Loader />
      </div>
    )
  }

  // Error state
  if (error) {
    return <p className="text-red-600">{error}</p>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <ClipboardList className="h-6 w-6 text-[#01C38D]" />
        <h1 className="text-2xl font-bold text-white">Checked-In Users</h1>
      </div>

      {/* Search Box */}
      <Combobox value={selectedUser} onChange={setSelectedUser}>
        <div className="relative w-full">
          <Combobox.Input
            className="w-full px-4 py-2 border border-[#01C38D] bg-[#191E29] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#01C38D]"
            placeholder="Search users..."
            onChange={(event) => setQuery(event.target.value)}
          />
          <Combobox.Options className="absolute mt-2 w-full bg-[#132D46] border border-[#01C38D] rounded-md shadow-lg max-h-60 overflow-auto z-50">
            {filteredUsers.length === 0 && query !== '' ? (
              <div className="p-2 text-white">No users found.</div>
            ) : (
              filteredUsers.map((user) => (
                <Combobox.Option
                  key={user._id}
                  value={user}
                  className={({ active }) =>
                    `p-2 cursor-pointer ${active ? 'bg-[#01C38D] text-[#191E29]' : 'text-white'}`
                  }
                >
                  {user.name} - {user.email}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </div>
      </Combobox>

      {/* Table */}
      {filteredUsers.length === 0 ? (
        <p className="text-white">No checked-in users found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#01C38D]">
            <thead className="bg-[#132D46]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#01C38D] uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#01C38D] uppercase tracking-wider">
                  Email
                </th>
              </tr>
            </thead>
            <tbody className="bg-[#191E29] divide-y divide-[#01C38D]">
              {filteredUsers.map((user) => (
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
