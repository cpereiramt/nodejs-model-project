var express = require("express");
var stock = express.Router();
const {
  verifyJWT,
  userInformationFromToken,
} = require("../middleware/tokenValidation");
const { searchStockBySymbol } = require("../services/stockService");

//completed
stock.get(
  "/stock",
  verifyJWT,
  userInformationFromToken,
  async function (req, res, next) {
    const { user } = req.userInformation;
    let stock_code = req.query.stock_code;
    const stockResult = searchStockBySymbol(user, stock_code);
    stockResult.then((data) => {
      res.status(data.status).json(data);
    });
  }
);

module.exports = stock;
