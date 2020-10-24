const express = require('express')
const router = express.Router();

const indexRouter = require('../api/v1/index.router');

router.use('/index', indexRouter);


module.exports = router;