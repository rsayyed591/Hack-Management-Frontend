import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Hero from './pages/Hero'
import Participant from './pages/participant/Participant'
import CheckIn from './pages/participant/CheckIn'
import Food from './pages/participant/Food'
import ProblemStatement from './pages/participant/ProblemStatement'
import Certificate from './pages/participant/Certificate'
import Photos from './pages/participant/Photos'
import Login from './pages/auth/Login'

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/login" element={<Login />} />
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
        </Routes>
      </AuthProvider>
    </Router>
  )
}