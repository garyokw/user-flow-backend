// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user'); // add this line
const imageRoutes = require('./routes/image'); // add this line

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api', authRoutes);
app.use('/api/user', userRoutes); // add this line
app.use('/api/image', imageRoutes); // add this line

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
