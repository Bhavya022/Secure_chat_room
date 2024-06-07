const db = require('../config/db');
const jwt = require('jsonwebtoken');
let activetokens=[]
const createInvitation = async (req, res) => {
  try {
    const { roomId, createdBy, expiresIn } = req.body;

    
    const token = jwt.sign({ roomId, createdBy }, process.env.JWT_SECRET, { expiresIn });
    console.log(token) 
      activetokens.push(token)
    db.query('INSERT INTO invitations (roomId, token, createdBy, expiresAt) VALUES (?, ?, ?, DATE_ADD(NOW(), INTERVAL ? SECOND))', 
      [roomId, token, createdBy, expiresIn], (err, result) => {
        if (err) {
          console.error('Error creating invitation:', err);
          return res.status(500).json({ message: 'Server error' });
        }

        res.status(201).json({ token });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const validateInvitation = async (req, res, next) => {
  try {
    const { token } = req.body;
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error('Error verifying invitation token:', err);
        return res.status(401).json({ message: 'Invalid token' });
      }

      // Extract the roomId and createdBy from the token payload
      const { roomId, createdBy } = decoded;

      // Check if the invitation exists in the database
      db.query('SELECT * FROM invitations WHERE roomId = ? AND token = ? AND createdBy = ? AND expiresAt > NOW()', 
        [roomId, token, createdBy], (err, results) => {
          if (err) {
            console.error('Error validating invitation:', err);
            return res.status(500).json({ message: 'Server error' });
          }

          if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid invitation' });
          }

          // Pass the roomId and createdBy to the next middleware
          req.roomId = roomId;
          req.createdBy = createdBy;
          next();
        }
      );
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createInvitation, validateInvitation };
