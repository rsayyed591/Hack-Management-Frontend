import axios from 'axios'

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/v1`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

const token = localStorage.getItem('token')
if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export const authService = {
  login: async (email, password) => {
    try {
      const response = await api.post('/user/login', { email, password })

      // Save the token in localStorage
      const token = response.data.message.token
      localStorage.setItem('token', token)

      // Set Authorization header for subsequent requests
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`

      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  logout: async () => {
    try {
      const response = await api.get('/user/logout')
      // Clear token from localStorage and headers
      localStorage.removeItem('token')
      delete api.defaults.headers.common['Authorization']

      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  getInfo: async () => {
    try {
      const response = await api.get('/user/getInfo')
      return response.data
    } catch (error) {
      if (error.response && error.response.status === 401) {
        return null
      }
      throw error.response?.data || error
    }
  }
}


export const participantService = {
  getParticipantInfoQR: async () => {
    try {
      const response = await api.get('/user/participantInfoQR')
      return response.data.message
    } catch (error) {
      throw error.response?.message || error
    }
  },

  getQRForFood: async (food) => {
    try {
      const response = await api.post('/user/qrForFood', { food })
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  }
}

export const superAdminService = {
  // Get dashboard stats
  getDashboardStats: async () => {
    try {
      const [teamsResponse, participantsResponse, leaderboardResponse] = await Promise.all([
        api.get('/superAdmin/getTeams'),
        api.get('/superAdmin/getParticipants'),
        api.get('/superAdmin/leaderBoard')
      ])

      return {
        totalTeams: teamsResponse.data.data.length,
        totalParticipants: participantsResponse.data.data.length,
        topTeams: leaderboardResponse.data.data.slice(0, 5) // Get top 5 teams
      }
    } catch (error) {
      throw error.response?.data || error
    }
  },

  // Add new user
  addUser: async (userData) => {
    try {
      const response = await api.post('/superAdmin/addUser', userData)
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  // Add new team
  addTeam: async (teamData) => {
    try {
      const response = await api.post('/superAdmin/addTeam', teamData)
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  // Get all teams
  getTeams: async () => {
    try {
      const response = await api.get('/superAdmin/getTeams')
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  // Get all participants
  getParticipants: async () => {
    try {
      const response = await api.get('/superAdmin/getParticipants')
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  // Assign teams to judges
  assignTeamsJudge: async (assignmentData) => {
    try {
      const response = await api.post('/superAdmin/assignTeamsJudge', assignmentData)
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  // Get leaderboard
  getLeaderboard: async () => {
    try {
      const response = await api.get('/superAdmin/leaderBoard')
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  }
}

