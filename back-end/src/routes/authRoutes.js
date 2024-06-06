const express = require('express')
const { sendResetPasswordEmail, verifyCode, resetPassword, forgotPassword } = require('../controllers/authControllers');

const router = express.Router();

router.post('/forgot-password', sendResetPasswordEmail);
router.post('/verify-code', verifyCode);
router.post('/reset-password', resetPassword);
router.post('/forgot-password', forgotPassword);

module.exports = router;
