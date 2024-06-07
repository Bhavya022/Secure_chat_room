const mysql = require('mysql');
const db = require('../config/db');

const sendFriendRequest = async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;

    db.query('INSERT INTO friend_requests (senderId, receiverId) VALUES (?, ?)', [senderId, receiverId], (err, result) => {
      if (err) {
        console.error('Error sending friend request:', err);
        return res.status(500).json({ message: 'Server error' });
      }

      const newRequestId = result.insertId;
      db.query('SELECT * FROM friend_requests WHERE id = ?', newRequestId, (err, rows) => {
        if (err) {
          console.error('Error retrieving friend request:', err);
          return res.status(500).json({ message: 'Server error' });
        }

        const newRequest = rows[0];
        res.status(201).json(newRequest);
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { sendFriendRequest };
