import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Hero from './pages/Hero'
import Participant from './pages/participant/Participant'
import CheckIn from './pages/participant/CheckIn'
import Food from './pages/participant/Food'
import ProblemStatement from './pages/participant/ProblemStatement'
import Certificate from './pages/participant/Certificate'
import Photos from './pages/participant/Photos'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/participant" element={<Participant />} />
        <Route path="/participant/check-in" element={<CheckIn />} />
        <Route path="/participant/food" element={<Food />} />
        <Route path="/participant/problem-statement" element={<ProblemStatement />} />
        <Route path="/participant/certificate" element={<Certificate />} />
        <Route path="/participant/photos" element={<Photos />} />
      </Routes>
    </Router>
  )
}

