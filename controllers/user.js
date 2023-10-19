// controllers/user.js
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET || 'YourSecretKey';

let users = [];

function registerUser(username, password) {
  // Check if the username already exists
  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    throw new Error('Username already exists');
  }

  // Add user to the list
  const user = { id: users.length + 1, username, password };
  users.push(user);

  // Create a token for the user
  const token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '30m' });

  return token;
}

function loginUser(username, password) {
  // Find the user
  const user = users.find(user => user.username === username && user.password === password);
  if (!user) {
    throw new Error('Invalid username or password');
  }

  // Create a token for the user
  const token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '30m' });

  return token;
}

module.exports = { registerUser, loginUser };
