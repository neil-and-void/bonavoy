const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { check, validationResult } = require('express-validator');

const utils = require('../utils/jwt.utils');
const db = require('../utils/db.utils');
const User = require("../models/User.model");

// Routes
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.json({success: false});
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.json({
          success: true
        });
        console.log(req.user);
      });
    }
  })(req, res, next);
});

router.post("/preregister", (req, res, next) => {
  
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(req.body.email)) {
    return res.json({
      success: false,
      reason: 'invalidemail'
    });
  }
  if ((req.body.username.length <= 4) || (req.body.username.length > 15)) {
    return res.json({
      success: false,
      reason: 'usernamelength'
    });
  }
  if (req.body.password.length < 8 || req.body.password.length > 25) {
    return res.json({
      success: false,
      reason: 'passwordlength'
    });
  }
  User.findOne({ $or: [{username: req.body.username}, {email: req.body.email}]}, async (err, doc) => {
    if (err) throw err;
    if (doc && doc.username === req.body.username){
      return res.json({
        success: false,
        reason: 'usernameexists'
      });
    }
    if (doc && doc.email === req.body.email){
      return res.json({
        success: false,
        reason: 'emailexists'
      });
    }
    if (!doc) {
      return res.json({
        success: true
      });
    }
  });
});

router.post("/register", (req, res, next) => {
  if ((req.body.firstname.length < 1) || (req.body.firstname.length > 30)) {
    return res.json({
      success: false,
      reason: 'firstnamelength'
		});
  }
  if (req.body.lastname.length < 1 || req.body.lastname.length > 35) {
    return res.json({
      success: false,
      reason: 'lastnamelength'
    });
	}
  User.findOne({ $or: [{username: req.body.username}, {email: req.body.email}]}, async (err, doc) => {
    if (err) throw err;
    if (!doc) {
      const hash = await bcrypt.hash(req.body.password, 10);
      const newUser = new User({
        firstname: req.body.firstname,
        lastname:req.body.lastname,
        username: req.body.username,
        password: hash,
        email: req.body.email,
        DateCreated: new Date(),
        verified: false
      });
      await newUser.save();
      passport.authenticate("local", (err, user, info) => {
        if (err) throw err;
        if (!user) res.send("No User Exists");
        else {
          req.logIn(user, (err) => {
            if (err) throw err;
            res.json({
              success: true
            });
            console.log(req.user);
          });
        }
      })(req, res, next);
    }
  });
});

router.get("/getUser", (req, res) => {
  res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
});

router.get('/logout', function (req, res){
  req.session.destroy();
});

// view users trips
router.get('/trips', (req, res) => {
	res.send('trips');
})

// view and edit account details
router.get('/account', 
passport.authenticate('local-strategy', {session:false}),
(req, res) => {
	res.json({
		firstname:req.user.firstname, 
		email:req.user.email
	});
});

// CRUD endpoints for trips
router.get('/trips/get', (req, res) => {
	res.status(200);
	res.send('GET request for trips');
})

router.post('/trips/save', (req, res) => {
	res.status(200);
	res.send('POST request for trips');
})

router.put('/trips/update', (req, res) => {
	res.status(200);
	res.send('PUT request for trips');
})

router.delete('/trips/delete', (req, res) => {
	res.status(200);
	res.send('DELET request for trips');
})

module.exports = router;
	