const http = require('http');
const app = require('./app');
require('dotenv').config(); // Load environment variables from .env file

const port = process.env.PORT || 3000; // Use the specified port or default to 3000

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
