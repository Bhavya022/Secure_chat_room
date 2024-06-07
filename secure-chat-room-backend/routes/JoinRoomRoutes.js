const express = require('express');
const router = express.Router();
const joinRoomController = require('../controllers/joinRoomController');

router.post('/join', joinRoomController.joinRoom);

module.exports = router;
