const express = require('express');
const { createUser, getUserByUsername } = require('../models/user');
const { hashPassword, verifyPassword } = require('../utils/password'); // Implement hashPassword and verifyPassword functions
const { createToken, verifyToken } = require('../controllers/auth');
const router = express.Router();

// User Registration Endpoint
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  const existingUser = await getUserByUsername(username);
  if (existingUser) {
    return res.status(409).json({ message: 'Username already exists.' });
  }

  const passwordHash = await hashPassword(password);
  const success = await createUser(username, passwordHash);

  if (success) {
    res.status(201).json({ message: 'User registered successfully.' });
  } else {
    res.status(500).json({ message: 'User registration failed.' });
  }
});

// User Login Endpoint
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  const user = await getUserByUsername(username);
  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password.' });
  }

  const passwordMatch = await verifyPassword(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ message: 'Invalid username or password.' });
  }

  const token = createToken(user);
  res.json({ token });
});

module.exports = router;
