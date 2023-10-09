const express = require('express');
const router = express.Router();
const { verifyToken } = require('./auth');
const { getUserById, updateUser, deleteUser } = require('../models/user');

// Middleware to protect routes with JWT token verification
router.use(verifyToken);

// Endpoint to get user information by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Remove sensitive data like password before sending the response
    const { password, ...userData } = user;

    res.status(200).json(userData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Endpoint to update user information
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    // Update user data in the database
    const updatedUser = await updateUser(id, updatedData);

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Endpoint to delete a user
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Delete user from the database
    const deletedUser = await deleteUser(id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
