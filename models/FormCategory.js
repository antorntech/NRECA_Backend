const mongoose = require("mongoose");

const formCategoryShcema = new mongoose.Schema({
  formCategory: {
    type: String,
  },
});

module.exports.FormCategory = mongoose.model(
  "FormCategory",
  formCategoryShcema,
  "FormCategory"
);
