import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/user.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // for JSON data

app.use("/", userRoutes);
mongoose
  .connect(process.env.DB_LOCATION)
  .then(() => {
    console.log("DB Connected");
  })
  .catch(() => {
    "failed to connect";
  });

app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});

export default app;
