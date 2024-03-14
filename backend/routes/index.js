const express = require("express");
const router = express.Router();
const userRouter = require("./user");
const accountRouter = require("./account");

router.use("/user", userRouter);
router.use("/account", accountRouter);

router.get("/", (req, res) => {
  return res.send("api page").status(200);
});

module.exports = router;
