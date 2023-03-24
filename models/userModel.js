'use strict';
const pool = require("../database/db");
const promisePool = pool.promise();

const getAllUsers = async () => {
  try {
    const sql = `SELECT * FROM wop_user`;
    const [rows] = await promisePool.query(sql);
    //console.log(rows);
    return rows;
  } catch (e) {
    console.error("error", e.message);
    throw new Error("sql query failed");
  }
};
const getUserById = async (id) => {
  try {
    const sql = `SELECT wop_user.* FROM wop_user WHERE user_id = ?`;
    const [rows] = await promisePool.query(sql, [id]);
    //console.log(rows);
    return rows;
  } catch (e) {
    console.error("error", e.message);
    throw new Error("sql query failed");
  }
};
const insertUser = async (user) => {
  try {
    const sql = `INSERT INTO wop_user VALUES (?, ?, ?);`;
    const [rows] = await promisePool.query(sql, [
      null,
      user.name,
      user.email,
      user.password
    ]);
    //console.log(rows);
    return rows;
  } catch (e) {
    console.error("error", e.message);
    throw new Error("sql query failed");
  }
};
const modifyUser = async (user) => {
  try {
    //TODO: add sql UPDATE
    const sql = `UPDATE wop_user SET name=?, email=?, password=?
                 WHERE user_id=?`;
    const [rows] = await promisePool.query(sql, [
      user.name,
      user.email,
      user.password,
      user.id
    ]);
    //console.log(rows);
    return rows;
  } catch (e) {
    console.error("error", e.message);
    throw new Error("sql update failed");
  }
};
const deleteUser = async () => {
  try {
    //TODO: add sql UPDATE
    const sql = `DELETE FROM wop_user WHERE user_id=?`;
    const [rows] = await promisePool.query(sql, [id]);
    //console.log(rows);
    return rows;
  } catch (e) {
    console.error("error", e.message);
    throw new Error("sql delete user failed");
  }
};
/*const users = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@metropolia.fi',
    password: '1234',
  },
  {
    id: '2',
    name: 'Jane Doez',
    email: 'jane@metropolia.fi',
    password: 'qwer',
  },
];*/

module.exports = {
  getAllUsers, getUserById, insertUser, modifyUser, deleteUser
};
