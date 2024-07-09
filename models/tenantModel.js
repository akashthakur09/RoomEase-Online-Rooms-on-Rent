const mongoose = require('mongoose');

const tenantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contactNumber: { type: String },
  email: { type: String, required: true, unique: true },
  profilePhoto: { type: String },
  aadharNumber: { type: String },
  aadharPhoto: { type: String }, 
  passportPhoto: { type: String }, 
  password: { type: String, required: true },
  rentedRoom: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' } 
  
});

module.exports = mongoose.model('Tenant', tenantSchema);
