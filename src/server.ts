import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

import authRoutes from "./routes/auth";
import trim from "./middleware/trim";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(trim);
app.use(cookieParser());

app.get("/", (req, res) => res.send("Hello World"));
app.use("/api/auth", authRoutes);

app.listen(5001, async () => {
  console.log("running...");
  try {
    await createConnection();
    console.log("db connected");
  } catch (error) {
    console.log(error);
  }
});
