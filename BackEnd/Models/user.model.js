import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
  },
  { timestamps: true }
);

// Mongoose requires mongoose.model() to interact with MongoDB → Just exporting the schema won’t work for querying the database.
const User = mongoose.model("User", userSchema);
export default User;
