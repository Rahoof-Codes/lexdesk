const express = require('express')
const prisma  = require('../prisma')
const protect = require('../middleware/auth')

const router = express.Router()

// All case routes are protected
router.use(protect)

// GET /api/cases — get all cases for this advocate
router.get('/', async (req, res) => {
  try {
    const cases = await prisma.case.findMany({
      where: { advocateId: req.advocate.id },
      include: { notes: true, documents: true },
      orderBy: { updatedAt: 'desc' }
    })
    res.json(cases)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch cases.' })
  }
})

// GET /api/cases/:id — get single case
router.get('/:id', async (req, res) => {
  try {
    const c = await prisma.case.findFirst({
      where: { id: req.params.id, advocateId: req.advocate.id },
      include: { notes: { orderBy: { createdAt: 'desc' } }, documents: true, invoices: true }
    })
    if (!c) return res.status(404).json({ error: 'Case not found.' })
    res.json(c)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch case.' })
  }
})

// POST /api/cases — create new case
router.post('/', async (req, res) => {
  const { client, type, court, judge, description, retainer, nextDate, priority } = req.body

  if (!client || !type || !court) {
    return res.status(400).json({ error: 'client, type, and court are required.' })
  }

  try {
    // Auto-generate case number
    const count = await prisma.case.count({ where: { advocateId: req.advocate.id } })
    const caseNumber = `CAS-${String(Date.now()).slice(-4)}${count + 1}`

    const newCase = await prisma.case.create({
      data: {
        caseNumber, client, type, court,
        judge:       judge       || '',
        description: description || '',
        retainer:    retainer    || 0,
        priority:    priority    || 'medium',
        nextDate:    nextDate ? new Date(nextDate) : null,
        advocateId:  req.advocate.id,
      }
    })
    res.status(201).json(newCase)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to create case.' })
  }
})

// PATCH /api/cases/:id — update case
router.patch('/:id', async (req, res) => {
  try {
    const updated = await prisma.case.update({
      where: { id: req.params.id },
      data: {
        ...req.body,
        nextDate: req.body.nextDate ? new Date(req.body.nextDate) : undefined,
        updatedAt: new Date()
      }
    })
    res.json(updated)
  } catch (err) {
    res.status(500).json({ error: 'Failed to update case.' })
  }
})

// DELETE /api/cases/:id — delete case
router.delete('/:id', async (req, res) => {
  try {
    await prisma.case.delete({ where: { id: req.params.id } })
    res.json({ message: 'Case deleted.' })
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete case.' })
  }
})

// POST /api/cases/:id/notes — add note to case
router.post('/:id/notes', async (req, res) => {
  const { content } = req.body
  if (!content) return res.status(400).json({ error: 'Note content is required.' })
  try {
    const note = await prisma.note.create({
      data: { content, caseId: req.params.id }
    })
    res.status(201).json(note)
  } catch (err) {
    res.status(500).json({ error: 'Failed to add note.' })
  }
})

module.exports = router