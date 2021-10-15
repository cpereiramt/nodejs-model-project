const dotenv = require('dotenv');
dotenv.config();

let nodemailer = require('nodemailer');
// configure nodemailer
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MYGMAILUSER,
      pass: process.env.MYGMAILPASSWORD
    }
  });



  const sendEmail = (email, subject, text) => {
    let mailOptions = {
        from: process.env.MYGMAILUSER,
        to: email,
        subject: subject,
        text:text
      };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
  }


  module.exports = {sendEmail};

