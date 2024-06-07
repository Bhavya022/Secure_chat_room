
const mongoose = require('mongoose');

const chatRoomSchema = new mongoose.Schema({
  roomId: { type: String, required: true, unique: true },
  primeMember: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  maxCapacity: { type: Number, default: 6 },
});

const ChatRoom = mongoose.model('ChatRoom', chatRoomSchema);

module.exports = ChatRoom;
