const winston = require("winston");

module.exports = function (err, req, res, next) {
  winston.error(err.message, err);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).send(err.message);
};
