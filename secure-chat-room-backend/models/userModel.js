
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  deviceId: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  availCoins: { type: Number, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
