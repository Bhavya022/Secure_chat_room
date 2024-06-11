const mysql = require('mysql');
const db = require('../config/db');

const createChatRoom = async (req, res) => {
  try {
    const { roomId, primeMember, participants, maxCapacity } = req.body;

    // Check if the room already exists
    db.query('SELECT * FROM chat_rooms WHERE roomId = ?', [roomId], async (err, results) => {
      if (err) {
        console.error('Error checking existing room:', err);
        return res.status(500).json({ message: 'Server error' });
      }

      if (results.length > 0) {
        return res.status(400).json({ message: 'Room already exists' });
       
      }

      // Check if the prime member exists
      db.query('SELECT * FROM users WHERE userId = ?', [primeMember], async (err, results) => {
        if (err) {
          console.error('Error checking prime member:', err);
          return res.status(500).json({ message: 'Server error' });
          
        }

        if (results.length === 0) {
          return res.status(404).json({ message: 'Prime member not found' });
        
        }

        // Check if the room has reached its maximum capacity
        if (participants.length >= maxCapacity) {
          return res.status(400).json({ message: 'Room capacity reached' });
          alert('Room capacity reached')
        }

        // Insert new chat room into the database
        db.query('INSERT INTO chat_rooms (roomId, primeMember, participants, maxCapacity) VALUES (?, ?, ?, ?)', 
          [roomId, primeMember, JSON.stringify(participants), maxCapacity], (err, result) => {
            if (err) {
              console.error('Error creating chat room:', err);
              return res.status(500).json({ message: 'Server error' });
            }

            // Retrieve the inserted chat room
            db.query('SELECT * FROM chat_rooms WHERE id = ?', result.insertId, (err, rows) => {
              if (err) {
                console.error('Error retrieving chat room:', err);
                return res.status(500).json({ message: 'Server error' });
              }

              const newChatRoom = rows[0];
              res.status(201).json({message:'Room created Successfully'});
              
            });
          });
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createChatRoom };
