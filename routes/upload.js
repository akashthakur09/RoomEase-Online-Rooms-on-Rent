// Import necessary modules
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Tenant = require('../models/tenantModel');

const Landlord = require('../models/landlordModel');

// Set up storage configuration for multer
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Initialize multer with storage configuratio
const upload = multer({ storage: storage });

router.post('/tenant/profile/photo/:id', upload.single('profilePhoto'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    // Handle file upload success (e.g., save file path to database)
    const filePath = req.file.path;
    // Update profile photo path in the database
    const updatedTenant = await Tenant.findByIdAndUpdate(req.params.id, { profilePhoto: filePath }, { new: true });
    if (!updatedTenant) {
      return res.status(404).json({ message: 'Tenant not found' });
    }
    res.status(200).json({ success: true, message: 'Profile photo uploaded successfully', filePath: filePath });
  } catch (error) {
    console.error('Error uploading profile photo:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/landlord/profile/photo/:id', upload.single('profilePhoto'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    // Handle file upload success (e.g., save file path to database)
    const filePath = req.file.path;
    // Update profile photo path in the database for landlord
    const updatedLandlord = await Landlord.findByIdAndUpdate(req.params.id, { profilePhoto: filePath }, { new: true });
    if (!updatedLandlord) {
      return res.status(404).json({ message: 'Landlord not found' });
    }
    res.status(200).json({ success: true, message: 'Profile photo uploaded successfully', filePath: filePath });
  } catch (error) {
    console.error('Error uploading landlord profile photo:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
