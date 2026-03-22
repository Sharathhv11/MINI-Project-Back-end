import express from "express";
import { createHistory, getHistory, deleteHistory } from "../controllers/historyController.js";
import authorize from "../controllers/authorization.js";

const router = express.Router();

// Apply authorization middleware to all history routes
router.use(authorize);

router.post("/", createHistory);
router.get("/", getHistory);
router.delete("/:id", deleteHistory);

export default router;
