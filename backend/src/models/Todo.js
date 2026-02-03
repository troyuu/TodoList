import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 255, // ✅ requirement
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    status: {
      type: String,
      enum: ["pending", "completed"], // ✅ requirement
      default: "pending",
      index: true,
    },

    dueDate: {
      type: Date,
      default: null, // ✅ optional
    },
  },
  { timestamps: true }
);

export default mongoose.model("Todo", todoSchema);
