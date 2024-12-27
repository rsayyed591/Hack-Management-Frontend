import { useState } from 'react';
import { Upload } from 'lucide-react';
import { adminService } from '../../services/api';
import Loader from '../../components/Loader';

export default function AddBulkUser() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (!file) {
      setError('Please select a CSV file.');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await adminService.bulkAddUser(formData);
      setSuccess(response.message || 'Users added successfully.');
      setFile(null); // Reset the file input
    } catch (err) {
      setError(err.message || 'Failed to add users.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Upload className="h-6 w-6 text-[#01C38D]" />
        <h1 className="text-2xl font-bold text-white">Bulk Add User</h1>
      </div>
      {loading ? (
        <div className="flex justify-center items-center lg:h-[70vh] py-4">
          <Loader />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
          <div>
            <label htmlFor="csvFile" className="block text-sm font-medium text-white">
              Upload CSV File
            </label>
            <input
              type="file"
              id="csvFile"
              name="file"
              accept=".csv"
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm text-slate-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-[#01C38D] file:text-[#191E29]
              hover:file:bg-[#01C38D]/90
              "
            />
          </div>
          <button
            type="submit"
            disabled={!file || loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-[#191E29] bg-[#01C38D] hover:bg-[#01C38D]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#01C38D] disabled:opacity-50"
          >
            Upload
          </button>
        </form>
      )}
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      {success && <p className="mt-2 text-sm text-green-600">{success}</p>}
    </div>
  );
}

