const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  type: { type: String, required: true },
  
  email: { type: String, required: true},
  
  photos: [{ type: String }], 
  address: { type: String, required: true },
  city: { type: String, required: true },
  landlord: { type: mongoose.Schema.Types.ObjectId, ref: 'Landlord', required: true },
  status: { type: String, enum: ['available', 'occupied'], default: 'available' }
  
});

module.exports = mongoose.model('Room', roomSchema);
