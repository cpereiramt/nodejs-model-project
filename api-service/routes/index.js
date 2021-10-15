var express = require('express');
var router = express.Router();

const dotenv = require('dotenv');
dotenv.config();

const apiRouter = require('./apiRouter');
const historyRouter = require('./historyRouter');
const loginRouter = require('./loginRouter');
const passwordResetRouter = require('./passwordResetRouter');
const registerRouter = require('./registerRouter');
const statsRouter = require('./statsRouter');
const stockRouter = require('./stockRouter');

module.exports = {apiRouter, historyRouter, loginRouter,passwordResetRouter,registerRouter, statsRouter,stockRouter};
