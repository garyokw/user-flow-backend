// models/auth.js
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET || 'YourSecretKey';

function createToken(user) {
  const token = jwt.sign(user, secretKey, { expiresIn: '30m' });
  localStorage.setItem('token', token);
  return token;
}

function verifyToken(token) {
  try {
    return jwt.verify(token, secretKey);
  } catch (e) {
    return null;
  }
}

function logout() {
  localStorage.removeItem('token');
}

module.exports = { createToken, verifyToken, logout };
