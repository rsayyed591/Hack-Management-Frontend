import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1/user',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})


export const authService = {
  login: async (email, password) => {
    try {
      const response = await api.post('/login', { email, password })
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  logout: async () => {
    try {
      const response = await api.get('/logout')
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  getInfo: async () => {
    try {
      const response = await api.get('/getInfo')
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
      const response = await api.get('/participantInfoQR')
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  getQRForFood: async (food) => {
    try {
      const response = await api.post('/qrForFood', { food })
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  }
}

