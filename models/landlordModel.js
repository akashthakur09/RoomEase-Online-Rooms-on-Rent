const mongoose = require('mongoose');

const landlordSchema = new mongoose.Schema({
  name: { type: String, required: true },
  profilePhoto: { type: String }, 
  contactNumber: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Room' }] 
  
});

module.exports = mongoose.model('Landlord', landlordSchema);
