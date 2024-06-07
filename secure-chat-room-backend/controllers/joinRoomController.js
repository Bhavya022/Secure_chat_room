const db = require('../config/db');

const joinRoom = async (req, res) => {
  try {
    const { roomId, userId } = req.body;

    // Check if the user is already in the room
    db.query('SELECT * FROM room_join WHERE roomId = ? AND userId = ?', [roomId, userId], (err, results) => {
      if (err) {
        console.error('Error checking user in room:', err);
        return res.status(500).json({ message: 'Server error' });
      }

      if (results.length > 0) {
        return res.status(400).json({ message: 'User already in the room' });
      }

      // Insert user into the room
      db.query('INSERT INTO room_join (roomId, userId) VALUES (?, ?)', [roomId, userId], (err, result) => {
        if (err) {
          console.error('Error joining room:', err);
          return res.status(500).json({ message: 'Server error' });
        }

        res.status(201).json({ message: 'User joined room successfully' });
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { joinRoom };
