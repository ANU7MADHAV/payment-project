const express = require("express");
const { Account } = require("../db");
const authMiddleware = require("../middleware");
const app = express();
const router = express.Router();
const mongoose = require("mongoose");

router.get("/balance", authMiddleware, async (req, res) => {
  const account = await Account.findOne({
    userId: req.userId,
  });

  return res.json({
    balance: account.balance,
  });
});

router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();
  const { amount, to } = req.body;

  const account = await Account.findOne({
    userId: req.userId,
  }).session(session);

  const currentBalance = account.balance;
  if (currentBalance < amount) {
    return res
      .json({ mesage: "Insufficient balace" })
      .status(404)
      .session(session);
  }
  const toAccount = await Account.findOne({
    userId: to,
  }).session(session);

  if (!toAccount) {
    await session.abortTransaction();
    return res.json({ mesage: "Invalid account" }).status(400);
  }
  await Account.updateOne(
    { userId: req.userId },
    {
      $inc: {
        balance: -amount,
      },
    }
  ).session(session);

  await Account.updateOne(
    {
      userId: to,
    },
    {
      $inc: {
        balance: amount,
      },
    }
  ).session(session);

  await session.commitTransaction();

  return res.json({ message: "Transaction updated successfully" });
});

module.exports = router;
