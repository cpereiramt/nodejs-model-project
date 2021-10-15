const {externalQueryByStockSymbol} = require("../services/externalStockQuery");

const searchStockBySymbol = async (user, stock_code) => {
    const userFound = await global.crud.userCrud.findUser(user);

    const queryResult = await externalQueryByStockSymbol(userFound,stock_code);
    return queryResult;
    
}



module.exports = { searchStockBySymbol};