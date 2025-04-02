const sequelize = require("../config/SqlDB.JS");
const User = require("../models/SqlUser");
const Snack = require("../models/SqlSnack");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate([
    { name: "Alice", email: "alice@example.com" },
    { name: "Bob", email: "bob@example.com" },
    { name: "Charlie", email: "charlie@example.com" },
  ]);

  await Snack.bulkCreate([
    { name: "Chips", createdBy: users[0].id },
    { name: "Cookies", createdBy: users[1].id },
    { name: "Popcorn", createdBy: users[2].id },
  ]);

  console.log("Database seeded!");
  process.exit();
};

seedDatabase();
