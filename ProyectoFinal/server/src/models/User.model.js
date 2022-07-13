import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  date: { type: Date, default: Date.now() },
});

const UserModel = mongoose.model("usuarios", UserSchema);

export default UserModel;
