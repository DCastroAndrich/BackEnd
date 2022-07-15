import express from "express";
import { verifyTokenAndAdmin, verifyTokenAndAuth } from "../auth/jwt.verify.js";
import UsersController from "../controllers/users.controller.js";

const router = express.Router();

class UsersRouter {
  constructor() {
    this.controller = new UsersController();
  }

  start() {
    router.get("/", verifyTokenAndAdmin, this.controller.getAllUsers);
    router.get("/:id", verifyTokenAndAdmin, this.controller.getUser);
    router.delete("/:id", verifyTokenAndAuth, this.controller.deleteUser);
    return router;
  }
}

export default UsersRouter;
