import express from "express";
import userController from "../controllers/UserController.js";
import middleware from "../middleware/middleware.js";

const router = express.Router();
router.get("/", middleware.verifyToken, userController.getAllUser);
router.delete("/:id", middleware.authozire, userController.delete);

export default router;
