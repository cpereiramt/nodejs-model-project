var express = require('express');
var api = express.Router();

api.get('/', async function(req, res, next) { 
    return res.status(200).json({message: 'Welcome to stock Api, please Sign In or Sign UP'});
  });

  module.exports = api;