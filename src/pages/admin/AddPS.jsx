import { useState } from 'react'
import { FileText } from 'lucide-react'
import { adminService } from '../../services/api'
import Loader from '../../components/Loader'

export default function AddPS() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    domain: '',
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
      const response = await adminService.addPS(formData)
      console.log(response);
      if (response.statusCode >= 200 && response.statusCode < 300) {
        setSuccess('Problem statement added successfully')
        setFormData({ title: '', description: '', domain: '' })
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to add ps');
      }      
    } catch (err) {
      setError(err.message || 'Failed to add problem statement')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <FileText className="h-6 w-6 text-[#01C38D]" />
        <h1 className="text-2xl font-bold text-white">Add Problem Statement</h1>
      </div>

      {loading ? (
        <div className="flex justify-center items-center lg:h-[70vh] py-4">
          <Loader />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-white">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md bg-[#132D46] border-[#01C38D] text-white shadow-sm focus:border-[#01C38D] focus:ring focus:ring-[#01C38D] focus:ring-opacity-50 px-4 py-2"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-white">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md bg-[#132D46] border-[#01C38D] text-white shadow-sm focus:border-[#01C38D] focus:ring focus:ring-[#01C38D] focus:ring-opacity-50 px-4 py-2"
            />
          </div>
          <div>
            <label htmlFor="domain" className="block text-sm font-medium text-white">Domain</label>
            <input
              type="text"
              id="domain"
              name="domain"
              value={formData.domain}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md bg-[#132D46] border-[#01C38D] text-white shadow-sm focus:border-[#01C38D] focus:ring focus:ring-[#01C38D] focus:ring-opacity-50 px-4 py-2"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-[#191E29] bg-[#01C38D] hover:bg-[#01C38D]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#01C38D]"
          >
            Add Problem Statement
          </button>
        </form>
      )}
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      {success && <p className="mt-2 text-sm text-green-600">{success}</p>}
    </div>
  )
}

