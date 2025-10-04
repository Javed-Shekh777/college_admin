const { loginUser } = require('../controller/userController');

const router = require('express').Router();

router.route('/login').post(loginUser);

module.exports = router;
