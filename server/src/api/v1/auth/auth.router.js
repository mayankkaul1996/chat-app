const express = require('express')
const router = express.Router();

const authController = require('./auth.ctrl');


router.post('/googleLogin', authController.googleLogin);


module.exports = router;