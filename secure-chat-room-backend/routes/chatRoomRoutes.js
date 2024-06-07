
const express = require('express');
const router = express.Router();
const chatRoomController = require('../controllers/chatRoomController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/create', chatRoomController.createChatRoom);

module.exports = router;
