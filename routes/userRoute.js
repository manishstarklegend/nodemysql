const express = require("express");
const User = require("../controller/userController");
const auth = require("../middleware/auth");
const validator = require("../middleware/validator");

const router = express.Router();

router.post("/createUser", validator(User.validateCreateUser), User.createUser);
router.post("/login", validator(User.validateLoginUser), User.login);
router.get("/me", auth(), User.me);
router.patch("/", auth(), User.updateUser);
router.delete("/", auth(), User.deleteUser);

module.exports = router;
