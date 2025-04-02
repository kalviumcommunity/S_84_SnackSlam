const express = require("express");
const router = express.Router();
const Snack = require("../models/SqlSnack");
const User = require("../models/SqlUser");

// Fetch snacks for a specific user OR all snacks if no userId is provided
router.get("/by-user/:userId?", async (req, res) => {
  try {
    const { userId } = req.params;

    let snacks;
    
    if (userId) {
      // Fetch snacks created by a specific user
      snacks = await Snack.findAll({
        where: { createdBy: userId },
        include: User,
      });
    } else {
      // Fetch all snacks with user details
      snacks = await Snack.findAll({ include: User });
    }

    res.json(snacks);
  } catch (error) {
    console.error("Error fetching snacks:", error);
    res.status(500).json({ error: "Error fetching snacks" });
  }
});

// Fetch all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.findAll(); // Fetch all users from MySQL
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Error fetching users" });
  }
});

module.exports = router;
