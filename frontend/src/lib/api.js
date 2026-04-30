const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000'

function getToken() {
  return localStorage.getItem('lexdesk_token')
}

async function request(path, options = {}) {
  const token = getToken()

  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  })

  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Request failed')
  return data
}

// Auth
export const authAPI = {
  login:    (body) => request('/api/auth/login',    { method: 'POST', body: JSON.stringify(body) }),
  register: (body) => request('/api/auth/register', { method: 'POST', body: JSON.stringify(body) }),
  me:       ()     => request('/api/auth/me'),
}

// Cases
export const casesAPI = {
  getAll:   ()         => request('/api/cases'),
  getOne:   (id)       => request(`/api/cases/${id}`),
  create:   (body)     => request('/api/cases',     { method: 'POST',   body: JSON.stringify(body) }),
  update:   (id, body) => request(`/api/cases/${id}`,{ method: 'PATCH',  body: JSON.stringify(body) }),
  delete:   (id)       => request(`/api/cases/${id}`,{ method: 'DELETE' }),
  addNote:  (id, body) => request(`/api/cases/${id}/notes`, { method: 'POST', body: JSON.stringify(body) }),
}

// Invoices
export const invoicesAPI = {
  getAll:  ()         => request('/api/invoices'),
  create:  (body)     => request('/api/invoices',     { method: 'POST',   body: JSON.stringify(body) }),
  update:  (id, body) => request(`/api/invoices/${id}`,{ method: 'PATCH',  body: JSON.stringify(body) }),
  delete:  (id)       => request(`/api/invoices/${id}`,{ method: 'DELETE' }),
}

// Documents
export const documentsAPI = {
  getAll:  () => request('/api/documents'),
  upload:  (formData) => {
    const token = getToken()
    return fetch(`${BASE}/api/documents/upload`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData, // FormData — don't set Content-Type manually
    }).then(r => r.json())
  },
  delete: (id) => request(`/api/documents/${id}`, { method: 'DELETE' }),
}