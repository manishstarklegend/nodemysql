const JWT = require("jsonwebtoken");
const UserQuery = require("../query_methods/userQueryMethods");
const AppError = require("../utils/appError");

module.exports = () => {
  return async (req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token) return res.status(401).send("Provide authorization token..");
    try {
      const decoded = JWT.verify(token, "test123");
      const user = await UserQuery.getUserQuery(decoded.email);
      delete user.password;
      req.user = user;
      next();
    } catch (err) {
      next(new AppError(err.message, 401));
    }
  };
};
