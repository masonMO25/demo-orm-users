import { DataTypes } from "sequelize";
import sequelize from "../conn.js";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      valitdate: {
        isAlphanumeric: { msg: "Username must be alphanumeric" },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      len: {
        args: [8],
      },
      notNull: {
        msg: "Password must be at least 8 characters long.",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);

await User.sync().catch((err) => {
  console.error("Error syncing the database: ", err.message);
  process.exit(1);
});

export default User;
