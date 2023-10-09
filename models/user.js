const mysql = require('mysql2/promise');
require('dotenv').config(); // Load environment variables from .env file

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST ,
  port: process.env.MYSQL_PORT ,
  user: process.env.MYSQL_USER ,
  password: process.env.MYSQL_PASSWORD ,
  database: process.env.MYSQL_DATABASE ,
  connectionLimit: 10, 
});

// Function to create a new user
async function createUser(username, passwordHash) {
  const connection = await pool.getConnection();
  try {
    await connection.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, passwordHash]);
    return true; // User created successfully
  } catch (error) {
    console.error('Error creating user:', error);
    return false; // User creation failed
  } finally {
    connection.release();
  }
}

// Function to retrieve a user by username
async function getUserByUsername(username) {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query('SELECT * FROM users WHERE username = ?', [username]);
    if (rows.length === 1) {
      return rows[0]; // Return the user object
    }
    return null; // User not found
  } catch (error) {
    console.error('Error retrieving user by username:', error);
    return null;
  } finally {
    connection.release();
  }
}

module.exports = {
  createUser,
  getUserByUsername,
};
