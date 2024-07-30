const express = require('express');
const accountController = require('../controller/AccountController');


const router = express.Router();

router.post('/account/newaccount', accountController.addAccount);
router.post('/account/login', accountController.login);

router.put('/account/update', accountController.updateAccount);



module.exports = router;
