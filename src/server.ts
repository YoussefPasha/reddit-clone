import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth";
import trim from "./middleware/trim";

const app = express();

app.use(express.json());
app.use(trim);
app.use(morgan("dev"));

app.get("/", (req, res) => res.send("Hello World"));
app.use("/api/auth", authRoutes);

app.listen(5000, async () => {
  console.log("running...");
  try {
    await createConnection();
    console.log("db connected");
  } catch (error) {
    console.log(error);
  }
});
