const AdminModel = require("../model/adminModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

// Create Admin
const createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if email exists
    const checkEmail = await AdminModel.findOne({ email });
    if (checkEmail) {
      return res.status(400).json({ error: "This email is already registered" });
    }

    // Hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // Save admin
    const newAdmin = new AdminModel({
      name,
      email,
      password: hashPassword,
    });

    const savedAdmin = await newAdmin.save();
    res.status(201).json({
      id: savedAdmin._id,
      name: savedAdmin.name,
      email: savedAdmin.email,
    });
  } catch (error) {
    console.error("CreateAdmin Error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Admin Login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check email
    const admin = await AdminModel.findOne({ email });
    if (!admin) {
      return res.status(400).json({ error: "Invalid email" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = jwt.sign(
      {id: admin._id, name: admin.name, email: admin.email, role: admin.role},
      process.env.jwt_secret,
      {expiresIn: "1h"}
    )

    res.json({
      message: "Success login",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      },

      token

    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Server error" });
  }
};




// Read Admins
const readAdmin = async (req, res) => {
  try {
    const admins = await AdminModel.find().select("-password");
    res.json(admins);
  } catch (error) {
    console.error("ReadAdmin Error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { createAdmin, adminLogin, readAdmin };
