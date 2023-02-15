import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    fullName: {
      type: String,
      require: true,
    },
    role: {
      type: Number,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

let User = mongoose.model("User", userSchema);
export default User;
