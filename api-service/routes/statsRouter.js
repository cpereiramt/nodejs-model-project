var express = require('express');
var stats = express.Router();
const {verifyJWT, userInformationFromToken} = require('../middleware/tokenValidation');
const {queryStatsFiveMostRequested} = require("../services/statsService");

//completed
stats.get('/stats',verifyJWT,userInformationFromToken, async function(req, res, next) {
    const {user} = req.userInformation;
    const requestedList = queryStatsFiveMostRequested(user);
    requestedList.then(data => {
      res.status(data.status).json(data);
    })
    }
    );


module.exports = stats