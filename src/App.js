import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import React from 'react'

import { useAuth } from './context/AuthContext'

import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import WeeklyProgram from './pages/WeeklyProgram'

import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'

// REDIRECT LOGGED-IN USERS
function GuestRoute({ children }) {

  const {
    user,
    loading
  } = useAuth()

  if (loading) {

    return (
      <div className="page-loading">
        <div className="spinner"></div>
      </div>
    )

  }

  return user
    ? <Navigate to="/dashboard" replace />
    : children

}

// PROTECTED ROUTE
function ProtectedRoute({ children }) {

  const {
    user,
    loading
  } = useAuth()

  if (loading) {

    return (
      <div className="page-loading">
        <div className="spinner"></div>
      </div>
    )

  }

  return user
    ? children
    : <Navigate to="/login" replace />

}

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* HOME */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* REGISTER */}
        <Route
          path="/register"
          element={
            <GuestRoute>
              <Register />
            </GuestRoute>
          }
        />

        {/* LOGIN */}
        <Route
          path="/login"
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />

        {/* ADMIN LOGIN */}
        <Route
          path="/admin"
          element={<AdminLogin />}
        />

        {/* ADMIN DASHBOARD */}
        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />

        {/* USER DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* WEEKLY PROGRAM */}
        <Route
          path="/weekly-program"
          element={
            <ProtectedRoute>
              <WeeklyProgram />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

      </Routes>

    </BrowserRouter>

  )
}

export default App