import mongoose from "mongoose";

const historySchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    actionType: {
      type: String,
      required: true,
      trim: true,
    },
    inputData: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
    outputData: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
  },
  { timestamps: true }
);

const historyModel = mongoose.model("History", historySchema);

export default historyModel;
