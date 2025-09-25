const mongoose = require("mongoose");
const User = require("../models/User");
require("dotenv").config();

const clearUsers = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");

    const deletedUsers = await User.deleteMany({});
    console.log(`🗑️  Deleted ${deletedUsers.deletedCount} users from database`);

    console.log("✅ Database cleared successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

clearUsers();
