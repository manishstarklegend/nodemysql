const db = require("../startup/dbConfig");
const AppError = require("../utils/appError");
const winston = require("winston");

module.exports.createUserQuery = async function (name, email, password) {
  return new Promise(function (resolve, reject) {
    db.query(
      `INSERT INTO user (name , email , password) VALUES ('${name}' , '${email}' , '${password}')`,
      (err, data) => {
        if (err) {
          return reject(new AppError(err.message, 500));
        }
        return resolve(data);
      }
    );
  });
};

module.exports.getUserQuery = async function (email) {
  return new Promise(function (resolve, reject) {
    db.query(`SELECT * FROM user WHERE email = '${email}'`, (err, data) => {
      if (err) return reject(new AppError(err.message, 500));
      if (data.length == 0) return reject(new AppError("No user found..", 400));
      return resolve(data[0]);
    });
  });
};

module.exports.updateUserQuery = async function (email, name) {
  return new Promise(function (resolve, reject) {
    db.query(
      `UPDATE user SET name = '${name}' WHERE email = '${email}'`,
      (err, data) => {
        if (err) return reject(new AppError(err.message, 400));
        return resolve(data);
      }
    );
  });
};

module.exports.deleteUserQuery = async function (email) {
  return new Promise(function (resolve, reject) {
    db.query(`DELETE FROM user WHERE email = '${email}'`, (err, data) => {
      if (err) return reject(new AppError(err.message, 400));
      return resolve(data);
    });
  });
};
