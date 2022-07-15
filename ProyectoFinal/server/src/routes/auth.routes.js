import express from "express";
import UsersController from "../controllers/users.controller.js";
import UserModel from "../models/User.model.js";

const router = express.Router();

class AuthRouter {
  constructor() {
    this.controller = new UsersController();
  }
  start() {
    router.post("/register", this.controller.saveUser);
    router.post("/login", async (req, res) => {
      try {
        const user = await UserModel.findOne({
          userName: req.body.email,
        });
        !user && res.status(401).json("Wrong username");
      } catch (error) {}
    });
  }
}
