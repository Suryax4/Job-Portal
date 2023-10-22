import express from "express";
import {
  getAvailableJob,
  getSingleJob,
  initializeJob,
} from "../controllers/job.controller.js";

const router = express.Router();

router.post("/initialize", initializeJob);
router.get("/listing", getAvailableJob);
router.get("/listing/:id", getSingleJob);

export default router;
