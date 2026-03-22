import historyModel from "../models/historyModel.js";
import handelAsyncFunction from "../utils/asyncFunctionHandler.js";
import CustomError from "../utils/customError.js";

// create new history record
export const createHistory = handelAsyncFunction(async (req, res, next) => {
  const { actionType, inputData, outputData } = req.body;

  if (!actionType) {
    return next(new CustomError(400, "Action type is required"));
  }

  const history = await historyModel.create({
    userId: req.user._id,
    actionType,
    inputData,
    outputData,
  });

  res.status(201).json({
    status: "success",
    data: history,
  });
});

// get all history for logged-in user
export const getHistory = handelAsyncFunction(async (req, res, next) => {
  const history = await historyModel
    .find({ userId: req.user._id })
    .sort({ createdAt: -1 });

  res.status(200).json({
    status: "success",
    count: history.length,
    data: history,
  });
});

// delete a specific history record belonging to the user
export const deleteHistory = handelAsyncFunction(async (req, res, next) => {
  const { id } = req.params;

  const history = await historyModel.findOneAndDelete({
    _id: id,
    userId: req.user._id,
  });

  if (!history) {
    return next(new CustomError(404, "History record not found or unauthorized"));
  }

  res.status(204).send();
});
