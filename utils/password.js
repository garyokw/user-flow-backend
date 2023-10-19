// utils/password.js

const argon2 = require('argon2');

// Function to hash a password
async function hashPassword(password) {
  try {
    return await argon2.hash(password);
  } catch (error) {
    throw error;
  }
}

// Function to verify a password
async function verifyPassword(password, hashedPassword) {
  try {
    return await argon2.verify(hashedPassword, password);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  hashPassword,
  verifyPassword,
};
