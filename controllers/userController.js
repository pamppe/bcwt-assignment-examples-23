'use strict';
// userController
const userModel = require('../models/userModel');

const users = userModel.users;
//remove passwords
for (const user of users) {
    delete user.password;
}

const getUserList = (req, res) => {
    res.json(users);
};
const getUser = (req, res) => {
    //console.log(req.params);
    const id = req.params.userId;
    //TODO: filter matching user based on id
    // TODO: response 404 if id not found in array (res.status(404))
    /*const fileteredCats = cats.filter(cat => id == cat.id);
    const cat = filteredCats[0]
    res.json(cat);
    };*/
    const user = users.find(user => user.id === id);
    if (!user) {
        //res.status(404).send("Cat not found");
        res.status(404).send({message: 'user not found'})
        return;
    }
    res.json(user);
};
const postUser = (req, res) => {
    console.log(req.body);
    const newUser = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
        };
    users.push(newUser);
    res.send('trying to add user with username ' + req.body.username);
    // const createUser = req.params.user;
    //res.json(createUser);
}
const putUser = (req, res) => {
    const updateUser = req.params.user;
    res.json(updateUser);
}
const deleteUser = (req, res) => {
    const delUser = req.params.user;
    res.json(delUser);
}


const userController = {getUserList, getUser, postUser, putUser, deleteUser};
module.exports = userController;