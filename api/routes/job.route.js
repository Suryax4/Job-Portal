import express from "express";
import {
  applyJob,
  getAvailableJob,
  getSingleJob,
  initializeJob,
} from "../controllers/job.controller.js";
import { authenticate } from "../middleware.js";

const router = express.Router();

router.post("/initialize", initializeJob);
router.get("/listing", getAvailableJob);
router.get("/listing/:id", authenticate, getSingleJob);
router.post("/apply/:id", authenticate, applyJob);

export default router;
