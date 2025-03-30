const express = require("express");
const { verifyToken } = require("../middlewares/authMiddleware");
const { authenticationRole } = require("../middlewares/roleMiddleware");
const userRouter = express.Router();

userRouter.get("/admin", verifyToken, authenticationRole("admin"), (req, res) => {
  res.json({ message: "Welcome to the admin dashboard!" });
});
userRouter.get("/manager", verifyToken, authenticationRole("admin","manager"), (req, res) => {
  res.json({ message: "Welcome to the manager dashboard!" });
});
userRouter.get("/user", verifyToken, authenticationRole("admin","manager","user"), (req, res) => {
  res.json({ message: "Welcome to the user dashboard!" });
});

module.exports = { userRouter };
