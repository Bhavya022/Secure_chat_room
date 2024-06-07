const mongoose = require('mongoose');

const invitationSchema = new mongoose.Schema({
  roomId: { type: String, required: true },
  token: { type: String, required: true, unique: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true },
});

const Invitation = mongoose.model('Invitation', invitationSchema);

module.exports = Invitation;
