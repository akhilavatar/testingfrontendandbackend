import express from "express";
import cors from "cors";
import { config } from "./src/config/env.js";
import chatRouter from "./src/routes/chat.js";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/chat", chatRouter);

app.listen(config.port, () => {
  console.log(`Virtual Girlfriend listening on port ${config.port}`);
});