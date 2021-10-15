var express = require('express');
var history = express.Router();
const {verifyJWT, userInformationFromToken} = require('../middleware/tokenValidation');
const {searchUserHistory } = require("../services/historyService");
 //completed
 history.get('/history',verifyJWT, userInformationFromToken, async function(req, res, next) {
    const {user} = req.userInformation;
    const historyUserList = searchUserHistory(user);
    historyUserList.then(data => {
      res.status(data.status).json(data);
    })
  }
  );
  
  module.exports = history;