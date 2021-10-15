const objectId = require('mongodb').ObjectId;

const getUsers = () => {
    const users = global.conn.collection('users').find().toArray();
    return  users;
  }
  
  const findUser = async (user) => {
    const objectID = new objectId(user._id);
    const userFound = await global.conn.collection('users').findOne({_id: objectID});
    return userFound;
  }
  
  const findUserByEmail = async (email) => {
    const userFound = await global.conn.collection('users').findOne({email: email});
    return userFound;
  }
  
  const updateUserPassword = async (user, password) => {
    const userFound = await global.conn.collection('users').findOneAndUpdate({_id: user._id}, {$set: {password: password}});
    return userFound;
  }
  const addUser = (user) => {
    const users = global.conn.collection('users').insertOne(user);
    return  users;
  }

  const getHistoryListByUser = async (user) => {
    const ObjectId = new objectId(user._id);
    const historys = await global.conn.collection('history').find({user_id: ObjectId}).sort({request_date: -1}).toArray();
    return historys;
  }
  module.exports = {  getUsers, addUser, findUser, findUserByEmail, updateUserPassword, getHistoryListByUser };