const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const rootRouter = require("./routes/index");
const authMiddleware = require("./middleware");
const accountRouter = require("./routes/account");

const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.use("/api/v1", rootRouter);


app.get("/api", authMiddleware, (req, res) => {
  console.log("protected route");
  return res.send("Protected route").status(200);
});

app.listen(port, () => {
  console.log("Server started in " + port);
});
