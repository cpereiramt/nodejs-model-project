var express = require('express');
var login = express.Router();

const {checkUserCredentials } = require("../services/userService");


  //authenticate user
  login.post('/login', (req, res, next) => {     
     const userChecked = checkUserCredentials(req.body);
     userChecked.then(data =>  {
       return res.status(data.status).json(data);
     });
  });
  
  // Logout user
  login.post('/logout', function(req, res) {
      res.status(100).json({ auth: false, token: null, message: 'Logged out !' });
  })
  
  
 
  module.exports = login;