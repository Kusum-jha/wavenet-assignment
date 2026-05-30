const express = require("express");

const {
  createUser,
  getUsers,
  updateUserRole,
  deleteUser
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createUser);

router.get("/", protect, getUsers);

router.put("/:id", protect, updateUserRole);

router.delete("/:id", protect, deleteUser);

module.exports = router;
