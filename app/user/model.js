import bcrypt from "bcrypt";
import { DataTypes } from "sequelize";
import config from "../config.js";
import sequelize from "../conn.js";

async function sanitizeUser(user) {
  user.username = user.username.toLowerCase();
  user.email = user.email.toLowerCase();

  const salt = await bcrypt.genSalt(config.saltRounds);
  user.password = await bcrypt.hash(user.password, salt);
}

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

User.beforeCreate(sanitizeUser);
User.beforeUpdate(sanitizeUser);

export default User;
