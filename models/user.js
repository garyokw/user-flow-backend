// models/user.js
function addUser(username, password) {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = { username, password };
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
}

function userExists(username) {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  return users.some(user => user.username === username);
}

function getUser(username) {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  return users.find(user => user.username === username);
}

module.exports = { addUser, userExists, getUser };
