const mysql = require("mysql");
const winston = require("winston");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
});

db.connect(function (err, data) {
  if (err) {
    console.log(err);
    winston.error(err.message, err);
    process.exit(1);
  }
  db.query("CREATE DATABASE IF NOT EXISTS blockchain", (err, data) => {
    if (err) return console.log(err);
    db.query("USE blockchain", (err, data) => {
      if (err) return console.log(err);
    });
    db.query(
      `CREATE TABLE IF NOT EXISTS user(id int AUTO_INCREMENT PRIMARY KEY,name varchar(55) NOT NULL , email varchar(100) UNIQUE NOT NULL, password varchar(100) NOT NULL, role varchar(15),  insert_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`,
      function (err, data) {
        if (err) return console.log(err);
      }
    );
  });
  console.log("Connected to database..");
  winston.info("database connected");
});
module.exports = db;
