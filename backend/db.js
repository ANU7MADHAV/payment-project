const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const main = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://anumadhavan7:YmktxQYFPQLCSZbC@cluster0.f3eqsyr.mongodb.net/paytm"
    );
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
  }
};

main();

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 30,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 30,
  },
  hashPassword: {
    type: String,
    required: true,
    trim: true,
  },
});

const accountSchema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  balance: {
    type: Number,
    required: true,
  },
});
const User = model("User", userSchema);
const Account = model("Account", accountSchema);
module.exports = {
  User,
  Account,
};
