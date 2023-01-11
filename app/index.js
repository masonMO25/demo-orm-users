import express from "express";
import config from "./config.js";
import userRouter from "./user/routes.js";
const app = express();
const PORT = config.port || 3000;

// middleware to parse incoming json (POST)
app.use(express.json());

app.use("/api/users", userRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
