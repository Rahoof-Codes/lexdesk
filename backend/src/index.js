require('dotenv').config()
const express   = require('express')
const cors      = require('cors')
const path      = require('path')

const authRouter      = require('./routes/auth')
const casesRouter     = require('./routes/cases')
const invoicesRouter  = require('./routes/invoices')
const documentsRouter = require('./routes/documents')

const app  = express()
const PORT = process.env.PORT || 5000

// ── Middleware ────────────────────────────────────────────────────────
app.use(cors({
  origin: [
    process.env.FRONTEND_URL,
    'http://localhost:5173',
  ],
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))

// ── Routes ────────────────────────────────────────────────────────────
app.use('/api/auth',      authRouter)
app.use('/api/cases',     casesRouter)
app.use('/api/invoices',  invoicesRouter)
app.use('/api/documents', documentsRouter)

// Health check — Railway uses this to verify the server is alive
app.get('/health', (req, res) => res.json({ status: 'ok', app: 'LexDesk API' }))

// 404 handler
app.use((req, res) => res.status(404).json({ error: `Route ${req.path} not found.` }))

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: err.message || 'Internal server error.' })
})

app.listen(PORT, () => {
  console.log(`✅ LexDesk API running on port ${PORT}`)
})