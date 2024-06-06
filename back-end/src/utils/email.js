const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS  
  }
});

const sendVerificationEmail = (to, code) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: 'Your Verification Code',
    text: `Your verification code is: ${code}`
  };

  return transporter.sendMail(mailOptions);
};

module.exports = sendVerificationEmail;