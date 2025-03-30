const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userModel } = require("../models/user.model");

async function register(req, res) {
  try {
    const { username, password, role } = req.body;
    if (!username || !password || !role) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const hashedPassword = await bcrypt.hash(password, 11);

    const createdUser = await userModel.create({
      username,
      password: hashedPassword,
      role,
    });

    if (!createdUser) {
      return res.status(500).json({ message: "Failed to create user." });
    }
    res
      .status(201)
      .json({ message: "User created successfully.", data: createdUser });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "something went wrong with registering the user" });
  }
}
async function login(req, res) {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const user = await userModel.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "11h",
      }
    );

    if (!token) {
      return res.status(500).json({ message: "Failed to generate token." });
    }

    // Set JWT token in httpOnly cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
    });

    res.status(200).json({ message: "Logged in successfully.", token });
  } catch (error) {
    console.error(error);
    // Handle the error here. For example, retry the operation or notify the user.
  }
}

module.exports = {
  register,
  login,
};
