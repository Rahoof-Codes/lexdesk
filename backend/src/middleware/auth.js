const jwt = require('jsonwebtoken')

module.exports = function protect(req, res, next) {
  // Get token from Authorization header
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Not authorized. No token provided.' })
  }

  const token = authHeader.split(' ')[1]

  try {
    // Verify token and attach advocate data to request
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.advocate = decoded
    next()
  } catch (err) {
    return res.status(401).json({ error: 'Token is invalid or expired.' })
  }
}