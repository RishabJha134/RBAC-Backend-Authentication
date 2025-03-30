const mongoose = require("mongoose");
async function connectDB() {
  try {
    const result = await mongoose.connect(process.env.DB_URL);
    console.log("Connected to the database");
  } catch (err) {
    console.error("Failed to connect to the database", err);
  }
}

module.exports = {
  connectDB,
};
