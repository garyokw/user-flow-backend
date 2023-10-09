-- Load the environment variables from the .env file
source ./.env;

-- Create the 'app' database
CREATE DATABASE IF NOT EXISTS app;

-- Switch to the 'app' database
USE app;

-- Create the 'users' table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

-- Grant CREATE privilege to the MYSQL_USER
GRANT CREATE ON *.* TO '$MYSQL_USER'@'localhost';

-- Flush privileges to apply the changes
FLUSH PRIVILEGES;
