const express = require('express');
const router = express.Router();
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const { secretKey } = require('../config');
const { createUser, getUserByUsername } = require('../models/user');

// Endpoint to handle user registration
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user already exists
    const existingUser = await getUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password securely using argon2
    const hashedPassword = await argon2.hash(password);

    // Create a new user in the database
    const newUser = await createUser(username, hashedPassword);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Endpoint to handle user login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Retrieve the user's data (including hashed password) from the database
    const user = await getUserByUsername(username);

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // Verify the provided password against the hashed password using argon2
    const passwordMatch = await argon2.verify(user.password, password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // Generate a JWT token with user information
    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username,
      },
      secretKey,
      { expiresIn: '30m' } // Adjust expiration as needed
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
