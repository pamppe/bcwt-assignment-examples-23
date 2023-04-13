'use strict';
// userController
const userModel = require('../models/userModel');
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');

/*const users = userModel.users;
//remove passwords
for (const user of users) {
    delete user.password;
}*/

const getUserList = async (req, res) => {
    try {
        const users = await userModel.getAllUsers();
        //console.log(cats);
        res.json(users);
    } catch (error) {
        res.status(500).json({error: 500, message: error.message});
    }
};
const getUser = async (req, res) => {
    //console.log(req.params);
    const userId = Number(req.params.userId);
    //const id = req.params.userId;
    // check if number is not an integer
    if (!Number.isInteger(userId)) {
        res.status(400).json({error: 500, message: "invalid id"});
        return;
    }
    //TODO: filter matching user based on id
    // TODO: response 404 if id not found in array (res.status(404))
    const [user] = await userModel.getUserById(userId);
    console.log("get user", user)
    if (user) {
        res.json(user);
    } else {
        //res.status(404).send("Cat not found");
        res.status(404).send({message: 'user not found'})
    }
};
const postUser = async (req, res) => {
    console.log('posting user ', req.body, req.file);
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.passwd, salt);

    const newUser = {
        name: req.body.name,
        email: req.body.email,
        password: password,
        role: 1,
    };
    const errors = validationResult(req);
    console.log('validation errors', errors);
    if (errors.isEmpty()) {
        try {
            const result = await userModel.insertUser(newUser);
            res.status(201).json({message: 'user created', userId: result});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    } else {
        res.status(400).json({
            message: 'user creation failed',
            errors: errors.array(),
        });
    }
};
const putUser = async (req, res) => {
    console.log("modify a user", req.body);
    const user = req.body;
    const result = await userModel.modifyUser(req.body);
    res.status(200).send("User modified");
   // const updateUser = req.params.user;
   // res.json(updateUser);

};
const deleteUser = async (req, res) => {
    console.log("deleting user", req.params.userId);
    const result = await userModel.deleteUser(req.params.userId);
    res.status(200).send("User deleted");
    //const delUser = req.params.user;
    //res.json(delUser);
}

const checkToken = (req, res) => {
    res.json({user: req.user});
};

const userController = {
    getUserList,
    getUser,
    postUser,
    putUser,
    deleteUser,
    checkToken};

module.exports = userController;