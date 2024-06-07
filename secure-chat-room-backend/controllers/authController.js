const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const db = require('../config/db');
const dotenv = require('dotenv');
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const activeTokens = [];
const register = async (req, res) => {
  try {
    const { userId, deviceId, name, phone, availCoins, password } = req.body;
    console.log(req.body);
    db.query('SELECT * FROM users WHERE userId = ?', [userId], async (err, results) => {
      if (err) {
        console.error('Error checking existing user:', err);
        return res.status(500).json({ message: 'Server error' });
      }

      if (results.length > 0) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const createdAt = new Date();
      const updatedAt = new Date();
      db.query('INSERT INTO users (userId, deviceId, name, phone, availCoins, password, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
        [userId, deviceId, name, phone, availCoins, hashedPassword, createdAt, updatedAt], (err, result) => {
          if (err) {
            console.error('Error inserting new user:', err);
            return res.status(500).json({ message: 'Server error' });
          }

          res.status(201).json({ message: 'User registered successfully' });
        }
      );
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const login = async (req, res) => {
  try {
    const { userId, password } = req.body;
    console.log(userId,password) 
    db.query('SELECT * FROM users WHERE userId = ?', [userId], async (err, results) => {
      if (err) {
        console.error('Error finding user:', err);
        return res.status(500).json({ message: 'Server error' });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      const user = results[0];

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ userId: user.userId }, JWT_SECRET, { expiresIn: '1h' });
      activeTokens.push(token);
      res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict' });
      res.status(200).json({ message: 'Login successful', token });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};



const logout = (req, res) => {
  res.clearCookie('token', { httpOnly: true, secure: true, sameSite: 'strict' });
  res.status(200).json({ message: 'Logout successful' });
};

module.exports = { register, login,  logout ,activeTokens};
