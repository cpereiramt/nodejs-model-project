var express = require('express');
var passwordReset = express.Router();
const {resetUserPassword } = require("../services/userService");


passwordReset.post('/password/reset', async function(  req, res) {
    const passwordReseted = resetUserPassword(req.body);
    passwordReseted.then(data => { 
        res.status(data.status).json(data);
    });
     
});


module.exports = passwordReset;