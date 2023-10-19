const express = require('express');
const router = express.Router();
const dataStore = require('../dataStore'); // Import the in-memory data store

// Create a new user
router.post('/api/register', (req, res) => {
  const { username, password } = req.body;

  // Add user data to the data store
  dataStore.push({ username, password });

  res.status(200).json({ message: 'User registered successfully' });
});

// User login
router.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Find the user in the data store
  const user = dataStore.find(u => u.username === username);

  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // In this example, you can generate and return a simple success message
  res.status(200).json({ message: 'Login successful' });
});

module.exports = router;