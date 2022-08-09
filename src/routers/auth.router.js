const authRouter = require("express").Router();
const { login, generateUser } = require("../controller/auth.controller");
const { checkToken } = require("../middlewares/jwt");

authRouter.post("/login", login);
authRouter.post("/generate-user",generateUser);
module.exports = authRouter;
