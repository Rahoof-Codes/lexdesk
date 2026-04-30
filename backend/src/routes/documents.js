const express = require('express')
const multer  = require('multer')
const path    = require('path')
const fs      = require('fs')
const prisma  = require('../prisma')
const protect = require('../middleware/auth')

const router = express.Router()
router.use(protect)

// Configure multer — store files in /uploads folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'uploads/'
    if (!fs.existsSync(dir)) fs.mkdirSync(dir)
    cb(null, dir)
  },
  filename: (req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
    cb(null, unique + path.extname(file.originalname))
  }
})

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB max
  fileFilter: (req, file, cb) => {
    const allowed = ['.pdf', '.docx', '.doc', '.zip', '.jpg', '.jpeg', '.png']
    const ext = path.extname(file.originalname).toLowerCase()
    allowed.includes(ext) ? cb(null, true) : cb(new Error('File type not allowed.'))
  }
})

// GET /api/documents
router.get('/', async (req, res) => {
  try {
    const docs = await prisma.document.findMany({
      where: { case: { advocateId: req.advocate.id } },
      orderBy: { createdAt: 'desc' }
    })
    res.json(docs)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch documents.' })
  }
})

// POST /api/documents/upload
router.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded.' })
  const { caseId } = req.body
  if (!caseId) return res.status(400).json({ error: 'caseId is required.' })

  try {
    const ext  = path.extname(req.file.originalname).replace('.', '').toUpperCase()
    const size = `${(req.file.size / 1024 / 1024).toFixed(1)} MB`

    const doc = await prisma.document.create({
      data: {
        name:       req.file.originalname,
        url:        `/uploads/${req.file.filename}`,
        size,
        type:       ext,
        caseId,
        uploadedBy: req.advocate.name,
      }
    })
    res.status(201).json(doc)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to save document.' })
  }
})

// DELETE /api/documents/:id
router.delete('/:id', async (req, res) => {
  try {
    const doc = await prisma.document.findUnique({ where: { id: req.params.id } })
    if (!doc) return res.status(404).json({ error: 'Document not found.' })

    // Delete physical file
    const filePath = doc.url.replace('/', '')
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath)

    await prisma.document.delete({ where: { id: req.params.id } })
    res.json({ message: 'Document deleted.' })
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete document.' })
  }
})

module.exports = router