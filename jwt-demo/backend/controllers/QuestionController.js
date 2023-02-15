import Question from "../models/Question.js";

export const questionController = {
  //GET ALL QUESTION
  getAllQuestion: async (req, res) => {
    try {
      const questions = await Question.find();
      res.status(200).json(questions);
    } catch (error) {
      res.status(500).json(req.body);
    }
  },
  //CREATE QUESTION
  addQuestion: async (req, res) => {
    try {
      const newQuestion = new Question(req.body);
      res.status(200).json(await newQuestion.save());
    } catch (error) {
      res.status(500).json(req.body);
    }
  },
  //UPDATE QUESTION
  updateQuestion: async (req, res) => {
    try {
      const id = await Question.findById(req.params.id);
      await Question.updateOne({ $set: req.body });
      res.status(200).json("Update successful !");
    } catch (error) {
      res.status(500).json(req.body);
    }
  },
  //DELETE QUESTION
  deleteQuestion: async (req, res) => {
    try {
      await Question.findByIdAndDelete(req.params.id);
      res.status(200).json("Delete successful !");
    } catch (error) {
      res.status(500).json(req.body);
    }
  },
  //GET QUESTION BY LEVEL AND RANDOM
  getQuestionByLevelAndRandom: async (req, res) => {
    try {
      const question = [];
      res.status(200).json("getQuestionByLevelAndRandom");
    } catch (error) {
      res.status(500).json(req.body);
    }
  },
};
