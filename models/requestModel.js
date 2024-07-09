const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true },
  landlord: { type: mongoose.Schema.Types.ObjectId, ref: 'Landlord', required: true },
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' }
  
});

module.exports = mongoose.model('Request', requestSchema);
