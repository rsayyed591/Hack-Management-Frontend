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
import Loader from './components/Loader'
import AssignedJudges from './pages/superadmin/AssignedJudges'

// Admin Routes
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminDashboardHome from './pages/admin/Dashboard'
import AdminAddUser from './pages/admin/AddUser'
import AdminBulkAddUser from './pages/admin/AddBulkUser'
import AdminAddTeam from './pages/admin/AddTeam'
import AdminParticipants from './pages/admin/Participants'
import AdminTeams from './pages/admin/Teams'
import AdminCheckIn from './pages/admin/CheckIn'
import AdminCheckedInUsers from './pages/admin/CheckedInUsers'
import AdminAddPS from './pages/admin/AddPS'
import AdminFoodQR from './pages/admin/FoodQR'

// Add these imports at the top
import Judge from './pages/judge/Judge'
import AssignedTeams from './pages/judge/AssignedTeams'
import GiveMarks from './pages/judge/GiveMarks'
import EditMarks from './pages/judge/EditMarks'

const SuperAdminRoute = ({ children }) => {
  const { user, loading } = useAuth()
  
  if (loading) {
    return <Loader />
  }

  if (!user || user?.message?.role !== 'superAdmin') {
    return <Navigate to="/login" replace />
  }
  
  return children
}

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth()
  
  if (loading) {
    return <Loader />
  }

  if (!user || user?.message?.role !== 'admin') {
    return <Navigate to="/login" replace />
  }
  
  return children
}

// Add this route guard component
const JudgeRoute = ({ children }) => {
  const { user, loading } = useAuth()
  
  if (loading) {
    return <Loader />
  }

  if (!user || user?.message?.role !== 'judge') {
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
            <Route path="assigned-judges" element={<AssignedJudges />} />
            <Route path="leaderboard" element={<LeaderBoard />} />
          </Route>

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          >
            <Route index element={<AdminDashboardHome />} />
            <Route path="add-user" element={<AdminAddUser />} />
            <Route path="bulk-add-user" element={<AdminBulkAddUser />} />
            <Route path="add-team" element={<AdminAddTeam />} />
            <Route path="participants" element={<AdminParticipants />} />
            <Route path="teams" element={<AdminTeams />} />
            <Route path="check-in" element={<AdminCheckIn />} />
            <Route path="checked-in-users" element={<AdminCheckedInUsers />} />
            <Route path="add-ps" element={<AdminAddPS />} />
            <Route path="food-qr" element={<AdminFoodQR />} />
          </Route>

          {/* Add these routes in your Routes component */}
          <Route
            path="/judge"
            element={
              <JudgeRoute>
                <Judge />
              </JudgeRoute>
            }
          />
          <Route
            path="/judge/assigned-teams"
            element={
              <JudgeRoute>
                <AssignedTeams />
              </JudgeRoute>
            }
          />
          <Route
            path="/judge/give-marks/:teamName/:teamId"
            element={
              <JudgeRoute>
                <GiveMarks />
              </JudgeRoute>
            }
          />
          <Route
            path="/judge/edit-marks/:teamName/:teamId"
            element={
              <JudgeRoute>
                <EditMarks />
              </JudgeRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

