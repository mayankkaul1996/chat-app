const express = require('express')
const router = express.Router();

const indexRouter = require('../api/v1/index.router');
const authRouter = require('../api/v1/auth/auth.router');


router.use('/index', indexRouter);
router.use('/auth', authRouter);



module.exports = router;