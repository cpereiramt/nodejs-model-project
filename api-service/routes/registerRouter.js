var express = require('express');
var register = express.Router();
const {registerUser } = require("../services/userService");

//completed
register.post('/register', async (req, res, next) => {
    let body = req.body;
    const userRegistered = registerUser(body);
    userRegistered.then(data => {
      res.status(data.status).json(data);
    })
   
  });

module.exports = register;
  