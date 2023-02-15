import express from "express";
import { categoryController } from "../controllers/CategoryController.js";

const router = express.Router();

router.post("/create", categoryController.addCategory);
router.get("/list", categoryController.getAllCategory);

export default router;
