import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function RoleSelection() {
  const [selectedRole, setSelectedRole] = useState('')
  const navigate = useNavigate()

  const roles = ['participant', 'judge', 'admin', 'superadmin']

  const handleRoleSelect = () => {
    if (selectedRole) {
      navigate(`/auth/${selectedRole}`)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#191E29] px-4 sm:px-6 lg:px-8">
      <div className="bg-[#132D46] p-6 sm:p-8 rounded-lg border-2 border-[#01C38D] max-w-md w-full">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center font-tt-commons">Select Your Role</h1>
        <div className="space-y-3 sm:space-y-4">
          {roles.map((role) => (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              className={`w-full py-2 px-4 rounded-md text-white font-medium transition-colors ${
                selectedRole === role ? 'bg-[#01C38D]' : 'bg-[#191E29] hover:bg-[#01C38D]/20'
              }`}
            >
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </button>
          ))}
        </div>
        <button
          onClick={handleRoleSelect}
          disabled={!selectedRole}
          className="w-full mt-6 py-2 px-4 bg-[#01C38D] text-[#191E29] rounded-md font-bold hover:bg-[#01C38D]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </div>
  )
}