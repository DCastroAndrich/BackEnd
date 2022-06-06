import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    max: 150,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    max: 150,
  },
  age: {
    type: Number,
  },
  address: {
    type: String,
    max: 400,
  },
  phone: {
    type: Number,
    required: true,
  },
});

const UserModel = mongoose.model("users", UserSchema);

export default UserModel;
