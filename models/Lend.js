const { model, Schema } = require("mongoose");
const moment = require("moment");

let dateTime = new Date();

const LendSchema = Schema({
  collaborator: {
    type: Schema.ObjectId,
    ref: "Collaborator",
    required: true,
  },

  date_issued: {
    type: String,
    default: () => moment(dateTime).format("YYYY-MM-DD"),
    required: true,
  },

  status: {
    type: String,
    default: "ACTIVO",
    required: true,
  },

  initial_amount: {
    type: Number,
    required: true,
  },

  amount: {
    type: Number,
    required: true,
  },

  fee: {
    type: Number,
    required: true,
  },
});

module.exports = model("Lend", LendSchema);
