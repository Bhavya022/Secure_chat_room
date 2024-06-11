const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();
console.log(`Connecting to database: ${process.env.DB_HOST}`);
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 14024, 
  user: process.env.DB_USER.replace(/'/g, ''),  
  password: process.env.DB_PASSWORD.replace(/'/g, ''),
  database: process.env.DB_NAME.replace(/"/g, ''),  
  connectTimeout: 10000,    
  waitForConnections: true,
  queueLimit: 0,
  authPlugins: {
    mysql_clear_password: () => () => Buffer.from(process.env.DB_PASSWORD + '\0')
  }
});
module.exports = pool;
