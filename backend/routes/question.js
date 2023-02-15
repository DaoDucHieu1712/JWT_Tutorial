import express from "express";
import { questionController } from "../controllers/QuestionController.js";

const router = express.Router();

router.get("/", questionController.getAllQuestion);
router.post("/create", questionController.addQuestion);
router.get(
  "/generateRadom/:level",
  questionController.getQuestionByLevelAndRandom
);

export default router;
