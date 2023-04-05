const Joi = require("joi");
const catchAsync = require("../middleware/catchAsync");
const UserQuery = require("../query_methods/userQueryMethods");
const bcrypt = require("bcrypt");
const AppError = require("../utils/appError");
const JWT = require("jsonwebtoken");
module.exports.createUser = async (req, res, next) => {
  const passwordEncrypt = await bcrypt.hash(req.body.password, 12);

  await UserQuery.createUserQuery(
    req.body.name,
    req.body.email,
    passwordEncrypt
  );
  res.status(200).send("User Created.. Now LogIn..");
};

module.exports.login = async (req, res, next) => {
  const user = await UserQuery.getUserQuery(req.body.email);
  const validate = await bcrypt.compare(req.body.password, user.password);
  if (!validate)
    return next(new AppError("Email or Password is incorrect..", 400));
  const token = generateToken(req.body.email);

  res.status(200).json({
    result: "success",
    token,
  });
};

module.exports.me = catchAsync(async (req, res, next) => {
  res.status(200).send(req.user);
});

module.exports.updateUser = catchAsync(async (req, res, next) => {
  const name = req.body.name;
  if (!name) return next(AppError("Name is required..", 400));
  const updateUser = await UserQuery.updateUserQuery(req.user.email, name);
  res.status(200).send("User Updated");
});

module.exports.deleteUser = catchAsync(async (req, res, next) => {
  const deleteUser = await UserQuery.deleteUserQuery(req.user.email);
  res.status(200).send("user deleted");
});

module.exports.getAllUsers = catchAsync(async (req, res, next) => {
  const allUsers = await UserQuery.getAllUsersQuery();
  res.status(200).send(allUsers);
});
// Validation
module.exports.validateCreateUser = function (user) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(55).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    password: Joi.string().min(5).required(),
  });
  const result = schema.validate(user);
  return result.error;
};

module.exports.validateLoginUser = function (user) {
  const schema = Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    password: Joi.string().min(5).required(),
  });
  const result = schema.validate(user);
  return result.error;
};

function generateToken(email) {
  return JWT.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 5 * 60, //expires in 5 minutes
      email,
    },
    "test123"
  );
}
