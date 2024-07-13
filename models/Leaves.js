const mongoose = require("mongoose");

const leavesSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    leaveCategory: {
      type: String,
    },
    leaveType: {
      type: String,
    },
    date: {
      type: Array,
    },
    days: {
      type: String,
    },
    reason: {
      type: String,
    },
    remark: {
      type: String,
    },
    status: {
      type: String,
      default: "pending",
    },
    approvedDate: {
      type: String,
      default: "N/A",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Leaves", leavesSchema, "Leaves");
