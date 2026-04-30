const express  = require('express')
const bcrypt   = require('bcryptjs')
const jwt      = require('jsonwebtoken')
const { body, validationResult } = require('express-validator')
const prisma   = require('../prisma')

const router = express.Router()

// ── POST /api/auth/register ──────────────────────────────────────────
router.post('/register', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

  const { name, email, password } = req.body

  try {
    // Check if advocate already exists
    const existing = await prisma.advocate.findUnique({ where: { email } })
    if (existing) return res.status(400).json({ error: 'Email already registered.' })

    // Hash password
    const hashed = await bcrypt.hash(password, 10)

    // Create advocate
    const advocate = await prisma.advocate.create({
      data: { name, email, password: hashed }
    })

    // Sign JWT
    const token = jwt.sign(
      { id: advocate.id, email: advocate.email, name: advocate.name },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.status(201).json({ token, advocate: { id: advocate.id, name: advocate.name, email: advocate.email } })

  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error during registration.' })
  }
})

// ── POST /api/auth/login ─────────────────────────────────────────────
router.post('/login', [
  body('email').isEmail().withMessage('Valid email required'),
  body('password').notEmpty().withMessage('Password is required'),
], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

  const { email, password } = req.body

  try {
    const advocate = await prisma.advocate.findUnique({ where: { email } })
    if (!advocate) return res.status(400).json({ error: 'Invalid email or password.' })

    const match = await bcrypt.compare(password, advocate.password)
    if (!match) return res.status(400).json({ error: 'Invalid email or password.' })

    const token = jwt.sign(
      { id: advocate.id, email: advocate.email, name: advocate.name },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.json({ token, advocate: { id: advocate.id, name: advocate.name, email: advocate.email } })

  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error during login.' })
  }
})

// ── GET /api/auth/me ─────────────────────────────────────────────────
const protect = require('../middleware/auth')
router.get('/me', protect, async (req, res) => {
  const advocate = await prisma.advocate.findUnique({
    where: { id: req.advocate.id },
    select: { id: true, name: true, email: true, createdAt: true }
  })
  res.json(advocate)
})

module.exports = router