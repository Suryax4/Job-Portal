import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import jobRouter from "./routes/job.route.js";
import authRouter from "./routes/auth.route.js";
import cors from "cors";
dotenv.config();

mongoose
  .connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(express.json());
app.use(cors());

app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});

app.use("/api/job", jobRouter);
app.use("/api/auth", authRouter);
