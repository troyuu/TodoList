import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 255,
    },
    passwordHash: {
      // store hashed password only (we'll do hashing in Step 3)
      type: String,
      required: true,
    },
    name: {
      type: String,
      trim: true,
      maxlength: 100,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
