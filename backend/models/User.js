const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    uniqueUserId: {
      type: String
    },

    username: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: ["SUPER_ADMIN", "ADMIN", "UNIT_MANAGER", "USER"],
      default: "USER"
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", userSchema);
