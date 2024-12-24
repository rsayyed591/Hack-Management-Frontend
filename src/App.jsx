import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Hero from './pages/Hero'
import Login from './pages/auth/Login'

// Participant Routes
import Participant from './pages/participant/Participant'
import CheckIn from './pages/participant/CheckIn'
import Food from './pages/participant/Food'
import ProblemStatement from './pages/participant/ProblemStatement'
import Certificate from './pages/participant/Certificate'
import Photos from './pages/participant/Photos'

// Super Admin Routes
import SuperAdminDashboard from './pages/superadmin/SuperAdminDashboard'
import Dashboard from './pages/superadmin/Dashboard'
import AddUser from './pages/superadmin/AddUser'
import AddTeam from './pages/superadmin/AddTeam'
import Participants from './pages/superadmin/Participants'
import Teams from './pages/superadmin/Teams'
import AssignJudges from './pages/superadmin/AssignJudges'
import LeaderBoard from './pages/superadmin/LeaderBoard'

const SuperAdminRoute = ({ children }) => {
  const { user, loading } = useAuth()
  
  if (loading) {
    return <div>Loading...</div>
  }

  if (!user || user?.message?.role !== 'superAdmin') {
    return <Navigate to="/login" replace />
  }
  
  return children
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/login" element={<Login />} />
          
          {/* Participant Routes */}
          <Route 
            path="/participant" 
            element={
              <ProtectedRoute>
                <Participant />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/participant/check-in" 
            element={
              <ProtectedRoute>
                <CheckIn />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/participant/food" 
            element={
              <ProtectedRoute>
                <Food />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/participant/problem-statement" 
            element={
              <ProtectedRoute>
                <ProblemStatement />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/participant/certificate" 
            element={
              <ProtectedRoute>
                <Certificate />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/participant/photos" 
            element={
              <ProtectedRoute>
                <Photos />
              </ProtectedRoute>
            } 
          />

          {/* Super Admin Routes */}
          <Route
            path="/superadmin"
            element={
              <SuperAdminRoute>
                <SuperAdminDashboard />
              </SuperAdminRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="add-user" element={<AddUser />} />
            <Route path="add-team" element={<AddTeam />} />
            <Route path="participants" element={<Participants />} />
            <Route path="teams" element={<Teams />} />
            <Route path="assign-judges" element={<AssignJudges />} />
            <Route path="leaderboard" element={<LeaderBoard />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  )
}

