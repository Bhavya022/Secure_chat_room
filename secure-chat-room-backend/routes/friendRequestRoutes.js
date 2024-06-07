
const express = require('express');
const router = express.Router();
const friendRequestController = require('../controllers/frinedRequestController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/send', friendRequestController.sendFriendRequest);

module.exports = router;
