
const express = require('express');
const router = express.Router();
var User = require("../modules/user");
var Image = require("../modules/image");
const { body, validationResult } = require("express-validator");
var async = require("async");
const fs = require('fs');

exports.user_create = async function (req, res, next) {
 try{
  var { username, password } = req.body;
      if (typeof username !== "string" || username.length < 3) {
        res.status(400).send('Invalid username, must have at least 3 characters.');
        return;
      }
      for (var i = 0; i < username.length; i++) {
        var charCode = username.charCodeAt(i);
        if (!(charCode > 47 && charCode < 58) &&  // numeric (0-9)
            !(charCode > 64 && charCode < 91) &&  // upper alpha (A-Z)
            !(charCode > 96 && charCode < 123)) { // lower alpha (a-z)
          res.status(400).send('Invalid username, must contain only alphanumeric characters');
          return;
        }
      }
      if (typeof password !== "string" || password.length < 8) {
        res.status(400).send('Invalid password, must have at least 8 characters.');
        return;
      }
      var upper = undefined;
      var lower = undefined;
      var digit = undefined;

      for (var i = 0; i < password.length; i++) {
        var charCode = password.charCodeAt(i);
        if ((charCode > 47 && charCode < 58)){  // numeric (0-9)
          digit = charCode;
        } if((charCode > 64 && charCode < 91)){ // upper alpha (A-Z)
          upper = charCode;
        }
        if((charCode > 96 && charCode < 123)){  // lower alpha (a-z)
          lower = charCode;
        }
        if(upper!== undefined && lower!== undefined && digit!== undefined ){
          break;
        }
      }
      if(upper===undefined){
        res.status(400).send('Invalid password, must contain at least one uppercase letter');
        return;
      }
      if(lower===undefined){
        res.status(400).send('Invalid password, must contain at least one lowercase letter');
        return;
      }
      if(digit===undefined){
        res.status(400).send('Invalid password, must contain at least one digit');
        return;
      }
      const existingUser = await User.findOne({ username });
      if (existingUser) {
      res.status(409).send('Username already exists');
      return;
    }
    const newUser = new User({
      username,
      password,
      profilePicture: {
        data: fs.readFileSync('Images/default.jpg'),
        contentType: 'image/jpeg'
      }
    });
    await newUser.save();
    res.json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating new user');
  }
  };


  exports.auth_user = async function (req, res, next) {
    try {
      var { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        res.status(401).send('Authentication failed. Invalid username or password.');
        return;
      }
      if (user.password !== password) {
        res.status(401).send('Authentication failed. Invalid username or password.');
        return;
      }
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error authenticating user');
    }
  };

  exports.update_user =  async function (req, res, next) {
    try {
      console.log('updating');
      const user = await User.findById(req.params._id);
      if (!user) {
        res.status(404).send('User not found');
        return;
      }
     
      const { username } = req.body;
      console.log(username);
      user.username = username;
     
      if (typeof username !== "string" || username.length < 3) {
        res.status(400).send('Invalid username, must have at least 3 characters.');
        return;
      }
      for (var i = 0; i < username.length; i++) {
        var charCode = username.charCodeAt(i);
        if (!(charCode > 47 && charCode < 58) &&  // numeric (0-9)
            !(charCode > 64 && charCode < 91) &&  // upper alpha (A-Z)
            !(charCode > 96 && charCode < 123)) { // lower alpha (a-z)
          res.status(400).send('Invalid username, must contain only alphanumeric characters');
          return;
        }
      }
      
      const existingUser = await User.findOne({ username });
      if (existingUser) {
      res.status(409).send('Username already exists');
      return;
    }
      await user.save();
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error updating user');
    }
  };

  exports.go_to_dashboard = function(req, res) {
    res.render('/dashboard', { user: req.user });
  };

  
  exports.update_user_image =  async function (req, res, next) {
    try {
      console.log('updating image');
      console.log(req.params._id);
      const user = await User.findById(req.params._id);
      if (!user) {
        res.status(404).send('User not found');
        return;
      }
      const name = req.body.name;

      
      user.profilePicture= {
      
          data: fs.readFileSync(`Images/${name}`),
          contentType: 'image/png'
        
      } 

  
      await user.save();
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error updating image');
    }
  };

 exports.get_images = async function (req, res, next){
  
  const image1 = new Image({


      data: fs.readFileSync('Images/scott.png'),
      contentType: 'image/png'
    
  });

  const image2 = new Image({


    data: fs.readFileSync('Images/darthvader.png'),
    contentType: 'image/png'
  
});
const image3 = new Image({

  data: fs.readFileSync('Images/xbox.png'),
  contentType: 'image/png'

});
const image4 = new Image({

  data: fs.readFileSync('Images/mqueen.png'),
  contentType: 'image/png'

});
  res.send([image1,image2,image3,image4]);
 }

module.exports = exports;
