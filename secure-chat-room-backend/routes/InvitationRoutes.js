const express = require('express');
const router = express.Router();
const invitationController = require('../controllers/InvitationController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/create', authMiddleware, invitationController.createInvitation);


router.post('/validate', invitationController.validateInvitation, (req, res) => {
  res.status(200).json({ message: 'Invitation is valid' });
});

module.exports = router;
