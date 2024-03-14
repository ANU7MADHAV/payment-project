const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User, Account } = require("../db");
const { userSchema, updateBody } = require("../validateSchema");
const config = require("../config");
const authMiddleware = require("../middleware");
const app = express();
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(express.json());

function generateAccessToken(username) {
  return jwt.sign(username, config.JWT_SECRET, { expiresIn: "1h" });
}

router.get("/", (req, res) => {
  return res.send("users").status(200);
});

router.post("/signup", async (req, res) => {
  const body = req.body;
  const response = userSchema.safeParse(body);

  if (!response.success) {
    console.log("validation failed");
    return res.status(400).send("validation failed");
  }

  const { username, lastName, password, firstName } = body;

  const user = await User.findOne({
    username,
  });
  if (user) {
    res.status(400).send({ message: "User is already exist" });
  }
  const myPlaintextPassword = password;
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashPassword = bcrypt.hashSync(myPlaintextPassword, salt);

  try {
    const user = new User({
      username,
      lastName,
      hashPassword,
      firstName,
    });
    const createUser = await user.save();

    if (createUser) {
      const balance = await Account.create({
        userId: createUser._id,
        balance: 1 + Math.random() * 1000,
      });
      console.log("balance", balance);
    }
    const token = generateAccessToken({ username });

    console.log("sign up token", token);

    return res
      .status(201)
      .json({ message: "User signed in successfully", success: true, token });
  } catch (error) {
    console.error(error, "something wrong");
    return res.send(error).status(400);
  }
});

router.post("/signin", async (req, res) => {
  const body = req.body;
  const { username, password } = body;
  const user = await User.findOne({
    username,
  });
  if (!user) {
    return res
      .send({ message: "user is not exist", success: false })
      .status(404);
  }

  const match = bcrypt.compareSync(password, user.hashPassword);
  if (!match) {
    return res
      .send({ message: "Password is incorrect", success: true })
      .status(404);
  }
  const userId = user._id;
  const token = generateAccessToken({ userId });

  console.log(token);

  return res
    .cookie("jwtToken", token, {
      httpOnly: true,
    })
    .status(201)
    .json({ message: "User signed in successfully", success: true, token });
});

router.put("/", authMiddleware, async (req, res) => {
  try {
    const body = req.body;
    const response = updateBody.safeParse(body);

    if (!response.success) {
      console.log("validation failed");
      return res.json("Validation failed").status(400);
    }

    //   const { firstName, lastName, password } = body;

    const updateUser = await User.updateOne(req.body, {
      id: req.userId,
    });
    if (!updateUser) {
      console.log("user is not updated");
    }
    res.json({
      message: "Updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.json(error).status(404);
  }
});

router.get("/details", authMiddleware, async (req, res) => {
  const userId = req.userId;
  const user = await User.findOne({
    _id: req.userId,
  });
  return res.json(user).status(200);
});

router.post("/bulk", authMiddleware, async (req, res) => {
  try {
    const filter = req.query.filter || "";

    const users = await User.find({
      $or: [
        {
          firstName: {
            $regex: filter,
            $options: "i",
          },
        },
        {
          lastName: {
            $regex: filter,
            $options: "i",
          },
        },
      ],
    });
    res.json({
      user: users.map((user) => ({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id,
      })),
    });
  } catch (error) {
    console.error("something wrong");
    res.send(error).status(404);
  }
});

module.exports = router;
