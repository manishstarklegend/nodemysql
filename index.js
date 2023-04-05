const winston = require("winston");
const express = require("express");
const app = express();
require("./startup/logging")();
require("./startup/dbConfig");
require("./startup/routes")(app);

const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`listening on port ${port}!`));

// const jsonwebtoken = require("jsonwebtoken");
// console.log(
//   jsonwebtoken.sign(
//     {
//       email: "mstark825@gmail.com",
//     },
//     "test123"
//   )
// );
