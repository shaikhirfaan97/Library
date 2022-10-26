const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  studentID: {
    type: String,
    required: true,
  },
  contactNum: {
    type: Number,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  year: {
    type: Date,
    required: true,
  },
  admission: {
    type: String,
    default: "",
  },
  gender: {
    type: String,
    default: "",
  },
  bloodGroup: {
    type: String,
    default: "",
  },
  emergencyContact: {
    type: Number,
    default: "",
  },
  address: {
    type: String,
    default: "",
  },
  testImage:{
    data: Buffer,
    contentType: String
  
  }
});

//  static signup

userSchema.statics.signup = async function (
  userName,
  email,
  password,
  studentID,
  contactNum,
  department,
  year
) {
  // email password validation
  if (!email || !password) {
    throw Error("All fields are required!");
  }
  if (!validator.isEmail(email)) {
    throw Error("Not a valid Email!");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password is too weak!");
  }

  const exists = await User.findOne({ email });

  if (exists) {
    throw Error("Email already exists!");
  }

  // const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, 14);
  const user = await this.create({
    userName,
    email,
    studentID,
    contactNum,
    department,
    year,
    password: hash,
  });

  return user;
};

// static login method
userSchema.statics.login = async function (email, password) {
  // email password validation
  if (!email || !password) {
    throw Error("All fields are required!");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw Error("This email isn't registered to any user!");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Password incorrect!");
  }

  return user;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
