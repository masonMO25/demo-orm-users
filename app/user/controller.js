import User from "./model.js";

export default {
  create(payload) {
    return User.create(payload);
  },
};

const mason = await User.create({ name: "Mason" });
console.log(mason.name);
