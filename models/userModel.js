'use strict';
const pool = require("../database/db");
const promisePool = pool.promise();

// TODO: Add validation &

const getAllUsers = async () => {
  try {
    const sql = `SELECT user_id, name, email FROM wop_user`;
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
    const sql = `INSERT INTO wop_user VALUES (?, ?, ?, ?, ?);`;
    const [rows] = await promisePool.query(sql, [
      null,
      user.name,
      user.email,
      user.password,
      user.role,
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

const getUserLogin = async (email) => {
  try {
    console.log(email);
    const [rows] = await promisePool.execute(
        'SELECT * FROM wop_user WHERE email = ?;',
        [email]);
    console.log('get user login rows', rows);
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};

module.exports = {
  getAllUsers, getUserById, insertUser, modifyUser, deleteUser, getUserLogin
};
