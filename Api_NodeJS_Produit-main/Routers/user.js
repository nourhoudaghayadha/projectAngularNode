const express = require('express');
const authController = require('../controller/userController');


const router = express.Router();


router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/forgotPassword', authController.forgotPassword);
router.post('/resetPassword/:token', authController.resetPassword);
router.get('/getAllUsers', authController.getAllUsers);


module.exports = router;