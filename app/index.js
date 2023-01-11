import express from "express";
import userRouter from "./user/routes.js";
const app = express();
const port = 3000;

// middleware to parse incoming json (POST)
app.use(express.json());

app.use("/api/books", userRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
