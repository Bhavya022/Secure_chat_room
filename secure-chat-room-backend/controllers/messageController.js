const mysql = require('mysql');
const db = require('../config/db');

// const sendMessage = async (req, res) => {
//   try {
//     const { roomId, sender, content } = req.body;
//     console.log(body)
//     // Insert new message into the database
//     db.query('INSERT INTO messages (roomId, sender, content) VALUES (?, ?, ?)', [roomId, sender, content], (err, result) => {
//       if (err) {
//         console.error('Error sending message:', err);
//         return res.status(500).json({ message: 'Server error' });
//       }

//       // Retrieve the inserted message
//       db.query('SELECT * FROM messages WHERE id = ?', result.insertId, (err, rows) => {
//         if (err) {
//           console.error('Error retrieving message:', err);
//           return res.status(500).json({ message: 'Server error' });
//         }

//         const newMessage = rows[0];
//         res.status(201).json(newMessage);
//       });
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// }; 

const sendMessage = async (req, res) => {
  try {
    const { roomId, userId, message } = req.body;

    // Insert new message into the database
    db.query('INSERT INTO messages (roomid, userid, message) VALUES (?, ?, ?)', [roomId, userId, message], (err, result) => {
      if (err) {
        console.error('Error sending message:', err);
        return res.status(500).json({ message: 'Server error' });
      }

      // Retrieve the inserted message
      db.query('SELECT * FROM messages WHERE id = ?', result.insertId, (err, rows) => {
        if (err) {
          console.error('Error retrieving message:', err);
          return res.status(500).json({ message: 'Server error' });
        }

        const newMessage = rows[0];
        res.status(201).json(newMessage);
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { sendMessage };
