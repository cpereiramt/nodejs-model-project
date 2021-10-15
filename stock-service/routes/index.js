var express = require('express');
var router = express.Router();
const axios = require('axios');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Stock API' });
});

router.get('/stock',  function(req, res, next) {
  const stock_code = req.query.stock_code;
   axios.get(`https://stooq.com/q/l/?s=${stock_code}&f=sd2t2ohlcvn&h&e=csv`)
   .then(async response => {
     //convert csv response to json     
     const csvRow = response.data.split('\n');
     const json = csvRow.map(row => {
       return row.split(',').map(cell => {
         return cell.replace(/^"(.*)"$/, '$1');
       });
     });
     let keys = [];
     let values = [];
     let jsonObject = {};  //create an empty object   
     for(let i = 0; i < json.length; i++){
       for(let j = 0; j < json[i].length; j++){
         if(json[i][j] != ""){
         if(i == 0){
         let temporaryKey =  json[i][j].replace('\r','');
           keys.push(temporaryKey);
         }else{
          let temporaryValue =  json[i][j].replace('\r','');
           values.push(temporaryValue);
         }
       }
    }    
 } 

  keys.forEach(function(key, i){jsonObject[key] = values[i]});
     res.json(jsonObject); 
}); 
});
module.exports = router;
