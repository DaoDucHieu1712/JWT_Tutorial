import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    quiz: {
      type: String,
      required: true,
    },
    q1: {
      type: String,
      required: true,
    },
    q2: {
      type: String,
      required: true,
    },
    q3: {
      type: String,
      required: true,
    },
    q4: {
      type: String,
      required: true,
    },
    solution: {
      type: Number,
      required: true,
    },
    level: {
      type: Number,
      required: true,
      min: 1,
      max: 15,
    },
  },
  { timestamps: true }
);

let Question = mongoose.model("Question", questionSchema);
export default Question;
