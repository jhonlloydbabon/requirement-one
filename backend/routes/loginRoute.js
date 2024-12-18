const router = require('express').Router();
const validInfo = require('../middleware/validInfo');
const services = require('../services/loginService');

router.post('/register',validInfo,services.register);
router.post('/login',validInfo,services.login);

module.exports = router;