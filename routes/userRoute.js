'use strict';
// userRoute
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getUserList);
router.get('/:userId', userController.getUser);
router.post('/', userController.postUser);
router.put('/', userController.putUser);
router.delete('/', userController.deleteUser)

// TODO: ADD USER

module.exports = router;