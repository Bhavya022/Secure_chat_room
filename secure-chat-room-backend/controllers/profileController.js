const mysql = require('mysql');
const db = require('../config/db');

const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find user profile in the database
    db.query('SELECT * FROM users WHERE userId = ?', [userId], async (err, results) => {
      if (err) {
        console.error('Error finding user profile:', err);
        return res.status(500).json({ message: 'Server error' });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      const userProfile = results[0];
      res.status(200).json(userProfile);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getUserProfile };
