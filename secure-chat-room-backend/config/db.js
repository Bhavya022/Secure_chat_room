// config/db.js
const mysql = require('mysql2');
const dotenv = require('dotenv') 
dotenv.config();
console.log(process.env.DB_HOST);
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  authPlugins: {
    mysql_clear_password: () => () => Buffer.from(process.env.DB_PASSWORD + '\0')
  }
});

module.exports = pool;
