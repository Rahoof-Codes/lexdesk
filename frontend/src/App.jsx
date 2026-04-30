import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Login     from './modules/auth/Login'
import Dashboard from './modules/dashboard/Dashboard'
import Cases     from './modules/cases/Cases'
import CaseDetail from './modules/cases/CaseDetail'
import Billing   from './modules/billing/Billing'
import Vault     from './modules/vault/Vault'
import { Loader2 } from 'lucide-react'

// Wrapper: if not logged in, redirect to /login
function ProtectedRoute({ children }) {
  const { advocate, loading } = useAuth()

  if (loading) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <Loader2 size={28} className="animate-spin text-yellow-500" />
    </div>
  )

  return advocate ? children : <Navigate to="/login" replace />
}

function AppRoutes() {
  const { advocate } = useAuth()

  return (
    <Routes>
      <Route path="/login" element={advocate ? <Navigate to="/" replace /> : <Login />} />
      <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/cases" element={<ProtectedRoute><Cases /></ProtectedRoute>} />
      <Route path="/cases/:id" element={<ProtectedRoute><CaseDetail /></ProtectedRoute>} />
      <Route path="/billing" element={<ProtectedRoute><Billing /></ProtectedRoute>} />
      <Route path="/vault" element={<ProtectedRoute><Vault /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}