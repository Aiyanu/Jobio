import { Router } from "express";
import { createJob, deleteJob, getAllJobs, getJob, updateJob } from "../controller/jobsController.js";
const router = Router();
router.route("/").post(createJob).get(getAllJobs);
router.route("/:id").get(getJob).patch(updateJob).delete(deleteJob);
export default router;
