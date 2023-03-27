'use strict';
// userController
const userModel = require('../models/userModel');

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
    }
    catch (error) {
        res.status(500).json({error: 500, message: error.message});
    }
};
const getUser = async (req, res) => {
    //console.log(req.params);
    const userId = (req.params.id);
    //const id = req.params.userId;
    // check if number is not an integer
    if (!Number.isInteger(userId)) {
        res.status(400).json({error: 500, message: "invalid id"});
        return;
    }
    //TODO: filter matching user based on id
    // TODO: response 404 if id not found in array (res.status(404))

    console.log("get user", user)
  try {
      const [user] = await userModel.getUserById(userId);
      console.log("get user", user);
      res.json(user);

  } catch (error) {
        res.status(404).json({message: 'User Not Found!'})
      console.error('error', error.message);
        throw new Error('sql user not found');
  }
};
const postUser = async (req, res) => {
    console.log('posting user ', req.body);
    const newUser = req.body;
   // newUser.filename = req.file.path;
    try {
        const result = await userModel.insertUser(newUser);
        //{// name: req.body.name,
        // email: req.body.email,
        // password: req.body.password
        //};
        users.push(newUser);
        res.status(201).json('Added user ' + req.body.name);
        // const createUser = req.params.user;
        //res.json(createUser);
    }catch (error) {
        console.error('error',error.message);
        throw new Error ('Post failed!');

    }
}
const putUser = async (req, res) => {
    console.log("modify a user", req.body);
    const user = req.body;
    try {
        const result = await userModel.modifyUser(req.body);
        //{// name: req.body.name,
        // email: req.body.email,
        // password: req.body.password
        //};
        res.status(200).send("User modified");
        //users.push(newUser);
       // res.status(201).json('Added user ' + req.body.name);
        // const createUser = req.params.user;
        //res.json(createUser);
    }catch (error) {
        console.error('error',error.message);
        throw new Error ('Modify failed!');

    }


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

const userController = {getUserList, getUser, postUser, putUser, deleteUser};
module.exports = userController;