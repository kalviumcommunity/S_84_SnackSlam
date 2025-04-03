const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const cookieParser = require("cookie-parser");

router.use(cookieParser());

const users = ["John", "Alice", "Bob", "Kartikay", "Diven", "Aryaman", "Akshit", "Thakoor", "Rishi", "Chris", "Krish"];

const JWT_SECRET = "secret"; // Replace with environment variable

// Middleware to verify JWT token
const protect = (req, res, next) => {
  try {
    const token = req.cookies?.token; // Ensure token extraction is correct
    if (!token) return res.status(401).json({ message: "Not authorized" });

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = { username: decoded.username }; // Store username from token
    next();
  } catch (error) {
    res.status(401).json({ message: "Token verification failed" });
  }
};

// Login Route
router.post("/login", (req, res) => {
  const { username } = req.body;

  if (!username || !users.includes(username)) {
    return res.status(401).json({ message: "Invalid username" });
  }

  // Generate JWT token
  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1d" });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });

  res.json({ message: "Login successful", username });
});

// Logout Route
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
});

// Check Auth Route
router.get("/check-auth", protect, (req, res) => {
  res.json({ isAuthenticated: true, user: req.user });
});

module.exports = router;
