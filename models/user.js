const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// var uniqueValidator = require('mongoose-unique-validator');

//creat User schema and model
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name field is required"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
  },
  {
    //used to remove (--v) version key from database document
    versionKey: false, // You should be aware of the outcome after set to false
  }
);

// UserSchema.plugin(uniqueValidator);

const User = mongoose.model("users", UserSchema);
module.exports = User;
