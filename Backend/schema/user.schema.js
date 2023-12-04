const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    label: String,
    booked_slots: Array,
  },
  {
    versionKey: false,
  }
);

const UserModel = mongoose.model("contacts", userSchema);

module.exports = { UserModel };
