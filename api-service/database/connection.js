const MongoClient = require('mongodb').MongoClient;


MongoClient.connect(`mongodb://${process.env.MONGODBPATH}:${process.env.MONGODBPORT}`)
.then((conn) => {
  console.log('Connected to MongoDB');
  global.conn = conn.db('quotes_database');
});
