const jwt = require('jsonwebtoken');
var uuid = require('uuid-random');
const {sendEmail} = require('../utils/emailSend');

const checkUserCredentials = async (body) => {
    const {email, password} = body;
    const users = await global.crud.userCrud.getUsers();
    const user = users.find(x => x.email === email);
    if (!user) {
      return {message: 'user not found', status: 401};
    } else if (user.password !== password) {  //check if password is correct
      return {message: 'password incorrect', status: 401};
    } else {
      const token = jwt.sign({user}, process.env.SECRET, {expiresIn: '500s'});
      return {message: 'user authenticated', token: token, status: 200};
    }
} 



const resetUserPassword = async (body) => {
    const {email} = body;
    const user = await global.crud.userCrud.findUserByEmail(email);
    if (!user) {
        return {message: 'user not found', status: 404 };
    }
    else  {
      const randomId = uuid();
      global.crud.userCrud.updateUserPassword(user, randomId);
      const subject = 'Your password has changed';
      const text = `please take note of this password and save in a safe place => ${randomId}`;
      sendEmail(user.email,subject,text);
     return { message: 'Password reset successful and send to email !', status: 200 };
    }
}


const registerUser = async (body) => {
    const randomId = uuid();
    //select all users  from db
    const user = await global.crud.userCrud.getUsers();
    //check if user already exists
    if (user.find(x => x.email === body.email)) {
      return {message: 'email already registered', status: 200};
    }
    else if (body.email === undefined || body.isAdmin === undefined ) {
      return {message: 'please insert both email and isAdmin fields to make register', status: 400};
    }
    //insert new user
    else {
      const newUser = {
        email: body.email,
        password: randomId,
        isAdmin: body.isAdmin,
      };
      await global.crud.userCrud.addUser(newUser);
      const subject = 'Your user was registed with sucess !';
      const text = `please take note of this password and save in a safe place => ${randomId}`;
      sendEmail(body.email,subject,text);
      return {message: `user created, please take note of your auto-generate password => ${newUser.password}`, status: 201};
    }
}
module.exports = { checkUserCredentials, resetUserPassword, registerUser};