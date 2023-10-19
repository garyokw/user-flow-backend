// controllers/auth.js
const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET || 'YourSecretKey';

function createToken(user) {
  return jwt.sign(user, secretKey, { expiresIn: '30m' });
}

function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

module.exports = { createToken, verifyToken };
