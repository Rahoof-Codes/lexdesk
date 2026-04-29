import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './modules/dashboard/Dashboard'
import Cases from './modules/cases/Cases'
import Billing from './modules/billing/Billing'
import Vault from './modules/vault/Vault'
import Clients from './modules/clients/Clients'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"         element={<Dashboard />} />
        <Route path="/cases"    element={<Cases />} />
        <Route path="/billing"  element={<Billing />} />
        <Route path="/vault"    element={<Vault />} />
        <Route path="/clients"  element={<Clients />} />
      </Routes>
    </BrowserRouter>
  )
}