const express = require('express')
const router = express.Router();

const indexController = require('./index.ctrl');


router.get('/alive', indexController.isAppAlive);


module.exports = router;