import express from "express";
import authController from "../controllers/AuthController.js";
import middleware from "../middleware/middleware.js";

const router = express.Router();

router.post("/register", authController.register);
router.post("/signin", authController.signIn);
router.post("/refresh", authController.requestRefreshToken);
router.post("/signout", middleware.verifyToken, authController.signOut);

export default router;
