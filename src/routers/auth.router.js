const authRouter = require("express").Router();
const { login } = require("../controller/auth.controller");
const { checkToken } = require("../middlewares/JWT");

authRouter.post("/", login);

module.exports = authRouter;
