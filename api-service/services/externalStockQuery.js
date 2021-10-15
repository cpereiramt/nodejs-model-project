const axios = require("axios");

const externalQueryByStockSymbol = async (userFound, stock_code) => {
  const result = axios
    .get(`http://localhost:3002/stock?stock_code=${stock_code}`)
    .then((response) => {
      const responseData = response.data;
      const user_id = userFound._id;
      const request_date = new Date();
      if (responseData.Date === "N/D") {
        return { message: "stock code not found", status: 404 };
      } else {
        const historyToSave = {
          user_id: user_id,
          stock_code: responseData.Symbol,
          request_date: request_date.toISOString(),
          stock_date: responseData.Date,
          stock_time: responseData.Time,
          stock_open: responseData.Open,
          stock_high: responseData.High,
          stock_low: responseData.Low,
          stock_close: responseData.Close,
          stock_volume: responseData.Volume,
          stock_name: responseData.Name,
        };
        global.crud.historyCrud.addHistory(historyToSave);
        const data = response.data;
        return { data, status: 200 };
      }
    });
 return result;
};

module.exports = { externalQueryByStockSymbol };
