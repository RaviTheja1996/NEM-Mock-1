const express = require("express");
const { connection } = require("./db");
require("dotenv").config();
const { userRouter } = require("./routes/user.routes");
const cors = require("cors");

const app = express();

// let corsOptions = {
//   origin: "http://localhost:3000",
//   optionsSuccessStatus: 200
// }

app.use(cors());

app.use(express.json());
app.use("/users", userRouter);

app.get("/", (req, res) => {
  res.status(200).send({ msg: "This is the homepage for the server" });
});

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("connect to DB");
    console.log(`server is running at port ${process.env.PORT}`);
  } catch (err) {
    console.log(err.message);
  }
});
