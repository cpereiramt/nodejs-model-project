const addHistory = (history) => {
    const historys = global.conn.collection('history').insertOne(history);
    return historys;
  }
  



  module.exports = {addHistory};