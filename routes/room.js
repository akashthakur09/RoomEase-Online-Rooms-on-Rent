const express = require('express');
const router = express.Router();
const Room = require('../models/roomModel'); 
const Landlord = require('../models/landlordModel'); 
const validateToken = require('../middleware/validateTokenHandler');
const cors = require('cors');
const Tenant = require('../models/tenantModel');
const multer = require('multer'); 
const upload = multer({ dest: 'uploads/' });




router.post('/user/:id', validateToken, upload.array('photos', 5), async (req, res) => {
  try {
    const userId = req.params.id;
    const landlord = await Landlord.findById(userId);

    if (!landlord) {
      return res.status(403).json({ message: 'You are not authorized to create a room' });
    }

    const newRoomData = {
      type: req.body.type,
      email: req.body.email,
      photos: req.files.map(file => file.path), // Save file paths in photos array
      address: req.body.address,
      city: req.body.city,
      landlord: userId,
      status: req.body.status
    };

    const newRoom = new Room(newRoomData);
    const savedRoom = await newRoom.save();
    res.status(201).json(savedRoom);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

router.put('/user/:id', validateToken, upload.array('photos', 5), async (req, res) => {
  try {
    const roomId = req.params.id;
    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    if (room.landlord.toString() !== req.body.landlord) {
      return res.status(403).json({ message: 'You are not authorized to update this room' });
    }

    const updatedRoomData = {
      type: req.body.type,
      email: req.body.email,
      photos: req.files.map(file => file.path), // Save file paths in photos array
      address: req.body.address,
      city: req.body.city,
      landlord: req.body.landlord,
      status: req.body.status
    };

    const updatedRoom = await Room.findByIdAndUpdate(roomId, updatedRoomData, { new: true });

    return res.status(200).json(updatedRoom);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
// Delete room by ID (only allowed for the landlord who owns the room)
// router.delete('/:id',validateToken, async (req, res) => {
  router.delete('/user/:id',validateToken, async (req, res) => {
  try {
    const roomId = req.params.id;
    if (!roomId) {
      return res.status(400).json({ message: 'Invalid room ID back' });
    }

    const room = await Room.findById(roomId);
    console.log(roomId);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }


    await Room.findByIdAndDelete(roomId);
    res.status(200).json({ message: 'Room deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/all',validateToken, async (req, res) => {
  try {
    const { city, type } = req.query;

    let query = {};

    if (city) query = {...query, city };
    if (type) query = {...query, type };

    const rooms = await Room.find(query);

    res.status(200).json(rooms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});




router.get('/user/:id',validateToken, async (req, res) => {
  try {
    const userId = req.params.id;

    // Check if the user is a landlord
    // const tenant = await Tenant.findById(userId);
    // console.log(tenant);
    // if (!tenant) {
    //   return res.status(403).json({ message: 'You are not authorized to view rooms' });
    // }

    // Fetch rooms associated with the landlord
    // const rooms = await Room.find({ tenant: userId });
    const rooms = await Room.find({userId });


    console.log(rooms)


    return res.status(200).json({ rooms });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// get a room details with help of room id&&&&&&&&&&&&&&&&&&&&&&&&
router.get('/:id',validateToken, async (req, res) => {
  try {
    const roomId = req.params.id;
    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    res.status(200).json(room);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});





module.exports = router;

