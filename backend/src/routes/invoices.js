const express = require('express')
const prisma  = require('../prisma')
const protect = require('../middleware/auth')

const router = express.Router()
router.use(protect)

// GET /api/invoices
router.get('/', async (req, res) => {
  try {
    const invoices = await prisma.invoice.findMany({
      where: { advocateId: req.advocate.id },
      orderBy: { createdAt: 'desc' }
    })
    res.json(invoices)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch invoices.' })
  }
})

// POST /api/invoices
router.post('/', async (req, res) => {
  const { client, description, amount, dueDate, caseId } = req.body
  if (!client || !amount || !dueDate || !caseId) {
    return res.status(400).json({ error: 'client, amount, dueDate, caseId are required.' })
  }
  try {
    const count = await prisma.invoice.count({ where: { advocateId: req.advocate.id } })
    const invoiceNumber = `INV-${1000 + count + 1}`

    const invoice = await prisma.invoice.create({
      data: {
        invoiceNumber, client, description: description || '',
        amount: parseFloat(amount),
        dueDate: new Date(dueDate),
        caseId,
        advocateId: req.advocate.id,
      }
    })
    res.status(201).json(invoice)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to create invoice.' })
  }
})

// PATCH /api/invoices/:id — update status or paid amount
router.patch('/:id', async (req, res) => {
  try {
    const updated = await prisma.invoice.update({
      where: { id: req.params.id },
      data: req.body
    })
    res.json(updated)
  } catch (err) {
    res.status(500).json({ error: 'Failed to update invoice.' })
  }
})

// DELETE /api/invoices/:id
router.delete('/:id', async (req, res) => {
  try {
    await prisma.invoice.delete({ where: { id: req.params.id } })
    res.json({ message: 'Invoice deleted.' })
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete invoice.' })
  }
})

module.exports = router