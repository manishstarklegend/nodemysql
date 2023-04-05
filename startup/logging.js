const winston = require("winston");
require("express-async-errors");

module.exports = function () {
  winston.add(
    new winston.transports.File({
      filename: "log.log",
      handleExceptions: true,
    })
  );

  process.on("uncaughtException", (err) => {
    console.log("Uncaught Exception--->", err);
    winston.error(err.message, err);
    process.exit(1);
  });

  process.on("unhandledRejection", (err) => {
    console.log("Unhaldled Rejection--->", (err) => {
      winston.error(err.message, err);
      process.exit(1);
    });
  });
};
