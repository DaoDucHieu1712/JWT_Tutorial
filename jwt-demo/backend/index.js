import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import productRoute from "./routes/product.js";
import categoryRoute from "./routes/category.js";
import questionRoute from "./routes/question.js";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();
const PORT = 8000;

app.use(
  express.json({ limit: "50mb" }),
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
  morgan("common"),
  cookieParser()
);
//ROUTES

// v1: user, guest
app.use("/api/product", productRoute);
app.use("/api/category", categoryRoute);
app.use("/api/v1/question", questionRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);
// v2: admin

// Database
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connect MONGODB successful !!");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log("server is running on port");
});
