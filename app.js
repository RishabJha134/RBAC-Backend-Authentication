const express = require("express");
require("dotenv").config();

const { connectDB } = require("./config/db");
const { authRouter } = require("./routes/authRoutes");
const { userRouter } = require("./routes/userRoutes");
connectDB();

const app = express();

const cookieParser = require("cookie-parser");
app.use(cookieParser());

// middlware:-
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/role", userRouter);

app.get("/test", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT} `);
});
