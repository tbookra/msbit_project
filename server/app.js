const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const db_servise = require("./DB/mysql_pool");

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
const PORT = process.env.PORT;
const db = require("./DB/mysql_pool");

const questionsRouter = require("./routes/questionRoute");

app.use("/questions", questionsRouter);

app.get("/check", async (req, res) => {
  const data = await db_servise.execute(`
  SELECT * FROM questionare.questions;
    `);
  res.send(data[0]);
});

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
  db.connect((err) => {
    if (err) {
      console.log("error", err.message);
      return;
    }
    console.log("db connected");
  });
});
