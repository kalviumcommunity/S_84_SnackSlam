const { Sequelize } = require('sequelize');
require("dotenv").config();
  const sequelize = new Sequelize(process.env.DB_URL, {
    dialect: "mysql",  // ✅ Ensure this is MySQL
    logging: false,  // ✅ Disable logging for clarity
  });

sequelize.authenticate()
  .then(() => console.log('MySQL Database connected successfully'))
  .catch(err => console.error('Database connection failed:', err));


module.exports = sequelize;
