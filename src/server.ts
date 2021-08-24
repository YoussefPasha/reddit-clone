import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import morgan from "morgan";
const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => res.send("Hello World"));

app.listen(5000, async () => {
  console.log("running...");
  try {
    await createConnection();
    console.log("db connected");
  } catch (error) {
    console.log(error);
  }
});
