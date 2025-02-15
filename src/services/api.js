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
  },

  viewPS: async () => {
    try {
      const response = await api.get('/user/viewPS')
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  // Add these new methods
  // getCertificate: async () => {
  //   try {
  //     const response = await api.get('/user/getCertificate')
  //     return response.data
  //   } catch (error) {
  //     throw error.response?.data || error
  //   }
  // },

  // getPhotos: async () => {
  //   try {
  //     const response = await api.get('/user/getPhotos')
  //     return response.data
  //   } catch (error) {
  //     throw error.response?.data || error
  //   }
  // }
}

export const superAdminService = {
  // Get dashboard stats
  getDashboardStats: async () => {
    try {
      const [teamsResponse, participantsResponse, leaderboardResponse] = await Promise.all([
        api.get('/superAdmin/getTeams'),
        api.get('/superAdmin/getParticipants'),
        api.get('/superAdmin/leaderboard')
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
      const response = await api.get('/superAdmin/leaderboard')
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  getJudges: async () => {
    try {
      const response = await api.get('/superAdmin/getJudges')
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  getParticipantsNotInTeam: async () => {
    try {
      const response = await api.get('/superAdmin/getParticipantsNotTeam')
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  getAssignedJudges: async () => {
    try {
      const response = await api.get('/superAdmin/getAssignedJudges')
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },
}

export const adminService = {
  // Get dashboard stats
  getDashboardStats: async () => {
    try {
      const [participantsResponse, teamsResponse, checkedInResponse] = await Promise.all([
        api.get('/admin/getParticipants'),
        api.get('/admin/getTeams'),
        api.get('/admin/getCheckedInUsers')
      ])

      return {
        totalParticipants: participantsResponse.data.data.length,
        totalTeams: teamsResponse.data.data.length,
        totalCheckedIn: checkedInResponse.data.data.length
      }
    } catch (error) {
      throw error.response?.data || error
    }
  },

  // Add new user
  addUser: async (userData) => {
    try {
      const response = await api.post('/admin/addUser', userData)
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  // Bulk add users
  bulkAddUser: async (formData) => {
    try {
      const response = await api.post('/admin/bulkAddUser', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  // Add new team
  addTeam: async (teamData) => {
    try {
      const response = await api.post('/admin/addTeam', teamData)
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  // Get all teams
  getTeams: async () => {
    try {
      const response = await api.get('/admin/getTeams')
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  // Get all participants
  getParticipants: async () => {
    try {
      const response = await api.get('/admin/getParticipants')
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  // Check in by email
  checkInByEmail: async (email) => {
    try {
      const response = await api.post('/admin/checkIn', { email })
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  // Check in by QR
  checkInByQR: async (qrData) => {
    try {
      const response = await api.post('/admin/checkInByQr', { qrData })
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  // Get checked in users
  getCheckedInUsers: async () => {
    try {
      const response = await api.get('/admin/getCheckedInUsers')
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  // Get not checked in users
  getNotCheckedInUsers: async () => {
    try {
      const response = await api.get('/admin/notCheckIn')
      console.log(response.data)
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  // Food QR
  foodQR: async (qrData) => {
    try {
      const response = await api.post('/admin/foodQr', { qrData })
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  // Add problem statement
  addPS: async (psData) => {
    try {
      const response = await api.post('/admin/addPS', psData)
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  }
}

export const judgeService = {
  getAssignedTeams: async (round) => {
    try {
      const response = await api.get(`/judge/seeAssignedTeams/${round}`)
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  fillMarks: async (marksData) => {
    try {
      const response = await api.post('/judge/fillMarks', marksData)
      console.log("res",response,marksData)
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  editMarks: async (marksData) => {
    try {
      const response = await api.put('/judge/editMarks', marksData)
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  viewPreviousMarks: async (teamName) => {
    try {
      const response = await api.get(`/judge/viewPreviousMarks/${teamName}`)
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  }
}

