const getFiveMostSearchedStocks = async () => {
    const stocks = await global.conn.collection('history').aggregate([ {
      $group: { _id: "$stock_code", count: { $count: { } }},
    },{ $project: { _id: 0,  'stock': '$_id', 'times_requested':'$count'},
    },{ $sort: { times_requested: -1 } }, { $limit: 5 }]).toArray();
    return stocks;
  }


  module.exports = {  getFiveMostSearchedStocks };