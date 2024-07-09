const express = require('express');
const Landlord = require('../models/landlordModel');
const User=require('../models/userModel');
const validateToken = require("../middleware/validateTokenHandler"); 
const router = express.Router();

// Get landlord profile by ID
router.get('/profile/:id',validateToken, async (req, res) => {
  try {
    const landlord = await Landlord.findById(req.params.id);
    console.log(landlord);
    if (!landlord) {
      // console.log("print");
      return res.status(404).json({ message: 'Landlord not found' });
    }
    console.log("print");
    res.status(200).json(landlord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update landlord profile by ID
router.put('/profile/:id',validateToken, async (req, res) => {
  try {
    const updatedLandlord = await Landlord.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedLandlord) {
      return res.status(404).json({ message: 'Landlord not found' });
    }
    res.status(200).json(updatedLandlord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete landlord profile by ID
router.delete('/profile/:email',validateToken, async (req, res) => {
  try {
    const email = req.params.email;

    // Delete landlord by email
    const deletedLandlord = await Landlord.deleteOne({ email: email });
    // Delete user by email
    const deletedUser = await User.deleteOne({ email: email });
    
    // Check if both deletions were successful
    if (deletedLandlord.deletedCount === 0 && deletedUser.deletedCount === 0) {
      return res.status(404).json({status:false, message: 'Landlord and User not found' });
    } else if (deletedLandlord.deletedCount === 0) {
      return res.status(404).json({status:false, message: 'Landlord not found' });
    } else if (deletedUser.deletedCount === 0) {
      return res.status(404).json({status:false, message: 'User not found' });
    }

    res.status(200).json({status:true, message: 'Landlord deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({status:false, message: 'Internal server error' });
  }
});

module.exports = router;
