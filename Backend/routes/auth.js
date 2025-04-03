const express = require("express");
const router = express.Router();

// Dummy user data (in real projects, use a database)
const users = ["John", "Alice", "Bob","Kartikay","Diven","Aryaman","Akshit","Thakoor","Rishi","Chris","Krish"];

router.post("/login", (req, res) => {
    const { username } = req.body;
    if (!username || !users.includes(username)) {
        return res.status(401).json({ message: "Invalid username" });
    }
    res.cookie("username", username, { httpOnly: true, sameSite: "Strict" });
    res.json({ message: "Login successful", username });
});

router.post("/logout", (req, res) => {
    res.clearCookie("username");
    res.json({ message: "Logged out successfully" });
});

router.get('/check-auth', async (req, res) => {
    try {
      res.json({ isAuthenticated: true, user: req.user });
    } catch (error) {
      console.error('Check Auth Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  

module.exports = router;
