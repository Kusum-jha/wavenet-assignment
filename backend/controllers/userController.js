const User = require("../models/User");
const bcrypt = require("bcryptjs");

const createUser = async (req, res) => {
  try {

    const { username, email, password, role } = req.body;

    const exists = await User.findOne({ email });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Email already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
      createdBy: req.user.id
    });

    res.status(201).json({
      success: true,
      user
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

const getUsers = async (req, res) => {
  try {

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const users = await User.find()
      .select("-password")
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await User.countDocuments();

    res.json({
      success: true,
      total,
      page,
      users
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

const updateUserRole = async (req, res) => {
  try {

    const { role } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select("-password");

    res.json({
      success: true,
      user
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

const deleteUser = async (req, res) => {
  try {

    await User.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "User deleted"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

module.exports = {
  createUser,
  getUsers,
  updateUserRole,
  deleteUser
};
