const { DataTypes } = require("sequelize");
const sequelize = require("../config/SqlDB.JS");
const User = require("./SqlUser");

const Snack = sequelize.define("Snack", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  createdBy: { type: DataTypes.INTEGER, allowNull: false, references: { model: User, key: "id" } },
});

Snack.belongsTo(User, { foreignKey: "createdBy" });

module.exports = Snack;
