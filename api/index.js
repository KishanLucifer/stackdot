import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/user.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // for JSON data
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/", userRoutes);
mongoose
  .connect(process.env.DB_LOCATION)
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err.message);
  });

app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});

export default app;
