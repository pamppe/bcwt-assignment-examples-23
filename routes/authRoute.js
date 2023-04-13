"use strict";
const express = require("express");
const router = express.Router();
const {body} = require('express-validator');
const { login } = require("../controllers/authController");
const {postUser} = require('../controllers/userController');

router
    .post("/login", login)
    .post('/logout')
    .post(
        '/register',
        body('name').isLength({min: 3}).trim().escape(),
        body('email').isEmail().normalizeEmail(),
        body('passwd').isLength({min: 8}).trim(),
        postUser
    );


module.exports = router;