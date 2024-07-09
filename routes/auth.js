const express = require('express');
const bcrypt = require('bcrypt');
const axios = require('axios')
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Tenant = require('../models/tenantModel');
const Landlord = require('../models/landlordModel');
const validateToken = require('../middleware/validateTokenHandler');
const dotenv=require('dotenv');

const router = express.Router();


router.post('/register', async (req, res) => {
  let newUser; 
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    const data = {
      user: {
        id: newUser.id
      }
    };
    const authToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET);
    const success = true;

    if (role === 'tenant') {

      let tenatnUser = await Tenant.create({
        name,
        email,
        password: hashedPassword,
        role
      });

      res.json({ success, authToken, userId: tenatnUser.id });

      // const newTenant = new Tenant(req.body);
      // res.json({ success, authToken, userId: newTenant.id });
      // const newTenant = new Tenant(newUser);
      // const savedTenant = await newTenant.save();
    
    } else if (role === 'landlord') {

      let llUser = await Landlord.create({
        name,
        email,
        password: hashedPassword,
        role
      });

      res.json({ success, authToken, userId: llUser.id });


      // const newLandlord = new Landlord(req.body);
      // res.json({ success, authToken, userId: newLandlord.id });
      // const savedLandlord = await newLandlord.save();

    } else {
      return res.status(201).json({ message: 'User registered successfully' });
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});











router.post('/login',async (req, res) => {
  
  const { email, password, role} = req.body;
  try {
      
    if (role === 'tenant'){
      let user = await Tenant.findOne({ email }); 
      let success = false; 
      if (!user) {
          return res.json({ success, error: "Try Logging in with correct credentials" });
      }
      const pwdCompare = await bcrypt.compare(password, user.password); 
      if (!pwdCompare) {
          return res.json({ success, error: "Try Logging in with correct credentials" });
      }
      const data = {
          user: {
              id: user.id
          }
      }

      success = true;
      const authToken = jwt.sign(data,process.env.ACCESS_TOKEN_SECRET);
      return res.json({ success, authToken, userId: user.id})
    }else if(role === 'landlord'){
      let user = await Landlord.findOne({ email });
      let success = false; 
      if (!user) {
          return res.json({ success, error: "Try Logging in with correct credentials" });//.status(400
      }
      const pwdCompare = await bcrypt.compare(password, user.password); // this return true false.
      if (!pwdCompare) {
          return res.json({ success, error: "Try Logging in with correct credentials" });
      }
      const data = {
          user: {
              id: user.id
          }
      }
      
      success = true;
      const authToken = jwt.sign(data,process.env.ACCESS_TOKEN_SECRET);
      return res.json({ success, authToken, userId: user.id})
    }


      

  } catch (error) {

      console.error(error.message)
      return res.status(500).send("Server Error")
  }
})


module.exports = router;
