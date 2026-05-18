import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import React, {useState} from 'react'
import { useAuth } from './context/AuthContext'
import Home          from './pages/Home'
import Register      from './pages/Register'
import Login         from './pages/Login'
import Dashboard     from './pages/Dashboard'
import WeeklyProgram from './pages/WeeklyProgram'
import AdminDashboard from './pages/AdminDashboard'

// Redirect logged-in users away from login/register
function GuestRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <div className="page-loading"><div className="spinner"></div></div>
  return user ? <Navigate to="/dashboard" replace /> : children
}

// Redirect unauthenticated users to login
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <div className="page-loading"><div className="spinner"></div></div>
  return user ? children : <Navigate to="/login" replace />
}

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/register" element={
          <GuestRoute><Register /></GuestRoute>
        } />

        <Route path="/login" element={
          <GuestRoute><Login /></GuestRoute>
        } />
<Route path='/admin' element={<AdminDashboard/>}/>

        <Route path="/dashboard" element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        } />

        <Route path="/weekly-program" element={
          <ProtectedRoute><WeeklyProgram /></ProtectedRoute>
        } />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;