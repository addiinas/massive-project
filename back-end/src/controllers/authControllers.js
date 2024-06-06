const nodemailer = require('nodemailer');
const crypto = require('crypto');
require('dotenv').config();

let verificationCodes = {}; // Simpan kode verifikasi sementara

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendResetPasswordEmail = (req, res) => {
  const { email } = req.body;
  const code = crypto.randomInt(1000, 9999).toString();
  verificationCodes[email] = code;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Reset Password Verification Code',
    text: `Your verification code is ${code}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ error: 'Failed to send email' });
    }
    res.status(200).json({ message: 'Verification code sent to email' });
  });
};

const verifyCode = (req, res) => {
  const { email, code } = req.body;
  if (verificationCodes[email] === code) {
    return res.status(200).json({ message: 'Code verified' });
  }
  res.status(400).json({ error: 'Invalid verification code' });
};

const resetPassword = (req, res) => {
  const { email, password } = req.body;
  // disini implementasi logic buat ngatur ulang kata sandi user di database 
  // misalnya, hash password baru dan simpan ke database
  // hapus kode verifikasi setelah berhasil mengatur ulang kata sandi
  delete verificationCodes[email];
  res.status(200).json({ message: 'Password has been reset successfully' });
};

module.exports = {
  sendResetPasswordEmail,
  verifyCode,
  resetPassword,
  test
};

