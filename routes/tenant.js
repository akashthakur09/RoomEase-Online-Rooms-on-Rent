const express = require('express');
const Tenant = require('../models/tenantModel'); 
const User = require('../models/userModel')
const validateToken = require('../middleware/validateTokenHandler');
const Room = require('../models/roomModel');

const router = express.Router();


// Get tenant profile by ID
router.get('/profile/:id',validateToken, async (req, res) => {
  try {
    const tenant = await Tenant.findById(req.params.id);
    if (!tenant) {
      return res.status(404).json({ message: 'Tenant not found' });
    }
    res.status(200).json(tenant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// get tenant room details
router.get('/profile/room/:id',validateToken, async (req, res) => {
  try {
    const tenant = await Tenant.findById(req.params.id);
    if (!tenant) {
      return res.status(404).json({ message: 'Tenant not found' });
    }

    
    const room= await Room.findById(tenant.rentedRoom);
    if(!room){
      return res.status(404).json({ message: 'Tenants rentedRoom not found' });
    }


    res.status(200).json(room);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update tenant profile by ID
router.put('/profile/:id',validateToken, async (req, res) => {
  try {
    const updatedTenant = await Tenant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedTenant) {
      return res.status(404).json({ message: 'Tenant not found' });
    }
    res.status(200).json(updatedTenant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete tenant profile by ID
router.delete('/profile/:email',validateToken, async (req, res) => {
  try {
    const email=req.params.email;
    const deletedTenant = await Tenant.deleteOne({email:email});
    const deletedUser = await User.deleteOne({email:email});
    if (!deletedTenant || !deletedUser) {
      return res.status(404).json({status:false, message: 'Tenant not found' });
    }
    res.status(200).json({status:true, message: 'Tenant deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({status:false, message: 'Internal server error' });
  }
});

module.exports = router;
