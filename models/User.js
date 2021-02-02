const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  document_id: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  name: {
    type: String,
    required: true,
  },

  surname: {
    type: String,
    required: true,
  },
  recovery_key: {
    type: Number,
    unique: true,
  },
  role: {
    type: String,
    required: true,
  },
});

module.exports = model("User", UserSchema);
