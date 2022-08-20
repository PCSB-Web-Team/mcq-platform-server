const authRouter = require("express").Router();
const {
  login,
  generateUser,
  getProfile,
} = require("../controller/auth.controller");
const { checkToken, validateToken } = require("../middlewares/jwt");

authRouter.post("/login", login);
authRouter.post("/generate-user", generateUser);
authRouter.get("/profile", validateToken, getProfile);
module.exports = authRouter;
