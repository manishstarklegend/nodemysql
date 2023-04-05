const express = require("express");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const morgan = require("morgan");
const xss = require("xss-clean");

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "To many requests from this IP, try again after 1 hour..",
});

const userRoute = require("../routes/userRoute");
const error = require("../middleware/error");
module.exports = (app) => {
  //Middleware for security
  app.use(helmet()); //securing headers
  app.use("/", limiter); // api calling limited per IP
  if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev")); //logging all api request and status code in console
  }
  app.use(express.json({ limit: "10kb" }));
  app.use(xss());
  app.use("/api/user", userRoute);
  app.use("*", (req, res) => {
    res.status(404).send("No Routes Found...!");
  });
  app.use(error);
};
