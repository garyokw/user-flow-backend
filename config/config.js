require('dotenv').config(); 

module.exports = {
  development: {
    // Database connection settings
    database: {
      host: process.env.MYSQL_HOST ,
      port: process.env.MYSQL_PORT ,
      user: process.env.MYSQL_USER ,
      password: process.env.MYSQL_PASSWORD ,
      database: process.env.MYSQL_DATABASE ,
    },
    //JWT Key
    secretKey: process.env.SECRET_KEY ,
  },
};

// Compose the MySQL connection string
module.exports.development.database.connectionString = `mysql://${process.env.MYSQL_USER}:${process.env.MYSQL_PASSWORD}@${process.env.MYSQL_HOST}:${process.env.MYSQL_PORT}/${process.env.MYSQL_DATABASE}`;
